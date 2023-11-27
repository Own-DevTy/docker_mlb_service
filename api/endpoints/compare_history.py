from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException

from pydantic.networks import EmailStr

from sqlalchemy.orm import Session

import crud
import schemas
from api import deps
from models.compare_history import CompareHistory

router = APIRouter()


@router.get("/{user_id}", response_model=schemas.compare_history.CompareHistoryList)
def read_compare_history(*, db: Session = Depends(deps.get_db), user_id: int) -> List[CompareHistory]:
    histories = crud.compare_history.get_multi_by_user_id(db, user_id=user_id)
    return {"histories": histories}


@router.post("/{user_id}", response_model=Optional[schemas.compare_history.CompareHistory])
def create_compare_history(*, db: Session = Depends(deps.get_db),
                           user_id: int,
                           player_fir: int = Body(...),
                           player_sec: int = Body(...),
                           player_position: bool = Body(...)
                           ) -> Any:
    if crud.compare_history.validate_create_history(db, user_id=user_id, player_fir=player_fir, player_sec=player_sec):
        return None
    history_in = schemas.compare_history.CompareHistoryCreate(player_fir=player_fir,
                                                              player_sec=player_sec,
                                                              player_position=player_position)
    history = crud.compare_history.create_with_user_id(db, user_id=user_id, obj_in=history_in)
    return history


@router.delete("/{id}", response_model=schemas.compare_history.CompareHistory)
def delete_compare_history(*, db: Session = Depends(deps.get_db), id: int) -> CompareHistory:
    history = db.get(CompareHistory, id)
    if not history:
        raise HTTPException(status_code=404, detail="history not found")
    db.delete(history)
    db.commit()
    return history
