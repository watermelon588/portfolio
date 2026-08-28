# Fix — Full-Height Production / Localhost Image Section

## Goal

Fix ONLY the image presentation in the section:

```jsx
11 — FROM LOCALHOST TO THE REAL SKY
```

The supplied image is a **tall portrait composition** and must be displayed **fully inside the image container without cropping**.

The current implementation uses:

```jsx
className="media-landscape"
```

which is inappropriate for this image.

The image must behave as a portrait/full-height visual.

---

# 1. Keep the Existing Text Section

Do not change:

```text
11 — FROM LOCALHOST TO THE REAL SKY
```

```text
Then I had to make it survive outside my laptop.
```

or the existing paragraph.

Do not rewrite the content.

Only fix the image/container presentation.

---

# 2. Make the Image Container Full Height

The image should become a **large, tall visual moment**.

Desired composition:

```text
11 — FROM LOCALHOST TO THE REAL SKY

Then I had to make it survive outside my laptop.

[ paragraph ]



┌───────────────────────────────┐
│                               │
│                               │
│         FULL IMAGE            │
│                               │
│      complete composition     │
│                               │
│                               │
│                               │
└───────────────────────────────┘
```

The visual should occupy most of the available vertical space.

Do not keep it as a short landscape banner.

---

# 3. IMPORTANT — Show the FULL PICTURE

The entire uploaded image must remain visible.

Do NOT crop:

```text
top
bottom
left
right
```

Do not remove the text/illustration/character at the edges of the image.

The source composition must remain intact.

---

# 4. Do NOT Use the Landscape Media Class

Remove:

```jsx
className="media-landscape"
```

for this image.

Use an appropriate portrait/full-image class instead.

For example:

```jsx
className="media-portrait-full"
```

or another semantically appropriate class already available in the project.

If no suitable class exists, create one specifically for this image treatment.

---

# 5. CSS — Full Image Without Cropping

Create a dedicated style for this portrait visual.

Recommended:

```css
.media-portrait-full {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  object-position: center;
}
```

The key requirement is:

```css
height: auto;
object-fit: contain;
```

Do NOT use:

```css
object-fit: cover;
```

because the objective is to preserve the complete source image.

---

# 6. Container

The image container should be sized around the image instead of forcing the image into a fixed landscape viewport.

Recommended:

```css
.dw-production-visual {
  width: 100%;
  max-width: 100%;
  margin-top: 3rem;
  overflow: hidden;
}
```

There should be no unnecessary outer background panel.

The image itself should be the visual.

Do not add:

```text
gray background
white card
shadow
border
rounded card
```

unless the existing portfolio design already requires those globally.

---

# 7. Full-Height Feel

The intended result is **full-height / portrait-dominant**, not necessarily a literally fixed `100vh` crop.

Prefer preserving the source ratio.

The image should naturally become tall because:

```text
width = large
height = natural aspect ratio
```

rather than:

```text
width = large
height = fixed
object-fit = cover
```

This distinction is important.

---

# 8. Desktop Composition

On desktop, make the image large enough to become a major visual event.

Desired:

```text
                  ┌─────────────────┐
                  │                 │
                  │                 │
                  │     IMAGE       │
                  │                 │
                  │                 │
                  │                 │
                  │                 │
                  └─────────────────┘
```

It should feel substantially taller than the surrounding text block.

Do not shrink the image unnecessarily just because it is portrait.

---

# 9. Alignment

Keep the image aligned with the existing case-study grid/container.

Do not randomly offset it.

The image can be centered or positioned according to the existing layout, but it must remain part of the same overall page grid.

---

# 10. Existing Reveal / Parallax

Keep the existing portfolio image interaction:

```text
curvy reveal
parallax
hover
scroll motion
```

Do not rebuild these.

Only change the media sizing and object-fit behavior.

The image should still participate in the site's established motion language.

---

# 11. Responsive Behavior

### Desktop

Use the image at a large portrait scale.

### Tablet

Scale down proportionally.

### Mobile

Use:

```css
width: 100%;
height: auto;
```

and keep the entire image visible.

Do not crop it to fit a short mobile banner.

---

# 12. Suggested JSX

Change the image portion from:

```jsx
<div className="dw-media-container" style={{ marginTop: "3rem" }}>
  <img
    src={visual15}
    alt="Earth Orbit Infrastructure View"
    className="media-landscape"
  />
</div>
```

to something conceptually like:

```jsx
<div className="dw-production-visual">
  <img
    src={visual15}
    alt="Earth Orbit Infrastructure View"
    className="media-portrait-full"
  />
</div>
```

The exact class naming can follow the project's existing conventions.

---

# 13. No Inline Styling

Do NOT use:

```jsx
style={{ ... }}
```

for this fix.

Put the required styling in the stylesheet.

The markup should remain clean.

---

# 14. Do Not Affect Other Sections

The new CSS must be **specific to this production visual**.

Do not globally change:

```css
.media-landscape
.dw-media-container
```

if those classes are used elsewhere.

Do not accidentally resize or change other case-study images.

Prefer dedicated selectors:

```css
.dw-production-visual
.media-portrait-full
```

---

# 15. Verification

Check the section at:

```text
1440px
1280px
1024px
768px
480px
375px
```

Verify:

- [ ] Full uploaded image remains visible.
- [ ] No top/bottom cropping.
- [ ] No left/right cropping.
- [ ] Image is tall and visually substantial.
- [ ] Image is not distorted.
- [ ] Image is not stretched.
- [ ] `media-landscape` is no longer used for this image.
- [ ] No unnecessary outer box is visible.
- [ ] Existing reveal remains intact.
- [ ] Existing parallax remains intact.
- [ ] Existing hover remains intact.
- [ ] No inline styling is used.
- [ ] Other sections are unaffected.
- [ ] Mobile does not overflow.

---

# Final Instruction

**Make this specific production image a large, full-height portrait visual and show the COMPLETE picture.**

Do not crop it.

Do not force it into the existing landscape viewport.

Do not use inline styles.

Create a dedicated CSS treatment for this one image/section so the rest of the website remains untouched.

The desired result is:

```text
small text

large vertical image
↓
complete source image visible
↓
strong visual presence
```

**Preserve the entire image. Increase its visual size and vertical presence. Do not change anything else.**
