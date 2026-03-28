from fastapi import APIRouter, HTTPException
from app.database import get_db
from bson import ObjectId
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class FAQCreate(BaseModel):
    question: str
    answer: str
    tags: List[str] = []

def faq_serializer(faq) -> dict:
    return {
        "id": str(faq["_id"]),
        "question": faq["question"],
        "answer": faq["answer"],
        "tags": faq.get("tags", []),
    }

# GET all FAQs with optional search
@router.get("/", response_model=List[dict])
async def get_faqs(q: Optional[str] = None):
    db = get_db()
    if q:
        # Search in question, answer and tags
        faqs = await db.faqs.find({
            "$or": [
                {"question": {"$regex": q, "$options": "i"}},
                {"answer": {"$regex": q, "$options": "i"}},
                {"tags": {"$in": [q.lower()]}},
            ]
        }).to_list(100)
    else:
        faqs = await db.faqs.find().to_list(100)
    return [faq_serializer(f) for f in faqs]

# GET single FAQ
@router.get("/{faq_id}")
async def get_faq(faq_id: str):
    db = get_db()
    faq = await db.faqs.find_one({"_id": ObjectId(faq_id)})
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faq_serializer(faq)

# POST create FAQ
@router.post("/", response_model=dict)
async def create_faq(faq: FAQCreate):
    db = get_db()
    result = await db.faqs.insert_one(faq.model_dump())
    created = await db.faqs.find_one({"_id": result.inserted_id})
    return faq_serializer(created)

# DELETE FAQ
@router.delete("/{faq_id}")
async def delete_faq(faq_id: str):
    db = get_db()
    result = await db.faqs.delete_one({"_id": ObjectId(faq_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"message": "FAQ deleted"}