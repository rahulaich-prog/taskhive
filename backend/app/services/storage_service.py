from app.db.supabase_client import get_global_supabase
from app.core.config import settings
from typing import Optional

async def create_presigned_upload(bucket: str, path: str, expires_in: int = 60):
    """
    Returns a signed upload URL. The frontend should PUT the file to this URL (or POST depending on SDK).
    Note: Supabase Storage supports signed URLs and public access. This uses the Supabase SDK where possible.
    """
    supabase = get_global_supabase()
    if supabase is None:
        raise RuntimeError("Supabase not initialized")

    try:
        res = await supabase.storage.from_(bucket).create_signed_upload_url(path, expires_in)
        return res
    except Exception:
        return await supabase.storage.from_(bucket).create_signed_url(path, expires_in)
