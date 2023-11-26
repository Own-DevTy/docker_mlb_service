from typing import Any

from fastapi import APIRouter, Body, Depends, HTTPException

from pydantic.networks import EmailStr

from sqlalchemy.orm import Session

import crud
import schemas.user
from api import deps

router = APIRouter()


@router.get("/validate/id/{user_id}")
def validate_user_id(*, db: Session = Depends(deps.get_db), user_id: str):
    """
    user_id_validate 의 value 값이 0이면 중복 상태이며
    1일떄는 비중복 상태이다.
    """
    user = crud.user.get_by_user_id(db, user_id=user_id)
    if user:
        return {"user_id_validate": 0}
    return {"user_id_validate": 1}


@router.get("/validate/email/{email}")
def validate_email(*, db: Session = Depends(deps.get_db), email: str):
    """
    email_validate 의 value 값이 0이면 중복 상태이며
    1일떄는 비중복 상태이다.
    """
    user = crud.user.get_by_email(db, email=email)
    if user:
        return {"email_validate": 0}
    return {"email_validate": 1}


@router.post("/signin", response_model=schemas.User)
def create_user(
        *,
        db: Session = Depends(deps.get_db),
        user_id: str = Body(...),
        password: str = Body(...),
        email: EmailStr = Body(...),
        full_name: str = Body(...),
        sex: bool = Body(...),
) -> Any:
    user = crud.user.get_by_user_id(db, user_id=user_id)
    if user:
        raise HTTPException(status_code=400,
                            detail="이미 등록되어있는 유저 아이디입니다.")
    user = crud.user.get_by_email(db, email=email)
    if user:
        raise HTTPException(status_code=400,
                            detail="이미 등록되어있는 이메일입니다.")
    user_in = schemas.UserCreate(user_id=user_id,
                                 full_name=full_name,
                                 email=email,
                                 sex=sex,
                                 password=password)
    user = crud.user.create(db, obj_in=user_in)
    return user
