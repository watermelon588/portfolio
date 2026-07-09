# FEATURES.md

> **Status legend:** ⬜ not started · 🟨 in progress · ✅ shipped · 🔒 blocked (needs approval/input)
> **Priority:** P0 = launch-blocking · P1 = launch-quality · P2 = post-launch
> **Last updated:** 2026-07-09 · Design details live in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) Part VII; order of execution in [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md).

## Global systems

| Feature | P | Status | Acceptance criteria (summary) |
|---|---|---|---|
| Design token system (colors/type/space/motion) | P0 | 🔒 palette pending | Single `tokens.css` + shared JS tokens; theme-dark section flip works |
| MotionProvider (Lenis + GSAP sync, device gates) | P0 | ⬜ | One rAF pipeline; reducedMotion/touch/lowEnd gates honored by all effects |
| Preloader (branded, once per session) | P0 | 🔒 concept approval | ≤2.5s, curved exit, skipped on revisit, reduced-motion = fade |
| Page transitions (curved overlay + entrance rise) | P0 | 🔒 concept approval | No orphan triggers/canvases after 20 rapid navigations |
| Staggered Menu (global nav overlay) | P0 | 🔒 | Focus-trapped, ESC closes, magnetic links, works sans JS-hover on touch |
| Magnetic buttons (pill + circle + fill hover) | P0 | 🔒 | Strength via props; elastic release; disabled on touch |
| Cursor follower system (dot/label/media, layered lag) | P1 | 🔒 | Desktop only; SR/keyboard equivalents present |
| Line Sidebar (section progress rail) | P2 | ⬜ | Desktop only, reflects scroll position, clickable markers |
| Footer CTA block (huge invite + circle CTA + local time) | P0 | 🔒 | On every page; Asia/Kolkata live clock; email/phone pills |
| SEO (prerender, meta/OG per route, sitemap) | P0 | ⬜ | Social debuggers render OG; Lighthouse SEO ≥ 95 |
| Accessibility baseline | P0 | ⬜ | axe serious/critical = 0; full reduced-motion journey |

## Pages

| Feature | P | Status | Notes |
|---|---|---|---|
| Home: hero (name display, label row, Liquid Ether bg, marquee) | P0 | 🔒 | WebGL desktop-only, post-LCP mount |
| Home: intro manifesto (line-split reveal + circle CTA) | P0 | 🔒 | |
| Home: Selected Work (Flowing Menu + hover media preview) | P0 | 🔒 | 3–5 featured projects |
| Home: strip gallery (opposing parallax rows, in-view videos) | P1 | 🔒 | |
| Work index (filterable list/tiles) | P0 | 🔒 | Filter: design/development/ai |
| Case study template (MDX, chapter rail, Scroll Reveal, next-project footer) | P0 | 🔒 | 3 case studies at launch minimum |
| About (Image Trail portrait, manifesto, Magic Bento skills, timeline) | P1 | 🔒 | |
| Dev Logs (Masonry index + MDX article page) | P1 | 🔒 | Mono-flavored meta styling |
| Playground/Lab (Splash Cursor, Text Pressure, Matter.js toy, R3F/Spline expts) | P2 | 🔒 | One experiment per viewport |
| Contact (Stepper form → api, success/error states) | P0 | 🔒 | Honeypot + rate limit server-side |
| 404 (Falling Text physics + home CTA) | P1 | 🔒 | |

## Backend (`apps/api`)

| Feature | P | Status |
|---|---|---|
| Projects/logs public read endpoints (+cache headers) | P0 | ⬜ |
| Contact intake (validate, honeypot, rate limit, Resend notify, store) | P0 | ⬜ |
| Admin auth (JWT + rotating refresh) + projects/contacts CRUD | P1 | ⬜ |
| Cloudinary signed uploads | P1 | ⬜ |
| Health + vitals beacon endpoints | P1 | ⬜ |

## AI (`apps/ai`) — Phase 6, space reserved from day one

| Feature | P | Status |
|---|---|---|
| Content ingestion (chunk→embed→Atlas vectors, CI-triggered) | P1 | ⬜ |
| Project-scoped RAG chat (SSE, source chips) | P1 | ⬜ |
| Site-wide assistant (`/ask` + text mode) | P1 | ⬜ |
| AIVoiceOrb + voice panel (ElevenLabs Agents, cloned voice) | P1 | 🔒 voice recording needed |
| TTS spoken project intros | P2 | ⬜ |
| Guardrails (budgets, caps, kill switch) | P0-of-AI | ⬜ |

🔒 items are blocked by the Design Approval Gate (concept sign-off + palette) — see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) Part X, and voice items additionally by Rohit's voice-clone recording ([AI_PIPELINE.md](./AI_PIPELINE.md)).
