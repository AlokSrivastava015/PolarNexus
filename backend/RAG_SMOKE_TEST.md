# PolarNexus RAG smoke test guide

This guide covers the local validation path for the DB-backed RAG pipeline.

## 1. Install dependencies

Open PowerShell in the backend folder:

    cd "c:\Users\Shiva\Desktop\polarnexa project\PolarNexus\backend"
    python -m venv .venv
    .\.venv\Scripts\Activate.ps1
    python -m pip install --upgrade pip
    python -m pip install -r requirements.txt

## 2. Start the backend

    cd "c:\Users\Shiva\Desktop\polarnexa project\PolarNexus\backend"
    .\.venv\Scripts\Activate.ps1
    $env:PYTHONPATH = "."
    uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload

Open the Swagger UI at:

    http://localhost:8001/docs

## 3. Apply the Supabase SQL migration

The required SQL is in:

    backend/sql/002_rag_vector_support.sql

Use one of these options:

### Option A: Supabase SQL editor

Copy the contents of the migration file and run them in the Supabase SQL editor.

### Option B: PowerShell with psql

    $env:SUPABASE_DB_HOST = "aws-0-ap-southeast-1.pooler.supabase.com"
    $env:SUPABASE_DB_PORT = "5432"
    $env:SUPABASE_DB_NAME = "postgres"
    $env:SUPABASE_DB_USER = "postgres"
    $env:SUPABASE_DB_PASSWORD = "<your-password>"
    psql "host=$env:SUPABASE_DB_HOST port=$env:SUPABASE_DB_PORT dbname=$env:SUPABASE_DB_NAME user=$env:SUPABASE_DB_USER password=$env:SUPABASE_DB_PASSWORD sslmode=require" -f .\sql\002_rag_vector_support.sql

Important:

- Do not create an HNSW index for vector(3072)
- The app performs cosine similarity in Python, which is the supported path for the current Gemini embedding dimension

## 4. Upload and index one test document

First, create or identify a resource that the authenticated user can access.

Then upload a text or PDF file to the indexing endpoint:

    $token = (Invoke-RestMethod -Method Post -Uri "http://localhost:8001/api/v1/auth/login" -ContentType "application/json" -Body (@{ username_or_email = "$env:TEST_EMAIL"; password = "$env:TEST_PASSWORD" } | ConvertTo-Json)).access_token
    $resourceId = (Invoke-RestMethod -Method Get -Uri "http://localhost:8001/api/v1/resources?page=1&page_size=20&sort=latest" -Headers @{ Authorization = "Bearer $token" }).items[0].id
    $fileBytes = [System.IO.File]::ReadAllBytes("C:\path\to\test-document.txt")
    $fileName = "test-document.txt"
    $form = New-Object System.Collections.Specialized.NameValueCollection
    $form.Add("resource_id", $resourceId)
    $form.Add("file", [System.IO.File]::OpenRead("C:\path\to\test-document.txt"))

    $boundary = [System.Guid]::NewGuid().ToString()
    $contentType = "multipart/form-data; boundary=$boundary"
    $body = [System.Text.Encoding]::UTF8.GetBytes((@(
        "--$boundary",
        "Content-Disposition: form-data; name=\"resource_id\"",
        "",
        $resourceId,
        "--$boundary",
        "Content-Disposition: form-data; name=\"file\"; filename=\"$fileName\"",
        "Content-Type: text/plain",
        "",
        "",
        "--$boundary--",
        ""
    ) -join [Environment]::NewLine))

    Invoke-RestMethod -Method Post -Uri "http://localhost:8001/api/v1/ai/rag/index" -Headers @{ Authorization = "Bearer $token" } -Form @{ resource_id = $resourceId; file = Get-Item "C:\path\to\test-document.txt" }

The simpler route is to use the browser or an HTTP client tool to send the multipart form upload. The endpoint expects:

- field name: resource_id
- field name: file
- Authorization header with a valid JWT

## 5. Run the smoke test

Set environment variables and run:

    $env:TEST_EMAIL = "you@example.com"
    $env:TEST_PASSWORD = "your-password"
    $env:API_BASE_URL = "http://localhost:8001/api/v1"
    python .\scripts\test_rag_pipeline.py

## 6. Call the RAG endpoint manually with PowerShell

    $token = (Invoke-RestMethod -Method Post -Uri "http://localhost:8001/api/v1/auth/login" -ContentType "application/json" -Body (@{ username_or_email = "$env:TEST_EMAIL"; password = "$env:TEST_PASSWORD" } | ConvertTo-Json)).access_token
    $resourceId = (Invoke-RestMethod -Method Get -Uri "http://localhost:8001/api/v1/resources?page=1&page_size=20&sort=latest" -Headers @{ Authorization = "Bearer $token" }).items[0].id
    $payload = @{ question = "What is PolarNexus?"; conversation_id = $null; resource_ids = @($resourceId) } | ConvertTo-Json -Depth 10
    Invoke-RestMethod -Method Post -Uri "http://localhost:8001/api/v1/ai/rag/query" -Headers @{ Authorization = "Bearer $token" } -ContentType "application/json" -Body $payload

## 7. Check the Swagger docs

    http://localhost:8001/docs

## 8. Expected successful responses

Typical good responses include:

- /health => 200 and { "status": "ok" }
- /auth/login => 200 with access_token
- /auth/me => 200 and a valid user object
- /ai/rag/query => 200 and a payload with answer, sources, and retrieval metadata
- answer text uses the uploaded document content
- source list includes the resource id and chunk score

## 9. Common failures and what they mean

### 401 Unauthorized

The JWT is missing, expired, or invalid. Re-log in and verify the Authorization header is present.

### 403 Forbidden

The user does not own or cannot access the selected resource.

### 500 or 502 while indexing

Usually means the Gemini embedding model or the database vector dimension is mismatched.

### 404 on /ai/rag/query or /ai/rag/index

The route registration is not active. Restart the backend and verify the app imports successfully.

### No sources returned

No document chunks were indexed for the selected resource, or the database has not yet been migrated.

### 400 or 422 on upload

Unsupported file type, empty file, or invalid multipart form.

### 502 Embedding provider error: model not found

The configured embedding model is not valid for the live API key. Use gemini-embedding-001 for this setup.

## 10. Manual verification checklist

- Backend starts without import errors
- Swagger loads at /docs
- Auth endpoints register successfully
- RAG endpoint is registered
- Login returns a valid token
- /auth/me succeeds with the token
- Query succeeds against an indexed resource
- answer contains evidence from the uploaded document
- sources include resource ids and similarity scores

