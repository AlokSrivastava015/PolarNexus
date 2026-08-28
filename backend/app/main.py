from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .database import engine
from .routers import ai, auth, catalog, citizen_science, collections, dashboard, insights, maps, resources, search

settings = get_settings()

@asynccontextmanager
async def lifespan(_: FastAPI):
    yield
    await engine.dispose()

app = FastAPI(title="PolarNexus API", version="1.0.0", description="Backend API for the PolarNexus research platform.", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origin_list, allow_credentials=True, allow_methods=["GET", "POST", "PATCH", "DELETE"], allow_headers=["Authorization", "Content-Type"])

@app.get("/health", tags=["health"])
async def health(): return {"status": "ok"}

api = "/api/v1"
for router in (auth.router, resources.router, dashboard.router, collections.router, ai.router, search.router, catalog.router, citizen_science.router, insights.router, maps.router):
    app.include_router(router, prefix=api)
