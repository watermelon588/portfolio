# TECH_DEBT.md

> Ledger of shortcuts taken on purpose and risks accepted with eyes open. Every entry: what, why accepted, cost of leaving it, trigger to pay it down.
> **Last updated:** 2026-07-09 · Review cadence: end of each roadmap phase.

## Format

```
### TD-XXX · <title>            Status: open | paying-down | closed
Area:      web | api | ai | infra | docs
Incurred:  <date / phase>       Severity: low | med | high
What:      the shortcut/risk
Why:       why we accepted it
Trigger:   the condition that forces payment
```

## Open items

### TD-001 · Vendored ReactBits will drift from upstream — Status: open
**Area:** web · **Incurred:** by design, ADR-011 · **Severity:** med
**What:** 13 components copied into `components/vendor/reactbits/`, then token-bound; upstream fixes (perf, mobile, a11y) won't arrive automatically.
**Why:** ReactBits is copy-paste by design; we need token binding and prop-trimming.
**Trigger:** quarterly diff against upstream (fetch dates in each `UPSTREAM.md`); any upstream perf/a11y fix relevant to a shipped component gets ported within the phase.

### TD-002 · SPA prerender is homemade, not framework-grade SSR — Status: open (accepted)
**Area:** web · **Incurred:** ADR-002 · **Severity:** med
**What:** SEO depends on our build-time prerender step + meta management rather than Next-style SSR/streaming.
**Why:** Real Express backend is a portfolio goal; imperative GSAP/WebGL work is simpler without an SSR framework fighting hydration.
**Trigger:** Search Console coverage problems or social-embed failures by launch+1 month → revisit ADR-002.

### TD-003 · Single-admin auth is deliberately minimal — Status: open (accepted)
**Area:** api · **Incurred:** design · **Severity:** low
**What:** No roles, no 2FA, refresh-token rotation only, sessions die on secret rotation.
**Why:** One trusted user; full auth infra is over-engineering.
**Trigger:** Any second user, or admin surface exposed beyond CRUD.

### TD-004 · M0 Atlas has no automated backups — Status: open
**Area:** infra · **Incurred:** Phase 0 cost choice · **Severity:** med (low until real contacts accumulate)
**What:** Free tier = no continuous backup; plan is weekly `mongodump` GitHub Action.
**Why:** $0 while pre-launch; content of record (MDX) is in git anyway — only contacts/meta are at risk.
**Trigger:** First real contact submissions in prod → implement the dump action (Phase 5 at latest); meaningful traffic → paid tier.

### TD-005 · Motion/3D libraries pinned against auto-upgrade — Status: open (accepted)
**Area:** web · **Incurred:** DEPENDENCIES policy · **Severity:** low
**What:** GSAP/Motion/three/R3F excluded from automated dependency bumps; manual upgrades only, with visual regression pass.
**Why:** These break visually-silently; a green CI doesn't mean the easing still feels right.
**Trigger:** Security advisory (immediate) or two majors behind (scheduled).

## Anticipated (not yet incurred — watch list)

- **three.js bundle weight** if a second scene lands outside the lab → enforce single vendor-chunk + route gating (PERFORMANCE.md).
- **ElevenLabs vendor coupling** for the voice UX → fallback pipeline already specified in AI_PIPELINE; keep transcript UI vendor-agnostic.
- **MDX component sprawl** (every case study inventing widgets) → shared MDX component kit after the second case study, not before.

## Closed items

*(none yet)*
