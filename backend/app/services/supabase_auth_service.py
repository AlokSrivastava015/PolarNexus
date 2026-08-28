from typing import Any
import httpx
from fastapi import HTTPException, status
from ..config import get_settings


class SupabaseAuthService:
    """Small server-side adapter for Supabase Auth (GoTrue)."""

    def _settings(self):
        settings = get_settings()
        if not settings.supabase_url or not settings.supabase_anon_key:
            raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, "Supabase Auth is not configured")
        return settings

    async def _request(self, method: str, path: str, *, payload: dict[str, Any]) -> dict[str, Any]:
        settings = self._settings()
        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.request(
                method,
                f"{settings.supabase_url.rstrip('/')}/auth/v1{path}",
                headers={"apikey": settings.supabase_anon_key, "Content-Type": "application/json"},
                json=payload,
            )
        if response.is_error:
            detail = response.json().get("msg") if response.headers.get("content-type", "").startswith("application/json") else None
            raise HTTPException(status.HTTP_401_UNAUTHORIZED if response.status_code in (400, 401, 422) else status.HTTP_502_BAD_GATEWAY, detail or "Supabase authentication request failed")
        return response.json()

    async def signup(self, email: str, password: str, metadata: dict[str, Any]) -> dict[str, Any]:
        return await self._request("POST", "/signup", payload={"email": email, "password": password, "data": metadata})

    async def login(self, email: str, password: str) -> dict[str, Any]:
        return await self._request("POST", "/token?grant_type=password", payload={"email": email, "password": password})

    async def request_password_reset(self, email: str) -> None:
        await self._request("POST", "/recover", payload={"email": email})

    @staticmethod
    def user_from_response(response: dict[str, Any]) -> dict[str, Any] | None:
        """Support GoTrue REST and Supabase-client response envelopes."""
        candidates = (response.get("user"), response.get("data", {}).get("user") if isinstance(response.get("data"), dict) else None, response)
        for candidate in candidates:
            if isinstance(candidate, dict) and candidate.get("id"):
                return candidate
        return None


supabase_auth = SupabaseAuthService()
