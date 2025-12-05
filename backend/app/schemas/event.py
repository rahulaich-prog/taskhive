# app/schemas/event.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class EventCreate(BaseModel):
    title: str = Field(..., examples=["Study Group"])
    description: Optional[str] = None
    starts_at: datetime
    ends_at: Optional[datetime]
    location: Optional[str] = None

class EventUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    starts_at: Optional[datetime]
    ends_at: Optional[datetime]
    location: Optional[str]

class EventOut(BaseModel):
    id: int
    user_id: str
    title: str
    description: Optional[str]
    starts_at: datetime
    ends_at: Optional[datetime]
    created_at: datetime
    location: Optional[str]

    class Config:
        orm_mode = True
