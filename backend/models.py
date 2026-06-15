from sqlalchemy import Column , Integer , Float , String , Boolean , CheckConstraint
from database import Base


class Model(Base):
    __tablename__ = "films"

    id = Column(Integer , primary_Key=True, index=True)
    name = Column(String , nullable=False)
    genre = Column(String, nullable=False)
    description = Column(String, nullable=True)
    rating = Column(Integer, CheckConstraint('rating >= 1 AND rating <= 10'), nullable=False)













