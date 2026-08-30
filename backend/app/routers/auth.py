from datetime import datetime, timezone
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import User
from ..schemas.auth import LoginRequest, PasswordResetRequest, SignupRequest, TokenResponse, UserOut
from ..utils.dependencies import current_user
from ..utils.security import create_access_token
from ..services.supabase_auth_service import supabase_auth

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(payload: SignupRequest, db: AsyncSession = Depends(get_db)):
    exists = await db.scalar(select(User.id).where(or_(User.email == payload.email, User.username == payload.username)))
    if exists:
        raise HTTPException(status.HTTP_409_CONFLICT, "Username or email is already registered")
    auth_result = await supabase_auth.signup(str(payload.email), payload.password, {"username": payload.username, "full_name": payload.full_name or "", "role": payload.role.value})
    auth_user = supabase_auth.user_from_response(auth_result)
    if not auth_user:
        raise HTTPException(status.HTTP_502_BAD_GATEWAY, "Supabase did not return a user record")
    user = User(id=UUID(auth_user["id"]), username=payload.username, email=str(payload.email), full_name=payload.full_name, role=payload.role, password_hash=None)
    db.add(user); await db.commit(); await db.refresh(user)
    return TokenResponse(access_token=create_access_token(str(user.id), user.role.value), user=user)


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    print("===== LOGIN DEBUG =====")
    print("USERNAME_OR_EMAIL:", payload.username_or_email)
    print("PASSWORD:", repr(payload.password))
    print("=======================")
    local_user = await db.scalar(select(User).where(or_(User.email == payload.username_or_email, User.username == payload.username_or_email)))
    email = local_user.email if local_user else payload.username_or_email
    auth_result = await supabase_auth.login(email, payload.password)
    auth_user = supabase_auth.user_from_response(auth_result)
    if not auth_user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid username/email or password")
    user = local_user or await db.get(User, UUID(auth_user["id"]))
    if not user:
        metadata = auth_user.get("user_metadata", {})
        user = User(id=UUID(auth_user["id"]), username=metadata.get("username") or email.split("@", 1)[0], email=auth_user["email"], full_name=metadata.get("full_name"), role=metadata.get("role", "researcher"), password_hash=None)
        db.add(user)
    user.last_login = datetime.now(timezone.utc); await db.commit()
    return TokenResponse(access_token=create_access_token(str(user.id), user.role.value), user=user)


@router.get("/me", response_model=UserOut)
async def me(user: User = Depends(current_user)):
    return user


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(_: User = Depends(current_user)):
    return None


@router.post("/password-reset", status_code=status.HTTP_202_ACCEPTED)
async def password_reset(payload: PasswordResetRequest):
    await supabase_auth.request_password_reset(str(payload.email))
    return {"message": "If the account exists, Supabase will send a password-reset email."}
