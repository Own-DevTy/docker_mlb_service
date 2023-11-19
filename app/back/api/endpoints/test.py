from typing import Any

from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from api import deps

router = APIRouter()


@router.get("/")
def read_users(
    db: Session = Depends(deps.get_db),
) -> Any:
    return {"Hello World"}