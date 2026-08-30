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
import json
import re
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

    @staticmethod
    def _as_text(value: Any) -> str:
        """Return human-readable text from JSON metadata without inventing content."""
        if isinstance(value, str):
            return value.strip()
        if isinstance(value, (int, float, bool)):
            return str(value)
        if isinstance(value, list):
            return "\n".join(filter(None, (AIService._as_text(item) for item in value))).strip()
        if isinstance(value, dict):
            return "\n".join(
                f"{key}: {text}" for key, item in value.items()
                if (text := AIService._as_text(item))
            ).strip()
        return ""

    @classmethod
    def _metadata_text(cls, metadata: dict[str, Any], field_names: set[str]) -> str:
        """Find a named content field anywhere in imported resource metadata."""
        canonical_names = {re.sub(r"[^a-z0-9]", "", name.lower()) for name in field_names}

        def visit(value: Any) -> str:
            if not isinstance(value, dict):
                return ""
            for key, item in value.items():
                normalized = re.sub(r"[^a-z0-9]", "", str(key).lower())
                if normalized in canonical_names:
                    text = cls._as_text(item)
                    if text:
                        return text
            for item in value.values():
                text = visit(item)
                if text:
                    return text
            return ""

        return visit(metadata or {})

    @classmethod
    def _resource_context(cls, resource: Resource) -> tuple[str, str, str]:
        """Build the common AI context using the resource-content fallback order."""
        metadata = resource.metadata_ or {}
        content_sources = (
            ("extracted document text", {"extracted_text", "extracted_document_text", "pdf_text", "pdf_extracted_text", "pdf_content", "document_text", "document_content", "extracted_content"}),
            ("uploaded content", {"full_text", "full_content", "uploaded_content", "uploaded_pdf_content", "file_content", "content", "document_body", "report_content", "research_paper_content", "paper_content", "expedition_report_content"}),
            ("abstract", {"abstract", "summary", "executive_summary"}),
            ("description", {"description", "dataset_description"}),
        )
        source_kind = ""
        source_text = ""
        for label, fields in content_sources:
            source_text = cls._metadata_text(metadata, fields)
            if source_text:
                source_kind = label
                break
        if not source_text and (resource.description or "").strip():
            source_kind, source_text = "description", resource.description.strip()
        if not source_text and metadata:
            source_kind, source_text = "metadata"
            source_text = cls._as_text(metadata)

        if not source_text:
            return "", "", ""

        # Keep all identity fields available even when the document body is selected.
        metadata_json = json.dumps(metadata, ensure_ascii=False, default=str)[:20_000] if metadata else "None"
        record = f"""Resource ID: {resource.id}
Title: {resource.title}
Type: {resource.resource_type.value}
Description: {resource.description or 'Not specified'}
Research area: {resource.research_area or 'Not specified'}
Author: {resource.author or 'Not specified'}
Institution: {resource.institution or 'Not specified'}
Publication date: {resource.publication_date or 'Not specified'}
Location: {resource.location or 'Not specified'}
Tags: {', '.join(resource.tags or []) or 'None'}
File URL: {resource.file_url or 'None'}
Metadata: {metadata_json}

Primary resource content ({source_kind}):
{source_text[:80_000]}"""
        return record, source_text[:80_000], source_kind

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
        resource_ids = kwargs.get("resource_ids") or []
        history = kwargs.get("history") or []

        if len(question) < 2:
            raise HTTPException(
                status_code=422,
                detail="Question must contain at least 2 characters.",
            )

        # Search resources
        async with SessionLocal() as db:

            if resource_ids:
                stmt = select(Resource).where(Resource.id.in_(resource_ids)).limit(5)
            else:
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

        context_chunks = [self._resource_context(resource)[0] for resource in resources]
        context_chunks = [chunk for chunk in context_chunks if chunk]

        if resource_ids and not context_chunks:
            raise HTTPException(
                status_code=422,
                detail="This resource has insufficient content for AI processing.",
            )

        context = "\n\n".join(context_chunks)
        conversation = "\n".join(
            f"{message.get('role', 'user').title()}: {message.get('content', '')}"
            for message in history[-12:]
            if isinstance(message, dict)
        ) or "No earlier messages."

        prompt = f"""
Use the provided resource context to answer.

RESOURCE CONTEXT:
{context}

QUESTION:
{question}

CHAT HISTORY:
{conversation}

Rules:
- Answer from context when possible.
- Begin with a direct, plain-English answer and give context before technical detail.
- Explain scientific concepts clearly for researchers, judges, and public-sector stakeholders.
- When the record is limited, describe what can reasonably be inferred from its stated scope and why that scope matters; do not use the phrase "Specific Data/Findings Unavailable".
- Do not invent citations.
"""

        answer = await self._generate(
            prompt,
            system_prompt=(
                "You are PolarNexus's knowledgeable polar research assistant. "
                "Write in natural, professional conversational English, as an expedition expert or science communicator would. "
                "Ground every answer in the supplied resource, distinguish evidence from interpretation, and never invent results, sources, or citations. "
                "Where relevant, connect the explanation to polar science, Antarctica or the Arctic, climate, sustainability, biodiversity, logistics, or field operations."
            ),
        )

        return {
            "answer": answer,
            "question": question,
            "conversation_id": conversation_id,
            "matched_resources": len(resources),
            "resource_ids": [str(resource.id) for resource in resources],
            "sources": [
                {
                    "id": str(resource.id),
                    "title": resource.title,
                    "resource_type": resource.resource_type.value,
                }
                for resource in resources
            ],
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

Make the summary presentation-ready for researchers, judges, government stakeholders, and scientific audiences. Use exactly these headings:

Executive Summary
Key Insights
Scientific Importance
Potential Applications
Conclusion

Use complete, natural paragraphs under each heading. Explain why the research matters and its real-world relevance where the evidence supports it. If the document has limited findings, say what the available material establishes and give a meaningful, clearly labelled interpretation of its scientific value. Never invent information or use the phrase "Specific Data/Findings Unavailable".
"""

        summary = await self._generate(
            prompt,
            system_prompt=(
                "You are a professional researcher and science communicator preparing concise, publication-quality briefing material. "
                "Write clear, human-quality English rather than mechanical metadata summaries. Do not add headings such as Resource Type, Publication Date, Metadata Summary, or File Information unless the user explicitly asks for them."
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
PolarNexus research workspace. Lead with context and significance, use natural complete paragraphs, and make the result presentation-ready for scientific, policy, and innovation audiences. Do not fabricate statistics or sources.
"""

        generated = await self._generate(
            prompt,
            system_prompt=(
                "You are a professional researcher and science communicator. "
                "Write clear, human-quality English that is useful to researchers, government stakeholders, and scientific audiences. "
                "Avoid mechanical metadata summaries and only make claims supported by the supplied topic and instructions."
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

    async def resource_action(self, **kwargs: object) -> dict[str, Any]:
        resource_id = kwargs.get("resource_id")
        action = str(kwargs.get("action", "")).strip()
        instructions = str(kwargs.get("instructions") or "").strip()

        async with SessionLocal() as db:
            resource = await db.get(Resource, resource_id)

        if resource is None:
            raise HTTPException(status_code=404, detail="Selected resource was not found.")

        source, _, source_kind = self._resource_context(resource)
        if not source:
            raise HTTPException(
                status_code=422,
                detail="This resource has insufficient content for AI processing.",
            )
        action_prompts = {
            "summarize": """Create a presentation-ready research briefing. Use exactly these headings: Executive Summary, Key Insights, Scientific Importance, Potential Applications, Conclusion. Start with a concise executive summary, use complete natural paragraphs, and explain why the work matters in practice. When detailed findings are not present, describe the available evidence and give a useful interpretation of its value without inventing results or saying 'Specific Data/Findings Unavailable'.""",
            "blog": """Write an engaging, public-facing blog article with a compelling title and introduction, a clear explanation of the research context and significance, and a strong conclusion. Use natural prose and informative section headings. Connect to Antarctica, Arctic science, climate, sustainability, biodiversity, logistics, or polar operations only when supported by the resource. Do not turn record fields into robotic sections.""",
            "news": """Write a factual, news-style article with a compelling headline, a concise lead, explanatory body paragraphs, and a strong closing paragraph. Make the significance clear for scientific, policy, and public audiences. Attribute only what the supplied resource establishes; where findings are limited, explain the initiative's importance without overstating results.""",
            "linkedin": """Write a polished, professional LinkedIn post for researchers, innovation-challenge judges, government stakeholders, and scientific audiences. Open with a strong but factual hook, explain why the work matters in concise paragraphs, and close with a forward-looking takeaway. Include a small set of relevant hashtags only when appropriate. Do not invent achievements, data, or partnerships.""",
        }
        if action not in action_prompts:
            raise HTTPException(status_code=422, detail="Unsupported resource action.")

        content = await self._generate(
            f"""{action_prompts[action]}

Resource information:
{source}

Additional user instructions:
{instructions or 'None'}""",
            system_prompt=(
                "You are an expert polar researcher, science communicator, policy analyst, and expedition specialist. "
                "Produce human-quality, presentation-ready writing from the supplied resource only. "
                "Prioritize context, significance, scientific impact, and real-world relevance over restating metadata. "
                "Avoid robotic headings such as Resource Type, Publication Date, Metadata Summary, and File Information unless explicitly requested. "
                "When evidence is limited, state that gracefully and explain the resource's likely value without fabricating findings, statistics, citations, or claims."
            ),
        )
        return {"action": action, "resource_id": str(resource.id), "source_kind": source_kind, "content": content}

    async def translate(self, **kwargs: object) -> dict[str, Any]:
        resource_id = kwargs.get("resource_id")
        content = str(kwargs.get("content") or "").strip()
        target_language = str(kwargs.get("target_language", "")).strip()
        source_kind = "provided text"
        if resource_id:
            async with SessionLocal() as db:
                resource = await db.get(Resource, resource_id)
            if resource is None:
                raise HTTPException(status_code=404, detail="Selected resource was not found.")
            _, content, source_kind = self._resource_context(resource)
        if not content:
            raise HTTPException(
                status_code=422,
                detail="This resource has insufficient content for AI processing.",
            )

        translated = await self._generate(
            f"Translate the following text into {target_language}. Preserve formatting, headings, citations, numbers, and hashtags. Return only the translation.\n\n{content}",
            system_prompt="You are a precise research translation assistant.",
        )
        return {"resource_id": str(resource_id) if resource_id else None, "source_kind": source_kind, "target_language": target_language, "content": translated}


ai_service = AIService()
