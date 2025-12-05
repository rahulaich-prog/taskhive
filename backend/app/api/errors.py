from fastapi import HTTPException, status

def supabase_error_to_http(exc: Exception, fallback_message: str = "Service error"):
    # Map common supabase/database errors to HTTP responses
    msg = str(exc)
    if "permission denied" in msg.lower():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    if "duplicate key value" in msg.lower():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Conflict: duplicate")
    # default
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=fallback_message)
