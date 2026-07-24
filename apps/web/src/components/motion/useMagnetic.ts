import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Magnetic pull for any `.magnetic` elements inside `scope`.
 *
 * Extracted verbatim from the Navbar's magnetic field so the interaction stays
 * identical across the site (same easing, durations, and `data-strength`
 * convention). Desktop + non-reduced-motion only; fully cleans up its own
 * listeners. Re-runs when `deps` change so cards mounted after paint still bind.
 */
export function useMagnetic(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce || !scope.current) return;

    const els = Array.from(scope.current.querySelectorAll<HTMLElement>(".magnetic"));
    const cleanups = els.map((el) => {
      const strength = Number(el.dataset.strength ?? 30);
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength,
          y: ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength,
          duration: 1.1,
          ease: "power4.out",
        });
      };
      const leave = () =>
        gsap.to(el, { x: 0, y: 0, duration: 1.4, ease: "elastic.out(1, 0.3)" });
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });
    return () => cleanups.forEach((c) => c());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
