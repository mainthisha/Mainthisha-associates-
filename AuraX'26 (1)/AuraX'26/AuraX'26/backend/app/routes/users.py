from fastapi import APIRouter, HTTPException
from app.database import get_db
from app.schemas.user import UserCreate, UserResponse, UserUpdate, UserLogin, Token
from bson import ObjectId
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.core.config import settings
from typing import List

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def user_serializer(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "college": user["college"],
        "email": user.get("email"),
        "interests": user.get("interests", []),
        "registered_events": user.get("registered_events", []),
        "bookmarks": user.get("bookmarks", []),
        "skills": user.get("skills", []),
        "bio": user.get("bio"),
    }

def create_token(user_id: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(
        {"sub": user_id, "exp": expire},
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

# POST register new user
@router.post("/register", response_model=dict)
async def register(user: UserCreate):
    db = get_db()

    # Check if email already exists
    if user.email:
        existing = await db.users.find_one({"email": user.email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")

    user_dict = user.model_dump()

    # Hash password if provided
    if user.password:
        user_dict["password"] = pwd_context.hash(user.password)

    result = await db.users.insert_one(user_dict)
    created = await db.users.find_one({"_id": result.inserted_id})
    token = create_token(str(result.inserted_id))

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_serializer(created)
    }

# POST login
@router.post("/login", response_model=dict)
async def login(credentials: UserLogin):
    db = get_db()
    user = await db.users.find_one({"email": credentials.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not pwd_context.verify(credentials.password, user.get("password", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(str(user["_id"]))
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_serializer(user)
    }

# GET user by ID
@router.get("/{user_id}", response_model=dict)
async def get_user(user_id: str):
    db = get_db()
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user_serializer(user)

# PUT update user profile
@router.put("/{user_id}", response_model=dict)
async def update_user(user_id: str, update_data: UserUpdate):
    db = get_db()
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    result = await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    updated = await db.users.find_one({"_id": ObjectId(user_id)})
    return user_serializer(updated)

# POST register for an event
@router.post("/{user_id}/register-event/{event_id}")
async def register_event(user_id: str, event_id: str):
    db = get_db()
    result = await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$addToSet": {"registered_events": event_id}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    # Increment seat count
    await db.events.update_one(
        {"_id": ObjectId(event_id)},
        {"$inc": {"seats.filled": 1}}
    )
    return {"message": "Registered for event successfully"}

# DELETE unregister from event
@router.delete("/{user_id}/register-event/{event_id}")
async def unregister_event(user_id: str, event_id: str):
    db = get_db()
    result = await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$pull": {"registered_events": event_id}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    await db.events.update_one(
        {"_id": ObjectId(event_id)},
        {"$inc": {"seats.filled": -1}}
    )
    return {"message": "Unregistered from event successfully"}

# POST bookmark an event
@router.post("/{user_id}/bookmark/{event_id}")
async def bookmark_event(user_id: str, event_id: str):
    db = get_db()
    result = await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$addToSet": {"bookmarks": event_id}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Event bookmarked"}

# DELETE remove bookmark
@router.delete("/{user_id}/bookmark/{event_id}")
async def remove_bookmark(user_id: str, event_id: str):
    db = get_db()
    result = await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$pull": {"bookmarks": event_id}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Bookmark removed"}

# GET all users (for participant profiles)
@router.get("/", response_model=List[dict])
async def get_all_users():
    db = get_db()
    users = await db.users.find().to_list(100)
    return [user_serializer(u) for u in users]