from typing import Optional

from pydantic import BaseModel

from schemas.base import BaseModelEx


class PlayerBase(BaseModelEx):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    link: Optional[str] = None
    age: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    team_id: Optional[int] = None
    avg: Optional[str] = None
    obp: Optional[str] = None
    slg: Optional[str] = None
    ops: Optional[str] = None
    homeRuns: Optional[int] = None
    strikeOuts: Optional[int] = None
    era: Optional[str] = None
    baseOnBalls: Optional[int] = None
    whip: Optional[str] = None
    strikeoutsPer9Inn: Optional[str] = None


# Properties to receive via API on creation
class HittingCreate(PlayerBase):
    id: int
    name: str
    first_name: str
    last_name: str
    link: str
    age: int
    height: float
    weight: float
    team_id: int
    avg: str
    obp: str
    slg: str
    ops: str
    homeRuns: int


class PitchingCreate(PlayerBase):
    id: int
    name: str
    first_name: str
    last_name: str
    link: str
    age: int
    height: float
    weight: float
    team_id: int
    strikeOuts: int
    era: str
    baseOnBalls: int
    whip: str
    strikeoutsPer9Inn: str


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