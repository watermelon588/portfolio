import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { LocalTime } from "@/components/motion/LocalTime";
import { navItems, socials, EMAIL } from "@/data/nav";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

// Contact footer — dark world (ADR-018). Deliberately BORROWS the navbar's
// staggered menu: masked links that rise + rotate into place (same values as
// Navbar's open timeline) and the same magnetic field (useMagnetic), turned up
// aggressive here. Simplified to the shared nav links + socials + email.
const FULL_NAME = "Rohit Maity";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);

  // Reveal on scroll-in — the exact link entrance from the navbar menu.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !root.current) return;

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ".footer-link-inner",
            { yPercent: 125, rotate: 8 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 1.05,
              ease: "expo.out",
              stagger: 0.09,
              overwrite: "auto",
            },
          );
          gsap.fromTo(
            [".footer-heading", ".footer-tail"],
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.08, overwrite: "auto" },
          );
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <footer className="footer" id="contact" ref={root}>
      <div className="footer-inner container">
        <div className="footer-heading">
          <span>Menu</span>
          <span className="footer-rule" />
        </div>

        <ul className="footer-links">
          {navItems.map((item, i) => (
            <li className="footer-link" key={item.path}>
              <Link className="footer-link-a magnetic" data-strength="36" to={item.path}>
                <span className="footer-index">{`0${i + 1}`}</span>
                <span className="footer-link-mask">
                  <span className="footer-link-inner">{item.label}</span>
                </span>
                <span className="footer-link-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17 17 7M8 7h9v9"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="footer-tail">
          <div className="footer-heading">
            <span>Socials</span>
            <span className="footer-rule" />
          </div>

          <div className="footer-socials">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social magnetic"
                data-strength="22"
                aria-label={s.name}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <a className="footer-email magnetic" data-strength="24" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>

          <div className="footer-metabar">
            <span className="footer-meta-item">
              <span className="footer-meta-label">Version</span>2026 &copy; Edition
            </span>
            <span className="footer-meta-item">
              <span className="footer-meta-label">Local time</span>
              <LocalTime />
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bigname" aria-hidden="true">
        <span className="footer-bigname-inner">{FULL_NAME}</span>
      </div>
    </footer>
  );
}

export default Footer;
