-- Required before enabling true vector similarity search in Postgres/Supabase.
-- This migration is intentionally NOT executed automatically by the app.
-- Run it once in the Supabase SQL editor or database migration tool.

create extension if not exists vector;

create table if not exists resource_chunks (
    id uuid primary key default gen_random_uuid(),
    resource_id uuid not null references resources(id) on delete cascade,
    chunk_index integer not null default 0,
    chunk_text text not null,
    metadata jsonb not null default '{}',
    embedding vector(3072),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_resource_chunks_resource_id on resource_chunks(resource_id);
create index if not exists idx_resource_chunks_chunk_index on resource_chunks(resource_id, chunk_index);

-- Gemini gemini-embedding-001 currently returns 3072-dimensional vectors for this account.
-- Supabase/pgvector HNSW indexes are limited to 2000 dimensions in this environment, so
-- the app performs cosine similarity scoring in Python for retrieval rather than using a DB-side vector index.
