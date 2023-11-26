from typing import TYPE_CHECKING

from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship

from db.base_class import UserBase

if TYPE_CHECKING:
    from .favorite import Favorite
    from .compare_history import CompareHistory


class User(UserBase):
    user_id = Column(String(30), nullable=False, index=True)
    full_name = Column(String(20), nullable=False)
    sex = Column(Boolean(), default=False)
    password = Column(String(20), nullable=False)
    email = Column(String(30))
    favorite = relationship("Favorite", back_populates="user")
    compare_history = relationship("CompareHistory", back_populates="user")
