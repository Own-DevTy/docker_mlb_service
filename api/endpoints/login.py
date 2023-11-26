from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from pydantic.networks import EmailStr

from sqlalchemy.orm import Session

import crud
import schemas
from api import deps
from models.favorite import Favorite

router = APIRouter()


@router.post("/")
def login_access(db: Session = Depends(deps.get_db),
                 form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = crud.user.authenticate(db,
                                  user_id=form_data.username,
                                  password=form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="아이디나 비밀번호가 틀렸습니다.")

    return {
        "id": user.id,
        "username": user.user_id,
        "email": user.email,
        "full_name": user.full_name
    }
