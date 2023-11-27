from typing import Optional, List

from fastapi.encoders import jsonable_encoder

from crud.base import CRUDBase

from sqlalchemy.orm import Session

from models.compare_history import CompareHistory
from schemas.compare_history import CompareHistoryCreate, CompareHistoryUpdate


class CRUDCompareHistory(CRUDBase[CompareHistory, CompareHistoryCreate, CompareHistoryUpdate]):
    def create_with_user_id(self, db: Session, *, obj_in: CompareHistoryCreate, user_id: int) -> CompareHistory:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_user_id(self,
                        db: Session, *, user_id: int,
                        skip: int = 0, limit: int = 100) -> List[CompareHistory]:
        return (
            db.query(self.model)
            .filter(CompareHistory.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def validate_create_history(self, db: Session, *, user_id: int, player_fir: int, player_sec: int) -> bool:
        validate = (db.query(self.model).
                    filter(self.model.user_id == user_id,
                           self.model.player_fir == player_fir,
                           self.model.player_sec == player_sec)
                    .first())
        if validate:
            return True
        else:
            return False


compare_history = CRUDCompareHistory(CompareHistory)
