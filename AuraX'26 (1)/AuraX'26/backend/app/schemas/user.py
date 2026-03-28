from pydantic import BaseModel, EmailStr
from typing import List, Optional

# Used when creating a new user
class UserCreate(BaseModel):
    name: str
    college: str
    email: Optional[str] = None
    password: Optional[str] = None
    interests: List[str] = []

# Used when returning user data
class UserResponse(BaseModel):
    id: str
    name: str
    college: str
    email: Optional[str] = None
    interests: List[str] = []
    registered_events: List[str] = []
    bookmarks: List[str] = []
    skills: List[str] = []
    bio: Optional[str] = None

# Used when updating user profile
class UserUpdate(BaseModel):
    name: Optional[str] = None
    college: Optional[str] = None
    interests: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    bio: Optional[str] = None

# Used for login
class UserLogin(BaseModel):
    email: str
    password: str

# JWT token response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse