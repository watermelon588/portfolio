# Walkthru: a world drawn by curious people

Founder brief, 2026-10-01: **Doodles are the primary visual language of the next Walkthru brand.** Use the supplied doodle images directly. Illustration, visual and MCP artwork support that language. Photography is secondary and excluded from these concepts. The existing Scout walking-bird mark stays central.

These are exploratory mockups, not an implemented redesign. The founder explicitly authorized colorful palette studies here. Production tokens, pricing, routes and application behavior have not been changed.

## The narrative

You built something with AI. A stranger sees it differently. Scout tries a real goal in your browser, brings back grounded evidence, and gives you a clear next move. Your coding agent fixes the issue. A rerun tells you what changed.

The acquisition promise is fresh perspective; the retention promise is verifiable progress. Keep both visible. A playful brand should make the checks approachable while the report stays precise.

## Art direction

- Original doodles carry the identity: expressive faces for test users, walking figures for journeys, curious eyes for observation, and everyday objects for a product that understands people.
- Match the website typography: Geist Variable for the interface, extra-light headlines (200), light supporting headings (300), regular body and controls (400), and Geist Mono for technical labels. The founder requested this alignment after reviewing the original studies; serif and handwritten interface fonts have been removed. Fonts are embedded from the existing web dependencies, with their licenses retained, so the preview uses the actual site fonts offline.
- Artwork remains intact and uses `object-fit: contain`. Embedded copies are resized and compressed for preview; source files are untouched. No generated substitutes, recoloring or background removal.
- Paper and ink form the common foundation. Cobalt and yellow are the bold acquisition study; coral adds curiosity; pale green supports the quieter working screens.
- Let expressive art dominate acquisition pages. Keep evidence, inputs and findings clear in working screens, with artwork helping explain the current task.
- Keep Scout recognizable. Artwork is illustration, not a replacement set of product agent identities.
- Ground every product claim. No promised ranking, fabricated testimonial, security guarantee or invented customer result. Mock data and illustrative evidence are labeled.

## Thirteen mockups

| Concept | Surface | Customer goal | Original artwork |
|---|---|---|---|
| Paper Playground | Acquisition homepage | Understand the full launch check and start a scan | Blue doodle portraits, rooster |
| Cobalt Crowd | Test-user positioning | See why different perspectives find different friction | Cobalt face poster |
| Coral Observatory | Editorial homepage | Understand the three questions in one report | MCP eye, bird and walking legs |
| Launch Letter | Founder-focused homepage | Recognize the blind spots from building alone | Laptop user doodle |
| Launch Notebook | First-run setup | Give Scout a specific, useful goal | Loose colorful figures, walking illustration |
| Fieldwork | Dashboard | Start the next journey and revisit useful findings | Curious figure, Scout |
| Journey Room | Evidence report | Follow the observed issue to the next fix | Puzzled pencil face |
| Search Atlas | AI search readiness | Understand what search can read and what needs work | Person with browser windows |
| Fix Studio | Prioritized fixes | Hand grounded changes to a coding agent | MCP laptop character |
| MCP Workshop | Editor connections | Understand the scan, fix and rerun bridge | MCP pixel character, laptop doodle, device illustration |
| Release Radar | Rerun comparison | See fixed, still-open and new findings | Skateboarding bird |
| Agency Wall | Team findings | Agree on evidence, ownership and the next move | Visual crowd, curious stick figures |
| Launch Day | Completion and return | See real progress and keep checking | Blue everyday-object doodles |

Recommended coherent starting point: **Paper Playground + Fieldwork + Journey Room + MCP Workshop**. Cobalt Crowd is the boldest alternative for the acquisition page. The others explore the narrative across the customer journey.

## Preview and reproducibility

- Inline source: `walkthru-doodle-worlds.template.html`.
- `build-preview.py` embeds 18 original artworks and the brand mark once, writing the thread-owned fragment. Asset provenance is in `asset-manifest.json`.
- `qa-preview.html` is the Visualize standalone wrapper used for local inspection, not a deployed site.
- `mockup-01.png` through `mockup-13.png` are desktop captures in the table order.
- `verify-preview.cjs` checks all 13 layouts at 1024, 736, 375 and 320px; checks artwork loading and console errors; and exercises the seven local preview interactions. Results are recorded in `qa-results.json`.
- All interactive actions are local previews. No site is scanned, invitation sent, credential created or recurring watch enabled.
- The host supplies carousel navigation and optional design controls. No dependency was installed.
