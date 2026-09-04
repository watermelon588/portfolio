import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CurveSwipe } from "./CurveSwipe";
import { useCurveSwipe } from "../../hooks/useCurveSwipe";
import "./Preloader.css";

// Preloader — dark-world intro: cycling role-words, then the screen exits
// upward on a curved edge while the page content rises to meet it. Runs once
// per session (every reload in dev, for testing). DESIGN_SYSTEM Part VII.

// English role-words interleaved with Hindi + Bengali (डेवलपर = developer,
// निर्माता = creator; ডিজাইনার = designer, শিল্পী = artist). "Weird" stays last.
const WORDS = [
  "Hello",
  "Developer",
  "डेवलपर",
  "Designer",
  "ডিজাইনার",
  "Cracked",
  "Weird",
];

// Module-scoped: the intro plays once per full page load, NOT on every
// client-side navigation back to Home (that's the page transition's job). Resets
// naturally on a hard reload since the module re-evaluates.
let appPreloaded = false;

export function Preloader({ text }: { text?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [done, setDone] = useState(() => {
    if (appPreloaded) return true;
    if (import.meta.env.DEV) return false;
    return (
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("preloaded") === "1"
    );
  });

  const displayWords = text ? [text] : WORDS;

  // Reusable curve swipe swipe manager
  const swipe = useCurveSwipe(pathRef, { direction: "up", duration: 1.7 });

  useGSAP(
    () => {
      if (done || !root.current) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document.body.style.overflow = "hidden";

      const finish = () => {
        document.body.style.overflow = "";
        appPreloaded = true;
        try {
          sessionStorage.setItem("preloaded", "1");
        } catch {
          /* ignore */
        }
        setDone(true);
      };

      if (reduce) {
        gsap.to(root.current, {
          autoAlpha: 0,
          duration: 0.3,
          delay: 0.2,
          onComplete: finish,
        });
        return;
      }

      // Sub-animation: cycling through overlay words
      const wordAnimation = () => {
        const words = gsap.utils.toArray<HTMLElement>(".preloader-word");
        const tl = gsap.timeline();
        tl.set(words, { opacity: 0, y: 22 });
        words.forEach((w, i) => {
          const isFirst = i === 0;
          const isLast = i === words.length - 1;

          // First word has a slower entrance and longer dwell time for clear readability
          const inDuration = isFirst ? 0.28 : 0.12;
          const outDuration = isFirst ? 0.18 : 0.1;
          const enterPosition = isFirst ? 0.15 : "<0.16";
          const exitPosition = isFirst ? "<0.45" : "<0.12";

          tl.to(
            w,
            { opacity: 1, y: 0, duration: inDuration, ease: "power3.out" },
            enterPosition,
          );
          if (!isLast)
            tl.to(
              w,
              { opacity: 0, y: -22, duration: outDuration, ease: "power3.in" },
              exitPosition,
            );
        });
        return tl;
      };

      // Sub-animation: fading/sliding in the main content beneath
      const mainReveal = () => {
        return gsap.from("main", {
          y: 70,
          autoAlpha: 0,
          duration: 1.5,
          ease: "expo.out",
        });
      };

      // Sequenced timeline coordinating the entire preloader flow. The words
      // ride up and fade WITH the curtain (autoAlpha at "<" == swipe start), so
      // the last word ("Weird") never lingers over the revealed page.
      const timeline = gsap.timeline({ onComplete: finish });
      timeline
        .add(wordAnimation())
        .add(swipe.exit(), ">0.4")
        .to(
          ".preloader-words",
          { autoAlpha: 0, y: -60, duration: 0.6, ease: "power2.in" },
          "<",
        )
        .add(mainReveal(), "<0.85");
    },
    { scope: root, dependencies: [] },
  );

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <CurveSwipe pathRef={pathRef} />
      <div className="preloader-words">
        {displayWords.map((w) => (
          <h2
            className={`preloader-word ${text ? "preloader-word--title" : "preloader-word--small"}`}
            key={w}
          >
            {w}
            <span className="preloader-dot" />
          </h2>
        ))}
      </div>
    </div>
  );
}
