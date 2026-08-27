# PolarNexus Backend

FastAPI API backed by Supabase PostgreSQL. The React application remains in the project root and is independent of this backend.

## Windows setup

Install Python 3.11 or newer from [python.org](https://www.python.org/downloads/windows/) and ensure **Add Python to PATH** is selected. Verify it:

```powershell
python --version
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

For Command Prompt activation use ` .venv\Scripts\activate `. Fill the values in `.env`; it is deliberately ignored by Git.

Start the API from `backend`:

```powershell
uvicorn app.main:app --reload
```

It runs at `http://localhost:8000`; use `http://localhost:8000/docs` for Swagger and `http://localhost:8000/health` for the health check. Run tests with `pytest`.

## Supabase setup

1. Create a Supabase project and copy its PostgreSQL connection string into `DATABASE_URL`, changing its scheme to `postgresql+asyncpg://` for the application.
2. Run [`sql/001_initial.sql`](sql/001_initial.sql) in the Supabase SQL Editor once.
3. Create a private Storage bucket named `polarnexus-files` (or set `STORAGE_BUCKET`).
4. Add `http://localhost:5173` to the allowed frontend URLs. Set `CORS_ORIGINS` for deployed frontends.
5. Put URL, anon key, and service role key in the backend `.env`. Never add the service-role key to Vite variables or frontend code.
6. For Google OAuth, enable Google in **Authentication → Providers**, provide Google client ID/secret there, add redirect URLs, then switch the frontend login button to Supabase OAuth. This API intentionally does not fake OAuth.

## API

All application endpoints are under `/api/v1`: `auth`, `resources`, `search`, `dashboard`, `collections`, `expeditions`, `publications`, `datasets`, `media`, `citizen-science`, `ai`, `insights`, and `map`. AI generation/RAG/summarization return **501** until an AI provider implements `app/services/ai_service.py`; semantic search safely falls back to database keyword search.

## Frontend

Create a root `.env` containing `VITE_API_BASE_URL=http://localhost:8000/api/v1`, then run from the project root:

```powershell
npm install
npm run dev
```

`src/services/api.js` centralizes requests and authentication tokens. Connect individual UI modules to it incrementally once Supabase is configured; no mock success responses are used by this backend.
