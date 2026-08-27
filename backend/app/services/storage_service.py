from fastapi import HTTPException, UploadFile
from ..config import get_settings

class StorageService:
    """Supabase Storage boundary; configure a Supabase client here without exposing its service key."""
    async def upload(self, file: UploadFile, destination: str) -> str:
        if not get_settings().supabase_service_role_key:
            raise HTTPException(501, "Supabase Storage is not configured")
        raise HTTPException(501, "Supabase Storage client integration is pending configuration")
