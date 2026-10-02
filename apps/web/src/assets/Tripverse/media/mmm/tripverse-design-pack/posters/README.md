# TripVerse — Ten ways to go

Ten finished campaign graphics using 27 supplied assets (19 creative images and 8 photographs), the persistent arc logo, and the current TripVerse typography system.

## Deliverables

- `posters/`: ten full-resolution PNGs and ten high-quality JPEGs. Eight aspect ratios: 1:1, 4:5, 9:16, 16:9, 3:2, 2:3, 2:1 and 3:4.
- `gallery.html`: a local gallery with previews and links to each image and editable composition.
- `source/`: ten standalone editable compositions. Actual font files and imagery are embedded; text, spacing, color and logo remain editable.
- `cutouts/`: four reusable PNG cutouts with real alpha transparency, plus cropped versions.
- `art/`: the ten original image-generation art plates without typography.
- `manifest.json`: campaign copy, usage, dimensions and file mapping.
- `prompts.json`: the exact built-in image-generation prompt set.
- `asset-map.json`: original asset provenance for each concept.
- `verification.json`: exported dimensions, rendered text bounds, font loading and original-logo checks.
- `contact-sheet.jpg`: overview of all ten finished graphics.

## Brand

Headlines use Instrument Serif regular and italic with -0.028em tracking and 0.98 leading. Body and brand lockup use Geist; metadata uses Geist Mono. The main brand colors are Bone `#F7F6F3` and Ink `#111111`, with the current stylesheet's Muted `#666562`. Blue, apricot and butter canvases are campaign extensions requested by the user. Photographic art plates retain their natural color and paper texture.

The original SVG path comes directly from `frontend/media/icons/Vector.svg`; only the stroke inherits the composition's ink color, matching `Logo.tsx`. The logo was never redrawn or generated.

## Production

Artwork was made with the built-in image_gen tool using the supplied assets. Final typography and branding were composed with the exact downloaded font files and rendered in local Chromium at 2×. JPEGs have 300 dpi metadata. This is a digital RGB campaign pack; print bleed and a printer-specific color profile are not included.

To rebuild, run `node render_campaign.cjs` from this folder. Its runtime paths reflect the local bundled workspace dependencies. Original assets and application code were preserved.

## Verification

All ten PNG and JPEG dimensions were checked against the manifest. Used Instrument Serif, Geist and Geist Mono faces loaded successfully. Every text element fits within its canvas. Four reusable cutouts were checked for alpha pixels spanning transparent (0) to opaque (255). The finished contact sheet was visually inspected and background seams corrected.

Fonts are accompanied by their SIL Open Font License files in `fonts/`.
