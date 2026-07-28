import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { LocalTime } from "@/components/motion/LocalTime";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

// Contact footer — dark world (ADR-018), modelled on the reference site's
// closing "invitation": portrait + "Let's work together" headline with a
// scroll-rotating arrow, a circular magnetic Get-in-touch button, the
// Version / Local-time / Socials meta row, and the giant name drifting
// horizontally on scroll. Content is Rohit's own.

const EMAIL = "maityrohit021@gmail.com";
const FULL_NAME = "Rohit Maity";

const SOCIALS: { name: string; href: string; path: string }[] = [
  {
    name: "GitHub",
    href: "https://github.com/rohitmaity",
    path: "M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.64-2.81 5.66-5.49 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/rohitmaity",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    name: "X",
    href: "https://x.com/rohitmaity",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/rohitmaity",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.4-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17 17 7M8 7h9v9"
      />
    </svg>
  );
}

export function Footer() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);

  // Scroll-linked flourishes: the headline arrow rotates and the giant name
  // drifts sideways as the footer scrolls into view. Own triggers only.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !root.current) return;
      const created: ScrollTrigger[] = [];
      const track = (t: gsap.core.Tween) => {
        if (t.scrollTrigger) created.push(t.scrollTrigger);
      };

      const arrow = root.current.querySelector(".footer-headline-arrow");
      if (arrow) {
        track(
          gsap.fromTo(
            arrow,
            { rotate: -55 },
            {
              rotate: 45,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top bottom", end: "center bottom", scrub: true },
            },
          ),
        );
      }

      const bigname = root.current.querySelector(".footer-bigname-inner");
      if (bigname) {
        track(
          gsap.fromTo(
            bigname,
            { xPercent: 4 },
            {
              xPercent: -8,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
            },
          ),
        );
      }

      return () => created.forEach((t) => t.kill());
    },
    { scope: root },
  );

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer" id="contact" ref={root}>
      <div className="footer-inner container">
        {/* Headline: avatar + "Let's work together" + rotating arrow */}
        <a className="footer-headline" href={`mailto:${EMAIL}`}>
          <span className="footer-avatar" aria-hidden="true">
            RM
          </span>
          <h2 className="footer-headline-text">Let&rsquo;s work together</h2>
          <span className="footer-headline-arrow" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </a>

        {/* Contact details + circular magnetic CTA */}
        <div className="footer-cta-row">
          <div className="footer-contacts">
            <a className="footer-contact" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <span className="footer-contact footer-contact--muted">
              Based in India — available worldwide
            </span>
          </div>

          <a className="footer-orb magnetic" data-strength="34" href={`mailto:${EMAIL}`}>
            <span className="footer-orb-label">
              Get in
              <br />
              touch
            </span>
            <ArrowUpRight />
          </a>
        </div>

        <div className="footer-divider" />

        {/* Meta row: Version · Local time · Socials · Back to top */}
        <div className="footer-meta">
          <div className="footer-meta-col">
            <span className="footer-meta-label">Version</span>
            <span className="footer-meta-value">2026 &copy; Edition</span>
          </div>
          <div className="footer-meta-col">
            <span className="footer-meta-label">Local time</span>
            <LocalTime className="footer-meta-value" />
          </div>
          <nav className="footer-socials" aria-label="Social links">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social magnetic"
                data-strength="14"
                aria-label={s.name}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d={s.path} />
                </svg>
              </a>
            ))}
          </nav>
          <button className="footer-top magnetic" data-strength="18" onClick={scrollTop}>
            <span>Back to top</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19V5M6 11l6-6 6 6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Giant parallax name */}
      <div className="footer-bigname" aria-hidden="true">
        <span className="footer-bigname-inner">{FULL_NAME}</span>
      </div>
    </footer>
  );
}

export default Footer;
