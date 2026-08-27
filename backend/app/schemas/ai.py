from typing import Any
from uuid import UUID
from pydantic import BaseModel, Field


class SemanticSearchRequest(BaseModel):
    query: str = Field(min_length=2, max_length=1000)
    filters: dict[str, Any] = Field(default_factory=dict)
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=10, ge=1, le=100)


class RagRequest(BaseModel):
    question: str = Field(min_length=2, max_length=4000)
    conversation_id: str | None = None
    resource_ids: list[UUID] = Field(default_factory=list)


class ContentRequest(BaseModel):
    resource_id: UUID | None = None
    content_type: str
    topic: str
    tone: str | None = None
    target_audience: str | None = None
    language: str = "English"
    instructions: str | None = None
