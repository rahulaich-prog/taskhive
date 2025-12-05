from fastapi import APIRouter, Depends, HTTPException, status, Query
from app.api.deps import get_current_user
from app.services.storage_service import create_presigned_upload
from app.core.config import settings

router = APIRouter(prefix="/storage", tags=["storage"])

@router.post("/presign")
async def presign_upload(filename: str, user=Depends(get_current_user), bucket: str = "public", expires: int = 60):
    path = f"{user['id']}/{filename}"
    try:
        signed = await create_presigned_upload(bucket, path, expires)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create signed URL")
    return {"url": signed}
