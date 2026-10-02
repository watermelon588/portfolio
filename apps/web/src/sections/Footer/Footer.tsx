import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/hero/pfp.png";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { LocalTime } from "@/components/motion/LocalTime";
import { socials, EMAIL } from "@/data/nav";
import { projects } from "@/data/projects";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

import { GLOBAL_LINKS } from "@/data/links";

const LINKEDIN = GLOBAL_LINKS.linkedin;


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

export interface FooterProps {
  nextProject?: {
    title: string;
    slug: string;
    image?: string;
    role?: string;
  };
}


export function Footer({ nextProject }: FooterProps = {}) {
  // Use the destination's explicit footer mockup; never borrow another case's.
  const nextImage = projects.find((project) => project.slug === nextProject?.slug)?.nextCaseImage ?? nextProject?.image;
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

      // Curved reveal: a cover painted in the colour of the section ABOVE the
      // footer sits over the footer only. Its curved bottom edge rises as the
      // footer scrolls in, uncovering the dark footer from the bottom up. It
      // never extends above the footer, so page content stays visible.
      if (curveRef.current) {
        const path = curveRef.current;
        const coverColor = () => {
          let el: Element | null = root.current!.previousElementSibling ?? root.current!.parentElement;
          while (el) {
            const bg = getComputedStyle(el).backgroundColor;
            if (bg && bg !== "transparent" && !bg.endsWith(", 0)")) return bg;
            el = el.parentElement;
          }
          return getComputedStyle(document.body).backgroundColor;
        };
        path.style.fill = coverColor();
        const draw = (p: number) => {
          const q = Math.min(1, Math.max(0, p));
          const edge = 100 * (1 - q);
          const bulge = Math.sin(q * Math.PI) * 30;
          const ctrl = edge - bulge;
          path.setAttribute("d", `M 0 0 L 100 0 L 100 ${edge} Q 50 ${ctrl} 0 ${edge} Z`);
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
    { scope: root, dependencies: [nextProject?.slug] },
  );

  return (
    <footer
      className={`footer ${nextProject ? "footer--has-next-project" : ""}`}
      id="contact"
      ref={root}
    >
      <div className="footer-top container">
        {nextProject ? (
          <>
            <div className="footer-next-header">
              <span className="footer-next-eyebrow">NEXT CASE</span>
              <span className="footer-arrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </div>

            <div className="footer-next-content">
              <Link
                to={`/work/${nextProject.slug}`}
                className="footer-next-title-link"
              >
                <h2 className="footer-heading footer-next-heading">
                  {nextProject.title}
                </h2>
              </Link>

              {/* Image + Next Case button are one moving frame */}
              {nextImage && (
                <div className="footer-next-peek-viewport">
                  <Link
                    to={`/work/${nextProject.slug}`}
                    className="footer-next-peek-frame"
                  >
                    <img
                      src={nextImage}
                      alt={nextProject.title}
                      className="footer-next-preview-img"
                      loading="lazy"
                      decoding="async"
                    />

                    <span
                      className="footer-round magnetic"
                      data-strength="42"
                    >
                      <span className="footer-round-label">Next Case</span>
                      <span className="footer-round-arrow">
                        <ArrowUpRight />
                      </span>
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <span className="footer-stripe" />

            <div className="footer-cta-row">
              <div className="footer-contacts">
                <Link
                  className="footer-pill magnetic"
                  data-strength="24"
                  to="/work"
                >
                  <span>All Work &rarr;</span>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="footer-arrow" aria-hidden="true">
              <ArrowUpRight />
            </span>

            <h2 className="footer-heading">
              <span className="footer-heading-first">
                <img
                  src={heroImg}
                  alt="Rohit Maity profile picture"
                  className="footer-pfp"
                />
                <span>Let&rsquo;s work</span>
              </span>
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

              <Link className="footer-round magnetic" data-strength="42" to="/contact">
                <span className="footer-round-label">Get in touch</span>
                <span className="footer-round-arrow">
                  <ArrowUpRight />
                </span>
              </Link>
            </div>
          </>
        )}
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
