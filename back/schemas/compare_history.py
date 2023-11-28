from datetime import datetime

from typing import Optional, List

from pydantic import BaseModel


class CompareHistoryBase(BaseModel):
    player_fir: Optional[int] = None
    player_sec: Optional[int] = None
    player_position: Optional[bool] = None
    created_at: Optional[datetime] = None


class CompareHistoryCreate(CompareHistoryBase):
    player_fir: int
    player_sec: int
    player_position: bool


class CompareHistoryUpdate(CompareHistoryBase):
    pass


class CompareHistoryInDBBase(CompareHistoryBase):
    id: int
    user_id: int

    class Config:
        from_attributes: True


class CompareHistory(CompareHistoryInDBBase):
    pass


class CompareHistoryInDB(CompareHistoryInDBBase):
    pass


class CompareHistoryList(BaseModel):
    histories: List[CompareHistory]
