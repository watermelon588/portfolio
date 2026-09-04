import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { navItems, topNavItems, socials, EMAIL } from "@/data/nav";
import "./Navbar.css";

// Navbar — right-opening staggered menu (accent underlay layers, straight edge,
// 1/3 width), magnetic fields, docked close, headed sections, social icons.
// Tokens from tokens.css; motion per DESIGN_SYSTEM Part V.

const SOCIALS = ["GitHub", "X", "LinkedIn", "Instagram"] as const;
const socialHref = (name: string) => socials.find((s) => s.name === name)?.href ?? "#";

function SocialIcon({ name }: { name: (typeof SOCIALS)[number] }) {
  switch (name) {
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.64-2.81 5.66-5.49 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"
          />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.95 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48z"
          />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useMagnetic(root);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Closed baseline (right-anchored, off to the right, no curve offset).
  useGSAP(
    () => {
      gsap.set(".menu", { pointerEvents: "none" });
      gsap.set(".menu-backdrop", { opacity: 0 });
      gsap.set([".menu-layer", ".menu-panel"], { xPercent: 100, "--curve": 0 });
      gsap.set(".menu-link-inner", { yPercent: 125, rotate: 8 });
      gsap.set(".menu-meta", { opacity: 0, y: 24 });
      gsap.set(".menu-close", { opacity: 0, rotate: -90, scale: 0.6 });
    },
    { scope: root },
  );

  // Fresh open/close timeline per toggle — slower & fluid.
  useGSAP(
    () => {
      if (open) {
        gsap.set(".menu", { pointerEvents: "auto" });
        gsap
          .timeline({ defaults: { ease: "power3.inOut" } })
          .to(".menu-backdrop", { opacity: 1, duration: 0.9, ease: "power2.out" }, 0)
          .to(".menu-layer-1", { xPercent: 0, duration: 1.1 }, 0)
          .to(".menu-layer-2", { xPercent: 0, duration: 1.1 }, 0.13)
          .to(".menu-panel", { xPercent: 0, duration: 1.1 }, 0.26)
          // curve starts hidden, smoothly bulges mid-slide, then flattens once seated
          .fromTo(
            [".menu-layer", ".menu-panel"],
            { "--curve": 0 },
            { "--curve": 1, duration: 0.55, ease: "sine.inOut" },
            0.3,
          )
          .to([".menu-layer", ".menu-panel"], { "--curve": 0, duration: 0.6, ease: "sine.inOut" }, 0.9)
          .to(
            ".menu-close",
            { opacity: 1, rotate: 0, scale: 1, duration: 0.8, ease: "power3.out" },
            0.75,
          )
          .fromTo(
            ".menu-link-inner",
            { yPercent: 125, rotate: 8 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 1.05,
              ease: "expo.out",
              stagger: 0.09,
              overwrite: "auto",
            },
            0.72,
          )
          .to(".menu-meta", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.05);
      } else {
        gsap
          .timeline({
            defaults: { ease: "power3.inOut" },
            onComplete: () => gsap.set(".menu", { pointerEvents: "none" }),
          })
          // curve smoothly bulges during the exit slide, then hides again
          .fromTo(
            [".menu-layer", ".menu-panel"],
            { "--curve": 0 },
            { "--curve": 1, duration: 0.45, ease: "sine.inOut" },
            0.1,
          )
          .to([".menu-layer", ".menu-panel"], { "--curve": 0, duration: 0.45, ease: "sine.inOut" }, 0.6)
          .to(
            ".menu-link-inner",
            { yPercent: 125, rotate: 8, duration: 0.5, ease: "power2.in", stagger: 0.05 },
            0,
          )
          .to(".menu-meta", { opacity: 0, y: 24, duration: 0.35 }, 0)
          .to(".menu-close", { opacity: 0, rotate: -90, scale: 0.6, duration: 0.4 }, 0)
          .to(".menu-panel", { xPercent: 100, duration: 0.85 }, 0.15)
          .to(".menu-layer-2", { xPercent: 100, duration: 0.85 }, 0.25)
          .to(".menu-layer-1", { xPercent: 100, duration: 0.85 }, 0.35)
          .to(".menu-backdrop", { opacity: 0, duration: 0.6 }, 0.35);
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
          duration: 1.1,
          ease: "power4.out",
        });
      };
      const leave = () =>
        gsap.to(el, { x: 0, y: 0, duration: 1.4, ease: "elastic.out(1, 0.3)" });
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, [scrolled, open]);

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
      <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
        <Link className="nav-wordmark magnetic" data-strength="18" to="/" aria-label="Rohit Maity — home">
          <span className="nav-copy">©</span>
          <span>Code&nbsp;by&nbsp;ROHIT</span>
        </Link>

        <div className="nav-links">
          {topNavItems.map((item) => (
            <Link key={item.path} className="nav-link-item magnetic" data-strength="15" to={item.path}>
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="menu-toggle magnetic"
          data-strength="40"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open menu"
        >
          <span className="menu-toggle-icon">
            <i />
            <i />
          </span>
        </button>
      </header>

      <nav className="menu" aria-hidden={!open}>
        <div className="menu-backdrop" onClick={() => setOpen(false)} />
        <div className="menu-layer menu-layer-1" aria-hidden="true" />
        <div className="menu-layer menu-layer-2" aria-hidden="true" />
        <div className="menu-panel">
          <div className="menu-bar">
            <button
              className="menu-close magnetic"
              data-strength="26"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <span className="menu-close-icon">
                <i />
                <i />
              </span>
            </button>
          </div>

          <div className="menu-heading menu-heading--nav">
            <span>Navigation</span>
            <span className="menu-rule" />
          </div>
          <ul className="menu-links">
              {navItems.map((item, i) => (
                <li className="menu-link" key={item.path}>
                  <Link className="magnetic" data-strength="24" to={item.path} onClick={() => setOpen(false)}>
                    <span className="menu-index">{`0${i + 1}`}</span>
                    <span className="menu-link-mask">
                      <span className="menu-link-inner">{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

          <div className="menu-meta">
            <div className="menu-heading">
              <span>Socials</span>
              <span className="menu-rule" />
            </div>
            <div className="menu-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href={socialHref(s)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-social magnetic"
                  data-strength="16"
                  aria-label={s}
                >
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
            <a href={`mailto:${EMAIL}`} className="menu-email">
              {EMAIL}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
