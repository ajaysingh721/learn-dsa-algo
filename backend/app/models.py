from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class CategoryType(str, enum.Enum):
    DATA_STRUCTURE = "data_structure"
    ALGORITHM = "algorithm"

class DifficultyLevel(str, enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    description = Column(Text)
    type = Column(Enum(CategoryType), nullable=False)
    icon = Column(String(50))
    order = Column(Integer, default=0)
    
    examples = relationship("Example", back_populates="category")

class Example(Base):
    __tablename__ = "examples"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))
    description = Column(Text)
    explanation = Column(Text)
    time_complexity = Column(String(50))
    space_complexity = Column(String(50))
    difficulty = Column(Enum(DifficultyLevel), default=DifficultyLevel.BEGINNER)
    code_example = Column(Text)
    visualization_data = Column(Text)  # JSON string for visualization
    use_cases = Column(Text)  # JSON array of use cases
    pros = Column(Text)  # JSON array
    cons = Column(Text)  # JSON array
    
    category = relationship("Category", back_populates="examples")

class Algorithm(Base):
    __tablename__ = "algorithms"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    category = Column(String(100))
    description = Column(Text)
    explanation = Column(Text)
    pseudocode = Column(Text)
    python_code = Column(Text)
    javascript_code = Column(Text)
    time_complexity_best = Column(String(50))
    time_complexity_average = Column(String(50))
    time_complexity_worst = Column(String(50))
    space_complexity = Column(String(50))
    difficulty = Column(Enum(DifficultyLevel), default=DifficultyLevel.BEGINNER)
    use_cases = Column(Text)
    visualization_data = Column(Text)
