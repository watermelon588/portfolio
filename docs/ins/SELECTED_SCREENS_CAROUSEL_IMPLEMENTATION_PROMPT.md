# Implementation Prompt — Selected Screens Continuous Carousel

## Objective

Build a **new, isolated React component** for the Home page called `SelectedScreens` (or `SelectedScreensCarousel`) that reproduces the interaction language of the provided reference recording/screenshot:

- A large editorial-style section heading.
- A **continuous horizontal image carousel / filmstrip**.
- One image is visually dominant in the center.
- Neighboring images remain visible on both sides at smaller scales.
- Images continuously move, scale, and change prominence as the user drags/scrolls.
- The carousel should feel physical and cinematic rather than like a conventional paginated slider.
- **Images must preserve their original aspect ratios.**
- **Images must never be cropped.**
- **Border radius must be exactly `0px` everywhere in this component.**
- The component must be implemented separately so it can be removed safely later.
- Keep the existing `Gallery` component untouched and continue rendering it.
- Add the new component to `Home.tsx` in addition to the existing gallery.

The implementation must respect the existing project architecture and design system described below.

---

# 1. Existing Home Structure

Current `Home.tsx`:

```tsx
export function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Gallery />
        <Footer />
      </main>
    </>
  );
}
```

Do **not** remove, replace, rename, or modify the existing `Gallery`.

Create the new component independently and render it separately.

Preferred initial placement:

```tsx
export function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Gallery />
        <SelectedScreens />
        <Footer />
      </main>
    </>
  );
}
```

If the project's existing section ordering strongly suggests a better position, keep the new component between `Gallery` and `Footer` unless there is a concrete reason not to.

The important requirement is:

> **Existing Gallery remains intact. New SelectedScreens component is additive.**

This allows the new component to be removed later with a single import/render removal without affecting the old gallery.

---

# 2. Component Isolation

Build this as a standalone reusable component.

Suggested structure:

```text
SelectedScreens/
├── SelectedScreens.tsx
├── SelectedScreensTrack.tsx
├── SelectedScreenItem.tsx
├── SelectedScreensControls.tsx
├── selectedScreens.types.ts
└── useSelectedScreensCarousel.ts
```

The exact folder location should follow the existing project's component conventions.

Do not introduce a new architectural pattern if the repository already has an established component structure.

The component must be self-contained enough that removing:

```tsx
<SelectedScreens />
```

and its import completely removes the feature.

Do not couple the carousel to:

- `Gallery`
- `Work`
- `Hero`
- `Navbar`
- route state
- backend state
- global application state

unless an existing project abstraction genuinely requires it.

---

# 3. Design-System Compliance

Use the existing project's design tokens.

The approved light-world palette is:

```css
--bg: #F6F6F6;
--surface: #FFFFFF;
--ink: #000000;
--ink-2: #9D9D9C;
--accent: #0049CD;
--accent-deep: #003AA3;
--surface-gray: #DADADA;
--border: rgba(0, 0, 0, 0.14);
--border-solid: #DADADA;
```

Do not introduce arbitrary new colors.

Use the project's existing CSS variables/token system instead of hardcoding hex values inside the component.

The design system specifies:

- Satoshi as the primary typeface.
- Fluid sizing using `clamp()`.
- Large whitespace.
- Minimal hairline structure.
- Restrained blue accent usage.
- No unnecessary shadows or decorative surfaces.
- Motion should have a purpose.
- Components should remain asset-driven.

Follow those rules.

---

# 4. Mandatory Border-Radius Rule

This component must have:

```css
border-radius: 0;
```

everywhere.

This is a hard requirement.

Do not use:

```text
rounded
rounded-md
rounded-lg
rounded-xl
rounded-full
border-radius: var(...)
```

for any part of this component.

No rounded:

- image containers
- image elements
- cards
- controls
- overlays
- labels
- progress indicators
- wrappers

The visual language of this component should be sharp, editorial, and rectangular.

---

# 5. Section Visual Structure

The section should resemble the supplied reference.

Conceptually:

```text
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  SELECTED SCREENS                           74 SCREENS · 4 PROJECTS
│                                                                  │
│  A closer look.                                                 │
│                                                                  │
│                                                                  │
│      ┌────────┐     ┌──────────────────────┐     ┌────────┐      │
│      │        │     │                      │     │        │      │
│      │ side   │     │                      │     │ side   │      │
│      │ image  │     │       ACTIVE         │     │ image  │      │
│      │        │     │       IMAGE          │     │        │      │
│      │        │     │                      │     │        │      │
│      └────────┘     └──────────────────────┘     └────────┘      │
│                                                                  │
│                              12 / 74                              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

Do not copy the reference site's exact content, imagery, text, or implementation.

Use the reference only as interaction and composition inspiration.

---

# 6. Heading

Use a small metadata label above the heading:

```text
SELECTED SCREENS
```

Style it according to the existing label system:

- uppercase
- small
- tracked
- secondary gray
- restrained opacity
- Satoshi

Main heading:

```text
A closer look.
```

Use the project's typography scale and fluid sizing.

The word `look` may use the project's blue accent:

```text
#0049CD
```

but do not overuse blue elsewhere in the section.

Do not add unnecessary decorative graphics.

---

# 7. Optional Metadata

The reference contains metadata similar to:

```text
74 SCREENS · 4 PROJECTS
```

Implement this only if the actual project data can provide meaningful values.

Do not hardcode fake project counts if real data is already available elsewhere in the repository.

If there is no appropriate source of truth yet, use a graceful prop/data-driven placeholder or omit the count rather than inventing data.

The component should support:

```ts
type SelectedScreen = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  projectId?: string;
  projectName?: string;
  title?: string;
};
```

Adapt this to the project's actual asset/data types if they already exist.

---

# 8. Core Carousel Requirement

The carousel must be **continuous**.

Do not implement it as a simple:

```tsx
activeIndex
setActiveIndex(index + 1)
```

carousel where the whole track simply snaps from one slide to another.

Instead, maintain a continuous carousel position.

Conceptually:

```ts
carouselPosition = 7.42;
```

means the user is 42% of the way between item 7 and item 8.

Every item derives its visual state from its continuous distance from the current carousel position.

For an item:

```ts
distance = itemIndex - carouselPosition;
```

Then derive:

- x position
- scale
- opacity
- z-index
- possibly subtle brightness/contrast

from that distance.

This is the key to reproducing the reference interaction.

---

# 9. Continuous Position Model

Prefer a model similar to:

```text
item       distance
--------------------
previous   -2.0
previous   -1.0
active      0.0
next        1.0
next        2.0
```

But during dragging:

```text
carouselPosition = 4.35
```

then:

```text
item 4 → -0.35
item 5 →  0.65
item 6 →  1.65
```

All visual properties should update continuously.

Do not wait for the active index to change before updating visuals.

The `activeIndex` can be derived as:

```ts
Math.round(carouselPosition)
```

when needed for metadata/accessibility.

---

# 10. Infinite Carousel

The carousel should feel infinite.

Do not expose:

```text
1 → 2 → 3 → ... → 74 → END
```

Instead:

```text
... → 72 → 73 → 74 → 1 → 2 → 3 → ...
```

The user should be able to continue moving indefinitely.

Because the image collection may contain many screens, avoid rendering unnecessary duplicated DOM nodes.

Prefer a virtual/recycled track or a lightweight circular indexing strategy.

The implementation should not create hundreds of copies of every image.

If a simpler duplication strategy is required initially, keep the duplication bounded and document the tradeoff.

---

# 11. Image Aspect Ratio — Critical

Images have mixed dimensions.

Examples:

```text
1:1
3:4
4:5
2:3
16:9
21:9
etc.
```

The carousel must **preserve the natural aspect ratio of every asset.**

Never crop images.

Do not use:

```css
object-fit: cover;
```

for the carousel imagery.

Do not force every image into:

```css
aspect-ratio: 3 / 4;
```

or any other common ratio.

Instead, use a shared visual height and calculate width from the image's intrinsic aspect ratio.

Conceptually:

```ts
displayedWidth = displayedHeight * (naturalWidth / naturalHeight);
```

Examples at a 400px visual height:

```text
1:1    → 400 × 400
3:4    → 300 × 400
4:5    → 320 × 400
16:9   → 711 × 400
```

The actual implementation should be responsive and fluid.

The image itself should remain:

```css
width: auto;
height: 100%;
object-fit: contain;
```

or an equivalent intrinsic-ratio implementation.

The final result must never visually crop the supplied asset.

---

# 12. Active Image Sizing

The active item should be larger than neighboring items.

However, do not distort its aspect ratio.

Scaling must apply uniformly:

```text
scale(1)
```

rather than changing width/height independently.

For example:

```text
active       → scale 1.00
±1           → scale ~0.70
±2           → scale ~0.55
far items    → scale ~0.45
```

These are starting points, not fixed values.

Tune them visually against the reference recording.

The important behavior is:

> The selected item grows naturally into the hero position while retaining its original ratio.

---

# 13. Horizontal Layout

The track should be centered around the viewport.

There should always be visual context on both sides of the active image when screen width allows.

Desktop:

```text
small → small → ACTIVE → small → small
```

Tablet:

```text
small → ACTIVE → small
```

Mobile:

```text
partial → ACTIVE → partial
```

Do not completely hide the neighboring items on mobile.

A partial glimpse communicates that the gallery is horizontally interactive.

---

# 14. No Cropping During Animation

This is especially important.

When an image changes from side item → active item:

```text
side
 ↓
moves toward center
 ↓
scales up
 ↓
becomes active
```

its complete content must remain visible throughout.

Do not animate into a fixed crop window.

The bounding box may change, but the image's intrinsic aspect ratio must remain intact.

---

# 15. Drag Interaction

Desktop and touch devices should support direct manipulation.

Use Pointer Events.

Preferred behavior:

```text
pointer down
    ↓
capture pointer
    ↓
pointer movement changes carouselPosition
    ↓
release
    ↓
calculate nearest item
    ↓
inertial/smooth snap
```

Dragging should feel direct.

If the pointer moves 100px, the track should respond immediately rather than waiting for a threshold.

Use a reasonable drag multiplier, close to 1:1 initially.

Prevent accidental page scrolling only while the user is clearly interacting with the horizontal carousel.

Do not globally disable vertical scrolling.

---

# 16. Mouse / Trackpad Interaction

Support horizontal trackpad gestures where practical.

If the user performs horizontal wheel movement over the carousel:

```text
wheel deltaX
    ↓
carouselPosition += delta
```

Do not hijack normal vertical page scrolling.

The page remains owned by Lenis.

If implementing wheel interaction creates conflicts with Lenis, prioritize correct page scrolling and use pointer/touch dragging as the primary interaction.

---

# 17. Click Interaction

Clicking a visible neighboring image should make it the active image.

Example:

```text
[small A] [small B] [ACTIVE C] [small D] [small E]
                         ↓
                    click D
                         ↓
[small B] [small C] [ACTIVE D] [small E] [small F]
```

The transition should animate continuously.

Do not instantly swap the active image.

---

# 18. Inertia / Snap

On pointer release:

1. Determine current continuous position.
2. Apply a small velocity/inertia component if appropriate.
3. Determine the nearest item.
4. Animate to the nearest valid carousel position.
5. Update active metadata.

Use GSAP for this choreography.

Use the existing project motion language:

```text
master CSS easing:
cubic-bezier(0.7, 0, 0.3, 1)

GSAP:
expo.out / power4.out / power4.inOut
```

Avoid introducing a completely different animation language.

Target roughly:

```text
micro interaction: 0.3s
normal snap:       0.5–0.9s
larger movement:   ~0.9s
```

Tune based on the reference recording.

---

# 19. Animation Ownership

The existing architecture has a strict division:

- **GSAP** → choreography, timelines, scroll-linked animation, complex movement.
- **Motion** → UI state such as menus, modals, form feedback.
- **Lenis** → page scrolling.

Therefore:

> Use GSAP for this carousel's physical movement and choreography.

Do not animate the same carousel properties with both GSAP and Motion.

Avoid CSS transitions fighting GSAP transforms.

Prefer one owner for:

```text
transform
opacity
position
scale
```

---

# 20. Visual Physics

The carousel should feel like a physical strip.

When moving:

```text
position
scale
opacity
```

should all react as one system.

Avoid:

```text
position moves quickly
scale changes slowly
opacity fades independently
```

unless there is a deliberate visual reason.

The reference should feel like objects moving through space.

---

# 21. Neighbor Visibility

The side images should not all have equal visual prominence.

Use distance from the active item.

Conceptually:

```text
distance 0 → strongest
distance 1 → medium
distance 2 → subtle
distance 3+ → very subtle / recycled
```

Opacity can decrease with distance.

Do not make distant items completely invisible if they can reasonably remain part of the continuous strip.

---

# 22. Controls / Metadata

The reference includes a compact slide counter.

Implement something like:

```text
12 / 74
```

or:

```text
12 / 74 SCREENS
```

using the project's small metadata typography.

Keep it minimal.

Do not create a large pagination control.

Optional previous/next controls may be added if useful, but they should not dominate the visual composition.

The carousel must remain usable through:

- drag
- click
- keyboard
- optional controls

---

# 23. Keyboard Accessibility

The carousel must not depend exclusively on mouse interaction.

The carousel container should be keyboard accessible.

Support:

```text
ArrowLeft  → previous screen
ArrowRight → next screen
Home       → first screen
End        → last screen
```

If the carousel is infinite, `Home`/`End` can be omitted or clearly defined.

Add appropriate ARIA semantics.

Do not make decorative side images individually focusable unless clicking them is an intentional accessible action.

The active screen should be understandable to screen readers.

---

# 24. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

and the project's central motion state if one exists.

Reduced motion should:

- disable inertia
- disable large scale choreography
- disable continuous auto movement
- minimize animation
- retain normal image browsing
- keep keyboard and click interactions functional

A simple short opacity/position transition is acceptable.

Never make the carousel unusable when motion is reduced.

---

# 25. Touch

On touch:

- support horizontal swipe
- preserve vertical page scrolling
- no cursor-following behavior
- no magnetic effects
- avoid hover-only interactions
- keep controls/touch targets usable

Follow the project's existing mobile motion policy.

---

# 26. Responsive Sizing

Use `clamp()` rather than hardcoded desktop/mobile jumps.

For example:

```css
--carousel-height: clamp(...);
--carousel-gap: clamp(...);
--section-padding: clamp(...);
```

Do not invent many breakpoints.

Breakpoints should primarily simplify behavior rather than completely redesign the component.

The carousel should feel like the same component across:

```text
desktop
tablet
mobile
```

---

# 27. Section Spacing

The design system values substantial whitespace.

Do not cram the carousel immediately against the previous or next section.

Use the project's section/container spacing tokens where appropriate.

The component should have:

```text
large top breathing room
small metadata
large heading
comfortable gap
carousel
small metadata/control area
large bottom breathing room
```

Avoid enclosing the whole section in a visible card.

---

# 28. No Decorative Card UI

Do not create:

- drop shadows
- floating cards
- glassmorphism
- gradients
- excessive borders
- glowing effects
- rounded containers
- unnecessary background blobs

The imagery and typography should carry the section.

Use hairlines only where they have structural value.

---

# 29. Data / Asset Architecture

Do not hardcode final placeholder images into the component.

The project's architecture explicitly requires asset-driven components.

The component should accept data such as:

```ts
interface SelectedScreensProps {
  screens: SelectedScreen[];
  title?: string;
  label?: string;
}
```

If the project already has a media/project asset type, reuse it.

Do not create a competing media schema unless necessary.

The component should be usable later with real Cloudinary assets.

---

# 30. Image Loading

Follow the existing image performance conventions.

The project uses Cloudinary and expects:

```text
f_auto
q_auto
AVIF-first
explicit dimensions
```

Use the existing image/media utilities if they already exist.

Do not introduce a second image-loading system.

The browser should know intrinsic dimensions as early as possible to avoid layout shifts.

---

# 31. Large Image Collection

The collection can contain many images.

Do not create expensive continuous animations for dozens of offscreen DOM nodes.

A reasonable strategy:

```text
active
±1
±2
```

are fully active.

Far items can be:

- recycled
- repositioned
- lazily loaded
- rendered with lower-resolution sources

The implementation should keep the animation transform-based.

Follow the project's performance guardrail:

> Animate transform/opacity rather than layout properties.

---

# 32. Performance Requirements

Target:

- smooth 60fps interaction on normal desktop hardware
- no layout thrashing during drag
- no React state update on every pointer movement if avoidable
- use refs/GSAP state for high-frequency animation
- React state should represent meaningful UI state, not every animation frame
- avoid reading layout repeatedly inside the pointermove loop
- cache intrinsic dimensions
- use `will-change: transform` only during active interaction where appropriate

Do not use expensive WebGL.

This component does not need Three.js.

---

# 33. No New Heavy Dependency

The project already uses GSAP.

Do not add another carousel library such as:

```text
Swiper
Embla
Splide
Keen Slider
Framer Motion carousel
```

unless the repository already uses one and there is a compelling existing abstraction to reuse.

The requested interaction should be implemented with the project's existing GSAP stack.

---

# 34. React Architecture

Avoid putting the entire animation system into one giant `Home.tsx`.

`Home.tsx` should only import and render:

```tsx
<SelectedScreens />
```

The animation logic belongs inside the component/hook.

Keep the component understandable.

Separate:

```text
data
layout
animation
interaction
controls
```

where useful.

Do not over-engineer the component with unnecessary abstractions.

---

# 35. Home.tsx Change

The final Home page should conceptually become:

```tsx
export function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Gallery />
        <SelectedScreens />
        <Footer />
      </main>
    </>
  );
}
```

Keep:

```tsx
<Gallery />
```

exactly as it is.

Do not refactor the existing Home structure unnecessarily.

---

# 36. Removal Safety

The new component must be removable safely.

A future developer should be able to delete:

```tsx
import { SelectedScreens } from "...";
```

and:

```tsx
<SelectedScreens />
```

without breaking:

- Gallery
- Footer
- Home
- global styles
- existing animation providers

Avoid global CSS that only works because the new component exists.

Prefer component-scoped styles/classes.

If new design tokens are genuinely necessary, use the existing token architecture and ensure they do not affect unrelated components.

---

# 37. Do Not Modify Existing Gallery

This is explicit.

Do not:

- rename `Gallery`
- replace `Gallery`
- move `Gallery`
- merge `Gallery` and `SelectedScreens`
- change Gallery's animation
- change Gallery's data
- change Gallery's styles

The existing gallery is intentionally retained so the new component can be evaluated independently.

---

# 38. Suggested DOM Model

A reasonable structure:

```tsx
<section className="selected-screens">
  <header className="selected-screens__header">
    <div className="selected-screens__label">
      SELECTED SCREENS
    </div>

    <div className="selected-screens__count">
      ...
    </div>

    <h2 className="selected-screens__title">
      A closer <span>look.</span>
    </h2>
  </header>

  <div
    className="selected-screens__viewport"
    role="region"
    aria-label="Selected screens"
  >
    <div className="selected-screens__track">
      ...
    </div>
  </div>

  <footer className="selected-screens__meta">
    <span>12 / 74</span>
  </footer>
</section>
```

This is only a structural suggestion.

Use the project's actual naming conventions.

---

# 39. Important: Do Not Use Layout-Based Carousel Math Every Frame

Avoid a system where every pointer move causes:

```text
React render
→ measure DOM
→ calculate width
→ calculate layout
→ render
```

Instead:

1. Measure intrinsic dimensions once.
2. Store dimensions in refs/data.
3. Calculate visual positions in the animation layer.
4. Update transforms.
5. Let React handle only semantic state.

This is particularly important because mixed aspect ratios make layout calculations more expensive.

---

# 40. Mixed Aspect Ratio Positioning

The horizontal position must account for each item's actual displayed width.

Do not assume:

```ts
itemWidth = constant
```

because the images have different aspect ratios.

A better conceptual model:

```text
item A width = intrinsic ratio × current height
item B width = intrinsic ratio × current height
item C width = intrinsic ratio × current height
```

The center point of each item should be calculated using its actual displayed width.

This prevents:

```text
wide image
    ↓
incorrect spacing
    ↓
overlap / giant gap
```

The carousel should remain visually balanced even when consecutive images have radically different ratios.

---

# 41. Active Centering

The active image should be centered based on its **visual center**, not its left edge.

For example:

```text
        viewport center
               ↓
───────────────│────────────────

             ┌─────────────┐
             │             │
             │    HERO     │
             │             │
             └─────────────┘
                    ↑
              visual center
```

When moving from a narrow portrait image to a wide landscape image, the wide image must still become centered correctly.

---

# 42. Transition Example

When moving from item 5 → item 6:

Before:

```text
[4 small] [5 ACTIVE] [6 small] [7 small]
```

During:

```text
[4] [5 ↓] [6 ↑] [7]
```

After:

```text
[5 small] [6 ACTIVE] [7 small] [8 small]
```

But the transition must be continuous.

There should never be a frame where the images disappear and reappear in new positions.

---

# 43. Interaction Priority

Prioritize in this order:

1. Visual fidelity to the supplied recording.
2. Continuous drag behavior.
3. Correct mixed aspect-ratio handling.
4. Smooth active-item scaling.
5. Infinite looping.
6. Performance.
7. Accessibility.
8. Optional controls.

Do not sacrifice the first four to add unnecessary controls or decorative effects.

---

# 44. Visual QA Checklist

After implementation, compare the result against the supplied reference recording.

Check:

### Composition

- [ ] Large whitespace above carousel.
- [ ] Small tracked metadata label.
- [ ] Large editorial heading.
- [ ] Horizontal visual strip.
- [ ] Hero image clearly dominant.
- [ ] Side images visible.
- [ ] Minimal controls/metadata.

### Images

- [ ] Original aspect ratios preserved.
- [ ] No cropping.
- [ ] No stretching.
- [ ] No forced universal aspect ratio.
- [ ] Wide images remain wide.
- [ ] Portrait images remain portrait.
- [ ] Square images remain square.
- [ ] No border radius.

### Motion

- [ ] Drag feels continuous.
- [ ] Neighboring images move with the active image.
- [ ] Active item grows smoothly.
- [ ] Previous active item shrinks smoothly.
- [ ] Release has controlled inertia.
- [ ] Snap feels physical.
- [ ] No abrupt image replacement.
- [ ] No layout jumps.

### Design system

- [ ] Satoshi.
- [ ] `#F6F6F6` light-world background.
- [ ] Black primary text.
- [ ] Blue `#0049CD` accent.
- [ ] Existing CSS variables used.
- [ ] Fluid sizing.
- [ ] No unnecessary colors.
- [ ] No shadows.
- [ ] No rounded corners.

### Architecture

- [ ] New standalone component.
- [ ] Existing `Gallery` untouched.
- [ ] `Home.tsx` only gains an import and render.
- [ ] No new carousel library.
- [ ] GSAP owns animation.
- [ ] Lenis remains page-scroll owner.
- [ ] Component can be deleted safely.
- [ ] Assets are passed into component rather than hardcoded.

---

# 45. Important Don'ts

Do **not**:

- replace the existing Gallery
- use a standard Swiper-style page carousel
- crop images
- use `object-fit: cover`
- force every image into the same ratio
- add border radius
- add glassmorphism
- add shadows
- add gradients without an explicit design requirement
- introduce another animation library
- hijack global page scrolling
- create 74+ unnecessarily heavy DOM copies
- put animation state into React on every frame
- hardcode placeholder imagery into the final component
- create global CSS that can affect the old Gallery
- redesign the rest of Home.tsx
- modify unrelated components

---

# 46. Final Deliverable

Implement:

```text
New:
SelectedScreens component
SelectedScreens carousel hook/logic
SelectedScreens item component
SelectedScreens controls/meta where necessary
```

Modify only:

```text
Home.tsx
```

by adding the new component while retaining:

```tsx
<Gallery />
```

The resulting Home should be:

```tsx
export function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Gallery />
        <SelectedScreens />
        <Footer />
      </main>
    </>
  );
}
```

The final result should feel like a **premium continuous editorial screen gallery**, not a generic image slider.

The defining characteristics are:

> **continuous horizontal movement + active center focus + mixed natural image ratios + zero cropping + zero border radius + minimal typography + restrained motion.**
