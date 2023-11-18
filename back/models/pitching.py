from sqlalchemy import Column, String, Integer, Float

from db.base_class import Base


class Pitching(Base):
    first_name = Column(String(25), nullable=False)
    last_name = Column(String(25), nullable=False)
    link = Column(String(2048), nullable=False)
    age = Column(Integer, nullable=False)
    height = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    team_id = Column(Integer, nullable=False)
    avg = Column(String(10))
    obp = Column(String(10))
    slg = Column(String(10))
    ops = Column(String(10))
    homeRuns = Column(Integer)
    strikeOuts = Column(Integer, nullable=False)
    era = Column(String(10), nullable=False)
    baseOnBalls = Column(Integer, nullable=False)
    whip = Column(String(10), nullable=False)
    strikeoutsPer9Inn = Column(String(10), nullable=False)
