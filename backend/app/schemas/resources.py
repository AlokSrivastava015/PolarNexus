from datetime import date, datetime
from typing import Any
from uuid import UUID
from pydantic import BaseModel, Field
from ..models.entities import ResourceType


class ResourceBase(BaseModel):
    title: str = Field(min_length=1, max_length=500)
    description: str | None = None
    resource_type: ResourceType
    category: str | None = Field(default=None, max_length=100)
    research_area: str | None = Field(default=None, max_length=160)
    author: str | None = None
    institution: str | None = None
    publication_date: date | None = None
    location: str | None = None
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    tags: list[str] = Field(default_factory=list)
    file_url: str | None = None
    thumbnail_url: str | None = None
    external_url: str | None = None
    metadata: dict[str, Any] = Field(default_factory=dict, validation_alias="metadata_", serialization_alias="metadata")


class ResourceCreate(ResourceBase):
    pass


class ResourceUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=500)
    description: str | None = None
    resource_type: ResourceType | None = None
    category: str | None = None
    research_area: str | None = None
    author: str | None = None
    institution: str | None = None
    publication_date: date | None = None
    location: str | None = None
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    tags: list[str] | None = None
    file_url: str | None = None
    thumbnail_url: str | None = None
    external_url: str | None = None
    metadata: dict[str, Any] | None = None


class ResourceOut(ResourceBase):
    id: UUID
    view_count: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class Page(BaseModel):
    items: list[ResourceOut]
    total: int
    page: int
    page_size: int
