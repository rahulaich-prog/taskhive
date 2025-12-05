from fastapi import HTTPException, status

def require_admin(user: dict):
    jwt = user.get("raw", {})
    claims = jwt.get("user_metadata", {}) or jwt.get("app_metadata", {}) or {}
    role = claims.get("role") or jwt.get("role")
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin privileges required")

# Expect the token to contain a 'role' claim OR check elsewhere if maintaining an admins table, query it instead.