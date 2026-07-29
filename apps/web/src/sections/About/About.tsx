import ScrollReveal from "@/components/vendor/reactbits/ScrollReveal/ScrollReveal";
import "./About.css";

const SKILLS = [
  "React",
  "TypeScript",
  "GSAP",
  "Node.js",
  "Express",
  "MongoDB",
  "FastAPI",
  "Three.js",
  "Tailwind CSS",
  "Motion",
  "Python",
  "Vite",
];

export function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-topline">
          <span className="about-eyebrow">About</span>
          <span className="about-availability">
            <i className="about-dot" aria-hidden="true" />
            Available for work — 2026
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
              Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.
            </ScrollReveal>
          </div>

          <div className="about-copy">
            <p className="about-copy-text">
              The combination of my passion for design, code &amp; interaction positions me in a unique place in the web design world.
            </p>
            <a className="about-cta magnetic" data-strength="14" href="#work">
              <span>See my work</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 5l7 7-7 7"
                />
              </svg>
            </a>
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
