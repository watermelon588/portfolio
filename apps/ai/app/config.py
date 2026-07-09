from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Env-driven config. Validated at import; missing/invalid crashes loudly.

    Phase 1 keeps only what the skeleton needs. AI vendor keys (ANTHROPIC_API_KEY,
    VOYAGE_API_KEY, ELEVENLABS_*, MONGODB_URI, budgets) are added in Phase 6 per
    docs/CONFIGURATION.md.
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    env: str = "development"
    port: int = 8000
    ai_enabled: bool = True  # kill switch — false ⇒ /ai/* returns 503, orb hidden
    cors_origins: str = "http://localhost:5173"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
