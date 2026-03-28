from fastapi import APIRouter, HTTPException, Query
from datetime import datetime, timezone
import uuid

from database import get_db
from schemas.registration import (
    IndividualRegistrationIn, IndividualRegistrationOut,
    TeamRegistrationIn, TeamRegistrationOut,
    VALID_EVENT_IDS,
)

router = APIRouter(prefix="/api/registrations", tags=["Registrations"])

def gen_reg_id() -> str:
    return "AX26-" + uuid.uuid4().hex[:6].upper()

def validate_event(event_id: str):
    if event_id not in VALID_EVENT_IDS:
        raise HTTPException(status_code=404, detail=f"Event '{event_id}' not found")


@router.post("/{event_id}/individual", response_model=IndividualRegistrationOut)
async def register_individual(event_id: str, payload: IndividualRegistrationIn):
    validate_event(event_id)
    db = get_db()

    existing = await db.registrations.find_one({"event_id": event_id, "type": "individual", "email": payload.email})
    if existing:
        raise HTTPException(status_code=409, detail=f"Email {payload.email} is already registered for this event")

    reg_id = gen_reg_id()
    doc = {
        "registration_id": reg_id,
        "event_id":        event_id,
        "type":            "individual",
        "registered_at":   datetime.now(timezone.utc),
        **payload.model_dump(),
    }
    await db.registrations.insert_one(doc)

    return IndividualRegistrationOut(
        registration_id=reg_id,
        event_id=event_id,
        full_name=payload.full_name,
        email=str(payload.email),
        phone=payload.phone,
        college=payload.college,
        department=payload.department,
        year_of_study=payload.year_of_study,
    )


@router.post("/{event_id}/team", response_model=TeamRegistrationOut)
async def register_team(event_id: str, payload: TeamRegistrationIn):
    validate_event(event_id)
    db = get_db()

    existing = await db.registrations.find_one({"event_id": event_id, "type": "team", "leader_email": payload.leader_email})
    if existing:
        raise HTTPException(status_code=409, detail=f"A team with leader email {payload.leader_email} is already registered")

    existing_name = await db.registrations.find_one({"event_id": event_id, "type": "team", "team_name": payload.team_name})
    if existing_name:
        raise HTTPException(status_code=409, detail=f"Team name '{payload.team_name}' is already taken for this event")

    reg_id = gen_reg_id()
    doc = {
        "registration_id": reg_id,
        "event_id":        event_id,
        "type":            "team",
        "registered_at":   datetime.now(timezone.utc),
        **payload.model_dump(),
    }
    await db.registrations.insert_one(doc)

    return TeamRegistrationOut(
        registration_id=reg_id,
        event_id=event_id,
        team_name=payload.team_name,
        leader_name=payload.leader_name,
        leader_email=str(payload.leader_email),
        college=payload.college,
        members=payload.members,
    )


@router.get("/{event_id}/check")
async def check_registration(event_id: str, email: str = Query(...)):
    validate_event(event_id)
    db = get_db()
    doc = await db.registrations.find_one({
        "event_id": event_id,
        "$or": [{"email": email}, {"leader_email": email}],
    })
    return {"registered": doc is not None}


@router.get("/{event_id}")
async def get_event_registrations(event_id: str):
    validate_event(event_id)
    db = get_db()
    cursor = db.registrations.find({"event_id": event_id}, {"_id": 0}).sort("registered_at", -1)
    docs = await cursor.to_list(length=500)
    return {"event_id": event_id, "count": len(docs), "registrations": docs}