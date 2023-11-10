from sqlalchemy.orm import as_declarative, declared_attr
from sqlalchemy.schema import MetaData
from sqlalchemy import Column, Integer, String


@as_declarative()
class Base(object):
    metadata = MetaData()
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)