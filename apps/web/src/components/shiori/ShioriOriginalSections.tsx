/*
 * Original Shiori website sections, transplanted from Shiori (栞)/site:
 *   index.html     .cast-field (A cast that fills the frame.), .ink (manga wall), .wall3d (gallery wall)
 *   assets/js/nagi.js  helpers (4-12), generation (43-70), motion (107-118, 124, 160-166)
 *   assets/js/gallery-data.js  copied unchanged; it sets window.SHIORI_ART exactly as on the site.
 * Bridge-only changes (see README.md): queries are scoped to each section root, the image resolver points
 * at /shiori/g/, relative gallery.html links point at the hosted gallery, and every listener, tween and
 * generated node is removed on unmount. Markup, copy, selection logic and motion values are the source's.
 */
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./gallery-data.js";
import "./shiori-original.css";

gsap.registerPlugin(ScrollTrigger);

type Art = { id: string; role: string; cut: boolean };
declare global {
  interface Window {
    SHIORI_ART?: Art[];
  }
}

const SITE = "https://shiori-dusky.vercel.app/";
const $$ = (s: string, r: ParentNode) => [...r.querySelectorAll<HTMLElement>(s)];
const EASE = "power3.out";
// One smoothing value for every scrubbed animation: the playhead eases toward the scroll position instead of snapping.
const SCRUB = 0.8;
const ART = window.SHIORI_ART || [];
const img = (id: string, size = "sm") => `/shiori/g/${id}${size ? "." + size : ""}.webp`;
// Deterministic shuffle so the page looks the same on every visit (no layout jump between reloads).
const shuffle = <T,>(list: T[], seed = 7) => list.map((v, i) => [((i + 1) * 9301 + seed * 49297) % 233280, v] as const).sort((a, b) => a[0] - b[0]).map(p => p[1]);

// The cast: cut-out figures spread across a stage, big in front and small behind.
const cutouts = shuffle(ART.filter(a => a.cut), 3).slice(0, 13);
// Manga columns: every black-and-white page, dealt into four columns.
const manga = shuffle(ART.filter(a => a.role === "manga"), 5);
// Gallery wall: 32 pieces not used elsewhere, each linking into the full gallery.
const used = new Set(["a146", "a158", "a155", "a160", "a065", "a142", "a147", "a129", "a131", "a135", "a043", "a138", "a154",
  "a134", "a144", "a012", "a140", "a149", "a136", "a132", "a157", "a102", "a130", "a103", ...cutouts.map(a => a.id), ...manga.map(a => a.id)]);
const wall = shuffle(ART.filter(a => !used.has(a.id) && a.role !== "manga"), 11).slice(0, 32);

/** The site's fonts (index.html) and Phosphor icon stylesheets, loaded once. */
function useShioriEnvironment() {
  useEffect(() => {
    [
      "https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@400;500;700&family=Zen+Maru+Gothic:wght@500;700;900&display=swap",
      "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css",
    ].forEach((href) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.append(link);
    });
  }, []);
}

/** Supporting copy rises in, as the site's generic entrance does. */
function riseIn(root: HTMLElement) {
  ScrollTrigger.batch($$("[data-rise]", root), { start: "top 88%", once: true, onEnter: els => gsap.from(els, { y: 28, opacity: 0, duration: 0.8, ease: EASE, stagger: 0.08 }) });
}

export function ShioriCastField() {
  useShioriEnvironment();
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cast = root.current!;
    const castStage = cast.querySelector<HTMLElement>("[data-cast-stage]")!;
    cutouts.forEach((a, n) => {
      const depth = [0.55, 0.75, 1][n % 3]!;
      const fig = document.createElement("figure");
      fig.className = "figure";
      fig.dataset.depth = String(depth);
      fig.style.cssText = `--h:${Math.round(depth * 88)}%; left:${(n / cutouts.length) * 92 - 2}%; z-index:${Math.round(depth * 10)}`;
      fig.innerHTML = `<img src="${img(a.id, "cut")}" alt="" loading="lazy" />`;
      castStage.append(fig);
    });

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Cast: figures rise into place, then breathe (a slow float), so the crowd feels alive but calm.
      $$(".figure", cast).forEach((f, n) => {
        gsap.from(f, { yPercent: 40, opacity: 0, duration: 1, ease: EASE, delay: (n % 6) * 0.06, scrollTrigger: { trigger: cast, start: "top 70%", once: true } });
        gsap.to(f.firstChild, { y: -10 - (n % 3) * 4, duration: 2.6 + (n % 4) * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
      riseIn(cast);
    });
    // Pointer only: the cast leans away from the cursor.
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const figs = $$(".figure", cast).map(f => ({ d: Number(f.dataset.depth), x: gsap.quickTo(f, "x", { duration: 1, ease: EASE }) }));
      const lean = (e: PointerEvent) => { const nx = e.clientX / innerWidth - 0.5; figs.forEach(f => f.x(-nx * 60 * f.d)); };
      cast.addEventListener("pointermove", lean);
      return () => cast.removeEventListener("pointermove", lean);
    });
    return () => { mm.revert(); castStage.replaceChildren(); };
  }, { scope: root });

  return (
    <section className="cast-field" data-cast ref={root}>
      <h2 data-rise>A cast that fills the frame.</h2>
      <p data-rise>Home, Profile and the empty states all carry cut-out characters, so no screen ever feels empty.</p>
      <div className="cast-field__stage" data-cast-stage></div>
    </section>
  );
}

export function ShioriMangaWall() {
  useShioriEnvironment();
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ink = root.current!;
    const inkCols = ink.querySelector<HTMLElement>("[data-ink-cols]")!;
    for (let c = 0; c < 4; c++) {
      const col = document.createElement("div");
      col.className = "ink__col";
      col.innerHTML = manga.filter((_, n) => n % 4 === c).concat(manga.filter((_, n) => n % 4 === (c + 2) % 4).slice(0, 2))
        .map(a => `<img src="${img(a.id)}" alt="" loading="lazy" />`).join("");
      inkCols.append(col);
    }

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Manga columns move against each other as you scroll: pages flipping past.
      $$(".ink__col", ink).forEach((col, n) => gsap.fromTo(col, { yPercent: n % 2 ? -18 : 4 }, { yPercent: n % 2 ? 4 : -22, ease: "none", scrollTrigger: { trigger: ink, start: "top bottom", end: "bottom top", scrub: SCRUB } }));
    });
    return () => { mm.revert(); inkCols.replaceChildren(); };
  }, { scope: root });

  return (
    <section className="ink" data-ink ref={root}>
      <div className="ink__copy">
        <h2>And the black-and-white pages.</h2>
        <p>The reader keeps manga the way it was drawn: page by page, chapter by chapter, downloaded for when the signal drops.</p>
        <a className="link" href={`${SITE}gallery.html#manga`} target="_blank" rel="noopener noreferrer">See the manga wall <i className="ph ph-arrow-right"></i></a>
      </div>
      <div className="ink__cols" data-ink-cols></div>
    </section>
  );
}

export function ShioriGalleryWall() {
  useShioriEnvironment();
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = root.current!;
    const plane = section.querySelector<HTMLElement>("[data-wall3d-plane]")!;
    plane.innerHTML = wall
      .map(a => `<a href="${SITE}gallery.html#${a.id}" target="_blank" rel="noopener noreferrer" aria-label="Open in the gallery"><img src="${img(a.id)}" alt="" loading="lazy" /></a>`).join("");

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Gallery wall lies back on the table, then stands up to face you as you arrive.
      gsap.fromTo(plane, { rotateX: 48, scale: 0.9, y: 80 }, { rotateX: 8, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: section, start: "top 90%", end: "center 55%", scrub: SCRUB } });
      ScrollTrigger.batch($$("a", plane), { start: "top 95%", once: true, onEnter: els => gsap.from(els, { opacity: 0, y: 28, duration: 0.8, stagger: 0.025, ease: EASE }) });
    });
    // Pointer only: the button is magnetic.
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups = $$("[data-magnet]", section).map(el => {
        const x = gsap.quickTo(el, "x", { duration: 0.4, ease: EASE }), y = gsap.quickTo(el, "y", { duration: 0.4, ease: EASE });
        const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * 0.25); y((e.clientY - r.top - r.height / 2) * 0.35); };
        const leave = () => { x(0); y(0); };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
      });
      return () => cleanups.forEach(fn => fn());
    });
    return () => { mm.revert(); plane.replaceChildren(); };
  }, { scope: root });

  return (
    <section className="wall3d" data-wall3d ref={root}>
      <div className="wall3d__copy">
        <h2>A hundred and sixty-nine stills.</h2>
        <p>The art behind both worlds, in one place.</p>
        <a className="btn btn--primary" data-magnet href={`${SITE}gallery.html`} target="_blank" rel="noopener noreferrer"><i className="ph ph-images-square"></i>Open the gallery</a>
      </div>
      <div className="wall3d__plane" data-wall3d-plane></div>
    </section>
  );
}
