"""Router for users/ endpoints."""

from fastapi import APIRouter, HTTPException, status
from sqlmodel import select, or_
from sqlalchemy.sql import func

from app.database.connection import SessionDep
from app.models.user import User, UserCreate, UserUpdate

router = APIRouter(prefix="/api/v1/users", tags=["users"])


@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user(session: SessionDep, user_in: UserCreate):
    """
    Create a new user.
    """
    db_user = User.model_validate(user_in)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@router.get("/", response_model=list[User])
async def read_users(
    session: SessionDep,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
):
    """
    Retrieves users with optional filtering by first name, last name, and email.
    """
    query = select(User)
    filters = []

    if first_name:
        filters.append(func.lower(User.first_name).contains(first_name.lower()))

    if last_name:
        filters.append(func.lower(User.last_name).contains(last_name.lower()))

    if email:
        filters.append(func.lower(User.email).contains(email.lower()))

    if filters:
        query = query.where(*filters)

    users = session.exec(query).all()
    return users


@router.get("/search-all", response_model=list[User])
async def search_all_user_fields(session: SessionDep, query: str | None = None):
    """
    Searches for users across all fields: first name, last name, patronymic, and email.
    """
    if not query:
        return session.exec(select(User)).all()

    # Convert the search query to lowercase once
    search_lower = query.lower()

    users = session.exec(
        select(User).where(
            or_(
                func.lower(User.first_name).contains(search_lower),
                func.lower(User.last_name).contains(search_lower),
                func.lower(User.patronim).contains(search_lower),
                func.lower(User.email).contains(search_lower),
            )
        )
    ).all()

    return users


@router.patch("/{user_id}", response_model=User)
def update_user(session: SessionDep, user_id: int, user_in: UserUpdate):
    """
    Updates an existing user's details. Only sends fields are modified.
    """
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")

    update_data = user_in.model_dump(exclude_unset=True)

    db_user.sqlmodel_update(update_data)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(session: SessionDep, user_id: int):
    """
    Deletes a user from the database.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    session.delete(user)
    session.commit()

    return
