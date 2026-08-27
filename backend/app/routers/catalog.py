from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import ResourceType
from ..schemas.resources import Page
from .resources import list_resources

router = APIRouter(tags=["catalog"])

def catalog_endpoint(path: str, label: str, resource_type: ResourceType):
    @router.get(path, response_model=Page, summary=f"List {label}")
    async def endpoint(q: str | None = None, page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db)):
        return await list_resources(q, resource_type, None, None, page, page_size, "latest", db)

catalog_endpoint("/expeditions", "expedition reports", ResourceType.report)
catalog_endpoint("/publications", "publications", ResourceType.publication)
catalog_endpoint("/datasets", "datasets", ResourceType.dataset)
catalog_endpoint("/media", "media", ResourceType.photo)
