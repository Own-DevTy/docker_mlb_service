from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException

from pydantic.networks import EmailStr

from sqlalchemy.orm import Session

import crud
import schemas
from api import deps
from models.favorite import Favorite

router = APIRouter()


@router.get("/{user_id}", response_model=schemas.favorite.FavoriteList)
def read_favorites(*, db: Session = Depends(deps.get_db), user_id: int) -> List[Favorite]:
    favorites = crud.favorite.get_multi_by_user_id(db, user_id=user_id)
    return {"favorites": favorites}


@router.post("/{user_id}", response_model=Optional[schemas.favorite.Favorite])
def create_favorite(*, db: Session = Depends(deps.get_db),
                    user_id: int,
                    player_id: int = Body(...),
                    player_position: bool = Body(...)
                    ) -> Any:
    if crud.favorite.validate_create_favorite(db, user_id=user_id, player_id=player_id):
        return None

    favorite_in = schemas.favorite.FavoriteCreate(player_id=player_id, player_position=player_position)
    favorite = crud.favorite.create_with_user_id(db, user_id=user_id, obj_in=favorite_in)
    return favorite


@router.delete("/{id}", response_model=schemas.favorite.Favorite)
def delete_favorite(*, db: Session = Depends(deps.get_db), id: int) -> Favorite:
    favorite = db.get(Favorite, id)
    if not favorite:
        raise HTTPException(status_code=404, detail="favorite not found")
    db.delete(favorite)
    db.commit()
    return favorite
