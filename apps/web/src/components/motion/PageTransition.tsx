import { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import gsap from "gsap";
import { CurveSwipe } from "./CurveSwipe";
import { useCurveSwipe } from "../../hooks/useCurveSwipe";
import "./PageTransition.css";

// Route-change transition: the same dark curved curtain as the preloader, but
// keyed to navigation. On each route change it covers the incoming page, shows
// the page name, then peels away upward to reveal it. The first app load is
// skipped (Home has its own preloader intro).

const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/work": "Work",
  "/ask": "Ask",
};

function pageName(pathname: string): string {
  if (PAGE_NAMES[pathname]) return PAGE_NAMES[pathname];
  if (pathname.startsWith("/work")) return "Work";
  return "Page";
}

export function PageTransition() {
  const { pathname } = useLocation();
  const root = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [label, setLabel] = useState(() => pageName(pathname));

  const swipe = useCurveSwipe(pathRef, { direction: "up", duration: 1.7 });

  useLayoutEffect(() => {
    // Skip the very first load — the Home preloader owns that moment.
    if (first.current) {
      first.current = false;
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current || !pathRef.current) return;

    setLabel(pageName(pathname));

    const w = window.innerWidth;
    const h = window.innerHeight;
    // Cover the viewport immediately (this runs pre-paint) so the new page is
    // hidden behind the curtain before it peels away.
    pathRef.current.setAttribute("d", `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`);

    gsap.set(root.current, { autoAlpha: 1 });
    gsap.set(labelRef.current, { autoAlpha: 0, y: 34 });

    tlRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        if (root.current) gsap.set(root.current, { autoAlpha: 0 });
      },
    });
    tlRef.current = tl;

    tl.to(labelRef.current, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0)
      .to(labelRef.current, { autoAlpha: 0, y: -34, duration: 0.6, ease: "power3.in" }, 0.75)
      .add(swipe.exit(), 0.7);

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      ref={root}
      className="page-transition"
      aria-hidden="true"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <CurveSwipe pathRef={pathRef} />
      <span ref={labelRef} className="page-transition-label">
        {label}
        <span className="page-transition-dot" />
      </span>
    </div>
  );
}

export default PageTransition;
