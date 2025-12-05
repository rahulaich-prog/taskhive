# app/schemas/marketplace.py
from pydantic import BaseModel, Field, condecimal
from typing import Optional,Annotated
from datetime import datetime
from decimal import Decimal

class MarketplaceItemCreate(BaseModel):
    title: str = Field(..., examples=["Used Graphing Calculator"])
    description: Optional[str] = Field(None, examples=["Gently used, works fine"])
    price: Annotated[Decimal, Field(max_digits=12, decimal_places=2)]
    available: bool = True

class MarketplaceItemUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    price: Optional[Annotated[Decimal, Field(max_digits=12, decimal_places=2)]]
    available: Optional[bool]

class MarketplaceItemOut(BaseModel):
    id: int
    user_id: str
    title: str
    description: Optional[str]
    price: Decimal
    available: bool
    created_at: datetime

    class Config:
        orm_mode = True
        json_encoders = {Decimal: lambda v: str(v)}
