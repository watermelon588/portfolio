# AccordionGallery + Under the Hood — Correct the Design Flow

## Context

The current implementation has drifted away from the intended design.

The original AccordionGallery component is an **accordion gallery**: panels share a row, one panel expands, and the internal image position is animated as the panel changes width. The original component explicitly calculates an internal `--ag-media-size` and applies image drift/parallax rather than simply treating every panel as a normal full-bleed image. fileciteturn1file0L107-L145

The current result is visually wrong because the gallery has been modified in a way that makes the images appear excessively enlarged/cropped.

The goal is to **fix the design without replacing the AccordionGallery interaction**.

---

# 1. First Understand the Design Flow

The intended Under the Hood section should read as one coherent editorial section:

```text
┌──────────────────────────────────────────────────────────────┐
│                       GREY SECTION                            │
│                                                              │
│  03 — UNDER THE HOOD                                        │
│                                                              │
│  MAKE THE INTERFACE FEEL                                     │
│  SIMPLE. MAKE THE BACKEND DO                                 │
│  THE HARD PART.                                              │
│                                                              │
│  [ DEMO BUTTON ]                                             │
│                                                              │
│  SkyGuide is deliberately split into clear responsibilities.│
│  React handles the experience...                             │
│                                                              │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │              ACCORDION GALLERY                         │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│     ┌────────────────┐ ┌────────────────┐ ┌──────────────┐   │
│     │ EXPERIENCE     │ │ TRAFFIC        │ │ SCIENCE      │   │
│     │                │ │ CONTROLLER     │ │              │   │
│     └────────────────┘ └────────────────┘ └──────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

The **entire Under the Hood section only** should have a light grey background.

Do not make the entire website grey.

---

# 2. Why the Images Are Currently Being Enlarged

This needs to be fixed at the actual cause rather than patched visually.

The original component calculates a media size:

```tsx
const size = Math.max(
  140,
  usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22
);
```

and stores it as:

```tsx
--ag-media-size
```

The original horizontal gallery then uses that value for the internal image media width. fileciteturn1file0L179-L190

The original CSS likewise uses:

```css
.ag-panel__media {
  width: var(--ag-media-size);
  height: 100%;
}
```

rather than simply making the image width `100%`. fileciteturn1file0L346-L354

This is intentional for the accordion effect: the image is effectively a moving visual surface inside a panel.

## What went wrong

Changing this blindly to:

```css
.ag-panel__media {
  width: 100%;
  height: 100%;
}
```

combined with:

```css
.ag-panel__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

can cause the source image to be aggressively cropped when the panel's aspect ratio differs from the source image.

This is especially noticeable when the source images are portrait-oriented.

The result is:

```text
SOURCE IMAGE

┌──────────┐
│          │
│          │
│          │
│          │
│          │
│          │
└──────────┘


BAD RESULT

┌───────────────────────────┐
│       ZOOMED/CROPPED      │
│                           │
│     only central part     │
│       remains visible     │
└───────────────────────────┘
```

That is why the images currently look **massively enlarged**.

---

# 3. Do NOT Solve This by Randomly Reducing Image Size

Do not add:

```css
transform: scale(0.7);
```

or:

```css
zoom: 0.7;
```

or arbitrary negative margins.

Do not manually shrink each image.

The issue is the relationship between:

- Panel dimensions
- Media dimensions
- Image aspect ratio
- `object-fit`
- Accordion expansion
- Internal media positioning

Fix that relationship.

---

# 4. Preserve the Actual Accordion Behavior

The gallery should still behave like an accordion.

The original behavior is:

```text
┌───┬──────────────┬───┬───┬───┐
│   │              │   │   │   │
│   │   ACTIVE     │   │   │   │
│   │              │   │   │   │
└───┴──────────────┴───┴───┴───┘
```

When another panel is hovered:

```text
┌───┬───┬───┬──────────────┬───┐
│   │   │   │              │   │
│   │   │   │   ACTIVE     │   │
│   │   │   │              │   │
└───┴───┴───┴──────────────┴───┘
```

The panel should expand.

The **image should not independently zoom dramatically** as a side effect.

The accordion should create the visual change primarily through **panel width**, not through huge image scaling.

---

# 5. Correct Image Rendering

For the horizontal accordion, use the image as a contained visual surface that is positioned correctly inside the panel.

The most important requirement:

> **Changing the active panel must not make the image look like it has suddenly zoomed in.**

If `object-fit: cover` causes excessive cropping, use an implementation that preserves a more natural image scale while still filling the available panel.

A good starting point is:

```css
.ag-panel__media {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  width: auto;
  min-width: 100%;
  transform: translate(-50%, -50%);
}

.ag-panel__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

However, **do not blindly apply this snippet** if it conflicts with the existing GSAP transforms.

The existing GSAP code already applies:

```tsx
xPercent: -50,
yPercent: -50
```

and animated `x`/`y` offsets to the media. fileciteturn1file0L132-L145

Therefore, preserve GSAP's transform ownership.

Do not create CSS transforms that fight with GSAP.

---

# 6. Important: Do Not Break the GSAP Transform

The existing component animates:

- `flexGrow`
- `rotateY` / `rotateX`
- media `x`
- media `y`
- media `xPercent`
- media `yPercent`

as part of the accordion interaction. fileciteturn1file0L120-L145

Therefore:

### Avoid

```css
transform: translate(-50%, -50%);
```

if GSAP is already controlling `transform`.

Instead, use the existing `xPercent` / `yPercent` behavior and change only the sizing/positioning logic necessary to stop the excessive zoom.

The goal is:

**one transform owner — GSAP.**

---

# 7. Reduce the Internal Media Scaling

The component currently calculates:

```tsx
const size = Math.max(
  140,
  usable * expandRatio * 1.22
);
```

The `1.22` multiplier contributes to a larger internal media surface. fileciteturn1file0L183-L189

Do not arbitrarily increase this value.

If the current implementation has been modified beyond the source, restore the original calculation first.

Then visually tune it conservatively.

Do not make the media surface larger than necessary to achieve the parallax effect.

---

# 8. Keep Image Aspect Ratio

The source images should never be geometrically distorted.

Use:

```css
img {
  width: 100%;
  height: 100%;
}
```

with an appropriate `object-fit`.

But choose `cover`/`contain` based on the intended composition rather than assuming `cover` is always correct.

### Important distinction

**Cropping ≠ distortion.**

`object-fit: cover` does not technically distort an image, but it can crop so much of the image that the result visually looks like an unwanted zoom.

That is the current problem.

---

# 9. Remove the Dark Overlay

The original component includes a dark overlay:

```css
.ag-panel__overlay {
  background:
    linear-gradient(...),
    color-mix(...);
}
```

and the component also changes:

```tsx
'--ag-dim'
```

between active and inactive panels. fileciteturn1file0L132-L145 fileciteturn1file0L372-L379

The requested design does **not** need this dark treatment.

Remove it visually:

```css
.ag-panel__overlay {
  display: none;
}
```

or:

```css
.ag-panel__overlay {
  background: none;
}
```

Also stop inactive panels from receiving a dark tint.

The gallery should show the actual image colors.

---

# 10. Remove the Black Framing

The panel currently has:

```css
background: #0a0713;
box-shadow: 0 10px 30px -18px rgba(0, 0, 0, 0.8);
```

These create unnecessary framing. fileciteturn1file0L314-L329

Change to:

```css
.ag-panel {
  background: transparent;
  box-shadow: none;
}
```

Do not replace the black frame with another decorative border.

---

# 11. Do Not Over-Enlarge the Gallery

The previous instruction was to enlarge the AccordionGallery, but this does **not** mean:

> Make the images huge and crop them aggressively.

The desired change is:

**Increase the gallery's physical presence while keeping image composition natural.**

Good:

```text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│      LARGE ACCORDION GALLERY                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Bad:

```text
┌─────────────────────────────────────────────────────────┐
│     EXTREMELY ZOOMED IMAGE                              │
│       face/object cropped                               │
│       because image was forced to cover                 │
└─────────────────────────────────────────────────────────┘
```

Increase the gallery height/area, not the image zoom.

---

# 12. Gallery Height

The source component defaults to:

```tsx
height = 460
```

fileciteturn1file0L68-L87

A larger gallery is desired, but tune the height based on the actual section.

Recommended starting point:

```tsx
height={560}
```

or approximately:

```tsx
height: clamp(500px, 42vw, 640px);
```

Do not make it so tall that it dominates the entire case study.

The gallery should feel substantial but controlled.

---

# 13. Panel Gap

Use a very small gap.

Recommended:

```tsx
gap={4}
```

or:

```css
--ag-gap: 4px;
```

Do not create large white/grey gaps between panels.

---

# 14. Remove Rounded Card Treatment

The gallery should not look like five separate floating cards.

Use:

```tsx
radius={0}
```

and:

```css
.ag-panel {
  border-radius: 0;
}
```

The visual should read as one continuous gallery.

---

# 15. Reduce the 3D Tilt

The original default is:

```tsx
tilt = 8
```

which creates a noticeable 3D rotation. fileciteturn1file0L31-L50

For the current editorial design, use:

```tsx
tilt={0}
```

or at most:

```tsx
tilt={2}
```

Prefer `0` if the rotation is creating visual gaps or distorted-looking edges.

The accordion expansion itself is enough interaction.

---

# 16. Reduce Parallax

The original default is:

```tsx
parallax = 0.5
```

fileciteturn1file0L41-L44

Use something more subtle:

```tsx
parallax={0.15}
```

or:

```tsx
parallax={0}
```

The gallery should not feel like the images are sliding around inside the panels excessively.

---

# 17. Grayscale / Inactive State

The original component defaults to:

```tsx
grayscale = true
```

and changes the media between grayscale and color based on active state. fileciteturn1file0L35-L40

For this design:

```tsx
grayscale={false}
```

Keep the images naturally visible.

Do not use darkening as the primary indication of inactive panels.

The width/expansion state already communicates which panel is active.

---

# 18. Wrap ONLY the Under the Hood Section in Grey

This is a separate layout requirement.

The entire **Under the Hood section** should have a subtle grey background.

For example:

```css
.under-the-hood-section {
  background: #f3f3f3;
}
```

Use the project's existing neutral grey variable if one exists.

### Very important

Do not apply this background to:

- Body
- Header
- Previous section
- Following section
- Entire case study
- Footer

Only this section.

---

# 19. Grey Background Must Include the Entire Section

The grey wrapper should contain:

```text
03 — UNDER THE HOOD
Heading
Demo button
Body copy
AccordionGallery
Technology cards
```

Everything belonging to this section should sit inside the same background wrapper.

Conceptually:

```tsx
<section className="under-the-hood-section">

  <div className="under-the-hood-content">
    <section label />
    <heading />
    <demo button />
    <paragraph />
  </div>

  <AccordionGallery />

  <div className="technology-cards">
    ...
  </div>

</section>
```

Do not wrap only the gallery.

Do not wrap only the cards.

The background should visually unify the whole section.

---

# 20. Keep the Grey Subtle

Do not use a dark grey.

Use a very light neutral grey.

Example:

```css
background: #f3f3f3;
```

or use the site's existing background variable.

The goal is simply to separate this section from the surrounding white page.

---

# 21. Remove the Excess Space Above Under the Hood

There is still too much whitespace before:

> 03 — UNDER THE HOOD

Reduce it slightly.

Do not collapse the section against the previous content.

The desired spacing is:

```text
Previous content
       ↓
   small/moderate breathing room
       ↓
03 — UNDER THE HOOD
```

Not:

```text
Previous content
       ↓
       ↓
       ↓
       ↓
03 — UNDER THE HOOD
```

Find the actual source of the spacing and reduce it.

Do not use arbitrary negative margins unless absolutely necessary.

---

# 22. Preserve the Existing Demo Button

The Demo button already has a specific requirement from the previous implementation:

**Reuse the existing footer “NEXT CASE” button styling.**

Do not redesign it.

The button should remain inside the Under the Hood section and continue linking to the dedicated demo page.

---

# 23. Final Design Flow

The finished section should feel like this:

```text
───────────────────────────────────────────────────────────────
                        LIGHT GREY BACKGROUND

03 — UNDER THE HOOD

MAKE THE INTERFACE FEEL
SIMPLE. MAKE THE BACKEND DO
THE HARD PART.

[ DEMO ]

SkyGuide is deliberately split into clear responsibilities.
React handles the experience, Node.js handles the application
and real-time session layer, and FastAPI handles the
astronomy-heavy work.

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                   ACCORDION GALLERY                         │
│                                                             │
│   image       image          ACTIVE IMAGE        image      │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

      ┌────────────────┐  ┌────────────────┐  ┌──────────────┐
      │ THE EXPERIENCE │  │ THE TRAFFIC    │  │ THE SCIENCE  │
      │ React 19...    │  │ Node.js...     │  │ FastAPI...   │
      └────────────────┘  └────────────────┘  └──────────────┘

                        LIGHT GREY BACKGROUND
───────────────────────────────────────────────────────────────
```

---

# 24. What NOT To Do

Do NOT:

- ❌ Zoom the images out/in manually
- ❌ Add `scale()` hacks
- ❌ Add black borders
- ❌ Add dark gradients
- ❌ Add blur
- ❌ Add heavy shadows
- ❌ Add large panel gaps
- ❌ Add rounded card corners
- ❌ Make every image fill the panel with aggressive `cover` cropping without checking composition
- ❌ Break GSAP's transform control
- ❌ Replace the accordion with a static image grid
- ❌ Make the entire website grey
- ❌ Add a grey wrapper around unrelated sections
- ❌ Add negative margins just to force positioning
- ❌ Increase gallery size by simply making the images appear zoomed
- ❌ Redesign the existing Demo button

---

# 25. Acceptance Criteria

Before considering the implementation complete:

### Design flow

- [ ] Under the Hood reads as one coherent section.
- [ ] Section has a light grey background.
- [ ] Only this section has the grey background.
- [ ] Excess whitespace above the section is reduced slightly.
- [ ] Heading, Demo button, text, gallery and technology cards have a clear vertical hierarchy.

### Accordion

- [ ] Accordion interaction still works.
- [ ] Hover/click behavior remains functional.
- [ ] Active panel expands.
- [ ] Images do not suddenly become massively enlarged when active.
- [ ] Image composition remains recognizable.
- [ ] No unnecessary cropping/zooming occurs.
- [ ] No image distortion occurs.
- [ ] No black side strips exist.
- [ ] No dark gradient exists.
- [ ] No inactive-image darkening exists.
- [ ] No heavy shadows exist.
- [ ] Panel gaps are minimal.
- [ ] Panel corners are square/clean.
- [ ] 3D tilt is removed or extremely subtle.
- [ ] Parallax is subtle or disabled.

### Layout

- [ ] Gallery is physically larger than before.
- [ ] Larger gallery does NOT mean larger image zoom.
- [ ] Gallery uses the available width.
- [ ] Technology cards remain intact.
- [ ] Demo button remains intact.
- [ ] Mobile layout still works.

---

# Most Important Correction

The problem is **not that the AccordionGallery needs smaller images**.

The problem is that the current image/media sizing and `object-fit` behavior are causing the source images to be **cropped far too aggressively inside the accordion panels**.

Fix the media/panel relationship.

The desired result is:

> **BIG GALLERY, NORMAL IMAGE SCALE, CLEAN PANELS.**

Not:

> **BIG GALLERY, MASSIVELY ZOOMED IMAGES.**
