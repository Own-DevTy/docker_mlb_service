from sqlalchemy import Column, String, Integer, Float

from db.base_class import Base


class Hitting(Base):
    first_name = Column(String(25), nullable=False)
    last_name = Column(String(25), nullable=False)
    link = Column(String(2048), nullable=False)
    age = Column(Integer, nullable=False)
    height = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    team_id = Column(Integer, nullable=False)
    avg = Column(String(10), nullable=False)
    obp = Column(String(10), nullable=False)
    slg = Column(String(10), nullable=False)
    ops = Column(String(10), nullable=False)
    homeRuns = Column(Integer, nullable=False)
    strikeOuts = Column(Integer)
    era = Column(String(10))
    baseOnBalls = Column(Integer)
    whip = Column(String(10))
    strikeoutsPer9Inn = Column(String(10))
