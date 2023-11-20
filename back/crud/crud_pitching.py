from typing import Any, Dict, Union, List

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.pitching import Pitching
from schemas.player import PitchingCreate, PitchingUpdate


class CRUDPitching(CRUDBase[Pitching, PitchingCreate, PitchingUpdate]):
    def get_multi_by_team_id(
            self, db: Session, *, team_id: int
    ) -> List[Pitching]:
        return db.query(self.model).filter(self.model.team_id == team_id).all()

    def get_stat_pitching_by_id(
        self, db: Session, *, id: int
    ) -> Pitching:
        return db.query(self.model.strikeOuts,
                        self.model.era,
                        self.model.baseOnBalls,
                        self.model.whip,
                        self.model.strikeoutsPer9Inn).filter(self.model.id == id).first()

    def create(self, db: Session, *, obj_in: PitchingCreate) -> Pitching:
        db_obj = Pitching(
            id=obj_in.id,
            name=obj_in.name,
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
            link=obj_in.link,
            age=obj_in.age,
            height=obj_in.height,
            weight=obj_in.weight,
            team_id=obj_in.team_id,
            strikeOuts=obj_in.strikeOuts,
            era=obj_in.era,
            baseOnBalls=obj_in.baseOnBalls,
            whip=obj_in.whip,
            strikeoutsPer9Inn=obj_in.strikeoutsPer9Inn,
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
