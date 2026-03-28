from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
import re

VALID_EVENT_IDS = {
    "hackathon", "ai_workshop", "robotics", "ui_design",
    "coding_contest", "gaming_arena", "paper_presentation", "iot_workshop",
}

def validate_phone(v: str) -> str:
    cleaned = re.sub(r"[\s\-]", "", v)
    if not re.match(r"^\+?\d{7,15}$", cleaned):
        raise ValueError("Enter a valid phone number")
    return v


class IndividualRegistrationIn(BaseModel):
    full_name:           str
    email:               EmailStr
    phone:               str
    college:             str
    department:          str
    year_of_study:       str
    skills:              Optional[str] = None
    github:              Optional[str] = None
    experience_level:    Optional[str] = None
    preferred_language:  Optional[str] = None
    preferred_tool:      Optional[str] = None
    game:                Optional[str] = None
    paper_title:         Optional[str] = None
    domain:              Optional[str] = None
    hardware_experience: Optional[str] = None

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v):
        return validate_phone(v)

    @field_validator("full_name", "college", "department")
    @classmethod
    def not_empty(cls, v):
        if not v.strip():
            raise ValueError("This field cannot be empty")
        return v.strip()


class IndividualRegistrationOut(BaseModel):
    registration_id: str
    event_id:        str
    full_name:       str
    email:           str
    phone:           str
    college:         str
    department:      str
    year_of_study:   str
    message:         str = "Registration successful"


class TeamRegistrationIn(BaseModel):
    team_name:       str
    leader_name:     str
    leader_email:    EmailStr
    leader_phone:    str
    college:         str
    skills:          str
    github:          Optional[str] = None
    members:         List[str]
    robot_category:  Optional[str] = None
    preferred_tool:  Optional[str] = None
    game:            Optional[str] = None
    paper_title:     Optional[str] = None
    domain:          Optional[str] = None

    @field_validator("leader_phone")
    @classmethod
    def check_phone(cls, v):
        return validate_phone(v)

    @field_validator("team_name", "leader_name", "college", "skills")
    @classmethod
    def not_empty(cls, v):
        if not v.strip():
            raise ValueError("This field cannot be empty")
        return v.strip()

    @field_validator("members")
    @classmethod
    def clean_members(cls, v):
        return [m.strip() for m in v if m.strip()]


class TeamRegistrationOut(BaseModel):
    registration_id: str
    event_id:        str
    team_name:       str
    leader_name:     str
    leader_email:    str
    college:         str
    members:         List[str]
    message:         str = "Team registration successful"