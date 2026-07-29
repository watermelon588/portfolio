import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurveSwipe } from "@/components/motion/CurveSwipe";
import { useCurveSwipe } from "@/hooks/useCurveSwipe";
import { galleryImages, type GalleryImage } from "@/data/gallery";
import "./Gallery.css";

gsap.registerPlugin(ScrollTrigger);

// Gallery — full-bleed SkyGuide showcase, TWO rows drifting in opposite
// directions. Square white-matted cards (same frame as the Work preview),
// buttery slow-down + lift on hover, revealed by the preloader's curved swipe.
export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tweens = useRef<gsap.core.Tween[]>([]);
  const swipe = useCurveSwipe(pathRef, { direction: "up", duration: 1.7 });

  const count = galleryImages.length;
  const rowA = [...galleryImages, ...galleryImages];
  const reversed = [...galleryImages].reverse();
  const rowB = [...reversed, ...reversed];

  useGSAP(
    () => {
      if (!root.current || !pathRef.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const curtain = root.current.querySelector<HTMLElement>(".gallery-curtain");
      tweens.current = [];

      if (!reduce) {
        if (track1.current)
          tweens.current.push(
            gsap.to(track1.current, { xPercent: -50, duration: 60, ease: "none", repeat: -1 }),
          );
        if (track2.current)
          tweens.current.push(
            gsap.fromTo(
              track2.current,
              { xPercent: -50 },
              { xPercent: 0, duration: 60, ease: "none", repeat: -1 },
            ),
          );
      }

      if (reduce) {
        if (curtain) curtain.style.display = "none";
        return;
      }

      const w = window.innerWidth;
      const h =
        root.current.querySelector(".gallery-viewport")?.getBoundingClientRect().height ??
        window.innerHeight;
      pathRef.current.setAttribute("d", `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`);

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

  const slow = () =>
    tweens.current.forEach((t) => gsap.to(t, { timeScale: 0.12, duration: 0.9, ease: "power2.out" }));
  const resume = () =>
    tweens.current.forEach((t) => gsap.to(t, { timeScale: 1, duration: 1.1, ease: "power2.out" }));

  const renderCard = (item: GalleryImage, i: number) => (
    <figure className="gallery-item" key={i}>
      <div className="gallery-item-inner">
        <img src={item.src} alt={item.label} loading="lazy" draggable={false} />
        <figcaption className="gallery-caption">
          <span className="gallery-caption-index">{String((i % count) + 1).padStart(2, "0")}</span>
          <span className="gallery-caption-label">{item.label}</span>
        </figcaption>
      </div>
    </figure>
  );

  return (
    <section className="gallery" id="gallery" ref={root}>
      <div className="gallery-head container">
        <div className="gallery-head-row">
          <span className="gallery-eyebrow">Skyguide AI</span>
          <span className="gallery-count">{String(count).padStart(2, "0")} screens</span>
        </div>
        <h2 className="gallery-title">
          A closer <em>look</em>.
        </h2>
      </div>

      <div className="gallery-viewport" onMouseEnter={slow} onMouseLeave={resume}>
        <div className="gallery-row">
          <div className="gallery-track" ref={track1}>
            {rowA.map(renderCard)}
          </div>
        </div>
        <div className="gallery-row">
          <div className="gallery-track" ref={track2}>
            {rowB.map(renderCard)}
          </div>
        </div>

        <div className="gallery-curtain" aria-hidden="true">
          <CurveSwipe pathRef={pathRef} />
        </div>
      </div>
    </section>
  );
}

export default Gallery;
