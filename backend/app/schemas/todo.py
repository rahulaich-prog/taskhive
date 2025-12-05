from pydantic import BaseModel, Field
from typing import List,Optional
from datetime import datetime

class TodoCreate(BaseModel):
    title: str = Field(...,min_length=1, max_length=200 ,examples=["completed"])
    description: Optional[str] = Field(None, examples=["Chapter 5: Graphs"])
    due_date: Optional[datetime] = None
    completed: bool = False

class TodoUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    due_date: Optional[datetime]
    completed: Optional[bool]

class TodoOut(BaseModel):
    id: int
    user_id: str
    title: str
    description: Optional[str]
    due_date: Optional[datetime]
    completed: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
