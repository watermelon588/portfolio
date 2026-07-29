import { useRef } from "react";
import posterImg from "@/assets/images/poster1.jpeg";
import portraitImg from "@/assets/images/portrait1.png";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { SplineRobot } from "@/components/motion/SplineRobot";
import { ContactCards } from "../ContactCards/ContactCards";
import "./Hero.css";

// TODO(Rohit): replace with the real public `.splinecode` export URL for the
// R4X Bot scene (see project chat for how to get it). Left unset for now —
// SplineRobot renders nothing until a real scene URL is provided.
const ROBOT_SCENE_URL = "";

export function Hero() {
  // Scope the shared magnetic field to the hero so the `.magnetic` contact
  // cards pull toward the cursor (desktop / non-reduced-motion only).
  const root = useRef<HTMLDivElement>(null);
  useMagnetic(root);

  return (
    <section className="hero section" id="home">
      <div className="hero-grid container" ref={root}>
        {/* Left column: headline → poster → "Get in touch" → contact cards */}
        <div className="hero-left">
          <div className="hero-heading" data-hero="heading">
            <p className="hero-eyebrow">Full-stack developer · India</p>
            <h1 className="hero-name">Rohit Maity</h1>
          </div>

          <div className="hero-poster" data-hero="poster">
            <img
              src={posterImg}
              alt="Portfolio 2026 poster"
              className="hero-poster-img"
              loading="eager"
            />
          </div>

          <div className="hero-contact" data-hero="contact">
            <h2 className="hero-contact-title">Get in touch</h2>
            <ContactCards />
          </div>
        </div>

        {/* Right column: portrait, spanning the full hero height, with the
            interactive robot peeking from its bottom-right corner */}
        <div className="hero-right" data-hero="portrait">
          <img
            src={portraitImg}
            alt="Portrait of Rohit Maity"
            className="hero-portrait-img"
            loading="eager"
          />
          {ROBOT_SCENE_URL && (
            <SplineRobot scene={ROBOT_SCENE_URL} className="hero-robot" />
          )}
        </div>
      </div>
    </section>
  );
}
export default Hero;
