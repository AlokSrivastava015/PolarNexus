from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import Resource, ResourceType, User

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/overview")
async def overview(db: AsyncSession = Depends(get_db)):
    async def count(type_: ResourceType): return await db.scalar(select(func.count()).select_from(Resource).where(Resource.resource_type == type_)) or 0
    return {"research_papers": await count(ResourceType.publication), "expedition_reports": await count(ResourceType.report), "scientific_datasets": await count(ResourceType.dataset), "photos_videos": (await count(ResourceType.photo)) + (await count(ResourceType.video)), "citizen_scientists": await db.scalar(select(func.count()).select_from(User)) or 0}


@router.get("/trending-topics")
async def trending_topics(db: AsyncSession = Depends(get_db)):
    rows = (await db.execute(select(Resource.research_area, func.count(Resource.id)).where(Resource.research_area.is_not(None)).group_by(Resource.research_area).order_by(func.count(Resource.id).desc()).limit(10))).all()
    return [{"topic": area, "resource_count": count} for area, count in rows]


@router.get("/quick-actions")
async def quick_actions():
    return [{"id": "semantic-search", "label": "Ask AI Assistant", "route": "AI Semantic Search"}, {"id": "summarize", "label": "Summarize Paper", "route": "AI Summarization"}, {"id": "map", "label": "Explore Polar Map", "route": "Polar Map"}]
