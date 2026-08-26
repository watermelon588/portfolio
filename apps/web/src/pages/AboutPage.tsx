import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import pfpImg2 from "@/assets/hero/4.png";
import { EMAIL } from "@/data/nav";
import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

const CURRENTLY_ITEMS = [
  {
    num: "01",
    label: "BUILDING",
    value: "AI-native visions, scalable backends & robust software products",
  },
  {
    num: "02",
    label: "EXPLORING",
    value: "Agentic AI systems · LangGraph · LLM engineering & interactive experiences",
  },
  {
    num: "03",
    label: "LEARNING",
    value: "High-performance distributed systems & web performance",
  },
];

export function AboutPage() {
  const root = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useMagnetic(root);

  useGSAP(
    () => {
      if (imgRef.current && heroRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    },
    { scope: root }
  );

  return (
    <>
      <Preloader text="About" />
      <Navbar />
      <main className="aboutpage" ref={root}>
        {/* Section 01 — HERO / WHO I AM */}
        <section className="aboutpage-hero container" id="who-i-am" ref={heroRef}>
          {/* Large dominant editorial headline */}
          <h1 className="aboutpage-headline">
            Helping brands thrive <br /> in the digital world
          </h1>

          {/* Thin horizontal divider line + large blue circular globe sitting on the line */}
          <div className="aboutpage-divider-row">
            <div className="aboutpage-stripe" />
            <div className="aboutpage-globe-btn magnetic" data-strength="36" aria-label="Globe">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="aboutpage-globe-icon"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
          </div>

          {/* Body layout below divider: Arrow + text on left, Portrait 2 on right */}
          <div className="aboutpage-body-grid">
            <div className="aboutpage-body-left">
              <span className="aboutpage-arrow-icon" aria-hidden="true">→</span>
              <p className="aboutpage-copy">
                The combination of my passion for design, code &amp; interaction positions me somewhere in the web design world. I&rsquo;m Rohit — a full-stack developer interested in AI, software engineering, and creating robust systems that don&rsquo;t fall apart.
              </p>
            </div>

            <div className="aboutpage-media">
              <img
                ref={imgRef}
                src={pfpImg2}
                alt="Rohit Maity portrait"
                className="aboutpage-portrait"
              />
            </div>
          </div>
        </section>

        {/* Section 02 — CURRENTLY (3-Column Editorial Grid matching Reference Layout) */}
        <section className="aboutpage-section container" id="currently">
          <div className="aboutpage-eyebrow-wrapper">
            <span className="aboutpage-eyebrow">02 — CURRENTLY</span>
          </div>

          <div className="aboutpage-currently-grid-three">
            {CURRENTLY_ITEMS.map((item) => (
              <div className="aboutpage-currently-col" key={item.num}>
                <span className="aboutpage-currently-num">{item.num}</span>
                <div className="aboutpage-currently-line" />
                <h3 className="aboutpage-currently-title">{item.label}</h3>
                <p className="aboutpage-currently-desc">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Circular CTA Button (Get in touch) */}
        <div className="aboutpage-cta-wrapper container">
          <a
            className="aboutpage-btn-round magnetic"
            data-strength="42"
            href={`mailto:${EMAIL}`}
          >
            <span className="aboutpage-btn-label">See all works</span>
            <span className="aboutpage-btn-arrow">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17 17 7M8 7h9v9"
                />
              </svg>
            </span>
          </a>
        </div>

        <Footer />
      </main>
    </>
  );
}

export default AboutPage;
