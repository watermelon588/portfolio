import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import {
  FeatureShowcase,
  type ShowcaseItem,
} from "@/components/FeatureShowcase/FeatureShowcase";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { NeuronProjectPage } from "./NeuronProjectPage";
import { YapChatProjectPage } from "./YapChatProjectPage";
import { ForcasterProjectPage } from "./ForcasterProjectPage";



// Asset imports from gallery folder for SkyGuide AI Detailed Work
import gallery1 from "@/assets/skyguide/gallery/1.png";
import gallery2 from "@/assets/skyguide/gallery/2.png";
import gallery3 from "@/assets/skyguide/gallery/3.png";
import gallery4 from "@/assets/skyguide/gallery/4.png";
import gallery5 from "@/assets/skyguide/gallery/5.png";
import gallery6 from "@/assets/skyguide/gallery/6.png";
import gallery7 from "@/assets/skyguide/gallery/7.png";
import gallery8 from "@/assets/skyguide/gallery/8.png";
import gallery9 from "@/assets/skyguide/gallery/9.png";
import gallery10 from "@/assets/skyguide/gallery/10.png";
import gallery11 from "@/assets/skyguide/gallery/11.png";
import gallery12 from "@/assets/skyguide/gallery/12.png";
import gallery14 from "@/assets/skyguide/gallery/14.png";
import gallery15 from "@/assets/skyguide/gallery/15.png";
import gallery16 from "@/assets/skyguide/gallery/16.png";
import galleryHash1 from "@/assets/skyguide/gallery/014aef75c5d411038df20da935137b06.jpg";
import galleryHash2 from "@/assets/skyguide/gallery/2cb4da4c2f494a7371a3f370f38c9bf4.jpg";
import galleryHash3 from "@/assets/skyguide/gallery/52b10145d57bd5f96143a98cbb086b70.jpg";
import galleryHash4 from "@/assets/skyguide/gallery/afdf8b689b359dc99ad27ff6934409d0.jpg";
import galleryHash5 from "@/assets/skyguide/gallery/c6c017ca481aba455cbec545c2f5354f.jpg";
import galleryOverview from "@/assets/skyguide/gallery/gallery.png";

// Registered Gallery Array containing all imported assets
export const skyguideGallery = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  gallery10,
  gallery11,
  gallery12,
  gallery14,
  gallery15,
  galleryHash1,
  galleryHash2,
  galleryHash3,
  galleryHash4,
  galleryHash5,
  galleryOverview,
];

export const skyguideShowcaseItems: ShowcaseItem[] = [
  {
    image: gallery2,
    title: "Tonight's Sky Brief",
    tag: "FEATURE 01",
    description:
      "Clear-sky forecast, moon phase, and automated top visibility scores for your exact location.",
    objectPosition: "center top",
  },
  {
    image: gallery3,
    title: "Interactive All-Sky Chart",
    tag: "FEATURE 02",
    description:
      "Real-time celestial map rendering 13,311 cataloged objects with smooth pan and zoom.",
    objectPosition: "center top",
  },
  {
    image: gallery4,
    title: "AI Target Recommendation Engine",
    tag: "FEATURE 03",
    description:
      "Machine learning ranking algorithms matching observation targets to your scope and weather.",
    objectPosition: "center top",
  },
  {
    image: gallery6,
    title: "Real-Time Telescope Alignment",
    tag: "FEATURE 04",
    description:
      "Plate-solving and altitude/azimuth coordinate synchronization for telescope mounts.",
    objectPosition: "center top",
  },
  {
    image: gallery10,
    title: "Community Deep Sky Catalog",
    tag: "FEATURE 05",
    description:
      "Shared observations, astrophotography logs, and privacy-safe stargazer density map.",
    objectPosition: "center top",
  },
];

// Asset imports from visual folder for SkyGuide AI Detailed Work (unregistered imports)
import visual1 from "@/assets/skyguide/visual/014aef75c5d411038df20da935137b06.jpg";
import visual2 from "@/assets/skyguide/visual/05fa198ed55252298aa9c7a903884216.jpg";
import visual3 from "@/assets/skyguide/visual/1bbb28687414c586f285f80f26447433.jpg";
import visual4 from "@/assets/skyguide/visual/2cb4da4c2f494a7371a3f370f38c9bf4.jpg";
import visual5 from "@/assets/skyguide/visual/41b535caf68d22f9136296571cc4bce3.jpg";
import visual6 from "@/assets/skyguide/visual/52b10145d57bd5f96143a98cbb086b70.jpg";
import visual7 from "@/assets/skyguide/visual/543356d26794ecfcb7b69a7a2f4e4258.jpg";
import visual8 from "@/assets/skyguide/visual/68e29b6b2e30bc95f81a9498baede9b2.jpg";
import visual9 from "@/assets/skyguide/visual/81265793688839ecf53b4eef4dc57b8a.jpg";
import visual10 from "@/assets/skyguide/visual/8f62d0df35a8016162ed455be6960743.jpg";
import visual11 from "@/assets/skyguide/visual/92bdf842dd9d5447674b1a1c5bc66659.jpg";
import visual12 from "@/assets/skyguide/visual/9488d410ebb3e5e1cd3e47da15955417.jpg";
import visual13 from "@/assets/skyguide/visual/9d01ac5568c318036a03cf63fe061fe9.jpg";
import visual14 from "@/assets/skyguide/visual/a178ac41cfda9c0ee8ab12d7b258ebce.jpg";
import visual15 from "@/assets/skyguide/visual/aa1d0fe70eac85f0e036212cd38a0fa9.jpg";
import visual16 from "@/assets/skyguide/visual/afdf8b689b359dc99ad27ff6934409d0.jpg";
import visual17 from "@/assets/skyguide/visual/b0046e8a3a7a84bb743bb487f1cbf311.jpg";
import visual18 from "@/assets/skyguide/visual/b09b85a01a364c2b0c94aa4d14bd13b9.jpg";
import visual19 from "@/assets/skyguide/visual/c6c017ca481aba455cbec545c2f5354f.jpg";
import visual20 from "@/assets/skyguide/visual/dbacb337a2e8b7e0aacf85973f51ff2d.jpg";
import visual21 from "@/assets/skyguide/visual/e521df5d11c49359a2c964d893366643.jpg";
import visual22 from "@/assets/skyguide/visual/visualmain.png";

// Registered visuals Array containing all imported assets
export const skyguideVisuals = [
  visual1,
  visual2,
  visual3,
  visual4,
  visual5,
  visual6,
  visual7,
  visual8,
  visual9,
  visual10,
  visual11,
  visual12,
  visual13,
  visual14,
  visual15,
  visual16,
  visual17,
  visual18,
  visual19,
  visual20,
  visual21,
  visual22,
];

import spaceVideo from "@/assets/skyguide/video/sky2.mp4";
import sky3Video from "@/assets/skyguide/video/sky3.mp4";

import "./ProjectPage.css";

gsap.registerPlugin(ScrollTrigger);

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

export function ProjectPage() {
  const { slug } = useParams();
  if (slug === "neuron") {
    return <NeuronProjectPage />;
  }
  if (slug === "yapchat" || slug === "yap-chat") {
    return <YapChatProjectPage />;
  }
  if (slug === "forcaster" || slug === "forcastr") {
    return <ForcasterProjectPage />;
  }


  const project = projects.find((p) => p.slug === slug);
  const cs = slug ? caseStudies[slug] : undefined;

  const root = useRef<HTMLElement>(null);
  useMagnetic(root, [slug]);

  // Next project logic for closing section / footer transition
  const dev = projects.filter((p) => p.category === "dev");
  const idx = dev.findIndex((p) => p.slug === (project?.slug ?? ""));
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

      // 2. Parallax on Media Elements
      const parallaxImgs = gsap.utils.toArray<HTMLElement>(
        ".dw-media-img, .media-portrait, .media-portrait-full, .media-landscape, .media-square, .media-natural, .dw-showcase-img",
      );
      parallaxImgs.forEach((img) => {
        const frame =
          img.closest(".dw-media-container") ||
          img.closest(".dw-showcase-img-wrap") ||
          img.parentElement;
        if (!frame) return;

        const tw = gsap.fromTo(
          img,
          { yPercent: -10, scale: 1.06 },
          {
            yPercent: 10,
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

      // 3. Section Kicker and Headings Reveal
      const sections = gsap.utils.toArray<HTMLElement>(".dw-section");
      sections.forEach((sec) => {
        const kicker = sec.querySelector(".dw-kicker");
        const heading = sec.querySelector(
          ".dw-heading-lg, .dw-heading-md, .dw-scale-number",
        );

        if (kicker || heading) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
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

  if (!project) return <Navigate to="/work" replace />;

  return (
    <>
      <Preloader text={project.title} />
      <Navbar />

      <main className="dw-case-study" ref={root}>
        {/* 01 — HERO / PROJECT IDENTITY */}
        <section
          className="dw-section container"
          style={{ paddingBottom: "2rem" }}
        >
          <span className="dw-kicker">
            01 — REAL-TIME ASTRONOMICAL OBSERVATION PLATFORM
          </span>
          <h1 className="dw-hero-title">{project.title}</h1>
          <p className="dw-hero-tagline">
            An AI-powered astronomical observation platform that combines
            astronomical computation, real-time sensor data, telescope
            alignment, environmental conditions, and personalized target
            recommendations into one observing workflow.
          </p>
        </section>

        {/* 02 — DIVIDER AND BUTTONS (COPIED AS IT IS FROM FOOTER) */}
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

        {/* 03 — METADATA GRID */}
        <section className="container dw-meta-section">
          <div className="dw-meta-grid-3col">
            <div className="dw-meta-col">
              <span className="dw-meta-label">ROLE</span>
              <span className="dw-meta-stripe" />
              <p className="dw-meta-val">Full-stack / Systems Engineering</p>
            </div>
            <div className="dw-meta-col">
              <span className="dw-meta-label">ARCHITECTURE</span>
              <span className="dw-meta-stripe" />
              <p className="dw-meta-val">Distributed Microservices</p>
            </div>
            <div className="dw-meta-col">
              <span className="dw-meta-label">YEAR</span>
              <span className="dw-meta-stripe" />
              <p className="dw-meta-val">2026</p>
            </div>
          </div>
        </section>

        {/* 03 — PRODUCT PREVIEW */}
        <section className="dw-section container dw-preview-section">
          <div className="dw-media-container">
            <div className="dw-media-frame dw-media-frame-hero">
              <img
                src={visual22}
                alt="SkyGuide AI Dashboard Interface"
                className="dw-media-img dw-media-img-hero"
              />
              <div className="dw-media-catchphrase">✦ CURIOSITY</div>
            </div>
          </div>
        </section>

        {/* 04 — PROBLEM STATEMENT */}
        <section className="dw-section container">
          <span className="dw-kicker">02 — WHY I BUILT IT</span>
          <h2 className="dw-heading-lg">
            THE SKY HAS 13,000+ THINGS TO SHOW YOU. GOOD LUCK PICKING ONE.
          </h2>

          <div className="dw-problem-video-wrap">
            <video
              className="dw-problem-video"
              autoPlay
              muted
              loop
              playsInline
              src={spaceVideo}
            />
            <div className="dw-problem-video-copy">
              Astronomy gives you an impossible menu: thousands of objects,
              constantly moving, changing with your location, your telescope,
              the Moon, the weather, and the time. I built SkyGuide AI to turn
              that chaos into a simple answer — what is actually worth looking
              at tonight, and where should the telescope point?
            </div>
          </div>
        </section>

        {/* 05 — SYSTEM ARCHITECTURE / UNDER THE HOOD */}
        <section className="dw-section-under-hood">
          <div className="container">
            <span className="dw-kicker">03 — UNDER THE HOOD</span>
            <h2 className="dw-heading-lg">
              Make the interface feel simple. Make the backend do the hard part.
            </h2>

            <span className="footer-stripe" />

            <div style={{ marginTop: "1.5rem", marginBottom: "2.25rem" }}>
              <Link
                className="footer-round magnetic"
                data-strength="42"
                to="/demo"
              >
                <span className="footer-round-label">DEMO</span>
                <span className="footer-round-arrow">
                  <ArrowUpRight />
                </span>
              </Link>
            </div>

            <p
              className="dw-body-lg"
              style={{ marginTop: 0, maxWidth: "68ch" }}
            >
              SkyGuide is deliberately split into clear responsibilities. React
              handles the experience, Node.js handles the application and
              real-time session layer, and FastAPI handles the astronomy-heavy
              work. The result is a product that feels calm on the surface while
              the system underneath is doing coordinate transforms, ephemeris
              calculations and state synchronization.
            </p>

            <FeatureShowcase items={skyguideShowcaseItems} defaultIndex={2} />

            <div className="dw-arch-grid dw-under-hood-cards">
              <div className="dw-arch-card">
                <div>
                  <span className="dw-arch-card-tag">THE EXPERIENCE</span>
                  <h3>React 19 &amp; Vite</h3>
                  <p>
                    The part humans actually touch: dashboard, Tonight, sky
                    maps, target discovery, community surfaces, and a
                    lightweight companion for the telescope-mounted phone.
                  </p>
                </div>
                <span className="dw-body-muted">Deployed on Vercel</span>
              </div>

              <div className="dw-arch-card">
                <div>
                  <span className="dw-arch-card-tag">
                    THE TRAFFIC CONTROLLER
                  </span>
                  <h3>Node.js &amp; Express 5</h3>
                  <p>
                    Authentication, telescope state, business logic, Socket.IO
                    pairing rooms, and real-time packet routing. Basically: the
                    service that keeps everyone from shouting at the telescope
                    at once.
                  </p>
                </div>
                <span className="dw-body-muted">Deployed on Render</span>
              </div>

              <div className="dw-arch-card">
                <div>
                  <span className="dw-arch-card-tag">THE SCIENCE</span>
                  <h3>FastAPI &amp; Astropy</h3>
                  <p>
                    Ephemeris generation, coordinate transformations,
                    visibility, lunar context, and recommendation inputs. The
                    boring-looking service doing the decidedly non-boring math.
                  </p>
                </div>
                <span className="dw-body-muted">Deployed on Render</span>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — ASTRONOMY INTELLIGENCE */}
        <section className="dw-section container">
          <span className="dw-kicker">04 — WHEN THE SKY STARTS MOVING</span>
          <h2 className="dw-heading-lg">
            The universe is moving. The UI should not panic.
          </h2>
          <p className="dw-body-lg">
            Celestial positions are time-dependent, so the science layer owns
            the truth. FastAPI resolves targets into real-time Alt/Az positions,
            visibility windows, and lunar context, then sends the interface
            already-computed observational state. React gets to render the sky
            instead of secretly becoming an astrophysicist.
          </p>

          <div className="dw-media-grid-2col" style={{ marginTop: "3rem" }}>
            <div className="dw-media-container">
              <img
                src={galleryHash4}
                alt="All Sky Chart & Celestial Resolution UI"
                className="media-landscape"
              />
            </div>
            <div className="dw-media-container">
              <img
                src={visual19}
                alt="Radio Astronomy Dish in Operation"
                className="media-portrait"
              />
            </div>
          </div>
        </section>

        {/* 07 — PERSONALIZED RECOMMENDATION ENGINE */}
        <section className="dw-section container">
          <span className="dw-kicker">05 — THE PRODUCT HAS AN OPINION</span>
          <h2 className="dw-heading-lg">
            Not “here are 13,000 objects.” Try “start with this one.”
          </h2>
          <p className="dw-body-lg">
            A giant catalog is impressive for about ten seconds. A useful
            recommendation is better. SkyGuide turns the catalog into a live
            matching problem, scoring targets against the observer’s current
            sky, telescope and weather context so the night starts with a
            shortlist, not a spreadsheet.
          </p>

          <div className="dw-media-grid-2col" style={{ marginTop: "3rem" }}>
            <div className="dw-media-container">
              <img
                src={visual21}
                alt="SkyGuide AI Tonight Recommendation Cards"
                className="media-landscape"
              />
            </div>
            <div className="dw-media-container">
              <img
                src={visual11}
                alt="Deep Sky Target Ephemeris Starfield"
                className="media-portrait"
              />
            </div>
          </div>
        </section>

        {/* 08 — REAL-TIME TELESCOPE ALIGNMENT */}
        <section className="dw-section container">
          <span className="dw-kicker">06 — POINTING AT THE SKY</span>
          <h2 className="dw-heading-lg">
            Knowing what to see is only half the problem.
          </h2>
          <p className="dw-body-lg">
            The phone becomes the telescope’s guide. Its sensors are calibrated
            on-device and streamed at 20Hz through a short-lived Socket.IO room.
            The Node gateway combines that orientation with FastAPI ephemeris
            segments to continuously calculate how far the telescope is from the
            target — without making an HTTP request for every sensor frame.
          </p>

          <div className="dw-media-container" style={{ marginTop: "3.5rem" }}>
            <img
              src={gallery16}
              alt="Real-time Telescope Alignment Interface"
              className="media-square"
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "auto",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>
        </section>

        {/* 07 — MOBILE + PRODUCT EXPERIENCE */}
        <section className="dw-section container">
          <span className="dw-kicker">07 — THE PHONE COMES WITH YOU</span>

          <h2 className="dw-heading-lg">
            One QR scan. One continuous observing experience.
          </h2>

          <p className="dw-body-lg">
            The phone is mounted to the telescope, so loading the entire desktop
            application would be needless baggage. A separate Vite entry
            delivers only what the field workflow needs: pairing, sensor
            streaming, live directional guidance, discovery, and observational
            context.
          </p>

          <div className="dw-showcase-grid" style={{ marginTop: "3rem" }}>
            <div className="dw-showcase-card">
              <div
                className="dw-showcase-img-wrap"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                }}
              >
                <img
                  src={visual13}
                  alt="QR Code Pairing Session"
                  className="media-portrait"
                  style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    objectPosition: "center center",
                    display: "block",
                  }}
                />
              </div>

              <div className="dw-showcase-caption">
                <h4>Scan. Pair. Point.</h4>
                <p>
                  A short-lived QR pairing session establishes the real-time
                  orientation stream in seconds.
                </p>
              </div>
            </div>

            <div className="dw-showcase-card">
              <div
                className="dw-showcase-img-wrap"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                }}
              >
                <img
                  src={visual18}
                  alt="Celestial Object Inspector"
                  className="media-portrait"
                  style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    objectPosition: "center center",
                    display: "block",
                  }}
                />
              </div>

              <div className="dw-showcase-caption">
                <h4>Keep the Science Beside the Telescope</h4>
                <p>
                  Target parameters and alignment deltas stay visible where the
                  actual observing happens.
                </p>
              </div>
            </div>

            <div className="dw-showcase-card">
              <div
                className="dw-showcase-img-wrap"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                }}
              >
                <img
                  src={visual5}
                  alt="Mobile Telescope Field Companion Setup"
                  className="media-portrait"
                  style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    objectPosition: "center center",
                    display: "block",
                  }}
                />
              </div>

              <div className="dw-showcase-caption">
                <h4>Field-Ready Workflow</h4>
                <p>
                  A lightweight mobile bundle tailored specifically for
                  low-light night observing sessions.
                </p>
              </div>
            </div>

            <div className="dw-showcase-card">
              <div
                className="dw-showcase-img-wrap"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                }}
              >
                <img
                  src={visual9}
                  alt="Celestial Catalog Explorer"
                  className="media-portrait"
                  style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    objectPosition: "center center",
                    display: "block",
                  }}
                />
              </div>

              <div className="dw-showcase-caption">
                <h4>Explore Without Getting Lost</h4>
                <p>
                  Search and filter across Messier, NGC, and IC objects without
                  turning discovery into database administration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11 — SCALE & DATA */}
        <section className="dw-section container">
          <div
            style={{
              position: "relative",
              width: "100vw",
              aspectRatio: "4 / 3",
              marginLeft: "calc(50% - 50vw)",
              overflow: "hidden",
              background: "#000",
              border: "none",
              boxShadow: "none",
              padding: 0,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              src={sky3Video}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                objectPosition: "center",
                border: "none",
                margin: 0,
                padding: 0,
              }}
            />

            {/* Dark cinematic veil — keeps typography readable without creating a box */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.48))",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Main copy */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "clamp(2rem, 6vw, 7rem)",
              }}
            >
              <span
                className="dw-kicker"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  marginBottom: "1rem",
                  display: "block",
                }}
              >
                09 — THEN THE CATALOG GOT BIG
              </span>

              <h2
                className="dw-heading-lg"
                style={{
                  color: "#fff",
                  margin: 0,
                  maxWidth: "1000px",
                  lineHeight: 0.98,
                  marginBottom: "1.5rem",
                }}
              >
                WHEN THE CATALOG GOT{" "}
                <span style={{ color: "#2563eb" }}>120× BUSIER.</span>
              </h2>

              <p
                style={{
                  margin: 0,
                  maxWidth: "760px",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(1rem, 1.3vw, 1.25rem)",
                  lineHeight: 1.6,
                }}
              >
                What started as a curated observing list grew into 13,311
                celestial objects: 110 Messier, 7,993 NGC, and 5,208 IC entries.
                At that point, the problem stopped being “can we store the
                data?” and became “can the pipeline stay responsive when the sky
                gets 120× busier?”
              </p>

              {/* Catalog numbers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  width: "min(90%, 820px)",
                  marginTop: "2.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(255,255,255,0.24)",
                  gap: "clamp(1.25rem, 4vw, 4rem)",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#fff",
                      fontSize: "clamp(2rem, 4vw, 4rem)",
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    110
                  </span>

                  <span
                    style={{
                      display: "block",
                      marginTop: "0.5rem",
                      color: "rgba(255,255,255,0.68)",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Messier Objects
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#fff",
                      fontSize: "clamp(2rem, 4vw, 4rem)",
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    7,993
                  </span>

                  <span
                    style={{
                      display: "block",
                      marginTop: "0.5rem",
                      color: "rgba(255,255,255,0.68)",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    NGC Galaxies &amp; Nebulae
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#fff",
                      fontSize: "clamp(2rem, 4vw, 4rem)",
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    5,208
                  </span>

                  <span
                    style={{
                      display: "block",
                      marginTop: "0.5rem",
                      color: "rgba(255,255,255,0.68)",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    IC Index Catalog Bodies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12 — ENGINEERING DECISIONS */}
        <section className="dw-section container">
          <span className="dw-kicker">10 — THE UNGLAMOROUS PART</span>
          <h2 className="dw-heading-lg">
            The little engineering decisions that kept the magic from falling
            apart.
          </h2>

          <div className="dw-split-layout" style={{ marginTop: "3rem" }}>
            <div className="dw-media-container">
              <img
                src={gallery7}
                alt="Deep Space Observatory Systems Engineering"
                className="media-portrait"
                style={{
                  width: "90%",
                  aspectRatio: "9 / 16",
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "center center",
                  display: "block",
                }}
              />
            </div>

            <div className="dw-decisions-list">
              <div className="dw-decision-item">
                <span className="dw-decision-num">01</span>
                <h3 className="dw-decision-title">
                  Separate the science from the app
                </h3>
                <p className="dw-decision-body">
                  FastAPI owns the Astropy-heavy calculations while Express owns
                  application orchestration. That boundary lets the astronomy
                  engine evolve without dragging the UI into every scientific
                  change.
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">02</span>
                <h3 className="dw-decision-title">
                  Keep the fast stuff on the fast path
                </h3>
                <p className="dw-decision-body">
                  Phone orientation arrives at 20Hz through short-lived
                  Socket.IO rooms. The gateway handles per-packet alignment math
                  instead of round-tripping every sensor frame through HTTP.
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">03</span>
                <h3 className="dw-decision-title">Cache the expensive sky</h3>
                <p className="dw-decision-body">
                  Repeated celestial computations are cached so “show me
                  tonight’s sky” does not become “please wait while the universe
                  is calculated again.”
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">04</span>
                <h3 className="dw-decision-title">
                  Put a gate in front of the telescope brain
                </h3>
                <p className="dw-decision-body">
                  The astronomy engine is not exposed directly to browsers. The
                  gateway provides the security boundary with authentication,
                  rate limiting, validation and protection against unsafe query
                  operators.
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">05</span>
                <h3 className="dw-decision-title">
                  Give the mounted phone less to carry
                </h3>
                <p className="dw-decision-body">
                  A dedicated mobile entry loads only pairing, sensors and
                  guidance instead of shipping the full desktop SPA to a phone
                  sitting beside a telescope.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 13 — PRODUCTION & DEPLOYMENT */}
        <section className="dw-section container">
          <span className="dw-kicker">11 — FROM LOCALHOST TO THE REAL SKY</span>
          <h2 className="dw-heading-lg">
            Then I had to make it survive outside my laptop.
          </h2>
          <p className="dw-body-lg">
            The system moved to production on Vercel, Render and MongoDB Atlas,
            with Cloudinary handling persistent gallery media. That meant
            dealing with the fun little differences between “works on my
            machine” and an actual Linux production environment — plus hardening
            auth, rate limits, cookies, storage and service boundaries.
          </p>

          <div className="dw-production-visual">
            <img
              src={gallery8}
              alt="Earth Orbit Infrastructure View"
              className="media-portrait-full"
            />
          </div>
        </section>

        {/* 14 — CLOSING RESULT */}
        <section className="dw-section container">
          <span className="dw-kicker">12 — THE POINT</span>
          <h2 className="dw-conclusion-lead">
            LOOK UP.
            <br />
            <span className="dw-conclusion-accent">KNOW WHAT MATTERS.</span>
            <br />
            POINT. OBSERVE. WONDER.
          </h2>
          <p className="dw-body-lg">
            SkyGuide AI is not just another catalog or sky map. It is an attempt
            to make the gap between curiosity and actually finding something in
            the sky feel smaller — using astronomy, real-time systems,
            recommendation logic and a little bit of AI to turn “what now?” into
            “look there.”
          </p>

          <div className="dw-media-container" style={{ marginTop: "3.5rem" }}>
            <img
              src={visual20}
              alt="Full Moon Horizon Closing Visual"
              className="media-landscape"
            />
          </div>
        </section>
      </main>

      {/* 15 — NEXT CASE TRANSITION FOOTER */}
      <Footer nextProject={nextProjectForFooter} />
    </>
  );
}

export default ProjectPage;
