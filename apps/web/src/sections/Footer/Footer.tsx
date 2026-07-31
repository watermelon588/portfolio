import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { LocalTime } from "@/components/motion/LocalTime";
import { socials, EMAIL } from "@/data/nav";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

// Contact footer — faithful rebuild of the reference site's footer. The whole
// footer is uncovered by a curved swipe (same idea as the preloader/page
// transition): a LIGHT curtain — matching the page above — covers it, then
// sweeps UP on a curved edge as you scroll in, revealing the dark footer.
// Implemented with a normalized 0–100 viewBox so it works at any footer height.
const LINKEDIN = "https://linkedin.com/in/rohitmaity";

function ArrowUpRight() {
  return (
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
  );
}

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const curveRef = useRef<SVGPathElement>(null);
  useMagnetic(root);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const curtain = root.current?.querySelector<HTMLElement>(".footer-curtain");
      if (reduce || !root.current) {
        if (curtain) curtain.style.display = "none";
        return;
      }
      const created: Array<ScrollTrigger | undefined> = [];

      // Arrow rotates as the footer scrolls into view (scrubbed).
      const arrow = root.current.querySelector(".footer-arrow");
      if (arrow) {
        const tw = gsap.fromTo(
          arrow,
          { rotate: -90 },
          {
            rotate: 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true },
          },
        );
        created.push(tw.scrollTrigger);
      }

      // Curved reveal — the DARK footer rises up to cover the section, merging at
      // the top. A light cover (matching the page above) sits over the footer and
      // its curved bottom edge RISES, uncovering the dark footer from the bottom
      // up until it flattens/merges at the top. Normalized 0–100; scrub lag = slow.
      if (curveRef.current) {
        const path = curveRef.current;
        const draw = (p: number) => {
          const q = Math.min(1, Math.max(0, p));
          // Curved dark edge expands from the footer section and emerges to cover the viewport
          const top = 100 * (1 - q);
          const bulge = Math.sin(q * Math.PI) * 30;
          const ctrl = top - bulge;
          path.setAttribute("d", `M 0 ${top} Q 50 ${ctrl} 100 ${top} L 100 100 L 0 100 Z`);
        };
        draw(0);
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1.2, // smoothing lag → slow + buttery
          onUpdate: (self) => draw(self.progress),
        });
        created.push(st);
      }

      return () => created.forEach((t) => t?.kill());
    },
    { scope: root },
  );

  return (
    <footer className="footer" id="contact" ref={root}>
      <div className="footer-top container">
        <span className="footer-arrow" aria-hidden="true">
          <ArrowUpRight />
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
            <span className="footer-round-label">Get in touch</span>
            <span className="footer-round-arrow">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>

      <div className="footer-bottom container">
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
                  className="footer-social magnetic"
                  data-strength="16"
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

      <div className="footer-curtain" aria-hidden="true">
        <svg className="footer-curtain-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path ref={curveRef} className="footer-curtain-path" />
        </svg>
      </div>
    </footer>
  );
}

export default Footer;
