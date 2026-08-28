import os
os.environ.setdefault("DATABASE_URL", "postgresql+asyncpg://postgres:password@localhost:5432/polarnexus")
os.environ.setdefault("JWT_SECRET", "test-secret")
from fastapi.testclient import TestClient
try:
    from app.main import app
except ModuleNotFoundError:  # Running tests from the repository root.
    from backend.app.main import app

def test_health():
    response = TestClient(app).get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
