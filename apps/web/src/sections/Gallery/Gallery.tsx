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
// image cards, revealed by the SAME curved SVG swipe as the preloader: a dark
// curtain covers the strip until you scroll to it, then peels away upward.
export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const swipe = useCurveSwipe(pathRef, { direction: "up", duration: 1.35 });

  // Duplicate the set so the marquee can loop seamlessly (-50% == one set).
  const strip = [...galleryImages, ...galleryImages];

  useGSAP(
    () => {
      if (!root.current || !pathRef.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const curtain = root.current.querySelector<HTMLElement>(".gallery-curtain");

      // Infinite horizontal drift of the image strip.
      if (!reduce && trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }

      if (reduce) {
        // No curtain for reduced motion — just show the gallery.
        if (curtain) curtain.style.display = "none";
        return;
      }

      // Curtain starts covering the strip (dark full-cover rectangle).
      const w = window.innerWidth;
      const h = root.current.querySelector(".gallery-viewport")?.getBoundingClientRect().height ?? window.innerHeight;
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

  return (
    <section className="gallery" id="gallery" ref={root}>
      <div className="gallery-head container">
        <span className="gallery-eyebrow">Skyguide AI</span>
        <h2 className="gallery-title">
          A closer <em>look</em>.
        </h2>
      </div>

      <div className="gallery-viewport">
        <div className="gallery-track" ref={trackRef}>
          {strip.map((src, i) => (
            <figure className="gallery-item" key={i}>
              <img src={src} alt="" loading="lazy" draggable={false} />
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
