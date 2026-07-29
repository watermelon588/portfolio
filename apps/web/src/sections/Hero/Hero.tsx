import { useRef } from "react";
import posterImg from "@/assets/images/poster1.jpeg";
import portraitImg from "@/assets/images/portrait1.png";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { ContactCards } from "../ContactCards/ContactCards";
import "./Hero.css";

export function Hero() {
  // Scope the shared magnetic field to the hero so the `.magnetic` contact
  // cards pull toward the cursor (desktop / non-reduced-motion only).
  const root = useRef<HTMLDivElement>(null);
  useMagnetic(root);

  return (
    <section className="hero section" id="home">
      <div className="hero-grid container" ref={root}>
        {/* Left column: poster (top) → "Get in touch" → contact cards (bottom) */}
        <div className="hero-left">
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

        {/* Right column: portrait, spanning the full hero height */}
        <div className="hero-right" data-hero="portrait">
          <img
            src={portraitImg}
            alt="Portrait of Rohit Maity"
            className="hero-portrait-img"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
export default Hero;
