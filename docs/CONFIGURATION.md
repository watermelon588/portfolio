# CONFIGURATION.md

> **Status:** Designed · **Last updated:** 2026-07-09
> Rule: config comes from env vars, validated at boot (Zod in Node, pydantic-settings in Python). A service that boots with invalid config must crash loudly, not limp.

## `apps/web` — `.env` (Vite: only `VITE_*` reach the client — never put secrets here)

| Var | Example | Purpose |
|---|---|---|
| `VITE_API_URL` | `http://localhost:4000` | Express base |
| `VITE_AI_URL` | `http://localhost:8000` | FastAPI base |
| `VITE_AI_ENABLED` | `false` | Feature flag — hides AIVoiceOrb/`/ask` until Phase 6 |
| `VITE_CLOUDINARY_CLOUD` | `rohit-portfolio` | Media URL building |
| `VITE_SITE_URL` | `https://rohitmaity.dev` | Canonical/OG |

## `apps/api` — `.env`

| Var | Example | Purpose |
|---|---|---|
| `NODE_ENV` / `PORT` | `development` / `4000` | |
| `MONGODB_URI` | `mongodb+srv://…` | Atlas (db `portfolio`) |
| `CORS_ORIGINS` | `http://localhost:5173,https://rohitmaity.dev` | Comma allowlist |
| `JWT_SECRET` / `JWT_REFRESH_SECRET` | 32+ byte random | Auth (rotate → sessions invalidate, acceptable single-admin) |
| `ADMIN_EMAIL` | `maityrohit021@gmail.com` | Seed + notification target |
| `RESEND_API_KEY` | `re_…` | Contact emails |
| `CONTACT_FROM` | `portfolio@rohitmaity.dev` | Verified sender |
| `CLOUDINARY_URL` | `cloudinary://…` | Upload signing |
| `IP_HASH_SALT` | random | Privacy-preserving abuse forensics |

## `apps/ai` — `.env`

| Var | Example | Purpose |
|---|---|---|
| `ENV` / `PORT` | `development` / `8000` | |
| `MONGODB_URI` | same cluster | `ai_chunks`, `ai_sessions` |
| `ANTHROPIC_API_KEY` | `sk-ant-…` | Claude |
| `AI_MODEL` | `claude-sonnet-5` | Default LLM (upgrade = env change, no deploy) |
| `VOYAGE_API_KEY` / `EMBED_MODEL` | `pa-…` / `voyage-3.5` | Embeddings |
| `ELEVENLABS_API_KEY` | `el_…` | Voice |
| `ELEVENLABS_AGENT_ID` / `ELEVENLABS_VOICE_ID` | — | Configured agent + Rohit's cloned voice |
| `AI_ENABLED` | `true` | Kill switch (503s + orb hidden via web flag) |
| `CORS_ORIGINS` | as api | |
| `SESSION_MSG_CAP` / `SESSION_TOKEN_CAP` | `20` / `30000` | Budget guardrails |
| `VOICE_SESSIONS_PER_DAY` / `VOICE_SESSION_MAX_MIN` | `3` / `5` | Voice caps |
| `INGEST_TOKEN` | random | Protects `/ai/ingest` |

## Practices

- `.env.example` per app, committed, values fake; real `.env*` git-ignored from day one.
- Local secrets live only in `.env`; production secrets live only in the platform dashboards (Vercel/Railway) — never in repo, CI logs, or docs.
- Boot validation: `apps/api/src/config` (Zod `envSchema.parse`) · `apps/ai/app/config.py` (`Settings(BaseSettings)`); missing/invalid → process exits with the offending key named (value never printed).
- Flags of record: `VITE_AI_ENABLED` + `AI_ENABLED` are the Phase-6 gate; `NODE_ENV/ENV` control log verbosity + error detail.
- Rotation: any leaked/committed secret is rotated immediately and noted in [CHANGELOG.md](./CHANGELOG.md) (without the value).
