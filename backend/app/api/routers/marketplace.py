# app/api/routers/marketplace.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from decimal import Decimal
from app.api.deps import get_current_user
from app.db.supabase_client import get_global_supabase
from app.schemas.marketplace import MarketplaceItemCreate, MarketplaceItemUpdate, MarketplaceItemOut

router = APIRouter(prefix="/marketplace", tags=["marketplace"])

@router.post("/", response_model=MarketplaceItemOut, status_code=status.HTTP_201_CREATED)
async def create_item(payload: MarketplaceItemCreate, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    price_val = str(payload.price) if isinstance(payload.price, Decimal) else payload.price
    resp = await supabase.table("marketplace_items").insert({
        "user_id": user["id"],
        "title": payload.title,
        "description": payload.description,
        "price": price_val,
        "available": payload.available
    }).select("*").execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data or len(data) == 0:
        raise HTTPException(status_code=500, detail="Failed to create marketplace item")
    return data[0]

@router.get("/", response_model=List[MarketplaceItemOut])
async def list_items(
    limit: int = Query(20, ge=1, le=100),
    offset: int = 0,
    available: Optional[bool] = True
):
    supabase = get_global_supabase()
    query = supabase.table("marketplace_items").select("*")
    if available is not None:
        query = query.eq("available", available)
    resp = await query.order("created_at", {"ascending": False}).limit(limit).offset(offset).execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    return data

@router.get("/mine", response_model=List[MarketplaceItemOut])
async def list_my_items(user=Depends(get_current_user), limit: int = Query(50, ge=1, le=200), offset: int = 0):
    supabase = get_global_supabase()
    resp = await supabase.table("marketplace_items").select("*").eq("user_id", user["id"]).order("created_at", {"ascending": False}).limit(limit).offset(offset).execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    return data

@router.get("/{item_id}", response_model=MarketplaceItemOut)
async def get_item(item_id: int):
    supabase = get_global_supabase()
    resp = await supabase.table("marketplace_items").select("*").eq("id", item_id).single().execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return data

@router.patch("/{item_id}", response_model=MarketplaceItemOut)
async def update_item(item_id: int, payload: MarketplaceItemUpdate, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    updates = payload.model_dump(exclude_unset=True)
    if "price" in updates:
        updates["price"] = str(updates["price"])
    resp = await supabase.table("marketplace_items").update(updates).eq("id", item_id).eq("user_id", user["id"]).select("*").single().execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found or not allowed")
    return data

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    await supabase.table("marketplace_items").delete().eq("id", item_id).eq("user_id", user["id"]).execute()
    return None
