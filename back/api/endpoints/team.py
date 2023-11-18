import json
from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException

from sqlalchemy.orm import Session

from api import deps
import models
import schemas, crud

router = APIRouter()


@router.get("/AL", response_model=schemas.base.League)
async def get_team_by_american_league(db: Session = Depends(deps.get_db)) -> Any:
    team = crud.team.get_by_league(db, "American League")
    return {"teams": team}


@router.get("/NL", response_model=schemas.base.League)
async def get_team_by_league_league(db: Session = Depends(deps.get_db)) -> Any:
    team = crud.team.get_by_league(db, "National League")
    return {"teams": team}
