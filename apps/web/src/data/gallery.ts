// Gallery source (ADR-017: asset-driven) — a "closer look" across ALL projects,
// not just SkyGuide. Each project's asset folder is globbed and every screen is
// tagged with its project name + matte colour (same colours as the Work preview
// frames). Screens are interleaved so the reel reads as a mix.

type Mods = Record<string, string>;

const skyMods = import.meta.glob("../assets/skyguide/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Mods;
const neuronMods = import.meta.glob("../assets/Neuron/gallery/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Mods;
const yapMods = import.meta.glob("../assets/Yap chat/assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Mods;
const forMods = import.meta.glob("../assets/Forcaster/*.{png,jpg,jpeg,webp}", {
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

export const galleryImages: GalleryImage[] = interleave([sky, neuron, yap, forc]);
export const galleryUsesPlaceholders = false;
