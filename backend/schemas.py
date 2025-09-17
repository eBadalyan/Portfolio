from pydantic import BaseModel, HttpUrl
from datetime import datetime
from pydantic_settings import SettingsConfigDict

class ProjectBase(BaseModel):
    title: str
    description: str
    url: HttpUrl | None = None
    image_url: HttpUrl | None = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime

    model_config = SettingsConfigDict(from_attributes=True)