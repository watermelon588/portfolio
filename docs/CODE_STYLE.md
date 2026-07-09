# CODE_STYLE.md

> **Status:** Adopted (enforced from first commit) · **Last updated:** 2026-07-09
> Enforced by ESLint + Prettier (TS) and Ruff (Python) in CI. This doc covers what linters can't.

## TypeScript (web, api, shared)

- `strict: true`, no `any` without a `// why:` comment, no non-null `!` where a guard fits.
- Named exports only (default exports break refactors); one component per file.
- Naming: `PascalCase` components/types, `camelCase` functions/vars, `SCREAMING_SNAKE` true constants, kebab-case non-component filenames, `PascalCase.tsx` for components.
- Imports order (eslint-enforced): node/builtin → external → `@shared/*` → internal aliases → relative → styles.
- Validation at boundaries: parse with Zod at the edge (request in, response out), trust types inside.
- Errors: never swallow; api uses the error envelope helper, web surfaces user-safe messages and logs the rest.

## React & motion patterns (the important part)

- **Animation lives in hooks/components, not scattered effects.** GSAP via `useGSAP` with `gsap.context` scoping — cleanup is automatic and mandatory. A component that creates ScrollTriggers owns their lifecycle.
- **No magic numbers in motion code.** Durations/eases/staggers come from `packages/shared/src/tokens` (mirrored as CSS vars). A one-off value needs a comment justifying it.
- **`MotionProvider` gates everything:** any effect checks `{ reducedMotion, isTouch, isLowEnd }` before mounting heavy work. Direct `window.matchMedia` calls in components are a review flag.
- Server data via a thin typed api client (`lib/api.ts`); components never `fetch` directly.
- Tailwind for layout/spacing/type utilities; **motion & theming via CSS variables** (`--ease`, `--dur-*`, section `data-theme`) so GSAP and CSS share one vocabulary.
- Vendored ReactBits: adapt tokens/props at the *call site* or in a wrapper — keep vendored files as close to upstream as possible (diffability > tidiness).

## Express (api)

- Layering: `routes` (HTTP glue) → `services` (logic) → `models` (Mongoose). Routes stay skinny.
- Every route: rate-limit config (explicit, even if default) → Zod validate → handler → typed response. Async errors funnel to the central error middleware.
- No business logic in middleware; no Mongoose calls in routes.

## Python (ai)

- Ruff (lint + format), type hints everywhere, `async def` end-to-end (no sync Mongo/HTTP calls in request path).
- Layering: `routers` → `services` → vendors. Prompts/persona live in `rag/` as versioned constants, never inline f-strings in handlers.
- Pydantic models for every request/response — FastAPI's OpenAPI page must always reflect reality.

## Comments & docs

- Comments explain *constraints and why*, not what the next line does.
- Every non-obvious animation gets a one-line intent comment (e.g. `// entrance: rise+settle per DESIGN_SYSTEM §V`).
- Public-ish functions in services get a short docstring; no JSDoc ceremony elsewhere.

## Git

- Conventional Commits: `feat:`, `fix:`, `perf:`, `docs:`, `refactor:`, `chore:`, `test:` (+ scope: `feat(web/hero): …`).
- Branches: `feat/<slug>`, `fix/<slug>`, `docs/<slug>`.
- A commit is one logical change; generated/lock files committed separately when noisy.
