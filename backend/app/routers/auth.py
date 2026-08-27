from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import User
from ..schemas.auth import LoginRequest, PasswordResetRequest, SignupRequest, TokenResponse, UserOut
from ..utils.dependencies import current_user
from ..utils.security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(payload: SignupRequest, db: AsyncSession = Depends(get_db)):
    exists = await db.scalar(select(User.id).where(or_(User.email == payload.email, User.username == payload.username)))
    if exists:
        raise HTTPException(status.HTTP_409_CONFLICT, "Username or email is already registered")
    user = User(username=payload.username, email=str(payload.email), full_name=payload.full_name, role=payload.role, password_hash=hash_password(payload.password))
    db.add(user); await db.commit(); await db.refresh(user)
    return TokenResponse(access_token=create_access_token(str(user.id), user.role.value), user=user)


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    user = await db.scalar(select(User).where(or_(User.email == payload.username_or_email, User.username == payload.username_or_email)))
    if not user or not user.password_hash or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid username/email or password")
    user.last_login = datetime.now(timezone.utc); await db.commit()
    return TokenResponse(access_token=create_access_token(str(user.id), user.role.value), user=user)


@router.get("/me", response_model=UserOut)
async def me(user: User = Depends(current_user)):
    return user


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(_: User = Depends(current_user)):
    return None


@router.post("/password-reset", status_code=status.HTTP_202_ACCEPTED)
async def password_reset(_: PasswordResetRequest):
    raise HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "Configure Supabase Auth email delivery to enable password resets")
