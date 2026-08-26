# About Button — Home Intro Section

## Objective

Create a **circular "About me" magnetic button** for the Home page's About / Intro section.

The supplied reference video shows a very minimal circular CTA:

- Dark/black circular button in its resting state.
- White centered text: `About me`.
- On hover, the circle transitions to the project's blue accent.
- Text remains centered and white.
- The button has no visible border.
- The button has no shadow.
- The button has no icon in the reference.
- The interaction is deliberately simple and premium.

The project already has **magnetic and elastic button effects** implemented elsewhere.

### Important

**Do not rebuild magnetic behavior.**

Reuse the project's existing magnetic/elastic interaction component or wrapper.

Do not introduce a second magnetic implementation.

---

# 1. Where to use it

Replace the existing **"See my work →"** CTA in the Home page's About / Intro section with this circular button.

The existing About/Intro section should remain structurally and visually unchanged otherwise.

Current conceptual layout:

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  ABOUT / INTRO                                                │
│                                                               │
│  Large statement                         Supporting copy       │
│  Large statement                         Supporting copy       │
│  Large statement                         See my work →        │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

Change only the CTA:

```text
See my work →
```

to:

```text
        ╭──────────────╮
        │              │
        │   About me   │
        │              │
        ╰──────────────╯
```

The rest of the About section must remain as it currently is.

---

# 2. Visual appearance

The button should be a **solid circle**.

Reference resting state:

```text
       ●
    About me
```

More precisely:

```text
             ┌──────────────┐
          ╭──┘              └──╮
        ╭                          ╮
       │                          │
       │        About me          │
       │                          │
        ╰                          ╯
          ╰──┐              ┌──╯
             └──────────────┘
```

It must be a true circular shape:

```css
border-radius: 50%;
```

Do not use a rounded rectangle.

---

# 3. Size

Use a responsive/fluid size.

Do not hardcode one desktop size.

A good starting point:

```css
width: clamp(8rem, 12vw, 11rem);
aspect-ratio: 1;
```

or an equivalent project token-based implementation.

The button should feel substantial enough to be an intentional visual element, but it must not overpower the main headline.

The exact size should be visually tuned against the existing Home About/Intro section.

---

# 4. Resting state

Use the project's existing design tokens.

### Background

Use the project's primary dark ink:

```css
background: var(--ink);
```

The approved light-world palette defines:

```text
--ink: #000000
--accent: #0049CD
--bg: #F6F6F6
```

Do not introduce another black/blue value. fileciteturn2file2L129-L164

### Text

Use:

```css
color: var(--bg);
```

or the appropriate light text token already used by the project.

The text should be:

```text
About me
```

centered both horizontally and vertically.

---

# 5. Typography

Use the project's approved **Satoshi** typeface.

The design system specifies Satoshi as the single display/UI family. fileciteturn2file0L23-L34

Do not use:

- Arial
- Inter
- system-ui
- another Google font
- a decorative font

Use the existing font token/class.

### Text treatment

Keep it simple:

```text
About me
```

- Satoshi
- medium/regular weight
- normal case
- compact size
- centered
- white/light text

Do not uppercase the CTA.

Do not add tracking-heavy styling.

Do not bold it unnecessarily.

---

# 6. Hover state

The reference's main hover behavior is:

```text
REST

      ●
   About me

        ↓ hover

      ●
   About me
```

but the circle changes from dark to blue.

Use:

```css
background: var(--accent);
```

where:

```text
--accent = #0049CD
```

The project design system locks this blue as the approved accent. fileciteturn2file9L621-L626

The transition should be smooth.

Do not introduce:

- gradients
- glow
- shadows
- borders
- color noise
- texture
- glass effects

---

# 7. Hover transition

Use the existing motion tokens.

The design system specifies:

```text
--ease: cubic-bezier(0.7, 0, 0.3, 1)
--dur-fast: 0.3s
--dur-base: 0.5s
```

and `power2.inOut` for button fills/small slides. fileciteturn2file0L38-L56

Therefore the fill transition should feel approximately:

```text
0.3–0.5s
power2.inOut / existing button easing
```

Do not invent a new easing curve.

---

# 8. Hover fill behavior

The reference shows a simple dark → blue transformation.

The project design system's custom `MagneticButton` is already specified to support:

> pill + circle variants, `strength`/`textStrength` props, fill-from-bottom hover, elastic release. fileciteturn2file7L440-L449

If the existing `MagneticButton` already supports a circular variant and fill-from-bottom hover:

**reuse it.**

Do not duplicate the component.

If its API does not exactly match the reference, extend it minimally rather than creating another magnetic button component.

---

# 9. Existing magnetic effect

The project already has magnetic and elastic behavior.

Therefore:

### DO

```tsx
<MagneticButton ...>
  About me
</MagneticButton>
```

or use the project's existing magnetic wrapper/API.

### DO NOT

Create:

```text
useMagneticButton()
useMousePosition()
custom pointer tracking
custom elastic spring
```

inside this new CTA.

The existing magnetic system owns:

- cursor attraction
- pointer displacement
- elastic return
- magnetic strength

The new button only needs to provide its visual styling/state.

The design system explicitly assigns magnetic buttons to GSAP choreography. fileciteturn2file4L236-L250

---

# 10. Magnetic behavior must not change the circle itself

The magnetic effect may translate the button slightly toward the pointer.

However:

- It must remain circular.
- It must not distort.
- It must not become elliptical.
- It must not change width/height independently.
- It must return elastically to its original position.

The existing elastic release should remain responsible for this.

---

# 11. No border

The button must have:

```css
border: 0;
```

Do not use a hairline border around this button.

The solid circle itself is the visual object.

---

# 12. No shadow

Do not add:

```css
box-shadow
```

The button should feel like a flat graphic object.

The project design principles explicitly favor whitespace and hairlines over unnecessary boxes/shadows. fileciteturn2file3L193-L205

---

# 13. No icon

The reference button only contains:

```text
About me
```

Do not add:

```text
→
↗
arrow
plus
hamburger
```

inside the circle.

The CTA's destination is already communicated by the text.

If an arrow is required by an existing project-wide link convention, place it outside the circle rather than changing the reference's simple visual.

Default implementation:

```text
About me
```

only.

---

# 14. Click behavior

The button should link to the dedicated About page:

```text
/about
```

Use the project's existing routing/navigation abstraction.

Do not implement a custom navigation mechanism.

The button should behave like a normal accessible link.

---

# 15. Accessibility

Use a semantic link:

```tsx
<a href="/about">
  About me
</a>
```

or the project's router `<Link>` equivalent.

Do not use a `<div>` with an `onClick`.

It must be:

- keyboard accessible
- focusable
- screen-reader understandable
- usable without hover

Add an appropriate visible focus state.

The focus state must preserve the circular visual language and must not introduce a large browser-default outline that clashes with the design.

Do not make functionality dependent on the magnetic effect.

---

# 16. Touch behavior

The design system explicitly disables magnetic interactions below the mobile threshold. fileciteturn2file6L397-L401

Therefore:

- Keep the button circular on mobile.
- Keep the dark → blue interaction if the platform supports it naturally.
- Do not attempt magnetic cursor behavior on touch.
- Do not add pointer-following effects on mobile.
- The button must remain a normal accessible CTA.

---

# 17. Reduced motion

Respect the existing `MotionProvider` and:

```css
prefers-reduced-motion: reduce
```

The project specifies reduced-motion behavior where complex motion collapses to opacity-only/micro-fades. fileciteturn2file6L397-L401

For reduced motion:

- Disable magnetic movement if the existing system handles it.
- Disable elastic release.
- Keep a simple color transition or instant state change.
- Do not make the CTA disappear or become unusable.

---

# 18. Component architecture

Because the project follows an everything-is-a-component architecture, do not create one-off inline button markup if an existing `MagneticButton` component is available.

The design system explicitly lists:

```text
MagneticButton
```

as a reusable original component with:

- pill variant
- circle variant
- strength props
- text strength props
- fill-from-bottom hover
- elastic release fileciteturn2file7L440-L449

Use that existing component.

The new About CTA should ideally be configuration, not a new button implementation.

Conceptually:

```tsx
<MagneticButton
  variant="circle"
  href="/about"
  ...
>
  About me
</MagneticButton>
```

Adapt the props to the actual existing component API in the repository.

---

# 19. Project accent colors

Use the project's locked palette:

```text
Background: #F6F6F6
Primary ink: #000000
Accent: #0049CD
Accent deep: #003AA3
Secondary gray: #9D9D9C
```

Do not use the brighter blue shown in the reference video if it differs from the project palette.

The reference is only a behavioral/visual reference.

The project's own accent must win.

The palette is explicitly locked in the project's decisions. fileciteturn2file9L621-L626

---

# 20. Important: Do not copy the reference button's exact color

The reference video uses a brighter blue.

Do not reproduce that color directly.

Use:

```css
var(--accent)
```

which resolves to the project's approved:

```text
#0049CD
```

This keeps the component consistent with the rest of the portfolio.

---

# 21. Hover state summary

### Default

```text
circle:
background → var(--ink)

text:
color → var(--bg)
```

### Hover

```text
circle:
background → var(--accent)

text:
color → var(--bg)
```

### Active/pressed

Keep subtle.

Do not add a dramatic press animation.

The existing magnetic/elastic system can handle physical response.

---

# 22. Desired interaction

The final interaction should feel like:

```text
                 DEFAULT

              ╭──────────╮
            ╭              ╮
           │    About me    │
            ╰              ╯
              ╰──────────╯
                 black


                    ↓

                  HOVER

              ╭──────────╮
            ╭              ╮
           │    About me    │
            ╰              ╯
              ╰──────────╯
                  blue


                    ↓

              POINTER MOVES

                   ↗
              ╭──────────╮
            ╭              ╮
           │    About me    │
            ╰              ╯
              ╰──────────╯

          magnetic movement


                    ↓

               POINTER LEAVES

              elastic return
                     ↓

              black circle
```

Keep the movement subtle.

The button should never feel like a toy.

---

# 23. Home About section integration

Find the existing Home About/Intro section containing the current CTA:

```text
See my work →
```

Replace **only that CTA** with:

```text
About me
```

inside the circular `MagneticButton`.

Do not change:

- the large statement
- supporting paragraph
- column layout
- section spacing
- heading
- copy
- reveal animation
- background
- section height
- surrounding content

The existing About/Intro section should otherwise remain exactly as it is.

The project's Home blueprint already specifies a two-column Intro Manifesto with a circular magnetic "About me" CTA, so this implementation should align directly with that intended architecture. fileciteturn2file4L265-L269

---

# 24. Do not add another button component

Do not create:

```text
AboutButton.tsx
CircleButton.tsx
MagneticAboutButton.tsx
```

if `MagneticButton` already exists.

Use the existing reusable button.

If a wrapper is genuinely required for layout, it should only handle positioning.

---

# 25. Final QA

Before considering the task complete, verify:

### Visual

- [ ] Perfect circle.
- [ ] Dark/black default state.
- [ ] Blue accent hover state.
- [ ] White/light `About me` text.
- [ ] Satoshi font.
- [ ] No border.
- [ ] No shadow.
- [ ] No gradient.
- [ ] No icon.
- [ ] No radius other than the circle itself.
- [ ] Responsive size.

### Interaction

- [ ] Existing magnetic effect reused.
- [ ] Existing elastic release reused.
- [ ] Hover transitions dark → blue smoothly.
- [ ] Button returns cleanly after hover.
- [ ] No custom magnetic implementation.
- [ ] No new animation library.
- [ ] Touch does not attempt magnetic behavior.
- [ ] Reduced motion respected.

### Navigation

- [ ] Clicking goes to `/about`.
- [ ] Uses existing router/link system.
- [ ] Keyboard accessible.
- [ ] Visible focus state.

### Integration

- [ ] Existing Home About section remains unchanged except for CTA.
- [ ] Existing "See my work →" CTA is removed/replaced.
- [ ] Existing magnetic component is reused.
- [ ] Project design tokens are used.
- [ ] No hardcoded alternate blue.
- [ ] No unrelated files/components modified.

---

# Final instruction

Build the button as a **minimal circular magnetic About CTA** inspired by the supplied reference.

The reference's essence is:

> **black circle → blue on hover → centered "About me" → subtle physical interaction.**

The project's existing design system takes precedence over the reference for:

- colors
- typography
- easing
- responsive behavior
- accessibility
- motion architecture

Most importantly:

> **Reuse the existing MagneticButton and elastic/magnetic effects. Do not rebuild them.**

Then replace the existing **"See my work →"** CTA in the Home page's About/Intro section with this new **"About me"** circular button linking to `/about`.
