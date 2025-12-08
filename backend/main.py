from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import users

@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.database.connection import create_db_and_tables
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

# --- CORS Configuration ---
origins = [
    "http://localhost:5173",  # Vite's default development address
    "http://127.0.0.1:5173",  # Include the IPv4 loopback version as a safety measure
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # Allows cookies, authorization headers, etc.
    allow_methods=["*"],    # Allows all HTTP methods (GET, POST, PATCH, DELETE)
    allow_headers=["*"],    # Allows all headers
)
# --------------------------

app.include_router(users.router)