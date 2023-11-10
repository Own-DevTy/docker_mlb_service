from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.hitting import Hitting
from schemas.player import HittingCreate, HittingUpdate


class CRUDHitting(CRUDBase[Hitting, HittingCreate, HittingUpdate]):
    def create(self, db: Session, *, obj_in: HittingCreate) -> Hitting:
        db_obj = Hitting(
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
            self, db: Session, *, db_obj: Hitting, obj_in: Union[HittingUpdate, Dict[str, Any]]
    ) -> Hitting:
        pass


hitting = CRUDHitting(Hitting)
