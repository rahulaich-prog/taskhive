# app/schemas/study.py
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class StudyPlanCreate(BaseModel):
    title: str = Field(..., examples=["Semester 2 Study Plan"])
    subjects: List[str] = Field(default_factory=list, examples=["Math", "DSA"])
    duration: Optional[str] = None  # e.g. "4 months"
    deadline: Optional[datetime] = None

class StudyPlanUpdate(BaseModel):
    title: Optional[str]
    subjects: Optional[List[str]]
    duration: Optional[str]
    deadline: Optional[datetime]
    progress: Optional[int]
    status: Optional[str]

class StudyPlanOut(BaseModel):
    id: int
    user_id: str
    title: str
    subjects: List[str]
    duration: Optional[str]
    progress: int
    status: str
    created_at: datetime
    deadline: Optional[datetime]

    class Config:
        orm_mode = True
