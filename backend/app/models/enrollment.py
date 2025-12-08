"""Enrollment model definition."""

from sqlmodel import Field, SQLModel, UniqueConstraint
from typing import Literal


CourseRole = Literal["student", "professor", "assistant"]


class EnrollmentBase(SQLModel):
    course_id: int = Field(index=True, foreign_key="course.id")
    user_id: int = Field(index=True, foreign_key="user.id")
    role: CourseRole = Field(default="student")


class Enrollment(EnrollmentBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    
    __table_args__ = (
        UniqueConstraint("course_id", "user_id"), 
        {"extend_existing": True}
    )


class EnrollmentCreate(EnrollmentBase):
    pass


class EnrollmentRead(EnrollmentBase):
    id: int


class EnrollmentUpdate(SQLModel):
    role: CourseRole | None = None