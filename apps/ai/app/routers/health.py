from fastapi import APIRouter

from app.config import settings

router = APIRouter(prefix="/ai", tags=["health"])


@router.get("/health")
async def health() -> dict:
    # Echoes non-secret config only.
    return {
        "status": "ok",
        "env": settings.env,
        "ai_enabled": settings.ai_enabled,
    }
