# DECISIONS.md

> Architecture Decision Records. Append-only; reversals get a *new* ADR that supersedes.
> **Last updated:** 2026-07-09 · Format: Context → Decision → Consequences · Status: ✅ Accepted / 🟡 Proposed / ⛔ Superseded

| # | Decision | Status |
|---|---|---|
| 001 | pnpm monorepo (web / api / ai / shared) | ✅ |
| 002 | Vite SPA + prerender, **not** Next.js | ✅ |
| 003 | Tailwind v4 + CSS-variable design tokens | ✅ |
| 004 | GSAP = choreography · Motion = UI state (division of labor) | ✅ |
| 005 | Lenis owns scrolling | ✅ |
| 006 | Atlas Vector Search, not a dedicated vector DB | ✅ |
| 007 | FastAPI sidecar for all AI | ✅ (user requirement) |
| 008 | ElevenLabs Agents for voice, signed-URL brokering | ✅ |
| 009 | Case studies/dev logs = MDX in repo; DB stores metadata only | ✅ |
| 010 | Cloudinary for media | ✅ |
| 011 | ReactBits vendored (copy-paste), not npm-installed | ✅ |
| 012 | Spline adoption gate (≤2MB scene or skip) | 🟡 deferred |
| 013 | Claude `claude-sonnet-5` default via env | ✅ |
| 014 | Palette locked: blue `#0049CD`, bg `#F6F6F6`, surface `#FFFFFF`, gray `#DADADA`/`#9D9D9C`, text `#000000` | ✅ |
| 015 | Satoshi as the single typeface (free, Fontshare) | ✅ |
| 016 | Everything-is-a-component architecture mandate | ✅ |
| 017 | Asset-driven components; no hardcoded placeholder visuals | ✅ |
| 018 | Selective dark-world sections on `#000000` (preloader, contact/footer, AI panel only) | ✅ |

---

**ADR-001 — pnpm workspaces monorepo.** Three deployables + shared contracts; separate repos would triple CI/config for a solo dev. Turbo optional later. *Consequence:* one lockfile, atomic cross-service PRs; Python app coexists (uv-managed) without workspace integration.

**ADR-002 — Vite SPA over Next.js.** The brief is MERN with a *real* Express backend (showcase goal G3) — Next would absorb the backend into API routes and its App Router conventions fight heavy imperative GSAP/WebGL work. SEO handled by prerendering the ~10 public routes at build + per-page meta/OG. *Consequence:* we own transition/scroll orchestration fully (a feature — it's the differentiator); tradeoff: no streaming SSR, and prerender step is our responsibility. *Revisit trigger:* if content pages grow into hundreds or SEO underperforms by month 3.

**ADR-003 — Tailwind v4 + CSS variables.** Tokens must be shared by CSS, Tailwind utilities, and GSAP JS. v4's CSS-first config consumes native variables directly, so `DESIGN_SYSTEM.md` Part III is the single source. *Consequence:* palette swap = one file; utilities never hardcode colors.

**ADR-004 — GSAP for choreography, Motion for UI state.** Both are required by the brief; without a boundary they'd overlap and double-animate. Rule: *anything scroll-linked, timeline-sequenced, or text-split is GSAP; anything component-state-driven (menu open, modal, form feedback, presence) is Motion.* One element never has two owners. *Consequence:* predictable reviews; ReactBits components keep whichever engine they ship with.

**ADR-005 — Lenis.** Locomotive (the reference's choice) is in maintenance; Lenis is its successor, GSAP-friendly (single rAF via gsap.ticker). *Consequence:* one scroll owner; native scroll restored for reduced-motion.

**ADR-006 — Atlas Vector Search.** Corpus < 5k chunks; a dedicated vector DB (Pinecone/Qdrant) adds infra, cost, and a network hop for zero quality gain at this scale. *Consequence:* vectors live beside data, one backup story; ceiling ~10M vectors is irrelevant here.

**ADR-007 — FastAPI sidecar (user requirement, endorsed).** Isolates Python AI ecosystem, independent deploy/scale, keeps Express lean. *Consequence:* two backend runtimes to operate — accepted; kill switch makes AI fully detachable.

**ADR-008 — ElevenLabs Agents + signed URLs.** Manual STT→LLM→TTS pipelines add ~1–2s latency and turn-taking complexity; Agents handles VAD/interruptions and streams the cloned voice directly browser↔ElevenLabs. Keys never reach the client. *Consequence:* vendor lock for voice UX (fallback path documented in AI_PIPELINE); cost gated by session caps.

**ADR-009 — MDX in repo.** Case studies are code-like artifacts (custom components, versioned, reviewed). A CMS adds hosting+auth+API for one author. *Consequence:* publishing = PR (fine, author is a dev); AI corpus re-ingests on content change via CI hash-diff.

**ADR-011 — ReactBits vendored.** ReactBits is copy-paste by design; vendoring under `components/vendor/reactbits/` lets us bind tokens and strip unused options while tracking upstream (fetch date + URL per component). *Consequence:* we own maintenance; quarterly upstream diff logged in TECH_DEBT.

**ADR-013 — Claude Sonnet 5 default, env-swappable.** Best cost/quality for grounded persona chat under strict budgets; `AI_MODEL` env allows instant upgrade (e.g., to a Fable/Opus-class model) without deploy. *Consequence:* pricing re-checked at Phase 6 start.

**ADR-014 — Palette locked (2026-07-09).** Approved by directive: primary blue `#0049CD`, background `#F6F6F6`, light surface `#FFFFFF`, surface gray `#DADADA`, neutral gray `#9D9D9C`, primary text `#000000`. Cooler and higher-contrast than the reference (pure black on cool near-white, deeper royal blue). This is the default visual language unless explicitly re-approved. *Consequence:* `tokens.css` holds these as CSS variables; components never hardcode hex. Two derivations remain open — hover/pressed blue (`#003AA3` proposed) and the entire dark-world set (see ADR-018).

**ADR-015 — Satoshi, single typeface.** Chosen over licensing PP Neue Montreal (the reference's font). Free for commercial use (Fontshare), geometric-grotesque with the same "one family, hierarchy via size/case/opacity" discipline the system depends on. *Consequence:* self-hosted subset woff2; no license cost or tracking; variable-font moments (Text Pressure) use its own bundled VF, not Satoshi.

**ADR-016 — Everything is a component.** Directive mandate: every UI element — buttons, nav, cards, badges, inputs, dialogs, sections, hero, grids, **cursor, loader, background effects, scroll indicators, animated text, media, magnetic wrappers, AI widgets, FABs** — is an independent, reusable, composable component. No inline one-off UI. *Consequence:* higher up-front structure cost, paid back in consistency + maintainability; enforced in review (a raw styled element that should be a component is a change-request). Folder map already reflects this ([FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)).

**ADR-017 — Asset-driven, no hardcoded placeholders.** Rohit has icons/illustrations/images/graphics coming gradually. Final components must accept those via props/slots and render graceful empty/loading states meanwhile — never bake in throwaway placeholder art that later needs ripping out. *Consequence:* components designed around asset contracts (e.g., `ProjectCard` takes `cover`/`media` shapes from day one); a styleguide uses obviously-marked dummy assets, product components do not.

**ADR-018 — Selective dark-world sections (2026-07-09).** The approved palette is light-only; Rohit chose to keep the reference's light↔dark alternation but **only for high-impact moments** — preloader, contact/footer, and the AI panel — anchored on `#000000` bg with `#F6F6F6` text and the same `#0049CD` accent. The rest of the site stays light (`#F6F6F6`/`#FFFFFF`). *Consequence:* `--dark-*` tokens are now final (not proposed); dark theming stays scarce (contrast where it counts, not a second full theme); the `ThemeSection` `data-theme="dark"` wrapper is used sparingly by design, not per-section discretion.
