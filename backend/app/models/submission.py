"""Submission model definition."""

from sqlmodel import Field, SQLModel, UniqueConstraint
from typing import Literal
from datetime import datetime

SubmissionStatus = Literal["none", "submitted", "late", "graded"]


class SubmissionBase(SQLModel):
    # Foreign keys
    assignment_id: int = Field(index=True, foreign_key="assignment.id")
    student_id: int = Field(index=True, foreign_key="user.id") # Only students submit

    file_url: str | None = None # Path/URL to the submitted file (e.g., your test-pdf.pdf)
    submitted_at: datetime | None = None
    
    status: SubmissionStatus = Field(default="none")
    grade_value: str | None = Field(default=None)
    feedback: str | None = None
    graded_by_id: int | None = Field(default=None, foreign_key="user.id") # Optional: ID of the instructor who graded it
    graded_at: datetime | None = None


class Submission(SubmissionBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    
    __table_args__ = (
        UniqueConstraint("assignment_id", "student_id"), 
        {"extend_existing": True}
    )


# TODO: Define Create/Read/Update models