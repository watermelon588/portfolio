# About Page — Section 2 Layout Fix

## Goal

Modify the dedicated `/about` page to match the supplied visual direction.

Keep the existing design system, Satoshi font, colors, Navbar, Footer, typography tokens, motion system, magnetic effects, and existing components.

---

## 1. Section 02 — Currently

Keep the existing content:

- **BUILDING** — AI-native visions, scalable backends & robust software products
- **EXPLORING** — Agentic AI systems · LangGraph · LLM engineering & interactive experiences
- **LEARNING** — High-performance distributed systems & web performance

Change only the presentation.

Remove the current table/list treatment and all row borders.

Do not use:
- horizontal divider lines between rows
- cards
- boxes
- unnecessary separators

Use generous editorial spacing instead.

---

## 2. Image + Text Layout

Section 02 must become a **two-column editorial layout**:

```text
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  PERSONAL IMAGE          02 — CURRENTLY                  │
│  PERSONAL IMAGE                                          │
│  PERSONAL IMAGE          BUILDING                        │
│  PERSONAL IMAGE          AI-native visions...            │
│  PERSONAL IMAGE                                          │
│                          EXPLORING                       │
│                          Agentic AI systems...            │
│                                                          │
│                          LEARNING                        │
│                          High-performance...             │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Image = LEFT. Content = RIGHT.**

Use the provided personal image as an editorial image.

No:
- border radius
- border
- shadow
- card background
- forced crop

Preserve the image's natural aspect ratio:

```css
width: 100%;
height: auto;
aspect-ratio: auto;
object-fit: contain;
```

Do NOT use:

```css
aspect-ratio: 4 / 3;
object-fit: cover;
```

The image should fill its grid column without being artificially restricted to 70%.

---

## 3. Grid

Use a responsive two-column grid on desktop:

```css
.aboutpage-currently-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(3rem, 8vw, 9rem);
  align-items: start;
}
```

Use existing project spacing tokens if available.

On mobile, switch to a vertical layout:

```text
02 — CURRENTLY

PERSONAL IMAGE

BUILDING
...

EXPLORING
...

LEARNING
...
```

The image must remain uncropped.

---

## 4. Spacing

The current page feels too segmented.

Create a much clearer editorial rhythm:

```text
Hero
   ↓
large whitespace

About content
   ↓
large whitespace

02 — CURRENTLY
   ↓
content

   ↓
large whitespace

SEE ALL WORKS
   ↓
Footer
```

Use fluid spacing with existing tokens / `clamp()`.

Do not add random fixed margins to individual elements.

---

## 5. Remove Divider Between Hero and Section 02

Remove the full-width horizontal line currently appearing before:

```text
02 — CURRENTLY
```

The transition between the sections should be created entirely through whitespace.

**No divider here.**

---

## 6. Remove Currently Row Dividers

Remove all:

```css
border-bottom: 1px solid var(--border);
```

from the Building / Exploring / Learning rows.

Use vertical spacing only.

---

## 7. Remove Elsewhere

Delete the entire:

```text
03 — ELSEWHERE

GitHub
LinkedIn
X
Instagram
Email
```

The Footer already handles social/contact navigation.

Do not replace it with another social section.

---

## 8. CTA

After Section 02, reuse the existing circular `About me` button.

Do NOT create a new button.

Keep all existing:
- magnetic behavior
- elastic behavior
- circular geometry
- hover/blob animation
- typography
- responsive behavior

Only change:

```text
ABOUT ME
```

to:

```text
SEE ALL WORKS
```

and link it to:

```text
/work
```

---

## 9. Final Structure

```text
NAVBAR


HERO

large editorial statement

hero divider
                              🔵 blue globe


ABOUT CONTENT

personal introduction


                large whitespace


02 — CURRENTLY

┌──────────────────────┬─────────────────────────────┐
│                      │ 02 — CURRENTLY              │
│                      │                             │
│   PERSONAL IMAGE     │ BUILDING                    │
│                      │ AI-native visions...        │
│                      │                             │
│                      │ EXPLORING                   │
│                      │ Agentic AI systems...       │
│                      │                             │
│                      │ LEARNING                    │
│                      │ High-performance...         │
└──────────────────────┴─────────────────────────────┘


                large whitespace


                 ◯
            SEE ALL WORKS


FOOTER
```

The **hero divider + blue globe remain**. All other dividers are removed.

---

## 10. Cleanup

Remove obsolete CSS/classes related to:

- `aboutpage-divider`
- Currently row borders
- `aboutpage-elsewhere-links`
- `aboutpage-social-link`
- Elsewhere-specific layout

Only remove them if they are no longer used elsewhere.

Do not break shared components.

---

## Absolute Requirements

- Section 02 image = LEFT.
- Section 02 content = RIGHT.
- Preserve the image's natural aspect ratio.
- No image cropping.
- No `aspect-ratio: 4 / 3`.
- No `object-fit: cover`.
- No divider between Hero and Section 02.
- No divider between Currently rows.
- Remove Elsewhere completely.
- Keep Section 02 content.
- Use generous editorial spacing.
- Reuse the existing circular button.
- Change button label to `SEE ALL WORKS`.
- Link button to `/work`.
- Keep existing magnetic/elastic/hover effects.
- Keep existing design system.
- No new dependencies.
- No new visual language.
- Keep the page minimal and editorial.
