import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { createCurveExit } from "../animations/curveSwipe";
import type { CurveSwipeOptions } from "../animations/curveSwipe";

/**
 * Reusable React hook for managing the lifecycle, playback, and cleanup
 * of a dynamic SVG curved swipe transition.
 */
export function useCurveSwipe(
  pathRef: RefObject<SVGPathElement | null>,
  options: CurveSwipeOptions = {}
) {
  const activeTimeline = useRef<gsap.core.Timeline | null>(null);

  // Clean up any running timeline on unmount to prevent leaks/dangling anims
  useEffect(() => {
    return () => {
      if (activeTimeline.current) {
        activeTimeline.current.kill();
      }
    };
  }, []);

  const swipe = useMemo(() => {
    return {
      exit: (): gsap.core.Timeline => {
        if (!pathRef.current) {
          // Graceful fallback for SSR or unmounted state
          return gsap.timeline();
        }

        // Kill active animation before starting a new one
        if (activeTimeline.current) {
          activeTimeline.current.kill();
        }

        const tl = createCurveExit(pathRef.current, options);
        activeTimeline.current = tl;
        return tl;
      },
    };
  }, [pathRef, options]);

  return swipe;
}
