from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_db, close_db
from app.routes import events, users, mentors, faqs, participants

app = FastAPI(
    title="AuraX'26 API",
    description="Backend API for AuraX'26 Tech Fest — KGiSL Institute of Technology",
    version="1.0.0"
)

# CORS — allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB on startup
@app.on_event("startup")
async def startup():
    await connect_db()

# Close MongoDB on shutdown
@app.on_event("shutdown")
async def shutdown():
    await close_db()

# Include all routes
app.include_router(users.router,        prefix="/api/users",        tags=["Users"])
app.include_router(events.router,       prefix="/api/events",       tags=["Events"])
app.include_router(mentors.router,      prefix="/api/mentors",      tags=["Mentors"])
app.include_router(faqs.router,         prefix="/api/faqs",         tags=["FAQs"])
app.include_router(participants.router, prefix="/api/participants",  tags=["Participants"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to AuraX'26 API",
        "fest": "AuraX'26",
        "college": "KGiSL Institute of Technology",
        "date": "April 1, 2026",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "ok"}