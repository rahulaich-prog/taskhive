# app/security_headers.py  (or paste into app/main.py directly)
from fastapi import Request
from fastapi.responses import Response
from typing import Dict
from datetime import timedelta
import os

# Toggle: set ENV var FASTAPI_ENV=production for production behavior
ENV = os.getenv("FASTAPI_ENV", "development").lower()
IS_PROD = ENV == "production"

# CSP: change to match your frontend & storage domains
CSP_DIRECTIVES = {
    "default-src": ["'self'"],
    "script-src": ["'self'"],
    "style-src": ["'self'", "https://fonts.googleapis.com"],
    "font-src": ["'self'", "https://fonts.gstatic.com"],
    "img-src": ["'self'", "data:", "blob:", "https://your-storage-domain.supabase.co"],
    "connect-src": ["'self'", "https://your-storage-domain.supabase.co", "https://YOUR-PROJECT.supabase.co"],
}

def build_csp(directives: Dict[str, list]) -> str:
    parts = []
    for k, vals in directives.items():
        parts.append(f"{k} {' '.join(vals)}")
    return "; ".join(parts)

# Use report-only for safe testing
CSP_REPORT_ONLY = os.getenv("CSP_REPORT_ONLY", "true").lower() in ("1", "true", "yes")

# HSTS header: only enable in production over HTTPS
HSTS_VALUE = "max-age=63072000; includeSubDomains; preload" if IS_PROD else None

SECURITY_HEADERS = {
    # Basic secure headers — safe for dev & prod
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
    "X-XSS-Protection": "1; mode=block",    # legacy; fine to include
    # Permissions-Policy (modern replacement for Feature-Policy) — adjust as needed
    "Permissions-Policy": 'geolocation=(), microphone=(), camera=()',
}

CSP_VALUE = build_csp(CSP_DIRECTIVES)

async def add_security_headers_middleware(request: Request, call_next):
    # Run the request
    response: Response = await call_next(request)

    # Add standard headers
    for k, v in SECURITY_HEADERS.items():
        response.headers.setdefault(k, v)

    # HSTS only in production
    if HSTS_VALUE:
        response.headers.setdefault("Strict-Transport-Security", HSTS_VALUE)

    # Content-Security-Policy or Report-Only
    if CSP_REPORT_ONLY:
        response.headers.setdefault("Content-Security-Policy-Report-Only", CSP_VALUE)
    else:
        response.headers.setdefault("Content-Security-Policy", CSP_VALUE)

    return response
