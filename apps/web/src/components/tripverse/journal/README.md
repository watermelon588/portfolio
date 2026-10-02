# Travel journals

Rendered by `HomeV2` after Destinations. **The memory stack** and **The field journal**
appear one after the other, each with an independent chapter position. Their
backgrounds span the viewport; the journal contents retain the existing centered
container, imagery, layouts, and responsive behavior.

## Reference study

The supplied Everyday small routine upgrades clip is 8.33 seconds, 720 × 540,
at 30 fps. A contact sheet sampled at 3 fps and a full-size frame informed the
composition: a slate-blue canvas, small centered Journal heading, a roughly
1.2:1 central collage, six receding sheets on either side, rounded paper corners,
a broad shadow, and four white circular controls beneath the pages. The moving
sheet pivots around a vertical edge rather than sliding like a carousel.

The memory stack recreates that visual arrangement with original local imagery
and new travel captions. The field journal uses a different principle: a physical
open notebook with a spiral spine, cream ruled paper, taped photographs, a
postmark, and handwritten field notes. On phones it becomes a single large page
so captions remain readable, with a smaller art print layered over the photograph.

## Interaction and animation

- Click the left or right half, use the previous/next controls, or swipe horizontally.
- Focus the journal and use Left/Right, Home, or End.
- Browse the eight chapters through the thumbnail picker; reset returns to chapter one.
- A GSAP timeline rotates the leaf in 3D. Separate front/back faces and the next
  page underneath keep images visible through the turn. Reverse navigation uses
  the opposite hinge. The two-page notebook flips its right leaf onto the left.
- `useGSAP` owns animation cleanup. A synchronous ref prevents repeated input
  from starting overlapping turns. Swipe clicks are suppressed.
- Reduced-motion preferences replace page turns with immediate chapter changes.
- Chapter updates are announced through a polite live region. Decorative stacked
  sheets and moving duplicates are hidden from assistive technology.

`journalContent.ts` contains the chapter text and descriptive image alt text.
`TravelJournals.tsx` exports the complete section and the reusable `JournalBook`.
Styles are scoped with the `tj-` prefix and use the home page's existing type tokens.
GSAP, its React hook, Lucide and the self-hosted Caveat font were already dependencies.

## Assets

`frontend/scripts/journal_assets.py` maps 24 images from `media/mmm/photography`
and `media/mmm/creative` to descriptive WebP files in `public/images/journal`.
It preserves source aspect ratios, corrects orientation, and limits the long edge
to 1200 pixels. Run it with Python and Pillow to regenerate the assets. The source
media folder is ignored by Git; the generated gallery assets are included normally.
The image selection and written captions are illustrative, not verified location metadata.

## Verification

TypeScript and the production build passed. Headless Chrome checks cover both
turn directions, keyboard navigation and endpoints, chapter selection, reset,
reduced motion, image loading, desktop rendering and a 390px phone layout.
Study frames and browser previews are in `output/journal-study` in this workspace.
