# PROJECT_SCORECARD.md

> Quality rubric — how we know the site is actually good, not just done. Scored at the end of every roadmap phase and monthly after launch. Current column starts empty: no code exists yet.
> **Last updated:** 2026-07-09 · **Next scoring:** end of Phase 2

## Scoring: each dimension 0–10 · launch bar = no dimension below 7, weighted total ≥ 8.0

| Dimension | Wt | How it's measured | Target | Current |
|---|---|---|---|---|
| **Design craft** | 20% | Taste review vs [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md): token discipline, typography rhythm, whitespace, section pacing; compare against reference class (Awwwards SOTD) | ≥ 8 | — |
| **Motion quality** | 15% | Manual motion QA checklist; easing/stagger consistency; purpose-per-animation audit (zero decorative-only survivors) | ≥ 8 | — |
| **Performance** | 15% | Budgets in [PERFORMANCE.md](./PERFORMANCE.md): LCP/INP/CLS lab+field, bundle sizes, 60fps traces | ≥ 8 (all budgets green) | — |
| **Accessibility** | 10% | axe serious/critical = 0; keyboard journey; reduced-motion journey; SR spot-check | ≥ 8 | — |
| **Code quality** | 10% | Lint/type clean, review findings/KLOC, layering respected, motion-token compliance | ≥ 7 | — |
| **Test confidence** | 10% | Coverage bars ([TESTING.md](./TESTING.md)), e2e journey count, flake rate < 1% | ≥ 7 | — |
| **Content strength** | 10% | Case studies: problem→decision→result depth; dev logs cadence; copy voice consistency | ≥ 7 | — |
| **AI experience** (Phase 6+) | 5% | Groundedness spot-check (10 questions/case study), latency targets, graceful budget exhaustion | ≥ 7 | — |
| **Docs freshness** | 5% | [DOCUMENTATION_REVIEW.md](./DOCUMENTATION_REVIEW.md) — % docs within review SLA | ≥ 8 | 10 (day zero) |

## Score history

| Date | Phase | Weighted | Notes |
|---|---|---|---|
| 2026-07-09 | 0 | n/a | Baseline established; only docs exist |

## External validation targets (aspirational, tracked not gated)

- Lighthouse 90+ across all four categories on every public route
- Awwwards submission after Phase 7 (honorable mention = stretch goal)
- 3 unsolicited pieces of feedback from engineers/designers collected pre-launch (hallway test)
