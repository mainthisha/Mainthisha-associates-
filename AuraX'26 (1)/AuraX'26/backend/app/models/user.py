from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class User(BaseModel):
    id: Optional[str] = None
    name: str
    college: str
    email: Optional[str] = None
    password: Optional[str] = None
    interests: List[str] = []
    registered_events: List[str] = []
    bookmarks: List[str] = []
    skills: List[str] = []
    bio: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)