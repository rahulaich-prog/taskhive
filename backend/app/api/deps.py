from fastapi import Depends,HTTPException,status
from fastapi.security import HTTPBearer , HTTPAuthorizationCredentials
from app.db.supabase_client import get_global_supabase
from app.core.config import settings

security = HTTPBearer(auto_error=False)

async def get_current_user(
    token : HTTPAuthorizationCredentials = Depends(security)
):
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Credentials")
    
    supabase = get_global_supabase()
    if supabase is None:
        raise HTTPException(status_code=500,detail="Supabase client not initialized")

    access_token = token.credentials
    
    resp = await supabase.auth.get_user(access_token)
    
    _user = None
    if resp is not None and hasattr(resp, "user") and resp.user is not None:
        _user = resp.user
    if not _user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid token")
    
    return{
        "id" : _user.id,
        "email" : _user.email,
        "raw_data" : _user
    }
        
        
