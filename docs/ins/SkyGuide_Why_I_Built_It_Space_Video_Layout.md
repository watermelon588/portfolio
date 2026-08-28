# Fix — Replace Problem Section with Full-Width 4:3 Space Video

## Goal

Replace the current two-image block in `02 — WHY I BUILT IT` with **one giant 4:3 space video**.

The section should become a cinematic moment rather than another image grid.

## Required Structure

Keep:

```text
02 — WHY I BUILT IT

THE SKY HAS 13,000+ THINGS TO SHOW YOU.
GOOD LUCK PICKING ONE.
```

Then:

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│                         SPACE VIDEO                           │
│                                                               │
│              centered white explanatory text                 │
│                                                               │
│                   moving stars / space                       │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 1. Remove the Current Two-Image Grid

Remove the current:

```jsx
<div className="dw-media-grid-2col">
  ...
</div>
```

including:

```text
visual1
visual2
```

from this section.

Do not show the two static images here anymore.

---

## 2. One Giant 4:3 Video

Use a single video with a true 4:3 visual composition.

Conceptually:

```css
.dw-problem-video {
  width: 100%;
  aspect-ratio: 4 / 3;
  position: relative;
  overflow: hidden;
  display: block;
}
```

The video should be visually large and should use the **full available width** of the section/screen.

If the project already has a full-bleed media utility, reuse it.

Do not introduce a new media framework.

---

## 3. Do NOT Crop the Video

The video must show the full frame.

Do not blindly use:

```css
object-fit: cover;
```

if it crops the source.

Prefer:

```css
video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

when the source is already 4:3.

If the source is exactly 4:3, preserving the full frame is the priority.

**Do not crop stars or important celestial imagery just to fill a container.**

---

## 4. No Outer Box

There must be no visible box surrounding the video.

Do NOT add:

```css
background: var(--surface-gray);
border: 1px solid ...;
box-shadow: ...;
padding: ...;
```

The video itself is the visual boundary.

Bad:

```text
┌─────────────────────────────────────────────┐
│ outer background / gray box                 │
│                                             │
│       ┌─────────────────────────┐           │
│       │         VIDEO           │           │
│       └─────────────────────────┘           │
│                                             │
└─────────────────────────────────────────────┘
```

Good:

```text
┌─────────────────────────────────────────────┐
│                                             │
│                VIDEO                        │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 5. Full-Width Visual

The normal heading/content container can stay aligned to the site's grid.

The video should be able to break out into a **full-bleed visual**.

Desired relationship:

```text
normal content width
        ↓
02 — WHY I BUILT IT

THE SKY HAS 13,000+ THINGS...
        ↓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                     VIDEO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Use the site's existing full-width/full-bleed mechanism if available.

Do not introduce arbitrary viewport hacks.

---

## 6. Move the Existing Explanation Onto the Video

The existing paragraph should NOT remain below the heading as a normal paragraph.

Use this exact content:

```text
Astronomy gives you an impossible menu: thousands of objects, constantly moving,
changing with your location, your telescope, the Moon, the weather, and the time.
I built SkyGuide AI to turn that chaos into a simple answer — what is actually worth
looking at tonight, and where should the telescope point?
```

Place it **inside the video**.

---

## 7. Text Position

The paragraph must be:

```text
centered horizontally
centered vertically
positioned relative to the video
```

Conceptually:

```css
.dw-problem-video-wrap {
  position: relative;
}

.dw-problem-video-copy {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

An equivalent flex/grid centering implementation is also fine.

Do NOT use fixed page coordinates such as:

```text
top: 320px;
left: 700px;
```

The text must stay attached to the video during resize and scroll.

---

## 8. White Typography

The paragraph on the video should be:

```text
white
regular/medium weight
center aligned
readable
```

Use the existing portfolio typography system.

Do not introduce a new font.

Do not introduce a new type scale.

Keep the paragraph relatively narrow:

```css
max-width: 720px;
text-align: center;
```

or use the existing content-width token.

---

## 9. No Text Card

Do not put the paragraph inside:

```text
card
pill
glass panel
solid box
rounded rectangle
```

The intended visual is:

```text
SPACE
    +
WHITE TYPE
```

not:

```text
SPACE
    +
TEXT CARD
```

If readability needs help, use only a very subtle existing treatment. Do not invent a large overlay.

---

## 10. Video Mood

The video should feel:

```text
slow
atmospheric
deep
quiet
cinematic
vast
```

Ideal content:

```text
moving stars
deep-space travel
nebula motion
slow celestial movement
star field
```

Avoid:

```text
fast sci-fi UI
explosions
gaming effects
rapid cuts
bright flashy particles
```

The visual should communicate:

> **The universe is moving.**

---

## 11. Autoplay

Use background-style playback:

```jsx
<video
  autoPlay
  muted
  loop
  playsInline
  ...
/>
```

No automatic audio.

Reuse the site's existing video component if one exists.

---

## 12. Existing Reveal / Parallax

The video should use the same subtle visual motion language as the existing portfolio.

Reuse the existing:

```text
reveal
parallax
scroll animation
easing
```

where available.

Desired feeling:

```text
scroll into section
↓
video reveals
↓
small/subtle movement
↓
settles
```

Do not create a new aggressive animation.

Do not combine excessive zoom with parallax.

---

## 13. Heading + Video Hierarchy

The section should read visually as:

```text
02 — WHY I BUILT IT

THE SKY HAS 13,000+ THINGS TO SHOW YOU.
GOOD LUCK PICKING ONE.


┌──────────────────────────────────────────────────────┐
│                                                      │
│                  MOVING SPACE                       │
│                                                      │
│      Astronomy gives you an impossible menu...      │
│                                                      │
│                     STARS                            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

The heading introduces the problem.

The video creates the emotional scale.

The centered white paragraph explains why the product exists.

---

## 14. Spacing

Keep generous spacing between:

```text
kicker
↓
heading
↓
video
```

Use the existing spacing system.

Do not manually invent a new spacing scale.

The video itself should provide a major visual pause.

---

## 15. Responsive Behavior

### Desktop

```text
4:3
full-width
large cinematic visual
centered text
```

### Tablet

```text
4:3
full available width
same centered composition
```

### Mobile

Maintain the 4:3 relationship unless the existing design system provides a better equivalent.

Reduce text size through existing responsive typography.

The text may wrap to 3–5 lines.

Do not squash the video into a tiny banner.

---

## 16. Suggested JSX

Conceptually:

```jsx
<section className="dw-section container">
  <span className="dw-kicker">
    02 — WHY I BUILT IT
  </span>

  <h2 className="dw-heading-lg">
    THE SKY HAS 13,000+ THINGS TO SHOW YOU. GOOD LUCK PICKING ONE.
  </h2>

  <div className="dw-problem-video-wrap">
    <video
      className="dw-problem-video"
      autoPlay
      muted
      loop
      playsInline
      src={spaceVideo}
      poster={spacePoster}
    />

    <div className="dw-problem-video-copy">
      Astronomy gives you an impossible menu: thousands of objects,
      constantly moving, changing with your location, your telescope,
      the Moon, the weather, and the time. I built SkyGuide AI to turn
      that chaos into a simple answer — what is actually worth looking
      at tonight, and where should the telescope point?
    </div>
  </div>
</section>
```

This is conceptual.

Use the existing site's media/full-bleed/video primitives where available.

---

## 17. If a Space Video Asset Does Not Exist

The implementation should be ready to accept a dedicated video asset later.

Use:

```text
spaceVideo
spacePoster
```

or the project's established asset naming approach.

Do not replace the design with a random static image just to complete the section.

Do not create unnecessary hard-coded paths.

---

## 18. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

```text
disable autoplay if appropriate
disable parallax
show poster/static frame
keep text visible
```

The section must remain understandable without motion.

---

## 19. Do Not Touch Other Sections

This instruction applies ONLY to:

```text
04 — PROBLEM STATEMENT
02 — WHY I BUILT IT
```

Do not modify:

```text
architecture
astronomy intelligence
recommendations
alignment
mobile
community
engineering
closing
footer
```

---

## 20. Verification Checklist

- [ ] Two static images are removed.
- [ ] One giant 4:3 space video replaces them.
- [ ] Video uses the full available visual width.
- [ ] Full source frame remains visible.
- [ ] No accidental crop.
- [ ] No outer gray/white box.
- [ ] No card surrounds the video.
- [ ] Existing heading remains unchanged.
- [ ] Existing kicker remains unchanged.
- [ ] Existing paragraph content is preserved.
- [ ] Paragraph is now inside the video.
- [ ] Paragraph is white.
- [ ] Paragraph is centered horizontally.
- [ ] Paragraph is centered vertically.
- [ ] Video is muted/autoplay/loop/playsInline.
- [ ] Existing reveal/parallax is reused.
- [ ] No new animation system is introduced.
- [ ] Mobile remains usable.
- [ ] Reduced motion is respected.
- [ ] No other case-study sections are changed.

---

# Final Instruction

**Turn the `02 — WHY I BUILT IT` section into a cinematic space moment.**

Keep the current heading.

Remove the two static images.

Add **one giant full-width 4:3 video of moving space/stars**.

Keep the complete video frame visible.

Put the existing explanatory paragraph **directly over the center of the video in white**.

Do not add an outer image box.

Use the existing portfolio's reveal/parallax language.

The final feeling should be:

> **The universe is enormous, constantly moving, and full of possibilities. That is exactly the problem SkyGuide was built to make simpler.**
