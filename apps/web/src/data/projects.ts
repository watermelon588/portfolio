import type { FlowingMenuItem } from "@/components/vendor/reactbits/FlowingMenu/FlowingMenu";

// Real project artwork (ADR-017: asset-driven), imported so Vite fingerprints
// them. Each project carries 2–3 preview images for the horizontal-scroll
// cursor preview, plus a matte colour + aspect ratio for its frame.
import skyguideHero from "@/assets/skyguide/gallery/skyguideHero.png";
import skyguide1 from "@/assets/skyguide/8.png";
import skyguide3 from "@/assets/skyguide/9.png";
import neuron1 from "@/assets/Neuron/gallery/neuron7.png";
import neuron2 from "@/assets/Neuron/gallery/neuron4.png";
import neuron3 from "@/assets/Neuron/gallery/neuron5.png";
import yap1 from "@/assets/Yap chat/assets/yapchat6.png";
import yap2 from "@/assets/Yap chat/assets/yapchat1.png";
import yap3 from "@/assets/Yap chat/assets/yapchat8.jpg";
import forcasterHero from "@/assets/forcaster/gallery/forcasterHero.png";
import forcaster2 from "@/assets/forcaster/forcaster5.png";
import forcaster3 from "@/assets/forcaster/forcaster2.png";

/**
 * Selected-work source of truth (ADR-017: asset-driven).
 */
export interface Project {
  slug: string;
  title: string;
  category: "dev" | "notion";
  /** Short descriptor. */
  role?: string;
  year?: string;
  /** Case-study / live link. Defaults to "#" until provided. */
  href?: string;
  /** Preview images (horizontal-scroll strip). First is the hero. May be empty. */
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
    category: "dev",
    role: "AI Assistant",
    year: "2026",
    images: [skyguideHero, skyguide3, skyguide1],
    frameColor: "#0B1E3B", // deep navy — night sky
    ratio: "4 / 5",
  },
  {
    slug: "neuron",
    title: "Neuron",
    category: "dev",
    role: "Web Platform",
    year: "2026",
    images: [neuron1, neuron2, neuron3],
    frameColor: "#241640", // deep violet
    ratio: "4 / 5",
  },
  {
    slug: "yapchat",
    title: "Yapchat",
    category: "dev",
    role: "Realtime Chat",
    year: "2025",
    images: [yap1, yap2, yap3],
    frameColor: "#0F3A2E", // deep green
    ratio: "3 / 4",
  },
  {
    slug: "forcaster",
    title: "Forcaster",
    category: "dev",
    role: "Weather App",
    year: "2025",
    images: [forcasterHero, forcaster2, forcaster3],
    frameColor: "#123246", // deep sky blue
    ratio: "4 / 5",
  },
];

/** Home "Selected Work" shows the dev projects with hover previews. */
export const devProjects = projects.filter((p) => p.category === "dev");

/** Adapt projects into the shape FlowingMenu consumes. */
export function toMenuItems(list: Project[] = projects): FlowingMenuItem[] {
  return list.map((p) => ({
    link: `/work/${p.slug}`,
    text: p.title,
    image: p.images[0],
  }));
}
