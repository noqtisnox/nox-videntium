from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.api.v1 import users

@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.database.connection import create_db_and_tables
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(users.router)