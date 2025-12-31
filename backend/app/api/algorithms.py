from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.Algorithm])
def get_algorithms(skip: int = 0, limit: int = 100, category: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Algorithm)
    if category:
        query = query.filter(models.Algorithm.category == category)
    algorithms = query.offset(skip).limit(limit).all()
    return algorithms

@router.get("/{algorithm_id}", response_model=schemas.Algorithm)
def get_algorithm(algorithm_id: int, db: Session = Depends(get_db)):
    algorithm = db.query(models.Algorithm).filter(models.Algorithm.id == algorithm_id).first()
    if algorithm is None:
        raise HTTPException(status_code=404, detail="Algorithm not found")
    return algorithm

@router.get("/slug/{slug}", response_model=schemas.Algorithm)
def get_algorithm_by_slug(slug: str, db: Session = Depends(get_db)):
    algorithm = db.query(models.Algorithm).filter(models.Algorithm.slug == slug).first()
    if algorithm is None:
        raise HTTPException(status_code=404, detail="Algorithm not found")
    return algorithm

@router.post("/", response_model=schemas.Algorithm)
def create_algorithm(algorithm: schemas.AlgorithmCreate, db: Session = Depends(get_db)):
    db_algorithm = models.Algorithm(**algorithm.dict())
    db.add(db_algorithm)
    db.commit()
    db.refresh(db_algorithm)
    return db_algorithm

@router.put("/{algorithm_id}", response_model=schemas.Algorithm)
def update_algorithm(algorithm_id: int, algorithm: schemas.AlgorithmCreate, db: Session = Depends(get_db)):
    db_algorithm = db.query(models.Algorithm).filter(models.Algorithm.id == algorithm_id).first()
    if db_algorithm is None:
        raise HTTPException(status_code=404, detail="Algorithm not found")
    
    for key, value in algorithm.dict().items():
        setattr(db_algorithm, key, value)
    
    db.commit()
    db.refresh(db_algorithm)
    return db_algorithm

@router.delete("/{algorithm_id}")
def delete_algorithm(algorithm_id: int, db: Session = Depends(get_db)):
    db_algorithm = db.query(models.Algorithm).filter(models.Algorithm.id == algorithm_id).first()
    if db_algorithm is None:
        raise HTTPException(status_code=404, detail="Algorithm not found")
    
    db.delete(db_algorithm)
    db.commit()
    return {"message": "Algorithm deleted successfully"}
