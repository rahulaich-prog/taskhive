from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user
from app.utils.roles import require_admin
from app.db.supabase_client import get_global_supabase

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/stats")
async def stats(user=Depends(get_current_user)):
    require_admin(user)
    supabase = get_global_supabase()
    # Example stats: total users, total items
    users_count = await supabase.table("auth.users").select("id", count="exact").execute()
    # adapt to your SDK's response shape
    return {"users": users_count}
