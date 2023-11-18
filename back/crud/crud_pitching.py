from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.pitching import Pitching
from schemas.player import PitchingCreate, PitchingUpdate


class CRUDPitching(CRUDBase[Pitching, PitchingCreate, PitchingUpdate]):
    def get_multi_by_team_id(
        self, db: Session, *, team_id: int, skip: int = 0, limit: int = 10
    ) -> List[Pitching]:
        return db.query(self.model).filter(self.model.team_id == team_id).offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: PitchingCreate) -> Pitching:
        db_obj = Pitching(
            id=obj_in.id,
            name=obj_in.name,
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
            link=obj_in.link,
            team_id=obj_in.team_id
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
            self, db: Session, *, db_obj: Pitching, obj_in: Union[PitchingUpdate, Dict[str, Any]]
    ) -> Pitching:
        pass


pitching = CRUDPitching(Pitching)
