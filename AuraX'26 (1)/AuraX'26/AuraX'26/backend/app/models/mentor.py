from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Mentor(BaseModel):
    id: Optional[str] = None
    name: str
    domain: str
    available: bool = True
    avatar: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MentorRequest(BaseModel):
    id: Optional[str] = None
    mentor_id: str
    team_name: str
    issue: str
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)