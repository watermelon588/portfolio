# Walkthru: a world of fresh eyes

Ten finished campaign posters, each with its own composition and aspect ratio. Open `gallery.html` to browse; click a poster for the full-resolution PNG. `overview.jpg` shows the complete collection.

The narrative follows the product's work: fresh perspectives, trying a journey, noticing friction, finding evidence and choosing the next move. Expressive doodle faces lead the identity, eyes represent observation, walking figures represent journeys, and Scout anchors the brand. Each poster uses one brief headline and a small supporting line.

| Poster | Aspect ratio | PNG dimensions | Visual direction |
| --- | --- | --- | --- |
| Fresh Eyes Club | 4:5 | 1600 × 2000 | Paper collage, many perspectives |
| The Second Look | 16:9 | 1920 × 1080 | Cobalt observation wall |
| The Way Through | 9:16 | 1080 × 1920 | A winding illustrated journey |
| One Clear View | 1:1 | 1600 × 1600 | Visual dashboard mosaic |
| Signals in Sight | 2:1 | 2000 × 1000 | A wide wall of observation and insight |
| Real People Energy | 3:4 | 1440 × 1920 | Yellow portrait mosaic |
| Build Test Better | 3:2 | 1800 × 1200 | Three illustrated chapters |
| Scout's Second Look | 3:1 | 2400 × 800 | A panoramic Scout world |
| From Noise to Next | 2:3 | 1280 × 1920 | Expressive marks resolving into clarity |
| The Outside World | 16:10 | 1920 × 1200 | People, makers and AI orbit Scout |

## Artwork and typography

The compositions use 33 supplied original images from doodles, illustration, visual, info and mcp-claude, plus the existing Walkthru mark. Source paths are recorded in `asset-manifest.json`. Original files are preserved. Some compositions deliberately crop images or blend their paper backgrounds into the artboard.

Typography uses the website's actual local Geist Variable and Geist Mono Variable files. Headlines use weight 200 and tracking -0.035em; supporting labels use regular Geist Mono. Font licenses are included in `assets/`. Existing brand artwork and typography anchor the colorful campaign variations.

Transparent cutout sheets were created with the **built-in ImageGen tool**, in background-extraction mode. Prompts and input paths are recorded in `cutout-prompts.json`. Alpha is preserved in `assets/journey-cutouts.png` and `assets/curiosity-cutouts.png`. Poster layout, original artwork placements, exact typography and PNG exports are composed deterministically in the browser.

## Editable sources

- `poster-source.template.html`: all ten artboards, artwork selection, crops and layout coordinates.
- `build-posters.py`: binds original artwork paths and embeds the existing local brand fonts into `poster-source.html`.
- `render-posters.cjs`: exports ten PNGs and builds `gallery.html`.
- `review-gallery.cjs`: checks the gallery and exports `overview.jpg`.
- `qa-results.json`: artboard dimensions, headline weights, image loading and text bounds.
- `gallery-qa.json`: gallery image loading, links and overflow at 1600, 1024, 375 and 320px.

Run `build-posters.py` with the bundled Python runtime, then the two `.cjs` scripts with Node. Rendering uses the existing bundled Playwright and local Edge, without installing dependencies. The poster source expects this folder to remain beside `source-images`; exported PNGs are independent files. The gallery can be shared with its `assets/` and `posters/` folders.

These are visual campaign assets. They do not change the production application or make numerical performance claims. All ten final images were visually inspected; web build and zero-warning lint pass with existing build warnings.
