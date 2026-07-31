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
import finance1 from "@/assets/images/finance_tracker_hero.png";
import finance2 from "@/assets/images/finance_tracker_detail.png";
import schedule1 from "@/assets/images/schedule_maker_hero.png";
import schedule2 from "@/assets/images/schedule_maker_detail.png";
import habit1 from "@/assets/images/habit_tracker_hero.png";
import habit2 from "@/assets/images/habit_tracker_detail.png";

/**
 * Selected-work source of truth (ADR-017: asset-driven).
 *
 * Real case-study links still arrive from Rohit over time; each project carries
 * an optional `href` with clean empty states.
 */
export interface Project {
  slug: string;
  title: string;
  /** "dev" projects show on the home Work list; all show on /work. */
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
    images: [skyguide1, skyguide2, skyguide3],
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
    images: [forcaster1, forcaster2, forcaster3],
    frameColor: "#123246", // deep sky blue
    ratio: "4 / 5",
  },
  // Notion interactive-database projects (no repo/screens yet).
  {
    slug: "ultimate-finance-tracker",
    title: "Ultimate Finance Tracker",
    category: "notion",
    role: "Notion Template",
    year: "2025",
    images: [finance1, finance2],
    frameColor: "#14352A", // deep green — money
    ratio: "4 / 5",
  },
  {
    slug: "weekly-schedule-maker",
    title: "Weekly Schedule Maker",
    category: "notion",
    role: "Notion Template",
    year: "2025",
    images: [schedule1, schedule2],
    frameColor: "#3A2A10", // deep amber
    ratio: "4 / 5",
  },
  {
    slug: "habit-tracker",
    title: "Habit Tracker",
    category: "notion",
    role: "Notion Template",
    year: "2025",
    images: [habit1, habit2],
    frameColor: "#2A1640", // deep violet
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
