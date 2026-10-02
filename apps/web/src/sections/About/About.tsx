import { useRef } from "react";
import { Link } from "react-router";
import { useMagnetic } from "@/components/motion/useMagnetic";
import ScrollReveal from "@/components/vendor/reactbits/ScrollReveal/ScrollReveal";
import "./About.css";

const SKILLS = [
  "Python",
  "Node.js",
  "React",
  "TypeScript",
  "LangGraph",
  "PostgreSQL",
  "Agentic AI",
  "LLM Engineering",
  "FastAPI",
  "Express",
  "WebSockets",
  "MongoDB",
  "n8n",
];

export function About() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);

  return (
    <section className="about section" id="about" ref={root}>
      <div className="container">
        <div className="about-topline">
          <span className="about-eyebrow">About</span>
          <span className="about-availability">
            <i className="about-dot" aria-hidden="true" />
            Available for work in 2026
          </span>
        </div>

        <div className="about-grid">
          <div className="about-statement">
            <ScrollReveal
              containerClassName="about-reveal"
              baseOpacity={0.12}
              baseRotation={4}
              blurStrength={8}
              wordAnimationEnd="bottom center+=20%"
              rotationEnd="bottom center+=20%"
            >
              I build the backends products run on: fast APIs, AI pipelines and realtime systems that don’t fall apart.
            </ScrollReveal>
          </div>

          <div className="about-copy">
            <p className="about-copy-text">
              Backend engineer first. I sweat the systems nobody sees, then give them interfaces people enjoy using.
            </p>
            <Link
              className="about-btn-round magnetic"
              data-strength="36"
              to="/about"
            >
              <span>ABOUT ME</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tech-stack marquee */}
      <div className="about-marquee" aria-hidden="true">
        <div className="about-marquee-track">
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <span className="about-skill" key={i}>
              {s}
              <span className="about-skill-star">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
