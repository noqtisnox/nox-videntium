from typing import Annotated

from fastapi import Depends
from sqlmodel import SQLModel, create_engine, Session

from app.core.config import postgres_url


if not postgres_url:
  raise RuntimeError(
    f"Database URL not set. Please set POSTGRES_URL or DATABASE_URL in environment"
  )

engine = create_engine(postgres_url)


def create_db_and_tables() -> None:
  SQLModel.metadata.create_all(engine)


def get_session():
  with Session(engine) as session:
    yield session


SessionDep = Annotated[Session, Depends(get_session)]