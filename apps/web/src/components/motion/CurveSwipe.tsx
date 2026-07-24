import type { RefObject } from "react";

export interface CurveSwipeProps {
  pathRef: RefObject<SVGPathElement | null>;
}

/**
 * Pure SVG presentation component that renders the full-screen canvas
 * and path used by the curveSwipe animations. Contains no animation logic.
 */
export function CurveSwipe({ pathRef }: CurveSwipeProps) {
  const w = typeof window !== "undefined" ? window.innerWidth : 1920;
  const h = typeof window !== "undefined" ? window.innerHeight : 1080;

  return (
    <svg
      className="curve-swipe-svg"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path ref={pathRef} className="curve-swipe-path" />
    </svg>
  );
}

export default CurveSwipe;
