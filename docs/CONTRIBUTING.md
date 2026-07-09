# CONTRIBUTING.md

> **Status:** Adopted · **Last updated:** 2026-07-09
> Solo project (Rohit + AI pair), but run with team discipline — the process *is* part of the portfolio.

## Workflow

1. **Pick work** from [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) / [FEATURES.md](./FEATURES.md) (respect phase order — foundations before flourish).
2. **Design gate (mandatory for anything visual/UX):** per the Design Approval Policy in [CLAUDE.md](../CLAUDE.md) — concept, justification, layout/interaction/animation description → **Rohit approves** → build. No exceptions, including "small tweaks" to approved designs.
3. Branch (`feat/…`), build, keep commits Conventional.
4. Self-review with the checklists below, open PR to `main` (yes, even solo — PRs are the changelog's raw material), CI green, merge.
5. **Update the paper trail** — same PR:
   - [CHANGELOG.md](./CHANGELOG.md) under `[Unreleased]`
   - [CURRENT_STATE.md](./CURRENT_STATE.md) if the "where are we" answer changed
   - The area doc your change invalidated (API_SPEC, DATABASE, DESIGN_SYSTEM…) — [DOCUMENTATION_REVIEW.md](./DOCUMENTATION_REVIEW.md) maps which docs each change type touches
   - [DECISIONS.md](./DECISIONS.md) if you made a choice future-you will question

## Definition of Done

- [ ] Matches approved design concept (visual work) — no unapproved improvisation
- [ ] Motion uses tokens + MotionProvider gates; cleanup verified (no orphan triggers/canvases)
- [ ] Responsive 360px → 1920px; touch fallbacks in place
- [ ] `prefers-reduced-motion` path usable
- [ ] Keyboard + screen-reader pass for new UI
- [ ] Tests per [TESTING.md](./TESTING.md) (logic units, api integration, e2e if flow-level)
- [ ] Perf checklist from [PERFORMANCE.md](./PERFORMANCE.md) for anything animated/heavy
- [ ] Docs updated (step 5 above)

## Adding content (no-code paths)

- **New project:** folder in `apps/web/content/case-studies/<slug>/` (MDX + assets) → admin API call for meta record → PR. CI rebuilds + re-ingests AI corpus.
- **New dev log:** MDX in `content/dev-logs/` → meta via admin API → PR.

## Release

`main` merge = deploy (see [DEPLOYMENT.md](./DEPLOYMENT.md)). Version tags `vX.Y.Z` when a roadmap phase completes: move `[Unreleased]` → dated section in CHANGELOG, tag, push.
