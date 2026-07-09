# CURRENT_STATE.md

> The "where are we right now" snapshot. **Update after every significant working session.**
> **Snapshot date:** 2026-07-09

## Phase

**Phase 0 (docs) ✅ · Phase 1 (scaffold) ✅ verified → Phase 2 is design-gated (needs concept sign-off).**

## What exists

- ✅ Complete documentation suite (`docs/` + root `CLAUDE.md`) — 25 files
- ✅ Reference teardown of dennissnellenberg.com with measured tokens in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- ✅ All 13 requested ReactBits components verified to exist (incl. `line-sidebar`) and mapped to placements
- ✅ **Phase 1 scaffold** (git repo initialized, commit `62eb93b`): pnpm monorepo — `apps/web` (React 19 + Vite + Tailwind v4, boots to a plain scaffold placeholder), `apps/api` (Express 5, `/api/health` + error envelope + config validation — boot-verified), `apps/ai` (FastAPI, `/ai/health` + kill switch — ruff + pytest green), `packages/shared` (approved tokens + Zod schemas). CI workflow present. **Verified:** web builds (92KB gz), all typecheck, tests pass.
- ✅ Approved design tokens wired (CSS vars + shared TS) — plumbing only, no UI
- ❌ No visual/design implementation yet (Phase 2, gated) · no deployments · no cloud accounts provisioned

## Recently approved (project directive, 2026-07-09)

- ✅ **Color palette:** blue `#0049CD`, bg `#F6F6F6`, surface `#FFFFFF`, surface gray `#DADADA`, neutral gray `#9D9D9C`, text `#000000` (light-only; cooler + higher-contrast than reference)
- ✅ **Typeface:** Satoshi (free, Fontshare)
- ✅ **Stack confirmed:** React 19 + Vite, Tailwind v4, Express 5, FastAPI AI, Atlas Vector Search, GSAP, Motion, ReactBits, Lenis, ElevenLabs
- ✅ **Component-architecture mandate:** everything (incl. cursor, loader, bg effects) is an independent reusable component (ADR-016)
- ✅ **Asset-driven** components; no hardcoded placeholder visuals (ADR-017)
- ✅ **Dark-world:** selective dark on `#000000` (preloader, contact/footer, AI panel only) — ADR-018
- ✅ **Phase 1 scaffolding green-lit** (in progress this session)

## Blocked on Rohit (decision queue)

| # | Input needed | Blocks | Where documented |
|---|---|---|---|
| 1 | **Approval of design concept** (component placements Part VI + page blueprints Part VII) | Phase 2 | DESIGN_SYSTEM Part X checklist |
| 2 | Confirm derived hover blue `--accent-deep` (`#003AA3`) or supply exact | Phase 2 | DESIGN_SYSTEM Part III |
| 3 | Site name/wordmark + domain (candidate: rohitmaity.dev) | Phase 3 deploy | DEPLOYMENT.md |
| 4 | Preloader concept copy (original role-words) | Phase 2 | DESIGN_SYSTEM Part VII |
| 5 | Launch project list (3–5 case studies) + material | Phase 3 content | FEATURES.md |
| 6 | Voice-clone recording (~2 min now for IVC; 30+ min later for PVC) + ElevenLabs account | Phase 6 | AI_PIPELINE.md |

## Next actions

1. **Rohit:** sign off on the design concept — component placement map (DESIGN_SYSTEM Part VI) + page blueprints (Part VII) — to unblock Phase 2. Optionally confirm `--accent-deep` and provide site name/domain + preloader copy.
2. **Then:** Phase 2 design-system implementation (tokens are wired; build primitives — MagneticButton, SplitLines, CurvedReveal, Preloader, Staggered Menu — behind the approval gate).
3. Optional parallel (no design input): Phase 1.1 hardening — full ESLint/Prettier config, supertest for api, vitest setup for web, Playwright skeleton.

## Environment / accounts status

Nothing provisioned. Needed later: GitHub repo, Vercel, Railway, MongoDB Atlas, Cloudinary, Resend, (Phase 6) Anthropic API key, ElevenLabs, Voyage AI.

## Session log

| Date | Session summary |
|---|---|
| 2026-07-09 | Scraped reference site + ReactBits; produced full 25-doc suite; recorded ADR-001…014; defined phases and gates. |
| 2026-07-09 | Project directive approved: palette (`#0049CD`/`#F6F6F6`/`#FFFFFF`/`#DADADA`/`#9D9D9C`/`#000000`), Satoshi font, component-architecture + asset-driven mandates. Docs updated; ADR-015…018 added. Dark-world resolved (selective dark). Model switched to Opus 4.8. |
| 2026-07-09 | **Phase 1 scaffold built + verified** and committed (`62eb93b`): pnpm monorepo, three service skeletons, shared tokens/schemas, CI. web builds, api health/404 verified, ai ruff+pytest green. No visual code. Next: design concept sign-off for Phase 2. |
