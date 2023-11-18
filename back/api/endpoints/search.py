from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import schemas
from api import deps

router = APIRouter()


@router.get("/{keyword}", response_model=schemas.base.Search)
async def search_all_record_like_name(keyword: str, limit=5, db: Session = Depends(deps.get_db)) -> Any:
    hitting = crud.hitting.get_id_and_name_by_like_name(db=db, limit=limit, like=keyword)
    pitching = crud.pitching.get_id_and_name_by_like_name(db=db, limit=limit, like=keyword)
    team = crud.team.get_id_and_name_by_like_name(db=db, limit=limit, like=keyword)
    return {"hitting": hitting, "pitching": pitching, "team": team}


@router.get("/{keyword}/hitting", response_model=schemas.base.SearchHitting)
async def search_hitting_like_name(keyword: str, limit=5, db: Session = Depends(deps.get_db)) -> Any:
    hitting = crud.hitting.get_id_and_name_by_like_name(db=db, limit=limit, like=keyword)
    return {"hitting": hitting}


@router.get("/{keyword}/pitching", response_model=schemas.base.SearchHitting)
async def search_pitching_like_name(keyword: str, limit=5, db: Session = Depends(deps.get_db)) -> Any:
    pitching = crud.hitting.get_id_and_name_by_like_name(db=db, limit=limit, like=keyword)
    return {"pitching": pitching}


@router.get("/{keyword}/team", response_model=schemas.base.SearchHitting)
async def search_team_like_name(keyword: str, limit=5, db: Session = Depends(deps.get_db)) -> Any:
    team = crud.team.get_id_and_name_by_like_name(db=db, limit=limit, like=keyword)
    return {"team": team}


@router.get('/hitting/{team_id}', response_model=schemas.base.SearchHitting)
async def search_hitting_by_team_id(team_id: int, db: Session = Depends(deps.get_db)):
    hitting = crud.hitting.get_multi_by_team_id(db=db, team_id=team_id)
    return {"hitting": hitting}


@router.get('/pitching/{team_id}')
async def search_pitching_by_team_id(team_id: int, db: Session = Depends(deps.get_db)):
    pitching = crud.pitching.get_multi_by_team_id(db=db, team_id=team_id)
    return {"pitching": pitching}
