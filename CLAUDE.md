# CLAUDE.md — Rohit Maity Portfolio

Premium, animation-rich portfolio website. MERN stack + FastAPI AI sidecar. Design quality outranks implementation speed — always.

**Current phase:** Documentation / planning complete. **No application code exists yet.** See [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) before doing anything.

## 🎨 Design Approval Policy (non-negotiable)

Do **not** implement or commit any design-related change without Rohit's explicit approval. Before any visual/UX work:
1. Explain the design concept.
2. Justify why it improves the experience.
3. Describe the planned layout, interactions, and animations.
4. **Wait for approval.**

Every animation must have a purpose — no decorative filler, no generic dashboard aesthetics. The design language is defined in [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md); deviations require a written proposal there first.

## Stack (decided — see docs/DECISIONS.md for rationale)

| Piece | Choice |
|---|---|
| Frontend (`apps/web`) | React 19 + Vite + TypeScript + Tailwind CSS v4 (tokens via CSS variables) · **Satoshi** typeface |
| Motion | GSAP 3.13+ (`@gsap/react`) · Motion 12 (`motion/react`) · Lenis · React Three Fiber 9 · Matter.js · Spline (optional) |
| Component source | ReactBits (vendored under `src/components/vendor/reactbits/`, TS-Tailwind variant) |
| Content | MDX 3 (case studies, dev logs) |
| Backend (`apps/api`) | Node 22+ + Express 5 + Mongoose 8 + Zod |
| AI service (`apps/ai`) | Python 3.12 + FastAPI · Claude API · ElevenLabs (voice) · Voyage embeddings |
| Database | MongoDB Atlas (+ Atlas Vector Search for RAG) |
| Media | Cloudinary |
| Monorepo | pnpm workspaces |

## Commands (once scaffolded — Phase 1)

```bash
pnpm dev            # run web + api concurrently (turbo/pnpm -r)
pnpm dev:web        # Vite dev server (apps/web)
pnpm dev:api        # Express with tsx watch (apps/api)
pnpm lint           # eslint + prettier check
pnpm test           # vitest (web + api)
pnpm build          # production builds
# AI service:
cd apps/ai && uv run fastapi dev app/main.py
```

## Documentation map (read before working in an area)

| Doc | Purpose |
|---|---|
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Visual/motion language, tokens, component placement — **the design contract** |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System shape, service boundaries |
| [docs/API_SPEC.md](docs/API_SPEC.md) | REST + SSE endpoints (Express & FastAPI) |
| [docs/AI_PIPELINE.md](docs/AI_PIPELINE.md) | Voice assistant + project-RAG design |
| [docs/DATABASE.md](docs/DATABASE.md) | Collections, schemas, indexes |
| [docs/FEATURES.md](docs/FEATURES.md) / [docs/PROJECT_ROADMAP.md](docs/PROJECT_ROADMAP.md) | What we're building, in what order |
| [docs/CODE_STYLE.md](docs/CODE_STYLE.md) / [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Conventions, workflow, definition of done |
| [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) / [docs/PROJECT_MEMORY.md](docs/PROJECT_MEMORY.md) | Session context — update after significant work |

## Working agreements

- **Doc hygiene:** after meaningful changes update `CHANGELOG.md`, `CURRENT_STATE.md`, and any doc the change invalidates (tracked in `DOCUMENTATION_REVIEW.md`).
- **Motion code:** all animation goes through the token system (`--ease`, duration scale, stagger scale) and the `MotionProvider` gates (touch / low-end / reduced-motion). No magic numbers.
- **Performance:** budgets in [docs/PERFORMANCE.md](docs/PERFORMANCE.md) are hard gates — one WebGL canvas per viewport, route-split heavy components, transforms/opacity only.
- **Secrets:** never commit `.env*`; templates live in [docs/CONFIGURATION.md](docs/CONFIGURATION.md).
- **AI space is reserved:** don't rip out `AIVoiceOrb` mount points or `/ask` routing stubs; Phase 6 depends on them.
- **Everything is a component** (ADR-016): every UI element — including the cursor, loader, background effects, scroll indicators, magnetic wrappers — is built as an independent, reusable, composable component. No inline one-off UI.
- **Asset-driven** (ADR-017): real icons/illustrations/images/video arrive gradually from Rohit; components take them via props/slots with graceful empty states — never hardcode placeholder visuals into final components.
- **Approved palette** (ADR-014): blue `#0049CD`, bg `#F6F6F6`, surface `#FFFFFF`, gray `#DADADA`/`#9D9D9C`, text `#000000` — consumed only as CSS variables from `tokens.css`.
- **Git:** Conventional Commits; feature branches; `main` stays deployable.
