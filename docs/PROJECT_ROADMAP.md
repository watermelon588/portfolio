# PROJECT_ROADMAP.md

> **Last updated:** 2026-07-09 · Timeboxes assume part-time solo pace; quality gates > dates. A phase is done when its exit criteria pass, not when time runs out.

## Phase 0 — Foundation docs ✅ (2026-07-09)
Documentation suite, reference teardown, architecture, this roadmap. **Done.**

## Phase 1 — Scaffold & plumbing (≈1 week) ⬅ next
git init + monorepo (pnpm) · Vite/React/TS/Tailwind app boots · Express app with health + error envelope + config validation · FastAPI skeleton with health + kill switch · `packages/shared` tokens/schemas wired · CI (lint/typecheck/test/build) green · AI mount stubs (`/ask` route, `AIVoiceOrb` placeholder) exist.
**Exit:** `pnpm dev` runs web+api; CI green on a trivial PR; no visual design implemented yet.

## Phase 2 — Design system implementation (≈1–2 weeks) 🔒 **DESIGN GATE**
**Entry requires:** Rohit's palette + typeface decision + Part VI/VII sign-off ([DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) Part X checklist).
tokens.css + ThemeSection flip · typography scale + font loading (zero CLS) · MotionProvider (Lenis+GSAP, gates) · core primitives: MagneticButton, SplitLines, CurvedReveal, Hairline, Label, LocalTime · Preloader + PageTransition · Staggered Menu.
**Exit:** styleguide route showing every primitive in both worlds; motion QA checklist passes; Lighthouse ≥ 90 on the styleguide page.

## Phase 3 — Core pages, static content (≈2 weeks)
Home (hero → footer, WebGL hero behind gate) · Work index + 3 case studies (MDX pipeline live) · About · Contact UI · 404 · SEO prerender + OG. First production deploy at the end ([DEPLOYMENT.md](./DEPLOYMENT.md) checklist).
**Exit:** site live on domain, budgets met on real URLs, axe clean.

## Phase 4 — Interaction & motion pass (≈1–2 weeks)
Flowing Menu work list + cursor media preview · strip gallery parallax · scroll-scrubbed accents · Image Trail (About) · Magic Bento skills · marquee with direction flip · Line Sidebar.
**Exit:** every DESIGN_SYSTEM Part VII motion beat implemented or consciously cut (logged in DECISIONS); manual motion QA passes on mid-tier Android.

## Phase 5 — Backend completion (≈1 week)
Contact flow end-to-end (Resend) · admin auth + CRUD · Cloudinary signed uploads · dev-logs (Masonry + MDX) · vitals beacon.
**Exit:** publish a new project without touching frontend code (except MDX PR); API test coverage bars met.

## Phase 6 — AI layer (≈2–3 weeks) 🔒 needs voice recording + Phase-6 budget OK
Order per [AI_PIPELINE.md](./AI_PIPELINE.md): ingest → project chat (pilot) → site-wide `/ask` → TTS intros → voice agent (IVC) → PVC upgrade.
**Exit:** guardrails verified by tests; voice round-trip < 1.5s; kill switch drill passed; cost within ceiling for a simulated week.

## Phase 7 — Polish & launch (≈1 week)
Playground/Lab experiments · perf hardening vs field data · cross-browser/device sweep · content proof pass · Awwwards/press submission kit (video capture, screenshots) · announce.

## Standing risks

| Risk | Mitigation |
|---|---|
| Scope creep in motion work | Part VII is the contract; new ideas → proposal first |
| WebGL perf on mid mobile | Device tiering from day one; static fallbacks designed, not afterthoughts |
| AI cost surprise | Hard caps before launch traffic; kill switch |
| Content lag (case studies unwritten) | Case-study writing starts Phase 3, parallel to build |
| Font licensing | Decision due at Phase 2 entry |
