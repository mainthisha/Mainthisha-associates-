from pydantic import BaseModel
from typing import List, Optional

class SeatInfoSchema(BaseModel):
    total: int
    filled: int

# Used when creating an event
class EventCreate(BaseModel):
    name: str
    category: str
    description: str
    date: str
    startTime: str
    endTime: str
    venue: str
    seats: SeatInfoSchema
    stages: List[str]
    techStack: List[str] = []
    team: str
    prize: str
    tags: List[str]
    color: str

# Used when returning event data
class EventResponse(BaseModel):
    id: str
    name: str
    category: str
    description: str
    date: str
    startTime: str
    endTime: str
    venue: str
    seats: SeatInfoSchema
    stage: int
    stages: List[str]
    techStack: List[str]
    team: str
    prize: str
    tags: List[str]
    color: str

# Used when updating seat count
class SeatUpdate(BaseModel):
    filled: int

# Used when updating event stage
class StageUpdate(BaseModel):
    stage: int