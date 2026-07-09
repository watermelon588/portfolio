// APPROVED palette — project directive 2026-07-09 (ADR-014, ADR-018).
// These are the canonical values; apps/web/src/styles/tokens.css mirrors them
// as CSS variables. Change here + there together (see DOCUMENTATION_REVIEW.md).

export const colors = {
  // Light world
  bg: "#F6F6F6",
  surface: "#FFFFFF",
  ink: "#000000",
  ink2: "#9D9D9C",
  accent: "#0049CD",
  accentDeep: "#003AA3", // derived hover/pressed — pending confirm
  surfaceGray: "#DADADA",
  // Dark world (selective — preloader, contact/footer, AI panel only)
  darkBg: "#000000",
  darkBg2: "#0A0A0A",
  darkInk: "#F6F6F6",
  darkInk2: "#9D9D9C",
  // Feedback
  error: "#FF4444",
  success: "#24C958",
} as const;

export type ColorToken = keyof typeof colors;
