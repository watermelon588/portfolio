import type { FlowingMenuItem } from "@/components/vendor/reactbits/FlowingMenu/FlowingMenu";

// Real project artwork (ADR-017: asset-driven), imported so Vite fingerprints
// them. Each project carries 2–3 preview images for the horizontal-scroll
// cursor preview, plus a matte colour + aspect ratio for its frame.
import skyguide1 from "@/assets/skyguide/landingPage.png";
import skyguide2 from "@/assets/skyguide/dashboard.png";
import skyguide3 from "@/assets/skyguide/allSkyChart.png";
import neuron1 from "@/assets/Neuron/gallery/01-multimodal-search.jpg";
import neuron2 from "@/assets/Neuron/gallery/02-visual-match.jpg";
import neuron3 from "@/assets/Neuron/gallery/04-document-chat.jpg";
import yap1 from "@/assets/Yap chat/assets/Preview.jpg";
import yap2 from "@/assets/Yap chat/assets/Preview1.jpg";
import yap3 from "@/assets/Yap chat/assets/Frame 498.jpg";
import forcaster1 from "@/assets/Forcaster/01-forecast.jpg";
import forcaster2 from "@/assets/Forcaster/02-hourly.jpg";
import forcaster3 from "@/assets/Forcaster/03-details.jpg";

/**
 * Selected-work source of truth (ADR-017: asset-driven).
 *
 * Real case-study links still arrive from Rohit over time; each project carries
 * an optional `href` with clean empty states.
 */
export interface Project {
  slug: string;
  title: string;
  /** Short descriptor. */
  role?: string;
  year?: string;
  /** Case-study / live link. Defaults to "#" until provided. */
  href?: string;
  /** Preview images (horizontal-scroll strip). First is the hero. */
  images: string[];
  /** Frame matte colour for the cursor preview. */
  frameColor: string;
  /** Inner image aspect ratio for the cursor preview (e.g. "4 / 5"). */
  ratio: string;
}

export const projects: Project[] = [
  {
    slug: "skyguide-ai",
    title: "Skyguide AI",
    role: "AI Assistant",
    year: "2026",
    images: [skyguide1, skyguide2, skyguide3],
    frameColor: "#0B1E3B", // deep navy — night sky
    ratio: "1 / 1",
  },
  {
    slug: "neuron",
    title: "Neuron",
    role: "Web Platform",
    year: "2026",
    images: [neuron1, neuron2, neuron3],
    frameColor: "#241640", // deep violet
    ratio: "4 / 5",
  },
  {
    slug: "yapchat",
    title: "Yapchat",
    role: "Realtime Chat",
    year: "2025",
    images: [yap1, yap2, yap3],
    frameColor: "#0F3A2E", // deep green
    ratio: "3 / 4",
  },
  {
    slug: "forcaster",
    title: "Forcaster",
    role: "Weather App",
    year: "2025",
    images: [forcaster1, forcaster2, forcaster3],
    frameColor: "#123246", // deep sky blue
    ratio: "4 / 5",
  },
];

/** Adapt projects into the shape FlowingMenu consumes. */
export function toMenuItems(list: Project[] = projects): FlowingMenuItem[] {
  return list.map((p) => ({
    link: p.href ?? "#",
    text: p.title,
    image: p.images[0],
  }));
}
