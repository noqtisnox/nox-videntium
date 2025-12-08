"""Assignment model definition."""

from sqlmodel import Field, SQLModel
from datetime import datetime


class AssignmentBase(SQLModel):
    course_id: int = Field(index=True, foreign_key="course.id")
    title: str = Field(index=True)
    description: str | None = None
    due_date: datetime


class Assignment(AssignmentBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


# TODO: Define Create/Read/Update models