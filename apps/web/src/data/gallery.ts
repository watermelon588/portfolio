// Gallery source (ADR-017: asset-driven) — a "closer look" across ALL projects,
// not just SkyGuide. Each project's asset folder is globbed and every screen is
// tagged with its project name + matte colour (same colours as the Work preview
// frames). Screens are interleaved so the reel reads as a mix.

type Mods = Record<string, string>;

import walkDashboard from "@/assets/Walktru/hero-dashboard.webp";
import walkReport from "@/assets/Walktru/report.png";
import walkSidepanel from "@/assets/Walktru/design/launch-videos/shared/img/stills/sidepanel.jpg";
import walkSecondLook from "@/assets/Walktru/portfolio/the-second-look.webp";
import walkFreshEyes from "@/assets/Walktru/portfolio/fresh-eyes-club.webp";
import walkClearView from "@/assets/Walktru/portfolio/one-clear-view.webp";
import walkRealPeople from "@/assets/Walktru/portfolio/real-people-energy.webp";
import walkScout from "@/assets/Walktru/portfolio/scouts-second-look.webp";
import tripPlan from "@/assets/Tripverse/portfolio/screens/06-studio-plan.webp";
import tripSketch from "@/assets/Tripverse/portfolio/screens/07c-sketch-day.webp";
import tripMap from "@/assets/Tripverse/portfolio/screens/08-studio-map.webp";
import tripStudio from "@/assets/Tripverse/portfolio/compositions/09-one-trip-four-views.webp";
import tripSketchSpread from "@/assets/Tripverse/portfolio/compositions/05-sketch-meets-studio.webp";
import tripBuild from "@/assets/Tripverse/portfolio/compositions/04-build-together.webp";
import tripBudget from "@/assets/Tripverse/portfolio/compositions/06-budget-context.webp";
import tripInspiration from "@/assets/Tripverse/portfolio/compositions/10-inspiration-to-plan.webp";

const skyMods = import.meta.glob("../assets/skyguide/gallery/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Mods;
const neuronMods = import.meta.glob("../assets/Neuron/gallery/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Mods;
const yapMods = import.meta.glob("../assets/Yap chat/assets/gallery/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Mods;
const forMods = import.meta.glob("../assets/forcaster/gallery/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Mods;

export interface GalleryImage {
  src: string;
  label: string;
  project: string;
  color: string;
}

function humanize(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[._-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function build(mods: Mods, project: string, color: string, block: string[] = []): GalleryImage[] {
  return Object.entries(mods)
    .filter(([path]) => {
      const name = path.split("/").pop()?.toLowerCase() ?? "";
      return !block.some((b) => name.includes(b));
    })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => ({
      src,
      label: humanize(path.split("/").pop() ?? ""),
      project,
      color,
    }));
}

const sky = build(skyMods, "Skyguide AI", "#0B1E3B", [
  "qrcode",
  "privacypolicy",
  "signup",
  "footer",
  "logo",
]);
const neuron = build(neuronMods, "Neuron", "#241640", ["logo"]);
const yap = build(yapMods, "Yapchat", "#0F3A2E", ["logo"]);
const forc = build(forMods, "Forcaster", "#123246");

// Curated from the completed cases: real screens + original campaign art.
// Laptop mockups remain exclusive to the destination Footer preview.
const walkthru: GalleryImage[] = [
  [walkDashboard, "The real dashboard"],
  [walkSecondLook, "The second look"],
  [walkReport, "Journey evidence"],
  [walkFreshEyes, "Fresh eyes club"],
  [walkSidepanel, "Inside the browser"],
  [walkClearView, "One clear view"],
  [walkRealPeople, "Real people energy"],
  [walkScout, "Scout takes a second look"],
].map(([src, label]) => ({ src: src!, label: label!, project: "Walkthru", color: "#4d7274" }));
const tripverse: GalleryImage[] = [
  [tripStudio, "One trip, four views"],
  [tripBuild, "Build a day together"],
  [tripPlan, "The day plan"],
  [tripSketchSpread, "A plan you can picture"],
  [tripSketch, "The hand-drawn sketchbook"],
  [tripBudget, "A budget with context"],
  [tripMap, "The whole route"],
  [tripInspiration, "Inspiration into a plan"],
].map(([src, label]) => ({ src: src!, label: label!, project: "TripVerse", color: "#717b61" }));

/** Round-robin interleave so the reel mixes projects. */
function interleave(groups: GalleryImage[][]): GalleryImage[] {
  const out: GalleryImage[] = [];
  const max = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < max; i++) {
    for (const g of groups) {
      const item = g[i];
      if (item) out.push(item);
    }
  }
  return out;
}

export const galleryImages: GalleryImage[] = interleave([walkthru, tripverse, sky, neuron, yap, forc]);
export const galleryUsesPlaceholders = false;
