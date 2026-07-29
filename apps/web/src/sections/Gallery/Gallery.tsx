import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurveSwipe } from "@/components/motion/CurveSwipe";
import { useCurveSwipe } from "@/hooks/useCurveSwipe";
import { galleryImages } from "@/data/gallery";
import "./Gallery.css";

gsap.registerPlugin(ScrollTrigger);

// Gallery — full-bleed showcase of SkyGuide AI mockups. An infinite marquee of
// image cards, revealed by the SAME curved SVG swipe as the preloader (a dark
// curtain covers the strip until you scroll to it, then peels away upward).
// The reel drifts slowly and eases to a near-stop on hover ("buttery"); the
// hovered card lifts while the rest recede.
export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const marqueeRef = useRef<gsap.core.Tween | null>(null);
  const swipe = useCurveSwipe(pathRef, { direction: "up", duration: 1.7 });

  // Duplicate the set so the marquee can loop seamlessly (-50% == one set).
  const strip = [...galleryImages, ...galleryImages];
  const count = galleryImages.length;

  useGSAP(
    () => {
      if (!root.current || !pathRef.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const curtain = root.current.querySelector<HTMLElement>(".gallery-curtain");

      // Slow infinite horizontal drift of the image strip.
      if (!reduce && trackRef.current) {
        marqueeRef.current = gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 55,
          ease: "none",
          repeat: -1,
        });
      }

      if (reduce) {
        if (curtain) curtain.style.display = "none";
        return;
      }

      // Curtain starts covering the strip (dark full-cover rectangle).
      const w = window.innerWidth;
      const h =
        root.current.querySelector(".gallery-viewport")?.getBoundingClientRect().height ??
        window.innerHeight;
      pathRef.current.setAttribute("d", `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`);

      // Peel it away once, when the gallery scrolls into view.
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = swipe.exit();
          tl.eventCallback("onComplete", () => {
            if (curtain) curtain.style.display = "none";
          });
        },
      });

      return () => st.kill();
    },
    { scope: root },
  );

  // Buttery slow-down: ease the marquee's timeScale toward a crawl on hover.
  const slow = () => {
    if (marqueeRef.current) gsap.to(marqueeRef.current, { timeScale: 0.12, duration: 0.9, ease: "power2.out" });
  };
  const resume = () => {
    if (marqueeRef.current) gsap.to(marqueeRef.current, { timeScale: 1, duration: 1.1, ease: "power2.out" });
  };

  return (
    <section className="gallery" id="gallery" ref={root}>
      <div className="gallery-head container">
        <div className="gallery-head-row">
          <span className="gallery-eyebrow">Skyguide AI</span>
          <span className="gallery-count">
            {String(count).padStart(2, "0")} screens · drag-free reel
          </span>
        </div>
        <h2 className="gallery-title">
          A closer <em>look</em>.
        </h2>
      </div>

      <div className="gallery-viewport">
        <div className="gallery-track" ref={trackRef} onMouseEnter={slow} onMouseLeave={resume}>
          {strip.map((item, i) => (
            <figure className="gallery-item" key={i}>
              <img src={item.src} alt={item.label} loading="lazy" draggable={false} />
              <figcaption className="gallery-caption">
                <span className="gallery-caption-index">
                  {String((i % count) + 1).padStart(2, "0")}
                </span>
                <span className="gallery-caption-label">{item.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="gallery-curtain" aria-hidden="true">
          <CurveSwipe pathRef={pathRef} />
        </div>
      </div>
    </section>
  );
}

export default Gallery;
