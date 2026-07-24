import gsap from "gsap";

export interface CurveSwipeOptions {
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

/**
 * Creates and returns a pure GSAP timeline that animate an SVG path
 * deforming curved swiping motion across different directions.
 * Resolves window dimensions dynamically at call/trigger time.
 */
export function createCurveExit(
  pathElement: SVGPathElement,
  options: CurveSwipeOptions = {}
): gsap.core.Timeline {
  const direction = options.direction || "up";
  const duration = options.duration || 1.25;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const timeline = gsap.timeline();

  // The maximum curve deflection (depth) of the Bezier control point
  const bend = Math.min(150, Math.max(80, (direction === "up" || direction === "down" ? h : w) * 0.18));

  if (direction === "up") {
    const params = {
      yTop: 0,
      yBottom: h,
      yControl: h,
    };

    // Initialize layout: full screen flat rectangle
    pathElement.setAttribute(
      "d",
      `M 0 ${params.yTop} L ${w} ${params.yTop} L ${w} ${params.yBottom} Q ${w / 2} ${params.yControl} 0 ${params.yBottom} Z`
    );

    timeline
      // Step 1: Deep curve deflection
      .to(params, {
        yControl: h + bend,
        duration: duration * 0.35,
        ease: "sine.inOut",
        onUpdate: () => {
          pathElement.setAttribute(
            "d",
            `M 0 ${params.yTop} L ${w} ${params.yTop} L ${w} ${params.yBottom} Q ${w / 2} ${params.yControl} 0 ${params.yBottom} Z`
          );
        },
      })
      // Step 2: Slide and flatten to clean viewport reveal
      .to(params, {
        yTop: -h - bend,
        yBottom: -h,
        yControl: -h,
        duration: duration * 0.65,
        ease: "power4.inOut",
        onUpdate: () => {
          pathElement.setAttribute(
            "d",
            `M 0 ${params.yTop} L ${w} ${params.yTop} L ${w} ${params.yBottom} Q ${w / 2} ${params.yControl} 0 ${params.yBottom} Z`
          );
        },
      });
  } else if (direction === "down") {
    const params = {
      yTop: 0,
      yBottom: h,
      yControl: 0,
    };

    pathElement.setAttribute(
      "d",
      `M 0 ${params.yTop} Q ${w / 2} ${params.yControl} ${w} ${params.yTop} L ${w} ${params.yBottom} L 0 ${params.yBottom} Z`
    );

    timeline
      .to(params, {
        yControl: -bend,
        duration: duration * 0.35,
        ease: "sine.inOut",
        onUpdate: () => {
          pathElement.setAttribute(
            "d",
            `M 0 ${params.yTop} Q ${w / 2} ${params.yControl} ${w} ${params.yTop} L ${w} ${params.yBottom} L 0 ${params.yBottom} Z`
          );
        },
      })
      .to(params, {
        yTop: h,
        yBottom: h + bend,
        yControl: h,
        duration: duration * 0.65,
        ease: "power4.inOut",
        onUpdate: () => {
          pathElement.setAttribute(
            "d",
            `M 0 ${params.yTop} Q ${w / 2} ${params.yControl} ${w} ${params.yTop} L ${w} ${params.yBottom} L 0 ${params.yBottom} Z`
          );
        },
      });
  } else if (direction === "left") {
    const params = {
      xLeft: 0,
      xRight: w,
      xControl: w,
    };

    pathElement.setAttribute(
      "d",
      `M ${params.xLeft} 0 L ${params.xRight} 0 Q ${params.xControl} ${h / 2} ${params.xRight} ${h} L ${params.xLeft} ${h} Z`
    );

    timeline
      .to(params, {
        xControl: w + bend,
        duration: duration * 0.35,
        ease: "sine.inOut",
        onUpdate: () => {
          pathElement.setAttribute(
            "d",
            `M ${params.xLeft} 0 L ${params.xRight} 0 Q ${params.xControl} ${h / 2} ${params.xRight} ${h} L ${params.xLeft} ${h} Z`
          );
        },
      })
      .to(params, {
        xLeft: -w - bend,
        xRight: -w,
        xControl: -w,
        duration: duration * 0.65,
        ease: "power4.inOut",
        onUpdate: () => {
          pathElement.setAttribute(
            "d",
            `M ${params.xLeft} 0 L ${params.xRight} 0 Q ${params.xControl} ${h / 2} ${params.xRight} ${h} L ${params.xLeft} ${h} Z`
          );
        },
      });
  } else if (direction === "right") {
    const params = {
      xLeft: 0,
      xRight: w,
      xControl: 0,
    };

    pathElement.setAttribute(
      "d",
      `M ${params.xLeft} 0 Q ${params.xControl} ${h / 2} ${params.xLeft} ${h} L ${params.xRight} ${h} L ${params.xRight} 0 Z`
    );

    timeline
      .to(params, {
        xControl: -bend,
        duration: duration * 0.35,
        ease: "sine.inOut",
        onUpdate: () => {
          pathElement.setAttribute(
            "d",
            `M ${params.xLeft} 0 Q ${params.xControl} ${h / 2} ${params.xLeft} ${h} L ${params.xRight} ${h} L ${params.xRight} 0 Z`
          );
        },
      })
      .to(params, {
        xLeft: w,
        xRight: w + bend,
        xControl: w,
        duration: duration * 0.65,
        ease: "power4.inOut",
        onUpdate: () => {
          pathElement.setAttribute(
            "d",
            `M ${params.xLeft} 0 Q ${params.xControl} ${h / 2} ${params.xLeft} ${h} L ${params.xRight} ${h} L ${params.xRight} 0 Z`
          );
        },
      });
  }

  return timeline;
}
