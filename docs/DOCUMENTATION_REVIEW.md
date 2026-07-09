# DOCUMENTATION_REVIEW.md

> Keeps the doc suite honest. Every doc has an owner (Rohit, or the AI session doing the change under his review), a review trigger, and a freshness state. Stale docs are worse than no docs.
> **Last updated:** 2026-07-09

## Review triggers by change type (touch these docs in the same PR)

| When you… | You must update |
|---|---|
| Change any endpoint/payload | API_SPEC + shared schemas + REQUEST_FLOWS (if flow shape changed) |
| Change a schema/index | DATABASE (+ API_SPEC if exposed) |
| Add/remove a dependency | DEPENDENCIES (+ PERFORMANCE if it ships to client) |
| Add/change env var or flag | CONFIGURATION (+ DEPLOYMENT if platform setting) |
| Make an architectural choice | DECISIONS (new ADR) + ARCHITECTURE if shape changed |
| Any design/visual change | DESIGN_SYSTEM (after approval) + FEATURES status |
| Complete a feature/phase | FEATURES, PROJECT_ROADMAP, CHANGELOG, CURRENT_STATE, SCORECARD (phase end) |
| Accept a shortcut/risk | TECH_DEBT |
| Learn something non-obvious | PROJECT_MEMORY |
| Finish any significant session | CURRENT_STATE (always) |

## Doc registry

Status: 🟢 fresh (within SLA) · 🟡 review due · 🔴 known-stale. SLA = max age before a scheduled look, independent of triggers.

| Doc | Purpose (one line) | SLA | Last reviewed | Status |
|---|---|---|---|---|
| ../CLAUDE.md | AI operating manual + design gate | phase end | 2026-07-09 | 🟢 |
| DESIGN_SYSTEM.md | Visual/motion contract | phase end | 2026-07-09 | 🟢 (palette placeholder flagged) |
| PROJECT_OVERVIEW.md | Vision, goals, scope | monthly | 2026-07-09 | 🟢 |
| ARCHITECTURE.md | System shape | phase end | 2026-07-09 | 🟢 |
| API_SPEC.md | Endpoint contract | on change | 2026-07-09 | 🟢 |
| AI_PIPELINE.md | AI features design | Phase 6 entry | 2026-07-09 | 🟢 |
| DATABASE.md | Schemas/indexes | on change | 2026-07-09 | 🟢 |
| REQUEST_FLOWS.md | Sequence walkthroughs | on change | 2026-07-09 | 🟢 |
| FOLDER_STRUCTURE.md | Repo layout | Phase 1 end | 2026-07-09 | 🟢 (planned → verify at scaffold) |
| DEPENDENCIES.md | Dep manifest + policy | on change | 2026-07-09 | 🟢 (versions pinned at install) |
| CONFIGURATION.md | Env/config matrix | on change | 2026-07-09 | 🟢 |
| DEPLOYMENT.md | Platforms + runbooks | Phase 3 | 2026-07-09 | 🟢 |
| PERFORMANCE.md | Budgets + strategy | phase end | 2026-07-09 | 🟢 |
| CODE_STYLE.md | Conventions | quarterly | 2026-07-09 | 🟢 |
| CONTRIBUTING.md | Workflow + DoD | quarterly | 2026-07-09 | 🟢 |
| TESTING.md | Test strategy | phase end | 2026-07-09 | 🟢 |
| DECISIONS.md | ADR log | append-only | 2026-07-09 | 🟢 |
| FEATURES.md | Feature inventory + status | weekly during build | 2026-07-09 | 🟢 |
| PROJECT_ROADMAP.md | Phases + gates | phase end | 2026-07-09 | 🟢 |
| CHANGELOG.md | Change history | every PR | 2026-07-09 | 🟢 |
| CURRENT_STATE.md | Session snapshot | **every session** | 2026-07-09 | 🟢 |
| TECH_DEBT.md | Accepted shortcuts | phase end | 2026-07-09 | 🟢 |
| PROJECT_MEMORY.md | Long-lived context | on learning | 2026-07-09 | 🟢 |
| PROJECT_SCORECARD.md | Quality rubric | phase end | 2026-07-09 | 🟢 |
| DOCUMENTATION_REVIEW.md | This registry | phase end | 2026-07-09 | 🟢 |

## Review checklist (when a doc comes due)

- [ ] Facts still true? (links resolve, versions current, names/paths exist)
- [ ] Contradicts any other doc? (most common rot: DESIGN_SYSTEM vs FEATURES status, API_SPEC vs shared schemas)
- [ ] Anything here now better expressed in code/tests? → delete the prose, link the source
- [ ] "Last updated" stamp refreshed
