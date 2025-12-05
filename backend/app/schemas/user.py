from pydantic import BaseModel,EmailStr

class UserPublic(BaseModel):
    id: str
    email : EmailStr | None

class UserInDB(UserPublic):
    raw : dict | None = None
