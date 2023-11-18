from sqlalchemy import Column, String, Integer

from db.base_class import Base


class Team(Base):
    league_name = Column(String(50), nullable=False)
    link = Column(String(2048), nullable=False)
