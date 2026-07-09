# ARCHITECTURE.md

> **Status:** Approved shape, pre-implementation · **Last updated:** 2026-07-09

## System diagram

```
                        ┌──────────────────────────────────────────┐
                        │              Browser (visitor)           │
                        │  React 19 SPA · GSAP/Lenis/Motion · R3F  │
                        └───────┬──────────────┬───────────┬───────┘
                                │ REST/JSON    │ SSE/JSON  │ WebRTC/WSS (voice)
                                ▼              ▼           ▼
   Vercel (static + CDN) ┌──────────┐   ┌───────────┐   ┌──────────────┐
   serves apps/web  ───► │ apps/api │   │  apps/ai  │   │  ElevenLabs  │
                         │ Express 5│   │  FastAPI  │◄──┤  Agents      │
                         │ Node 22+ │   │  Py 3.12  │   │ (signed URL, │
                         └────┬─────┘   └─────┬─────┘   │  tools/LLM   │
                              │               │         │  bridge)     │
                              │ Mongoose      │ PyMongo └──────────────┘
                              ▼               ▼               │
                         ┌─────────────────────────┐          ▼
                         │      MongoDB Atlas      │   ┌─────────────┐
                         │  data + Vector Search   │   │ Claude API  │
                         └─────────────────────────┘   │ (Anthropic) │
                              ▲                        └─────────────┘
                         ┌────┴─────┐    ┌───────────┐ ┌─────────────┐
                         │Cloudinary│    │  Resend   │ │  Voyage AI  │
                         │  media   │    │ (email)   │ │ embeddings  │
                         └──────────┘    └───────────┘ └─────────────┘
```

## Services

### `apps/web` — React SPA (Vercel)
- Vite build, prerendered routes for SEO (home/work/about/case studies) + `react-helmet`-class meta management.
- Owns all presentation and motion. Consumes `apps/api` for data, `apps/ai` for AI features.
- Case studies & dev logs are **MDX compiled at build time** (content lives in the repo — see ADR-009) — the API serves only dynamic data (projects meta, contact, chat).

### `apps/api` — Express 5 (Railway)
- Public read endpoints (projects, logs metadata), contact intake, single-admin JWT CRUD.
- Middleware: helmet, CORS allowlist, rate limiting, Zod validation, pino logging.
- Talks to Atlas via Mongoose; sends contact notifications via Resend.

### `apps/ai` — FastAPI (Railway)
- Isolated Python service so AI dependencies/scale don't touch the core API.
- Endpoints: RAG chat over project corpus (SSE streaming), ElevenLabs session brokering (signed URLs — API keys never reach the browser), content-ingestion job (chunk → embed → Atlas Vector Search).
- Calls: Anthropic (Claude, model via env `AI_MODEL`, default `claude-sonnet-5`), Voyage AI (embeddings), ElevenLabs (voice). Full detail: [AI_PIPELINE.md](./AI_PIPELINE.md).

## Communication contracts

- Browser ↔ api/ai: JSON over HTTPS; errors use a single envelope (see [API_SPEC.md](./API_SPEC.md)); streaming via SSE.
- Browser ↔ ElevenLabs: direct WebRTC/WebSocket using a short-lived signed URL minted by `apps/ai` (keeps latency low and secrets server-side).
- api ↔ ai: no direct coupling in v1 (both read Atlas). If needed later, server-to-server calls authenticated with a shared internal token.
- Shared types: `packages/shared` exports Zod schemas + TS types consumed by web and api (single source of truth for payload shapes).

## Cross-cutting concerns

| Concern | Approach |
|---|---|
| Auth | Single admin. JWT (short-lived access + httpOnly refresh) on `/api/admin/*`. Public site needs no auth. |
| Validation | Zod at every Express boundary; Pydantic v2 in FastAPI. |
| Rate limiting | express-rate-limit (contact: strict) · slowapi on AI endpoints + per-session token budgets. |
| Logging | pino (api) / structlog (ai), JSON logs, request IDs propagated from the client. |
| Errors | Envelope `{ error: { code, message } }`, correct HTTP semantics, no stack traces in prod. |
| SEO | Prerendered HTML + OG images per project; sitemap generated at build. |
| CDN/caching | Static assets immutable-hashed on Vercel; API GETs send `Cache-Control` + ETags. |

## Environments

`local` (all three services + Atlas free tier) → `preview` (Vercel preview + Railway PR envs) → `production`. Config matrix in [CONFIGURATION.md](./CONFIGURATION.md); deploy runbooks in [DEPLOYMENT.md](./DEPLOYMENT.md).

## Why this shape (summary — details in DECISIONS.md)

- **SPA + separate Express** honors the MERN requirement and keeps the backend a real, showable Node service (goal G3) instead of hiding it in Next API routes.
- **FastAPI sidecar** isolates Python AI deps, allows independent scaling/cold-start tolerance, and is the natural home for LangChain/voice SDK ecosystems.
- **Atlas Vector Search over a dedicated vector DB** — one database for everything at portfolio scale; zero extra infra.
- **MDX in-repo over CMS** — content is code-reviewed, versioned, and free.
