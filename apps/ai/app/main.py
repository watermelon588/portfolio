from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import health

# App factory kept importable for tests. AI routers (chat, voice, ingest) are
# added in Phase 6 per docs/AI_PIPELINE.md; they must all respect the
# settings.ai_enabled kill switch.


def create_app() -> FastAPI:
    app = FastAPI(title="Portfolio AI", version="0.1.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health.router)
    return app


app = create_app()
