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
import {
  FeatureShowcase,
  type ShowcaseItem,
} from "@/components/FeatureShowcase/FeatureShowcase";

import neuron1 from "@/assets/Neuron/gallery/neuron1.png";
import neuron2 from "@/assets/Neuron/gallery/neuron2.png";
import neuron3 from "@/assets/Neuron/gallery/neuron3.png";
import neuron4 from "@/assets/Neuron/gallery/neuron4.png";
import neuron5 from "@/assets/Neuron/gallery/neuron5.png";
import neuron6 from "@/assets/Neuron/gallery/neuron6.png";
import neuron7 from "@/assets/Neuron/gallery/neuron7.png";
import neuron99 from "@/assets/Neuron/gallery/neuron99.png";
import neuron8Copy from "@/assets/Neuron/gallery/neuron8 copy.jpg";
import neuron9 from "@/assets/Neuron/gallery/neuron9.jpg";
import neuronHash1 from "@/assets/Neuron/gallery/0b416699a0382b1a3fc7be66f8d95f7a.jpg";
import neuronEngVisual from "@/assets/Neuron/gallery/42142ffcc3d6b3ac4e5f13d1cb249b72.jpg";
import neuronHash3 from "@/assets/Neuron/gallery/547c613297f266ca47279a062ee97dd6.jpg";
import neuronHash4 from "@/assets/Neuron/gallery/0b63e188d91b7db8ede853705b4b6fb3.jpg";
import neuronHash5 from "@/assets/Neuron/gallery/623fc7c957f277c926c5a4a83d147012.jpg";
import neuronHash6 from "@/assets/Neuron/gallery/a25740cd5a27e5149846ad9c91aff116.jpg";
import neuronHash7 from "@/assets/Neuron/gallery/fa358c755b204cc2f8282e6c6b70baf8.jpg";
import pexelsAlena from "@/assets/Neuron/gallery/pexels-alena-39107377.jpg";
import pexelsHamza from "@/assets/Neuron/gallery/pexels-hamza01nsr-10158225.jpg";
import pic7 from "@/assets/Neuron/gallery/7.jpg";
import pic8 from "@/assets/Neuron/gallery/wewe.png";
import wewewe from "@/assets/Neuron/gallery/wewewe.png";

// Visual folder image imports
import neuronVisualHash1 from "@/assets/Neuron/visual/0064eea637e208a93c816ce148e36023.jpg";
import neuronVisualHash2 from "@/assets/Neuron/visual/f8c8cdba238fbf63ce3678c6ce4d8c51.jpg";
import neuronVisual8 from "@/assets/Neuron/visual/neuron8.jpg";

// Video imports for Neuron Hero & showcase visuals
import neuronHeroVideoMain from "@/assets/Neuron/gallery/15432171-uhd_3840_2160_50fps.mp4";
import neuronHeroVideoSecondary from "@/assets/Neuron/gallery/20042306-uhd_3840_2160_30fps.mp4";
import neuronHeroVideoDetail from "@/assets/Neuron/gallery/15912342_1920_1080_24fps.mp4";
import neuronHeroVideoCompact from "@/assets/Neuron/gallery/15197034_1280_720_24fps (1).mp4";

export const neuronGalleryImages = [
  neuron1,
  neuron2,
  neuron3,
  neuron4,
  neuron5,
  neuron6,
  neuron7,
  neuron8Copy,
  neuron9,
  neuronHash1,
  neuronEngVisual,
  neuronHash3,
  neuronHash4,
  neuronHash5,
  neuronHash6,
  neuronHash7,
  pexelsAlena,
  pexelsHamza,
  neuron99,
  pic7,
  pic8,
  wewewe,
  neuronVisualHash1,
  neuronVisualHash2,
  neuronVisual8,
];

export const neuronVideos = [
  neuronHeroVideoMain,
  neuronHeroVideoSecondary,
  neuronHeroVideoDetail,
  neuronHeroVideoCompact,
];

export const neuronShowcaseItems: ShowcaseItem[] = [
  {
    image: neuron3,
    title: "Grounded Document Chat",
    tag: "FEATURE 01",
    description:
      "Upload PDFs, DOCX, spreadsheets, and code; ask questions and get responses strictly grounded in file context.",
    objectPosition: "center top",
  },
  {
    image: neuron99,
    title: "Numbered Citation Navigation",
    tag: "FEATURE 02",
    description:
      "Every answer carries direct numbered citations pointing back to exact pages, sections, and line ranges.",
    objectPosition: "center top",
  },
  {
    image: neuron2,
    title: "Multimodal Vector Retrieval",
    tag: "FEATURE 03",
    description:
      "Unified FAISS vector index combining semantic text embeddings with visual CLIP features.",
    objectPosition: "center top",
  },
  {
    image: neuron4,
    title: "Explainable Relevance Ranking",
    tag: "FEATURE 04",
    description:
      "Results carry transparent score breakdowns, confidence metrics, and natural-language rank explanations.",
    objectPosition: "center top",
  },
];

import "./ProjectPage.css";
import "./NeuronProjectPage.css";

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

export function NeuronProjectPage() {
  const slug = "neuron";
  const project = projects.find((p) => p.slug === slug);
  const cs = caseStudies[slug];

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

  useMagnetic(root, [slug]);

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
        ".dw-media-img, .media-portrait, .media-portrait-full, .media-landscape, .media-square, .media-natural, .neuron-hero-img, .neuron-natural-img, .neuron-wide-img, .neuron-fullwidth-overlap-img, .neuron-fullbleed-img, .neuron-eng-img, .dw-media-container img",
      );
      parallaxImgs.forEach((img) => {
        const frame =
          img.closest(".dw-media-container") ||
          img.closest(".neuron-hero-img-wrap") ||
          img.closest(".neuron-fullwidth-overlap-container") ||
          img.closest(".neuron-fullbleed-img-wrap") ||
          img.closest(".neuron-eng-media-container") ||
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
          ".dw-body-lg, .dw-body-muted, .dw-hero-tagline, .neuron-hero-video-subtext",
        );
        const cards = sec.querySelectorAll(
          ".dw-arch-card, .dw-stat-card, .dw-decision-item, .neuron-stat-item",
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
      <Preloader text="Neuron" />
      <Navbar />

      <main className="dw-case-study" ref={root}>
        {/* 01 — HERO / PROJECT IDENTITY */}
        <section
          className="dw-section container"
          style={{ paddingBottom: "2rem" }}
        >
          <span className="dw-kicker">
            01 — MULTIMODAL SEARCH &amp; DOCUMENT INTELLIGENCE
          </span>
          <h1 className="dw-hero-title">NEURON</h1>
          <p className="dw-hero-tagline">Search beyond words.</p>
          <p className="dw-body-lg" style={{ marginTop: "-1.5rem" }}>
            One interface for text, images, audio and video — with document chat
            that stays grounded in the source.
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
              <p className="dw-meta-val">Full-stack / ML Systems Engineering</p>
            </div>
            <div className="dw-meta-col">
              <span className="dw-meta-label">ARCHITECTURE</span>
              <span className="dw-meta-stripe" />
              <p className="dw-meta-val">
                FastAPI + React / Retrieval &amp; RAG
              </p>
            </div>
            <div className="dw-meta-col">
              <span className="dw-meta-label">YEAR</span>
              <span className="dw-meta-stripe" />
              <p className="dw-meta-val">2026</p>
            </div>
          </div>
        </section>

        {/* 02 — HERO VISUAL */}
        <section
          className="dw-section dw-preview-section"
          style={{ paddingInline: 0, paddingBottom: "clamp(5rem, 10vh, 9rem)" }}
        >
          <div className="neuron-hero-video-wrap">
            <video
              autoPlay
              muted
              loop
              playsInline
              src={neuronHeroVideoMain}
              className="neuron-hero-video"
            />
            <div className="neuron-hero-video-overlay" />
            <div className="neuron-hero-video-content">
              <div className="dw-media-catchphrase">✦ SEARCH BEYOND WORDS</div>
              <p className="neuron-hero-video-subtext">
                Bring the question, the file, or both — retrieve across
                modalities with grounded document reasoning.
              </p>
            </div>
          </div>
        </section>

        {/* 03 — THE PROBLEM */}
        <section className="dw-section container">
          <span className="dw-kicker">02 — THE PROBLEM</span>
          <h2 className="dw-heading-lg">
            YOUR INFORMATION DOESN'T LIVE IN ONE FORMAT.
          </h2>
          <p className="dw-body-lg">
            A useful answer might be hiding inside a document, an image, a
            video, an audio recording, or a page on the web. Traditional search
            makes you decide the format before you search. Neuron removes that
            boundary: bring the question, the file, or both, and let the system
            retrieve across modalities.
          </p>

          <div className="dw-media-container" style={{ marginTop: "3rem" }}>
            <img
              src={neuron7}
              alt="Scattered information to organized searchable system"
              className="media-landscape"
              style={{ objectFit: "contain", height: "auto" }}
            />
          </div>
        </section>

        {/* 04 — MULTIMODAL SEARCH */}
        <section
          className="dw-section dw-preview-section"
          style={{ paddingInline: 0 }}
        >
          <div className="neuron-fullwidth-overlap-container">
            <img
              src={pic7}
              alt="Multimodal Search Interface"
              className="neuron-fullwidth-overlap-img"
            />
            <div className="neuron-fullwidth-overlap-overlay" />
            <div className="neuron-fullwidth-overlap-content">
              <span
                className="dw-kicker"
                style={{
                  color: "rgba(255, 255, 255, 0.76)",
                  marginBottom: "1rem",
                }}
              >
                03 — SEARCH BEYOND WORDS
              </span>
              <h2
                className="dw-heading-lg"
                style={{ color: "#ffffff", marginBottom: "1.75rem" }}
              >
                ONE QUERY. EVERY FORMAT.
              </h2>
              <p
                className="dw-body-lg"
                style={{
                  color: "rgba(255, 255, 255, 0.95)",
                  maxWidth: "60ch",
                  marginBottom: "1.5rem",
                }}
              >
                Neuron treats text, images, audio and video as parts of the same
                search problem. A multimodal query becomes a shared
                representation, then retrieval combines semantic, keyword and
                visual signals before the results are re-ranked.
              </p>
              <p
                className="dw-body-muted"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "52ch",
                  margin: 0,
                }}
              >
                The goal is not just to find something related. It is to explain
                why it belongs near the top.
              </p>
            </div>
          </div>

          <div className="neuron-stat-row">
            <div className="neuron-stat-item">
              <span className="neuron-stat-label">MODALITIES</span>
              <span className="neuron-stat-desc">
                TEXT + IMAGE + AUDIO + VIDEO
              </span>
            </div>
            <div className="neuron-stat-item">
              <span className="neuron-stat-label">RE-RANKING</span>
              <span className="neuron-stat-desc">VISUAL RE-RANKING</span>
            </div>
            <div className="neuron-stat-item">
              <span className="neuron-stat-label">TRANSPARENCY</span>
              <span className="neuron-stat-desc">EXPLAINABLE RESULTS</span>
            </div>
          </div>
        </section>

        {/* 05 — DOCUMENT CHAT */}
        <section className="dw-section container">
          <span className="dw-kicker">04 — ASK YOUR DOCUMENTS</span>
          <h2 className="dw-heading-lg">SEARCH THE FILE. THEN TALK TO IT.</h2>
          <p className="dw-body-lg">
            Neuron turns uploaded files into searchable context. Documents are
            parsed, chunked and indexed so questions can be answered against the
            actual source instead of an ungrounded model response. Citations
            point back to the relevant page, section and line range.
          </p>
          <p
            className="dw-body-muted"
            style={{ marginTop: "-1.5rem", marginBottom: "3rem" }}
          >
            The useful part is not simply getting an answer. It is being able to
            trace that answer back to where it came from.
          </p>

          <FeatureShowcase items={neuronShowcaseItems} defaultIndex={0} />
        </section>

        {/* 06 — ARCHITECTURE */}
        <section className="dw-section dw-section-under-hood">
          <div className="container">
            <span className="dw-kicker">05 — UNDER THE HOOD</span>
            <h2 className="dw-heading-lg">
              SIMPLE ON THE SURFACE. LAYERED UNDERNEATH.
            </h2>

            <p
              className="dw-body-lg"
              style={{ marginTop: "1.5rem", maxWidth: "68ch" }}
            >
              Neuron uses a layered FastAPI backend with strict boundaries
              between the API, services, retrieval systems, machine-learning
              models and database. React handles the experience while the
              backend coordinates search, ingestion, ranking, retrieval and
              grounded chat.
            </p>

            <div className="dw-arch-grid" style={{ marginTop: "3rem" }}>
              <div className="dw-arch-card">
                <div>
                  <span className="dw-arch-card-tag">THE EXPERIENCE</span>
                  <h3>React 19</h3>
                  <p>
                    The interface for multimodal search, document browsing,
                    results, citations and chat.
                  </p>
                </div>
                <span className="dw-body-muted">Vite frontend</span>
              </div>

              <div className="dw-arch-card">
                <div>
                  <span className="dw-arch-card-tag">THE INTELLIGENCE</span>
                  <h3>CLIP · Whisper · BLIP</h3>
                  <p>
                    The ML layer handles visual understanding, speech
                    transcription and image understanding as optional
                    capabilities inside the retrieval pipeline.
                  </p>
                </div>
                <span className="dw-body-muted">Lazy model loading</span>
              </div>

              <div className="dw-arch-card">
                <div>
                  <span className="dw-arch-card-tag">THE RETRIEVAL CORE</span>
                  <h3>FAISS · BM25 · MongoDB</h3>
                  <p>
                    Vector retrieval, keyword ranking and persistent application
                    data work together without forcing the product into a single
                    retrieval strategy.
                  </p>
                </div>
                <span className="dw-body-muted">Pluggable interfaces</span>
              </div>
            </div>
          </div>
        </section>

        {/* 07 — ENGINEERING DECISIONS */}
        <section className="dw-section container">
          <span className="dw-kicker">06 — THE DETAILS THAT MATTER</span>
          <h2 className="dw-heading-lg">
            THE SEARCH IS ONLY AS GOOD AS THE SYSTEM AROUND IT.
          </h2>

          <div
            className="dw-split-layout neuron-eng-split"
            style={{ marginTop: "3rem" }}
          >
            <div className="dw-media-container neuron-eng-media-container">
              <img
                src={pic8}
                alt="Engineering details and system architecture"
                className="neuron-eng-img"
              />
            </div>

            <div className="dw-decisions-list">
              <div className="dw-decision-item">
                <span className="dw-decision-num">01</span>
                <h3 className="dw-decision-title">
                  Make every result explain itself
                </h3>
                <p className="dw-decision-body">
                  Relevance is part of the response contract. Results carry
                  score, confidence, contributing signals and a plain-language
                  explanation instead of returning an unexplained ranked list.
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">02</span>
                <h3 className="dw-decision-title">Fail gracefully</h3>
                <p className="dw-decision-body">
                  If an optional embedder or generator is unavailable, Neuron
                  falls back to simpler retrieval or extractive answers instead
                  of taking the entire application down.
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">03</span>
                <h3 className="dw-decision-title">
                  Keep citations attached to the data
                </h3>
                <p className="dw-decision-body">
                  Document parsers preserve page, heading and line-range
                  information so retrieval can expose exactly where an answer
                  came from.
                </p>
              </div>

              <div className="dw-decision-item">
                <span className="dw-decision-num">04</span>
                <h3 className="dw-decision-title">
                  Treat security as part of search
                </h3>
                <p className="dw-decision-body">
                  Uploads, outbound thumbnail fetching, authentication, rate
                  limits, CSRF protection and per-user ownership are handled as
                  first-class system boundaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 08 — CLOSING RESULT */}
        <section className="dw-section container">
          <span className="dw-kicker">07 — THE POINT</span>
          <h2 className="dw-conclusion-lead">
            SEARCH LESS.
            <br />
            <span className="dw-conclusion-accent">UNDERSTAND MORE.</span>
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
            ONE INTERFACE. MANY WAYS TO ASK.
          </p>
          <p className="dw-body-lg">
            Neuron started from a simple frustration: information is multimodal,
            but search usually isn't. The result is a system that lets text,
            images, audio, video and documents participate in the same retrieval
            workflow — while keeping the reasoning behind each result visible.
          </p>

          <div
            className="neuron-fullbleed-img-wrap"
            style={{ marginTop: "3.5rem" }}
          >
            <img
              src={wewewe}
              alt="Neuron Closing Brand Visual"
              className="neuron-fullbleed-img"
            />
          </div>
        </section>
      </main>

      {/* FOOTER TRANSITION */}
      <Footer nextProject={nextProjectForFooter} />
    </>
  );
}

export default NeuronProjectPage;
