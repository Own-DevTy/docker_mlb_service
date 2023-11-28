from datetime import datetime

from typing import Optional, List

from pydantic import BaseModel


class FavoriteBase(BaseModel):
    player_id: Optional[int] = None
    player_position: Optional[bool] = None
    created_at: Optional[datetime] = None


class FavoriteCreate(FavoriteBase):
    player_id: int
    player_position: bool


class FavoriteUpdate(FavoriteBase):
    pass


class FavoriteInDBBase(FavoriteBase):
    id: int
    user_id: int
    created_at: datetime
    player_id: int
    player_position: bool

    class Config:
        from_attributes: True


class Favorite(FavoriteInDBBase):
    pass


class FavoriteInDB(FavoriteInDBBase):
    pass


class FavoriteList(BaseModel):
    favorites: List[Favorite]
