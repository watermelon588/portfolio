# AccordionGallery — Visual Cleanup & Size Update Instructions

## Objective

Update the existing `AccordionGallery` so it matches the cleaner visual shown in the reference.

The gallery should feel **larger, cleaner, and edge-to-edge**, without the current dark/gradient treatment or unnecessary black framing around individual images.

The uploaded component currently uses a configurable overlay, grayscale/dim treatment, panel background, gap, rounded corners, and a constrained media width. These should be adjusted rather than redesigning the component architecture. The component currently exposes `overlayColor`, `height`, `gap`, `radius`, `parallax`, `tilt`, `grayscale`, and related props. fileciteturn0file0L13-L31

---

# 1. Remove the Dark Gradient / Blur-Like Effect

The current gallery applies a dark overlay over every image.

Remove this effect completely.

The current overlay uses a vertical gradient plus an additional dark color layer. fileciteturn0file1L81-L87

### Required change

The images should display naturally.

Do **not** apply:

- Dark gradient
- Black fade at the bottom
- Dark tint over inactive images
- Any blur-like darkening
- Text-shadow-heavy visual treatment unless it is genuinely needed for label readability

The gallery should look bright and clean.

### CSS

The simplest approach is to make the overlay visually inactive:

```css
.ag-panel__overlay {
  display: none;
}
```

Or, if the overlay element needs to remain for structure/accessibility:

```css
.ag-panel__overlay {
  background: none;
}
```

Prefer removing the visual effect entirely.

---

# 2. Remove the Unnecessary Black Side Borders

There should **not** be a black vertical strip/border beside each image.

The current implementation gives each panel a dark background:

```css
.ag-panel {
  background: #0a0713;
}
```

The media itself is also narrower than the panel because its width is calculated from `--ag-media-size`. fileciteturn0file1L22-L37 fileciteturn0file1L54-L64

This combination creates visible dark areas around the images.

### Required visual result

Each image should fill its panel.

There should be:

- No black side strips
- No dark frame around images
- No artificial borders
- No visible panel background around the image

### Change the panel

Use a neutral/transparent panel background:

```css
.ag-panel {
  background: transparent;
  box-shadow: none;
}
```

### Make the media fill the panel

For horizontal orientation, change the media from a fixed/constrained width to:

```css
.ag-panel__media {
  width: 100%;
  height: 100%;
}
```

The current `width: var(--ag-media-size)` is the main reason the image does not occupy the entire panel. fileciteturn0file1L54-L64

---

# 3. Images Should Fill Their Panels

The image should occupy the entire available panel.

Current implementation:

```css
.ag-panel__media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

The `contain` behavior can leave unused space when the image aspect ratio differs from the panel. fileciteturn0file1L71-L79

Use:

```css
.ag-panel__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

This should produce a continuous visual wall of images.

### Important

Do not distort the images.

`object-fit: cover` is preferred because it preserves the image's aspect ratio while allowing it to fill the panel.

Cropping is acceptable if necessary to eliminate empty framing.

---

# 4. Remove Unnecessary Gaps / Borders Between Images

The current gallery has:

```css
--ag-gap: 10px;
```

and:

```css
gap: var(--ag-gap);
```

The panels therefore have visible separation. fileciteturn0file1L1-L14

For this design, reduce the spacing substantially.

Preferred:

```css
--ag-gap: 4px;
```

If the reference requires a completely continuous gallery:

```css
--ag-gap: 0px;
```

Use **0–4px maximum**.

Do not introduce any additional margins or padding between gallery panels.

---

# 5. Remove Rounded Corners

The current component applies a configurable radius:

```css
--ag-radius: 16px;
```

and each panel receives:

```tsx
style={{ borderRadius: `${radius}px` }}
```

The gallery in the reference should feel much more like one large visual surface.

Use:

```css
--ag-radius: 0px;
```

and ensure the panels do not introduce their own radius.

If the existing component API requires the `radius` prop, keep it for compatibility but default it to `0`.

### Target

No unnecessary rounded corners around individual image panels.

---

# 6. Enlarge the AccordionGallery

The gallery currently defaults to:

```tsx
height = 460
```

Increase the visual size significantly. fileciteturn0file0L43-L62

Recommended default:

```tsx
height = 620
```

For a large desktop presentation, consider:

```tsx
height = 680
```

The final choice should depend on the surrounding section, but the gallery should clearly be **larger than its current implementation**.

### Goal

The gallery should occupy substantially more vertical space and become one of the dominant visual elements of the section.

Do not compensate for a larger gallery by adding unnecessary margins around it.

---

# 7. Make the Gallery Wider

The gallery already has:

```css
width: 100%;
max-width: 100%;
```

Keep that behavior. fileciteturn0file1L9-L14

Make sure its parent container is not unnecessarily constraining it.

The desired result is:

```text
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    ACCORDION GALLERY                       │
│                                                            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

It should use the available content width.

Do not add:

- Extra left margin
- Extra right margin
- Arbitrary max-width
- Decorative outer border
- Additional container padding

---

# 8. Keep the Accordion Interaction

Do NOT remove the existing accordion behavior.

Keep:

- Hover activation
- Click behavior
- Keyboard navigation
- GSAP transitions
- Active panel expansion
- Parallax behavior if it still looks good

The component currently calculates active-panel flex growth using `expandRatio`. fileciteturn0file0L82-L105

The interaction should remain.

The change is primarily visual:

**same interaction, cleaner presentation.**

---

# 9. Reduce the Aggressive 3D Tilt

The current component applies a fairly noticeable panel rotation:

```tsx
tilt = 8
```

and calculates the rotation based on whether panels are before/after the active panel. fileciteturn0file0L102-L105

The reference feels flatter and more editorial.

Reduce the default:

```tsx
tilt = 2
```

or:

```tsx
tilt = 0
```

Prefer `2` if some subtle motion is desirable.

Do not allow the tilt to create visible black wedges or gaps between panels.

---

# 10. Reconsider Grayscale / Dimmed Inactive Images

The current implementation sets:

```tsx
const gray = grayscale ? (isActive ? 0 : 1) : 0;
```

and also applies:

```tsx
'--ag-dim': isActive ? 0 : 0.35
```

to the media. fileciteturn0file0L107-L120

The target visual should be cleaner and less dark.

### Preferred defaults

```tsx
grayscale = false
```

and remove the dimming behavior.

All images should remain naturally visible.

If inactive-state differentiation is needed, let the accordion's size/position change provide the visual hierarchy instead of darkening the images.

---

# 11. Labels

Keep the existing labels if they are required.

However, they should sit cleanly over the image without a large dark gradient behind them.

Current labels are positioned at the bottom of the panel. fileciteturn0file1L90-L99

Keep the label positioning but ensure the label itself is readable without introducing a full-panel dark overlay.

The label can have a subtle local text treatment if necessary, but avoid a large gradient.

---

# 12. Suggested Updated Defaults

Update the component defaults approximately to:

```tsx
height = 640,
gap = 4,
radius = 0,
expandRatio = 0.52,
parallax = 0.25,
tilt = 2,
grayscale = false,
```

The exact values can be visually tuned, but the important requirements are:

- Larger gallery
- Minimal/no gap
- No radius
- No grayscale
- Minimal tilt
- Minimal parallax
- No dark overlay

---

# 13. Suggested CSS Direction

The important visual CSS should end up close to:

```css
.accordion-gallery {
  --ag-gap: 4px;

  display: flex;
  flex-direction: row;
  gap: var(--ag-gap);

  width: 100%;
  max-width: 100%;

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
}

.ag-panel__frame {
  position: absolute;
  inset: 0;

  overflow: hidden;
  border-radius: 0;
}

.ag-panel__media {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  filter: none;
}

.ag-panel__media img {
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  display: block;
}

.ag-panel__overlay {
  display: none;
}
```

Do not blindly copy this if it conflicts with the existing animation implementation; preserve the existing GSAP structure while achieving this visual behavior.

---

# 14. Mobile

Do not break the existing mobile behavior.

The current mobile breakpoint switches the gallery to a vertical stack and gives panels a minimum height. fileciteturn0file1L125-L139

Keep the responsive behavior, but make sure:

- Images fill the available panel
- No black borders appear
- No gradient appears
- No unnecessary gaps appear
- No rounded corners appear unless specifically desired
- Gallery remains visually large enough

For mobile, a small gap of `2–4px` is acceptable.

---

# 15. Final Visual Target

The final gallery should look like a **large clean image accordion**, not a collection of framed cards.

### Current problem

```text
┌───────┐  ┌───────┐  ┌───────┐
│ DARK  │  │ DARK  │  │ DARK  │
│ IMAGE │  │ IMAGE │  │ IMAGE │
│▓▓▓▓▓▓▓│  │▓▓▓▓▓▓▓│  │▓▓▓▓▓▓▓│
│ BLACK │  │ BLACK │  │ BLACK │
└───────┘  └───────┘  └───────┘
```

### Desired

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  IMAGE  │       LARGE ACTIVE IMAGE       │  IMAGE  │ IMAGE │
│         │                                │          │       │
│         │                                │          │       │
│         │                                │          │       │
│         │                                │          │       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

The images should visually touch or have only a tiny separation.

There should be **no dark borders, no black side strips, no gradient overlay, and no unnecessary margins**.

---

# Acceptance Criteria

Before considering the update complete, verify all of the following:

- [ ] AccordionGallery is noticeably larger.
- [ ] Existing image content is preserved.
- [ ] Images are not distorted.
- [ ] Images fill their panels.
- [ ] No black vertical strips appear beside images.
- [ ] No dark gradient appears over the images.
- [ ] No inactive-image dimming occurs.
- [ ] No unnecessary panel shadows exist.
- [ ] No unnecessary rounded corners exist.
- [ ] Panel gap is 0–4px.
- [ ] Gallery uses the available width.
- [ ] Accordion hover/click behavior still works.
- [ ] Active panel still expands smoothly.
- [ ] Keyboard navigation still works.
- [ ] Mobile layout remains functional.
- [ ] No unrelated sections of the page are changed.

## Most important instruction

**Do not solve the black side borders by adding more background, borders, or decorative spacing. Fix the actual media sizing so each image fills its panel.**

The final result should be **bigger, cleaner, brighter, and much more immersive**.
