"""Course model definition."""

from sqlmodel import Field, SQLModel


class CourseBase(SQLModel):
    name: str = Field(index=True)
    code: str = Field(index=True, unique=True)
    description: str | None = None


class Course(CourseBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int


class CourseUpdate(SQLModel):
    name: str | None = None
    code: str | None = None
    description: str | None = None