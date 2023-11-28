from typing import Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    user_id: Optional[str] = None
    full_name: Optional[str] = None
    sex: bool = False
    email: Optional[EmailStr] = None


class UserCreate(UserBase):
    user_id: str
    full_name: str
    password: str


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True


class User(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    password: str
