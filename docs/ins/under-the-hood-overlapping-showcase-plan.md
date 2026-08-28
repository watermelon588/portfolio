# Under the Hood — Replace AccordionGallery With Overlapping Feature Showcase

## IMPORTANT

Abandon the previous AccordionGallery implementation completely for this section.

The previous approach of making multiple vertical panels share the full gallery width is **not working visually**. Do not continue tuning `object-fit`, `mediaSize`, `expandRatio`, or the existing accordion math.

Use the uploaded reference image as the **visual direction** for the new implementation.

The new section should be a **horizontal overlapping showcase/carousel with text**, inspired by the reference:

- Several image cards arranged horizontally
- A larger active/featured image in the center
- Smaller neighboring images partially visible behind/around it
- Images overlap each other
- The active image sits visually above the neighboring images
- A clean editorial composition
- Text/information associated with the active item
- Navigation/progress indicator
- No vertical accordion strips

---

# 1. New Design Direction

The visual structure should be approximately:

```text
                         ┌───────────────┐
                         │               │
                         │   ACTIVE      │
                         │   IMAGE       │
                         │               │
                         │               │
                         └───────────────┘
                    ┌───────────────────────┐
                    │     ACTIVE IMAGE      │
                    │                       │
                    └───────────────────────┘
        ┌───────────────┐             ┌───────────────┐
        │               │             │               │
        │   PREVIOUS    │             │     NEXT      │
        │    IMAGE      │             │    IMAGE      │
        │               │             │               │
        └───────────────┘             └───────────────┘


        FEATURE TITLE / DESCRIPTION

        ────────────────●───────────────
                         2  3  4
```

More accurately, think of the reference as a **layered horizontal image composition**:

```text
┌────────────┐
│            │
│  previous  │───────┐
│            │       │
└────────────┘       │
                     │
              ┌──────▼──────────┐
              │                 │
              │     ACTIVE      │
              │      IMAGE      │
              │                 │
              └─────────────────┘
                              ┌────────────┐
                              │            │
                              │    next    │
                              │            │
                              └────────────┘
```

The exact overlap should be tuned to look polished and intentional.

---

# 2. Do NOT Use AccordionGallery

Remove the current `AccordionGallery` from the Under the Hood section.

Do not try to make the existing accordion behave like this design.

The new component should have a dedicated name, for example:

```text
FeatureShowcase
```

or:

```text
UnderHoodShowcase
```

Prefer a dedicated component so the existing AccordionGallery remains untouched elsewhere in the project.

---

# 3. Keep the Existing Content

The images currently used for the Under the Hood section should continue to be used.

Do not replace the actual project imagery.

Create a data structure similar to:

```tsx
const showcaseItems = [
  {
    image: "...",
    title: "...",
    description: "...",
  },
  {
    image: "...",
    title: "...",
    description: "...",
  },
  ...
];
```

Use the existing image assets and existing text/content where applicable.

Do not invent unrelated project content.

---

# 4. Main Layout

The new showcase should occupy a large horizontal area.

Recommended starting point:

```css
.under-hood-showcase {
  position: relative;
  width: 100%;
  height: clamp(520px, 48vw, 680px);
  overflow: hidden;
}
```

The section should feel spacious and editorial.

Do not make the images tiny.

Do not make the gallery look like a normal 3-column grid.

---

# 5. Image Cards

Each image should be a real card/frame.

Example:

```css
.showcase-card {
  position: absolute;
  overflow: hidden;

  background: #fff;

  border: 1px solid var(--border);
  border-radius: 0;

  box-shadow: none;
}
```

The design should be clean and rectangular.

No:

- rounded cards
- black borders
- gradients
- dark overlays
- excessive shadows
- glassmorphism

A very subtle shadow is allowed only if required to establish the overlap hierarchy.

---

# 6. Active Image

The active image should be the largest and visually dominant card.

Example starting dimensions:

```css
.showcase-card--active {
  width: clamp(360px, 32vw, 520px);
  height: clamp(360px, 32vw, 520px);

  z-index: 5;
}
```

Position it near the horizontal center.

The active image should feel like the focal point.

---

# 7. Neighboring Images

Show neighboring images partially behind the active card.

For example:

```text
previous                ACTIVE                    next

┌───────────┐       ┌────────────────┐       ┌───────────┐
│           │       │                │       │           │
│           │       │                │       │           │
│           │──────►│                │◄──────│           │
│           │       │                │       │           │
└───────────┘       └────────────────┘       └───────────┘
```

The neighboring cards should be:

- smaller
- partially obscured
- visually behind the active card
- still recognizable

Use z-index intentionally.

Example:

```css
.showcase-card--previous,
.showcase-card--next {
  z-index: 2;
  width: clamp(240px, 24vw, 380px);
  height: clamp(300px, 30vw, 480px);
}
```

The exact dimensions should be tuned against the actual images.

---

# 8. Overlap Is Intentional

The cards should overlap.

Do NOT use:

```css
display: grid;
grid-template-columns: repeat(...);
```

for the actual visual composition.

Use:

```css
position: absolute;
```

or another appropriate layered layout technique.

The visual effect should resemble the supplied reference:

- cards intersect
- active card sits above neighboring cards
- composition feels dynamic
- large whitespace remains around the composition

---

# 9. Image Rendering

Do not distort the source images.

Use:

```css
.showcase-card img {
  width: 100%;
  height: 100%;
  display: block;
}
```

Choose `object-fit` per image composition rather than forcing one global rule blindly.

Start with:

```css
object-fit: cover;
```

but carefully choose:

```css
object-position: center;
```

or:

```css
object-position: center top;
```

for individual assets where needed.

### Important

Do not chop:

- heads
- important UI
- logos
- important text
- product/object details

If an image needs a different `object-position`, define it per item.

---

# 10. Text Is Part of the Design

This is no longer an image-only gallery.

The active item must have associated text.

The text should appear as a clean editorial information block near/below the image composition.

For example:

```text
┌─────────────────────────────────────────┐
│                                         │
│              IMAGE SHOWCASE             │
│                                         │
└─────────────────────────────────────────┘

INTERACTIVE ALL-SKY CHART

Explore the sky through a live interactive
visualization built for real-time discovery.

───────────────●───────────────
                2  3  4
```

Use the project's existing typography system.

Do not create huge text that competes with the main Under the Hood heading.

---

# 11. Text Position

The text should be integrated into the showcase rather than appearing like an unrelated paragraph.

A recommended structure:

```text
                IMAGE
          ┌───────────────┐
          │               │
          │    ACTIVE     │
          │               │
          └───────────────┘

          ACTIVE FEATURE TITLE

          Short supporting description.

          01 ────────────────
```

Alternatively, text can sit below and slightly offset from the active image if that better matches the existing page rhythm.

The key requirement:

> Image composition and text should feel like one feature presentation.

---

# 12. Navigation

Add a minimal navigation/progress indicator inspired by the reference.

Example:

```text
──────────────●──────────────
              2  3  4
```

or:

```text
01 / 04
```

Keep it minimal.

Do not use large carousel arrows unless they are genuinely necessary.

If arrows are added, use the project's existing button styling.

---

# 13. Interaction

The showcase should be interactive.

Recommended behavior:

### Hover

Neighboring cards subtly move/shift.

### Click

Clicking a neighboring image makes it the active image.

The active image transitions into the center.

### Transition

Use GSAP or CSS transitions.

Recommended duration:

```text
0.5s – 0.8s
```

Use a smooth ease.

Do not make the animation flashy.

---

# 14. Active Transition

When item 2 becomes item 3:

```text
BEFORE

      [ 1 ]    [      2 ACTIVE      ]    [ 3 ]


AFTER

      [ 2 ]    [      3 ACTIVE      ]    [ 4 ]
```

The cards should transition spatially rather than instantly disappearing/reappearing.

Use:

- x translation
- scale
- opacity
- z-index changes

subtly.

---

# 15. Parallax

Do NOT bring back the previous AccordionGallery parallax implementation.

That implementation belongs to the old component.

If desired, add a very subtle image movement inside the active card:

```text
active card
     ↓
image shifts 4–8px
```

This should be extremely subtle.

The main interaction is the **overlapping card movement**, not image zooming.

---

# 16. Remove Previous Accordion Styling

The new component must not inherit:

```css
.ag-panel
.ag-panel__media
.ag-panel__frame
.ag-panel__overlay
```

for its primary layout.

Do not leave the old accordion's layout rules controlling the new showcase.

Create scoped styles such as:

```css
.under-hood-showcase
.showcase-card
.showcase-card--active
.showcase-card--previous
.showcase-card--next
.showcase-info
.showcase-progress
```

---

# 17. Section Background

Keep the existing Under the Hood grey background requirement.

The light grey background should:

- begin before `03 — UNDER THE HOOD`
- cover the heading
- cover the demo button
- cover the supporting text
- cover the entire new showcase
- extend down to exactly the midpoint of the three technology cards

The cards should straddle the background boundary:

```text
                 LIGHT GREY
┌─────────────────────────────────────────────┐
│                                             │
│  03 — UNDER THE HOOD                        │
│                                             │
│  HEADING                                    │
│                                             │
│  TEXT                                       │
│                                             │
│            IMAGE SHOWCASE                   │
│                                             │
│                                             │
│      ┌────────┐ ┌──────────────┐ ┌────────┐ │
│      │        │ │              │ │        │ │
├──────┼────────┼─┼──────────────┼─┼────────┼─┤
│      │        │ │              │ │        │ │
│      │        │ │              │ │        │ │
│      └────────┘ └──────────────┘ └────────┘ │
│                                             │
└─────────────────────────────────────────────┘
                 NORMAL BG
```

Do not move the cards completely inside or completely outside the grey section.

---

# 18. Technology Cards

Keep the existing three technology cards:

- React 19 & Vite
- Node.js & Express 5
- FastAPI & Astropy

Their content should remain unchanged.

They should continue to straddle the bottom edge of the grey Under the Hood background.

The new image showcase sits **above** these cards.

---

# 19. Existing Heading and Demo Button

Do not redesign the existing Under the Hood heading.

Keep:

```text
03 — UNDER THE HOOD
```

and the existing large heading.

Keep the existing Demo button and its styling.

The new showcase replaces only the old image/gallery presentation.

---

# 20. Responsive Design

Desktop:

```text
┌───────┐       ┌─────────────────┐       ┌───────┐
│ prev  │       │     ACTIVE      │       │ next  │
└───────┘       └─────────────────┘       └───────┘
```

Tablet:

```text
      ┌──────┐
      │prev  │ ┌──────────────┐
             └►│    ACTIVE    │
               └──────────────┘
```

Mobile:

Use a simpler stacked carousel:

```text
┌───────────────────────┐
│                       │
│       ACTIVE IMAGE    │
│                       │
└───────────────────────┘

FEATURE TITLE

Description

───────●───────
```

On mobile, it is acceptable to hide the partially visible side cards if necessary.

Do NOT allow horizontal page overflow.

---

# 21. Avoid These Mistakes

Do NOT:

- use the old accordion
- create five equal vertical panels
- use tiny contained images
- force all images into the same aspect ratio
- distort source images
- add black borders
- add dark gradients
- add heavy shadows
- add rounded cards
- create giant empty spaces
- create horizontal page overflow
- make the active image excessively huge
- use aggressive zoom
- add unnecessary animation

---

# 22. Visual Priority

The hierarchy should be:

```text
1. Under the Hood heading
2. Large overlapping image showcase
3. Active feature text
4. Minimal navigation/progress
5. Technology cards
```

The image showcase should be visually impressive but still belong to the existing editorial/minimal page design.

---

# 23. Recommended Starting Layout

Start with:

```css
.under-hood-showcase {
  position: relative;
  width: 100%;
  height: clamp(560px, 48vw, 680px);
  overflow: hidden;
}

.showcase-card {
  position: absolute;
  top: 50%;
  overflow: hidden;

  border: 1px solid var(--border);
  background: var(--surface);

  border-radius: 0;

  transform: translateY(-50%);
  transition:
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
    width 700ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 500ms ease;
}

.showcase-card--active {
  left: 50%;
  width: clamp(360px, 32vw, 520px);
  height: clamp(420px, 36vw, 560px);
  z-index: 5;
  transform: translate(-50%, -50%);
}

.showcase-card--previous {
  left: 15%;
  width: clamp(260px, 24vw, 380px);
  height: clamp(340px, 30vw, 480px);
  z-index: 2;
  transform: translate(-50%, -50%);
}

.showcase-card--next {
  left: 85%;
  width: clamp(260px, 24vw, 380px);
  height: clamp(340px, 30vw, 480px);
  z-index: 2;
  transform: translate(-50%, -50%);
}
```

These are **starting values only**. Adjust against the actual page and supplied images.

The final composition should resemble the uploaded reference more than these exact numbers.

---

# 24. Important: Do Not Copy the Reference Literally

Use the reference as a **layout and interaction reference**, not as content.

Do not copy:

- its branding
- its text
- its exact colors
- its exact images
- its footer
- its logos

Keep SkyGuide's existing brand identity.

The reference establishes:

> **overlapping horizontal feature cards + one dominant active image + supporting text + minimal progress/navigation**

---

# 25. Implementation Structure

Prefer:

```text
apps/web/
  components/
    FeatureShowcase/
      FeatureShowcase.tsx
      FeatureShowcase.css
```

or an equivalent location consistent with the existing project architecture.

Then in:

```text
ProjectPage.tsx
```

replace the current Under the Hood AccordionGallery with:

```tsx
<FeatureShowcase
  items={showcaseItems}
  defaultIndex={0}
/>
```

Keep the rest of the section intact.

---

# 26. Verification

Run:

```bash
pnpm --filter web typecheck
```

Then inspect:

```text
http://localhost:5173/work/skyguide
```

Verify:

- [ ] Old AccordionGallery is gone from Under the Hood.
- [ ] New overlapping image composition is visible.
- [ ] One image is clearly dominant/active.
- [ ] Neighboring images are partially visible.
- [ ] Cards overlap naturally.
- [ ] Images are large.
- [ ] Images are not distorted.
- [ ] Important image content is not unnecessarily cropped.
- [ ] Text belongs visually to the active feature.
- [ ] Navigation/progress is minimal.
- [ ] Transitions are smooth.
- [ ] No black borders.
- [ ] No dark gradients.
- [ ] No giant shadows.
- [ ] No rounded cards.
- [ ] No horizontal page overflow.
- [ ] Grey Under the Hood background starts at the correct point.
- [ ] Grey background ends at exactly 50% of the technology cards.
- [ ] Technology cards remain unchanged.
- [ ] Existing heading remains unchanged.
- [ ] Existing Demo button remains unchanged.
- [ ] Mobile layout works.

---

# Final Instruction

**Stop trying to make the existing AccordionGallery work for this design.**

Replace it with a dedicated **overlapping horizontal feature showcase** inspired by the uploaded reference.

The key visual idea is:

> **A large active image in the center, smaller neighboring images overlapping behind it, with the active image's title/description and a minimal progress indicator.**

It should feel like a polished editorial/product showcase — spacious, minimal, intentional, and integrated with the existing SkyGuide Under the Hood section.
