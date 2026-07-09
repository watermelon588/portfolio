# PERFORMANCE.md

> **Status:** Budgets set (hard gates from Phase 2 onward) · **Last updated:** 2026-07-09
> Premise: this site's design thesis is *motion-rich AND fast*. If an effect can't hit 60fps on a mid-tier phone, it ships smaller or gated — beauty includes performance.

## Budgets (hard gates)

| Metric | Target | Where measured |
|---|---|---|
| LCP | ≤ 2.5 s | Moto G-class, Slow 4G, Lighthouse CI |
| INP | ≤ 200 ms | field (web-vitals beacon) |
| CLS | ≤ 0.1 (goal 0) | lab + field |
| Initial JS (`/` critical path) | ≤ 200 KB gz | bundle report in CI |
| Lazy chunk (any single) | ≤ 300 KB gz (three-vendor exempt, ≤ 600 KB) | bundle report |
| Animation frame budget | 60 fps sustained; no main-thread task > 50 ms during scroll | DevTools traces, manual QA checklist |
| Font payload | ≤ 120 KB total woff2 | build check |
| Preloader | ≤ 2.5 s first visit, 0 s repeat (session flag) | manual |

CI: Lighthouse CI on preview deploys — regression > 5 points on Perf/A11y/Best-Practices/SEO fails the check. Field: 10%-sampled web-vitals beacon → `POST /api/vitals` → reviewed in [PROJECT_SCORECARD.md](./PROJECT_SCORECARD.md).

## Strategy

### JavaScript
- Route-level code splitting; heavy components (`three`/R3F scenes, Liquid Ether, Splash Cursor, Spline, Matter.js, MDX pages) always `lazy()` + suspense with dimension-locked placeholders.
- `three` in its own vendor chunk, loaded only on routes that render a scene; **never** in the `/` critical path — hero WebGL mounts post-LCP behind `requestIdleCallback`.
- GSAP core+ScrollTrigger in main bundle (small, drives everything); SplitText et al. imported where used.

### Rendering & motion (the 60fps contract)
- Animate `transform`/`opacity` only; layout-affecting properties (height/top/margin) never tweened — clip-path/scale tricks instead.
- `will-change` set on interaction start, removed on end (persistent will-change hurts).
- One ticker: Lenis driven by GSAP's ticker; ScrollTrigger updates from Lenis scroll — a single rAF pipeline, no competing loops.
- ScrollTriggers scoped per section component, killed on unmount (`gsap.context`).
- WebGL: max 1 canvas per viewport, `dpr = min(devicePixelRatio, 2)`, paused when off-screen (IntersectionObserver) and on `document.hidden`, disposed on route leave.
- Device tiering in `MotionProvider`: `lowEnd = deviceMemory ≤ 4 || hardwareConcurrency ≤ 4`; touch/lowEnd/reducedMotion downgrade: fluid sims → static gradient, parallax → off, magnetic/cursor followers → off.

### Assets
- Cloudinary `f_auto,q_auto,w_auto` + explicit `width/height` (CLS 0); AVIF-first; dominant-color placeholder backgrounds (from `projects.cover.dominant`).
- Videos: muted, `playsinline`, `preload="none"`, poster set, play/pause via in-view observer (reference-site pattern).
- Fonts: self-hosted subset woff2, weight strategy = 1 primary weight (+ mono), `font-display: swap` + metric-compatible fallback via `size-adjust` → zero CLS.
- 3D: draco/ktx2-compressed GLTF; Spline only if exported scene ≤ 2 MB (ADR gate).

### Network
- API GETs: `Cache-Control: public, max-age=60, stale-while-revalidate=600` + ETag; project list also embedded as build-time snapshot fallback.
- Preconnect: api, ai, Cloudinary origins. Prefetch route chunks on link hover/viewport intent.
- SSE for AI streams (no polling).

## Manual motion QA checklist (per feature PR)

- [ ] 4× CPU throttle scroll-through: no dropped-frame bursts, no scroll-jack fights
- [ ] Rapid route-change spam: no orphan ScrollTriggers / canvases / listeners (memory profile flat)
- [ ] `prefers-reduced-motion`: journey fully usable, nothing auto-moves
- [ ] Touch device: no hover-dependent dead ends; fluid sims replaced
- [ ] Tab hidden/restored: tickers pause/resume, no time-jump snaps
