from uuid import UUID
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession
from ..config import get_settings
from ..database import get_db
from ..models.entities import Role, User

bearer = HTTPBearer()


# async def current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer), db: AsyncSession = Depends(get_db)) -> User:
#     settings = get_settings()
#     print("===== AUTH DEBUG =====")
#     print("TOKEN RECEIVED:", bool(credentials.credentials))
#     try:
#         payload = jwt.decode(credentials.credentials, settings.jwt_secret, algorithms=[settings.jwt_algorithm])

#         user = await db.get(User, UUID(payload["sub"]))
#     except (jwt.PyJWTError, ValueError):
#         user = None
#     if user is None:
#         raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired authentication token")
#     return user
async def current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer),
    db: AsyncSession = Depends(get_db),
) -> User:
    settings = get_settings()

    print("===== AUTH DEBUG =====")
    print("TOKEN RECEIVED:", bool(credentials.credentials))

    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm],
        )

        print("JWT PAYLOAD:", payload)

        user_id = UUID(payload["sub"])
        user = await db.get(User, user_id)

        print("USER FOUND:", user is not None)

    except (jwt.PyJWTError, ValueError, KeyError) as exc:
        print("JWT ERROR:", type(exc).__name__, str(exc))
        user = None

    if user is None:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            "Invalid or expired authentication token",
        )

    print("======================")
    return user


def require_roles(*roles: Role):
    async def role_guard(user: User = Depends(current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Insufficient permissions")
        return user
    return role_guard
