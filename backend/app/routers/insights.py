from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import Resource

router = APIRouter(prefix="/insights", tags=["research insights"])

@router.get("/overview")
async def overview(db: AsyncSession = Depends(get_db)):
    return {"resources": await db.scalar(select(func.count()).select_from(Resource)) or 0}

@router.get("/research-areas")
@router.get("/trending-topics")
async def areas(db: AsyncSession = Depends(get_db)):
    rows = (await db.execute(select(Resource.research_area, func.count()).where(Resource.research_area.is_not(None)).group_by(Resource.research_area).order_by(func.count().desc()))).all()
    return [{"name": name, "count": count} for name, count in rows]

@router.get("/alerts")
async def alerts(): return []

@router.get("/publications")
async def publications(db: AsyncSession = Depends(get_db)):
    return await areas(db)

@router.get("/geospatial")
async def geospatial(db: AsyncSession = Depends(get_db)):
    rows = (await db.execute(select(Resource.id, Resource.title, Resource.latitude, Resource.longitude).where(Resource.latitude.is_not(None), Resource.longitude.is_not(None)))).all()
    return [{"id": str(id), "title": title, "latitude": lat, "longitude": lng} for id, title, lat, lng in rows]
