import { useEffect, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/nav/Navbar";
import { Preloader } from "@/components/motion/Preloader";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { CaseFlow } from "@/components/CaseFlow/CaseFlow";
import { ShioriCastField, ShioriGalleryWall, ShioriMangaWall } from "@/components/shiori/ShioriOriginalSections";
import { Footer } from "@/sections/Footer/Footer";
import { projects } from "@/data/projects";
import { nextCase } from "@/data/projectRegistry";
import { caseStudy } from "@/data/projectEntries/shiori";
// Current app screens, copied unchanged from Shiori (栞)/site/assets/shots.
import discover from "@/assets/Shiori (栞)/portfolio/screens/discover-nagi.webp";
import homeNagi from "@/assets/Shiori (栞)/portfolio/screens/home-nagi.webp";
import homeRanbu from "@/assets/Shiori (栞)/portfolio/screens/home-ranbu.webp";
import entry from "@/assets/Shiori (栞)/portfolio/screens/entry.webp";
import downloads from "@/assets/Shiori (栞)/portfolio/screens/downloads.webp";
import autoDownloader from "@/assets/Shiori (栞)/portfolio/screens/auto-downloader.webp";
import mangaNagi from "@/assets/Shiori (栞)/portfolio/screens/manga-nagi.webp";
import mangaRanbu from "@/assets/Shiori (栞)/portfolio/screens/manga-ranbu.webp";
import sidebar from "@/assets/Shiori (栞)/portfolio/screens/sidebar.webp";
import search from "@/assets/Shiori (栞)/portfolio/screens/search.webp";
import schedule from "@/assets/Shiori (栞)/portfolio/screens/schedule.webp";
import settings from "@/assets/Shiori (栞)/portfolio/screens/settings.webp";
import mobileNagi from "@/assets/Shiori (栞)/portfolio/screens/mobile-nagi.webp";
import mobileRanbu from "@/assets/Shiori (栞)/portfolio/screens/mobile-ranbu.webp";
// Stills from the Shiori website's hero.
import torii from "@/assets/Shiori (栞)/portfolio/art/h1.webp";
import skyward from "@/assets/Shiori (栞)/portfolio/art/h4.webp";
import cityLights from "@/assets/Shiori (栞)/portfolio/art/h3.webp";
// Captures of the Shiori website.
import siteHero from "@/assets/Shiori (栞)/site-hero.webp";
import siteWorlds from "@/assets/Shiori (栞)/site-worlds.webp";
import siteTour from "@/assets/Shiori (栞)/site-tour.webp";
import sitePop from "@/assets/Shiori (栞)/site-pop.webp";
import "./ProjectPage.css";
import "./ShioriProjectPage.css";

gsap.registerPlugin(ScrollTrigger);

function Chapter({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <>
      <span className="dw-kicker">{number}</span>
      <h2 className="dw-heading-lg">{title}</h2>
      <p className="dw-body-lg">{children}</p>
    </>
  );
}

function Shot({ src, alt, w = 1440, h = 900 }: { src: string; alt: string; w?: number; h?: number }) {
  return (
    <div className="dw-media-container">
      <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="media-natural" />
    </div>
  );
}

function Band({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="dw-media-container shiori-band">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

export default function ShioriProjectPage() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);
  const next = nextCase(projects, "shiori");

  useEffect(() => {
    const before = document.title;
    document.title = "Shiori (栞) — Rohit Maity";
    return () => { document.title = before; };
  }, []);

  // Portfolio motion: the hero title, section copy, and the standard image parallax. Nothing else.
  useGSAP(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(".dw-hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>(".dw-case-study .dw-media-container img").forEach((img) => {
      gsap.fromTo(img, { yPercent: -8, scale: 1.05 }, {
        yPercent: 8, scale: 1, ease: "none",
        scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    gsap.utils.toArray<HTMLElement>(".dw-case-study .dw-section").forEach((sec) => {
      const parts = sec.querySelectorAll(".dw-kicker, .dw-heading-lg, .dw-conclusion-lead, .dw-body-lg, .dw-body-muted, .dw-decision-item, .dw-arch-card");
      if (!parts.length) return;
      gsap.fromTo(parts, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: sec, start: "top 82%", toggleActions: "play none none reverse" },
      });
    });
  }, { scope: root });

  // Late images and web fonts change heights; re-measure the triggers once they land.
  useEffect(() => {
    let alive = true;
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { if (alive) ScrollTrigger.refresh(); });
    };
    const images = root.current?.querySelectorAll("img");
    images?.forEach((img) => img.addEventListener("load", refresh));
    document.fonts.ready.then(() => { if (alive) refresh(); });
    return () => { alive = false; cancelAnimationFrame(frame); images?.forEach((img) => img.removeEventListener("load", refresh)); };
  }, []);

  return <>
    <Preloader text="Shiori (栞)" />
    <Navbar />
    <main className="shiori-page" ref={root}>
      <div className="dw-case-study shiori-case">
        <section className="dw-section container" style={{ paddingBottom: "2rem" }}>
          <span className="dw-kicker">01 — A private anime &amp; manga hub</span>
          <h1 className="dw-hero-title">Shiori (栞)</h1>
          <p className="dw-hero-tagline">{caseStudy.tagline}</p>
          <p className="dw-body-lg" style={{ marginTop: "-1.5rem" }}>
            Stream, download, read and track from one program on your own computer. No ads, no
            pop-ups and no Shiori (栞) account.
          </p>
        </section>

        <section className="container" style={{ position: "relative", marginBottom: "4rem" }}>
          <span className="footer-stripe" />
          <div className="footer-cta-row">
            <div className="footer-contacts">
              <a className="footer-pill magnetic" data-strength="24" href={caseStudy.github} target="_blank" rel="noopener noreferrer">
                <span>GitHub Repository ↗</span>
              </a>
            </div>
            {caseStudy.live && (
              <a className="footer-round magnetic" data-strength="42" href={caseStudy.live} target="_blank" rel="noopener noreferrer">
                <span className="footer-round-label">Live site</span>
                <span className="footer-round-arrow">
                  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
                    <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>
            )}
          </div>
          <p className="dw-body-muted shiori-live-note">The live site is Shiori (栞)'s website. The app itself runs locally on your computer.</p>
        </section>

        <section className="container dw-meta-section" aria-label="Project details">
          <div className="dw-meta-grid-3col">
            {[["Role", "Interface, integration & packaging"], ["Architecture", "React client · Go / Echo · SQLite"], ["Year", "2026"]].map(([label, value]) => (
              <div className="dw-meta-col" key={label}>
                <span className="dw-meta-label">{label}</span>
                <span className="dw-meta-stripe" />
                <p className="dw-meta-val">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <Band src={torii} alt="A red torii gate on a grassy mountain under drifting clouds, a still from Shiori (栞)'s website hero" />

        <section className="dw-section container">
          <Shot src={discover} alt="Shiori (栞)'s Discover page in the calm Nagi theme, with trending anime and banner art" />
        </section>

        <section className="dw-section container">
          <Chapter number="02 — Your own bookmark" title="One program. Your computer.">
            Shiori (栞) is a personal build of the open-source media server Seanime, with its own
            interface, security layer and website. You run it and open it in your browser. It hosts
            no media and there is no Shiori (栞) account: your copy, your password, your folders.
          </Chapter>
        </section>

        <section className="dw-section container">
          <Chapter number="03 — Two worlds" title="Nagi and Ranbu. One switch.">
            凪 Nagi is calm, like the credits after the last episode. 乱舞 Ranbu is loud, a konbini
            poster wall at midnight. Both share the same navigation and behaviour, so changing the
            mood never changes where things are.
          </Chapter>
          <div className="dw-media-grid-2col" style={{ marginTop: "3rem" }}>
            <Shot src={homeNagi} alt="Shiori (栞) home in the Nagi theme: soft sky colours and continue-watching rows" />
            <Shot src={homeRanbu} alt="Shiori (栞) home in the Ranbu theme: bold poster colours and the same layout" />
          </div>
        </section>
      </div>

      <div className="shiori-original"><ShioriCastField /></div>

      <div className="dw-case-study shiori-case">
        <section className="dw-section container">
          <span className="dw-kicker">04 — Watch or keep</span>
          <div className="dw-split-layout shiori-split">
            <div className="shiori-tall"><Shot src={entry} alt="An anime page that opens on Watch online, with a download button for every episode" w={1440} h={1500} /></div>
            <div>
              <h2 className="dw-heading-lg">Stream it. Or keep it.</h2>
              <div className="dw-decisions-list">
                <div className="dw-decision-item">
                  <span className="dw-decision-num">01</span>
                  <h3 className="dw-decision-title">Watch online</h3>
                  <p className="dw-decision-body">Anime pages open on the player. If a streaming source fails, Shiori (栞) moves to the next one on its own.</p>
                </div>
                <div className="dw-decision-item">
                  <span className="dw-decision-num">02</span>
                  <h3 className="dw-decision-title">Download</h3>
                  <p className="dw-decision-body">Every episode has its own download button, and finished seasons come as one batch torrent.</p>
                </div>
                <div className="dw-decision-item">
                  <span className="dw-decision-num">03</span>
                  <h3 className="dw-decision-title">Auto downloader</h3>
                  <p className="dw-decision-body">Write a rule once: show, resolution, release group. New episodes are checked every 20 minutes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dw-media-grid-2col" style={{ marginTop: "clamp(3rem, 8vh, 5rem)" }}>
            <Shot src={downloads} alt="The Downloads page of Shiori (栞)'s built-in torrent client" />
            <Shot src={autoDownloader} alt="Auto downloader rules for new episodes" />
          </div>
        </section>

        <section className="dw-section container">
          <Chapter number="05 — Manga beside anime" title="And the manga, right next to it.">
            Read manga, manhwa and manhua in the built-in reader, and download chapters for later.
            The library sits beside the anime, in both worlds.
          </Chapter>
          <div className="dw-media-grid-2col" style={{ marginTop: "3rem" }}>
            <Shot src={mangaNagi} alt="The Manga page with trending titles in the Nagi theme" />
            <Shot src={mangaRanbu} alt="The Manga page in the Ranbu theme" />
          </div>
        </section>
      </div>

      <div className="shiori-original"><ShioriMangaWall /></div>

      <div className="dw-case-study shiori-case">
        <section className="dw-section container">
          <Chapter number="06 — A finished environment" title="Everything in one calm place.">
            One expandable sidebar, search by title, genre, season or format, an airing schedule and
            settings that stay readable. On a phone it opens through Tailscale or from the home
            screen.
          </Chapter>
          <div className="dw-media-grid-2col" style={{ marginTop: "3rem" }}>
            <Shot src={sidebar} alt="Shiori (栞)'s expandable sidebar navigation" />
            <Shot src={search} alt="Search by title, genre, season or format" />
            <Shot src={schedule} alt="The airing schedule" />
            <Shot src={settings} alt="Settings for the library, client and sources" />
          </div>
          <div className="dw-media-grid-2col shiori-phones">
            <Shot src={mobileNagi} alt="Shiori (栞) on a phone in the Nagi theme" w={390} h={844} />
            <Shot src={mobileRanbu} alt="Shiori (栞) on a phone in the Ranbu theme" w={390} h={844} />
          </div>
        </section>

        <section className="dw-section dw-section-under-hood">
          <div className="container">
            <span className="dw-kicker">07 — Under the hood</span>
            <h2 className="dw-heading-lg">A local server. A browser client.</h2>
            <p className="dw-body-lg" style={{ maxWidth: "68ch" }}>
              The app is one program: a Go server with a React client, a local database and the
              providers you install. The website is built separately and only points the way in.
            </p>
            <CaseFlow lanes={[
              { name: "The app", steps: ["React 19 client: TanStack Router, Query, Jotai", "Go / Echo API and WebSocket events", "SQLite through GORM: library, settings, rules", "Extensions, AniList, torrent client, debrid"] },
              { name: "The website", steps: ["Static HTML and CSS", "GSAP motion, gated by reduced motion", "Docs, gallery and legal pages", "Download for Windows"] },
            ]} />
            <div className="dw-arch-grid" style={{ marginTop: "3rem" }}>
              <div className="dw-arch-card">
                <div><span className="dw-arch-card-tag">CLIENT</span><h3>React 19 · Rsbuild</h3><p>TanStack Router and Query, Jotai state and Tailwind, for both themes.</p></div>
                <span className="dw-body-muted">Runs in your browser</span>
              </div>
              <div className="dw-arch-card">
                <div><span className="dw-arch-card-tag">SERVER</span><h3>Go · Echo · SQLite</h3><p>Library, downloads, rules and background events, on your own machine.</p></div>
                <span className="dw-body-muted">localhost:43000</span>
              </div>
              <div className="dw-arch-card">
                <div><span className="dw-arch-card-tag">WEBSITE</span><h3>HTML · CSS · GSAP</h3><p>No build step. Hosted separately on Vercel.</p></div>
                <span className="dw-body-muted">shiori-dusky.vercel.app</span>
              </div>
            </div>
          </div>
        </section>

        <section className="dw-section container">
          <span className="dw-kicker">08 — What I built</span>
          <h2 className="dw-heading-lg">On top of Seanime. In my own direction.</h2>
          <div className="dw-decisions-list">
            <div className="dw-decision-item">
              <span className="dw-decision-num">01</span>
              <h3 className="dw-decision-title">An interface of its own</h3>
              <p className="dw-decision-body">Two complete themes, cut-out characters in empty states, a single sidebar and a calmer reading rhythm across every page.</p>
            </div>
            <div className="dw-decision-item">
              <span className="dw-decision-num">02</span>
              <h3 className="dw-decision-title">Watching first</h3>
              <p className="dw-decision-body">Anime pages open on the player with automatic source fallback, and downloading is one button per episode or one batch per season.</p>
            </div>
            <div className="dw-decision-item">
              <span className="dw-decision-num">03</span>
              <h3 className="dw-decision-title">Private by default</h3>
              <p className="dw-decision-body">A server password from the environment, constant-time token checks, a five-minute lockout after ten wrong tries, per-IP rate limiting, strict headers and sanitised plugin icons.</p>
            </div>
            <div className="dw-decision-item">
              <span className="dw-decision-num">04</span>
              <h3 className="dw-decision-title">Running in five minutes</h3>
              <p className="dw-decision-body">A Windows zip with a start script, a password in one file, and an in-app guide.</p>
            </div>
          </div>
          <p className="dw-body-muted shiori-credit">
            Built on Seanime by 5rahim, licensed GPL-3.0; Shiori (栞)'s app changes are GPL-3.0 as well.
            Anime and manga titles, characters and artwork belong to their creators.
          </p>
        </section>

        <Band src={skyward} alt="An anime girl in a pink jacket with her arms open to a bright blue sky, a still from Shiori (栞)'s website" />

        <section className="dw-section container">
          <Chapter number="09 — A website with its own craft" title="The way in, built by hand.">
            The site is plain HTML, CSS and GSAP: a calm flagship page, a loud Pop version, a gallery
            of 169 stills and the install guide. The next two sections are its original code, running
            here as they do on the site.
          </Chapter>
          <div className="dw-media-grid-2col" style={{ marginTop: "3rem" }}>
            <Shot src={siteHero} alt="The Shiori (栞) website hero: Your anime, kept like a bookmark" />
            <Shot src={siteWorlds} alt="The website's Two worlds section, wiping Nagi into Ranbu" />
            <Shot src={siteTour} alt="The website's tour, panning sideways across app screens" />
            <Shot src={sitePop} alt="The Ranbu Pop version of the website" />
          </div>
        </section>
      </div>

      <div className="shiori-original"><ShioriGalleryWall /></div>

      <div className="dw-case-study shiori-case">
        <section className="dw-section container">
          <span className="dw-kicker">10 — The point</span>
          <h2 className="dw-conclusion-lead">
            YOUR ANIME.
            <br />
            <span className="dw-conclusion-accent">KEPT LIKE A BOOKMARK.</span>
          </h2>
          <p className="dw-body-lg">
            Shiori (栞) is a personal media environment: one place for the shows and pages you love, on
            your own machine, dressed in two moods. The parts that matter most are the quiet ones:
            nothing to sign up for, nothing uploaded, and a page that opens where you left off.
          </p>
        </section>
        <Band src={cityLights} alt="A girl looking over a city of warm lights at dusk, a still from Shiori (栞)'s website" />
      </div>
    </main>
    <Footer nextProject={next ? { title: next.title, slug: next.slug, image: next.nextCaseImage ?? next.images[0], role: next.role } : undefined} />
  </>;
}
