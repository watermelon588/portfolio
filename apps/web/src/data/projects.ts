import type { FlowingMenuItem } from "@/components/vendor/reactbits/FlowingMenu/FlowingMenu";

/**
 * Selected-work source of truth (ADR-017: asset-driven).
 *
 * Real artwork, roles, years and case-study links arrive from Rohit over time —
 * each project below carries an optional `image`/`href`; components render clean
 * empty states until those assets land. FORCASTER details are pending.
 */
export interface Project {
  slug: string;
  title: string;
  /** Short descriptor shown on the dedicated Work page. */
  role?: string;
  year?: string;
  /** Case-study / live link. Defaults to "#" until provided. */
  href?: string;
  /** Marquee artwork. Omitted → text-only marquee. */
  image?: string;
}

// NOTE: `image` values are stable placeholder photos (picsum seeds) so the
// marquee reads as intended today. Swap each for real project artwork when it
// lands — nothing else needs to change (ADR-017).
export const projects: Project[] = [
  {
    slug: "skyguide-ai",
    title: "Skyguide AI",
    role: "AI Assistant",
    year: "2026",
    image: "https://picsum.photos/seed/skyguide-ai/600/400",
  },
  {
    slug: "neuron",
    title: "Neuron",
    role: "Web Platform",
    year: "2026",
    image: "https://picsum.photos/seed/neuron-app/600/400",
  },
  {
    slug: "yapchat",
    title: "Yapchat",
    role: "Realtime Chat",
    year: "2025",
    image: "https://picsum.photos/seed/yapchat/600/400",
  },
  {
    slug: "forcaster",
    title: "Forcaster",
    role: "Coming soon",
    year: "—",
    image: "https://picsum.photos/seed/forcaster/600/400",
  },
];

/** Adapt projects into the shape FlowingMenu consumes. */
export function toMenuItems(list: Project[] = projects): FlowingMenuItem[] {
  return list.map((p) => ({
    link: p.href ?? "#",
    text: p.title,
    image: p.image,
  }));
}
