from sqlalchemy.orm import Session
from . import models, schemas
from pydantic import HttpUrl

def create_project(db: Session, project: schemas.ProjectCreate):
    """Создаёт новый проект в базе данных."""
    # Преобразуем объект ProjectCreate в словарь.
    project_dict = project.model_dump()
    
    # Явно преобразуем объекты HttpUrl в строки, если они существуют.
    if 'url' in project_dict and isinstance(project_dict['url'], HttpUrl):
        project_dict['url'] = str(project_dict['url'])
    if 'image_url' in project_dict and isinstance(project_dict['image_url'], HttpUrl):
        project_dict['image_url'] = str(project_dict['image_url'])

    # Создаем экземпляр модели SQLAlchemy с очищенным словарем.
    db_project = models.Project(**project_dict)
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def get_projects(db: Session, skip: int = 0, limit: int = 100):
    """Получает список проектов с пагинацией."""
    return db.query(models.Project).offset(skip).limit(limit).all()

def get_project_by_id(db: Session, project_id: int):
    """Получает один проект по его ID."""
    return db.query(models.Project).filter(models.Project.id == project_id).first()

def update_project(db: Session, project_id: int, project: schemas.ProjectCreate):
    """Обновляет существующий проект."""
    db_project = get_project_by_id(db, project_id)
    if not db_project:
        return None
    
    # Преобразуем объект project в словарь и явно исключаем пустые поля.
    project_dict = project.model_dump(exclude_unset=True)
    
    # Явно преобразуем объекты HttpUrl в строки.
    if 'url' in project_dict and isinstance(project_dict['url'], HttpUrl):
        project_dict['url'] = str(project_dict['url'])
    if 'image_url' in project_dict and isinstance(project_dict['image_url'], HttpUrl):
        project_dict['image_url'] = str(project_dict['image_url'])

    # Обновляем атрибуты проекта
    for key, value in project_dict.items():
        setattr(db_project, key, value)

    db.commit()
    db.refresh(db_project)
    return db_project

def delete_project(db: Session, project_id: int):
    """Удаляет проект."""
    db_project = get_project_by_id(db, project_id)
    if not db_project:
        return None
        
    db.delete(db_project)
    db.commit()
    return db_project