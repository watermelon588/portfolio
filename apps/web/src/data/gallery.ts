// Gallery image source (ADR-017: asset-driven).
//
// Every SkyGuide screen in `apps/web/src/assets/skyguide/` is picked up
// automatically — drop new mockups in and they appear (sorted by filename).
// A small blocklist keeps non-showcase screens out of the reel. Each item
// carries a human label derived from its filename, shown on hover.
const modules = import.meta.glob(
  "../assets/skyguide/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default" },
) as Record<string, string>;

const BLOCKLIST = ["qrcode", "privacypolicy", "signup", "footer"];

export interface GalleryImage {
  src: string;
  label: string;
}

/** "allSkyChart.png" → "All Sky Chart"; "explore gallery" → "Explore Gallery". */
function humanize(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[._-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const real: GalleryImage[] = Object.entries(modules)
  .filter(([path]) => {
    const name = path.split("/").pop()?.toLowerCase() ?? "";
    return !BLOCKLIST.some((b) => name.includes(b));
  })
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({ src, label: humanize(path.split("/").pop() ?? "") }));

const placeholders: GalleryImage[] = Array.from({ length: 6 }, (_, i) => ({
  src: `https://picsum.photos/seed/skyguide-0${i + 1}/900/620`,
  label: "Preview",
}));

export const galleryImages: GalleryImage[] = real.length > 0 ? real : placeholders;
export const galleryUsesPlaceholders: boolean = real.length === 0;
