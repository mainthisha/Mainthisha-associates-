from fastapi import APIRouter, HTTPException
from app.database import get_db
from app.schemas.event import EventCreate, EventResponse, SeatUpdate, StageUpdate
from bson import ObjectId
from typing import List, Optional

router = APIRouter()

def event_serializer(event) -> dict:
    return {
        "id": str(event["_id"]),
        "name": event["name"],
        "category": event["category"],
        "description": event["description"],
        "date": event["date"],
        "startTime": event["startTime"],
        "endTime": event["endTime"],
        "venue": event["venue"],
        "seats": event["seats"],
        "stage": event.get("stage", 0),
        "stages": event["stages"],
        "techStack": event.get("techStack", []),
        "team": event["team"],
        "prize": event["prize"],
        "tags": event["tags"],
        "color": event["color"],
    }

# GET all events
@router.get("/", response_model=List[dict])
async def get_events(category: Optional[str] = None, tag: Optional[str] = None):
    db = get_db()
    query = {}
    if category:
        query["category"] = category
    if tag:
        query["tags"] = tag
    events = await db.events.find(query).to_list(100)
    return [event_serializer(e) for e in events]

# GET single event by ID
@router.get("/{event_id}")
async def get_event(event_id: str):
    db = get_db()
    event = await db.events.find_one({"_id": ObjectId(event_id)})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event_serializer(event)

# POST create new event
@router.post("/", response_model=dict)
async def create_event(event: EventCreate):
    db = get_db()
    event_dict = event.model_dump()
    result = await db.events.insert_one(event_dict)
    created = await db.events.find_one({"_id": result.inserted_id})
    return event_serializer(created)

# PUT update seat count
@router.put("/{event_id}/seats")
async def update_seats(event_id: str, seat_data: SeatUpdate):
    db = get_db()
    result = await db.events.update_one(
        {"_id": ObjectId(event_id)},
        {"$set": {"seats.filled": seat_data.filled}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Seats updated successfully"}

# PUT update event stage
@router.put("/{event_id}/stage")
async def update_stage(event_id: str, stage_data: StageUpdate):
    db = get_db()
    result = await db.events.update_one(
        {"_id": ObjectId(event_id)},
        {"$set": {"stage": stage_data.stage}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Stage updated successfully"}

# DELETE event
@router.delete("/{event_id}")
async def delete_event(event_id: str):
    db = get_db()
    result = await db.events.delete_one({"_id": ObjectId(event_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}