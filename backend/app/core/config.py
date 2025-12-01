"""Configuration settings for the application."""

from pathlib import Path

from dotenv import load_dotenv
import os

load_dotenv()

ROOT_DIR = Path(__file__).resolve().parents[2]
env_path = ROOT_DIR / ".env"
load_dotenv(env_path)


postgres_url = os.getenv("POSTGRES_URL") or os.getenv("DATABASE_URL")