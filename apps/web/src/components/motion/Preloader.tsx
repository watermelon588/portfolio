import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Preloader.css";

// Preloader — dark-world intro: cycling role-words, then the screen exits
// upward on a curved edge while the page content rises to meet it. Runs once
// per session (every reload in dev, for testing). DESIGN_SYSTEM Part VII.

const WORDS = ["Developer", "Designer", "Builder", "Cracked", "Weird"];

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(() => {
    if (import.meta.env.DEV) return false;
    return typeof sessionStorage !== "undefined" && sessionStorage.getItem("preloaded") === "1";
  });

  useGSAP(
    () => {
      if (done || !root.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.body.style.overflow = "hidden";

      const finish = () => {
        document.body.style.overflow = "";
        try {
          sessionStorage.setItem("preloaded", "1");
        } catch {
          /* ignore */
        }
        setDone(true);
      };

      if (reduce) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.3, delay: 0.2, onComplete: finish });
        return;
      }

      const words = gsap.utils.toArray<HTMLElement>(".preloader-word");
      const tl = gsap.timeline({ onComplete: finish });

      // fast word cycle
      tl.set(words, { opacity: 0, y: 22 });
      words.forEach((w, i) => {
        const last = i === words.length - 1;
        tl.to(w, { opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }, i === 0 ? 0.15 : "<0.26");
        if (!last) tl.to(w, { opacity: 0, y: -22, duration: 0.16, ease: "power3.in" }, "<0.2");
      });

      // exit: the curved bottom edge sweeps up (slow) and softly flattens,
      // while the content rises to meet it — dennissnellenberg.com language
      tl.to(".preloader", { yPercent: -100, duration: 1.35, ease: "power3.inOut" }, ">0.4")
        .to(".preloader-curve", { scaleY: 0, duration: 0.8, ease: "power2.inOut" }, "<0.6")
        .from("main", { y: 70, autoAlpha: 0, duration: 1.5, ease: "expo.out" }, "<");
    },
    { scope: root, dependencies: [] },
  );

  if (done) return null;
  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader-words">
        {WORDS.map((w) => (
          <h2 className="preloader-word" key={w}>
            {w}
            <span className="preloader-dot" />
          </h2>
        ))}
      </div>
      <div className="preloader-curve" />
    </div>
  );
}
