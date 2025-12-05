# app/api/routers/study.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from app.api.deps import get_current_user
from app.db.supabase_client import get_global_supabase
from app.schemas.study import StudyPlanCreate, StudyPlanUpdate, StudyPlanOut

router = APIRouter(prefix="/study", tags=["study"])

@router.post("/", response_model=StudyPlanOut, status_code=status.HTTP_201_CREATED)
async def create_study_plan(payload: StudyPlanCreate, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    resp = await supabase.table("study_plans").insert({
        "user_id": user["id"],
        "title": payload.title,
        "subjects": payload.subjects,
        "duration": payload.duration,
        "deadline": payload.deadline
    }).select("*").execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data or len(data) == 0:
        raise HTTPException(status_code=500, detail="Failed to create study plan")
    return data[0]

@router.get("/", response_model=List[StudyPlanOut])
async def list_study_plans(
    user=Depends(get_current_user),
    limit: int = Query(20, ge=1, le=100),
    offset: int = 0,
    status: Optional[str] = None
):
    supabase = get_global_supabase()
    query = supabase.table("study_plans").select("*").eq("user_id", user["id"])
    if status:
        query = query.eq("status", status)
    resp = await query.order("created_at", {"ascending": False}).limit(limit).offset(offset).execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    return data

@router.get("/{plan_id}", response_model=StudyPlanOut)
async def get_study_plan(plan_id: int, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    resp = await supabase.table("study_plans").select("*").eq("id", plan_id).eq("user_id", user["id"]).single().execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Study plan not found")
    return data

@router.patch("/{plan_id}", response_model=StudyPlanOut)
async def update_study_plan(plan_id: int, payload: StudyPlanUpdate, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    updates = payload.model_dump(exclude_unset=True)
    resp = await supabase.table("study_plans").update(updates).eq("id", plan_id).eq("user_id", user["id"]).select("*").single().execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Study plan not found or not allowed")
    return data

@router.delete("/{plan_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_study_plan(plan_id: int, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    await supabase.table("study_plans").delete().eq("id", plan_id).eq("user_id", user["id"]).execute()
    return None
