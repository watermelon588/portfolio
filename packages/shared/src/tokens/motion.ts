// Motion tokens — the ONLY legal animation values (DESIGN_SYSTEM.md Part V).
// Mirrored to CSS variables in tokens.css. GSAP reads eases by name; these
// string values match GSAP's built-ins where noted.

export const easing = {
  /** master CSS easing — cubic-bezier(.7,0,.3,1) */
  base: "cubic-bezier(0.7, 0, 0.3, 1)",
  /** playful pop-ins (hamburger, chips) */
  bounce: "cubic-bezier(0.34, 1.5, 0.64, 1)",
} as const;

/** GSAP ease names, by role. */
export const gsapEase = {
  entrance: "expo.out",
  overlay: "power4.inOut",
  fill: "power2.inOut",
  magneticRelease: "elastic.out(1, 0.3)",
  linear: "none",
} as const;

/** Durations in seconds. */
export const duration = {
  fast: 0.3,
  base: 0.5,
  smooth: 0.7,
  slow: 0.9,
  entrance: 1.2, // hero entrances (1.0–1.5 range)
} as const;

/** Stagger steps in seconds. */
export const stagger = {
  chars: 0.01,
  lines: 0.05,
  blocks: 0.07,
} as const;

export type Easing = keyof typeof easing;
export type Duration = keyof typeof duration;
