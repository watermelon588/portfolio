# Original TripVerse journals in the portfolio

Copied from `TripVerse/frontend/src/components/home/v2/journal/` on 2 October 2026. `TravelJournals` renders both original independently controlled eight-chapter books. Content and CSS are unchanged. The source `useReducedMotion` hook and 24 public journal WebPs are copied unchanged.

Only component import locations and four non-null index assertions differ: the destination's stricter TypeScript checks require assertions for the original bounded chapter positions and known subtitle format. No DOM, copy, asset resolver, event handler or motion constant is redesigned.

The source `.tv2` token/reset/container environment is mechanically scoped to `.tripverse-original`. Mount it outside the portfolio's `.dw-case-study` subtree, whose blanket square-corner rule would otherwise flatten the original paper/controls. Original fonts, font licenses and the six original Lucide v0.354.0 icons/runtime (ISC license retained) are local; React and GSAP use the portfolio's existing instances. No backend, auth, router or second smooth-scroll manager is imported.

`output/session-3/prepare_assets.py` records all source media transfers. Case and gallery derivatives live under `assets/Tripverse/portfolio`; original laptop imagery is exclusively `project.nextCaseImage` in destination footers.
