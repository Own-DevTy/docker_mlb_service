from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.team import Team
from schemas.team import TeamCreate, TeamUpdate


class CRUDTeam(CRUDBase[Team, TeamCreate, TeamUpdate]):
    def get_by_league(self, db: Session, league_name: str) -> List[Team]:
        return (
            db.query(self.model.id, self.model.name)
            .filter(self.model.league_name == league_name)
            .all()
        )

    def create(self, db: Session, *, obj_in: TeamCreate) -> Team:
        db_obj = Team(
            id=obj_in.id,
            league_name=obj_in.league_name,
            name=obj_in.name,
            link=obj_in.link,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Team, obj_in: Union[TeamUpdate, Dict[str, Any]]
    ) -> Team:
        pass


team = CRUDTeam(Team)
