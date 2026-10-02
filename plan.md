# Portfolio work expansion and refresh — implementation plan

Prepared: 2 October 2026 · Updated: 3 October 2026 for concurrent Codex / Claude Code implementation · **Sessions 2 and 3 complete; other sessions tracked in SESSION_MEMORY.md.**

This is the single handoff document for **five sessions: four implementation sessions and one final end-to-end verification/fix session**. Build only the session Rohit explicitly authorizes, then stop with a reviewable result and update that session's status in this file. “Build session one” authorizes Session 1 only. Do not automatically continue into later sessions or deploy the portfolio.

## 1. Requested outcome and session boundaries

Refresh the entire Neuron and YapChat detailed work experiences around their current interfaces. Add rich, dedicated work pages for Walkthru, TripVerse and Shiori, using the portfolio's existing layout, typography, controls and motion. Let each product's personality emerge through its authentic screenshots, supplied artwork, media composition and narrative.

| Session | Scope | Reviewable outcome | Status |
|---|---|---|---|
| 1 | Refresh Neuron and YapChat in their own page/entry files | Two complete refreshed cases, current old-project previews, working existing navigation | Unclaimed; awaits assignment |
| 2 | Build and register Walkthru only | One complete dedicated browser-agent case study | **DONE** (Codex, 2026-10-02), including requested image scroll parallax follow-up; focused checks pass; claims released; see SESSION_MEMORY.md |
| 3 | Build and register TripVerse, including both original interactive journals; apply homepage selection; add Walkthru/TripVerse assets to home gallery | One complete travel-agent case study with functioning Memory Stack and Field Journal; requested four homepage entries and mixed visual reel | **DONE** (Codex, 2026-10-03); claims released; focused checks and explicit final-session handoff in output/session-3/README.md and SESSION_MEMORY.md |
| 4 | Build and register Shiori, including its original character stage and gallery wall | One complete local-app case study with authentic interactive art sections; all seven cases registered | Planned; awaits explicit authorization |
| 5 | Recheck sources, test end to end, visually inspect every affected experience and fix remaining details | Verified navigation, fidelity, mobile layouts, interactions, media and production build; final polish completed | Planned; awaits explicit authorization |

Each new project gets its own dedicated implementation session. Sessions 1–4 include the checks needed to leave their own changes usable; **Session 5 is a separate, comprehensive testing, visualization and correction pass across the complete portfolio**. The research described below is already complete and is not another implementation session.

### Concurrent session ownership — supersedes older shared-file task lists

Read [SESSION_MEMORY.md](./SESSION_MEMORY.md) before every session. It records claims, owners, progress, exact editable paths, shared integration leases and handoffs. Tick the assigned session and mark IN_PROGRESS **before** editing. Mark DONE after focused checks and release code claims. Sessions 1–4 may run concurrently once the short shared registration setup is complete; Session 2 does not wait for Session 1.

Each project owns its dedicated TSX/CSS, scoped assets and `data/projectEntries/<slug>.ts` exporting `project` and `caseStudy`. New pages export a default component. Codex's Session 2 makes the minimal shared registry/lazy route/footer integration once; afterward `projects.ts`, `caseStudies.ts`, `routes.tsx`, shared Footer/CSS/components and package/lockfiles are frozen for other concurrent sessions unless an exclusive shared-file claim is recorded. New entries are automatically discovered; publish an entry only when its page works. Session 1 uses `neuron.ts` and `yapchat.ts` overrides, Session 3 `tripverse.ts`, Session 4 `shiori.ts`. Session 5 owns final shared gallery/accessibility/integration polish. Avoid broad extraction of existing page primitives during concurrent work; reuse them directly.

**Mandatory laptop rule:** use destination-specific laptop mockups exclusively in the Footer's next-case preview via `project.nextCaseImage`. No laptop mockups in home/work previews, page hero/body, gallery or video poster. `project.images` uses genuine screenshots and non-device artwork. This overrides every older cover/hero suggestion below, including laptop-containing TripVerse compositions. Never substitute another project's laptop.

### Final project order

**Homepage Selected Work, exactly four rows:**

1. Walkthru — browser-based AI testing agent.
2. TripVerse — agentic travel planning and TripStudio.
3. Skyguide AI — existing case, retained.
4. Neuron — refreshed case.

**Full `/work` catalogue and next-case sequence:** Walkthru → TripVerse → Skyguide AI → Neuron → Shiori → YapChat → Forcaster → Walkthru.

The first four positions are required by the request. The trailing order is a proposed editorial choice; it retains YapChat and Forcaster and places Shiori immediately after the selected four. Shiori and YapChat remain discoverable through `/work`, their direct case URLs, the next-case sequence and appropriate media previews.

Use the project's verified brand spelling **Walkthru** in displayed copy and canonical slug `walkthru`. The user also calls it Walkthrough; this is the same project, not a second entry. Use **TripVerse**, **YapChat**, and **Shiori (栞)** in editorial copy. Preserve existing slugs `skyguide-ai`, `neuron`, `yapchat`, `forcaster`.

## 2. Source register and research findings

### Local locations

| Key | Absolute location | Purpose |
|---|---|---|
| P | `C:\Users\Rohit Maity\Desktop\coding\Webdev\project\portfolio` | Portfolio implementation and this plan |
| A | `P\apps\web\src\assets` | All supplied portfolio media |
| T | `C:\Users\Rohit Maity\Desktop\coding\Webdev\project\TripVerse` | TripVerse source, docs and additional actual guide screenshots |
| W | `C:\Users\Rohit Maity\Desktop\coding\Webdev\project\trustdraft` | Walkthru source; user supplied `W\docs` |
| S | `C:\Users\Rohit Maity\Desktop\coding\Webdev\project\Shiori (栞)` | Shiori docs, marketing source and current screenshots |
| N | `C:\Users\Rohit Maity\Desktop\coding\Webdev\project\Multi-Modal-Search-Engine-main` | Additional local Neuron source/README found during research |
| Y | `C:\Users\Rohit Maity\Desktop\coding\Webdev\project\chat_app` | Additional local YapChat source and current design documentation |

Prefixes in this document expand to these absolute locations. External project folders are research inputs; implementation writes belong inside P. Copy additional verified assets into A when the corresponding session is authorized; do not edit the other applications.

### Project links and honest action labels

| Project | Repository | Public destination | Portfolio action |
|---|---|---|---|
| Walkthru | [watermelon588/Walkthru](https://github.com/watermelon588/Walkthru) | Not deployed | GitHub; plain “Deployment pending” context, no fake live button |
| TripVerse | [watermelon588/Tripverse](https://github.com/watermelon588/Tripverse) | [TripVerse live](https://tripverse-0.vercel.app/) · [application guide](https://tripverse-0.vercel.app/guide) | GitHub + Visit live |
| Shiori | [watermelon588/Shiori-](https://github.com/watermelon588/Shiori-) | [Shiori website](https://shiori-dusky.vercel.app/) · [installation/product docs](https://shiori-dusky.vercel.app/docs.html) | GitHub + Visit website; explain that the app runs locally |
| Neuron | [watermelon588/Neuron](https://github.com/watermelon588/Neuron) | No permanent hosted destination supplied | GitHub; no temporary tunnel link |
| YapChat | [watermelon588/Yap-Chat](https://github.com/watermelon588/Yap-Chat) | [YapChat live](https://yap-chat-five.vercel.app/) | GitHub + Visit live |

Preserve existing URLs in `P\apps\web\src\data\links.ts`. Concurrent sessions keep new/updated project URLs in their owned `data/projectEntries/<slug>.ts` case-study record, so agents do not compete over central link/data files. Preserve existing Skyguide AI and Forcaster destinations.

### Evidence consulted

| Project | Sources to re-read when implementing | What they establish |
|---|---|---|
| Portfolio | `apps/web/src/data/{projects,caseStudies,links,gallery}.ts`; `routes.tsx`; existing case TSX/CSS; actual token/base/v2 CSS; `docs/ins/SkyGuide_AI_Detailed_Work_Design_Consistency_Instructions.md`; `SkyGuide_AI_Detailed_Work_Section_Workflow.md`; `SkyGuide_Detailed_Work_Storytelling_Modification.md`; `docs/ins/neuron_instruction.md`; `docs/yap_chat_project_page_instruction.md` | Existing editorial page grammar and reusable interaction patterns |
| Walkthru | `W\README.md` (positioning, report questions, system breakdown); `CURRENT_STATE.md` dated Oct 2; `ARCHITECTURE.md` agent graphs/runtime modes; `apps/api/app/agent/persona.py:242`; `agent/report.py:471`; `docs/citation-measurement.md`; `docs/checkpoints-and-request-logs.md`; `apps/web/src/pages/Landing.tsx:53`; `apps/web/src/content.ts:47` | MV3 browser loop, LangGraph/report architecture, current delivery status, source imagery and limits |
| Walkthru media | `A\Walktru\README.md`; `design/launch-video-30s/{README.md,asset-provenance.json,video-metadata.json,final-qa.json}`; `design/launch-videos/README.md`; `design/doodle-exploration/DIRECTION.md` | Real captures versus placeholders, actual rendered films, concept-only images |
| TripVerse | Current public/local `README.md:44,79,100,120`; live guide; `T\frontend\src\pages\GuidePage.tsx:4,127,271,326,386`; `backend/app/agents/trip_planner/graph.py:29,52`; `copilot/graph.py:385`; `frontend/src/components/home/v2/content.ts:14` | Two planning modes, immediate edits/receipts, shared trip document, actual studio/export features, architecture and photography |
| TripVerse media | `A\Tripverse\media\mmm\tripverse-design-pack\mockups\{README.md,manifest.json,screen-provenance.json}`; `T\docs\CURRENT_STATE.md` Oct 1 artwork entry | Ten completed compositions using actual UI pixels; source/crop provenance |
| Neuron | [current raw README](https://raw.githubusercontent.com/watermelon588/Neuron/main/README.md); matching `N\README.md:22–89,130–157`; `A\Neuron\docs\DEVLOG.md` sections 1, 3, 6 | Pulse redesign, retrieval/RAG architecture, lazy ML/fallbacks, sample-data screenshot provenance, local sharing status |
| YapChat | [current raw README](https://raw.githubusercontent.com/watermelon588/Yap-Chat/main/README.md); `Y\README.md` Preview/Interface/How it works/Known limitations; `Y\DESIGN.md` sections 1–6; `client/src/index.css` | Pick Up paper/ink redesign, room/media/call capabilities and realistic WebRTC constraints |
| Shiori | Public/local README; `S\docs\shiori\01-REPO-MAP.md`; `02-BACKEND-ARCHITECTURE.md`; `03-FRONTEND-ARCHITECTURE.md`; `08-PROVIDERS.md`; `09-DESIGN-DIRECTION.md`; `12-SECURITY.md`; `14-DESKTOP.md`; `15-MOBILE.md`; `S\HANDOFF.md`; live docs | Seanime fork attribution, actual Go app boundaries, current navigation/design, provider integration, Windows setup and mobile scope |

Line references describe the researched checkout and may move. Find the named symbol/section before copying. Read the current implementation and latest handoff alongside historical documentation.

### What was actually verified in this planning session

- Read portfolio registration, routing, shared CSS, components, animation code, design instructions and package scripts.
- Inspected the existing local Neuron case in the browser at `http://127.0.0.1:5173/work/neuron`: large Satoshi heading, neutral editorial canvas, magnetic repository pill, spacious chapters, square product media and next-case footer. No application source was changed to do this.
- Read current public TripVerse and Walkthru GitHub READMEs in the browser; inspected TripVerse's deployed homepage and Sep 30 annotated guide.
- Inspected deployed YapChat and Shiori public homepages in the browser. Current YapChat uses the blue hanging handset and cream/cobalt/lime paper-collage interface. Shiori's hosted page explicitly describes its separate local app and Windows onboarding.
- Compared supplied old/new screenshots; inspected selected real product captures, TripVerse compositions and source-screen provenance, Shiori themes/art and problematic blank/loading captures.
- Inspected Walkthru's 30-second filmstrip and a Shiori film frame. FFprobe confirmed Walkthru 30s/60s and Shiori 20s exports at 1920×1080.
- During final review, three newly added laptop mockups were found in the shared workspace and visually inspected. Their provenance notes and exact paths are registered below; this planning work did not generate them.
- No authenticated live planning, real messages/calls, app installation, provider playback, payments or deployment acceptance tests were performed. Public presentation/source verification must not be written as operational certification.

### Important corrections the copy must preserve

1. **TripVerse is already publicly visible.** Older “Go live next” and future-copilot notes are stale. Current guide/code confirm one-shot and day-by-day planning. Direct edit requests apply immediately with receipts; only offered advice changes wait for “yes,” and avoid-rule conflicts wait for “Add anyway.” Costs are estimates, not bookable quotes.
2. **Walkthru is not deployed.** Source capabilities and test/demo screens are available; deployment/payment/production acceptance remains pending. Its screenshots include sample scores/entitlements, not customer outcomes.
3. **Neuron now uses Pulse.** Graphite/orange UI replaces earlier screens. Source-linked answers are a capability; “100% cited answers” is an unsupported impact metric. Some supplied screens use sample data.
4. **YapChat now uses Pick Up.** Cached GitHub glassmorphism copy is outdated. Remove unsupported typing-indicator claims unless current code establishes them. Room privacy is access/membership control; messages are not described as end-to-end encrypted.
5. **Shiori is a Seanime-based anime/manga hub.** Credit [Seanime by 5rahim](https://github.com/5rahim/seanime), GPL-3.0. The actual app is a local Go fork; the public project's Node companion skeleton is unconnected. Do not describe it as the operating backend or imply that the Vercel website streams the local library.
6. Shiori's abandoned Telegram/AI companion visions and mobile web-push/offline-library promises are not shipped features. Present the real tray/password/shortcut/PWA work without claiming an accepted, code-signed production release.

## 3. Design and reuse contract

### Visual rules

The existing portfolio is the design authority. The redesign skill's generic suggestions to swap fonts, recolor surfaces or add effects are subordinate to the user's requirement to match this portfolio.

| Element | Existing contract to preserve |
|---|---|
| Typeface | Satoshi from `styles/base.css:1–19`; portfolio body/display hierarchy stays intact |
| Canvas | Default `--bg: #F4F4F4`, white surface, black ink, muted gray; `--accent: #0049cd` for existing actions |
| Current alternate variant | Preserve `html[data-variant="v2"]` and its `#F6F6F6` canvas; do not remove or select the user's variant toggle as part of this work |
| Hero | `ProjectPage.css:188`: uppercase, `clamp(3.8rem,10vw,10.5rem)`, weight 500, line-height .92, tracking -.04em |
| Section heading | `ProjectPage.css:207`: `clamp(2.5rem,5.5vw,5.5rem)`, weight 500, line-height 1.05 |
| Paragraphs | `ProjectPage.css:228`: existing responsive 1.05–1.35rem scale, line-height 1.6, approximately 58ch |
| Gutters and rhythm | Case gutter `clamp(3rem,7.5vw,9.5rem)`; chapter padding `clamp(5rem,12vh,10rem)`; use existing responsive reflows |
| Media shape | `.dw-case-study` deliberately uses square edges for media/cards; existing circular/pill actions remain exceptions |
| Product color/type | Visible in authentic screenshots/artwork, small diagram accents and existing project preview mattes; do not replace portfolio page chrome with each product's design system |
| Framing | `contain`/natural ratios for complete UI and art; `cover` only for intentional atmospheric crops; preserve tall phone screens |
| Motion | Existing GSAP `useGSAP`/ScrollTrigger, magnetic controls, global Lenis/transition. Reuse durations/eases and reduced-motion/touch gates |

**Explicit source-section exception, requested in the follow-up:** TripVerse's Memory Stack and Field Journal, plus Shiori's character gallery and art wall, retain their original product typography, colors, rounded/book surfaces, layout, copy and interaction timing. The neutral Satoshi/square-media contract still applies to the surrounding portfolio case study and navigation. Do not restyle the copied sections to match `dw-*`, replace them with portfolio accordions/carousels, or turn them into screenshots. Scope their source styles so neither side alters the other. Source motion constants are retained inside these copied sections; the global portfolio scroll/route infrastructure remains shared.

Creative scope: compose wide product reveals, offset paired images, close-up evidence strips, portrait phone companions, architectural editorial diagrams and a reflective image-led ending. Give each chapter a clear visual purpose. Avoid repetitive feature-card walls, unreadable screenshot thumbnails, arbitrary new fonts, standalone product landing-page shells or unrelated effects.

Suggested media rhythm per new case: opening product image → concise motivation → authentic workflow screens → large artwork breathing space → focused feature/evidence chapters → compact architecture/decisions → responsive/brand gallery → reflective ending → native next-case footer. Aim for roughly 12–18 meaningful images per new page, adjusted to readability and available evidence; count is a curation guide, not a quota. Several screenshots may sit in an existing interactive showcase without extending the page indefinitely.

### Reuse map — consult before adding JSX or CSS

Paths below are under `P\apps\web\src`.

| Need | Existing implementation | Planned use |
|---|---|---|
| Global layout/scroll/transition | `RootLayout.tsx:11`; `components/motion/SmoothScroll.tsx:13`; `PageTransition.tsx:30,46` | Keep one shared scroll pipeline and route curtain |
| Header/preloader/footer | `components/nav/Navbar.tsx`; `components/motion/Preloader.tsx`; `sections/Footer/Footer.tsx:45,122–157` | Render existing chrome; preserve locally edited footer and next-case hover preview |
| Repository/live actions | `pages/NeuronProjectPage.tsx:324`; `YapChatProjectPage.tsx:322`; `sections/Footer/Footer.css:450–582` | Borrow exact `footer-pill magnetic` / `footer-round magnetic` markup and styles |
| Magnetic behavior | `components/motion/useMagnetic.ts:12` | Reuse hook and data-strength classes; only one hook mount per page root |
| Home selected rows | `sections/Work/Work.tsx:28`; `components/motion/HoverRevealList/HoverRevealList.tsx:12,24` | Change data list; preserve hover preview, image strip, touch fallback and effects |
| Full work index | `pages/Work.tsx:17,29`; `components/vendor/reactbits/FlowingMenu/FlowingMenu.tsx` | Register ordered data; preserve existing flowing interaction |
| Screen/feature carousel | `components/FeatureShowcase/FeatureShowcase.tsx:5,19` | Supply `ShowcaseItem` arrays with actual screenshots and source-backed captions |
| Optional art/image accordion | `components/motion/AccordionGallery.tsx:6,13,43` | Reuse only where a curated gallery benefits from it, square radius and existing touch/keyboard behavior |
| Text reveal | `components/vendor/reactbits/ScrollReveal/ScrollReveal.tsx`; `sections/Work/Work.tsx:15` | Existing textual reveal where already appropriate |
| Metadata strip | `pages/ProjectPage.css:8–60`; `NeuronProjectPage.tsx:360` | Same Role / Architecture / Year arrangement |
| Image vocabulary | `ProjectPage.css:312–352,479–549` | Reuse landscape, natural, portrait-full and paired/split compositions |
| Architecture/decisions | `ProjectPage.css:650–687,724–761` | Use existing editorial cards/decision rows; small semantic HTML/SVG diagram if helpful |
| Closing editorial section | `ProjectPage.css:808–820` | Keep the portfolio's conclusion and next-work cadence |
| Choreography | `pages/ProjectPage.tsx:224–312`; `YapChatProjectPage.tsx:164–288` | Borrow scoped reveal/parallax patterns and cleanup; no independent animation engine |

Allowed existing APIs: `useGSAP` from `@gsap/react`; `gsap`/`ScrollTrigger`; `useMagnetic(root, dependencies)`; `<FeatureShowcase items={...} />`; existing AccordionGallery props/types; existing Footer next-project props; current React Router route elements. Read their actual definitions before using them. A `MotionProvider` appears in old planning docs but does not exist in current source; do not invent a dependency on it.

**Ponytail approach:** reuse the existing component first; use native browser/CSS capabilities next; use an installed dependency before considering a new one. The local skill was found at `C:\Users\Rohit Maity\.claude\plugins\marketplaces\ponytail\skills\ponytail\SKILL.md` and read. Preserve quality/accessibility; minimal code does not mean minimal page content.

The existing case pages duplicate page headers, arrow icons, metadata and animation glue. Reuse their existing classes, hooks and components directly. Any necessary shared extraction needs an exclusive file claim and must preserve DOM/classes/behavior. Do not introduce a generic page-builder schema, CMS, new design system or full rewrite. Dedicated page files own their product narrative/composition.

Graphify's skill was consulted. There is no `graphify-out/graph.json` and no installed Graphify runtime in this workspace. Direct source/reference mapping supplied the evidence above; no installation or graph generation is necessary to finish this planning task. Do not claim a generated graph exists. Reconsider only if a later explicitly requested architecture task needs it.

## 4. Asset catalogue and placement decisions

Use explicit, curated imports. The supplied libraries contain duplicate exports, mock sources, video reference files, fonts, audio and development manifests. Review these as inputs; do not bundle every file. Preserve originals, choose one canonical export for each visual and optimize derived delivery images during the relevant session.

### Neuron — current screens and retained mood media

Base: `A\Neuron\docs\media\`.

| File | Placement/story | Evidence treatment |
|---|---|---|
| `screens/01-home.jpg` | Primary current product reveal; unified input and Pulse identity | 1440×900 UI demonstration |
| `screens/02-search.jpg` | Ranked results, result categories and signal explanation | Core search chapter |
| `screens/03-image-detail.jpg` | Detail drawer, metadata and provenance | Sample fixture has frog query/portrait/example.org; never use as relevance-quality proof; omit from leading story if confusing |
| `screens/04-documents.jpg` | Upload/selection/indexing/failure states | Document ingestion chapter |
| `screens/05-document-chat.jpg` | Three-pane conversation, answer and source navigation | Lead document-chat showcase |
| `screens/06-profile.jpg` | History/saved/account surfaces | Supporting screen gallery |
| `screens/07-mobile-nav.jpg` | Phone navigation and density changes | Tall mobile companion, natural ratio |
| `banner.jpg`, `logo-lockup-dark.png`, `logo-lockup-light.png` | Brand opener/closer if composition benefits | Supporting branding, not interface proof |

Retain selected high-quality `A\Neuron\gallery` and `visual` photography/abstract images where the existing story uses atmosphere. Old numbered screenshots/mockups are replaced as current UI evidence. Existing stock MP4s remain optional mood material only; prefer stills when their transfer cost adds little to the revised story.

### YapChat — current interface

Base: `A\Yap chat\screenshots\`.

| File | Planned placement |
|---|---|
| `landing.jpg` | Hero/first wide frame; blue handset, new paper-collage identity |
| `chat.jpg` | Flagship three-column room; people/presence, mixed-media conversation, profile/media |
| `login.jpg` | Identity and entry flow |
| `profile.jpg` | Avatar/name/bio and personal context |
| `incoming-call.jpg` | Transition from conversation to ring decision |
| `video-call.jpg` | Camera-off four-person grid and actual call controls; explain supported eight-person limit separately |
| `mobile-landing.jpg` | Optional phone marketing companion |
| `mobile-chat.jpg`, `mobile-call.jpg` | Primary responsive paired/triptych composition |
| `terms.jpg` | Supporting transparency gallery, if relevant; not a hero |

Keep attractive supplied lifestyle art in `A\Yap chat\assets\gallery` and `assets\visual` as emotional accents. Correct alt text currently presenting stock people photographs as application screenshots. Old purple-gradient app mockups must not remain in functional explanations or work previews.

### Walkthru — verified product, evidence and brand

Base: `A\Walktru\` (retain this existing physical folder spelling).

| File/group | Planned use |
|---|---|
| `hero-dashboard.webp` | Lead real dashboard, 2160×1275; opening and selected-work preview |
| `report.png`, `stuck-closeup.png` | Launch report and evidence close-up; scores are demo content |
| `seo.png`, `security.png` | Paired deterministic checks; captions explain scope |
| `persona-owner.jpg`, `persona-phone.jpg`, `persona-buyer.jpg`, `persona-signup.jpg`, `persona-returning.jpg` | Five-perspective photo strip; human context rather than testimonials |
| `design/launch-videos/shared/img/stills/sidepanel.jpg` | Genuine recording-derived extension still; replaces placeholder extension UI |
| Same stills directory: `fixes.jpg`, `ext-report.jpg`, `mcp-page.jpg`, `vscode.jpg`, `vscode-allow.jpg` | Evidence → fix handoff story; choose 2–4 useful frames, inspect account/credential regions before derived cropping |
| Same stills directory: `mcp-key.jpg` | Default omit; only use a derivative if key/account details are demonstrably masked |
| `agent-eye.jpg`, `reading.jpg`, `workspace.jpg` | App-native editorial photography, one or two larger breathing-space compositions |
| `design/doodle-posters/posters/the-second-look.png`, `signals-in-sight.png`, `scouts-second-look.png`, `the-outside-world.png` | Preferred wide brand spreads, 16:9 / 2:1 / 3:1 / 16:10 respectively |
| Other posters: `fresh-eyes-club.png`, `the-way-through.png`, `one-clear-view.png`, `real-people-energy.png`, `build-test-better.png`, `from-noise-to-next.png` | Curated supporting brand gallery; survey all ten, avoid redundant repeats |

**Reject as shipped UI evidence:** `hero-product.png`, `extension-panel.png` are explicitly still placeholders in the asset README. `design/doodle-exploration/mockup-01.png` through `mockup-13.png` are design explorations; any inclusion belongs in a clearly identified process chapter, never the main feature evidence.

**Video decision:** use the existing `design/launch-video-30s/walkthru-launch-30s.mp4` as an optional, user-played 30-second film, with `poster.jpg`; 1920×1080, H.264/AAC, approximately 13.0 MB. Original synthesized music and masked derived footage are documented. This is a brand/product film; the TripVerse interface visible in it is Walkthru testing another application.

Do not default to the three `design/launch-videos/walkthru-launch-{A-ship-friday,B-every-stranger,C-not-a-scanner}.mp4` films: they are 60 seconds and approximately 35.8/26.0/25.3 MB, and their own README records an undocumented external soundtrack license. Do not use reference films or raw InShot clips as the final case-study film.

### TripVerse — ten compositions, actual screens and destination imagery

Completed composition base: `A\Tripverse\media\mmm\tripverse-mockups\`.

| File | Ratio | Planned role |
|---|---|---|
| `01-planning-desk.png` | 16:9 | Laptop-containing composition: reserve for destination footer only; use real UI for the opening |
| `02-pocket-sketchbook.png` | 9:16 | Mobile story |
| `03-whole-route.png` | 3:2 | Map/route chapter |
| `04-build-together.png` | 4:5 | Day-by-day planning chapter |
| `05-sketch-meets-studio.png` | 2:1 | Wide sketchbook centerpiece |
| `06-budget-context.png` | 1:1 | Budget reasoning |
| `07-ask-change-keep-going.png` | 3:4 | Actual change/receipt story |
| `08-take-trip-with-you.png` | 4:3 | Exports and portability |
| `09-one-trip-four-views.png` | 16:10 | Unified TripStudio |
| `10-inspiration-to-plan.png` | 1:1 | Explore/inspiration or closing |

These are compositions containing real screenshot pixels, not synthesized interfaces. The parallel `tripverse-design-pack/mockups/{png,jpg}` folders duplicate finished outputs. Use a canonical set and appropriately sized derivatives; do not ship both original formats or embed source HTML into React.

Actual screen base: `A\Tripverse\media\mmm\tripverse-design-pack\mockups\screens\`.

- `01-welcome.png`: chat entry.
- `16-build-day-plan.png`: day-by-day dock and planning.
- `05b-change-receipt.png`: mutation receipt; use a readable detail alongside the whole interface.
- `06-studio-plan.png`, `07c-sketch-day.png`, `08-studio-map.png`, `09-studio-3d.png`: four-view product story.
- `13-budget-rows.png`, `19-build-budget-sync.png`: budget detail and synchronization.
- `10b-export-ready.png`: portable plan.
- `23-phone-sketch.png`, `23b-phone-chat.png`: phone pair.
- `24-explore.png`: discovery.

Existing detail crops record their source coordinates in the manifest. Use them intentionally rather than repeatedly cutting screenshots to arbitrary card ratios.

Additional verified source for later copying: `T\frontend\public\guide\`. Useful candidates: `00-home.png`, `02-brief-step-1.png`, `02b-brief-step-2.png`, `02c-brief-step-3.png`, `02d-guide-picker.png`, `03-planning-choice.png`, `04-one-shot-itinerary.png`, `05e-budget-from-chat.png`, `07-studio-sketch.png`, `10-export-menu.png`, `12-budget-suggestions.png`, `17b-build-move.png`, `18-build-add-anyway.png`, `20-build-live-sketch.png`, `21-build-live-sketch-done.png`, `22-build-complete.png`, `25-trips.png`. Copy only the subset needed to tell the page's story; prefer current screens over historical docs.

App-native photography base: `A\Tripverse\media\web\` (optimized counterparts of `media/` originals).

- `brady-bellini-t5dGNNQVwg8-unsplash.jpg`: Seoul palace, actual live hero image.
- `hero-bg.jpg`: Mount Fuji; optional `hero-bg1.jpg` alternate.
- `david-emrich-VCM99u6HltA-unsplash.jpg`: Kyoto; `will-goodman-1EikowqH9fs-unsplash.jpg`: Porto; `fredy-martinez-frd7WNzipdU-unsplash.jpg`: Prague.
- `philipp-trubchenko-oOTo9nR7f9Q-unsplash.jpg`: Budapest; `caleb-JmuyB_LibRo-unsplash.jpg`: Sydney.
- `pema-g-lama-6cfK0SEtpbY-unsplash.jpg`: izakaya; `shigeki-wakabayashi-6nuz52vsbWc-unsplash.jpg`: Osaka.

Additional attractive images used by the main app: `T\frontend\public\home\how-it-works\{destination,build-together,trip-studio,take-with-you}.webp`. Guide character art should be taken from current source mappings if used; do not invent new mascots. Use travel photography/collage as atmosphere and the actual UI as feature evidence.

**Video decision:** screenshot/composition narrative plus the required functioning original journals. Only third-party reference MP4s were found under `media/mmm/vid`; exclude them. A genuine future screen recording can replace a planned still, but it is not required for completion of Session 3.

### Shiori — current local app, website and art

Supplied base: `A\Shiori (栞)\`.

Prefer a consistent current app capture set copied during Session 4 from `S\site\assets\shots\` into proposed `A\Shiori (栞)\screenshots\`:

| Current source filenames | Planned chapter |
|---|---|
| `home-nagi.webp`, `home-ranbu.webp` | Main app reveal and two-world paired composition |
| `discover-nagi.webp`, `discover-ranbu.webp` | Discovery and theme responsiveness |
| `manga-nagi.webp`, `manga-ranbu.webp` | Built-in manga reader/library story |
| `entry.webp` | Episode/watch entry; inspect actual player state before captioning |
| `downloads.webp`, `auto-downloader.webp` | Download queue and rules/profiles; legitimate empty states can explain the interface |
| `mobile-nagi.webp`, `mobile-ranbu.webp` | Tall mobile pair |
| `sidebar.webp`, `settings.webp`, `search.webp`, `schedule.webp` | Navigation, personalization, search and airing schedule |

This set reflects newer mascot branding. Supplied `guide/` images use an earlier 栞 identity; avoid intermixing brand eras without a process explanation.

Supplied `guide/home.webp` is a valid earlier Nagi capture if useful. `guide/entry.webp` says “Loading stream”; it cannot prove playback succeeded. `guide/downloads.webp` shows “No downloads yet”; `guide/debrid.webp` shows no connected service. These are honest empty/configuration states. **Do not use supplied `guide/auto-downloader.webp`: it is blank.** The sibling site's `shots/auto-downloader.webp` was inspected and is a valid replacement rules-page capture.

Supplied website captures: `site-hero.webp`, `site-worlds.webp`, `site-cast.webp`, `site-manga.webp`, `site-tour.webp`, `site-pop.webp`, `site-gallery-wall.webp`, `site-install.webp`, `site-docs.webp`. Use 3–5 to explain the separately built static marketing experience, distinguished from local app screens.

Art: prefer processed `art/` to raw `art-source/`. Inspected `art/a147-613df5.webp` (and its smaller `.sm.webp` variant) is a strong dusk/fireworks scene for a portrait/emotional closing. Choose additional hero/character/manga spreads by checking the current site's artwork mapping and the complete supplied library. Preserve attribution to original anime/manga/art creators; the portfolio describes curation and interface work, not authorship of their artwork.

**Video decision:** optional click-to-play `brag.mp4`, 20 seconds, 1920×1080, approximately 19.7 MB. Derive a representative local poster during implementation; frame inspection shows mascot/torii/character-led brand imagery. Present it as a showcase film. Confirm the full film fits the current narrative before publication.

### Mandatory original interactive sections — source transfer register

Follow-up references:

- Image #1, `C:\Users\ROHITM~1\AppData\Local\Temp\codex-clipboard-209ebac7-0f05-49ca-ba2b-d6cda16a4a41.png`: Shiori's large floating cut-out character stage.
- Image #2, `C:\Users\ROHITM~1\AppData\Local\Temp\codex-clipboard-525b455a-5807-4743-8bdc-2c5deec7b166.png`: TripVerse Memory Stack.
- Image #3, `C:\Users\ROHITM~1\AppData\Local\Temp\codex-clipboard-5b2779ea-d228-453b-96f0-502b8b84daa2.png`: TripVerse Field Journal.

These sections must be **copied from the actual local product source**, with their original content, assets, layout and interaction code. They are live sections inside the portfolio case pages, not screenshot panels, links standing in for sections, re-created React elements or newly written visual interpretations. No rewritten journal/gallery copy. Source website navigation, account controls, download pill and floating guide visible around the reference are page chrome; keep the portfolio's existing chrome around the transferred sections.

The only permissible adaptation is the small technical bridge required to run the copied code in the portfolio: import/dependency resolution, source asset paths, scoped inherited styles, selector roots, lifecycle cleanup and working outgoing link destinations. Record these changes so a reviewer can compare the transfer against the original. Do not redesign the component internals, replace original controls, retime the motion or rebuild these interactions using different primitives.

#### TripVerse: copy the entire original TravelJournals bundle in Session 3

Source directory: `T\frontend\src\components\home\v2\journal\`.

| Original source | Copy scope / purpose |
|---|---|
| `TravelJournals.tsx` | Complete component file: `Photo`, `CollagePage`, `FieldPage`, `JournalBook`, `TravelJournals`; keep original DOM, inline composition values, event handlers and GSAP turn code |
| `journalContent.ts` | All eight original chapters, captions, photo/detail/art mappings, alt text and colors |
| `travel-journals.css` | Complete original journal styling, responsive rules, perspective, pages, paper/tape/spiral binding and controls |
| `README.md` | Original section documentation/provenance reference |
| `T\frontend\src\hooks\useReducedMotion.ts` | Existing 18-line source hook, copied with import path adjusted if no semantically identical portfolio hook exists |
| `T\frontend\src\styles\tripverse-v2.css:16–144` | Only the source wrapper tokens, inheritance, low-specificity resets and `.tv-container` needed by the journals; mechanically scope them rather than importing all app styles |
| `T\frontend\src\components\home\v2\HomeV2.tsx` | Reference `.tv2.tv2--bone` parent environment and original `<TravelJournals />` integration; do not copy the whole home page |

Proposed destination: a project-owned source-copy folder under `P\apps\web\src\components\projects\tripverse\journal\`, preserving source filenames. Mount the complete `<TravelJournals />` once in the TripVerse case. It renders **Memory Stack first, Field Journal second**, each independently navigable. Keep its original introductory/footer copy as part of the copied section. Do not copy the unrelated TripStudio spatial view's component also named `Journal`.

Source dependency resolution:

- React 19, `gsap` and `@gsap/react` already exist in the portfolio; reuse them.
- Source imports six `lucide-react` icons and `@fontsource/caveat/400.css` / `600.css`; neither package is currently a direct portfolio dependency. During Session 3, resolve these exact source dependencies with the source project's compatible versions and a reviewed lockfile update, or preserve original locally available icon/font resources if that keeps the source imports intact through a minimal bridge. Do not draw replacement controls or substitute Satoshi handwriting. Install nothing during planning.
- Preserve Instrument Serif regular/italic, Geist regular/medium and Geist Mono. Corresponding supplied files and font licenses already exist at `A\Tripverse\media\mmm\tripverse-design-pack\mockups\fonts\`: `InstrumentSerif-Regular.ttf`, `InstrumentSerif-Italic.ttf`, `Geist-Regular.ttf`, `Geist-Medium.ttf`, `GeistMono-Regular.ttf`.
- Original Caveat local resources also exist at `T\frontend\node_modules\@fontsource\caveat\files\`, including `caveat-latin-400-normal.woff2` and `caveat-latin-600-normal.woff2`.
- No product backend, authentication, source app router, HomeV2 navigation, new Lenis manager or separate GSAP instance is required.

Asset transfer: copy the existing **24 optimized original WebPs unchanged** from `T\frontend\public\images\journal\` to `P\apps\web\public\images\journal\` if that path is free. This preserves `journalAsset(name) => /images/journal/${name}.webp` unchanged. If the portfolio namespace already conflicts, use a dedicated TripVerse asset namespace and change only this resolver. Do not regenerate or recompress the prepared journal art unnecessarily.

The eight entries use these photo/detail/art triplets, in original order:

| Chapter | Photo | Detail | Art |
|---|---|---|---|
| Somewhere, slower. | `mountain-morning.webp` | `alpine-walk.webp` | `mountain-collage.webp` |
| Salt in the air. | `surfers.webp` | `ocean-play.webp` | `blue-seats.webp` |
| The scenic way. | `on-the-road.webp` | `crosswalk.webp` | `color-city.webp` |
| A pocket of quiet. | `grass-daydream.webp` | `valley.webp` | `green-trail.webp` |
| After the rain. | `rainy-afternoon.webp` | `birds.webp` | `tulips.webp` |
| Under the same sky. | `camping.webp` | `moon.webp` | `sky-streaks.webp` |
| Better, together. | `friends.webp` | `laughter.webp` | `enjoy-now.webp` |
| Nothing on the list. | `sunlit-pause.webp` | `mountain-morning.webp` | `cloud-daydream.webp` |

`city-type.webp` is the extra prepared file; 23 distinct images are used by the component. Source `T\frontend\scripts\journal_assets.py` records the original photography/creative filenames and processing. All 24 source mappings have a matching file in supplied `A\Tripverse\media\mmm\photography\` or `creative\`, so original media is available even if source generated assets later move.

Preserve the inherited source environment locally: bone `#f7f6f3`, ink `#111111`, muted `#666562`, line `#eaeaea`, `--tv-max:1240px`, gutter `clamp(1.25rem,4vw,3rem)` and the original `.tv-container`. Preserve Memory Stack slate `#323b53`, Field Journal band `#e8e5dd`, cream ruled paper, rounded pages, circular controls, original fonts and source heading/paragraph/button resets. The copied bands need the original viewport-width composition, not the portfolio's narrow prose column. Explicitly protect them from `.dw-case-study` media/heading/button overrides.

Functional fidelity requirements: keep .85s stack and 1.05s field flips, opposite reverse hinge, front/back leaves and destination-underneath rendering, delayed chapter state commit, busy fencing, left/right turn zones, previous/next/restart/chapter grid, arrows/Home/End, original >45px horizontal swipe detection, live announcements, adjacent-image preload and source ≤767px mobile layout. Retain source reduced-motion immediate page changes. Preserve unique `travel-journal`, `tj-heading`, `tj-index-stack`, `tj-index-field` IDs by mounting once.

Place the full original journal after the itinerary/studio/export experience and before the portfolio reflection/next-case ending; it provides the requested emotional interactive centerpiece. Its source captions are illustrative editorial content, not a claim that a generated user's itinerary produced those photos.

#### Shiori: copy the original cast field and gallery wall in Session 4

The pictured Shiori section is `.cast-field`, not the separate filtered `gallery.html` page. Include **both the pictured cast field and the original homepage gallery wall** as functioning sections. Retain the real hosted full-gallery destination for wall actions.

| Original source under `S\site\` | Exact transfer boundary |
|---|---|
| `index.html:183–187` | Complete `.cast-field[data-cast]`, unchanged “A cast that fills the frame.” heading, paragraph and stage |
| `index.html:243–250` | Complete `.wall3d[data-wall3d]`, original heading/paragraph/CTA and wall plane |
| `assets/js/gallery-data.js` | Original art metadata; only adapt `window.SHIORI_ART` into a scoped/module data reference if necessary |
| `assets/js/nagi.js:4–12` | Existing selector helpers, EASE/SCRUB, art URL resolver and deterministic shuffle |
| `nagi.js:43–53,107–111,165–166` | Cast generation, rise/float and fine-pointer lean code |
| `nagi.js:55–63,66–70` | Manga ID selection needed by the wall's original exclusion set, and original 32-image wall generation; manga columns themselves need not be mounted to compute this set |
| `nagi.js:116–118,124` | Wall tilt/item entrances and relevant original text entrance, scoped to copied roots |
| `assets/css/nagi-art.css:80–94,104,106–114,134–138` | Original cast/wall geometry, hover, mobile and reduced-motion styles |
| `assets/css/nagi.css:5–38` | Needed source tokens, fonts, base text/reset and section spacing, scoped inside the source-section wrapper |
| `index.html:14` | Original Zen Maru Gothic / M PLUS 1 font configuration |

Proposed destination: a small project-owned source-section host under `P\apps\web\src\components\projects\shiori\`. Convert static markup to equivalent JSX syntax only as necessary; preserve classes, data attributes and original content. Initialize extracted original code against its section root using the portfolio's installed GSAP/ScrollTrigger. **Do not run the whole `nagi.js`**: its other blocks assume site navbar, pill, hero, support, manga, marquee and pinned-tour nodes that are absent here.

Cast art selection remains `shuffle(ART.filter(a => a.cut), 3).slice(0,13)`; keep exact IDs/order and supplied cut-outs under `A\Shiori (栞)\art\`:

```text
a051-a48adf.cut.webp   a053-9cbff2.cut.webp   a060-ed65f3.cut.webp
a067-e627a6.cut.webp   a072-11c15e.cut.webp   a074-652ce7.cut.webp
a076-4ceeb8.cut.webp   a078-5f95e9.cut.webp   a083-f18998.cut.webp
a087-8f1a4d.cut.webp   a092-4dcbab.cut.webp   a098-2dbd62.cut.webp
a108-8f5bbe.cut.webp
```

Alternatively copy the thirteen exact un-hashed source `S\site\assets\g\aNNN.cut.webp` filenames into a portfolio source-art subtree and preserve the original resolver structure. For the gallery wall, use original metadata, exclusion IDs, manga and cast ID sets, seed 11, first 32 non-manga unused pieces and original `.sm.webp` derivatives. Retain exact supplied art through a deterministic local URL map or copy the needed source-generated files; do not select a different collage or regenerate cut-outs.

Preserve stage `clamp(26rem,60vw,44rem)` / ≤860px `22rem`, depth `[.55,.75,1]`, source left/height/z-index calculations and shadows. Cast rise: yPercent40, duration1, staggered delay `(n%6)*.06`, once at top70%; float: original y and 2.6–3.8s cycle; pointer lean: original normalized viewport x, depth×60 displacement and 1s quickTo. Preserve hover −14px/1.04 scale and original pointer/reduced-motion gates. Wall retains perspective1600px, 8-column desktop/4-column mobile, 3:4 tiles, rotateX48→8, scale.9→1, y80→0, scrub.8, original batch entrance and translateZ40/1.06 hover.

Preserve the Nagi source's haze `#e7eefb`, ink `#141a26`, muted `#3a4356`, ease `cubic-bezier(.23,1,.32,1)`, original font families and section spacing. Scope all tokens/element styles and generic selectors such as `.figure`, `.btn` and `[data-rise]`; do not override portfolio `:root`, body, header/footer, other figures or action styles. Cast/wall motion itself needs GSAP/ScrollTrigger only; do not add SplitText/Flip merely because other source-site sections use them.

Necessary bridge: module imports, root-scoped queries, local asset map, `useGSAP`/matchMedia cleanup, removal of listeners and generated children on unmount. Preserve source code logic/numerical values. StrictMode/remount must not append another 13 figures or 32 links. The linked CTA and tile URLs become `https://shiori-dusky.vercel.app/gallery.html` and `.../gallery.html#aNNN`; preserve their text and destinations rather than leaving broken relative `gallery.html` links under `/work/shiori`.

The full filter/shuffle/lightbox `gallery.html` is a distinct page, not the attached character reference. Its original source remains the outgoing gallery destination; creating an additional portfolio gallery route is not necessary for these required two sections. If a later request explicitly includes that full page, reuse `gallery.html`, `gallery.css`, `gallery.js` and their original Flip/SplitText/dialog behavior rather than inventing a substitute.

Place the cast field after the app/theme/personalization story, and the art wall with the separate website-craft chapter before reflection. Copy their existing headings/body/CTA verbatim; do not add new words inside their DOM. Verify source fidelity in Session 4 and repeat the full comparison/interactions in Session 5.

### Laptop mockups — newly available during final review

Three completed laptop candidates appeared in the shared workspace. They were inspected and are now reserved **only for the next-case footer preview leading into their respective project**:

| Project | Canonical asset path | Native dimensions | Visual role |
|---|---|---|---|
| Walkthru | `A\Walktru\mockups\walkthru-laptop-v1.png` | 1416×1111 | Next-case preview targeting Walkthru only |
| TripVerse | `A\Tripverse\mockups\tripverse-laptop-v1.png` | 1417×1110 | Next-case preview targeting TripVerse only |
| Shiori | `A\Shiori (栞)\mockups\shiori-laptop-v1.png` | 1417×1110 | Next-case preview targeting Shiori only |

Provenance and convenient copies: `P\output\laptop-mockups\{README.md,creative-brief.md,prompts.md}` and project PNGs. The README explicitly identifies the laptop displays as AI-rendered reproductions guided by screenshots, not pixel-exact captures. Use these as attractive product mockups; actual feature explanations must continue using the genuine screen set. The Shiori mockup displays the hosted website, not the local player. Preserve whole-device framing and native approximately 1.277:1 ratio with contain/natural treatment; do not crop them to the existing 4:5 preview default and lose the laptop.

Keep footer references replaceable if Rohit supplies revised finals. Optimize derivatives without rebuilding controls. TripVerse compositions depicting laptops follow the same footer-only rule; choose genuine UI and non-laptop art for its body. No image generation was performed by this planning work.

## 5. Session 1 — Neuron and YapChat refresh, shared case foundations

### Start-of-session reads

Re-read current `git status`, this plan, the two page files, their CSS, `ProjectPage.css`, current Footer and variant code. Compare `N\README.md` / current raw Neuron README and `Y\README.md` / `DESIGN.md` against selected screenshots. Re-check source differences before touching files shared with the user's local design work.

### Implementation steps

1. Capture baseline desktop/mobile screenshots of the two current portfolio cases and their selected-work previews. Record current console/build limitations separately from changes introduced here.
2. Build curated fresh screenshot imports/showcase arrays. Inspect natural ratios and useful crop positions. Keep current artwork only where its role is editorial mood.
3. Reuse the header, CTA, metadata, media-grid, architecture and next-case patterns. Extract only repeated case primitives needed for the upcoming pages; preserve existing DOM/classes/timings. Add keyboard Enter/Space activation to reused FeatureShowcase cards, which are currently focusable `div role="button"` elements without a keyboard handler.
4. Refresh both full page narratives and supporting `caseStudies.ts` records, not only a hero image. Update overview/roles/feature captions and remove unsupported metrics/claims.
5. Update Neuron/YapChat entries in `projects.ts` with current 2–3 image previews. Refresh only their obsolete product screenshots in the existing home Gallery source; preserve the locally modified Gallery component/motion. The selected list remains the existing list until Session 3's TripVerse page completes the requested four-project selection.
6. Remove Neuron's duplicate `useMagnetic(root,[slug])` mount while editing it. Keep one listener lifecycle per page and scoped GSAP cleanup.
7. Prepare the smallest routing reuse necessary for new dedicated pages. `/work/:slug` currently enters `ProjectPage`, which early-dispatches old dedicated cases and otherwise renders a hard-coded SkyGuide body. Separate resolution from page hooks if needed; preserve Skyguide and existing aliases. Do not register empty new routes or make unfinished new entries clickable.
8. Verify the refreshed cases, update implementation status here, and stop after Session 1.

### Neuron chapter plan

| Chapter | Content and composition |
|---|---|
| Opening | Existing NEURON display hierarchy, precise multimodal/RAG descriptor, GitHub pill, native metadata; current Pulse home as first major product reveal |
| Why it exists | Information spans formats; retained atmospheric visual plus concise motivation |
| One query, multiple inputs | Explain text/image/audio/video inputs and modality processing; `02-search.jpg` wide and readable |
| Why this result | Ranking explanation/signals/provenance; result detail where the sample fixture won't mislead |
| Upload, scope, ask | `04-documents.jpg` → `05-document-chat.jpg`; explain indexing/source selection and cited responses |
| Pulse redesign | Graphite/orange, clearer density, sharp edges, visible system status; typography stays inside screenshots |
| Under the hood | Existing architecture rows, concise two-branch retrieval/document diagram and fallback decisions |
| Across screens | Account/saved/history plus tall mobile navigation; native media pair |
| Reflection | What changed in clarity/control, honest scope; retained strong brand/mood art; existing Footer |

Architecture draft to translate into accessible HTML/SVG using the existing section styles:

```text
Text / image / audio / video
  → modality processing + fused query
  → semantic + keyword + visual/provider retrieval
  → blended ranking + explanation → result detail

Documents → parse / chunk / index → retrieval
  → generated answer OR cited extractive fallback → source navigation
```

Keep FastAPI / CLIP / Whisper / BLIP / FAISS / BM25 / MongoDB boundaries supported by current source. Do not infer measured accuracy or latency from sample screens.

### YapChat chapter plan

| Chapter | Content and composition |
|---|---|
| Opening | Existing YAP CHAT heading/CTA grammar; new handset landing plus flagship room image |
| A room for your people | Explain room membership, code/link/QR entry and deliberate private-room boundary |
| Everyday conversation | `chat.jpg` wide; crop-backed details for voice-note pause/review, photos, presence, unread/deletion states |
| From conversation to call | `incoming-call.jpg` paired with accurate camera-off `video-call.jpg`; explain mic/camera/share/reactions/in-call chat |
| The phone experience | Natural-ratio mobile-chat/mobile-call pair, sensible stack on small screens |
| Pick Up redesign | Brief visual rationale with current UI and retained editorial photos; no portfolio-wide type/palette change |
| Under the hood | Messaging persistence vs signaling vs P2P media, existing architecture/decision language |
| Real constraints | Eight-person mesh cap, optional TURN, in-memory call lifecycle, plain-text persistence; no invented scale or E2EE claim |
| Reflection | Communication experience and expressive frontend work; current brand image and native next-case footer |

Diagram draft:

```text
React room UI ↔ Express / Socket.IO ↔ MongoDB messages / room membership
                     ↕ signaling
Browser peers ↔ WebRTC audio / video / screen sharing
Media attachments → existing Cloudinary storage flow
```

### Files expected to change

Owned: `pages/NeuronProjectPage.tsx/.css`, `pages/YapChatProjectPage.tsx/.css`, `data/projectEntries/neuron.ts`, `data/projectEntries/yapchat.ts` and their scoped derivatives. Shared component/gallery changes require an exclusive claim recorded in SESSION_MEMORY.md. Session 1 is complete; its CaseFlow and keyboard fix can now be reused read-only.

### Session 1 completion checks

- Both old pages show current product UI in every functional chapter and preview; old mood media has accurate alt text/captions.
- GitHub/live actions resolve correctly; Neuron has no fabricated live destination.
- Removed unsupported typing/100%-citation claims; historical test counts do not read as new verification.
- Existing Skyguide/Forcaster pages and aliases still route; no unfinished new case is published.
- FeatureShowcase works by keyboard/touch; desktop hover effects remain familiar.
- One magnetic mount per page; GSAP listeners/triggers clean up on route changes; reduced-motion leaves all content visible.
- Typecheck/build and visual checks pass or pre-existing limitations are documented precisely.

## 6. Session 2 — dedicated Walkthru page

### Start-of-session reads

Read existing shared primitive signatures; Session 2 may run concurrently with Session 1. Re-read W's latest handoff/graphs and media-provenance files. Re-check the footer-only Walkthru laptop and any revised final. Reconfirm the repository destination and undeployed status.

### Walkthru detailed page

Proposed dedicated `pages/WalkthruProjectPage.tsx` with narrowly scoped CSS using the shared `dw-*` vocabulary. Canonical `/work/walkthru`.

| Chapter | Narrative | Visual composition |
|---|---|---|
| Opening | “Fresh eyes. Before you launch.” Browser-based AI testing | Actual dashboard first; native GitHub action and metadata; laptop only when another case's footer points to Walkthru |
| Why another perspective matters | A builder knows the intended path; an unfamiliar test user encounters friction | Persona photo strip + one wide original brand poster |
| A journey in your own browser | Pick site, goal and perspective; observe → choose action → execute locally → observe | Genuine sidepanel still beside evidence frames; keep extension UI legible |
| Evidence, step by step | Screenshots/snippets tied to a journey; where the test user stopped and why | Wide report plus stuck close-up, short captions linking evidence to finding |
| Launch basics with scope | Deterministic SEO/GEO/security/accessibility/performance checks enrich the journey | SEO/security paired captures; avoid certification language |
| Findings become the next fix | Prioritized fixes, fix prompt, MCP/coding-tool handoff and rerun comparison | Verified fixes/MCP/editor stills; omit exposed key areas |
| Under the hood | Local extension + bounded LangGraph control + evidence/report/persistence boundaries | Existing architecture section and concise loop diagram |
| Product and identity | Scout, curiosity, outside perspectives, editorial imagery | Curated posters/eye/reading/workspace; optional 30s click-play film |
| Reflection and status | Delivered source capabilities; deployment pending; evidence over guessed reassurance | Quiet closing brand spread; native next-case → TripVerse |

Architecture draft:

```text
Chrome MV3/WXT side panel → goal + persona + run
  ↔ FastAPI / LangGraph: decide → interrupt → check → decide
  ↔ rendered-page observation / bounded local action / axe + vitals

Masked evidence → private Supabase Storage
Passive checks + report graph + Postgres job handling → grounded report
  → fixes / MCP handoff → rerun comparison
```

Explain development memory versus durable production checkpoint configuration only as a concise engineering decision. Team/findings/watch/compare/citation modules can appear as supporting capability/process material where a verified screen supports them; keep the central narrative on the browser journey. Citation visibility is sampled API measurement, not coverage of every consumer search engine. Do not quote demo Launch Ready scores as an outcome or add a non-existent live/store destination.

### Walkthru registration and session checks

1. Publish Walkthru's owned `data/projectEntries/walkthru.ts` with repository link, case metadata, 2–3 genuine UI/art previews and a footer-only `nextCaseImage`. Shared page discovery resolves `/work/walkthru` to its dedicated default-exported page.
2. Full catalogue temporarily contains five completed cases: Walkthru, Skyguide AI, Neuron, YapChat, Forcaster. Keep the existing homepage selection until TripVerse is complete in Session 3; do not add an unfinished TripVerse row or route.
3. Use real dashboard/report previews and existing HoverRevealList/FlowingMenu. Store the laptop as `nextCaseImage` only. Derive Walkthru's next case from the current catalogue; it becomes TripVerse after Session 3 inserts that record.
4. Verify GitHub action, undeployed status, complete page, keyboard/touch/reduced-motion, scoped GSAP cleanup, image fidelity and optional poster-first film. Typecheck/build and inspect desktop/mobile layouts before ending this session.
5. Record the completed changes and any limits here; stop. TripVerse and Shiori implementation belong to their own sessions.

Expected owned files: `pages/WalkthruProjectPage.tsx/.css`, `data/projectEntries/walkthru.ts`, `assets/Walktru/portfolio/`. One-time shared setup paths are exclusively claimed in SESSION_MEMORY.md; other sessions must not repeat those edits.

## 7. Session 3 — dedicated TripVerse page and original journals

### Start-of-session reads

Read Session 1 shared primitives, Session 2 navigation changes, T's latest guide/current graph, and all source files in the mandatory journal transfer register below. Re-check the TripVerse mockup and genuine screenshots. The attached Memory Stack and Field Journal references specify required functioning sections, not optional inspiration.

### TripVerse detailed page

Proposed `pages/TripverseProjectPage.tsx` with scoped CSS and shared case primitives. Canonical `/work/tripverse`.

| Chapter | Narrative | Visual composition |
|---|---|---|
| Opening | A conversation becomes a trip you can see, change and carry | Actual welcome/plan + non-laptop destination photography, GitHub/live actions and native metadata |
| Before the itinerary | Destination/duration/origin brief with optional dates, budget, interests and avoids; six guides share planning logic | Brief/guide screenshots with actual destination photography |
| Two ways to build | One-shot streamed draft and day-by-day co-planning | Paired genuine one-shot/day-dock screens; build-together composition |
| Change it by asking | Immediate deterministic mutation and receipt; advice offer/avoid-rule confirmation explained accurately | Receipt whole-screen + focused receipt crop; ask/change composition |
| One trip, four views | Plan, hand-drawn Sketchbook, Map, orbitable 3D; shared underlying document | Reused FeatureShowcase with all four real views; wide sketch centerpiece |
| A budget with context | Suggestions are traveler-report estimates, accepted separately; typed rows replace guesses; weather/holidays/date context | Budget rows/sync plus budget-context art; no live-fare/booking promise |
| On the phone | Bottom sheets, upright sketchbook and chat | Natural tall phone pair, pocket-sketchbook composition |
| Take it with you | PDF, ICS, daily Google Maps directions, GPX, KML, CSV and JSON | Real export-ready/menu screens and export flatlay |
| Under the hood | FastAPI + LangGraph modes, persistence/research/provider boundaries and shared state | Compact two-path diagram and existing decision rows |
| The souvenir you keep — required interactive source section | Preserve the original TravelJournals section and both eight-chapter books without rewriting their copy or layout | Directly reused Memory Stack followed by Field Journal; original assets, fonts, surfaces, controls and GSAP page turns |
| Feeling and reflection | Studio control with travel anticipation; desktop movable/resizable windows | App-native photographs, selected campaign compositions; next-case → Skyguide AI |

Architecture draft:

```text
React / Vite browser → REST + SSE → FastAPI
  → LangGraph one-shot: research → write → itinerary extraction
  → LangGraph copilot: interpret → deterministic apply → research
                      → deterministic recommend → guarded respond → render

Shared trip document → Plan / Sketchbook / Map / 3D / Budget / Exports
Supporting services: Supabase Auth + PostgreSQL;
Groq primary / Gemini fallback; Tavily; Google Places cache/quota;
openrouteservice road metrics
```

Keep the diagram digestible. Do not add planned Neon/n8n services or advertise automatic currency conversion. Near-date forecasts and farther-date monthly weather must retain their distinct labels. Google Maps directions support up to nine stops per day. Images/receipts prove the interface design; research has not established production backend performance.

### Registration and homepage tasks

1. Publish `data/projectEntries/tripverse.ts` with links, case data, UI/art previews and its footer-only laptop. Do not edit central project/link/case files.
2. Export `TripverseProjectPage.tsx` as default. The existing shared lazy resolver discovers it; no route-file edit is needed and no SkyGuide fallback should appear.
3. The shared registry already owns catalogue order and gated selected rows `walkthru`, `tripverse`, `skyguide-ai`, `neuron`. Completing the TripVerse entry activates that set automatically; verify it rather than rewriting the selection.
4. Reuse home HoverRevealList and 2–3 genuine UI/non-laptop art previews per project. Laptop mockups are exclusively `nextCaseImage` footer assets, never first covers.
5. Session 3 full index temporarily contains six finished cases: Walkthru, TripVerse, Skyguide AI, Neuron, YapChat, Forcaster. Add Shiori only when its page exists in Session 4.
6. Reuse `nextCase(projects, slug)` from `data/projectRegistry.ts`. The shared Footer resolves the destination `nextCaseImage`; do not recreate a chain or use normal previews as laptop substitutes.
7. Record a curated Gallery subset in your handoff for Session 5 integration, or acquire a short exclusive `data/gallery.ts` claim first. Do not eager-glob whole design libraries.
8. Check the TripVerse page and affected navigation, update session status, stop after Session 3.

### Session 3 completion checks

- TripVerse contains complete motivation/workflow/design/architecture/reflection chapters with authentic media and accurate labels; previously completed Walkthru remains functional.
- Both original journals render and work independently, with all eight chapters, previous/next/restart/browse/swipe/keyboard controls, original page-turn choreography and source typography/surfaces. A screenshot or rewritten gallery does not satisfy this requirement.
- Homepage shows exactly Walkthru → TripVerse → Skyguide AI → Neuron, and every row reaches the correct complete case.
- Full index retains all existing projects, including refreshed YapChat and Forcaster.
- Walkthru has a working GitHub action and honest undeployed status; TripVerse has the supplied GitHub/live actions.
- Placeholder extension/hero images and third-party reference videos are absent from product evidence.
- Optional film uses poster/native controls, no heavy eager preload; no screen is cropped beyond understanding.
- Scoped reuse matches Satoshi, square-media treatment, spacing, magnetic/GSAP behavior and both portfolio variants.
- Mobile/reduced-motion/typecheck/build/navigation checks complete before ending the session.

## 8. Session 4 — dedicated Shiori page and original interactive gallery

### Start-of-session reads

Read current S handoff, desktop/mobile documentation, upstream attribution and current source-shot set. Re-check the registered Shiori mockup and any revision. Re-read the completed two agent pages and shared CSS for consistency before adding Shiori.

### Shiori detailed page

Proposed `pages/ShioriProjectPage.tsx`, narrowly scoped CSS, canonical `/work/shiori`.

| Chapter | Narrative | Visual composition |
|---|---|---|
| Opening | “Your anime, kept like a bookmark.” A private local anime/manga hub | Current app home + supplied atmospheric art; GitHub and Visit website; native metadata |
| Your own local bookmark | Computer/library/password, no Shiori account; distinguish hosted website from local app | Actual home/entry and brief installation context |
| Two worlds, one interface | Nagi calm and Ranbu energetic, with shared navigation and behavior | Large consistent current home-nagi/home-ranbu pair; optional existing accordion |
| Watch or keep | Entry/episode choices, source fallback, single-episode/batch downloads | Actual entry/download screens, captions reflecting loading/empty state where shown |
| Providers and rules | Separate streaming, torrent and debrid responsibilities; auto-download profiles/rules/schedule | Correct replacement rule capture, settings/debrid state and schedule |
| Manga beside anime | Built-in reader/library, downloaded chapters | Current manga pair and processed manga/character art |
| A finished personal environment | Single expandable/pinnable sidebar, search/discovery/settings, phone theme pair | Current app screenshots and natural tall mobile media |
| Under the hood | Real local React client, Go/Echo, SQLite and background/provider events | Existing architecture grammar, concise system diagram |
| What I changed | Interface/themes/art/navigation, integration priorities, hardening and native Windows onboarding/packaging | Delivered contribution list with source references; upstream credits clearly attached |
| A cast that fills the frame — required original section | Copy the actual source character stage, including its unchanged heading/copy and cut-out selection | Original 13-figure layout, rise/float/pointer-lean interactions and mobile/reduced-motion states; not a static site screenshot |
| The original gallery wall — required source section | Copy the source tilted art wall and its exact curation/interaction logic | Original 32-image wall, scroll tilt and hover depth; source links remapped to the real hosted gallery |
| A website with its own craft | Separately built HTML/CSS/GSAP marketing site and docs | Supporting site captures alongside the functioning copied sections; optional user-played 20s showcase film |
| Reflection | A personal media environment; completed versus parked scope | Dusk/fireworks or another inspected app-native art spread; native next-case → YapChat |

Architecture draft:

```text
Local React 19 / TypeScript / TanStack Router + Query / Jotai client
  ↔ Go / Echo API (/api/v1) + WebSocket events (/events)
  ↔ SQLite / GORM + library/settings/background rules
  ↔ extension providers / AniList / torrent client / debrid integrations

Separate static HTML / CSS / GSAP website → docs / gallery / local-app download
```

Use Rsbuild/Rspack and Tailwind 3 for the actual Shiori client description, not the portfolio's Vite/Tailwind 4 stack. Credit inherited Seanime infrastructure and GPL-3.0; describe personal frontend/integration/packaging work precisely. Do not include the unconnected Node companion or parked AI/Telegram architecture in a working-system diagram.

Do not imply all providers were successful. Current notes record source failures and optional solver requirements. Minimal PWA installation/unreachable-state support does not mean offline local-library playback or push notifications. Shiori's Visit website action intentionally opens the hosted showcase; a visible nearby sentence explains local execution.

### Shiori implementation and registration tasks

1. Copy the consistent current Shiori app screenshot subset into A, without altering sibling sources. Replace the blank supplied auto-downloader candidate.
2. Publish owned `data/projectEntries/shiori.ts` with links/case data/normal previews/footer-only laptop after default-exported `ShioriProjectPage.tsx` is complete. Shared lazy route discovery requires no central file edit.
   Copy the mandatory original cast/gallery blocks with the source-section register below; do not rebuild them as portfolio approximations. Preserve source content and interactions, using only the technical hosting/path/lifecycle adaptations described there.
3. Final catalogue: Walkthru, TripVerse, Skyguide AI, Neuron, Shiori, YapChat, Forcaster. Keep homepage selection at four. Verify the entire next-case loop and All Work/home paths.
4. Record a curated Gallery subset for Session 5, or claim `data/gallery.ts` exclusively before integrating it. Preserve existing Gallery behavior and other agents' records. Verify source asset URLs and hosted gallery deep links.
5. Check this page's direct route, actions, copied source sections, mobile layouts, reduced-motion and teardown; typecheck/build. Keep authentic screenshots dominant in functional chapters and distinguish Shiori's website mockup from its local app.
6. Record completed page/source-transfer changes here and stop after Session 4. Cross-portfolio end-to-end checks, current-source audit and final minute fixes belong to Session 5.

## 9. Session 5 — current-source audit, end-to-end testing, visualization and minute fixes

This is a dedicated final session after Sessions 1–4. It includes fixes, not just an audit report. Re-read the latest project READMEs/docs/handoffs, current public destinations and the completed portfolio to catch stale links, copy, assets and route data. Preserve the original interactive-section designs while correcting integration issues.

### Final session execution sequence

1. Record the complete seven-project route/data/media inventory and compare it with the required homepage selection and current project sources. Correct outdated wording, broken links, image references and inconsistent registration.
2. Run frontend typecheck/build and meaningful route/order checks. Verify direct deep links/refresh/unknown slugs and existing aliases, including `/skyguide`; make the smallest correction if an alias still lacks canonical slug data.
3. Walk the entire homepage → full Work index → each case → next-case loop → All Work/home/back-forward path. Test each repository/live action and every reusable control. Fix failures before repeating the affected path.
4. Render and save desktop/mobile screenshots for each affected page and source section. Inspect full-page rhythm plus close-up alignment, line breaks, gutters, media edges/crops, icon sizes, stacking, sticky/pinned spacing, focus rings, overflow and footer handoff. Compare the journals/cast/gallery against their original local implementations and the attached references at matched viewport sizes.
5. Test all eight journal chapters in both independently controlled books: buttons, index/restart, arrows/Home/End, swipe, rapid page requests, narrow layout, reduced-motion and unmount during a turn. Check Shiori's exact figure/art selection, scroll reveal/float/lean and gallery links/tilt/hover; verify teardown and no duplicated generated DOM after return navigation.
6. Check both portfolio design variants, keyboard/touch, reduced-motion, image/font/video network loading and repeated route changes. Correct CSS leakage, late font shifts, layout jumps, orphan GSAP triggers/listeners and any new console/network errors.
7. Inspect transfer cost and measured performance against the existing baseline/budgets. Optimize delivery paths without changing the copied sections' original visible artwork, geometry or animation choreography. Re-run only checks affected by fixes or unresolved concerns.
8. Review every case preview and the existing homepage Gallery for obsolete Neuron/YapChat UI. Verify count/curation and all laptop framing. Preserve existing user edits and product-source sections.
9. Update the affected portfolio README/project documentation and this plan with actual validation evidence. Close the remaining minute issues, list any genuinely unresolved external input, and stop with a reviewable result. Do not deploy without a separate instruction.

**Session 5 acceptance:** all required routes and controls pass; source sections match their originals; the four-row/seven-case order is correct; desktop/mobile screenshots have been inspected; relevant build/checks pass; no known newly introduced visual, interaction or navigation defects are left unaddressed. A “tests ran” statement alone does not complete this session.

### Source/code checks

Declared web scripts in `apps/web/package.json`:

```text
pnpm --filter web typecheck
pnpm --filter web build
pnpm --filter web test
```

`web lint` currently prints an echo placeholder; it is not an ESLint validation gate. Existing tests use `--passWithNoTests`; zero discovered tests is not evidence of tested routing/order logic. Add one focused runnable check for any nontrivial new selection/next-project/route-resolution logic, using the existing test stack, rather than tests mirroring page text or CSS.

Planning-session environment note: the available bundled pnpm wrapper attempted dependency maintenance and stopped on a no-TTY prompt. Existing installed Vite was launched directly for the design inspection; no package reinstall was performed. If this wrapper behavior repeats, use the existing project-installed binaries (`node node_modules/typescript/bin/tsc ...`, `node node_modules/vite/bin/vite.js ...` from `apps/web`) after checking exact local paths/CLI options. Do not purge dependencies or rewrite the lockfile just to review these pages. Local Vite startup needed ordinary execution permission because the restricted process could not read ancestor configuration directories.

### Visual and interaction matrix

| Area | Required checks |
|---|---|
| Routes | `/`, `/work`, all seven `/work/:slug` cases; existing aliases; unknown slug; direct navigation/refresh/back/forward |
| Ordering | Exact four selected entries; correct seven-project index; next-case chain loops through same full catalogue |
| Actions | Correct repository/live labels and URLs; no `#` live placeholders; Shiori website/local distinction; no fake Walkthru/Neuron deployment |
| Design | Compare shared gutters/type/metadata/buttons/square media/footer against baseline Skyguide and refreshed old cases |
| Viewports | 360/390px phones, 768px tablet, 1024/1440px desktop, wide desktop; natural tall phone media and readable screenshots |
| Variants | Existing current and updated portfolio variants; preserve user toggle and edits |
| Input | Keyboard tabs/focus/Enter/Space, carousel controls, touch galleries; essential content never requires hover |
| Motion | Reduced-motion shows all content; one global Lenis; no duplicate magnetic listeners; no orphan ScrollTriggers after rapid route changes |
| Content | Every screen has accurate alt/caption; fixture/empty/loading/concept states honestly represented; no invented outcomes or stale product capabilities |
| Console/network | No new runtime errors, missing images, broken media links or failed canonical navigation |

### Images, video and performance

- Generate appropriately sized local WebP/AVIF derivatives from selected supplied originals when needed. Keep readable screenshot text; avoid compressing text into blur. Preserve image dimensions/aspect ratios to prevent layout shift.
- Eager/high-priority loading belongs to the visible lead image only where justified. Lazy-load below-fold images; route-split detail pages and prevent the homepage from importing every detail gallery/video through routing/data coupling.
- Use the existing portfolio budgets in `docs/PERFORMANCE.md` as targets: LCP ≤2.5s, CLS ≤0.1, critical homepage JS ≤200KB gzip, sustained smooth scroll. Measure a baseline first; distinguish inherited failures from regressions. Do not claim budgets were met without measurement.
- The media libraries contain multi-megabyte 4K PNGs and large reference/source video collections. Never eager-glob them. Select canonical outputs and inspect actual network payloads per route.
- Films use native controls, poster, `preload="none"` and `playsInline`; no auto-playing audio. Prefer user-playback for the Walkthru/Shiori showcase films. If reusing an ambient loop, keep it muted, pause offscreen and provide a reduced-motion still.
- Diagrams use accessible HTML/SVG with a textual flow summary, portfolio type/spacing, readable labels and a mobile stack. Avoid a new diagram runtime, sprawling graph or animated connectors that obscure the explanation.
- Review final screenshots at their rendered size, not only in contact sheets. Ensure hero cards, hover strips and responsive media do not cut off the very controls a chapter explains.

## 10. Scope protection and handoff

The workspace already contains user changes to `RootLayout`, About/Contact pages, About/Hero/Footer/Gallery sections, `base.css`, and untracked `VariantToggle`/`v2.css`, plus the supplied new asset directories. New `output/laptop-mockups` files and project mockup assets also appeared during final review; preserve them and their provenance. Re-read status/diffs before each session; never reset, overwrite or bulk-format unrelated work. No AGENTS.md was found in the portfolio or tested ancestor directories during this research.

This plan does not authorize app backend changes, another product's redesign, installation of new tools, generation of new imagery, multiple new chats, automatic commits/pushes, a PR or deployment. It plans the requested frontend presentation and related content/navigation work inside the existing portfolio.

For each authorized session, leave a compact completion entry here containing changed page/data/component files, selected media, checks actually run, source-backed copy corrections and any remaining input. Reuse the existing design-review workflow; an explicit instruction to build a named session is approval for the concrete design described here, so do not ask again for routine choices inside it. A materially different global design proposal is a separate decision.

### Remaining inputs and deliberate limits

- Laptop mockups: three newly available candidates are registered above. Any preferred revised finals can replace them without changing the implementation sessions.
- Walkthru live URL: not yet deployed. Add it centrally only when a real destination is provided/verified.
- Fresh operational validation of the other applications: not performed in this planning session; implementation verifies portfolio behavior and factual presentation, not their production certification.
- Optional additional app recordings: useful only if they add clear evidence; existing Walkthru/Shiori films and TripVerse screen compositions already support the planned pages.

**Sessions 1 and 2 are complete. Await a named-session instruction before starting Sessions 3, 4 or 5.**

### Session 2 completion — Codex, 2 October 2026

Dedicated `/work/walkthru` implemented with ten chapters, 22 authentic UI/editorial images, the supplied 30s click-play film, full-size image links, original portfolio controls/motion and the reusable CaseFlow architecture component from Session 1. Campaign art has six optimized WebP derivatives; placeholders and laptop mockups are excluded from normal previews/body. Source-backed copy explains bounded browser/LangGraph loops, grounded reports and fix/MCP reruns; no deployed/live/store or fixture-outcome claims.

Project-owned registry entries and default-exported lazy page discovery allow concurrent work without shared route/data edits. Explicit footer-only mockups survive old-project preview overrides; Footer shows full mockups on mobile, and the Preloader's sibling-main selector warning is fixed. Neuron/YapChat screenshot footer overrides were removed under a small released integration claim; their current normal previews remain intact.

TypeScript, focused registry test and final production build pass. Browser checks covered 320/375/768/1024/1440px, both variants, artwork keyboard selection, all 22 image decodes, native film play/pause, catalogue navigation and Forcaster → Walkthru using the correct laptop. No new Walkthru runtime errors. Review evidence and exact limits: [output/session-2/README.md](./output/session-2/README.md). Shared memory records released claims. Remaining comprehensive performance/accessibility/reduced-motion/native-touch/source freshness checks belong to Session 5. No commit, push, dependency install or deployment was performed.
