from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import ResourceType
from ..schemas.resources import Page
from .resources import list_resources

router = APIRouter(tags=["search"])

@router.get("/search", response_model=Page)
async def search(q: str = Query(min_length=1), resource_type: ResourceType | None = None, research_area: str | None = None, author: str | None = None, page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), sort: str = "latest", db: AsyncSession = Depends(get_db)):
    return await list_resources(q, resource_type, research_area, author, page, page_size, sort, db)
