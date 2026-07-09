# DEPENDENCIES.md

> **Status:** Planned manifest (pin exact versions at install, Phase 1) · **Last updated:** 2026-07-09
> Policy: every dependency needs a row here with a *job*. No two libraries doing the same job. Version ranges are `^` at install; lockfile is the truth.

## `apps/web`

| Package | Job | Notes |
|---|---|---|
| `react`, `react-dom` (19.x) | UI runtime | |
| `react-router` (7.x) | Routing | data APIs for prefetch-on-intent |
| `vite` + `@vitejs/plugin-react` | Build/dev | + prerender step for SEO routes |
| `tailwindcss` (v4) | Styling | consumes CSS-variable tokens; no config-file theme duplication |
| `gsap` (≥3.13) + `@gsap/react` | Scroll choreography, timelines, transitions, SplitText | **All plugins free now** (ScrollTrigger, SplitText, CustomEase…) — register once in MotionProvider |
| `motion` (12.x) | UI state micro-motion, `AnimatePresence` | import from `motion/react` |
| `lenis` (1.x) | Smooth scroll | ⚠️ package renamed from `@studio-freight/lenis` — use `lenis` |
| `three` + `@react-three/fiber` (9.x) + `@react-three/drei` | 3D scenes | R3F 9 pairs with React 19 |
| `matter-js` | Physics (Falling Text, lab toy) | + `poly-decomp` if concave bodies needed |
| `@splinetool/react-spline` | Hosted 3D embed | **optional** — adopt only if scene ≤ ~2MB budget |
| `@mdx-js/rollup` + `@mdx-js/react` (3.x) | Case studies / dev logs | compiled at build; shiki for code highlight |
| `zod` (via `packages/shared`) | Runtime validation of API payloads | shared with api |
| dev: `vitest`, `@testing-library/react`, `playwright`, `eslint`, `prettier`, `typescript` | Quality | |

### Vendored (not npm): ReactBits components
Copied source under `src/components/vendor/reactbits/` (TS-Tailwind variant), tracked with fetch date. Their peer deps map to packages above:

| Component | Peer deps it brings |
|---|---|
| Liquid Ether, Shape Blur | `three` |
| Splash Cursor | none (raw WebGL) |
| Staggered Menu, Flowing Menu, Scroll Reveal, Image Trail, Magic Bento, Masonry | `gsap` |
| Falling Text | `matter-js` |
| Text Pressure | none (Compressa VF font asset) |
| Stepper | `motion` |
| Line Sidebar | none |

## `apps/api`

| Package | Job |
|---|---|
| `express` (5.x) | HTTP framework |
| `mongoose` (8.x) | Atlas ODM |
| `zod` | Boundary validation (shared schemas) |
| `jsonwebtoken`, `argon2` | Admin auth |
| `helmet`, `cors`, `express-rate-limit` | Hardening |
| `resend` | Contact notifications |
| `cloudinary` | Upload signatures |
| `pino`, `pino-http` | Logging |
| dev: `tsx`, `vitest`, `supertest`, `typescript` | DX/tests |

## `apps/ai` (Python 3.12, managed with `uv`)

| Package | Job |
|---|---|
| `fastapi`, `uvicorn` | HTTP + server |
| `anthropic` | Claude (streaming) |
| `elevenlabs` | Voice: agents session mint, TTS |
| `voyageai` | Embeddings |
| `pymongo` | Atlas + `$vectorSearch` |
| `pydantic`, `pydantic-settings` | Schemas + env config |
| `slowapi` | Rate limiting |
| `sse-starlette` | SSE streaming |
| `structlog`, `httpx` | Logging, outbound HTTP |
| dev: `pytest`, `pytest-asyncio`, `ruff` | Tests/lint |

## Root / tooling

`pnpm` workspaces · `turbo` (optional task runner) · `husky` + `lint-staged` (pre-commit lint) · GitHub Actions (CI).

## Upgrade & audit policy

- Renovate/Dependabot weekly, grouped; motion/3D libs upgraded **manually** with visual regression check (they break subtly).
- `pnpm audit` + `uv pip audit` in CI; high severity blocks merge.
- Vendored ReactBits: quarterly diff against upstream (log in [TECH_DEBT.md](./TECH_DEBT.md)).

## Known risks

- `three` + R3F is the heaviest chunk → route-split, never in initial bundle ([PERFORMANCE.md](./PERFORMANCE.md)).
- Spline runtime is heavy → decision gate ADR-012 before adoption.
- GSAP licensing: free including premium plugins since Webflow acquisition — verify terms unchanged at implementation time.
