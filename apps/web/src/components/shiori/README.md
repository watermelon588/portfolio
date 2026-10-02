# Original Shiori website sections in the portfolio

Copied from `Shiori (栞)/site/` on 3 October 2026 for the `/work/shiori` case study.

| Portfolio file | Source | Change |
|---|---|---|
| `ShioriOriginalSections.tsx` | `index.html` `.cast-field`, `.ink`, `.wall3d` markup; `assets/js/nagi.js` lines 4–12, 43–70, 107–118, 124, 160–166 | Markup converted to JSX (same classes, data attributes and copy). Code split into three components, each querying its own section root. |
| `gallery-data.js` | `assets/js/gallery-data.js` | Unchanged (byte-identical). It still sets `window.SHIORI_ART`. |
| `shiori-original.css` | `assets/css/nagi.css` tokens/base/buttons/link and `nagi-art.css` cast, manga, wall, micro-interaction and reduced-motion rules | Every selector prefixed with `.shiori-original`; `:root`/`body` rules moved onto that wrapper. Values unchanged. |
| `apps/web/public/shiori/g/*.webp` | `assets/g/` | The 69 files these sections use (13 cut-outs, 24 manga pages, 32 wall pieces), unchanged. |

Bridge-only adaptations: the image resolver points at `/shiori/g/` instead of `assets/g/`; relative `gallery.html` links point to the hosted `https://shiori-dusky.vercel.app/gallery.html` (opening in a new tab); the site's Google Fonts and Phosphor icon stylesheets are added once on mount; every generated node, listener and tween is removed on unmount so remounts never duplicate figures or tiles. Selection (seeds, filters, slices), depths, positions and all motion values (durations, eases, scrub 0.8, rise/float/lean, wall tilt) are the source's.

Mount each section inside `<div className="shiori-original">`, outside the portfolio's `.dw-case-study` subtree, whose square-corner reset would otherwise flatten the original rounded art.

Artwork belongs to the original anime/manga creators; Shiori builds on Seanime by 5rahim (GPL-3.0).
