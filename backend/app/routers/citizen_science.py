from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..models.entities import CitizenProject, CitizenSubmission, Role, User
from ..utils.dependencies import current_user, require_roles

router = APIRouter(prefix="/citizen-science", tags=["citizen science"])
class ProjectIn(BaseModel): title: str = Field(min_length=1); description: str = Field(min_length=1)
class SubmissionIn(BaseModel): project_id: str; observation: str = Field(min_length=1); latitude: float | None = None; longitude: float | None = None

@router.get("/projects")
async def projects(db: AsyncSession = Depends(get_db)): return (await db.scalars(select(CitizenProject).order_by(CitizenProject.created_at.desc()))).all()
@router.post("/projects", status_code=status.HTTP_201_CREATED)
async def create_project(payload: ProjectIn, user: User = Depends(require_roles(Role.researcher, Role.scientist, Role.admin)), db: AsyncSession = Depends(get_db)):
    project = CitizenProject(**payload.model_dump(), created_by=user.id); db.add(project); await db.commit(); return project
@router.get("/submissions")
async def submissions(user: User = Depends(current_user), db: AsyncSession = Depends(get_db)): return (await db.scalars(select(CitizenSubmission).where(CitizenSubmission.user_id == user.id))).all()
@router.post("/submissions", status_code=status.HTTP_201_CREATED)
async def create_submission(payload: SubmissionIn, user: User = Depends(current_user), db: AsyncSession = Depends(get_db)):
    from uuid import UUID
    if not await db.get(CitizenProject, UUID(payload.project_id)): raise HTTPException(404, "Project not found")
    submission = CitizenSubmission(project_id=UUID(payload.project_id), user_id=user.id, observation=payload.observation, latitude=payload.latitude, longitude=payload.longitude); db.add(submission); await db.commit(); return submission
