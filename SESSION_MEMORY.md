# Shared portfolio session memory

This is the coordination source of truth for **Codex and Claude Code**. Read this file and `plan.md` before starting or resuming work. A named session requires Rohit's authorization. Do not take another agent's session or edit its claimed files. No automatic commits, branch switches, pushes or deployments in this shared checkout.

## Live session board

`[x]` means claimed, not completed. The status column records completion separately. Times are Asia/Kolkata.

| Claimed | Session | Owner | Status | Updated | Current work |
|---|---|---|---|---|---|
| [ ] | 1 — Neuron + YapChat | Unassigned | NOT_STARTED | 2026-10-02 | Awaiting assignment; refresh both existing cases (Claude Code's attempt rolled back at Rohit's request) |
| [x] | 2 — Walkthru | Codex | DONE | 2026-10-02 16:40 IST | Image parallax follow-up verified; approved layout/content preserved; claims released |
| [x] | 3 — TripVerse | Codex | DONE | 2026-10-03 | Detailed case + original journals, selected order and 16 homepage gallery visuals complete; focused checks recorded; claims released |
| [x] | 4 — Shiori | Claude Code | DONE | 2026-10-03 | /work/shiori built with original cast stage, manga wall and gallery wall; checks pass; pushed; claims released |
| [ ] | 5 — Final verification | Unassigned | NOT_STARTED | 2026-10-02 | Starts after Sessions 1–4 are DONE and all claims released |

Statuses: `NOT_STARTED`, `IN_PROGRESS`, `BLOCKED`, `DONE`. For BLOCKED, record the exact blocker and release unused files. DONE requires implementation and the session's focused checks, not only a draft.

## Claim protocol

1. Read the current board and file claims immediately before editing. Claim only the session Rohit assigned to you. Set its checkbox, owner, IN_PROGRESS, timestamp and exact paths first.
2. Serialize edits to this document and `plan.md`: acquire the temporary exclusive lease described below, re-read the files, make the small update, then release the lease. Do not hold the lease while researching/building.
3. Keep edits inside your session's paths. Shared files need a separately recorded exclusive claim. If another agent owns a needed file, record the requested change in your handoff and continue independent work.
4. Add concise progress entries at meaningful milestones and when stopping. Record checks, limitations, new files and any changed public interface.
5. At completion mark DONE, record validation and handoff, and release code claims. Leave the claimed checkbox and owner as history. Reopening a DONE session needs a new IN_PROGRESS entry before edits.

Markdown checkboxes alone are not an atomic lock. For board/plan updates, use PowerShell's exclusive creation of `.session-memory.lock` in the repo root:

```powershell
$sessionLease = [System.IO.File]::Open((Join-Path (Get-Location) '.session-memory.lock'), [System.IO.FileMode]::CreateNew, [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
# Re-read and update SESSION_MEMORY.md / plan.md while this handle exists.
# Release after the update, including on failure:
$sessionLease.Dispose()
Remove-Item -LiteralPath '.session-memory.lock'
```

If creation fails, another agent is updating coordination. Retry after its update. Never delete another agent's lease blindly; check the owner/progress with Rohit if a crashed writer leaves it behind. A code claim persists after this short document lease is released.

## File ownership and integration boundaries

Paths below are relative to this repository. Existing dirty work in RootLayout, About/Contact/Hero/Gallery/Footer, base/v2 CSS and supplied assets predates Session 2. Preserve it.

| Owner / session | Exclusive code paths | Read-only reuse / restrictions |
|---|---|---|
| Codex / shared integration — DONE, released | `apps/web/src/data/projects.ts`, `data/caseStudies.ts`, `data/projectRegistry.ts`, `pages/ProjectDetailRoute.tsx`, `routes.tsx`, `sections/Footer/Footer.tsx/.css`, `components/motion/Preloader.tsx`, registry test | Integration established. Freeze until Session 5 unless a specific exclusive claim is recorded. Preserve all pre-existing user changes. |
| Session 1 | `pages/NeuronProjectPage.tsx`, `pages/NeuronProjectPage.css`, `pages/YapChatProjectPage.tsx`, `pages/YapChatProjectPage.css`, `data/projectEntries/neuron.ts`, `data/projectEntries/yapchat.ts`, derivatives under `assets/Neuron/docs/portfolio/` and `assets/Yap chat/screenshots/portfolio/` | Existing primitives/shared CSS read-only. Refresh preview and case metadata through the two owned entry files. |
| Codex / Session 2 — DONE, released | `apps/web/src/pages/WalkthruProjectPage.tsx`, `apps/web/src/pages/WalkthruProjectPage.css`, `output/session-2/` | Image parallax follow-up complete. Entry/assets/shared components unchanged. Reopen via recorded claim before editing. |
| Codex / Session 3 — DONE, released | `apps/web/src/pages/TripverseProjectPage.tsx`, `.css`, `data/projectEntries/tripverse.ts`, `components/tripverse/`, `assets/Tripverse/portfolio/`, `apps/web/public/images/journal/`, `output/session-3/` | Original journals/assets/fonts transplanted and checked. TripVerse entry activates the required four-row homepage selection. Reopen with a recorded claim before editing. |
| Codex / Session 3 — shared gallery/showcase DONE, released | `apps/web/src/data/gallery.ts`, `apps/web/src/sections/Gallery/Gallery.tsx`, `apps/web/src/components/FeatureShowcase/FeatureShowcase.tsx` | Six-project reel includes 16 new authentic visuals; dynamic count/descriptive alt text; existing showcase supports Enter/Space. Existing motion preserved. |
| Session 4 | `pages/ShioriProjectPage.tsx`, `.css`, `data/projectEntries/shiori.ts`, `components/shiori/`, `assets/Shiori (栞)/portfolio/` and copied art bundle | Original interactive cast stage/gallery wall must be transplanted. Keep local-app versus hosted-site distinction. |
| Session 5 | Shared integration, gallery, accessibility fixes, dependency/lockfile updates and affected case paths after owners release them | Recheck sources; test and visually polish all five affected cases and home/work/next-case navigation. |

New entries export `project` and `caseStudy` from their own module. New dedicated pages export a default component. The shared registry and lazy route resolver discover those exact files; Sessions 1, 3 and 4 should not edit shared route/data files. Do not publish an entry until its corresponding page is usable. Shared package/lockfile changes (e.g. TripVerse source font/icon dependencies) require a short exclusive integration claim before editing/installing.

### Laptop mockup rule — mandatory

Laptop mockups render **only in the Footer's “next case / read next case / next project” preview**, and must depict the destination project. Never use them in homepage/work catalogue hover images, case hero, body, galleries or film posters. Use `project.nextCaseImage` for that explicit footer image; `project.images` contains authentic UI/art for normal previews. The supplied new mockups are:

- Walkthru: `apps/web/src/assets/Walktru/mockups/walkthru-laptop-v1.png`
- TripVerse: `apps/web/src/assets/Tripverse/mockups/tripverse-laptop-v1.png`
- Shiori: `apps/web/src/assets/Shiori (栞)/mockups/shiori-laptop-v1.png`

Existing projects keep their verified destination-specific footer mockups. Never borrow a laptop from a different product. Source screenshots and non-device artwork lead the case pages.

## Progress and handoffs

**Current active Codex code claims:** None. Sessions 2 and 3 are complete and released. Session 4 can be assigned independently using its owned files. Session 5 still waits for all four implementation sessions. Historical entries below record resolved intermediate issues as well as handoffs; the newest completion entry takes precedence.

### 2026-10-03 — Codex, GitHub push authorized

- Rohit explicitly requested committing/pushing the completed project work. This authorization supersedes the automatic-commit prohibition for this push only; it does not authorize implementation of another session.
- Publish the completed Walkthru + TripVerse pages, their imported media, original journal bundle, registry/routes/home selection/gallery/shared controls and coordination/evidence. Leave unrelated local design-version edits, additive Neuron/YapChat changes and unused supplied source assets uncommitted. Shared Footer/Gallery are staged without their local variant hooks; local files remain intact.
- Validated an isolated copy of the exact staged tree: TypeScript, registry Vitest and production Vite build pass. Credential-pattern check passes. The inherited main chunk warning remains. GitHub origin/main matched local base before commit; push is normal, never forced.

### 2026-10-03 — Codex, Session 3 DONE (all claims released)

- Built TripVerse's eleven-chapter dedicated case, with authentic Studio/planning/budget/mobile/export captures, actual LangGraph architecture, supplied campaign artwork and scroll parallax. Reused portfolio primitives, CaseFlow, FeatureShowcase, AccordionGallery, magnetic actions and Footer.
- Transplanted both original eight-chapter journals with original content/styles/photographs/fonts/icon runtime. Source-copy verification passed; no dependency or lockfile edits. See the scoped component and asset READMEs/manifest for adaptation and provenance.
- Existing registry automatically activates homepage Walkthru → TripVerse → Skyguide AI → Neuron. Gallery retains its motion and gains eight visuals each from Walkthru and TripVerse: 93 unique entries / six projects. No new laptop outside the destination Footer preview. Shared showcase Enter/Space support restored.
- TypeScript, registry test and production build pass. Browser verified original source visual metrics, both independent journal controls/turns, mobile single-page mode and pointer swipe, Studio keyboard selection, responsive widths 320–1440px without overflow, selected order/gallery DOM and actual home → TripVerse navigation. Screenshots/check details in `output/session-3/README.md`.
- Final preview connection was intermittent: homepage reel screenshot and repeated Walkthru → TripVerse Footer traversal remain explicit Session 5 checks. Do not claim those final traversals or comprehensive end-to-end testing passed. Existing main chunk warning, full variant sweep, OS reduced motion, axe/Web Vitals/native touch and legacy laptop-placement audit also remain final-session work.
- Portfolio preview is `http://127.0.0.1:5180/work/tripverse`; port 5173 currently serves the source TripVerse app. Preserved all other dirty work. No install, commit, push, branch switch or deployment. All Session 3 and exclusive gallery/showcase claims released.

### 2026-10-02 — Codex, Session 3 claimed

- Rohit authorized TripVerse's complete detailed case, Walkthru + TripVerse Selected Work registration and both projects' authentic assets in the homepage flowing gallery.
- Reuse the existing registry/selected order and gallery renderer. Copy the original journal bundle, media and fonts with isolated environment/import bridges only. Laptop imagery stays exclusive to destination Footer previews.
- Preserve Claude Code's additive Neuron/YapChat changes and PageTurnGallery. Do not restart or alter Session 1.

### 2026-10-02 16:40 IST — Codex, image parallax follow-up DONE

- Added scoped scrubbed scroll transforms to 17 screenshot/portrait layers and the artwork accordion; retained blue-collage parallax with edge coverage. Full screenshots and captions travel together without cropping; reveal and accordion transforms retain independent ownership.
- Mobile drift is smaller (14px versus 32px each direction). Reduced-motion guard and scoped CSS leave imagery static and visible. No content, routes, shared components or layout spacing changed.
- TypeScript and production build pass (inherited entry-size warning). Browser confirms transform progression on scroll, all 22 images present, zero broken images, no horizontal overflow at 375/1280/1440px, working artwork ArrowRight selection and no console warnings/errors in the focused check. OS reduced-motion emulation remains Session 5 as previously recorded. Released all claims.

### 2026-10-02 — Codex, Session 2 reopened for image parallax

- Rohit requested scroll parallax on the approved Walkthru imagery, keeping everything else unchanged.
- Claim only the two Walkthru page files and session evidence. Reuse scoped GSAP/ScrollTrigger; preserve full screenshot framing, captions, gallery hover and reduced-motion behavior.

### 2026-10-02 — Codex, Session 2 claimed

- Rohit authorized Session 2 and requested this concurrency protocol and footer-only laptop rule.
- Session 2 does not depend on Session 1 completing first; reuse existing working primitives directly.
- Shared registration/route/footer integration is temporarily claimed by Codex; project-specific sessions will use isolated entry/page files afterward.
- Current phase: coordination documents, then Walkthru implementation and focused build/browser checks.

### 2026-10-02 16:10 IST — Codex, Session 2 implementation milestone

- Shared registration works: `projectEntries/*.ts` exports `project` + `caseStudy`; catalogue overrides merge by slug and required order. Four original home rows remain until Walkthru + TripVerse are both ready, then the requested selected order activates automatically.
- Dedicated new-page files need a **default export**, with exact names `WalkthruProjectPage.tsx`, `TripverseProjectPage.tsx`, `ShioriProjectPage.tsx`; route discovery code-splits them. Existing aliases/cases remain on the legacy resolver.
- Walkthru: ten chapters, 22 authentic UI/editorial images, original 30s click-play film, architecture and original magnetic/accordion/footer interactions. Six campaign WebPs total ~750KB; originals preserved. No placeholder extension/hero screenshots used, no laptop in normal previews or page body.
- Existing mockups now have explicit `nextCaseImage` in base records, retained when Session 1 overrides normal `images`. Claude Code need not edit its entry files for this.
- Passed TypeScript, registry test (ordering, gated home selection, override deduplication, next-case wrap), production Vite build. Browser desktop shows correct Walkthru body and next Skyguide case; mobile visual/interaction checks underway.
- Session 5 handoff: inherited Preloader's scoped `gsap.from("main")` cannot find sibling main (GSAP warning; no runtime error). Shared Footer currently hides its preview at ≤640px, as existing design; review against Rohit's always-render intent. Existing app entry chunk >500KB warning remains; Walkthru is a separate ~20KB JS chunk.
- Codex still holds shared integration claims until Session 2's final checks finish; Session 1 ownership remains Claude Code's.

### 2026-10-02 — Codex, focused shared polish claim

- Temporarily claim `sections/Footer/Footer.css` for contain-fit destination mockups and a visible mobile next-case preview, preserving the existing desktop hover/curve design.
- Temporarily claim `components/motion/Preloader.tsx` for the observed sibling-main selector warning; a guarded DOM element replaces the incorrectly scoped string selector. No animation timing or DOM redesign.
- Walkthru mobile accordion collapse is fixed in its owned CSS. All four art panels retain their natural ratios at 375px; keyboard ArrowRight selects the next artwork.

### 2026-10-02 — Codex, final integration correction

- Session 1 is DONE and its claims released. Claim `data/projectEntries/neuron.ts` and `data/projectEntries/yapchat.ts` only to remove screenshot `nextCaseImage` overrides: Rohit's explicit laptop-only footer instruction takes precedence. Their normal current-UI previews stay intact; base records retain the original verified Neuron/YapChat laptops. These small integration claims release with Session 2.
- Reuse Session 1's now-available `CaseFlow` component inside Walkthru's architecture chapter instead of maintaining a separate diagram layout. No edits to `CaseFlow` or Session 1 page files.

### 2026-10-02 16:27 IST — Codex, Session 2 DONE (all claims released)

- Completed `pages/WalkthruProjectPage.tsx/.css`, `data/projectEntries/walkthru.ts`, six poster WebPs + provenance README under `assets/Walktru/portfolio/`, screenshots and QA under `output/session-2/`.
- Shared `projectRegistry.ts` + test, project/case entry discovery, `ProjectDetailRoute.tsx` + route wiring, explicit existing `nextCaseImage` fields, Footer resolver/contain-fit/mobile preview, and guarded Preloader main target are complete and released. Preserve surrounding user edits. Small corrections to the released Neuron/YapChat entry files remove screenshot footer overrides; base laptops are retained. Claude Code's updated current-UI previews and case pages are untouched.
- Ten Walkthru chapters, 22 fully decoded images, working native 30s film, full-size image links, original magnetic/reveal/accordion/footer patterns. Reuses Session 1 CaseFlow; no duplicate diagram component.
- Passed final TypeScript, focused Vitest registry check, production build and changed-file whitespace checks. Browser: 320/375/768/1024/1440 widths; both portfolio variants; poster keyboard selection; mobile natural-ratio artwork; correct incoming Forcaster → Walkthru laptop/link; catalogue navigation; video play (30s, readyState 4, time advanced) / pause. No new runtime errors or broken Walkthru images; Preloader warnings resolved on clean reload.
- Earlier Session 2 handoff about mobile Footer hiding / Preloader warnings is **resolved**. Entry bundle >500KB warning remains (~590KB raw / 190KB gzip); Walkthru is lazy split (~20KB raw / 7.5KB gzip). No measured Web Vitals, full axe audit, OS reduced-motion emulation or native touch-hardware claim. Those and legacy laptop-placement audit remain Session 5.
- Read `output/session-2/README.md` for exact check/evidence details. Local preview left available at `http://127.0.0.1:5173/work/walkthru`; preserve an active shared preview. No install, lockfile change, commit, push, branch switch or deployment by Codex.
- **Next owner instructions:** add only your owned entry and default-exported page; central registration/order/routes are already working. Reuse CaseFlow and existing controls. Both new products' laptop assets must appear exclusively as destination `nextCaseImage`. Source transfer requirements for TripVerse/Shiori remain unchanged.

### 2026-10-02 — Claude Code, scoped Neuron/YapChat additions (Rohit's direct request)

- Scope is additive only, not the full Session 1 plan: (1) append ONE new section of current Pulse screens to `pages/NeuronProjectPage.tsx`; (2) in `pages/YapChatProjectPage.tsx` replace only the old `Preview1.jpg` mockup image in section 07 with a page-turn gallery of the current Pick Up screens. No other existing section is changed or removed.
- Claimed: `pages/NeuronProjectPage.tsx`, `pages/YapChatProjectPage.tsx`, new `components/PageTurnGallery/`. Will release when done.
- Done, claims released. Neuron: new section `08 — THE CURRENT INTERFACE` appended after `07 — THE POINT` (six current Pulse screens in the existing `dw-media-grid-2col`); no existing section changed. YapChat: the old `Preview1.jpg` mockup in section 07 is replaced by `<PageTurnGallery>` with the ten current Pick Up screens; nothing else changed. New reusable component `components/PageTurnGallery` (props `items: {src, alt, caption?}[]`, `label`): CSS-transition page turn over the left edge, Prev/Next, arrow keys, tap halves, swipe; instant under reduced motion. Typecheck clean; no console errors.

### 2026-10-03 — Claude Code, Session 4 claimed (push authorized)

- Rohit authorized Session 4 (Shiori) and a GitHub push of it. Required original sections, copied from `Shiori (栞)/site`: cast field (`A cast that fills the frame.`), manga wall (`And the black-and-white pages.`), tilted gallery wall. Card thumbnails: one laptop mockup + two plain art visuals.
- Exclusive paths: `pages/ShioriProjectPage.{tsx,css}`, `data/projectEntries/shiori.ts`, `components/shiori/`, `assets/Shiori (栞)/portfolio/` (and the supplied Shiori asset files it imports), `public/shiori/` if needed. Shared Gallery untouched unless separately claimed. Will push only Session 4 files, normal push.

### 2026-10-03 — Claude Code, Session 4 DONE (claims released, pushed)

- Built `/work/shiori` (`pages/ShioriProjectPage.{tsx,css}`, `data/projectEntries/shiori.ts`): existing case grammar only (hero, GitHub pill + circular Live site, 3-col meta, full-bleed art bands, aligned 2-col screen grids, split chapter, CaseFlow, decisions, conclusion). Images get only the standard scroll parallax. Live link is the hosted website; a note says the app runs locally. Seanime (5rahim, GPL-3.0) credited.
- Transplanted the three required original sections from `Shiori (栞)/site` into `components/shiori/`: cast field, manga wall (`.ink`), tilted gallery wall (`.wall3d`). Same markup/copy, selection code (13 cut-outs a051…a108, 24 manga pages, seed-11 32-piece wall), CSS (selectors prefixed `.shiori-original`) and motion values. `gallery-data.js` byte-identical. Bridge: resolver `/shiori/g/`, gallery links to the hosted gallery, fonts/Phosphor links added once, full cleanup on unmount. Details in `components/shiori/README.md`. 69 source images in `public/shiori/g/`.
- Thumbnails per Rohit: `images = [laptop, pig, tiger]` (laptop mockup + two plain brand visuals, WebP derivatives in `assets/Shiori (栞)/portfolio/thumbs/`), `nextCaseImage = laptop`. This intentionally overrides the earlier "laptop only in footers" rule for Shiori, at Rohit's explicit request.
- Checks: TypeScript clean; registry test and production build pass on an isolated export of exactly the committed tree. Browser at 1280px: cast/manga/wall match Rohit's three live-site references; remount keeps 13 figures / 4 columns / 32 tiles; 375px no overflow; Neuron footer → Shiori (laptop), Shiori footer → YapChat; `/work` lists all seven in plan order; no console errors.
- Committed only Session 4 files (plus this entry's board row and the Shiori CHANGELOG entry); all other local work, including Claude Code's uncommitted Neuron/YapChat additions and Codex's uncommitted follow-ups, left untouched. Normal push to origin/main.
