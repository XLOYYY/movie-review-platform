from fastapi import FastAPI , Depends , HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
import models , schemas
from database import get_db , engine
from fastapi.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def main_page():
    pass


@app.get("/films" , response_model=list[schemas.GetFilm])
def get_all_films(db: Session = Depends(get_db)):
    return db.query(models.Film).all()


@app.get("/films/{item_id}", response_model=schemas.GetFilm) 
def det_film(item_id: int, db: Session = Depends(get_db)):
    
    film = (
        db.query(models.Film)
        .filter(models.Film.id == item_id)
        .first()
    )
    if film is None:
        raise HTTPException(status_code=404, detail="Film not found")
    return film


@app.get("/search" , response_model=list[schemas.GetFilm])
def search_film(text: str , limit: int = 15, db: Session = Depends(get_db)):
    films = (
        db.query(models.Film)
        .filter(
            or_(
                
                models.Film.name.ilike(f"%{text}"),

                models.Film.genre.ilike(f"%{text}")

            )

        )
        .limit(limit)
        .all()
    )
    return films


@app.post("/films", response_model=schemas.GetFilm, status_code=201)
def create_film(film: schemas.AddFilm, db: Session = Depends(get_db)):
    
    db_film = models.Film(**film.model_dump())

    db.add(db_film)

    db.commit()

    db.refresh(db_film)

    return db_film

@app.put("/films/{item_id}" , response_model=schemas.GetFilm)
def update_film(item_id: int, film: schemas.AddFilm, db: Session = Depends(get_db)):
    db_film = (
        db.query(models.Film)
        .filter(models.Film.id == item_id)
        .first()
    )
    if db_film is None:
        raise HTTPException(status_code=404, detail="Film not found")
    
    for key, value in film.model_dump().items():
        setattr(db_film, key, value)

    db.commit()
    db.refresh(db_film)
    return db_film


@app.delete("/films/{item_id}")
def delete_film(item_id: int, db: Session = Depends(get_db)):
    db_film =(
        db.query(models.Film)
        .filter(models.Film.id == item_id)
        .first()
    )

    if db_film is None:
        raise HTTPException(status_code=404, detail="Film not found")

    db.delete(db_film)
    db.commit()
    return {"message": "The film has been removed"}




