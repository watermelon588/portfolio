import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Navbar.css";

// Navbar — top bar + side-opening staggered menu with a curved leading edge
// and magnetic buttons. Phase 2 styleguide component. Tokens from tokens.css;
// motion per DESIGN_SYSTEM Part V.

const LINKS = ["Home", "Work", "About", "Contact"];
const SOCIALS = ["Instagram", "GitHub", "LinkedIn"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Closed baseline — re-applied on every (re)mount, robust to StrictMode.
  useGSAP(
    () => {
      gsap.set(".menu", { pointerEvents: "none" });
      gsap.set(".menu-backdrop", { opacity: 0 });
      gsap.set(".menu-panel", { xPercent: 100, x: "13vh" });
      gsap.set(".menu-link-inner", { yPercent: 120 });
      gsap.set(".menu-meta", { opacity: 0 });
    },
    { scope: root },
  );

  // Fresh open/close timeline per toggle.
  useGSAP(
    () => {
      if (open) {
        gsap.set(".menu", { pointerEvents: "auto" });
        gsap
          .timeline()
          .to(".menu-backdrop", { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
          .to(".menu-panel", { xPercent: 0, x: 0, duration: 0.8, ease: "power4.inOut" }, 0)
          .to(
            ".menu-link-inner",
            { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.07 },
            "-=0.4",
          )
          .to(".menu-meta", { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.4");
      } else {
        gsap
          .timeline({ onComplete: () => gsap.set(".menu", { pointerEvents: "none" }) })
          .to(".menu-meta", { opacity: 0, duration: 0.2, ease: "power2.in" }, 0)
          .to(
            ".menu-link-inner",
            { yPercent: 120, duration: 0.3, ease: "power2.in", stagger: 0.03 },
            0,
          )
          .to(
            ".menu-panel",
            { xPercent: 100, x: "13vh", duration: 0.6, ease: "power4.inOut" },
            "-=0.1",
          )
          .to(".menu-backdrop", { opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.5");
      }
    },
    { dependencies: [open], scope: root },
  );

  // Magnetic pull on .magnetic elements (desktop, non-reduced-motion only).
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce || !root.current) return;
    const els = Array.from(root.current.querySelectorAll<HTMLElement>(".magnetic"));
    const cleanups = els.map((el) => {
      const strength = Number(el.dataset.strength ?? 30);
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength,
          y: ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength,
          duration: 1,
          ease: "power4.out",
        });
      };
      const leave = () =>
        gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  // Esc closes; lock scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div ref={root}>
      <header className={`nav ${open ? "nav--open" : ""}`}>
        <a className="nav-wordmark magnetic" data-strength="18" href="#" aria-label="Rohit Maity — home">
          <span className="nav-copy">©</span>
          <span>Rohit&nbsp;Maity</span>
        </a>
        <button
          className="menu-toggle magnetic"
          data-strength="40"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="menu-toggle-track">
            <span className="menu-toggle-word">Menu</span>
            <span className="menu-toggle-word">Close</span>
          </span>
        </button>
      </header>

      <nav className="menu" aria-hidden={!open}>
        <div className="menu-backdrop" onClick={() => setOpen(false)} />
        <div className="menu-panel">
          <ul className="menu-links">
            {LINKS.map((label, i) => (
              <li className="menu-link" key={label}>
                <a href="#">
                  <span className="menu-index">{`0${i + 1}`}</span>
                  <span className="menu-link-mask">
                    <span className="menu-link-inner">{label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="menu-meta">
            <span className="menu-meta-label">Socials</span>
            <div className="menu-socials">
              {SOCIALS.map((s) => (
                <a key={s} href="#" className="menu-social">
                  {s}
                </a>
              ))}
            </div>
            <a href="#" className="menu-email">
              maityrohit021@gmail.com
            </a>
          </div>

          <div className="menu-curve-wrap" aria-hidden="true">
            <div className="menu-curve" />
          </div>
        </div>
      </nav>
    </div>
  );
}
