// Gallery source (ADR-017: asset-driven) — the home "A closer look" reel.
// Every image lives in assets/closer-look/<Project name>/ — a dedicated copy,
// resized for the reel, so deleting a file there removes it from this section
// only. The folder name is the project badge; files sort by name inside each
// project (leading "01-" numbers are stripped from the label).

const mods = import.meta.glob("../assets/closer-look/*/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Reel mixing order; any new project folder is appended after these.
const ORDER = ["Walkthru", "TripVerse", "Skyguide AI", "Neuron", "Shiori", "Yapchat", "Forcaster"];

export interface GalleryImage {
  src: string;
  label: string;
  project: string;
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

const byProject = new Map<string, GalleryImage[]>(ORDER.map((p) => [p, []]));
for (const [path, src] of Object.entries(mods).sort(([a], [b]) => a.localeCompare(b))) {
  const [project, file] = path.split("/").slice(-2) as [string, string];
  if (!byProject.has(project)) byProject.set(project, []);
  byProject.get(project)!.push({ src, label: humanize(file), project: project === "Shiori" ? "Shiori (栞)" : project });
}

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

export const galleryImages: GalleryImage[] = interleave([...byProject.values()]);
