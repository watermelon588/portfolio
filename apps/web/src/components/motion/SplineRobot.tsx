import { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./SplineRobot.css";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineRobotProps {
  /** Public `.splinecode` scene export URL — see project docs for how to get this. */
  scene: string;
  className?: string;
}

/**
 * Interactive 3D companion for the hero. Lazy-loads the Spline runtime (heavy,
 * its own chunk) and only mounts the WebGL scene once the element is on
 * screen and the environment can handle it — otherwise it renders nothing
 * (no baked-in placeholder art, per ADR-017).
 */
export function SplineRobot({ scene, className }: SplineRobotProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canRender, setCanRender] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 2;
    setCanRender(canHover && !reduce && !lowEnd);
  }, []);

  useEffect(() => {
    if (!canRender || !wrapperRef.current) return;
    const el = wrapperRef.current;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [canRender]);

  if (!canRender) return null;

  return (
    <div ref={wrapperRef} className={`spline-robot ${className ?? ""}`} aria-hidden="true">
      {inView && (
        <Suspense fallback={null}>
          <Spline scene={scene} />
        </Suspense>
      )}
    </div>
  );
}

export default SplineRobot;
