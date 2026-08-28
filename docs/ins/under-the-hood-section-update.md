# Section Update Instructions — Under the Hood

## Goal

Update the **“03 — UNDER THE HOOD”** section to replace the current image + text two-column layout with a single-column content flow containing:

1. Section heading
2. Supporting paragraph/text
3. Large demo video
4. Three technology/info cards overlapping the lower portion of the video

The existing image should be completely removed.

---

## Current Layout

The section currently has:

- Large heading at the top
- A two-column area:
  - Left: product/interface image
  - Right: explanatory paragraph
- Three cards below:
  - **THE EXPERIENCE — React 19 & Vite**
  - **THE TRAFFIC CONTROLLER — Node.js & Express 5**
  - **THE SCIENCE — FastAPI & Astropy**

### Remove

- Remove the existing product/interface image entirely.
- Do not leave an empty image container or reserved image space.
- Remove the old two-column image/text arrangement.

---

# New Layout

The section should become a **single-column vertical composition**.

### Order

```text
03 — UNDER THE HOOD

MAKE THE INTERFACE FEEL
SIMPLE. MAKE THE BACKEND DO
THE HARD PART.

SkyGuide is deliberately split into clear responsibilities...
[large demo video]

        ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
        │ EXPERIENCE  │ │  TRAFFIC    │ │  SCIENCE    │
        │             │ │ CONTROLLER   │ │             │
        └─────────────┘ └─────────────┘ └─────────────┘
```

The three cards should visually overlap the bottom part of the video.

---

## 1. Heading

Keep the existing section label:

**03 — UNDER THE HOOD**

Keep the existing large headline:

> MAKE THE INTERFACE FEEL  
> SIMPLE. MAKE THE BACKEND DO  
> THE HARD PART.

The typography, spacing, font family, weight, and overall visual character should remain consistent with the existing design.

The heading should remain near the top of the section.

---

## 2. Body Text

Move the existing explanatory text directly below the heading.

Current text:

> SkyGuide is deliberately split into clear responsibilities. React handles the experience, Node.js handles the application and real-time session layer, and FastAPI handles the astronomy-heavy work. The result is a product that feels calm on the surface while the system underneath is doing coordinate transforms, ephemeris calculations and state synchronization.

Use this as the supporting paragraph.

### Requirements

- Keep the text content unchanged unless necessary for responsive layout.
- Do not keep it in a separate right-hand column.
- It should belong to the same main content column as the video.
- Limit the paragraph width so it remains readable rather than becoming one extremely long line.
- Preserve the minimalist typography of the current page.

---

# 3. Large Demo Video

Replace the existing image with the demo video.

The video should be **large and visually dominant**.

### Layout

The video should sit directly below the explanatory text.

Recommended structure:

```html
<section>
  <div class="section-heading">...</div>

  <div class="section-copy">
    ...
  </div>

  <div class="demo-video-wrapper">
    <video ...>
      ...
    </video>
  </div>

  <div class="tech-cards">
    ...
  </div>
</section>
```

### Video sizing

Use a wide, large presentation.

The supplied video is **4:3**, so preserve its aspect ratio.

Do NOT stretch it to 16:9.

Recommended:

```css
.demo-video-wrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.demo-video-wrapper video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
```

If preserving the entire frame is more important than filling the container, use:

```css
object-fit: contain;
```

The preferred visual result is a large, clean video occupying most of the section width.

---

# 4. Cards Overlapping the Video

The existing three cards remain, but their position must change.

They should be positioned so that their **top edge enters the bottom portion of the video**.

In other words:

- Video extends downward.
- The three cards are placed on top of the video.
- The top portion of each card covers the lower portion of the video.
- The cards continue downward into the normal page background.

Conceptually:

```text
┌──────────────────────────────────────────────┐
│                                              │
│                 DEMO VIDEO                   │
│                                              │
│                                              │
│                                              │
│       ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│       │         │ │         │ │         │    │
└───────│  CARD   │─│  CARD   │─│  CARD   │────┘
        │         │ │         │ │         │
        │         │ │         │ │         │
        └─────────┘ └─────────┘ └─────────┘
```

### Important

The cards must **not simply sit below the video**.

They must visibly overlap the video.

---

## Card Positioning

Use a relative wrapper around the video/cards area.

Example approach:

```css
.demo-video-section {
  position: relative;
}

.tech-cards {
  position: relative;
  z-index: 2;
  margin-top: -80px;
}
```

The exact overlap amount should be adjusted visually.

Start around:

```css
margin-top: -80px;
```

and tune according to the viewport.

The cards should have enough overlap to make the layered composition obvious without hiding too much of the demo.

---

# 5. Three Existing Cards

Keep the existing three cards and their content.

### Card 1

**THE EXPERIENCE**

# React 19 & Vite

> The part humans actually touch: dashboard, Tonight, sky maps, target discovery, community surfaces, and a lightweight companion for the telescope-mounted phone.

**Deployed on Vercel**

---

### Card 2

**THE TRAFFIC CONTROLLER**

# Node.js & Express 5

> Authentication, telescope state, business logic, Socket.IO pairing rooms, and real-time packet routing. Basically: the service that keeps everyone from shouting at the telescope at once.

**Deployed on Render**

---

### Card 3

**THE SCIENCE**

# FastAPI & Astropy

> Ephemeris generation, coordinate transformations, visibility, lunar context, and recommendation inputs. The boring-looking service doing the decidedly non-boring math.

**Deployed on Render**

---

# 6. Card Styling

Keep the existing card visual language.

Cards should remain:

- White background
- Thin/light border
- Minimal styling
- Square or very slightly rounded corners according to the existing design
- Generous internal padding
- Blue uppercase eyebrow text
- Large black title
- Muted gray body text
- Muted deployment text

Do not introduce gradients, glassmorphism, heavy shadows, or unnecessary decoration.

The cards should feel like they belong to the current page.

---

# 7. Desktop Layout

On desktop:

```text
                  SECTION LABEL

             LARGE HEADING
             LARGE HEADING
             LARGE HEADING

              SUPPORTING TEXT


       ┌───────────────────────────────┐
       │                               │
       │                               │
       │          DEMO VIDEO           │
       │                               │
       │                               │
       │                               │
       └───────────────────────────────┘
             ┌────────┐ ┌────────┐ ┌────────┐
             │ CARD 1 │ │ CARD 2 │ │ CARD 3 │
             │        │ │        │ │        │
             └────────┘ └────────┘ └────────┘
```

The main content should be centered within the existing page max-width.

The video should be substantially wider than the old image.

---

# 8. Responsive Behavior

### Desktop

Use three cards in one row.

```css
grid-template-columns: repeat(3, 1fr);
```

### Tablet

Still prefer three cards if there is enough horizontal space. Otherwise move to two columns.

### Mobile

Stack the cards vertically.

```css
grid-template-columns: 1fr;
```

The overlap should be reduced on smaller screens.

For example:

```css
@media (max-width: 768px) {
  .tech-cards {
    margin-top: -40px;
  }
}
```

The video must remain proportional and must never be horizontally stretched.

---

# 9. Spacing

The new visual hierarchy should feel intentional:

```text
Section label
      ↓
Large gap
      ↓
Heading
      ↓
Moderate gap
      ↓
Supporting paragraph
      ↓
Large gap
      ↓
Demo video
      ↓
Cards overlap video
```

Do not leave the large empty horizontal space that existed because of the old two-column layout.

The section should now feel like one continuous composition.

---

# 10. Layering / Z-index

The video should sit behind the cards.

Recommended:

```css
.demo-video-wrapper {
  position: relative;
  z-index: 1;
}

.tech-cards {
  position: relative;
  z-index: 2;
}
```

Cards must have a solid background so the video does not visually show through them.

---

# 11. Video Behavior

Recommended attributes:

```html
<video
  autoplay
  muted
  loop
  playsinline
>
  <source src="..." type="video/mp4" />
</video>
```

The video should autoplay silently and loop continuously if this matches the existing site's behavior.

Do not add video controls unless explicitly required.

---

# 12. Preserve Existing Design

Do not redesign the rest of the page.

Only modify this section.

Preserve:

- Existing typography
- Existing colors
- Existing navigation/menu button
- Existing page background
- Existing card styling
- Existing section label
- Existing headline styling
- Existing overall max-width
- Existing responsive conventions

The key change is the **composition**:

### BEFORE

```text
Heading

Image       Text

Card   Card   Card
```

### AFTER

```text
Heading

Text

Large Demo Video
       ↓
Card   Card   Card
(overlapping video)
```

The result should feel more editorial, immersive, and intentional, with the demo video becoming the primary visual element of the section.
