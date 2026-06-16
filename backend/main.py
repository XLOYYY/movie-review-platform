from fastapi import FastAPI
from sqlalchemy.orm import Session
import models , schemas
from database import get_db , engine


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


@app.get("/all_films")
def main_page():
    


























