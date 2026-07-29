# Plan — Dedicated Project Pages

> Status: **awaiting Rohit's approval**. Nothing in here is built yet.
> Scope: individual case-study pages for each project, reachable from the Work
> list / `/work`. Built to the same design language as the home page, referencing
> dennissnellenberg.com case studies. Designed to scale to many more projects
> (dev + Notion interactive-database projects) with zero structural changes.

---

## 1. Goals

- A **detailed, visually rich case-study page per project** at `/work/<slug>`.
- **Every effect we already have, reused** (borrowed, not rewritten): preloader
  intro, page-transition curtain, ScrollReveal, magnetic fields, curved reveals,
  cursor-follow, marquees, buttery hover.
- **Data-driven & extensible** — adding a project (or a *type* of project, e.g. a
  Notion interactive DB) = adding a data entry, no new page code.
- **Visually appealing**, on-palette (blue `#0049CD`, dark-world `#000`), Satoshi.

---

## 2. Architecture

### Routing
- `/work/:slug` → single `ProjectPage` component, data resolved from the slug.
- Unknown slug → 404 placeholder (already exists).
- Wire the Work list rows (`HoverRevealList`) + `/work` Flowing Menu items to
  link to `/work/<slug>` instead of `#`.
- "Next project" link at the bottom of each page → curved page transition.

### Data model (extensible) — `src/data/projects.ts` (extended)
```ts
interface Project {
  slug; title; tagline;            // hero
  type: "web-app" | "dev-tool" | "notion-db" | ...;  // future-proof
  role; year; timeline; status;    // meta row
  stack: string[];                 // tech chips
  links: { live?; github?; ... };
  hero: image;                     // full-bleed hero
  overview: string;                // intro paragraph(s)
  highlights: { title; body }[];   // "what it does" feature blocks
  gallery: { src; label }[];       // parallax image set (auto-globbed per project folder)
  metrics?: { value; label }[];    // e.g. "13,311 objects", "8-way video"
  accent?: string;                 // optional per-project accent
}
```
Gallery images already auto-glob per folder (`assets/<Project>/…`) — same pattern
as the SkyGuide gallery, so each project's images are picked up automatically.

For **Notion interactive-DB projects later**: same schema, `type: "notion-db"`,
plus an optional `embed` block (iframe/live embed) rendered by a dedicated
highlight variant. No new page needed.

---

## 3. Page anatomy (per section → effect)

1. **Preloader** (borrowed) — plays on direct load; page-transition curtain on nav.
2. **Hero** — full-bleed project image + oversized title + tagline.
   - ScrollReveal on the tagline; title mask-reveal (borrow navbar's masked rise);
     hero image subtle scale/parallax on scroll.
3. **Meta bar** — Role · Year · Timeline · Status · Live/GitHub links (magnetic
   pills, same as footer). Sticky-ish on desktop.
4. **Overview** — large ScrollReveal paragraph (like About statement).
5. **Metrics row** — big animated count-up numbers (e.g. "13,311 objects").
6. **Highlights** — alternating image/text blocks; images parallax on scroll,
   text ScrollReveals in. Cursor-follow accent on hovered media.
7. **Gallery** — the project's screens: reuse the 2-row opposite-drift marquee
   **or** a curved-reveal stacked set (curtain peels up, like the home gallery).
   White-matted square cards, buttery hover, captions.
8. **Tech stack** — chip marquee (borrow About's tech marquee).
9. **Next project** — big magnetic link → `/work/<next-slug>` with the curved
   page transition showing the next project's name.
10. **Footer** (shared).

---

## 4. Effects inventory (all reused / borrowed)

| Effect | Source component | Used for |
|---|---|---|
| Curtain intro | `Preloader` / `PageTransition` | page load + nav |
| Curved reveal | `CurveSwipe` / `useCurveSwipe` | hero + gallery reveals |
| Word reveal | `ScrollReveal` | tagline, overview |
| Magnetic | `useMagnetic` | pills, links, next-project |
| Cursor-follow | `HoverRevealList` pattern | highlight media |
| Marquee | Gallery / About | gallery + tech chips |
| Count-up | **new tiny hook** `useCountUp` (ScrollTrigger) | metrics |
| Parallax | ScrollTrigger scrub | hero + highlight images |

Only genuinely-new pieces: `useCountUp` (small) + the `ProjectPage` layout. If
approved, I can add **Lenis** (smooth scroll — already in the stack) to make all
scroll-scrubbed effects buttery, matching Dennis.

---

## 5. Third-party services (proposed, ask before adding)
- **Lenis** — smooth scroll (in stack already; big feel upgrade). Recommended.
- **Cloudinary** (later) — optimized image/video delivery; for now local assets.
- Optional: **Spline** hero embed for a project (SkyGuide already has a robot slot).
- No analytics/marketing SDKs.

---

## 6. Per-project content (from repos)

**SkyGuide AI** — *"I have a telescope. What should I look at right now — and how do I
point at it?"* Real-time celestial matchmaking + telescope alignment.
React 19 · Express 5 · FastAPI/Astropy · MongoDB Atlas. Highlights: AI assistant
"Astro", 0–100 target scoring + live visibility, phone-as-instrument alignment,
13,311-object catalog, community map (privacy-safe ~40 km cells), gallery of nights.
Assets: `assets/skyguide/*` (already present, ~24 screens).

**Neuron** — *"Search beyond words."* Multimodal search (text+image+audio+video → one
CLIP vector) + document chat with citations. FastAPI · React 19 · CLIP · Whisper ·
BLIP · FAISS · MongoDB. Highlights: fused multimodal query, visual re-ranking,
per-result relevance analysis, grounded document chat, lazy ML + graceful
degradation. Assets: `assets/Neuron/gallery/*` (5 screens).

**Yapchat** — Private code-based chat rooms: voice notes, photos, P2P group video (up
to 8), screen share, live emoji. MERN · Socket.IO · WebRTC. Assets:
`assets/Yap chat/*` (+ `videocall.png` in the repo — I'd copy it in).

**Forcaster** — *"Feel the forecast."* Glassmorphism weather app. React (Vite) ·
Tailwind · OpenWeather · Axios. Current/5-day/hourly, theme-aware visuals,
expandable cards. Assets: `assets/Forcaster/*` (5 Figma designs, just added).

> Some case-study copy will be **drafted by me from the READMEs**; you edit/replace.
> Live/GitHub links: GitHub repos known; **live demo URLs — need them from you**.

---

## 7. Build phases (after approval)
1. Extend `projects.ts` schema + per-project data + `/work/:slug` route.
2. Build `ProjectPage` + section components (hero, meta, metrics, highlights,
   gallery, tech, next-project) — all reusing existing effects.
3. Add `useCountUp`; optionally wire **Lenis**.
4. Link Work list + `/work` items to the pages.
5. Copy remaining project images into `assets/<Project>/` folders.
6. Verify structure/typecheck; you review the feel in-browser.

---

## 8. Decisions I need from you
1. **Approve the page anatomy** (section list in §3)?
2. **Add Lenis** smooth scroll? (recommended)
3. **Live demo URLs** for each project (or mark "private/coming soon")?
4. Gallery style per project: **2-row marquee** vs **curved-reveal stack** — one
   default, or per-project?
5. OK for me to **draft case-study copy** from the READMEs (you edit later)?
