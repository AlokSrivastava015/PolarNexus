from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import Resource, ResourceType, Role
from ..schemas.resources import Page, ResourceCreate, ResourceOut, ResourceUpdate
from ..utils.dependencies import current_user, require_roles

router = APIRouter(prefix="/resources", tags=["resources"])


def apply_filters(statement, q: str | None, resource_type: ResourceType | None, research_area: str | None, author: str | None):
    if q:
        term = f"%{q}%"
        statement = statement.where(or_(Resource.title.ilike(term), Resource.description.ilike(term), Resource.author.ilike(term), Resource.institution.ilike(term)))
    if resource_type: statement = statement.where(Resource.resource_type == resource_type)
    if research_area: statement = statement.where(Resource.research_area.ilike(f"%{research_area}%"))
    if author: statement = statement.where(or_(Resource.author.ilike(f"%{author}%"), Resource.institution.ilike(f"%{author}%")))
    return statement


@router.get("", response_model=Page)
async def list_resources(q: str | None = None, resource_type: ResourceType | None = None, research_area: str | None = None, author: str | None = None, page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), sort: str = "latest", db: AsyncSession = Depends(get_db)):
    base = apply_filters(select(Resource), q, resource_type, research_area, author)
    total = await db.scalar(select(func.count()).select_from(base.subquery())) or 0
    order = Resource.publication_date.desc().nullslast() if sort == "latest" else Resource.publication_date.asc().nullsfirst() if sort == "oldest" else Resource.view_count.desc()
    items = (await db.scalars(base.order_by(order).offset((page - 1) * page_size).limit(page_size))).all()
    return Page(items=items, total=total, page=page, page_size=page_size)


@router.post("", response_model=ResourceOut, status_code=status.HTTP_201_CREATED)
async def create_resource(payload: ResourceCreate, db: AsyncSession = Depends(get_db), _: object = Depends(require_roles(Role.researcher, Role.scientist, Role.admin))):
    resource = Resource(**payload.model_dump(exclude={"metadata"}), metadata_=payload.metadata)
    db.add(resource); await db.commit(); await db.refresh(resource); return resource


@router.get("/{resource_id}", response_model=ResourceOut)
async def get_resource(resource_id: UUID, db: AsyncSession = Depends(get_db)):
    resource = await db.get(Resource, resource_id)
    if not resource: raise HTTPException(status.HTTP_404_NOT_FOUND, "Resource not found")
    resource.view_count += 1; await db.commit(); await db.refresh(resource); return resource


@router.patch("/{resource_id}", response_model=ResourceOut)
async def update_resource(resource_id: UUID, payload: ResourceUpdate, db: AsyncSession = Depends(get_db), _: object = Depends(require_roles(Role.researcher, Role.scientist, Role.admin))):
    resource = await db.get(Resource, resource_id)
    if not resource: raise HTTPException(status.HTTP_404_NOT_FOUND, "Resource not found")
    for key, value in payload.model_dump(exclude_unset=True).items(): setattr(resource, "metadata_" if key == "metadata" else key, value)
    await db.commit(); await db.refresh(resource); return resource


@router.delete("/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resource(resource_id: UUID, db: AsyncSession = Depends(get_db), _: object = Depends(require_roles(Role.admin))):
    resource = await db.get(Resource, resource_id)
    if not resource: raise HTTPException(status.HTTP_404_NOT_FOUND, "Resource not found")
    await db.delete(resource); await db.commit()
