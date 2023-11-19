from typing import List

from pydantic import BaseModel


class BaseModelEx(BaseModel):
    pass


class BaseOut(BaseModelEx):
    id: int
    name: str

    class Config:
        from_attributes = True


class SearchHitting(BaseModelEx):
    hitting: List[BaseOut]


class SearchPitching(BaseModelEx):
    pitching: List[BaseOut]


class SearchTeam(BaseModelEx):
    team: List[BaseOut]


class Search(BaseModelEx):
    hitting: List[BaseOut]
    pitching: List[BaseOut]
    team: List[BaseOut]


class League(BaseModelEx):
    teams: List[BaseOut]
