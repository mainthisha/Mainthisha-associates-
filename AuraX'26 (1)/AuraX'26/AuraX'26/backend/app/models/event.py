from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class SeatInfo(BaseModel):
    total: int
    filled: int

class Event(BaseModel):
    id: Optional[str] = None
    name: str
    category: str
    description: str
    date: str
    startTime: str
    endTime: str
    venue: str
    seats: SeatInfo
    stage: int = 0
    stages: List[str]
    techStack: List[str] = []
    team: str
    prize: str
    tags: List[str]
    color: str
    created_at: datetime = Field(default_factory=datetime.utcnow)