from typing import List

from pydantic import BaseModel


class BaseModelEx(BaseModel):
    pass


class BaseOut(BaseModelEx):
    id: int
    name: str

    class Config:
        from_attributes = True


class SearchHittingData(BaseOut):
    age: int
    height: float
    weight: float
    avg: str
    obp: str
    slg: str
    ops: str
    homeRuns: int


class SearchPitchingData(BaseOut):
    age: int
    height: float
    weight: float
    strikeOuts: int
    era: str
    baseOnBalls: int
    whip: str
    strikeoutsPer9Inn: str


class SearchHitting(BaseModelEx):
    hitting: List[SearchHittingData]


class SearchPitching(BaseModelEx):
    pitching: List[SearchPitchingData]


class SearchTeam(BaseModelEx):
    team: List[BaseOut]


class Search(BaseModelEx):
    hitting: List[BaseOut]
    pitching: List[BaseOut]
    team: List[BaseOut]


class League(BaseModelEx):
    teams: List[BaseOut]
