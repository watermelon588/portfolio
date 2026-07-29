# Changelog

All notable changes to this project are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added (hero mounted + interactive robot slot)
- **Hero is live.** `HeroReserve` placeholder removed; `Home` now mounts the real `Hero` (poster, "Get in touch" + contact cards, portrait) plus a new headline block — eyebrow label ("Full-stack developer · India") + display name ("Rohit Maity"). (`Hero.*`, `Home.tsx`, removed `HeroReserve.*`)
- **Interactive 3D robot companion (`SplineRobot`)** — new component at `components/motion/SplineRobot.tsx`, positioned peeking from the portrait's bottom-right corner. Lazy-loads `@splinetool/react-spline`/`runtime` as its own chunk, mounts only when in view (`IntersectionObserver`) and only when hover-capable/non-reduced-motion/not low-end; renders nothing otherwise (no placeholder art, per ADR-017). **Needs a real scene URL from Rohit before it renders anything** — see `ROBOT_SCENE_URL` in `Hero.tsx`.
- Dev server: `vite.config.ts` port now honors `PORT` env (falls back to `5173`); `.claude/launch.json` sets `autoPort: true` so a busy 5173 doesn't block previews.

### Changed (design polish pass)
- **Work preview refined to reference spec** — square (no radius), **white matte frame** around the image, and a **crossfade between projects** (two stacked layers) as you move down the list; magnetic eased follow + velocity tilt retained. (`HoverRevealList.*`)
- **Section/route curve slowed + smoothed** — page transition `1.15s → 1.7s` with longer label hold; gallery reveal `1.35s → 1.7s`. (`PageTransition.tsx`, `Gallery.tsx`)
- **About enriched** — eyebrow + hairline topline, pulsing **"Available for work"** chip, a **"See my work"** magnetic CTA, and a full-bleed **tech-stack marquee** (React · TypeScript · GSAP · …). (`About.*`)
- **Gallery detailing** — screen **count meta**, and a **hover caption** (index + humanized filename, e.g. "All Sky Chart") sliding up from each card. (`Gallery.*`, `data/gallery.ts`)
- **Hero cue** — reserved fold now has a minimal animated "Scroll" indicator instead of dead space. (`HeroReserve.*`)

### Changed (work section → cursor-follow hover)
- **Home Work section now uses the reference site's "recent work" interaction.** Replaced the Flowing Menu with a new `HoverRevealList`: a plain project list where hovering a row floats that project's image toward the cursor with an eased (buttery) `gsap.quickTo` follow + velocity tilt, dims the other rows, nudges the hovered title, and reveals an arrow. Desktop/non-reduced-motion only; degrades to a tappable list on touch. Real hero images wired per project (Skyguide → landingPage, Neuron → multimodal-search, Yapchat → Preview; Forcaster has no art → no preview). (`components/motion/HoverRevealList/*`, `Work.*`, `data/projects.ts`). `/work` page still uses the Flowing Menu.

### Changed (gallery polish)
- **Gallery now shows real SkyGuide screens** (24, auto-globbed from `assets/skyguide/`, with a small blocklist for QR/policy/sign-up/footer). **Buttery hover:** the reel eases to a near-stop on hover (`timeScale → 0.12`), the hovered card lifts + warms while the rest recede and desaturate, long soft easing throughout. (`Gallery.*`, `data/gallery.ts`)

### Added (gallery)
- **Gallery section** (SkyGuide AI showcase) — full-bleed infinite marquee of mockup cards, revealed by the **same curved SVG swipe as the preloader**: a dark curtain covers the strip until you scroll to it, then peels away upward (ScrollTrigger `once`). Images are **auto-loaded from `apps/web/src/assets/skyguide/`** via `import.meta.glob` (drop files in → they appear), with labeled placeholders until real mockups land; resolver notes the path to later swap in video loops. Placed between Work and Footer. (`sections/Gallery/*`, `data/gallery.ts`, `assets/skyguide/`)

### Fixed (footer name)
- **Giant name is now true full-bleed.** The `clamp()` rem cap stopped it scaling on wide screens; switched to pure `21vw` so "ROHIT MAITY" spans the full viewport at every width (bleeds off the edges, clipped — no page scroll). (`Footer.css`)

### Changed (footer → reference-style)
- **Footer rebuilt to match the reference site's contact/footer.** New structure: **avatar (RM) + "Let's work together" headline** with a scroll-rotating arrow (ScrollTrigger scrub), large email + availability line, circular magnetic **Get in touch** button, **Version / Local time / Socials + Back-to-top** meta row, and a **giant "Rohit Maity"** name across the bottom with horizontal scroll parallax. Domed curved top. Content is Rohit's own (no fabricated phone). **Removed the footer's ScrollReveal** — the reference footer uses a solid headline + rotating arrow, not the word-reveal (About + Work keep ScrollReveal). ScrollTrigger cleanup scoped to its own triggers. (`Footer.tsx`, `Footer.css`)

### Added (page transitions)
- **Curved page-transition curtain with page name.** New `PageTransition` (hosted by a `RootLayout` wrapping all routes) plays the dark curved swipe — reusing `CurveSwipe`/`useCurveSwipe` — on every client-side navigation, covering the incoming page and showing its name ("Home" / "Work" / …) before peeling away. First app load is skipped (Home keeps its preloader intro). Routes restructured under a layout route with `<Outlet>`. (`RootLayout.tsx`, `components/motion/PageTransition.*`, `routes.tsx`)

### Fixed (preloader)
- **Last role-word no longer lingers.** "Weird" stayed painted over the revealed page because the word layer never exited — only the curtain did. The words now ride up and fade **with** the curtain. Also added a module-scoped `appPreloaded` flag so the intro plays once per full load, not on every client navigation back to Home. (`Preloader.tsx`)

### Changed (sizing)
- **Work section a touch taller** — home menu `56vh → 62vh` (and `/work` `62vh → 68vh`). **"Things I've built." resized for consistency** with the About statement + Footer CTA (`clamp(1.9rem, 4vw, 3.4rem)`, ~51px). (`Work.css`, `WorkPage.css`)

### Added (scroll reveal + responsive)
- **ScrollReveal on every major section.** Extended the About reveal to the **Work** heading ("Things I've built.") and the **Footer** CTA ("Let's build something together.") — word-by-word opacity + blur + skew on scroll. Section accents preserved by coloring the reveal's accent word (`.word:last-of-type` / `:nth-of-type(3)`). Added a `prefers-reduced-motion` safety net so text never sits stuck at `baseOpacity`. (`Work.*`, `Footer.*`, `ScrollReveal.css`)
- **Responsive / phone layout verified & guarded.** Audited at 375 / 768 / 1280 — no horizontal overflow, columns collapse (About 2-col → 1-col), fonts scale via `clamp`, nav links → hamburger ≤1024, menu panel full-width ≤768. Added a defensive `overflow-x: clip` on the root to guard against the off-screen closed nav panel. (`base.css`)

### Fixed
- **Flowing Menu escaped its section (class collision).** The vendored component's bare `.menu` clashed with the Navbar's full-screen `.menu { position: fixed; inset: 0 }`, forcing the menu to 100vh and its rows to ~180px. Namespaced every Flowing Menu class `fm-*` — rows are now correctly contained (~100px) on both the home Selected Work strip and `/work`. (`FlowingMenu.tsx`, `FlowingMenu.css`)
- **Footer downscaled.** It was oversized (title 102px, email 56px, orb 166px, ~677px tall). Retuned to a compact scale (title ~54px, email ~32px, orb ~115px, ~427px tall) with tighter spacing. (`Footer.css`)
- **Fixed navbar overlapping About.** With the hero gone, About started at `y=0` under the fixed navbar. Added a reserved full-viewport `HeroReserve` (`#home`) that holds the hero space for later and restores the `#home` anchor. (`apps/web/src/sections/Hero/HeroReserve.tsx`)

### Changed (this round)
- **Flowing Menu text sized down** — link + marquee text dropped from `4vh` to `clamp(1.25rem, 2.4vh, 1.9rem)`; marquee image pill made responsive. (`FlowingMenu.css`)
- **Selected Work now shows artwork** — projects carry `image`s (placeholder picsum seeds, swappable for real artwork). (`data/projects.ts`)

### Added (this round)
- **ScrollReveal (ReactBits, vendored + TS)** on the About statement — word-by-word opacity + blur + skew reveal on scroll. Cleanup scoped to its own ScrollTriggers (source killed all triggers globally). (`components/vendor/reactbits/ScrollReveal/`, `sections/About/`)

### Changed
- **Home page recomposed.** Hero removed for now (design being reworked per Rohit); the home page opens on About → **Selected Work** → contact **Footer**. Hero component files are retained but no longer mounted. (`apps/web/src/pages/Home.tsx`)

### Added
- **FlowingMenu (ReactBits, vendored + TS).** Integrated the ReactBits Flowing Menu (JS+CSS variant) as `components/vendor/reactbits/FlowingMenu/`, converted to TypeScript. Behaviour preserved; two hardening changes: guarded `contentWidth === 0` (was producing `Array(Infinity)` → `RangeError` on mount) and made the marquee image asset-driven (ADR-017) — no artwork renders a small dot spacer instead of a broken `url()`. (`apps/web/src/components/vendor/reactbits/FlowingMenu/`)
- **Selected Work section** — home-page project index built on FlowingMenu, themed to the approved palette (light rows, accent-blue marquee reveal). Eyebrow + heading + "View all work" pill → `/work`. (`apps/web/src/sections/Work/`)
- **Dedicated `/work` page** — full-viewport FlowingMenu index of all projects, own header + footer; route added to `routes.tsx`. (`apps/web/src/pages/Work.tsx`)
- **Projects data source** — single source of truth for both placements: Skyguide AI, Neuron, Yapchat, Forcaster (Forcaster details + all artwork/links pending). (`apps/web/src/data/projects.ts`)
- **Contact Footer** — dark-world (ADR-018) closing invitation: oversized "Let's build something together" CTA with circular magnetic button, big email, socials row, Version + live local-time meta, back-to-top. Curved (40px) top edge. (`apps/web/src/sections/Footer/`)
- **`LocalTime` component** — live footer clock, defaults to Asia/Kolkata. (`apps/web/src/components/motion/LocalTime.tsx`)

### Changed (prior)
- **Hero → two-column composition.** Left column stacks poster → "Get in touch" → contact cards; right column holds the portrait, stretched (via grid `align-items: stretch`) to the full height of the left column so it aligns exactly with the poster/contact stack. No spacer elements. Prepared with `data-hero` hooks for future GSAP entrance animations. (`apps/web/src/sections/Hero/`)
- **Page gutters.** Added `padding-inline: var(--page-padding)` to the shared `.container` so Hero and About align to the fixed navbar's inline padding. (`apps/web/src/styles/layout.css`)
- **About spacing.** Added top padding so the hero → about transition reads as intentional; content, typography, and layout unchanged. (`apps/web/src/sections/About/About.css`)

### Added
- **`useMagnetic` hook** — reusable magnetic-pull interaction extracted from the Navbar's pattern (identical easing/durations, `data-strength` convention; desktop + non-reduced-motion only). Wired to the Hero's contact cards. Navbar left untouched. (`apps/web/src/components/motion/useMagnetic.ts`)
- **Optimized hero image derivatives** — `poster.web.png` (~976 KB) and `portrait.web.png` (~603 KB), generated from the source `poster.png` (18 MB) / `portrait.png` (156 MB) which are far too large to ship. Portrait re-cropped to drop the source's letterbox/wall so the profile fills the frame. Originals kept in place. (`apps/web/src/assets/images/`)
