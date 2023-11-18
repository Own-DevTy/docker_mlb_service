from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import schemas
from api import deps

router = APIRouter()


@router.get("/AL", response_model=schemas.base.League)
async def get_team_by_american_league(db: Session = Depends(deps.get_db)) -> Any:
    team = crud.team.get_by_league(db, "American League")
    return {"teams": team}


@router.get("/NL", response_model=schemas.base.League)
async def get_team_by_league_league(db: Session = Depends(deps.get_db)) -> Any:
    team = crud.team.get_by_league(db, "National League")
    return {"teams": team}
