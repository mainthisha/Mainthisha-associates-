from fastapi import APIRouter, HTTPException
from app.database import get_db
from bson import ObjectId
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class ParticipantCreate(BaseModel):
    name: str
    college: str
    skills: List[str] = []
    events: List[str] = []
    bio: Optional[str] = None
    avatar: Optional[str] = None
    online: bool = False

def participant_serializer(p) -> dict:
    return {
        "id": str(p["_id"]),
        "name": p["name"],
        "college": p["college"],
        "skills": p.get("skills", []),
        "events": p.get("events", []),
        "bio": p.get("bio"),
        "avatar": p.get("avatar", p["name"][:2].upper()),
        "online": p.get("online", False),
    }

# GET all participants
@router.get("/", response_model=List[dict])
async def get_participants(skill: Optional[str] = None):
    db = get_db()
    query = {}
    if skill:
        query["skills"] = {"$in": [skill]}
    participants = await db.participants.find(query).to_list(100)
    return [participant_serializer(p) for p in participants]

# GET single participant
@router.get("/{participant_id}")
async def get_participant(participant_id: str):
    db = get_db()
    p = await db.participants.find_one({"_id": ObjectId(participant_id)})
    if not p:
        raise HTTPException(status_code=404, detail="Participant not found")
    return participant_serializer(p)

# POST create participant profile
@router.post("/", response_model=dict)
async def create_participant(participant: ParticipantCreate):
    db = get_db()
    result = await db.participants.insert_one(participant.model_dump())
    created = await db.participants.find_one({"_id": result.inserted_id})
    return participant_serializer(created)

# PUT update participant
@router.put("/{participant_id}", response_model=dict)
async def update_participant(participant_id: str, update: ParticipantCreate):
    db = get_db()
    result = await db.participants.update_one(
        {"_id": ObjectId(participant_id)},
        {"$set": update.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Participant not found")
    updated = await db.participants.find_one({"_id": ObjectId(participant_id)})
    return participant_serializer(updated)

# DELETE participant
@router.delete("/{participant_id}")
async def delete_participant(participant_id: str):
    db = get_db()
    result = await db.participants.delete_one({"_id": ObjectId(participant_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Participant not found")
    return {"message": "Participant deleted"}