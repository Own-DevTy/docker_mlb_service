from typing import Optional

from crud.base import CRUDBase

from sqlalchemy.orm import Session

from models.user import User
from schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_user_id(self, db: Session, *, user_id: str) -> Optional[User]:
        return db.query(User).filter(User.user_id == user_id).first()

    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        db_obj = User(
            user_id=obj_in.user_id,
            full_name=obj_in.full_name,
            sex=obj_in.sex,
            email=obj_in.email,
            password=obj_in.password
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def authenticate(self, db: Session, *, user_id: str, password: str) -> Optional[User]:
        user = self.get_by_user_id(db, user_id=user_id)
        if not user:
            return None
        if not user.password == password:
            return None
        return user

user = CRUDUser(User)
