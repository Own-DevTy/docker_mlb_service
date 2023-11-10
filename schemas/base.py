from typing import Optional, List

from pydantic import BaseModel


class BaseModelEx(BaseModel):
    pass


class BaseOut(BaseModelEx):
    id: int
    name: str

    class Config:
        from_attributes = True


class Search(BaseModelEx):
    hitting: List[BaseOut]
    pitching: List[BaseOut]
    team: List[BaseOut]


class League(BaseModelEx):
    teams: List[BaseOut]
