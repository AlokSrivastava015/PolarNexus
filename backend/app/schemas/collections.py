from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field


class CollectionCreate(BaseModel):
    name: str = Field(min_length=1, max_length=160)
    description: str | None = None


class CollectionUpdate(CollectionCreate):
    pass


class CollectionOut(BaseModel):
    id: UUID
    name: str
    description: str | None
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


class CollectionItemCreate(BaseModel):
    resource_id: UUID
