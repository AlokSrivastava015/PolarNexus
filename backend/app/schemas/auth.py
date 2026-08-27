from uuid import UUID
from pydantic import BaseModel, EmailStr, Field
from ..models.entities import Role


class SignupRequest(BaseModel):
    username: str = Field(min_length=3, max_length=80)
    email: EmailStr
    password: str = Field(min_length=12, max_length=128)
    full_name: str | None = Field(default=None, max_length=160)
    role: Role = Role.researcher


class LoginRequest(BaseModel):
    username_or_email: str
    password: str = Field(min_length=1, max_length=128)


class UserOut(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    full_name: str | None
    role: Role

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class PasswordResetRequest(BaseModel):
    email: EmailStr
