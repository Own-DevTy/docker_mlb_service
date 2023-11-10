import json

from typing import Any, List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import schemas
from api import deps

router = APIRouter()


@router.get("/{keyword}", response_model=schemas.base.Search)
async def search_team_name(keyword: str, limit=5, db: Session = Depends(deps.get_db)) -> Any:
    hitting = crud.hitting.get_id_and_name_by_like_name(db=db, limit=limit, like=keyword)
    pitching = crud.pitching.get_id_and_name_by_like_name(db=db, limit=limit, like=keyword)
    team = crud.team.get_id_and_name_by_like_name(db=db, limit=limit, like=keyword)

    return {"hitting": hitting, "pitching": pitching, "team": team}
