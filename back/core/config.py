import os
from dotenv import load_dotenv
from typing import List
from pydantic import AnyHttpUrl
# 만약 Docker 에서 실행 되는 것이면 docker-compose 에서 사용한
# env파일의 값으로 사용될 것이기 때문에 개발 환경에서는
# .env 파일을 load 하여 사용한다.
if os.environ.get('isDocker'):
    pass
else:
    load_dotenv()


class Setting:
    DB_HOST: str = os.environ.get('DB_HOST')
    DB_PORT: int = os.environ.get('DB_PORT')
    DB_USER: str = os.environ.get('DB_USER')
    DB_PASSWORD: str = os.environ.get('DB_PASSWORD')
    DB_DATABASE: str = os.environ.get('DB_DATABASE')

    DB_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ['*']

    API_V1_STR: str = '/api/v1'


settings = Setting()
