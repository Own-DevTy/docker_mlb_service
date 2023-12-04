from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import schemas
from api import deps

router = APIRouter()


@router.get('/hitting', response_model=schemas.base.AllSearchHitting)
async def search_all_hitting(skip: int = 0, limit: int = 1000, db: Session = Depends(deps.get_db)) -> Any:
    size = crud.hitting.get_rows(db)
    hitting = crud.hitting.get_multi(db, skip=skip, limit=limit)
    return {'size': size, "hitting": hitting}


@router.get('/pitching', response_model=schemas.base.AllSearchPitching)
async def search_all_hitting(skip: int = 0, limit: int = 1000, db: Session = Depends(deps.get_db)) -> Any:
    size = crud.pitching.get_rows(db)
    pitching = crud.pitching.get_multi(db, skip=skip, limit=limit)
    return {'size': size, "pitching": pitching}
