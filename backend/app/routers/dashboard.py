from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import CitizenProject, CitizenSubmission, Resource, ResourceType, User

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/overview")
async def overview(db: AsyncSession = Depends(get_db)):
    async def count(type_: ResourceType): return await db.scalar(select(func.count()).select_from(Resource).where(Resource.resource_type == type_)) or 0
    return {"research_papers": await count(ResourceType.publication), "expedition_reports": await count(ResourceType.report), "scientific_datasets": await count(ResourceType.dataset), "photos_videos": (await count(ResourceType.photo)) + (await count(ResourceType.video)), "citizen_scientists": await db.scalar(select(func.count()).select_from(User)) or 0}


@router.get("/catalog-stats")
async def catalog_stats(db: AsyncSession = Depends(get_db)):
    async def count_resources(type_: ResourceType | None = None):
        statement = select(func.count()).select_from(Resource)
        if type_:
            statement = statement.where(Resource.resource_type == type_)
        return await db.scalar(statement) or 0

    return {
        "resources": await count_resources(),
        "reports": await count_resources(ResourceType.report),
        "datasets": await count_resources(ResourceType.dataset),
        "publications": await count_resources(ResourceType.publication),
        "photos": await count_resources(ResourceType.photo),
        "videos": await count_resources(ResourceType.video),
        "media": (await count_resources(ResourceType.photo)) + (await count_resources(ResourceType.video)),
        "outreach": await count_resources(ResourceType.outreach),
        "users": await db.scalar(select(func.count()).select_from(User)) or 0,
        "citizen_projects": await db.scalar(select(func.count()).select_from(CitizenProject)) or 0,
        "observations": await db.scalar(select(func.count()).select_from(CitizenSubmission)) or 0,
    }


@router.get("/trending-topics")
async def trending_topics(db: AsyncSession = Depends(get_db)):
    rows = (await db.execute(select(Resource.research_area, func.count(Resource.id)).where(Resource.research_area.is_not(None)).group_by(Resource.research_area).order_by(func.count(Resource.id).desc()).limit(10))).all()
    return [{"topic": area, "resource_count": count} for area, count in rows]


@router.get("/quick-actions")
async def quick_actions():
    return [{"id": "semantic-search", "label": "Ask AI Assistant", "route": "AI Semantic Search"}, {"id": "summarize", "label": "Summarize Paper", "route": "AI Summarization"}, {"id": "map", "label": "Explore Polar Map", "route": "Polar Map"}]
