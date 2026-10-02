import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import "./PageTurnGallery.css";

export interface PageTurnItem {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Journal-style gallery: screens are stacked like pages and turn over their
 * left edge. Buttons, arrow keys, a click on either half, or a swipe turn them.
 */
export function PageTurnGallery({ items, label }: { items: PageTurnItem[]; label: string }) {
  const [page, setPage] = useState(0);
  const startX = useRef<number | null>(null);
  const count = items.length;
  const go = (next: number) => setPage(Math.min(Math.max(next, 0), count - 1));

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(page + 1);
    else if (e.key === "ArrowLeft") go(page - 1);
    else return;
    e.preventDefault();
  };

  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 45) {
      go(dx < 0 ? page + 1 : page - 1);
      return;
    }
    // A tap turns forward on the right half, back on the left half.
    const box = e.currentTarget.getBoundingClientRect();
    go(e.clientX > box.left + box.width / 2 ? page + 1 : page - 1);
  };

  const current = items[page];

  return (
    <div
      className="ptg"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="ptg-clip">
        <div className="ptg-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          {items.map((item, i) => (
            <div
              key={item.src}
              className={`ptg-page${i < page ? " is-turned" : ""}`}
              // Turned pages stack above unturned ones so the page in motion stays visible.
              style={{ zIndex: i < page ? count + i : count - i }}
              aria-hidden={i !== page}
            >
              <div className="ptg-face">
                <img src={item.src} alt={item.alt} draggable={false} loading={i < 2 ? "eager" : "lazy"} />
              </div>
              <div className="ptg-back" />
            </div>
          ))}
        </div>
      </div>

      <div className="ptg-controls">
        <button type="button" className="dw-pill-btn" onClick={() => go(page - 1)} disabled={page === 0}>
          ← Previous
        </button>
        <p className="ptg-status" aria-live="polite">
          <span className="ptg-count">
            {String(page + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          {current?.caption && <span className="ptg-caption">{current.caption}</span>}
        </p>
        <button type="button" className="dw-pill-btn" onClick={() => go(page + 1)} disabled={page === count - 1}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default PageTurnGallery;
