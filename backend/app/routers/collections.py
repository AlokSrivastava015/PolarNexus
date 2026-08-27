from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import Collection, CollectionItem, Resource, User
from ..schemas.collections import CollectionCreate, CollectionItemCreate, CollectionOut, CollectionUpdate
from ..schemas.resources import ResourceOut
from ..utils.dependencies import current_user

router = APIRouter(prefix="/collections", tags=["collections"])

async def owned(collection_id: UUID, user: User, db: AsyncSession) -> Collection:
    collection = await db.scalar(select(Collection).where(Collection.id == collection_id, Collection.user_id == user.id))
    if not collection: raise HTTPException(status.HTTP_404_NOT_FOUND, "Collection not found")
    return collection

@router.get("", response_model=list[CollectionOut])
async def list_collections(user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    return (await db.scalars(select(Collection).where(Collection.user_id == user.id).order_by(Collection.created_at.desc()))).all()

@router.post("", response_model=CollectionOut, status_code=status.HTTP_201_CREATED)
async def create_collection(payload: CollectionCreate, user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    collection = Collection(user_id=user.id, **payload.model_dump()); db.add(collection); await db.commit(); await db.refresh(collection); return collection

@router.patch("/{collection_id}", response_model=CollectionOut)
async def rename_collection(collection_id: UUID, payload: CollectionUpdate, user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    collection = await owned(collection_id, user, db)
    for key, value in payload.model_dump().items(): setattr(collection, key, value)
    await db.commit(); await db.refresh(collection); return collection

@router.delete("/{collection_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_collection(collection_id: UUID, user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    await db.delete(await owned(collection_id, user, db)); await db.commit()

@router.get("/{collection_id}/resources", response_model=list[ResourceOut])
async def collection_resources(collection_id: UUID, user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    await owned(collection_id, user, db)
    return (await db.scalars(select(Resource).join(CollectionItem).where(CollectionItem.collection_id == collection_id))).all()

@router.post("/{collection_id}/resources", status_code=status.HTTP_201_CREATED)
async def add_item(collection_id: UUID, payload: CollectionItemCreate, user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    await owned(collection_id, user, db)
    if not await db.get(Resource, payload.resource_id): raise HTTPException(status.HTTP_404_NOT_FOUND, "Resource not found")
    db.add(CollectionItem(collection_id=collection_id, resource_id=payload.resource_id))
    try: await db.commit()
    except IntegrityError:
        await db.rollback(); raise HTTPException(status.HTTP_409_CONFLICT, "Resource is already in this collection")

@router.delete("/{collection_id}/resources/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_item(collection_id: UUID, resource_id: UUID, user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    await owned(collection_id, user, db)
    item = await db.get(CollectionItem, {"collection_id": collection_id, "resource_id": resource_id})
    if not item: raise HTTPException(status.HTTP_404_NOT_FOUND, "Collection item not found")
    await db.delete(item); await db.commit()
