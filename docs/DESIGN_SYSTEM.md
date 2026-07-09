# DESIGN_SYSTEM.md

> **Project:** Rohit Maity — Portfolio
> **Status:** 🟡 Draft v0.1 — awaiting Rohit's approval + final color palette
> **Last updated:** 2026-07-09
> **Rule:** Nothing in this document gets implemented without explicit approval (see [CLAUDE.md](../CLAUDE.md) → Design Approval Policy).

This is the single source of truth for the visual and motion language of the portfolio. It is built from a **live teardown of dennissnellenberg.com** (HTML, CSS, and animation JS fetched and analyzed on 2026-07-09), cross-referenced with GSAP's showcase, ReactBits, MagicUI, Land-book, and Lapa Ninja.

**Important — inspiration, not imitation.** The reference site is deconstructed here to learn *why* it feels premium. We adopt its underlying systems (token discipline, motion grammar, spacing rhythm) but the layout, copy, imagery, and composition of this portfolio must be original. Do not copy his text, code, images, or clone entire sections 1:1.

---

## Part I — Reference Teardown: dennissnellenberg.com

### 1.1 What it's actually built with

| Layer | His stack (measured) | Our equivalent |
|---|---|---|
| Smooth scroll | Locomotive Scroll | **Lenis** (modern successor) |
| Animation | GSAP 3 + ScrollTrigger | **GSAP 3.13+** (all plugins now free) + `@gsap/react` |
| Page transitions | Barba.js (`sync: true`) | React Router + custom GSAP transition layer (or Motion `AnimatePresence`) |
| Lazy loading | vanilla-lazyload | Native `loading="lazy"` + Cloudinary |
| DOM | jQuery 😄 | React 19 |

Lesson: the "wow" is **not** exotic technology. It is GSAP + a smooth-scroll library + relentless consistency. Everything else is craft.

### 1.2 Why it feels premium — ten observations

1. **One easing curve rules everything.** Nearly every CSS transition uses `cubic-bezier(.7, 0, .3, 1)` — only durations change (0.3 / 0.5 / 0.7 / 0.9s). GSAP animations stick to a tiny palette: `expo.out` for entrances, `power4.inOut` for screens/overlays, `elastic.out` for magnetic release. This uniformity is *the* secret to "everything feels like one object."
2. **One typeface, one weight.** PP Neue Montreal, weight 450, everywhere — headings, body, buttons. Hierarchy comes from *size, case, and opacity*, not weight changes. `<h5>` labels are `0.6em`, uppercase, `letter-spacing: .05em`, `opacity: .5`. Bold (800) exists but is almost never used.
3. **Fluid everything.** Every size is a `clamp()`: body `clamp(16px, 1.2vw, 19px)`, section padding `clamp(5em, 21vh, 12em)`, container padding `clamp(2.5em, 8vw, 8em)`. The layout breathes with the viewport instead of snapping at breakpoints.
4. **Two worlds: light and dark sections.** A `theme-dark` class flips a section to charcoal `#1C1D20` with white text and `rgba(255,255,255,.2)` borders. The page alternates worlds (dark hero → white work section → dark footer), and the **curved divider** (a 150%-wide circle clipped to a 10vh strip) makes the boundary feel physical.
5. **Motion has mass.** Buttons are magnetic (pull strength 20–100 defined per element via data attributes; inner text moves at exactly half strength). Release springs back over 1.5s with an elastic ease. Cursor followers lerp at *different* rates (image ÷12, button ÷7, label ÷6) so layers drag behind each other like real objects.
6. **Entrances rise from below.** Page content starts at `y: 50vh` and settles with `expo.out` over 1–1.5s, staggered 0.05–0.07s per block. Split-line text reveals slide up from `y: 100%` inside `overflow: hidden` wrappers (stagger 0.01s, `power3.out`). Nothing fades in place; everything *arrives*.
7. **Scroll is a narrative device.** Parallax speeds are assigned like a cast: hero portrait −3, giant name +4 horizontal, footer −4. Marquees run infinitely (18s loop) and **reverse direction with scroll direction**. Scrubbed ScrollTriggers rotate arrows 90° and collapse the footer curve as you approach.
8. **The preloader is identity.** Multilingual greetings cycle (stagger 0.15s), then the screen exits upward with a curved bottom edge (`Power4.easeInOut`, 0.8s) while content rises to meet it. Page transitions reuse the same curved screen with the *destination page's name* — loading becomes brand.
9. **Micro-details close the deal.** Blue text selection. A dot that scales in under the active nav link. A live local-time clock in the footer ("Version / Local time"). The © logo that rewrites itself on hover. A hamburger that only appears after 30% scroll, popping in with a bouncy `cubic-bezier(0.34, 1.5, 0.64, 1)`.
10. **Restraint under it all.** Only ~6 colors. Whitespace is enormous. 1px hairlines (`stripe`) structure every list. Animations are disabled below 540px where they'd feel heavy (magnetic off, parallax reduced). Every effect has one job.

### 1.3 Measured values (reference, verbatim from his CSS)

**Colors**

| Token | Value | Role |
|---|---|---|
| dark | `#1C1D20` | Charcoal ink / dark sections |
| dark-dark | `#141517` | Deepest layer |
| white / light | `#FFFFFF` | Light sections |
| blue | `#455CE9` | Accent, fills, selection |
| blue-dark | `#334BD3` | Accent hover state |
| gray | `#999D9E` | Secondary text |
| lightgray | `#E9EAEB` | Tinted background shift |
| border (on light) | `rgba(28,29,32,.175)` | Hairlines |
| border (on dark) | `rgba(255,255,255,.2)` | Hairlines |
| error / success | `#FF4444` / `#24C958` | Form alerts |

**Type scale** (all weight 450, tight `line-height: 1.065` on display sizes)

| Element | Size | Notes |
|---|---|---|
| body | `clamp(16px, 1.2vw, 19px)` | line-height 1.6 |
| h1 | `clamp(3.25em, 7vw, 8em) × .875` | display name |
| h2 | `clamp(3.25em, 5vw, 4.5em) × .75` | footer CTA |
| h3 | `clamp(2.66em, 4.65vw, 5.32em)` | section titles |
| h4 | `clamp(1.55em, 2.3vw, 2.5em)` | list items / intro, lh 1.45 |
| h5 (label) | `.6em` | uppercase, +.05em tracking, 50% opacity |
| p | `1em`, lh 1.66 | `.small` = .8em, `.big` = 1.2em |

**Space & shape**

- Section padding: `clamp(5em, 21vh, 12em)` · Container padding: `clamp(2.5em, 8vw, 8em)` · Gap: `clamp(1.5em, 4vw, 2.5em)`
- Container max-width: `100em` · Hairline: `1px`
- Pill buttons: radius `2.125em`, height `4.25em`, generous `0 2.5em` text padding
- Circle CTAs: `clamp(9em, 12vw, 11em)` diameter · Hamburger: `clamp(4em, 5.5vw, 5em)`

**Motion (his exact recipe)**

| Pattern | Values |
|---|---|
| CSS master easing | `cubic-bezier(.7, 0, .3, 1)` @ .3s / .5s / .7s / .9s |
| Content entrance | from `y: 50vh`, `expo.out`, 1–1.5s, stagger .05–.07 |
| Line-split reveal | from `y: 100%`, `power3.out`, 1s, stagger .01 |
| Fade-in blocks | `y: 2em` + opacity, `expo.out`, 1.75s |
| Overlay screens | `power4.inOut`, .8s + curved edge collapsing 10vh→0 over 1s |
| Button fill | circle slides from `y: 76%` → 0, `power2.inOut`, .6s |
| Magnetic follow / release | `power4.out` 1.5s / `elastic.out` 1.5s |
| Marquee | 18s linear loop, `timeScale` flips with scroll direction |
| Bounce-in UI | `cubic-bezier(0.34, 1.5, 0.64, 1)` @ .4s |
| Cursor follower lerp | `pos += (target − pos) / N` where N = 12 / 7 / 6 per layer |

---

## Part II — Our Design Principles

1. **One material.** A single easing family and duration scale for the whole site. If a new animation can't use the tokens, it needs a written reason.
2. **Typography is the hero.** One display/UI typeface, hierarchy via size + case + opacity. Huge headline sizes, tight line-height (~1.05), tiny tracked-out uppercase labels.
3. **Fluid, not breakpoint-driven.** `clamp()` for all type and spacing. Breakpoints only *remove* complexity (disable effects, stack columns), never restyle.
4. **Light/dark section theming.** The page alternates ink-on-offwhite and offwhite-on-ink worlds, separated by curved or animated boundaries. Blue is scarce — fills, selection, one accent moment per viewport at most.
5. **Motion means something.** Entrances = arrival (rise + settle). Hover = magnetism/mass. Scroll = narrative (parallax cast, scrubbed rotations). Loading = identity (branded preloader). If an animation has no job, it's cut — per the project's Design Directive.
6. **Physics over tweens for personality moments.** Elastic releases, fluid simulations, gravity (Matter.js) — used sparingly, in designated playground zones.
7. **Whitespace is a feature.** Sections get `21vh`-class padding. Hairlines (1px, ~18% opacity) do the structuring, not boxes or shadows.
8. **Every page ends with an invitation.** Oversized CTA footer with a circular magnetic button — contact is one gesture away everywhere.
9. **Performance is part of beauty.** 60fps or the effect ships smaller. WebGL is budgeted per route, transforms/opacity only, heavy sims degrade gracefully on touch/low-end.
10. **Accessible by default.** `prefers-reduced-motion` collapses the motion system to opacity micro-fades; keyboard and screen-reader paths never depend on hover or cursor effects.
11. **Everything is a component.** Every UI element — down to the cursor, loader, scroll indicator, background effect, and magnetic wrapper — is an independent, reusable, composable component. No one-off inline UI anywhere. (Architecture in [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md), rules in [CODE_STYLE.md](./CODE_STYLE.md), rationale ADR-016.)
12. **Asset-driven, never asset-hardcoded.** Rohit will supply real icons/illustrations/images/video gradually. Sections are built so those drop in later with zero refactor — visuals enter through props/slots with graceful empty states; no baked-in placeholder art survives into final components (ADR-017).

---

## Part III — Design Tokens (proposed v0.1)

> ✅ **Palette status: APPROVED (2026-07-09).** Locked by project directive. Light-world values are exact. **Dark world: APPROVED as "selective dark on black"** (ADR-018) — used only for the preloader, contact/footer, and AI panel. One thing still open: the **hover/pressed blue** (`--accent-deep`) is a derived guess pending confirm.
>
> Visual character of this palette vs the reference: **cooler and higher-contrast** — pure-black `#000000` text on cool near-white `#F6F6F6` (the reference used soft charcoal on warm off-white), with a deeper, more confident royal blue `#0049CD` as the single accent punch. Reads closer to Linear/Vercel than to the warm reference.

```css
:root {
  /* -------- Color · light world (APPROVED) -------- */
  --bg:            #F6F6F6;  /* background canvas (cool near-white) */
  --surface:       #FFFFFF;  /* light surface — cards / raised sections */
  --ink:           #000000;  /* primary text (pure black) */
  --ink-2:         #9D9D9C;  /* neutral gray — secondary text / meta */
  --accent:        #0049CD;  /* primary blue — fills, selection, one punch/viewport */
  --accent-deep:   #003AA3;  /* DERIVED hover/pressed — pending confirm */
  --surface-gray:  #DADADA;  /* surface gray — wells, inactive, dividers */
  --tint:          #DADADA;  /* gray wash for section bg shifts */
  --border:        rgba(0, 0, 0, 0.14);   /* DERIVED from black */
  --border-solid:  #DADADA;

  /* -------- Color · dark world (APPROVED, selective — ADR-018) -------- */
  /* Used ONLY for the preloader, contact/footer, and AI panel. The rest of the
     site stays light. Applied via the ThemeSection data-theme="dark" wrapper. */
  --dark-bg:       #000000;  /* dark-section canvas */
  --dark-bg-2:     #0A0A0A;  /* deepest layer (menu/preloader) */
  --dark-ink:      #F6F6F6;  /* text on dark */
  --dark-ink-2:    #9D9D9C;  /* secondary text on dark */
  --dark-border:   rgba(246, 246, 246, 0.18);

  /* -------- Feedback -------- */
  --error:         #FF4444;
  --success:       #24C958;

  /* -------- Motion -------- */
  --ease:          cubic-bezier(0.7, 0, 0.3, 1);    /* master */
  --ease-bounce:   cubic-bezier(0.34, 1.5, 0.64, 1); /* playful pop-ins */
  --dur-fast:      0.3s;
  --dur-base:      0.5s;
  --dur-smooth:    0.7s;
  --dur-slow:      0.9s;

  /* -------- Space & shape -------- */
  --space-section: clamp(5em, 21vh, 12em);
  --space-container: clamp(2.5em, 8vw, 8em);
  --space-gap:     clamp(1.5em, 4vw, 2.5em);
  --container-max: 100em;
  --radius-pill:   2.125em;
  --radius-card:   1.25em;
  --hairline:      1px;

  /* -------- Z-index ladder -------- */
  --z-content: 1;  --z-nav: 100;  --z-menu: 105;
  --z-cursor: 120; --z-transition: 130; --z-preloader: 140;
}

::selection { background: var(--accent); color: #fff; }
```

**Section theming contract:** a `data-theme="dark"` attribute on any `<section>` remaps `--bg/--ink/--border` to the dark-world values. Components never reference dark tokens directly.

---

## Part IV — Typography

| Decision | Choice | Notes |
|---|---|---|
| Display + UI | **Satoshi** (Fontshare — free for commercial use) — ✅ APPROVED | The entire system runs on this one family; self-hosted woff2 |
| Weight strategy | One weight (400/450-class "Medium-Regular") + rare bold | Hierarchy from size/case/opacity |
| Variable font (Text Pressure only) | Compressa VF (ships with the ReactBits component) | Used in Playground/hero moment |
| Mono (dev logs, code, stats) | Geist Mono or JetBrains Mono | MDX code blocks, footer clock, meta labels |

Type scale = the reference scale in Part I §1.3, exposed as `--text-h1 … --text-label` custom properties. Body 16→19px fluid. Display line-height 1.05–1.065, body 1.6–1.66. Labels: `0.75rem`-class, uppercase, `+0.05em` tracking, 50% opacity.

Loading: self-hosted `woff2`, subset latin, `font-display: swap`, preload the primary weight, `size-adjust` fallback metrics to keep CLS at 0.

---

## Part V — Motion System

### Easing tokens

| Token | Value | Use |
|---|---|---|
| `--ease` / `power4.custom` | `cubic-bezier(.7,0,.3,1)` | All CSS transitions |
| `expo.out` (GSAP) | — | Content entrances, reveals |
| `power4.inOut` (GSAP) | — | Full-screen overlays, transitions |
| `power2.inOut` (GSAP) | — | Button fills, small slides |
| `elastic.out(1, 0.3)` | — | Magnetic release |
| `--ease-bounce` | `cubic-bezier(.34,1.5,.64,1)` | Pop-in UI (hamburger, chips) |
| `none/linear` | — | Marquees, scrubbed ScrollTriggers |

### Duration & stagger scale

- **0.3s** micro (hover states) · **0.5s** base UI · **0.7s** smooth panels · **0.9s** large surfaces
- **1.0–1.5s** hero entrances (`expo.out` — long tail feels fast)
- Staggers: chars `0.01`, lines/words `0.02–0.05`, blocks/cards `0.07–0.1`
- Preloader total budget ≤ 2.5s first visit, skipped on subsequent navigations (session flag)

### Scroll behavior

- **Lenis** with `lerp: 0.1`, synced to GSAP: ticker-driven `raf`, `lenis.on('scroll', ScrollTrigger.update)`
- Parallax "cast" per page: 1 background element (−2…−4), 1 midground (±1…2), text mostly static
- Marquees: linear infinite, `timeScale` flips with scroll direction (velocity-reactive)
- Scrubbed accents: arrow/badge rotations, curve collapses — `scrub: true`, `ease: none`

### Reduced motion & touch

- `prefers-reduced-motion: reduce` → preloader becomes a 300ms fade, entrances become opacity-only, marquees/parallax/scrub/fluid-sims off, smooth scroll native
- Touch / `< 768px` → magnetic off, cursor followers off, WebGL backgrounds swap to static gradients or lightweight canvas
- All motion mounts through a central `MotionProvider` that exposes `{ isTouch, isLowEnd, reducedMotion }` — components must consult it

---

## Part VI — Component Inventory & Placement Map

### ReactBits (vendored into `apps/web/src/components/vendor/reactbits/`, TS + Tailwind variant)

All slugs verified against reactbits.dev on 2026-07-09. Priority reflects Rohit's brief (`!!!` = must-ship).

| Component | Priority | Underlying tech | Planned placement (one job each) |
|---|---|---|---|
| Liquid Ether (`backgrounds/liquid-ether`) | ⭐⭐⭐ Must | Three.js fluid | **Hero background**, home only, desktop only |
| Splash Cursor (`animations/splash-cursor`) | ⭐⭐⭐ Must | WebGL fluid sim | **AI Assistant page + Playground** (not stacked with Liquid Ether — two fluid sims on one viewport = GPU + taste conflict) |
| Staggered Menu (`components/staggered-menu`) | ⭐⭐ Must | GSAP | **Global navigation overlay** |
| Flowing Menu (`components/flowing-menu`) | ⭐⭐ Must | GSAP marquee rows | **Selected Work index list** (hover = rolling preview strip) |
| Scroll Reveal (`text-animations/scroll-reveal`) | ⭐⭐ Must | GSAP ScrollTrigger | **About manifesto + case-study intro paragraphs** |
| Falling Text (`text-animations/falling-text`) | ⭐ Should | Matter.js | **404 page + skills easter egg** |
| Text Pressure (`text-animations/text-pressure`) | Should | Variable font | **Playground hero / name moment** |
| Magic Bento (`components/magic-bento`) | Should | GSAP glow/tilt | **Skills & services grid (About)** |
| Masonry (`components/masonry`) | Should | GSAP | **Dev-log / lab gallery grid** |
| Image Trail (`animations/image-trail`) | Consider | GSAP | **About header** (photo trail on mouse move) |
| Stepper (`components/stepper`) | Consider | Motion | **Contact form (multi-step) + AI onboarding** |
| Shape Blur (`animations/shape-blur`) | Consider | Three.js shader | **Section accent behind AI orb** |
| Line Sidebar (`components/line-sidebar`) | Consider | — | **Desktop section-progress rail** (thin line + markers, doubles as scroll indicator) |

**Global rule:** max **one** WebGL surface + one cursor system active per viewport. Route-level code-splitting for every vendored heavy component.

### External libraries (division of labor — see [DECISIONS.md](./DECISIONS.md))

| Library | Owns |
|---|---|
| **GSAP 3.13+ / @gsap/react** | Scroll choreography, timelines, page transitions, split-text reveals, magnetic buttons |
| **Motion 12 (`motion/react`)** | UI state micro-motion: menus, modals, form feedback, `AnimatePresence` route fade fallbacks |
| **Lenis** | Smooth scroll (the only scroll owner) |
| **Three.js + R3F 9 + drei** | Hero background scene, Playground experiments |
| **Spline** | Optional hosted 3D scene in Playground/About (evaluate weight before adopting) |
| **Matter.js** | Falling Text physics; Playground gravity toy |
| **MDX 3** | Case studies + dev logs (rich, componentized long-form) |

### Custom components to build (original work)

- `MagneticButton` (pill + circle variants, `strength`/`textStrength` props, fill-from-bottom hover, elastic release)
- `CurvedReveal` (the circular-arc section divider / transition screen)
- `Preloader` (branded, rotating role words — *original copy, not multilingual greetings*)
- `CursorFollower` (layered lerp system: dot ÷6, label ÷7, media preview ÷12)
- `SplitLines` (line-mask reveal wrapper on `SplitText`)
- `ThemeSection` (`data-theme` flip wrapper)
- `LocalTime` (footer clock, Asia/Kolkata)
- `AIVoiceOrb` (floating entry point to the assistant — reserved space, Phase 6; see [AI_PIPELINE.md](./AI_PIPELINE.md))

---

## Part VII — Page Blueprints (concept summaries)

Full IA in [FEATURES.md](./FEATURES.md). Every section below lists *concept → layout → motion* so approval can be granular.

### Home
1. **Preloader** — dark world; counter + cycling role-words; curved exit upward; ≤2.5s; runs once per session.
2. **Hero** — dark world. Oversized name (h1-scale), small tracked label row ("Full-stack developer · India"), Liquid Ether behind at low opacity, giant name marquee drifting horizontally on scroll; local-time + availability chip.
3. **Intro manifesto** — light world after a curved divider. Two-column: h4-scale statement with line-split reveal; circular magnetic "About me" CTA with parallax +2.
4. **Selected Work** — Flowing Menu list (title + role + year rows, hairline separated); cursor-following image preview on desktop; "More work ↗ (n)" pill.
5. **Strip gallery** — two horizontal parallax rows (images/videos) drifting opposite directions, videos play only in view.
6. **Contact footer** — dark world, curved entry; huge "Let's build something" h2; circular magnetic CTA; email/phone pills; Version + Local time + socials row.

### Work index & Case studies
- Index: filterable list/tiles (design/dev/AI), same Flowing Menu language.
- Case study: full-bleed hero, sticky chapter rail (Line Sidebar), MDX body with Scroll Reveal intros, image parallax, **"Ask AI about this project"** panel (Phase 6), next-project curved transition footer.

### About
- Portrait with Image Trail; manifesto via Scroll Reveal; skills/services as Magic Bento; experience timeline with scrubbed accents.

### Dev Logs
- Masonry grid of MDX posts (mono-flavored meta), each opens into clean long-form reading with code blocks.

### Playground / Lab
- The designated "physics zone": Splash Cursor active, Text Pressure headline, Matter.js toy, R3F/Spline experiments. One experiment per viewport.

### AI Assistant (Phase 6 — space reserved now)
- Persistent `AIVoiceOrb` (bottom-right, all pages, lazy-mounted). Opens a dark-world panel: waveform, live transcript, Rohit's cloned voice (ElevenLabs). Splash Cursor lives here. Route: `/ask`.

### Contact
- Stepper-based form (name → project type → message) on dark world; magnetic send; success state uses `--success` with a bounce-in check.

### 404
- Falling Text headline physics + "back home" magnetic pill.

---

## Part VIII — Performance & Accessibility Guardrails

- Budgets (details in [PERFORMANCE.md](./PERFORMANCE.md)): LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1 on mid-tier mobile; initial JS ≤ 200KB gz on `/` before lazy chunks.
- WebGL: 1 canvas per viewport, `dpr` capped at 2, paused off-screen (`IntersectionObserver`), destroyed on route leave.
- Animate only `transform`/`opacity`; `will-change` applied on interaction start, removed on end.
- Images: Cloudinary `f_auto,q_auto`, AVIF-first, exact `width/height` to hold layout.
- Focus states: 2px accent outline with offset — never removed, styled to match the system.
- Semantic landmarks; menu/panels are focus-trapped dialogs; cursor-follower content duplicated for keyboard/SR users.

---

## Part IX — Inspiration Sources (living list)

| Source | What to take from it |
|---|---|
| [dennissnellenberg.com](https://dennissnellenberg.com) | Motion grammar, token discipline (this doc) |
| [gsap.com](https://gsap.com) + showcase | Scroll choreography patterns; all plugins now free |
| [reactbits.dev](https://reactbits.dev) | Vendored component source (13 mapped above) |
| [magicui.design](https://magicui.design) | 150+ MIT React/Tailwind/Motion components — borrow micro-interaction ideas |
| [land-book.com](https://land-book.com) / [lapa.ninja](https://www.lapa.ninja) | Layout/composition surveys per section type |
| [figma.com/resource-library/color-combinations](https://www.figma.com/resource-library/color-combinations/) | Final palette selection aid |
| Awwwards / Linear / Vercel / Stripe / Apple | Typography restraint, spacing rhythm, section pacing |

---

## Part X — Approval Checklist (blockers before any UI code)

- [x] ~~Final color palette~~ — ✅ APPROVED 2026-07-09 (blue `#0049CD`, bg `#F6F6F6`, surface `#FFFFFF`, gray `#DADADA`/`#9D9D9C`, text `#000000`)
- [x] ~~Typeface decision~~ — ✅ Satoshi (free, Fontshare)
- [x] ~~Dark-world decision~~ — ✅ selective dark on `#000000` (preloader, contact/footer, AI panel only); `--dark-*` tokens final (ADR-018)
- [ ] Confirm derived `--accent-deep` (`#003AA3`) for hover/pressed, or supply exact
- [ ] Sign-off on component placement map (Part VI) — esp. Liquid Ether (hero) vs Splash Cursor (AI/Playground) separation
- [ ] Sign-off on page blueprints (Part VII)
- [ ] Preloader concept + copy (original role-words, not greetings)
- [ ] Site name/wordmark + domain
