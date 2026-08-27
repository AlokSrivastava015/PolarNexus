"""Seed only an empty development database: python scripts/seed.py"""
import asyncio
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from sqlalchemy import select
from app.database import SessionLocal
from app.models.entities import Resource, ResourceType

SAMPLES = [("Indian Scientific Expedition to Antarctica 2023–24", ResourceType.report, "Antarctica"), ("Antarctic Atmospheric Observation Dataset", ResourceType.dataset, "Atmospheric Science"), ("Sea Ice Dynamics and Climate Impact", ResourceType.publication, "Cryosphere")]
async def main():
    async with SessionLocal() as db:
        if await db.scalar(select(Resource.id).limit(1)):
            print("Database already has resources; no seed data added."); return
        db.add_all([Resource(title=t, resource_type=k, research_area=a, description=f"Development seed: {t}") for t, k, a in SAMPLES]); await db.commit(); print("Seed data added.")
asyncio.run(main())
