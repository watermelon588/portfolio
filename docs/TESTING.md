# TESTING.md

> **Status:** Strategy set (harnesses land in Phase 1) · **Last updated:** 2026-07-09
> Philosophy: test the *contract and the money paths*, not the animation frames. Motion quality is verified by humans with a checklist; correctness is verified by machines.

## The pyramid, per app

### `apps/web` — Vitest + React Testing Library
- Unit: hooks with logic (`useMagnetic` math, api client parsing, MDX meta helpers), utilities, MotionProvider gating (mocked matchMedia/deviceMemory → asserts effects are skipped).
- Component: sections render sensible DOM without motion (`reducedMotion: true` in tests — GSAP/Lenis mocked at the provider seam, never deep-mocked per test).
- **Don't test:** GSAP internals, three.js output, pixel positions mid-tween. That's what the manual QA checklist + visual review are for.

### `apps/api` — Vitest + Supertest + mongodb-memory-server
- Integration-first: every route × (happy, validation error, auth failure, rate limit, not found).
- Contract: responses validated against `packages/shared` Zod schemas — the spec is executable.
- Unit: services (mail payloads, token rotation, honeypot logic).

### `apps/ai` — pytest + httpx (+ respx for vendor mocking)
- Routers: budget guardrails (message/token caps trip correctly), input caps, kill switch 503s, SSE event sequence shape (`token* → sources → usage → done`).
- RAG units: chunker (heading-aware, code blocks intact), prompt assembly (persona + chunks + truncated history), retrieval filter by `projectSlug` (Mongo mocked; one optional live-Atlas marker test).
- Vendors (Claude/Voyage/ElevenLabs) always mocked in CI; a manual smoke script (`scripts/smoke_ai.py`) exercises real vendors pre-release.

### E2E — Playwright (runs on Vercel preview)
- Journeys: home loads + preloader completes + work list renders · navigate to case study (transition completes, no console errors) · contact form full submit (against preview api, test inbox) · 404 · (Phase 6) text chat round-trip with mocked ai.
- A11y: `@axe-core/playwright` on every page — serious/critical violations fail CI.
- **Reduced-motion mode in CI** (`prefers-reduced-motion` emulated) so assertions never race animations; one *motion-on* smoke run only checks for console errors + fatal jank signals.
- Visual regression: Playwright screenshots at animation-complete states for hero/work/footer at 3 viewports — diff threshold small but non-zero (font rendering).

## Coverage & gates

| Area | Bar |
|---|---|
| `packages/shared` | 100% (it's the contract) |
| api routes/services | ~85% lines, every route touched |
| ai routers/rag | ~85%, all guardrails asserted |
| web logic (hooks/lib) | ~70% — components measured by e2e, not unit % |

CI order: lint → typecheck → unit/integration → build → e2e on preview. Any red blocks merge. Flaky test = quarantined same day with a TECH_DEBT entry, never retried-until-green silently.

## What humans verify (per PR with motion)

The manual motion QA checklist in [PERFORMANCE.md](./PERFORMANCE.md) — throttled scroll, route-spam leak check, reduced-motion journey, touch fallbacks, tab-restore behavior — plus a taste pass against [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md): easings/durations/staggers from tokens, one purpose per animation.
