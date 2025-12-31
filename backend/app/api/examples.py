from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.Example])
def get_examples(skip: int = 0, limit: int = 100, category_id: int = None, db: Session = Depends(get_db)):
    query = db.query(models.Example)
    if category_id:
        query = query.filter(models.Example.category_id == category_id)
    examples = query.offset(skip).limit(limit).all()
    return examples

@router.get("/{example_id}", response_model=schemas.Example)
def get_example(example_id: int, db: Session = Depends(get_db)):
    example = db.query(models.Example).filter(models.Example.id == example_id).first()
    if example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    return example

@router.get("/slug/{slug}", response_model=schemas.Example)
def get_example_by_slug(slug: str, db: Session = Depends(get_db)):
    example = db.query(models.Example).filter(models.Example.slug == slug).first()
    if example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    return example

@router.post("/", response_model=schemas.Example)
def create_example(example: schemas.ExampleCreate, db: Session = Depends(get_db)):
    db_example = models.Example(**example.dict())
    db.add(db_example)
    db.commit()
    db.refresh(db_example)
    return db_example

@router.put("/{example_id}", response_model=schemas.Example)
def update_example(example_id: int, example: schemas.ExampleCreate, db: Session = Depends(get_db)):
    db_example = db.query(models.Example).filter(models.Example.id == example_id).first()
    if db_example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    
    for key, value in example.dict().items():
        setattr(db_example, key, value)
    
    db.commit()
    db.refresh(db_example)
    return db_example

@router.delete("/{example_id}")
def delete_example(example_id: int, db: Session = Depends(get_db)):
    db_example = db.query(models.Example).filter(models.Example.id == example_id).first()
    if db_example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    
    db.delete(db_example)
    db.commit()
    return {"message": "Example deleted successfully"}
