from sqlalchemy import Column, String, Integer

from db.base_class import Base


class Pitching(Base):
    first_name = Column(String(25), nullable=False)
    last_name = Column(String(25), nullable=False)
    link = Column(String(2048), nullable=False)
    team_id = Column(Integer, nullable=False)

