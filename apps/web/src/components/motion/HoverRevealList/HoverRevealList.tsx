import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./HoverRevealList.css";

// Cursor-follow reveal list — the reference site's "recent work" interaction,
// upgraded: hovering a row floats a SQUARE framed preview toward the cursor
// (magnetic eased follow + velocity tilt). Each project has its own matte colour
// + inner aspect ratio, a horizontal-scrolling strip of 2–3 screens, and a
// centered blue "View" button. Desktop / non-reduced-motion only.

export interface HoverRevealItem {
  title: string;
  role?: string;
  year?: string;
  href?: string;
  images: string[];
  frameColor: string;
  ratio: string;
}

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export function HoverRevealList({ items }: { items: HoverRevealItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const marquee = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const xToRef = useRef<((value: number) => void) | null>(null);
  const yToRef = useRef<((value: number) => void) | null>(null);
  const rToRef = useRef<((value: number) => void) | null>(null);

  // Magnetic cursor-follow — set up once.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!canHover() || reduce || !root.current || !previewRef.current) return;

      const preview = previewRef.current;
      gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.8, autoAlpha: 0 });

      xToRef.current = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
      yToRef.current = gsap.quickTo(preview, "y", { duration: 0.8, ease: "power3" });
      rToRef.current = gsap.quickTo(preview, "rotate", { duration: 1.1, ease: "power3" });

      let lastX: number | null = null;
      const onMove = (e: MouseEvent) => {
        if (!root.current) return;
        const rect = root.current.getBoundingClientRect();
        xToRef.current?.(e.clientX - rect.left);
        yToRef.current?.(e.clientY - rect.top);
        if (lastX !== null) rToRef.current?.(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      root.current.addEventListener("mousemove", onMove);
      return () => root.current?.removeEventListener("mousemove", onMove);
    },
    { scope: root },
  );

  const handleRowMouseEnter = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    if (root.current && previewRef.current) {
      const rect = root.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Immediately snap preview position to current mouse coordinates before fade-in
      gsap.set(previewRef.current, { x, y });
      xToRef.current?.(x);
      yToRef.current?.(y);
    }
    setActive(i);
  };

  // Reveal + horizontal marquee whenever the hovered project changes.
  useEffect(() => {
    if (!canHover() || !previewRef.current) return;

    if (active == null) {
      gsap.to(previewRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      return;
    }

    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.55,
      ease: "power4.out",
      overwrite: "auto",
    });
    // Content scrolls up into place on project change.
    if (innerRef.current) {
      gsap.fromTo(
        innerRef.current,
        { yPercent: 40, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" },
      );
    }
    // Horizontal auto-scroll through the project's screens.
    marquee.current?.kill();
    const imgs = items[active]?.images ?? [];
    if (stripRef.current && imgs.length > 1) {
      gsap.set(stripRef.current, { xPercent: 0 });
      marquee.current = gsap.to(stripRef.current, {
        xPercent: -50,
        duration: imgs.length * 3.2,
        ease: "none",
        repeat: -1,
      });
    }
    return () => {
      marquee.current?.kill();
    };
  }, [active, items]);

  const project = active != null ? items[active] : null;
  const imgs = project?.images ?? [];
  const strip = imgs.length > 1 ? [...imgs, ...imgs] : imgs;

  return (
    <div className="hrl" ref={root} onMouseLeave={() => setActive(null)}>
      <ul className="hrl-list">
        {items.map((item, i) => (
          <li className="hrl-row" key={item.title} onMouseEnter={(e) => handleRowMouseEnter(e, i)}>
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

      <div
        className="hrl-preview"
        ref={previewRef}
        aria-hidden="true"
        style={{ backgroundColor: project?.frameColor ?? "#ffffff" }}
      >
        <div
          className="hrl-preview-inner"
          ref={innerRef}
          style={{ aspectRatio: project?.ratio ?? "1 / 1" }}
        >
          <div className="hrl-strip" ref={stripRef}>
            {strip.map((src, i) => (
              <img className="hrl-strip-img" key={i} src={src} alt="" draggable={false} />
            ))}
          </div>
        </div>

        <span className="hrl-view">
          <span className="hrl-view-label">View</span>
        </span>
      </div>
    </div>
  );
}

export default HoverRevealList;
