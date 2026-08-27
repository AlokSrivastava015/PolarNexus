from fastapi import HTTPException, status


class AIService:
    """Provider boundary. An AI/RAG implementation can replace this class without changing routers."""
    async def rag_query(self, **_: object) -> dict:
        raise HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "RAG provider has not been configured")

    async def summarize(self, **_: object) -> dict:
        raise HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "Summarization provider has not been configured")

    async def generate_content(self, **_: object) -> dict:
        raise HTTPException(status.HTTP_501_NOT_IMPLEMENTED, "Content-generation provider has not been configured")


ai_service = AIService()
