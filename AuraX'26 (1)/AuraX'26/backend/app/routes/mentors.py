from fastapi import APIRouter, HTTPException
from app.database import get_db
from app.models.mentor import Mentor, MentorRequest
from bson import ObjectId
from typing import List

router = APIRouter()

def mentor_serializer(mentor) -> dict:
    return {
        "id": str(mentor["_id"]),
        "name": mentor["name"],
        "domain": mentor["domain"],
        "available": mentor.get("available", True),
        "avatar": mentor["avatar"],
    }

def request_serializer(req) -> dict:
    return {
        "id": str(req["_id"]),
        "mentor_id": req["mentor_id"],
        "team_name": req["team_name"],
        "issue": req["issue"],
        "status": req.get("status", "pending"),
        "created_at": str(req.get("created_at", "")),
    }

# GET all mentors
@router.get("/", response_model=List[dict])
async def get_mentors():
    db = get_db()
    mentors = await db.mentors.find().to_list(100)
    return [mentor_serializer(m) for m in mentors]

# GET single mentor
@router.get("/{mentor_id}")
async def get_mentor(mentor_id: str):
    db = get_db()
    mentor = await db.mentors.find_one({"_id": ObjectId(mentor_id)})
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    return mentor_serializer(mentor)

# POST create mentor (admin)
@router.post("/", response_model=dict)
async def create_mentor(mentor: Mentor):
    db = get_db()
    result = await db.mentors.insert_one(mentor.model_dump())
    created = await db.mentors.find_one({"_id": result.inserted_id})
    return mentor_serializer(created)

# PUT update mentor availability
@router.put("/{mentor_id}/availability")
async def update_availability(mentor_id: str, available: bool):
    db = get_db()
    result = await db.mentors.update_one(
        {"_id": ObjectId(mentor_id)},
        {"$set": {"available": available}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Mentor not found")
    return {"message": "Availability updated"}

# POST submit mentor help request
@router.post("/requests/", response_model=dict)
async def create_request(request: MentorRequest):
    db = get_db()
    result = await db.mentor_requests.insert_one(request.model_dump())
    created = await db.mentor_requests.find_one({"_id": result.inserted_id})
    return request_serializer(created)

# GET all mentor requests
@router.get("/requests/all", response_model=List[dict])
async def get_all_requests():
    db = get_db()
    requests = await db.mentor_requests.find().to_list(100)
    return [request_serializer(r) for r in requests]

# PUT update request status
@router.put("/requests/{request_id}/status")
async def update_request_status(request_id: str, status: str):
    db = get_db()
    result = await db.mentor_requests.update_one(
        {"_id": ObjectId(request_id)},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Request not found")
    return {"message": "Request status updated"}