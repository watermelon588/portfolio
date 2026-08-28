# Under the Hood — Final Visual Correction

## Read This as a Correction to the Previous Implementation

The current implementation is still visually different from the intended design.

There are **three specific problems** that must be fixed:

1. The grey background is not wrapping the correct amount of the Under the Hood section.
2. The AccordionGallery is cropping/zooming the source images so aggressively that important content — especially heads/objects near the top — is being chopped off.
3. The parallax effect that existed in the original AccordionGallery behavior has disappeared and needs to be restored.

Do **not** solve these by redesigning the component. Fix the implementation while preserving the original AccordionGallery interaction.

---

# 1. Correct Design Flow

The intended section is:

```text
┌───────────────────────────────────────────────────────────────┐
│                         LIGHT GREY                            │
│                                                               │
│  03 — UNDER THE HOOD                                         │
│                                                               │
│  MAKE THE INTERFACE FEEL                                      │
│  SIMPLE. MAKE THE BACKEND DO                                  │
│  THE HARD PART.                                               │
│                                                               │
│  [ DEMO ]                                                     │
│                                                               │
│  Supporting text...                                           │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                                                         │  │
│  │                  ACCORDION GALLERY                      │  │
│  │                                                         │  │
│  │       FULL IMAGE CONTENT — NO HEAD CHOPPING             │  │
│  │                                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                               │
│      ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│      │ EXPERIENCE   │ │ TRAFFIC      │ │ SCIENCE      │       │
│      │              │ │ CONTROLLER   │ │              │       │
│      └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

The **entire Under the Hood section**, from the section heading through the bottom of the three cards, should sit inside the light grey background.

---

# 2. Grey Background — Extend It Correctly

The grey background should continue:

- Behind the Under the Hood heading
- Behind the Demo button
- Behind the paragraph
- Behind the AccordionGallery
- Behind the three technology cards
- Until the bottom edge of the three cards

Then it should stop.

### Correct

```text
Previous section
       ↓
small gap

┌──────────────────────────────────────────┐
│                                          │
│       UNDER THE HOOD                     │
│       Heading                            │
│       Demo                               │
│       Text                               │
│                                          │
│       AccordionGallery                   │
│                                          │
│       Cards                              │
│                                          │
└──────────────────────────────────────────┘
       ↓
Next section / normal background
```

### Incorrect

```text
┌──────────────────────────────────────────┐
│ Under the Hood                           │
│ Gallery                                  │
└──────────────────────────────────────────┘

Cards on a different background ❌
```

or:

```text
┌──────────────────────────────────────────┐
│ Entire website / multiple sections grey  │
└──────────────────────────────────────────┘
```

Only the Under the Hood section gets the grey background.

---

# 3. Do Not Add Extra Grey Spacing

The grey background should not create a giant empty grey area above or below the actual content.

The section wrapper should contain the actual content and use sensible padding.

Do not fix the background extent by adding arbitrary giant padding.

Use the existing section spacing system.

---

# 4. Fix the Image Cropping — This Is the Main Problem

The current screenshots show that the AccordionGallery is **chopping off the top of the source images**.

For example, a source image containing:

```text
┌────────────────────┐
│       HEAD         │
│                    │
│       BODY         │
│                    │
│       OBJECT       │
│                    │
└────────────────────┘
```

is currently rendered more like:

```text
┌────────────────────┐
│   TOP CHOPPED ❌   │
│                    │
│       BODY         │
│                    │
│       OBJECT       │
└────────────────────┘
```

This is not acceptable.

The user explicitly wants:

> **FULL IMAGE**

If necessary, introduce a clean frame around the image so the complete image can be displayed.

---

# 5. Full Image Has Priority Over Filling Every Pixel

Do NOT force every source image to fill the panel if that means cropping important content.

The priority is:

1. Preserve the complete image.
2. Preserve aspect ratio.
3. Keep the image visually large.
4. Use a clean frame/background where necessary.
5. Only crop if the crop is extremely minor and clearly intentional.

Never crop a person's head or an important product/object simply to make the image fill the panel.

---

# 6. Use the Correct Image Fit

The current implementation uses:

```css
object-fit: cover;
```

This is causing the visual problem when the panel aspect ratio is much wider/narrower than the source image.

Do not blindly use `cover`.

For the images where the full frame must be visible, use:

```css
object-fit: contain;
```

with an intentional image frame.

For example:

```css
.ag-panel__media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
}
```

But do not simply switch everything to `contain` without checking the resulting composition.

---

# 7. If `contain` Creates Empty Space, Use a Frame

A frame is explicitly allowed and preferred over aggressive cropping.

Example:

```text
┌─────────────────────────────────┐
│                                 │
│       ┌──────────────────┐      │
│       │                  │      │
│       │    FULL IMAGE    │      │
│       │                  │      │
│       └──────────────────┘      │
│                                 │
└─────────────────────────────────┘
```

The frame can use:

- White
- Very light grey
- The section's neutral background

Do not use:

- Black borders
- Heavy shadows
- Gradients
- Decorative frames
- Thick outlines

The frame should be subtle.

---

# 8. Do Not Distort the Images

Never do this:

```css
width: 100%;
height: 100%;
```

without an appropriate `object-fit`.

That can distort the original proportions.

Always preserve the source aspect ratio.

---

# 9. Important: Do Not Destroy the Accordion's Media Architecture

The original AccordionGallery is not a normal image grid.

It uses:

- `flexGrow` to expand the active panel
- internal media positioning
- `xPercent`
- `yPercent`
- parallax shifts
- active/inactive state

The original implementation calculates a media size and then applies animated internal movement to the media. fileciteturn1file0L107-L145

The media sizing is also calculated from the gallery dimensions and `expandRatio`. fileciteturn1file0L179-L190

Do not remove this architecture just to make the images fit.

---

# 10. Restore the Parallax Effect

The parallax effect has disappeared.

Bring it back.

The original component calculates:

```tsx
const drift = Math.max(-1.5, Math.min(1.5, active - i));
const shift = drift * parallax * mediaSize * 0.06;
```

and applies the shift to the media:

```tsx
x: vertical ? 0 : isActive ? 0 : shift,
y: vertical ? (isActive ? 0 : shift) : 0,
```

This is the internal image movement that should return. fileciteturn1file0L132-L145

### Do not remove this behavior.

The desired interaction is:

```text
Panel expands
      ↓
Image subtly moves within its frame
      ↓
Panel collapses
      ↓
Image subtly moves back
```

It should feel like a **subtle parallax**, not a zoom animation.

---

# 11. Parallax Must NOT Cause Cropping

This is critical.

The previous implementation appears to have removed/changed parallax because it was causing image-position problems.

Do not solve the problem by deleting parallax.

Instead:

**separate image fitting from image movement.**

The image should first be correctly fitted so the important content is visible.

Then the parallax should apply a small internal translation.

---

# 12. Reduce Parallax Strength if Necessary

Restore the parallax but keep it subtle.

Recommended:

```tsx
parallax={0.2}
```

or:

```tsx
parallax={0.25}
```

Do not use a huge value.

The effect should be visible when the active panel changes but should not move the image enough to chop off important content.

---

# 13. Restore GSAP Media Positioning

The existing GSAP logic uses:

```tsx
xPercent: -50,
yPercent: -50
```

and then adds the parallax shift. fileciteturn1file0L136-L145

Keep this architecture.

Do not add a competing CSS:

```css
transform: translate(...)
```

because GSAP already controls the transform.

There should be one clear owner for the media transform.

**GSAP owns the animated transform.**

---

# 14. Do Not Use Scale Hacks

Absolutely do not fix the screenshot with:

```css
transform: scale(0.7);
```

or:

```css
transform: scale(0.8);
```

or:

```css
zoom: 0.8;
```

or arbitrary negative margins.

That only hides the underlying sizing problem.

---

# 15. Do Not Make the Source Image Smaller Than Necessary

The goal is NOT:

```text
tiny complete image floating inside huge panel
```

The goal is:

```text
large complete image
        +
preserved aspect ratio
        +
subtle frame if needed
        +
subtle parallax
```

The image should still feel visually dominant.

---

# 16. Active Panel

When a panel becomes active, it should become wider.

However:

**The image itself should not suddenly appear dramatically closer.**

Correct:

```text
INACTIVE

┌──────┐
│image │
│      │
└──────┘


ACTIVE

┌──────────────────────┐
│       same image     │
│       composition    │
│       slightly more  │
│       visible        │
└──────────────────────┘
```

Incorrect:

```text
INACTIVE

┌──────┐
│ image│
└──────┘


ACTIVE

┌──────────────────────┐
│ MASSIVELY ZOOMED ❌  │
│ HEAD CHOPPED         │
└──────────────────────┘
```

The accordion should change the panel's **available width**, not create a fake camera zoom.

---

# 17. Gallery Height

Keep the gallery large.

Recommended starting point:

```tsx
height={560}
```

or approximately:

```css
height: clamp(500px, 42vw, 620px);
```

But tune it visually.

Do not make the gallery taller simply to compensate for incorrect image cropping.

---

# 18. Gallery Width

Keep:

```css
width: 100%;
max-width: 100%;
```

The gallery should use the available section width.

Do not add unnecessary outer margins.

---

# 19. Remove the Black Borders

There should still be no unnecessary black framing.

Use:

```css
.ag-panel {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
}
```

If a frame is necessary to preserve the full image, make it subtle and neutral.

Example:

```css
.ag-panel__frame {
  background: #f3f3f3;
}
```

Do not use a black frame.

---

# 20. Remove the Dark Gradient

Keep the previous requirement:

```css
.ag-panel__overlay {
  display: none;
}
```

or otherwise completely disable its visual effect.

The images should not have:

- Dark gradient
- Black fade
- Dark inactive tint
- Blur effect

---

# 21. Keep Images in Full Color

Use:

```tsx
grayscale={false}
```

The active/inactive state should be communicated by accordion width and subtle movement, not by turning images grey.

---

# 22. Remove Excessive 3D Tilt

Use:

```tsx
tilt={0}
```

or at most:

```tsx
tilt={2}
```

Prefer `0` if the tilt causes gaps or makes the image framing look broken.

The important interaction is the accordion + parallax.

---

# 23. Panel Gaps

Keep the panel gap very small:

```tsx
gap={2}
```

or:

```tsx
gap={4}
```

Do not create large visible gutters.

---

# 24. Square / Clean Panels

Use:

```tsx
radius={0}
```

The gallery should look like a clean editorial image strip.

No rounded cards.

---

# 25. Recommended Configuration

Use something approximately like:

```tsx
<AccordionGallery
  items={items}
  defaultIndex={2}
  height={560}
  gap={3}
  radius={0}
  expandRatio={0.52}
  parallax={0.2}
  tilt={0}
  grayscale={false}
  trigger="hover"
  showLabels={true}
/>
```

These values are starting points.

Do not sacrifice image composition to exactly match these numbers.

---

# 26. Recommended Media Strategy

The implementation should conceptually separate these responsibilities:

### Panel

Controls:

- Width
- Accordion expansion
- Interaction
- Hover state

### Media

Controls:

- Correct image dimensions
- Aspect ratio
- Image positioning

### GSAP

Controls:

- Accordion animation
- Parallax translation
- Optional subtle movement

### Frame

Controls:

- Neutral background around the image when full-image preservation requires it

This separation prevents the current problem where resizing the accordion also causes the image to look massively zoomed.

---

# 27. Mobile

The same rule applies on mobile:

**Full image takes priority over aggressive cropping.**

The current component switches to a vertical layout under the mobile breakpoint. fileciteturn1file0L416-L430

Keep that behavior.

But ensure:

- Full image remains visible
- No head/object is chopped
- No distortion
- Parallax remains subtle
- No black borders
- No dark gradient
- No excessive zoom

---

# 28. Final Visual Result

The gallery should ultimately look closer to:

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   image        image             ACTIVE IMAGE          image    │
│                                                                 │
│   complete     complete          complete              complete │
│   composition  composition       composition            image   │
│                                                                 │
│      ← subtle internal parallax movement →                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Not:

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     GIANT CROPPED IMAGE                                        │
│     HEAD MISSING                                               │
│                                                                 │
│  BLACK STRIP │ BLACK STRIP │ BLACK STRIP │ BLACK STRIP         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 29. Final Acceptance Criteria

### Grey section

- [ ] Only Under the Hood has the grey background.
- [ ] Grey starts before the Under the Hood heading.
- [ ] Grey continues behind the entire gallery.
- [ ] Grey continues behind all three technology cards.
- [ ] Grey ends immediately after the section/cards.
- [ ] No giant empty grey padding is introduced.

### Images

- [ ] Full source image is visible wherever possible.
- [ ] No heads are chopped.
- [ ] No important objects are cropped.
- [ ] Images preserve their original aspect ratio.
- [ ] No stretching/distortion.
- [ ] No unnecessary zoom.
- [ ] A subtle neutral frame is allowed if required to preserve the full image.

### Accordion

- [ ] Active panel expands.
- [ ] Inactive panels collapse.
- [ ] Hover interaction remains.
- [ ] Click/focus behavior remains.
- [ ] Keyboard navigation remains.

### Parallax

- [ ] Parallax is restored.
- [ ] Image moves subtly inside the panel.
- [ ] Parallax does not create aggressive zoom.
- [ ] Parallax does not chop heads or important objects.
- [ ] GSAP remains the owner of the animated transform.

### Styling

- [ ] No dark gradient.
- [ ] No dark blur/tint.
- [ ] No black side borders.
- [ ] No heavy shadows.
- [ ] No unnecessary rounded corners.
- [ ] No large panel gaps.
- [ ] Images remain in full color.
- [ ] Tilt is removed or extremely subtle.

### Most important

> **DO NOT MAKE THE IMAGES BIGGER TO MAKE THE GALLERY BIGGER.**

The gallery can be physically large while the images retain their natural composition.

The desired combination is:

**Large gallery + full images + preserved aspect ratio + subtle parallax + clean grey section.**
