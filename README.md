# Rohit Maity — Portfolio

A premium, animation-rich portfolio website. MERN stack + FastAPI AI sidecar.

> **Status:** Phase 1 scaffold. No visual/design implementation yet — the design system is defined in [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) and gated on approval before any UI is built. Start with [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md).

## Monorepo layout

| Path | What |
|---|---|
| `apps/web` | React 19 + Vite + TypeScript + Tailwind v4 (frontend) |
| `apps/api` | Express 5 + TypeScript (core backend) |
| `apps/ai` | FastAPI (Python) AI sidecar — voice + RAG |
| `packages/shared` | Design tokens + Zod schemas shared by web & api |

## Prerequisites

Node ≥ 22, pnpm ≥ 10, Python ≥ 3.12.

## Getting started

```bash
pnpm install                 # install JS workspaces

pnpm dev                     # run web + api together
pnpm dev:web                 # web only  → http://localhost:5173
pnpm dev:api                 # api only  → http://localhost:4000/api/health

# AI service (separate, Python):
cd apps/ai
python -m venv .venv
.venv\Scripts\activate       # Windows (PowerShell: .venv\Scripts\Activate.ps1)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000   # → http://localhost:8000/ai/health
```

Copy each `*/.env.example` to `.env` and fill values ([docs/CONFIGURATION.md](docs/CONFIGURATION.md)).

## Documentation

Full suite in [`docs/`](docs/). Entry points: [CLAUDE.md](CLAUDE.md) (working rules), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/PROJECT_ROADMAP.md](docs/PROJECT_ROADMAP.md).

## License

© 2026 Rohit Maity. All rights reserved.
