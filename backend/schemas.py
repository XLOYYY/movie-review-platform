from pydantic import BaseModel , Field


class AddFilm(BaseModel):
    name: str
    genre: str
    rating: float = Field(..., ge=0.0 , le=10.0)
    description: str | None = None


class GetFilm(BaseModel):
    id: int
    name: str
    genre: str
    rating: float = Field(..., ge=0.0 , le=10.0)
    description: str | None = None

    class Config:
        from_attributes = True
