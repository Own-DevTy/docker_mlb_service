from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, ForeignKey, String, Boolean
from sqlalchemy.orm import relationship

from db.base_class import UserBase

if TYPE_CHECKING:
    from .user import User


class Favorite(UserBase):
    player_id = Column(Integer)
    player_position = Column(Boolean())
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="id")
