# Under the Hood — Demo Button & Full-Screen Demo Page

## Objective

Make three focused changes:

1. Add a **Demo** button near the top of the **03 — UNDER THE HOOD** section.
2. Reuse the **existing footer “NEXT CASE” button styling/component** instead of creating a new button design.
3. Remove only a **small amount of the unnecessary whitespace above the Under the Hood section**.
4. Clicking the Demo button should navigate to a **dedicated demo page** containing only a heading and a full-width demo video with music.

Do not redesign unrelated parts of the site.

---

# 1. Add the Demo Button

Place a **Demo** button near the top of the Under the Hood section.

The desired hierarchy should be:

```text
03 — UNDER THE HOOD

MAKE THE INTERFACE FEEL
SIMPLE. MAKE THE BACKEND DO
THE HARD PART.

[ DEMO ]

Supporting paragraph...

Large demo / gallery content...
```

The exact vertical position can be adjusted to fit the existing typography, but the button should clearly belong to this section.

---

# 2. Reuse the Existing Footer “NEXT CASE” Button

## Important

**Do NOT create a new button style from scratch.**

Find the existing footer button labeled:

> NEXT CASE

Reuse its existing:

- Component
- CSS class
- Typography
- Border
- Hover animation
- Arrow/icon treatment
- Spacing
- Transition
- Cursor behavior
- Responsive behavior

The new button should use the same visual language.

Only change the displayed label to:

> DEMO

If the existing button is implemented as a reusable component, import and reuse that component.

If it is implemented using a CSS class, reuse that class.

Do not duplicate its CSS unnecessarily.

### Example conceptual implementation

```tsx
<ExistingNextCaseButton>
  DEMO
</ExistingNextCaseButton>
```

or, if the project uses a shared button component:

```tsx
<SharedButton>
  DEMO
</SharedButton>
```

Use the project's actual existing implementation rather than introducing a hypothetical component.

---

# 3. Demo Button Navigation

Clicking the Demo button should navigate to a **separate dedicated page**.

Do not open:

- Modal
- Popup
- Overlay
- New browser tab

Use the site's existing routing/navigation approach.

For example, if the project uses React Router, use the existing router.

If the project uses Next.js routing, use the existing routing system.

Follow whatever routing convention the current project already uses.

Suggested route:

```text
/demo
```

or an equivalent route consistent with the project's existing page naming.

---

# 4. Dedicated Demo Page

The new demo page should be intentionally minimal.

It should contain:

```text
[small page label if needed]

DEMO

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                         VIDEO                                │
│                                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Do NOT add

- Cards
- Navigation-heavy UI
- Extra sections
- Technology descriptions
- Decorative gradients
- Unnecessary borders
- Hero illustrations
- Additional content blocks

The purpose of this page is simply to let the user experience the product demo.

---

# 5. Demo Page Heading

Use a large editorial heading.

Suggested heading:

> SKYGUIDE IN ACTION.

Keep it consistent with the existing site's typography.

The page should feel like a continuation of the existing portfolio/case-study design rather than a completely different website.

A small section label such as:

> DEMO

can appear above the heading if that fits the existing design system.

---

# 6. Full-Width Demo Video

The demo video should be the dominant element on the page.

Use the existing demo video asset from the project.

Do not introduce a different video.

The video should span essentially the full available viewport/content width.

Preferred structure:

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    SKYGUIDE IN ACTION.                       │
│                                                              │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │                     DEMO VIDEO                         │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Use:

```css
.demo-video {
  width: 100%;
  display: block;
}
```

Preserve the video's native aspect ratio.

Do NOT stretch or distort the video.

---

# 7. Video Playback

The demo should begin playing automatically when the user arrives on the demo page.

Recommended:

```html
<video
  autoplay
  playsinline
  controls
>
  <source src="..." type="video/mp4" />
</video>
```

However, browser autoplay policies generally require autoplaying video to be muted.

If music/audio is intended to play automatically, do not assume browsers will permit autoplay with sound.

Use the most appropriate implementation for the project's requirements.

Preferred behavior:

- Video starts automatically where browser policy allows.
- Video is full width.
- Video loops only if that makes sense for the demo.
- User can control playback.
- Audio/music is available.

---

# 8. Music / Audio

The demo page should have **music playing with the demo**.

Use the project's existing audio/music asset if one already exists.

Do not fabricate a new audio URL.

If an audio asset already exists in the project, connect it to the demo page.

### Important browser consideration

Autoplaying audio with sound is commonly blocked by browsers.

Therefore, implement a graceful solution.

Preferred behavior:

1. Attempt normal video/audio playback.
2. If autoplay with sound is blocked, show a minimal **“Play Demo” / sound enable** interaction.
3. Once the user interacts, start the video with audio/music.
4. Do not create a large intrusive modal.

If the demo video itself already contains the music track, simply use the video's audio track.

Do not add a second audio track on top of an existing music track.

---

# 9. Full-Width Means Full-Width

The video should not be constrained to the old image width.

Avoid something like:

```css
max-width: 880px;
```

unless that is required by the existing design system.

The demo should feel immersive.

Use the available viewport width.

For example:

```css
.demo-page {
  width: 100%;
}

.demo-video-wrapper {
  width: 100%;
}

.demo-video-wrapper video {
  width: 100%;
  height: auto;
  display: block;
}
```

If the design intentionally uses small horizontal page gutters, keep only those existing global gutters.

Do not add arbitrary margins.

---

# 10. Demo Page Background

Use the site's existing background color.

Do not introduce:

- Gradient backgrounds
- Dark overlays
- Decorative textures
- Unnecessary shadows

Keep the same clean visual language as the rest of the case study.

---

# 11. Remove the Unwanted Space Above “Under the Hood”

There is currently too much vertical whitespace between the preceding content and:

> 03 — UNDER THE HOOD

Reduce this gap **slightly**.

### Important

Do NOT completely eliminate the breathing room.

The section should still have visual separation from the previous section.

The goal is:

```text
BEFORE

Previous section
│
│
│
│
│
│
03 — UNDER THE HOOD
```

Change to:

```text
AFTER

Previous section
│
│
03 — UNDER THE HOOD
```

Only remove the unnecessary excess.

### Implementation

Find the actual spacing source in the existing layout:

- `margin-top`
- `padding-top`
- section gap
- spacer
- previous section bottom margin
- parent grid/flex gap

Reduce that value rather than adding negative-margin hacks.

For example, if the current spacing is:

```css
padding-top: 160px;
```

and the visual design only needs around 120px, reduce it appropriately.

Do not blindly use a negative margin such as:

```css
margin-top: -100px;
```

unless the existing layout architecture genuinely requires it.

---

# 12. Do Not Move the Entire Page

Only tighten the spacing immediately before the Under the Hood section.

Do not:

- Change the global page spacing
- Shift unrelated sections
- Change header positioning
- Move the navigation button
- Alter the previous section's layout unnecessarily

The change should be localized.

---

# 13. Final Under the Hood Layout

The section should approximately read:

```text
03 — UNDER THE HOOD

MAKE THE INTERFACE FEEL
SIMPLE. MAKE THE BACKEND DO
THE HARD PART.

[ DEMO ]

SkyGuide is deliberately split into clear responsibilities.
React handles the experience, Node.js handles the application
and real-time session layer, and FastAPI handles the
astronomy-heavy work...

[ LARGE ACCORDION / DEMO VISUAL ]

[ THREE TECHNOLOGY CARDS ]
```

The existing AccordionGallery/demo visual should remain below the section content unless the existing design requires otherwise.

Do not remove the existing technology cards.

---

# 14. Button Placement

The button should not disrupt the headline.

Preferred spacing:

```text
HEADING
       ↓
small/moderate gap
       ↓
DEMO BUTTON
       ↓
moderate gap
       ↓
BODY COPY
```

The button should feel like a clear call-to-action.

Do not make it oversized.

The **existing NEXT CASE styling** should determine its exact dimensions.

---

# 15. Responsive Behavior

## Desktop

The Demo button can sit naturally below the heading.

The demo page video should occupy the full available width.

## Tablet

Maintain the same hierarchy.

## Mobile

Keep:

```text
UNDER THE HOOD

HEADING

[ DEMO ]

TEXT

VIDEO
```

The button should remain easy to tap.

Do not introduce horizontal overflow.

The full-width video must remain proportional.

---

# 16. Do Not Change Existing Button Styling

This is especially important.

The instruction is:

> **USE PRE-EXISTING BUTTON AND STYLING FROM FOOTER (NEXT CASE BUTTON).**

Do not:

- Invent a new button design
- Add a new border style
- Add a new arrow style
- Add a gradient
- Add a new hover effect
- Add a new font
- Add a new radius
- Copy/paste a large amount of duplicate CSS

Reuse what is already there.

---

# 17. Acceptance Criteria

Before finishing, verify:

- [ ] A Demo button appears in the Under the Hood section.
- [ ] The Demo button uses the exact existing Footer “NEXT CASE” button styling/component.
- [ ] Only the button label/action differs.
- [ ] Clicking Demo navigates to a dedicated demo page.
- [ ] The demo page has a minimal large heading.
- [ ] The demo page contains the existing demo video.
- [ ] The video is essentially full width.
- [ ] The video keeps its original aspect ratio.
- [ ] The video is not distorted.
- [ ] Music/audio works with the demo.
- [ ] Autoplay behavior respects browser restrictions.
- [ ] There is a graceful user interaction if audio autoplay is blocked.
- [ ] No unnecessary modal/popup is introduced.
- [ ] Excess whitespace above Under the Hood is reduced slightly.
- [ ] The spacing reduction is localized to this section.
- [ ] No unrelated page sections are changed.
- [ ] Existing AccordionGallery remains functional.
- [ ] Existing technology cards remain intact.
- [ ] Mobile layout does not overflow.

## Final visual goal

The change should feel like a **small refinement to the existing case-study experience**, not a redesign.

The key visual idea is:

**Under the Hood → clear CTA → dedicated immersive demo experience.**
