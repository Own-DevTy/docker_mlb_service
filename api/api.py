from fastapi import APIRouter

from api.endpoints import user, search, team, player, favorite, compare_history

api_router = APIRouter()
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(compare_history.router, prefix="/compare_history", tags=["compareHistory"])
api_router.include_router(favorite.router, prefix="/favorite", tags=["favorite"])
api_router.include_router(search.router, prefix="/search", tags=["search"])
api_router.include_router(team.router, prefix="/team", tags=["team"])
api_router.include_router(player.router, prefix="/player", tags=["player"])
