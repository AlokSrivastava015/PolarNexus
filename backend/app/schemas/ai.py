from typing import Any, Literal
from uuid import UUID
from pydantic import BaseModel, Field, model_validator


class SemanticSearchRequest(BaseModel):
    query: str = Field(min_length=2, max_length=1000)
    filters: dict[str, Any] = Field(default_factory=dict)
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=10, ge=1, le=100)


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=12000)


class RagRequest(BaseModel):
    question: str = Field(min_length=2, max_length=4000)
    conversation_id: str | None = None
    resource_ids: list[UUID] = Field(default_factory=list)
    history: list[ChatMessage] = Field(default_factory=list, max_length=24)


class ContentRequest(BaseModel):
    resource_id: UUID | None = None
    content_type: str
    topic: str
    tone: str | None = None
    target_audience: str | None = None
    language: str = "English"
    instructions: str | None = None


class ResourceActionRequest(BaseModel):
    resource_id: UUID
    action: Literal["summarize", "blog", "news", "linkedin"]
    instructions: str | None = Field(default=None, max_length=4000)


class TranslationRequest(BaseModel):
    resource_id: UUID | None = None
    content: str | None = Field(default=None, max_length=100_000)
    target_language: str = Field(min_length=2, max_length=80)

    @model_validator(mode="after")
    def has_resource_or_content(self):
        if not self.resource_id and not (self.content or "").strip():
            raise ValueError("Either resource_id or content is required.")
        return self
