# PROJECT_MEMORY.md

> Long-lived context for humans and AI assistants working on this repo: the *why* behind things that code and git history can't express. Append, don't rewrite; prune only when facts become false.
> **Last updated:** 2026-07-09

## Prime directives (never violate)

1. **Design Approval Policy** — no visual/UX implementation or commit without Rohit's explicit approval of concept, justification, and planned interactions ([CLAUDE.md](../CLAUDE.md)). This includes "improvements" to already-approved designs.
2. **Design quality > implementation speed** — Rohit stated this explicitly; when they conflict, slow down.
3. **Every animation needs a job** — decoration without purpose is cut, per the project brief.
4. **AI space stays reserved** — `/ask` route, `AIVoiceOrb` mount, `AI_ENABLED` flags exist from Phase 1 even while dormant.

## Key context (asked-and-answered)

- **Owner:** Rohit Maity (maityrohit021@gmail.com), full-stack MERN developer, India (footer clock: Asia/Kolkata).
- **North-star reference:** dennissnellenberg.com — Rohit is inspired by its design principles, animation, typography, and color theory. We extracted its *system* (teardown in DESIGN_SYSTEM Part I) but must produce an original design — no cloning, no copied copy.
- **Palette (APPROVED 2026-07-09):** primary blue `#0049CD`, background `#F6F6F6`, light surface `#FFFFFF`, surface gray `#DADADA`, neutral gray `#9D9D9C`, primary text `#000000` (ADR-014). Light-only, cooler + higher-contrast than the reference. **Font:** Satoshi (free, Fontshare — ADR-015). **Open:** dark-world section colors aren't in the approved palette (ADR-018) — decision pending.
- **Two architecture mandates from the directive:** (1) *everything is a component* — even the cursor/loader/background-effect/scroll-indicator (ADR-016); (2) *asset-driven, no hardcoded placeholders* — real icons/images/video arrive gradually, components accept them via props/slots with empty states (ADR-017).
- **Component wishlist is a menu, not a mandate:** Rohit's `!!!` markers set priority — Splash Cursor and Liquid Ether are top-priority, then Staggered/Flowing Menu, Scroll Reveal, Falling Text. "Use more cool external components" = GSAP, Motion, Lenis, R3F, Spline, Matter.js, MDX all in scope.
- **Placement conflict resolved by design:** Liquid Ether owns the home hero; Splash Cursor lives on AI/Playground pages — two fluid sims never share a viewport (GPU + taste).
- **Stack mandated by Rohit:** MERN (React frontend, Node/Express backend) + **FastAPI strictly for the AI part**. ElevenLabs for the voice assistant *in Rohit's own voice*; interactive AI breakdowns of projects.
- **Docs location decision:** `CLAUDE.md` at root (auto-loaded by Claude Code); everything else under `docs/`. Move requests welcome but update cross-links.

## Hard-won facts (from the 2026-07-09 research session)

- The reference site's "premium feel" reduces to: one easing `cubic-bezier(.7,0,.3,1)` + 4 durations, one typeface at weight 450, fluid clamp() everything, light/dark section worlds, entrances that rise from below with `expo.out`, and magnetic physics on every interactive element. Full recipe in DESIGN_SYSTEM.
- The reference runs on jQuery + GSAP 3.9 + Locomotive + Barba — proof the wow-factor is craft, not framework. Our React port must not over-engineer what is fundamentally timeline discipline.
- All 13 requested ReactBits components exist as of 2026-07-08 sitemap, **including `line-sidebar`** (`reactbits.dev/components/line-sidebar`).
- GSAP became fully free (premium plugins included) after the Webflow acquisition — no Club membership needed.
- `lenis` npm package (not `@studio-freight/lenis` — renamed).
- land-book.com and lapa.ninja block scrapers (403) — browse manually for inspiration.

## Glossary (project vocabulary)

| Term | Meaning |
|---|---|
| "Light/dark worlds" | Section-level theme flip via `data-theme`, not a site-wide dark mode |
| "Curved reveal" | The circular-arc divider/overlay used in preloader, transitions, section seams |
| "Motion tokens" | `--ease`, `--dur-*`, stagger scale — the only legal animation values |
| "The gates" | MotionProvider's `{reducedMotion, isTouch, isLowEnd}` checks |
| "Design gate" | Phase-2 entry approval checklist (DESIGN_SYSTEM Part X) |
| "Orb" | `AIVoiceOrb` — floating AI assistant entry point |

## Session log

| Date | What happened / what was decided |
|---|---|
| 2026-07-09 | Project inception. Reference site + ReactBits scraped and analyzed; 25-doc suite written; ADR-001…014; roadmap phased with design gate at Phase 2. Awaiting: palette, typeface choice, concept approvals (CURRENT_STATE queue). |
