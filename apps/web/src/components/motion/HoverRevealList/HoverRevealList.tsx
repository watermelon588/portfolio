import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./HoverRevealList.css";

// Cursor-follow reveal list — the reference site's "recent work" interaction,
// refined: a plain list of project rows; hovering a row floats that project's
// image toward the cursor with a magnetic eased follow + velocity tilt. The
// image is a SQUARE white-matted frame (no radius). Moving between rows
// CROSSFADES between the two project images (two stacked layers). Other rows
// dim, the hovered title slides + colours, an arrow reveals. Desktop /
// non-reduced-motion only; on touch it degrades to a clean tappable list.

export interface HoverRevealItem {
  title: string;
  role?: string;
  year?: string;
  href?: string;
  image?: string;
}

export function HoverRevealList({ items }: { items: HoverRevealItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imgARef = useRef<HTMLImageElement>(null);
  const imgBRef = useRef<HTMLImageElement>(null);
  const frontIsA = useRef(true);

  useGSAP(
    () => {
      const canHover = window.matchMedia("(hover: hover)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!canHover || reduce || !root.current || !previewRef.current) return;

      const preview = previewRef.current;
      gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.8, autoAlpha: 0 });

      // Magnetic, independently-eased follow — different durations on x/y give a
      // subtle drag; rotation trails the horizontal velocity.
      const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.8, ease: "power3" });
      const rTo = gsap.quickTo(preview, "rotate", { duration: 1.1, ease: "power3" });

      let lastX: number | null = null;
      const onMove = (e: MouseEvent) => {
        if (!root.current) return;
        const rect = root.current.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
        if (lastX !== null) rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.7));
        lastX = e.clientX;
      };
      root.current.addEventListener("mousemove", onMove);
      return () => root.current?.removeEventListener("mousemove", onMove);
    },
    { scope: root },
  );

  const canHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  const enterRow = (image?: string) => {
    if (!canHover() || !previewRef.current) return;

    if (!image) {
      gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.8, duration: 0.35, ease: "power3.out" });
      return;
    }

    // Crossfade: put the new image on the back layer, then swap layers.
    const front = frontIsA.current ? imgARef.current : imgBRef.current;
    const back = frontIsA.current ? imgBRef.current : imgARef.current;
    if (back && front?.getAttribute("src") !== image) {
      if (back.getAttribute("src") !== image) back.src = image;
      gsap.to(back, { opacity: 1, duration: 0.55, ease: "power2.out", overwrite: "auto" });
      gsap.to(front, { opacity: 0, duration: 0.55, ease: "power2.out", overwrite: "auto" });
      frontIsA.current = !frontIsA.current;
    }

    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.6,
      ease: "power4.out",
      overwrite: "auto",
    });
  };

  const leaveList = () => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div className="hrl" ref={root} onMouseLeave={leaveList}>
      <ul className="hrl-list">
        {items.map((item, i) => (
          <li className="hrl-row" key={item.title} onMouseEnter={() => enterRow(item.image)}>
            <a className="hrl-link" href={item.href ?? "#"}>
              <span className="hrl-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="hrl-title">{item.title}</span>
              <span className="hrl-meta">
                {item.role}
                {item.role && item.year ? " · " : ""}
                {item.year}
              </span>
              <span className="hrl-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17 17 7M8 7h9v9"
                  />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="hrl-preview" ref={previewRef} aria-hidden="true">
        <div className="hrl-preview-inner">
          <img ref={imgARef} className="hrl-preview-img" alt="" draggable={false} />
          <img ref={imgBRef} className="hrl-preview-img" alt="" draggable={false} />
        </div>
      </div>
    </div>
  );
}

export default HoverRevealList;
