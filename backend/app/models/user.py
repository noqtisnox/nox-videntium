"""User model definition."""

from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
  id: int | None = Field(default=None, primary_key=True)
  first_name: str = Field(index=True)
  last_name: str = Field(index=True)
  patronim: str = Field(index=True)
  email: str = Field(index=True, unique=True)
  role: str = Field(index=True)


class UserCreate(SQLModel):
  first_name: str
  last_name: str
  patronim: str
  email: str
  role: str
  

class UserRead(SQLModel):
  id: int
  first_name: str
  last_name: str
  patronim: str
  email: str
  role: str


class UserUpdate(SQLModel):
  first_name: str | None = None
  last_name: str | None = None
  patronim: str | None = None
  email: str | None = None
  role: str | None = None


class UserDelete(SQLModel):
  id: int