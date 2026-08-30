# from ..config import get_settings
# from typing import Any

# import httpx
# from fastapi import HTTPException, status


# class AIService:
#     """
#     AI provider boundary.

#     Uses an OpenAI-compatible Responses API endpoint.
#     Configure:
#       AI_API_KEY
#       AI_MODEL
#       AI_BASE_URL   (optional, defaults to https://api.openai.com/v1)
#     """

#     def __init__(self) -> None:
#         self.api_key = get_settings().ai_api_key
#         self.model = get_settings().ai_model
#         self.base_url = get_settings().ai_base_url.rstrip("/")

#     def _check_config(self) -> None:
#         if not self.api_key:
#             raise HTTPException(
#                 status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
#                 detail="AI provider is not configured. Set AI_API_KEY.",
#             )

#     async def _generate(
#         self,
#         prompt: str,
#         *,
#         system_prompt: str | None = None,
#     ) -> str:
#         self._check_config()

#         instructions = system_prompt or (
#             "You are the PolarNexus AI assistant. "
#             "Give accurate, concise, useful answers. "
#             "When information is missing, say so instead of inventing facts."
#         )

#         payload = {
#             "model": self.model,
#             "instructions": instructions,
#             "input": prompt,
#         }

#         headers = {
#             "Authorization": f"Bearer {self.api_key}",
#             "Content-Type": "application/json",
#         }

#         try:
#             async with httpx.AsyncClient(timeout=90.0) as client:
#                 response = await client.post(
#                     f"{self.base_url}/responses",
#                     headers=headers,
#                     json=payload,
#                 )

#             if response.is_error:
#                 try:
#                     body = response.json()
#                 except Exception:
#                     body = {"raw": response.text}

#                 detail = (
#                     body.get("error", {}).get("message")
#                     if isinstance(body.get("error"), dict)
#                     else None
#                 ) or body.get("message") or body.get("detail")

#                 raise HTTPException(
#                     status_code=502,
#                     detail=detail or "AI provider request failed",
#                 )

#             data = response.json()

#             # Responses API normally provides output_text.
#             output_text = data.get("output_text")
#             if isinstance(output_text, str) and output_text.strip():
#                 return output_text.strip()

#             # Fallback parser in case the response is returned as
#             # structured output items.
#             parts: list[str] = []

#             for item in data.get("output", []):
#                 if not isinstance(item, dict):
#                     continue

#                 for content in item.get("content", []):
#                     if not isinstance(content, dict):
#                         continue

#                     text = content.get("text")
#                     if isinstance(text, str):
#                         parts.append(text)

#             result = "\n".join(parts).strip()

#             if not result:
#                 raise HTTPException(
#                     status_code=502,
#                     detail="AI provider returned an empty response",
#                 )

#             return result

#         except httpx.TimeoutException as exc:
#             raise HTTPException(
#                 status_code=504,
#                 detail="AI provider request timed out",
#             ) from exc

#         except httpx.RequestError as exc:
#             raise HTTPException(
#                 status_code=502,
#                 detail=f"Could not reach AI provider: {exc}",
#             ) from exc

#     async def rag_query(self, **kwargs: object) -> dict[str, Any]:
#         question = str(kwargs.get("question", "")).strip()
#         conversation_id = kwargs.get("conversation_id")
#         resource_ids = kwargs.get("resource_ids") or []

#         if len(question) < 2:
#             raise HTTPException(
#                 status_code=422,
#                 detail="Question must contain at least 2 characters.",
#             )

#         context = ""

#         if resource_ids:
#             context = (
#                 "\nThe user supplied resource IDs for contextual retrieval: "
#                 f"{resource_ids}\n"
#                 "Use those resources only when their content is actually "
#                 "available to the system. Do not invent resource contents."
#             )

#         prompt = f"""
# User question:
# {question}

# {context}

# Conversation ID:
# {conversation_id or "none"}

# Answer the user's question clearly.
# """

#         answer = await self._generate(
#             prompt,
#             system_prompt=(
#                 "You are PolarNexus RAG assistant. "
#                 "Answer based only on available evidence. "
#                 "Never fabricate document contents, citations, or facts."
#             ),
#         )

#         return {
#             "answer": answer,
#             "question": question,
#             "conversation_id": conversation_id,
#             "resource_ids": resource_ids,
#         }

#     async def summarize(self, **kwargs: object) -> dict[str, Any]:
#         filename = kwargs.get("filename")
#         content = kwargs.get("content")
#         summary_length = str(kwargs.get("summary_length", "medium"))
#         summary_type = str(kwargs.get("summary_type", "general"))
#         focus_area = str(kwargs.get("focus_area", "all"))
#         language = str(kwargs.get("language", "English"))

#         if not content:
#             raise HTTPException(
#                 status_code=422,
#                 detail="No document content was provided.",
#             )

#         if isinstance(content, bytes):
#             try:
#                 text = content.decode("utf-8", errors="ignore")
#             except Exception:
#                 text = str(content)
#         else:
#             text = str(content)

#         # Avoid sending an accidentally huge payload to the model.
#         text = text[:100_000]

#         prompt = f"""
# Summarize the following document.

# Filename: {filename or "unknown"}
# Summary length: {summary_length}
# Summary type: {summary_type}
# Focus area: {focus_area}
# Language: {language}

# Document:
# {text}

# Produce a clean, structured summary suitable for a research workspace.
# """

#         summary = await self._generate(
#             prompt,
#             system_prompt=(
#                 "You are a research-document summarization assistant. "
#                 "Preserve important facts, numbers, findings, methods, "
#                 "limitations, and conclusions. "
#                 "Do not invent information."
#             ),
#         )

#         return {
#             "filename": filename,
#             "summary": summary,
#             "summary_length": summary_length,
#             "summary_type": summary_type,
#             "focus_area": focus_area,
#             "language": language,
#         }

#     async def generate_content(self, **kwargs: object) -> dict[str, Any]:
#         resource_id = kwargs.get("resource_id")
#         content_type = str(kwargs.get("content_type", "general"))
#         topic = str(kwargs.get("topic", "")).strip()
#         tone = kwargs.get("tone")
#         target_audience = kwargs.get("target_audience")
#         language = str(kwargs.get("language", "English"))
#         instructions = kwargs.get("instructions")

#         if not topic:
#             raise HTTPException(
#                 status_code=422,
#                 detail="Topic is required.",
#             )

#         prompt = f"""
# Create content for the following research topic.

# Topic:
# {topic}

# Content type:
# {content_type}

# Tone:
# {tone or "professional"}

# Target audience:
# {target_audience or "general research audience"}

# Language:
# {language}

# Additional instructions:
# {instructions or "None"}

# Resource ID:
# {resource_id or "None"}

# Return polished, useful content that can be used directly in the
# PolarNexus research workspace.
# """

#         generated = await self._generate(
#             prompt,
#             system_prompt=(
#                 "You are a professional scientific and research writing "
#                 "assistant. Produce accurate, structured content. "
#                 "Do not fabricate sources, statistics, or citations."
#             ),
#         )

#         return {
#             "resource_id": resource_id,
#             "content_type": content_type,
#             "topic": topic,
#             "tone": tone,
#             "target_audience": target_audience,
#             "language": language,
#             "content": generated,
#         }


# ai_service = AIService()
from typing import Any

import httpx
from fastapi import HTTPException, status
from sqlalchemy import select, or_

from ..config import get_settings
from ..database import SessionLocal
from ..models.entities import Resource
class AIService:
    """Gemini-backed AI service for PolarNexus."""

    def __init__(self) -> None:
        settings = get_settings()

        self.api_key = (settings.gemini_api_key or "").strip()
        self.model = settings.gemini_model.strip()
        self.base_url = settings.gemini_base_url.rstrip("/")

    def _check_config(self) -> None:
        if not self.api_key:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Gemini API is not configured. Set GEMINI_API_KEY.",
            )

    async def _generate(
        self,
        prompt: str,
        *,
        system_prompt: str | None = None,
    ) -> str:
        self._check_config()

        combined_prompt = prompt

        if system_prompt:
            combined_prompt = (
                f"System instructions:\n{system_prompt}\n\n"
                f"User request:\n{prompt}"
            )

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": combined_prompt,
                        }
                    ]
                }
            ],
        }

        url = (
            f"{self.base_url}/models/"
            f"{self.model}:generateContent"
        )

        headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": self.api_key,
        }

        try:
            async with httpx.AsyncClient(timeout=90.0) as client:
                response = await client.post(
                    url,
                    headers=headers,
                    json=payload,
                )

            if response.is_error:
                try:
                    body = response.json()
                except Exception:
                    body = {"raw": response.text}

                error_message = None

                if isinstance(body, dict):
                    error = body.get("error")

                    if isinstance(error, dict):
                        error_message = error.get("message")

                    error_message = (
                        error_message
                        or body.get("message")
                        or body.get("detail")
                    )

                raise HTTPException(
                    status_code=502,
                    detail=error_message or "Gemini API request failed",
                )

            data = response.json()

            candidates = data.get("candidates", [])

            if not candidates:
                raise HTTPException(
                    status_code=502,
                    detail="Gemini returned no candidates.",
                )

            parts = (
                candidates[0]
                .get("content", {})
                .get("parts", [])
            )

            texts: list[str] = []

            for part in parts:
                if isinstance(part, dict):
                    text = part.get("text")
                    if isinstance(text, str):
                        texts.append(text)

            result = "\n".join(texts).strip()

            if not result:
                raise HTTPException(
                    status_code=502,
                    detail="Gemini returned an empty response.",
                )

            return result

        except httpx.TimeoutException as exc:
            raise HTTPException(
                status_code=504,
                detail="Gemini API request timed out.",
            ) from exc

        except httpx.RequestError as exc:
            raise HTTPException(
                status_code=502,
                detail=f"Could not reach Gemini API: {exc}",
            ) from exc

    async def rag_query(self, **kwargs):
        question = str(kwargs.get("question", "")).strip()
        conversation_id = kwargs.get("conversation_id")

        if len(question) < 2:
            raise HTTPException(
                status_code=422,
                detail="Question must contain at least 2 characters.",
            )

        # Search resources
        async with SessionLocal() as db:

            term = f"%{question}%"

            stmt = select(Resource).where(
                or_(
                    Resource.title.ilike(term),
                    Resource.description.ilike(term),
                    Resource.research_area.ilike(term),
                    Resource.author.ilike(term),
                )
            ).limit(5)

            resources = (await db.scalars(stmt)).all()

        context_chunks = []

        for r in resources:
            context_chunks.append(
                f"""
Title: {r.title}
Description: {r.description}
Research Area: {r.research_area}
Author: {r.author}
"""
            )

        context = "\n\n".join(context_chunks)

        prompt = f"""
Use the provided resource context to answer.

RESOURCE CONTEXT:
{context}

QUESTION:
{question}

Rules:
- Answer from context when possible.
- If context is insufficient, clearly say so.
- Do not invent citations.
"""

        answer = await self._generate(
            prompt,
            system_prompt=(
                "You are the PolarNexus RAG assistant."
            ),
        )

        return {
            "answer": answer,
            "question": question,
            "conversation_id": conversation_id,
            "matched_resources": len(resources),
        }
    async def summarize(self, **kwargs: object) -> dict[str, Any]:
        filename = kwargs.get("filename")
        content = kwargs.get("content")

        summary_length = str(
            kwargs.get("summary_length", "medium")
        )
        summary_type = str(
            kwargs.get("summary_type", "general")
        )
        focus_area = str(
            kwargs.get("focus_area", "all")
        )
        language = str(
            kwargs.get("language", "English")
        )

        if not content:
            raise HTTPException(
                status_code=422,
                detail="No document content was provided.",
            )

        if isinstance(content, bytes):
            text = content.decode("utf-8", errors="ignore")
        else:
            text = str(content)

        text = text[:100_000]

        prompt = f"""
Summarize this research document.

Filename: {filename or "unknown"}
Summary length: {summary_length}
Summary type: {summary_type}
Focus area: {focus_area}
Language: {language}

Document:
{text}

Create a structured summary containing the most important facts,
findings, methods, limitations, and conclusions.
Do not invent information.
"""

        summary = await self._generate(
            prompt,
            system_prompt=(
                "You are a scientific research summarization assistant."
            ),
        )

        return {
            "filename": filename,
            "summary": summary,
            "summary_length": summary_length,
            "summary_type": summary_type,
            "focus_area": focus_area,
            "language": language,
        }

    async def generate_content(self, **kwargs: object) -> dict[str, Any]:
        resource_id = kwargs.get("resource_id")
        content_type = str(
            kwargs.get("content_type", "general")
        )
        topic = str(
            kwargs.get("topic", "")
        ).strip()
        tone = kwargs.get("tone")
        target_audience = kwargs.get("target_audience")
        language = str(
            kwargs.get("language", "English")
        )
        instructions = kwargs.get("instructions")

        if not topic:
            raise HTTPException(
                status_code=422,
                detail="Topic is required.",
            )

        prompt = f"""
Generate research content.

Topic:
{topic}

Content type:
{content_type}

Tone:
{tone or "professional"}

Target audience:
{target_audience or "research audience"}

Language:
{language}

Instructions:
{instructions or "None"}

Resource ID:
{resource_id or "None"}

Produce polished and useful content suitable for the
PolarNexus research workspace.
Do not fabricate statistics or sources.
"""

        generated = await self._generate(
            prompt,
            system_prompt=(
                "You are a professional scientific writing assistant."
            ),
        )

        return {
            "resource_id": resource_id,
            "content_type": content_type,
            "topic": topic,
            "tone": tone,
            "target_audience": target_audience,
            "language": language,
            "content": generated,
        }


ai_service = AIService()