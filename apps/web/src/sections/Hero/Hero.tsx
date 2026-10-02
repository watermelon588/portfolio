import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/hero/66.png";
import { useMagnetic } from "@/components/motion/useMagnetic";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

// What I actually do, cycled under the static "Backend Engineer" line.
const ROLES = ["Scalable APIs", "AI agents & RAG", "Realtime systems", "Distributed backends"];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useMagnetic(root);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const textElements = trackRef.current.children;
      if (!textElements.length) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      let xPercent = -50;
      let direction = 1; // 1 = left to right, -1 = right to left
      let targetDirection = 1; // default: left to right
      let extraSpeed = 0;
      let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

      const baseSpeed = 0.08;

      const onTick = () => {
        // Smoothly interpolate current direction toward target direction
        direction += (targetDirection - direction) * 0.08;

        // Smoothly decay extra speed from scroll velocity
        extraSpeed *= 0.92;

        const currentSpeed = baseSpeed + extraSpeed;

        xPercent += currentSpeed * direction;

        // Wrap xPercent seamlessly between -100 and 0
        if (xPercent > 0) {
          xPercent = -100;
        } else if (xPercent < -100) {
          xPercent = 0;
        }

        gsap.set(textElements, { xPercent });
      };

      gsap.ticker.add(onTick);

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          // Calculate speed boost based on scroll velocity
          const vel = Math.abs(self.getVelocity());
          extraSpeed = Math.min(vel * 0.0004, 0.4);

          if (self.direction === 1) {
            // Scrolling down -> move in opposite direction (right to left)
            targetDirection = -1;
          } else if (self.direction === -1) {
            // Scrolling up -> move in left-to-right direction
            targetDirection = 1;
          }

          if (scrollTimeout) clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            targetDirection = 1;
          }, 400);
        },
      });

      // Subtle parallax on the hero portrait image
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Rotating role line + subtle cursor depth (name and portrait drift apart).
      const cleanups: Array<() => void> = [];
      const words = gsap.utils.toArray<HTMLElement>(".hero-role-roll-word");
      if (words.length > 1) {
        gsap.set(words, { yPercent: 110, visibility: "visible" });
        gsap.set(words[0]!, { yPercent: 0 });
        const tl = gsap.timeline({ repeat: -1 });
        words.forEach((w, i) => {
          const next = words[(i + 1) % words.length]!;
          tl.to(w, { yPercent: -110, duration: 0.7, ease: "power3.inOut" }, "+=2")
            .fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: "power3.inOut" }, "<");
        });
        cleanups.push(() => tl.kill());
      }
      if (window.matchMedia("(hover: hover)").matches && root.current) {
        const el = root.current;
        const trackX = gsap.quickTo(".hero-title-track", "x", { duration: 1.2, ease: "power3" });
        const imgX = gsap.quickTo(".hero-portrait-img", "x", { duration: 1.4, ease: "power3" });
        const onMove = (e: MouseEvent) => {
          const n = e.clientX / window.innerWidth - 0.5;
          trackX(n * -40);
          imgX(n * 18);
        };
        el.addEventListener("mousemove", onMove);
        cleanups.push(() => el.removeEventListener("mousemove", onMove));
      }

      return () => {
        cleanups.forEach((c) => c());
        gsap.ticker.remove(onTick);
        st.kill();
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    },
    { scope: root }
  );

  return (
    <section className="hero-fold section" id="home" ref={root}>
      {/* Background oversized title passing horizontally behind the portrait */}
      <div className="hero-title-container">
        <div className="hero-title-track" ref={trackRef}>
          {[0, 1, 2, 3].map((i) => {
            const Tag = i === 0 ? "h1" : "div";
            return (
              <Tag className="hero-title-text" key={i} aria-hidden={i > 0 || undefined}>
                Rohit Maity
                {" —"}
                &nbsp;
              </Tag>
            );
          })}
        </div>
      </div>

      {/* Center hero portrait image */}
      <div className="hero-portrait-wrapper">
        <img
          ref={imgRef}
          src={heroImg}
          alt="Rohit Maity"
          className="hero-portrait-img"
          loading="eager"
        />
      </div>

      {/* Lower content layer: Left Resume component, Right Role text */}
      <div className="hero-bottom-bar container">
        {/* Left side: Resume Pill Component */}
        <a
          href="/Rohit-Maity-Resume.pdf"
          download="Rohit-Maity-Resume.pdf"
          className="hero-resume-pill magnetic"
          data-strength="25"
          aria-label="Download Resume PDF"
        >
          <div className="hero-resume-globe">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hero-download-icon"
              aria-hidden="true"
            >
              <path d="M12 4v11M7 10.5 12 15.5l5-5M5 20h14" />
            </svg>
          </div>
          <div className="hero-resume-details">
            <span className="hero-resume-sub">Download</span>
            <span className="hero-resume-title">Resume</span>
          </div>
        </a>

        {/* Right side: Role & Arrow component */}
        <Link to="/work" className="hero-role-block hero-role-block--v2" aria-label="See my work">
          <span className="hero-role-arrow-box magnetic" data-strength="15">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="hero-role-arrow"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="hero-role-text">
            <span className="hero-role-line hero-role-line--main">Backend Engineer</span>
            <span className="hero-role-roll">
              {ROLES.map((r) => (
                <span className="hero-role-roll-word" key={r}>
                  {r}
                </span>
              ))}
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}

export default Hero;

