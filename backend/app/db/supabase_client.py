from typing import Optional
from supabase import create_client, Client, AsyncClient, acreate_client
from app.core.config import settings

SUPABASE_URL = str(settings.SUPABASE_URL)
SERVICE_ROLE = settings.SUPABASE_SERVICE_ROLE_KEY

_async_client: Optional[AsyncClient] = None

async def init_supabase_client():
    global _async_client
    if _async_client is None:
        try:
            _async_client = await acreate_client(SUPABASE_URL, SERVICE_ROLE)
        except Exception:
            _async_client = create_client(SUPABASE_URL, SERVICE_ROLE)  # type: ignore

def get_global_supabase():
    return _async_client
