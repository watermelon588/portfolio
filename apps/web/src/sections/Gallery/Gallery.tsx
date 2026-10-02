import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { galleryImages, type GalleryImage } from "@/data/gallery";
import "./Gallery.css";

// Gallery — full-bleed "closer look" across ALL projects, TWO rows drifting in
// opposite directions. Square matted cards, buttery slow-down + lift on hover.
// Reel speed in card-heights per second, so the drift feels the same at any
// viewport size and however many images sit in assets/closer-look/.
const SPEED = 2;

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);
  const tweens = useRef<gsap.core.Tween[]>([]);

  const rowA = [...galleryImages, ...galleryImages];
  const reversed = [...galleryImages].reverse();
  const rowB = [...reversed, ...reversed];

  useGSAP(
    () => {
      if (!root.current || !track1.current || !track2.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const a = track1.current;
      const b = track2.current;

      // Cards size to their image, so the track width is only final once every
      // image has loaded. Starting the -50% loop earlier made the rows jump and
      // speed up each time an image arrived mid-drift.
      const pending = gsap.utils
        .toArray<HTMLImageElement>("img", root.current)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((done) => {
              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
            }),
        );

      let cancelled = false;
      Promise.all(pending).then(() => {
        if (cancelled) return;
        const card = a.firstElementChild as HTMLElement | null;
        const duration = a.scrollWidth / 2 / ((card?.offsetHeight || 380) * SPEED);
        tweens.current = [
          gsap.fromTo(a, { xPercent: 0 }, { xPercent: -50, duration, ease: "none", repeat: -1 }),
          gsap.fromTo(b, { xPercent: -50 }, { xPercent: 0, duration, ease: "none", repeat: -1 }),
        ];
      });

      return () => {
        cancelled = true;
        tweens.current.forEach((t) => t.kill());
        tweens.current = [];
      };
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
        <img src={item.src} alt={`${item.project}: ${item.label}`} decoding="async" draggable={false} />
        <span className="gallery-item-badge">{item.project}</span>
        <figcaption className="gallery-caption" />
      </div>
    </figure>
  );

  return (
    <section className="gallery" id="gallery" ref={root}>
      <div className="gallery-head container">
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
      </div>
    </section>
  );
}

export default Gallery;
