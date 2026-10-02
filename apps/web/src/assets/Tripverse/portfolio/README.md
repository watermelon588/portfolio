# TripVerse case media

Prepared from supplied assets and the current local application on 2 October 2026.

- `screens/`: lossless WebP encodings at the original capture size. The supplied design-pack screen set plus six selected `TripVerse/frontend/public/guide` captures. Existing source detail crops keep their source coordinates in their filenames.
- `compositions/`: responsive WebPs of the nine non-laptop product compositions; long edge capped at 1920px, quality 92. Original interface pixels, ratios and visual composition are preserved. `01-planning-desk` is excluded because laptops are reserved for destination Footer previews.
- `manifest.json`: exact local sources, original/rendered dimensions, byte sizes and SHA-256 hashes. No synthesized interfaces or new location claims.

The case/home previews and homepage gallery reference this canonical set; source originals remain untouched. The 24 prepared original journal WebPs live unchanged in `apps/web/public/images/journal`. Original journal code/fonts/icons and transfer details are documented in `components/tripverse/README.md`.

No video is added: the supplied reference clips are third-party inspiration, rather than product evidence. No new dependency, lockfile, backend, auth or global scroll controller is required.
