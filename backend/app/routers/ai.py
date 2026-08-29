from uuid import UUID
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from ..config import get_settings
from ..database import get_db
from ..models.entities import Resource, User
from ..schemas.ai import ContentRequest, RagRequest, SemanticSearchRequest
from ..schemas.resources import Page
from ..services.ai_service import ai_service
from ..utils.dependencies import current_user
from .resources import list_resources

router = APIRouter(prefix="/ai", tags=["AI interfaces"])

@router.post("/semantic-search", response_model=Page)
async def semantic_search(payload: SemanticSearchRequest, db: AsyncSession = Depends(get_db)):
    """Fallback keyword search until a vector-search provider is plugged in."""
    return await list_resources(q=payload.query, resource_type=payload.filters.get("resource_type"), research_area=payload.filters.get("research_area"), author=payload.filters.get("author"), page=payload.page, page_size=payload.page_size, sort="latest", db=db)

@router.post("/rag/query")
async def rag_query(payload: RagRequest, user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    return await ai_service.rag_query(db=db, user=user, **payload.model_dump())

@router.post("/rag/index")
async def index_document(resource_id: UUID = Form(...), file: UploadFile = File(...), user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    await ai_service.ensure_resource_access(db, user, resource_id)
    content = await file.read()
    if len(content) > get_settings().max_upload_bytes:
        raise HTTPException(413, "Uploaded file exceeds the configured size limit")
    return await ai_service.index_document(db=db, resource_id=resource_id, filename=file.filename, content=content)

@router.post("/summarize")
async def summarize(file: UploadFile | None = File(default=None), summary_length: str = Form(default="medium"), summary_type: str = Form(default="general"), focus_area: str = Form(default="all"), language: str = Form(default="English"), _: object = Depends(current_user)):
    if not file: raise HTTPException(422, "Upload a document before requesting a summary")
    allowed = {"application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
    if file.content_type not in allowed: raise HTTPException(415, "Only PDF, DOCX, TXT, and XLSX files are supported")
    content = await file.read()
    if len(content) > get_settings().max_upload_bytes: raise HTTPException(413, "Uploaded file exceeds the configured size limit")
    return await ai_service.summarize(filename=file.filename, content=content, summary_length=summary_length, summary_type=summary_type, focus_area=focus_area, language=language)

@router.post("/content/generate")
async def generate_content(payload: ContentRequest, db: AsyncSession = Depends(get_db), _: object = Depends(current_user)):
    return await ai_service.generate_content(db=db, **payload.model_dump())
