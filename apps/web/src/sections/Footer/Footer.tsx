import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { LocalTime } from "@/components/motion/LocalTime";
import { socials, EMAIL } from "@/data/nav";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

// Contact footer — a faithful rebuild of the reference site's footer
// (dennissnellenberg.com), measured from the live DOM:
//   rotating arrow → "Let's work together" headline → full-width stripe →
//   email/phone pills (left) + circular magnetic "Get in touch" (right) →
//   bottom bar: Version + Local time (left), Socials list (right).
// Dark world, flat top. Content is Rohit's own.
const LINKEDIN = "https://linkedin.com/in/rohitmaity";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);

  // The arrow rotates as the footer scrolls into view (scrubbed) — reference site.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !root.current) return;
      const arrow = root.current.querySelector(".footer-arrow");
      if (!arrow) return;
      const tw = gsap.fromTo(
        arrow,
        { rotate: -90 },
        {
          rotate: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true },
        },
      );
      return () => tw.scrollTrigger?.kill();
    },
    { scope: root },
  );

  return (
    <footer className="footer" id="contact" ref={root}>
      <div className="footer-top">
        <span className="footer-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17 17 7M8 7h9v9"
            />
          </svg>
        </span>

        <h2 className="footer-heading">
          <span>Let&rsquo;s work</span>
          <span>together</span>
        </h2>

        <span className="footer-stripe" />

        <div className="footer-cta-row">
          <div className="footer-contacts">
            <a className="footer-pill magnetic" data-strength="24" href={`mailto:${EMAIL}`}>
              <span>{EMAIL}</span>
            </a>
            <a
              className="footer-pill magnetic"
              data-strength="24"
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>linkedin.com/in/rohitmaity</span>
            </a>
          </div>

          <a className="footer-round magnetic" data-strength="42" href={`mailto:${EMAIL}`}>
            <span>Get in touch</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <div className="footer-block">
            <h5>Version</h5>
            <p>2026 &copy; Edition</p>
          </div>
          <div className="footer-block">
            <h5>Local time</h5>
            <p>
              <LocalTime />
            </p>
          </div>
        </div>

        <div className="footer-block footer-block--socials">
          <h5>Socials</h5>
          <ul className="footer-sociallist">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  className="footer-social"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
