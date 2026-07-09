# CHANGELOG.md

All notable changes to this project. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning is semantic once code exists (pre-1.0: minor = phase completion, patch = fixes).

## [Unreleased]

### Approved (2026-07-09 project directive)
- **Color palette locked** (ADR-014): primary blue `#0049CD`, background `#F6F6F6`, light surface `#FFFFFF`, surface gray `#DADADA`, neutral gray `#9D9D9C`, primary text `#000000`. Replaces the reference-calibrated placeholder; cooler + higher-contrast character documented in DESIGN_SYSTEM Part III.
- **Typeface locked** (ADR-015): Satoshi (free, Fontshare) — single family for the whole system.
- **Component-architecture mandate** (ADR-016) and **asset-driven, no-hardcoded-placeholders** rule (ADR-017) added to DESIGN_SYSTEM principles + DECISIONS.
- Stack reconfirmed (React 19/Vite, Tailwind v4, Express 5, FastAPI, Atlas Vector Search, GSAP, Motion, ReactBits, Lenis, ElevenLabs).

- **Dark-world resolved** (ADR-018): selective dark on `#000000` for the preloader, contact/footer, and AI panel only; rest of the site stays light. `--dark-*` tokens finalized.

### In progress
- Phase 1 scaffold (pnpm monorepo, app skeletons, CI, shared tokens/schemas) — green-lit 2026-07-09. No visual/design code (design gate still applies to Phase 2).

## [0.1.0] — 2026-07-09 · Phase 0: Documentation foundation

### Added
- Full documentation suite (25 documents): design system with live teardown of dennissnellenberg.com (fonts, color tokens, easing/duration system, interaction catalog), architecture (React SPA + Express + FastAPI sidecar + Atlas), API contract, AI pipeline design (ElevenLabs voice clone + Claude RAG over Atlas Vector Search), database schemas, request flows, dependency manifest, configuration matrix, deployment plan, performance budgets, code style, contributing workflow, testing strategy, 14 ADRs, feature inventory, 8-phase roadmap, and living docs (CURRENT_STATE, PROJECT_MEMORY, TECH_DEBT, SCORECARD, DOCUMENTATION_REVIEW).
- ReactBits component placement map — all 13 requested components verified against reactbits.dev (2026-07-09) and assigned single-purpose placements.
- Design Approval Policy encoded in CLAUDE.md and CONTRIBUTING.md (no visual implementation without Rohit's sign-off).

### Decisions
- ADR-001…014 recorded ([DECISIONS.md](./DECISIONS.md)) — notably: Vite SPA over Next.js, GSAP/Motion division of labor, Lenis, Atlas Vector Search, MDX-in-repo, vendored ReactBits, placeholder palette pending Rohit's final colors.

### Known gaps / awaiting input
- Final color palette, typeface licensing decision, site name/domain, preloader copy, voice-clone recording — tracked in [CURRENT_STATE.md](./CURRENT_STATE.md).
