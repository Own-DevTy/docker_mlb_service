from fastapi import APIRouter

from api.endpoints import test, search, team

api_router = APIRouter()
api_router.include_router(test.router, tags=["test"])
api_router.include_router(test.router, prefix="/test", tags=["test"])
api_router.include_router(search.router, prefix="/search", tags=["search"])
api_router.include_router(team.router, prefix="/team", tags=["team"])