from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud, schemas
from .database import get_db

app = FastAPI()

# Настройки CORS
origins = [
    "http://localhost:5173",  # Разрешаем запросы с вашего фронтенда
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP-методы
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Эндпоинт для создания проекта
@app.post("/projects/", response_model=schemas.Project)
def create_project_endpoint(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db=db, project=project)

# Эндпоинт для получения списка проектов
@app.get("/projects/", response_model=list[schemas.Project])
def read_projects_endpoint(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = crud.get_projects(db, skip=skip, limit=limit)
    return projects

# Эндпоинт для получения одного проекта по ID
@app.get("/projects/{project_id}", response_model=schemas.Project)
def read_project_endpoint(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.get_project_by_id(db, project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

# Эндпоинт для обновления проекта
@app.put("/projects/{project_id}", response_model=schemas.Project)
def update_project_endpoint(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = crud.update_project(db, project_id, project)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

# Эндпоинт для удаления проекта
@app.delete("/projects/{project_id}", status_code=204)
def delete_project_endpoint(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.delete_project(db, project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return