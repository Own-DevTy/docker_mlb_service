from typing import Optional

from schemas.base import BaseModelEx


class TeamBase(BaseModelEx):
    league_name: Optional[str] = None
    link: Optional[str] = None


# Properties to receive via API on creation
class TeamCreate(TeamBase):
    id: int
    name: str
    league_name: str
    link: str


# Properties to receive via API on update
class TeamUpdate(TeamBase):
    pass


class TeamInDBBase(TeamBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True


# Additional properties to return via API
class Team(TeamInDBBase):
    pass


# Additional properties stored in DB
class TeamInDB(TeamInDBBase):
    pass
