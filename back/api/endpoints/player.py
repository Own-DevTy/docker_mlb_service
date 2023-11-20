from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import schemas
from api import deps

router = APIRouter()


@router.get("/{id}/hitting")
async def get_stat_hitting_by_id(id: int, db: Session = Depends(deps.get_db)) -> Any:
    return {crud.hitting.get_stat_hitting_by_id(db=db, id=id)}


@router.get("/{id}/pitching", response_model=schemas.player.PitchingStat)
async def get_stat_pitching_by_id(id: int, db: Session = Depends(deps.get_db)) -> Any:
    pitching = crud.pitching.get_stat_pitching_by_id(db=db, id=id)
    return pitching
