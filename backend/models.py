from sqlalchemy import Column , Integer , Float , String , Boolean 
from database import Base


class Film(Base):
    __tablename__ = "films"

    id = Column(Integer , primary_key=True, index=True)
    name = Column(String , nullable=False)
    genre = Column(String, nullable=False)
    rating = Column(Float, nullable=False)
    description = Column(String, nullable=True)













