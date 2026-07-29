import type { FlowingMenuItem } from "@/components/vendor/reactbits/FlowingMenu/FlowingMenu";

// Real project artwork (ADR-017: asset-driven). One representative hero image
// per project, imported so Vite fingerprints them. Forcaster has no assets yet.
import skyguideHero from "@/assets/skyguide/landingPage.png";
import neuronHero from "@/assets/Neuron/gallery/01-multimodal-search.jpg";
import yapchatHero from "@/assets/Yap chat/assets/Preview.jpg";

/**
 * Selected-work source of truth (ADR-017: asset-driven).
 *
 * Real case-study links + Forcaster details still arrive from Rohit over time;
 * each project carries an optional `image`/`href` with clean empty states.
 */
export interface Project {
  slug: string;
  title: string;
  /** Short descriptor. */
  role?: string;
  year?: string;
  /** Case-study / live link. Defaults to "#" until provided. */
  href?: string;
  /** Hero image (cursor-follow preview / marquee). Omitted → empty state. */
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "skyguide-ai",
    title: "Skyguide AI",
    role: "AI Assistant",
    year: "2026",
    image: skyguideHero,
  },
  {
    slug: "neuron",
    title: "Neuron",
    role: "Web Platform",
    year: "2026",
    image: neuronHero,
  },
  {
    slug: "yapchat",
    title: "Yapchat",
    role: "Realtime Chat",
    year: "2025",
    image: yapchatHero,
  },
  {
    slug: "forcaster",
    title: "Forcaster",
    role: "Coming soon",
    year: "—",
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
