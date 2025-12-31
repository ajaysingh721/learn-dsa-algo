from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.api import categories, examples, algorithms

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DSA Learning Platform API",
    description="API for Data Structures and Algorithms learning platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(categories.router, prefix="/api/categories", tags=["categories"])
app.include_router(examples.router, prefix="/api/examples", tags=["examples"])
app.include_router(algorithms.router, prefix="/api/algorithms", tags=["algorithms"])

@app.get("/")
def root():
    return {"message": "DSA Learning Platform API", "docs": "/docs"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
