from typing import Optional

from pydantic import BaseModel

from schemas.base import BaseModelEx


class PlayerBase(BaseModelEx):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    link: Optional[str] = None
    team_id: Optional[int] = None


# Properties to receive via API on creation
class HittingCreate(PlayerBase):
    id: int
    name: str
    first_name: str
    last_name: str
    link: str
    team_id: int


class PitchingCreate(PlayerBase):
    id: int
    name: str
    first_name: str
    last_name: str
    link: str
    team_id: int


# Properties to receive via API on update
class HittingUpdate(PlayerBase):
    pass


class PitchingUpdate(PlayerBase):
    pass


class HittingInDBBase(PlayerBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True


class PitchingInDBBase(PlayerBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True


# Additional properties to return via API
class Hitting(HittingInDBBase):
    name: str = None


class Pitching(PitchingInDBBase):
    name: str


# Additional properties stored in DB
class HittingInDB(HittingInDBBase):
    pass


class PitchingInDB(PitchingInDBBase):
    pass