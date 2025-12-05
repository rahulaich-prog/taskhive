from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str
    SUPABASE_ANON_KEY: Optional[str] = None
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000
    SENTRY_DSN: Optional[str] = None
    RATE_LIMIT_REQUESTS_PER_MINUTE: int = 120

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
