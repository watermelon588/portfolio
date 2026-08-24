import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/hero/66.png";
import { useMagnetic } from "@/components/motion/useMagnetic";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useMagnetic(root);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      // Scroll-triggered horizontal scrub for oversized typography
      gsap.to(trackRef.current, {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Subtle parallax on the hero portrait image
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root }
  );

  return (
    <section className="hero-fold section" id="home" ref={root}>
      {/* Background oversized title passing horizontally behind the portrait */}
      <div className="hero-title-container">
        <div className="hero-title-track" ref={trackRef}>
          <h1 className="hero-title-text">Rohit Maity —&nbsp;</h1>
          <h1 className="hero-title-text">Rohit Maity —&nbsp;</h1>
          <h1 className="hero-title-text">Rohit Maity —&nbsp;</h1>
        </div>
      </div>

      {/* Center hero portrait image */}
      <div className="hero-portrait-wrapper">
        <img
          ref={imgRef}
          src={heroImg}
          alt="Rohit Maity"
          className="hero-portrait-img"
          loading="eager"
        />
      </div>

      {/* Lower content layer: Left Resume component, Right Role text */}
      <div className="hero-bottom-bar container">
        {/* Left side: Resume Pill Component */}
        <a
          href="/Rohit-Maity-Resume.pdf"
          download="Rohit-Maity-Resume.pdf"
          className="hero-resume-pill magnetic"
          data-strength="25"
          aria-label="Download Resume PDF"
        >
          <div className="hero-resume-globe">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="hero-globe-icon"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3.6 9h16.8M3.6 15h16.8" />
              <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
            </svg>
          </div>
          <div className="hero-resume-details">
            <span className="hero-resume-sub">Download</span>
            <span className="hero-resume-title">Resume</span>
          </div>
        </a>

        {/* Right side: Role & Arrow component */}
        <div className="hero-role-block">
          <div className="hero-role-arrow-box magnetic" data-strength="15">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="hero-role-arrow"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="hero-role-text">
            <p className="hero-role-line">Freelance</p>
            <p className="hero-role-line">Designer &amp; Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

