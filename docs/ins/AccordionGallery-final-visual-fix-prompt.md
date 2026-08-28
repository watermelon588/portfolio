# AccordionGallery — Final Visual Fix Prompt

## Objective

Fix the current `AccordionGallery` implementation so it looks like a **large, premium editorial image strip**, not a collection of small images floating inside grey boxes.

The current implementation looks bad because making the gallery larger has caused the image/media sizing to behave like an oversized crop. The previous `object-fit: contain` solution also made the images look too small inside the panels.

### The intended result

> **Large gallery + full-height images + preserved aspect ratio + controlled horizontal cropping + subtle GSAP parallax.**

The panels should behave like **windows onto large full-height images**.

Do NOT redesign or replace the AccordionGallery component.

---

# 1. Correct Visual Model

The desired gallery should look approximately like:

```text
┌────────┬────────┬───────────────────────────────┬────────┬────────┐
│        │        │                               │        │        │
│ IMAGE  │ IMAGE  │         ACTIVE IMAGE          │ IMAGE  │ IMAGE  │
│        │        │                               │        │        │
│        │        │                               │        │        │
│        │        │                               │        │        │
│        │        │                               │        │        │
│        │        │                               │        │        │
└────────┴────────┴───────────────────────────────┴────────┴────────┘
```

The image itself should be **full gallery height**.

The panel is the viewport.

When a panel expands, more of that large image becomes visible.

Do NOT make each image a small `contain` image centered inside a large panel.

---

# 2. Remove the Previous `contain` Approach

Do NOT use:

```css
object-fit: contain;
```

for this gallery.

That creates the unwanted result:

```text
┌─────────────────────────────┐
│                             │
│        ┌──────────┐         │
│        │  IMAGE   │         │
│        │  IMAGE   │         │
│        └──────────┘         │
│                             │
└─────────────────────────────┘
```

This is NOT the desired design.

The images need to feel large and immersive.

---

# 3. Do Not Use `object-fit: cover` Either

Do not rely on:

```css
object-fit: cover;
```

with a `100% × 100%` image box.

That is what caused the aggressive cropping/chopped heads in the current version.

Instead, use the image's natural aspect ratio and make it full-height.

---

# 4. Correct Media Sizing

Change `.ag-panel__media` so it behaves as a large image surface:

```css
.ag-panel__media {
  position: absolute;
  top: 50%;
  left: 50%;

  width: max-content;
  height: 100%;

  filter: none;
  will-change: transform;
}
```

Then use:

```css
.ag-panel__media img {
  display: block;

  width: auto;
  height: 100%;

  max-width: none;
  max-height: none;

  object-fit: unset;
  object-position: center top;

  user-select: none;
  -webkit-user-drag: none;
}
```

### Why

This makes the source image:

- full gallery height
- naturally proportional
- undistorted
- visually large

The panel itself becomes the clipping window.

---

# 5. The Panel Is the Viewport

Keep:

```css
.ag-panel {
  overflow: hidden;
}
```

This is intentional.

The image can be wider than the panel.

The panel reveals the relevant portion.

Conceptually:

```text
             LARGE IMAGE
┌─────────────────────────────────────────────┐
│                                             │
│        FULL-HEIGHT SOURCE IMAGE             │
│                                             │
└─────────────────────────────────────────────┘
       ↑          ↑              ↑
       │          │              │
    panel 1    panel 2       active panel
     window     window           window
```

Do NOT shrink the source image to fit every panel.

---

# 6. Fix the Existing Media Size Calculation

Current code:

```tsx
const size = Math.max(
  140,
  usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22
);
```

Remove the aggressive `1.22` multiplier.

Use:

```tsx
const size = Math.max(
  140,
  usable * Math.min(Math.max(expandRatio, 0.2), 0.9)
);

mediaSizeRef.current = size;
```

Also remove:

```tsx
el.style.setProperty('--ag-media-size', `${size}px`);
```

if `--ag-media-size` is no longer required for CSS media sizing.

The `mediaSize` value can remain available for calculating parallax distance.

---

# 7. Do NOT Scale the Image With Hacks

Never use:

```css
transform: scale(...);
```

on the image to solve this.

Never use:

```css
zoom: ...;
```

Never use arbitrary negative margins.

Never use hardcoded transforms to visually compensate for incorrect sizing.

The image must be large because its **height is 100%**, not because of a scale hack.

---

# 8. Restore Parallax

The parallax effect disappeared and must be restored.

Use:

```tsx
parallax={0.2}
```

Calculate the drift:

```tsx
const drift = Math.max(-1.5, Math.min(1.5, active - i));
const shift = drift * parallax * mediaSize * 0.04;
```

Then keep GSAP responsible for media movement:

```tsx
tl.to(
  media,
  {
    xPercent: -50,
    yPercent: -50,
    x: vertical ? 0 : isActive ? 0 : shift,
    y: vertical ? (isActive ? 0 : shift) : 0,
    duration: dur,
    ease
  },
  0
);
```

---

# 9. GSAP Must Own the Transform

Do NOT add a competing CSS transform to:

```css
.ag-panel__media
```

GSAP should own:

```tsx
xPercent
yPercent
x
y
```

The CSS should only define:

- position
- width
- height
- overflow behavior
- visual properties

---

# 10. Parallax Must Be Subtle

The effect should feel like:

```text
Panel expands
       ↓
Image subtly shifts inside panel
       ↓
Panel changes
       ↓
Image subtly shifts back
```

It should NOT feel like:

```text
Panel expands
       ↓
IMAGE ZOOMS MASSIVELY
       ↓
HEAD DISAPPEARS
```

Use:

```tsx
parallax={0.2}
```

and:

```tsx
const shift = drift * parallax * mediaSize * 0.04;
```

Do not increase the parallax strength unless absolutely necessary.

---

# 11. Accordion Expansion

Keep the existing GSAP `flexGrow` accordion behavior.

Do not replace the accordion with a static grid.

Use:

```tsx
expandRatio={0.44}
```

as the starting value.

The active panel should be approximately:

```text
small   small       LARGE ACTIVE        small   small
┌───┐ ┌───┐ ┌──────────────────────┐ ┌───┐ ┌───┐
│   │ │   │ │                      │ │   │ │   │
│   │ │   │ │       IMAGE          │ │   │ │   │
│   │ │   │ │                      │ │   │ │   │
└───┘ └───┘ └──────────────────────┘ └───┘ └───┘
```

Do NOT make the active image appear dramatically zoomed.

The active panel becomes wider; the image remains a full-height image.

---

# 12. Gallery Configuration

For the Under the Hood section, use:

```tsx
<AccordionGallery
  height={560}
  gap={3}
  radius={0}
  expandRatio={0.44}
  parallax={0.2}
  tilt={0}
  grayscale={false}
  trigger="hover"
  showLabels={true}
/>
```

Start here and make only small visual adjustments if necessary.

---

# 13. Gallery Height

The gallery itself should be large:

```tsx
height={560}
```

A range of approximately:

```text
520px — 600px
```

is acceptable depending on the viewport.

IMPORTANT:

> Increasing gallery height must NOT cause the image to be artificially scaled beyond its natural aspect ratio.

The image should simply become taller while maintaining its proportions.

---

# 14. Remove Dark Effects

Keep the gallery clean.

Use:

```css
.ag-panel__overlay {
  display: none;
}
```

There should be:

- no gradient
- no dark blur
- no inactive dark tint
- no black overlay

Images should remain natural/full color.

---

# 15. Remove Black Borders

Do not add black frames around the images.

The panel should have:

```css
background: transparent;
box-shadow: none;
border-radius: 0;
```

If a frame/background is required, use a neutral light grey matching the section.

---

# 16. Keep Tilt Disabled

Use:

```tsx
tilt={0}
```

The desired motion comes from:

- accordion expansion
- subtle image parallax

Do not reintroduce large 3D rotations.

---

# 17. Gap

Use:

```tsx
gap={3}
```

The gaps between panels should be very small.

Do not introduce large margins between individual images.

---

# 18. Important Image Composition Rule

The user specifically wants the images to remain visually large.

The correct tradeoff is:

### GOOD

```text
FULL HEIGHT
    +
NATURAL ASPECT RATIO
    +
LARGE IMAGE
    +
PANEL CLIPS HORIZONTALLY
    +
SUBTLE PARALLAX
```

### BAD

```text
SMALL CONTAINED IMAGE
    +
LARGE EMPTY GREY SPACE
```

### ALSO BAD

```text
100% × 100%
    +
OBJECT-FIT: COVER
    +
HEAD/TOP CROPPED
```

---

# 19. Top Content Must Be Protected

The supplied images contain important content near the top:

- heads
- UI titles
- logos
- interface elements
- product details

Do not vertically crop these.

Keep:

```css
object-position: center top;
```

or, with the natural-size image strategy:

```css
top: 50%;
left: 50%;
```

combined with GSAP's:

```tsx
yPercent: -50;
```

The implementation must be visually checked to ensure important top content remains visible.

If a particular source image requires a per-image positioning adjustment, handle that cleanly rather than changing the global gallery into a bad compromise.

---

# 20. Responsive Behavior

Keep the existing mobile/vertical behavior.

On mobile:

- gallery becomes vertical as currently implemented
- images remain full-size/natural aspect ratio
- no distortion
- no tiny contained thumbnails
- no aggressive crop
- parallax remains subtle or is disabled only if required for accessibility/performance

Do not break keyboard navigation or accessibility.

---

# 21. Do Not Change the Existing Architecture

Preserve:

- `items`
- `defaultIndex`
- `active` state
- `flexGrow`
- GSAP timeline
- hover trigger
- click behavior
- keyboard navigation
- labels
- ResizeObserver
- reduced-motion support

Only correct:

- media sizing
- image rendering
- accordion proportions
- parallax strength
- unnecessary visual effects

---

# 22. Final CSS Direction

The relevant CSS should approximately be:

```css
.accordion-gallery {
  --ag-accent: #ffffff;
  --ag-overlay: transparent;
  --ag-text: #ffffff;
  --ag-gap: 3px;
  --ag-radius: 0px;

  display: flex;
  flex-direction: row;
  gap: var(--ag-gap);

  width: 100%;
  max-width: 100%;

  overflow: hidden;
  perspective: none;
}

.ag-panel {
  position: relative;

  flex: 1 1 0;

  min-width: 0;
  min-height: 0;

  overflow: hidden;

  border-radius: 0;

  background: transparent;
  box-shadow: none;

  cursor: pointer;
  display: block;

  text-decoration: none;
  outline: none;

  transform-style: flat;

  will-change: flex-grow;

  -webkit-tap-highlight-color: transparent;
}

.ag-panel__frame {
  position: absolute;
  inset: 0;

  overflow: hidden;

  border-radius: 0;

  background: var(--surface-gray, #e0e0e0);
}

.ag-panel__media {
  position: absolute;

  top: 50%;
  left: 50%;

  width: max-content;
  height: 100%;

  filter: none;

  will-change: transform;
}

.ag-panel__media img {
  display: block;

  width: auto;
  height: 100%;

  max-width: none;
  max-height: none;

  object-fit: unset;
  object-position: center top;

  user-select: none;
  -webkit-user-drag: none;
}

.ag-panel__overlay {
  display: none;
}
```

Preserve the existing label CSS unless it needs a minor adjustment.

---

# 23. Final Visual Acceptance Criteria

Before considering the work complete, verify the actual page visually.

### Gallery

- [ ] Gallery is large and fills the intended width.
- [ ] Gallery height is approximately 560px.
- [ ] Panels have minimal 3px gaps.
- [ ] Panels have square corners.
- [ ] No black borders.
- [ ] No dark gradients.
- [ ] No blur.
- [ ] No unnecessary shadows.

### Images

- [ ] Images are visually LARGE.
- [ ] Images occupy the full gallery height.
- [ ] Original aspect ratio is preserved.
- [ ] No stretching.
- [ ] No tiny centered images.
- [ ] No huge empty grey boxes around images.
- [ ] Heads are not unnecessarily chopped.
- [ ] Important top UI/text remains visible.
- [ ] No artificial image scaling hacks.

### Accordion

- [ ] Active panel expands.
- [ ] Inactive panels remain narrow.
- [ ] Active panel does not cause a fake zoom effect.
- [ ] Accordion interaction remains smooth.
- [ ] Hover behavior remains intact.

### Parallax

- [ ] Parallax is visibly restored.
- [ ] Image subtly drifts inside the panel.
- [ ] Drift is smooth.
- [ ] Drift does not create aggressive cropping.
- [ ] GSAP remains the sole owner of the media transform.

### Section

- [ ] Under the Hood grey background boundary remains exactly as requested.
- [ ] Technology cards still straddle the grey boundary correctly.
- [ ] Nothing outside the intended section becomes grey.

---

# 24. MOST IMPORTANT REQUIREMENT

Do not repeat the previous mistakes.

### Do NOT:

```css
object-fit: contain;
```

if it makes the images look like tiny thumbnails.

### Do NOT:

```css
object-fit: cover;
```

on a forced `100% × 100%` box if it chops important content.

### Do NOT:

```css
transform: scale(...);
```

### Do NOT:

```css
zoom: ...;
```

### Do NOT add arbitrary margins to compensate.

### Do NOT remove parallax.

---

# Final Design Principle

The AccordionGallery should feel like a **large cinematic/editorial image strip**.

The image itself is large and full-height.

The panels are windows into that image.

The accordion controls the **width of the window**, not the zoom level of the image.

The image subtly drifts inside the window through GSAP parallax.

That is the visual direction to implement.
