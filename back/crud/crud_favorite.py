from typing import Optional, List

from fastapi.encoders import jsonable_encoder

from crud.base import CRUDBase

from sqlalchemy.orm import Session

from models.favorite import Favorite
from schemas.favorite import FavoriteCreate, FavoriteUpdate


class CRUDFavorite(CRUDBase[Favorite, FavoriteCreate, FavoriteUpdate]):
    def create_with_user_id(self, db: Session, *, obj_in: FavoriteCreate, user_id: int) -> Favorite:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_user_id(self,
                        db: Session, *, user_id: int,
                        skip: int = 0, limit: int = 100) -> List[Favorite]:
        return (
            db.query(self.model)
            .filter(Favorite.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def validate_create_favorite(self, db: Session, *, user_id: int, player_id: int) -> bool:
        validate = (db.query(self.model).
                    filter(self.model.user_id == user_id, self.model.player_id == player_id)
                    .first())
        if validate:
            return True
        else:
            return False


favorite = CRUDFavorite(Favorite)
