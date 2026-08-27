from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import Resource, ResourceType

router = APIRouter(prefix="/map", tags=["polar map"])

@router.get("/research-points")
async def points(db: AsyncSession = Depends(get_db)):
    rows = (await db.scalars(select(Resource).where(Resource.latitude.is_not(None), Resource.longitude.is_not(None)))).all()
    return [{"id": str(r.id), "title": r.title, "type": r.resource_type.value, "latitude": r.latitude, "longitude": r.longitude, "location": r.location} for r in rows]

@router.get("/expeditions")
async def expeditions(db: AsyncSession = Depends(get_db)):
    return [point for point in await points(db) if point["type"] == ResourceType.report.value]

@router.get("/stations")
async def stations(db: AsyncSession = Depends(get_db)):
    return [{"location": r["location"], "latitude": r["latitude"], "longitude": r["longitude"]} for r in await points(db) if r["location"]]
