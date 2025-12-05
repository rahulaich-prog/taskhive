# app/api/routers/events.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from app.api.deps import get_current_user
from app.db.supabase_client import get_global_supabase
from app.schemas.event import EventCreate, EventUpdate, EventOut

router = APIRouter(prefix="/events", tags=["events"])

@router.post("/", response_model=EventOut, status_code=status.HTTP_201_CREATED)
async def create_event(payload: EventCreate, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    resp = await supabase.table("events").insert({
        "user_id": user["id"],
        "title": payload.title,
        "description": payload.description,
        "starts_at": payload.starts_at,
        "ends_at": payload.ends_at,
        "location": payload.location
    }).select("*").execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data or len(data) == 0:
        raise HTTPException(status_code=500, detail="Failed to create event")
    return data[0]

@router.get("/", response_model=List[EventOut])
async def list_events(
    limit: int = Query(20, ge=1, le=100),
    offset: int = 0,
    upcoming: Optional[bool] = None
):
    supabase = get_global_supabase()
    query = supabase.table("events").select("*")
    if upcoming is True:
        # This uses Supabase filter; older SDKs require different syntax; this is the intended logic.
        query = query.gt("starts_at", "now()")
    resp = await query.order("starts_at", {"ascending": True}).limit(limit).offset(offset).execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    return data

@router.get("/mine", response_model=List[EventOut])
async def list_my_events(user=Depends(get_current_user), limit: int = Query(50, ge=1, le=200), offset: int = 0):
    supabase = get_global_supabase()
    resp = await supabase.table("events").select("*").eq("user_id", user["id"]).order("starts_at", {"ascending": False}).limit(limit).offset(offset).execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    return data

@router.get("/{event_id}", response_model=EventOut)
async def get_event(event_id: int):
    supabase = get_global_supabase()
    resp = await supabase.table("events").select("*").eq("id", event_id).single().execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return data

@router.patch("/{event_id}", response_model=EventOut)
async def update_event(event_id: int, payload: EventUpdate, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    updates = payload.model_dump(exclude_unset=True)
    resp = await supabase.table("events").update(updates).eq("id", event_id).eq("user_id", user["id"]).select("*").single().execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found or not allowed")
    return data

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(event_id: int, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    await supabase.table("events").delete().eq("id", event_id).eq("user_id", user["id"]).execute()
    return None
