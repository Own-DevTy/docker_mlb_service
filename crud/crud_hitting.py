from typing import Any, Dict, Union, List

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.hitting import Hitting
from schemas.player import HittingCreate, HittingUpdate


class CRUDHitting(CRUDBase[Hitting, HittingCreate, HittingUpdate]):
    def get_multi_by_team_id(
            self, db: Session, *, team_id: int
    ) -> List[Hitting]:
        return db.query(self.model).filter(self.model.team_id == team_id).all()

    def get_stat_hitting_by_id(
            self, db: Session, *, id: int
    ) -> Hitting:
        return db.query(self.model.avg,
                        self.model.obp,
                        self.model.slg,
                        self.model.ops,
                        self.model.homeRuns).filter(self.model.id == id).first()

    def create(self, db: Session, *, obj_in: HittingCreate) -> Hitting:
        db_obj = Hitting(
            id=obj_in.id,
            name=obj_in.name,
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
            link=obj_in.link,
            age=obj_in.age,
            height=obj_in.height,
            weight=obj_in.weight,
            team_id=obj_in.team_id,
            team_name=obj_in.team_name,
            avg=obj_in.avg,
            obp=obj_in.obp,
            slg=obj_in.slg,
            ops=obj_in.ops,
            homeRuns=obj_in.homeRuns
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
            self, db: Session, *, db_obj: Hitting, obj_in: Union[HittingUpdate, Dict[str, Any]]
    ) -> Hitting:
        pass


hitting = CRUDHitting(Hitting)
