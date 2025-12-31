from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class CategoryType(str, Enum):
    DATA_STRUCTURE = "data_structure"
    ALGORITHM = "algorithm"

class DifficultyLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    type: CategoryType
    icon: Optional[str] = None
    order: int = 0

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True

class ExampleBase(BaseModel):
    title: str
    slug: str
    category_id: int
    description: Optional[str] = None
    explanation: Optional[str] = None
    time_complexity: Optional[str] = None
    space_complexity: Optional[str] = None
    difficulty: DifficultyLevel = DifficultyLevel.BEGINNER
    code_example: Optional[str] = None
    visualization_data: Optional[str] = None
    use_cases: Optional[str] = None
    pros: Optional[str] = None
    cons: Optional[str] = None

class ExampleCreate(ExampleBase):
    pass

class Example(ExampleBase):
    id: int
    
    class Config:
        from_attributes = True

class AlgorithmBase(BaseModel):
    name: str
    slug: str
    category: str
    description: Optional[str] = None
    explanation: Optional[str] = None
    pseudocode: Optional[str] = None
    python_code: Optional[str] = None
    javascript_code: Optional[str] = None
    time_complexity_best: Optional[str] = None
    time_complexity_average: Optional[str] = None
    time_complexity_worst: Optional[str] = None
    space_complexity: Optional[str] = None
    difficulty: DifficultyLevel = DifficultyLevel.BEGINNER
    use_cases: Optional[str] = None
    visualization_data: Optional[str] = None

class AlgorithmCreate(AlgorithmBase):
    pass

class Algorithm(AlgorithmBase):
    id: int
    
    class Config:
        from_attributes = True
