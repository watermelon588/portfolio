import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { GLOBAL_LINKS } from "@/data/links";
import {
  FeatureShowcase,
  type ShowcaseItem,
} from "@/components/FeatureShowcase/FeatureShowcase";

// Root asset imports
import forecast01 from "@/assets/forcaster/01-forecast.jpg";
import hourly02 from "@/assets/forcaster/02-hourly.jpg";
import details03 from "@/assets/forcaster/03-details.jpg";
import cities04 from "@/assets/forcaster/04-cities.jpg";
import map05 from "@/assets/forcaster/05-map.jpg";
import frame509 from "@/assets/forcaster/Frame 509.png";
import forcaster1 from "@/assets/forcaster/forcaster1.png";
import forcaster2 from "@/assets/forcaster/forcaster2.png";
import forcaster3 from "@/assets/forcaster/forcaster3.png";
import forcaster4 from "@/assets/forcaster/forcaster4.png";
import forcaster5 from "@/assets/forcaster/forcaster5.png";

// Gallery folder imports
import forcasterHero from "@/assets/forcaster/gallery/forcasterHero.png";
import theme0 from "@/assets/forcaster/gallery/theme0.jpg";
import theme1 from "@/assets/forcaster/gallery/theme1.jpg";
import theme2 from "@/assets/forcaster/gallery/theme2.jpg";
import theme3 from "@/assets/forcaster/gallery/theme3.jpg";
import theme4 from "@/assets/forcaster/gallery/theme0.jpg";
import theme5 from "@/assets/forcaster/gallery/forcaster2.png";
import theme6 from "@/assets/forcaster/gallery/forcaster1.png";
import theme7 from "@/assets/forcaster/gallery/forcaster5.png";
import galForcaster3 from "@/assets/forcaster/gallery/forcaster3.png";
import galForcaster4 from "@/assets/forcaster/gallery/forcaster4.png";

// Visual folder imports
import visImg1 from "@/assets/forcaster/visual/img1.jpg";
import visImg2 from "@/assets/forcaster/visual/img2.jpg";
import visImg3 from "@/assets/forcaster/visual/img3.jpg";
import visImg4 from "@/assets/forcaster/visual/img4.jpg";
import visImg5 from "@/assets/forcaster/visual/img5.jpg";
import visImg6 from "@/assets/forcaster/visual/img6.jpg";
import visImg7 from "@/assets/forcaster/visual/img7.jpg";
import visImg8 from "@/assets/forcaster/visual/img8.jpg";
import visHash1 from "@/assets/forcaster/visual/0df1f202c924291102ea4de7fc876383.jpg";
import visHash2 from "@/assets/forcaster/visual/233b6d5f1c74d7c6b7922c2da95f68cc.jpg";
import visHash3 from "@/assets/forcaster/visual/5816b437b3ab642892bb7a2c44b44cb1.jpg";
import visTheme0 from "@/assets/forcaster/visual/theme0.jpg";
import visTheme1 from "@/assets/forcaster/visual/theme1.jpg";
import visTheme2 from "@/assets/forcaster/visual/theme2.jpg";
import visTheme3 from "@/assets/forcaster/visual/theme3.jpg";

export const forcasterGalleryImages = [
  forcasterHero,
  forecast01,
  hourly02,
  details03,
  cities04,
  map05,
  frame509,
  forcaster1,
  forcaster2,
  forcaster3,
  forcaster4,
  forcaster5,
  theme0,
  theme1,
  theme2,
  theme3,
  theme4,
  theme5,
  theme6,
  theme7,
  galForcaster3,
  galForcaster4,
  visImg1,
  visImg2,
  visImg3,
  visImg4,
  visImg5,
  visImg6,
  visImg7,
  visImg8,
  visHash1,
  visHash2,
  visHash3,
  visTheme0,
  visTheme1,
  visTheme2,
  visTheme3,
];

import "./ProjectPage.css";
import "./ForcasterProjectPage.css";

gsap.registerPlugin(ScrollTrigger);

export const forcasterShowcaseItems: ShowcaseItem[] = [
  {
    image: theme1,
    title: "Everything Important at a Glance",
    tag: "FEATURE 01",
    description:
      "Temperature, RealFeel, humidity, pressure, wind, visibility, and daily extremes without the usual dashboard clutter.",
    objectPosition: "center top",
  },
  {
    image: theme4,
    title: "Five Days, Without the Spreadsheet",
    tag: "FEATURE 02",
    description:
      "Expandable daily forecasts reveal morning, afternoon, evening, and night conditions only when you need them.",
    objectPosition: "center top",
  },
  {
    image: theme2,
    title: "See What Changes Next",
    tag: "FEATURE 03",
    description:
      "A focused 24-hour view with expandable hourly details and smooth interactions.",
    objectPosition: "center top",
  },
  {
    image: theme3,
    title: "Global City Search & Favorites",
    tag: "FEATURE 04",
    description:
      "Instant city search with persistent location bookmarking and fast weather switching.",
    objectPosition: "center top",
  },
];

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17 17 7M8 7h9v9"
      />
    </svg>
  );
}

export function ForcasterProjectPage() {
  const slug = "forcaster";
  const project = projects.find((p) => p.slug === slug);
  const cs = caseStudies[slug] ?? {
    github: GLOBAL_LINKS.projects.forcastr,
    live: GLOBAL_LINKS.live.forcastr,
  };

  const root = useRef<HTMLElement>(null);
  useMagnetic(root, [slug]);

  // Next project logic for closing section / footer transition
  const dev = projects.filter((p) => p.category === "dev");
  const idx = dev.findIndex((p) => p.slug === slug);
  const nextProjectObj = dev.length
    ? (dev[(Math.max(0, idx) + 1) % dev.length] ?? dev[0])
    : project;

  const nextProjectForFooter = nextProjectObj
    ? {
        title: nextProjectObj.title,
        slug: nextProjectObj.slug,
        image: nextProjectObj.images[0],
        role: nextProjectObj.role,
      }
    : undefined;

  // Master GSAP Parallax & Reveal Animations
  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce || !root.current) return;

      const created: Array<ScrollTrigger | undefined> = [];

      // 1. Hero Text Fade + Reveal
      const heroTitle = root.current.querySelector(".dw-hero-title");
      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
        );
      }

      // 2. Parallax on ALL Media Elements & Image Containers
      const parallaxImgs = gsap.utils.toArray<HTMLElement>(
        ".dw-media-img, .media-portrait, .media-portrait-full, .media-landscape, .media-square, .media-natural, .forcaster-hero-img, .forcaster-natural-img, .forcaster-wide-img, .forcaster-fullwidth-overlap-img, .forcaster-fullbleed-img, .forcaster-eng-img, .forcaster-theme-img, .dw-media-container img",
      );
      parallaxImgs.forEach((img) => {
        const frame =
          img.closest(".dw-media-container") ||
          img.closest(".forcaster-hero-img-wrap") ||
          img.closest(".forcaster-fullwidth-overlap-container") ||
          img.closest(".forcaster-fullbleed-img-wrap") ||
          img.closest(".forcaster-eng-media-container") ||
          img.closest(".forcaster-theme-item") ||
          img.parentElement;

        if (!frame) return;

        const tw = gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.05 },
          {
            yPercent: 8,
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        created.push(tw.scrollTrigger);
      });

      // 3. Comprehensive Section Kickers, Headings, Text Blocks, and Cards Reveal Animation
      const sections = gsap.utils.toArray<HTMLElement>(".dw-section");
      sections.forEach((sec) => {
        const kicker = sec.querySelector(".dw-kicker");
        const heading = sec.querySelector(
          ".dw-heading-lg, .dw-heading-md, .dw-scale-number, .dw-conclusion-lead, .dw-hero-title",
        );
        const textBlocks = sec.querySelectorAll(
          ".dw-body-lg, .dw-body-muted, .dw-hero-tagline, .forcaster-hero-video-subtext",
        );
        const cards = sec.querySelectorAll(
          ".dw-arch-card, .dw-stat-card, .dw-decision-item, .forcaster-stat-item",
        );

        if (kicker || heading || textBlocks.length > 0 || cards.length > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });

          if (kicker) {
            tl.fromTo(
              kicker,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            );
          }
          if (heading) {
            tl.fromTo(
              heading,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              kicker ? "-=0.4" : 0,
            );
          }
          if (textBlocks.length > 0) {
            tl.fromTo(
              textBlocks,
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
              },
              "-=0.5",
            );
          }
          if (cards.length > 0) {
            tl.fromTo(
              cards,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.4",
            );
          }
          created.push(tl.scrollTrigger);
        }
      });

      return () => {
        created.forEach((t) => t?.kill());
      };
    },
    { scope: root, dependencies: [slug] },
  );

  return (
    <>
      <Preloader text="FORCASTR" />
      <Navbar />

      <main className="dw-case-study" ref={root}>
        {/* 01 — HERO / PROJECT IDENTITY */}
        <section
          className="dw-section container"
          style={{ paddingBottom: "2rem" }}
        >
          <span className="dw-kicker">01 — ATMOSPHERIC WEATHER EXPERIENCE</span>
          <h1 className="dw-hero-title">FORCASTR</h1>
          <p className="dw-hero-tagline">Feel the forecast.</p>
          <p className="dw-body-lg" style={{ marginTop: "-1.5rem" }}>
            A calm, visual weather experience designed to make forecasts feel
            less like data and more like an atmosphere.
          </p>
        </section>

        {/* DIVIDER AND BUTTONS */}
        <section
          className="container"
          style={{ position: "relative", marginBottom: "4rem" }}
        >
          <span className="footer-stripe" />
          <div className="footer-cta-row">
            <div className="footer-contacts">
              {cs?.github && (
                <a
                  className="footer-pill magnetic"
                  data-strength="24"
                  href={cs.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub Repository ↗</span>
                </a>
              )}
            </div>

            {cs?.live && (
              <a
                className="footer-round magnetic"
                data-strength="42"
                href={cs.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer-round-label">Live site</span>
                <span className="footer-round-arrow">
                  <ArrowUpRight />
                </span>
              </a>
            )}
          </div>
        </section>

        {/* METADATA GRID */}
        <section className="container dw-meta-section">
          <div className="dw-meta-grid-3col">
            <div className="dw-meta-col">
              <span className="dw-meta-label">ROLE</span>
              <span className="dw-meta-stripe" />
              <p className="dw-meta-val">Weather App / Frontend Design</p>
            </div>
            <div className="dw-meta-col">
              <span className="dw-meta-label">STACK</span>
              <span className="dw-meta-stripe" />
              <p className="dw-meta-val">
                React · Vite · Tailwind · OpenWeather
              </p>
            </div>
            <div className="dw-meta-col">
              <span className="dw-meta-label">YEAR</span>
              <span className="dw-meta-stripe" />
              <p className="dw-meta-val">2025</p>
            </div>
          </div>
        </section>

        {/* 02 — HERO VISUAL */}
        <section
          className="dw-section dw-preview-section"
          style={{ paddingInline: 0, paddingBottom: "clamp(5rem, 10vh, 9rem)" }}
        >
          <div className="forcaster-hero-video-wrap">
            <img
              src={visImg3}
              alt="FORCASTR Atmosphere Interface Preview"
              className="forcaster-hero-video"
            />
            <div className="forcaster-hero-video-overlay" />
            <div className="forcaster-hero-video-content">
              <div className="dw-media-catchphrase">✦ FEEL THE FORECAST</div>
              <p className="forcaster-hero-video-subtext">
                Current conditions, 5-day forecasts and hourly weather united in
                one calm atmosphere.
              </p>
            </div>
          </div>
        </section>

        {/* 03 — THE APPROACH */}
        <section className="dw-section container">
          <span className="dw-kicker">02 — THE APPROACH</span>
          <h2 className="dw-heading-lg">WEATHER, WITHOUT THE NOISE.</h2>
          <p className="dw-body-lg">
            FORCASTR turns current conditions, forecasts, and hourly weather
            into one calm interface. Instead of overwhelming the user with
            numbers, it uses visual hierarchy, motion, and weather-aware themes
            to make the forecast easier to read.
          </p>

          <div
            className="dw-media-container"
            style={{ marginTop: "3rem", width: "100%" }}
          >
            <img
              src={visImg7}
              alt="FORCASTR Visual Landscape Interface Overview"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </section>

        {/* 04 — ATMOSPHERE & THEMES OVERLAP */}
        <section
          className="dw-section dw-preview-section"
          style={{ paddingInline: 0 }}
        >
          <div className="forcaster-fullwidth-overlap-container">
            <img
              src={visImg4}
              alt="FORCASTR Visual Atmospheric Banner"
              className="forcaster-fullwidth-overlap-img"
            />
            <div className="forcaster-fullwidth-overlap-overlay" />
            <div className="forcaster-fullwidth-overlap-content">
              <span
                className="dw-kicker"
                style={{
                  color: "rgba(255, 255, 255, 0.76)",
                  marginBottom: "1rem",
                }}
              >
                03 — ATMOSPHERE
              </span>
              <h2
                className="dw-heading-lg"
                style={{ color: "#ffffff", marginBottom: "1.75rem" }}
              >
                WEATHER CHANGES THE MOOD.
              </h2>
              <p
                className="dw-body-lg"
                style={{
                  color: "rgba(255, 255, 255, 0.95)",
                  maxWidth: "60ch",
                  marginBottom: "1.5rem",
                }}
              >
                FORCASTR uses centrally managed themes to keep the background,
                typography, accents, and weather visuals working together.
              </p>
            </div>
          </div>

          <div className="forcaster-stat-row">
            <div className="forcaster-stat-item">
              <span className="forcaster-stat-label">PHILOSOPHY</span>
              <span className="forcaster-stat-desc">DATA → ATMOSPHERE</span>
            </div>
            <div className="forcaster-stat-item">
              <span className="forcaster-stat-label">THEMING</span>
              <span className="forcaster-stat-desc">
                DYNAMIC WEATHER THEMES
              </span>
            </div>
            <div className="forcaster-stat-item">
              <span className="forcaster-stat-label">CLARITY</span>
              <span className="forcaster-stat-desc">
                ZERO DASHBOARD CLUTTER
              </span>
            </div>
          </div>
        </section>

        {/* 05 — CORE FEATURE SHOWCASE */}
        <section className="dw-section container">
          <span className="dw-kicker">04 — FEATURE EXPLORATION</span>
          <h2 className="dw-heading-lg">DESIGNED FOR CLARITY.</h2>
          <p className="dw-body-lg" style={{ marginBottom: "3rem" }}>
            Every interaction is tuned to give you context without forcing you
            to dig through dense weather tables.
          </p>

          <div className="forcaster-showcase">
            <FeatureShowcase items={forcasterShowcaseItems} defaultIndex={0} />
          </div>
        </section>

        {/* 06 — UNDER THE HOOD / STACK */}
        <section className="dw-section dw-section-under-hood">
          <div className="container">
            <span className="dw-kicker">05 — UNDER THE HOOD</span>
            <h2 className="dw-heading-lg">BUILT FROM SCRATCH.</h2>

            <p
              className="dw-body-lg"
              style={{ marginTop: "1.5rem", maxWidth: "68ch" }}
            >
              No template. No UI kit. Built from the ground up with React 19,
              Vite, Tailwind CSS, OpenWeather API and Axios.
            </p>

            <div className="dw-arch-grid" style={{ marginTop: "3rem" }}>
              <div className="dw-arch-card">
                <div>
                  <span className="dw-arch-card-tag">THE EXPERIENCE</span>
                  <h3>React 19 + Vite</h3>
                  <p>
                    Fast, reactive UI with responsive layout, instant city
                    search and smooth component transitions.
                  </p>
                </div>
                <span className="dw-body-muted">Frontend Application</span>
              </div>

              <div className="dw-arch-card">
                <div>
                  <span className="dw-arch-card-tag">THE DATA ENGINE</span>
                  <h3>OpenWeather API + Axios</h3>
                  <p>
                    Live forecast fetching, hourly parsing, RealFeel calculation
                    and metric unit conversions.
                  </p>
                </div>
                <span className="dw-body-muted">Real-time Weather Data</span>
              </div>

              <div className="dw-arch-card">
                <div>
                  <span className="dw-arch-card-tag">THE ATMOSPHERE</span>
                  <h3>Tailwind CSS + Motion</h3>
                  <p>
                    Weather-aware dynamic themes, custom color variables and
                    calm motion feedback.
                  </p>
                </div>
                <span className="dw-body-muted">Atmospheric Design System</span>
              </div>
            </div>
          </div>
        </section>

        {/* 07 — ENGINEERING DETAILS & DESIGN DECISIONS */}
        <section className="dw-section container">
          <span className="dw-kicker">06 — THE DETAILS THAT MATTER</span>
          <h2 className="dw-heading-lg">CLARITY IN EVERY CONDITION.</h2>

          <div
            className="dw-split-layout forcaster-eng-split"
            style={{ marginTop: "3rem" }}
          >
            <div className="dw-media-container forcaster-eng-media-container">
              <img
                src={visImg2}
                alt="FORCASTR Engineering Details Visual"
                className="forcaster-eng-img"
              />
            </div>

            <div className="dw-decisions-list">
              <div className="dw-decision-item">
                <span className="dw-decision-num">01</span>
                <h3 className="dw-decision-title">Hierarchy over density</h3>
                <p className="dw-decision-body">
                  Essential weather metrics prioritized visually before
                  secondary details to avoid dashboard overload.
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">02</span>
                <h3 className="dw-decision-title">Expandable micro-views</h3>
                <p className="dw-decision-body">
                  Hourly and 5-day forecasts reveal deeper metrics on demand
                  instead of crowding the main view.
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">03</span>
                <h3 className="dw-decision-title">Adaptive visual mood</h3>
                <p className="dw-decision-body">
                  Color palettes and accent tones shift seamlessly with time,
                  temperature, and precipitation.
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">04</span>
                <h3 className="dw-decision-title">
                  Lightweight zero-kit build
                </h3>
                <p className="dw-decision-body">
                  Pure React, Axios, and Tailwind without heavy third-party UI
                  dependencies or component library overhead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 08 — THEMES ATMOSPHERE SHOWCASE */}
        <section className="dw-section container">
          <span className="dw-kicker">07 — THEME EXPLORATION</span>
          <h2 className="dw-heading-lg">ATMOSPHERIC THEMES.</h2>
          <div className="forcaster-theme-grid">
            <div className="forcaster-theme-item">
              <img
                src={theme7}
                alt="FORCASTR Clear Sky Atmosphere"
                className="forcaster-theme-img"
              />
            </div>
            <div className="forcaster-theme-item">
              <img
                src={forcaster2}
                alt="FORCASTR Rain Atmosphere"
                className="forcaster-theme-img"
              />
            </div>
            <div className="forcaster-theme-item">
              <img
                src={forcaster3}
                alt="FORCASTR Night Atmosphere"
                className="forcaster-theme-img"
              />
            </div>
            <div className="forcaster-theme-item">
              <img
                src={visImg5}
                alt="FORCASTR Cloud Atmosphere"
                className="forcaster-theme-img"
              />
            </div>
          </div>
        </section>

        {/* 09 — CLOSING RESULT */}
        <section className="dw-section container">
          <span className="dw-kicker">08 — THE POINT</span>
          <h2 className="dw-conclusion-lead">
            LESS DATA.
            <br />
            <span className="dw-conclusion-accent">MORE ATMOSPHERE.</span>
          </h2>
          <p
            className="dw-body-muted"
            style={{
              fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "1.5rem",
              color: "var(--ink)",
            }}
          >
            SIMPLE. CALM. INTENTIONAL.
          </p>
          <p className="dw-body-lg">
            FORCASTR turns standard weather metrics into a peaceful visual
            atmosphere. Every forecast is easy to scan, pleasant to look at, and
            instant to read.
          </p>

          <div
            className="forcaster-fullbleed-img-wrap"
            style={{ marginTop: "3.5rem" }}
          >
            <img
              src={visImg6}
              alt="FORCASTR Closing Brand Visual"
              className="forcaster-fullbleed-img"
            />
          </div>
        </section>
      </main>

      {/* FOOTER TRANSITION */}
      <Footer nextProject={nextProjectForFooter} />
    </>
  );
}

export default ForcasterProjectPage;
