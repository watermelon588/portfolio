// Gallery image source (ADR-017: asset-driven).
//
// Drop SkyGuide AI mockups (png/jpg/jpeg/webp/avif) into
// `apps/web/src/assets/skyguide/` and they are picked up automatically here —
// no code change needed. Until then, labeled placeholders keep the layout +
// curve reveal visible. Later these can become <video> loops ("moving images").
const modules = import.meta.glob(
  "../assets/skyguide/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default" },
) as Record<string, string>;

const real: string[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

const placeholders: string[] = [
  "https://picsum.photos/seed/skyguide-01/900/620",
  "https://picsum.photos/seed/skyguide-02/900/620",
  "https://picsum.photos/seed/skyguide-03/900/620",
  "https://picsum.photos/seed/skyguide-04/900/620",
  "https://picsum.photos/seed/skyguide-05/900/620",
  "https://picsum.photos/seed/skyguide-06/900/620",
];

export const galleryImages: string[] = real.length > 0 ? real : placeholders;
export const galleryUsesPlaceholders: boolean = real.length === 0;
