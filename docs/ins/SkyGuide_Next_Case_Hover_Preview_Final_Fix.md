# Final Fix — Next Case Footer Preview / Hover Peek

## Goal

Refine the **project-specific Next Case portion** at the bottom of the SkyGuide AI case-study so it matches the provided reference:

- The next project title remains the dominant element.
- The next project's image is **hidden by default**.
- On hover over the **Next Case interaction/title area**, the next project image should **peek into view like a floating card**.
- The preview image must use a **4:3 aspect ratio**.
- The effect should feel editorial, subtle, and tactile.
- The existing global footer must remain completely unaffected.

This is a **case-study-specific modification**, not a redesign of the site's Footer component.

---

# 1. CRITICAL — DO NOT INTERFERE WITH THE GLOBAL FOOTER

The existing `Footer` component is shared infrastructure.

The current implementation already contains:

- the footer reveal curtain
- the curved SVG reveal
- GSAP / ScrollTrigger logic
- magnetic interactions
- global footer CTA
- footer bottom metadata
- socials
- contact behavior
- normal footer layout

The uploaded code confirms the footer is already a reusable component with a `nextProject` branch and existing classes such as `footer-next-content`, `footer-next-title-link`, `footer-next-preview-wrap`, `footer-next-preview-img`, `footer-round`, and the shared curtain/reveal system. fileciteturn4file0L46-L57 fileciteturn4file0L106-L154

**Do not modify the global footer behavior to achieve this visual.**

Do not:

```text
rewrite Footer.tsx globally
rewrite footer reveal
rewrite footer animation
change footer CTA
change footer socials
change footer metadata
change shared magnetic hook
change global footer spacing
```

The implementation must be scoped specifically to the **next-project state**.

---

# 2. Reference Composition

The desired composition is approximately:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│  NEURON                                                     │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                NEXT PROJECT IMAGE                    │  │
│  │                     4 : 3                             │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│─────────────────────────────────────────────────────────────│
│                                      ○ NEXT CASE            │
│                                                             │
│  All Work →                                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

But importantly, the image is **not permanently visible like a normal image block**.

Default state:

```text
NEURON
```

Hover state:

```text
NEURON
         ┌───────────────────────┐
         │                       │
         │     NEXT PROJECT      │
         │       IMAGE           │
         │                       │
         └───────────────────────┘
```

The preview should visually **peek into the composition**.

---

# 3. Default State — Image Hidden

When the user first reaches the footer:

```text
NEURON


──────────────────────────────────────────────
                              NEXT CASE
```

The preview image should either be:

```text
opacity: 0
visibility: hidden
transform: translateY(...)
```

or the equivalent existing animation mechanism.

It must not occupy a distracting permanent visual region.

The footer should remain visually clean when untouched.

---

# 4. Hover State — Image Peeks Out

When the user hovers the Next Case interaction:

```text
                    ┌───────────────────┐
                    │                   │
                    │   NEXT PROJECT    │
                    │      IMAGE        │
                    │                   │
                    └───────────────────┘

NEURON
```

The image should:

- fade in
- move slightly upward/downward into position
- feel like it is emerging from behind the composition
- remain physically connected to the Next Case interaction
- stop at a deliberate resting position

Do not make the movement aggressive.

---

# 5. Trigger Area

The hover should be activated by the existing next-project interaction.

The current component already renders:

```jsx
<Link
  to={`/work/${nextProject.slug}`}
  className="footer-next-title-link"
>
  <h2 className="footer-heading footer-next-heading">
    {nextProject.title}
  </h2>
</Link>
```

and the existing preview link:

```jsx
<Link
  to={`/work/${nextProject.slug}`}
  className="footer-next-preview-wrap"
>
  <img
    src={nextProject.image}
    alt={nextProject.title}
    className="footer-next-preview-img"
  />
</Link>
```

Do not invent a second navigation mechanism.

The existing `nextProject` data and routing should continue to work unchanged. fileciteturn4file0L118-L132

---

# 6. Best Interaction Model

Preferred interaction:

```text
Hover Next Case title
        ↓
preview card appears
        ↓
preview card follows/peeks into composition
        ↓
mouse leaves
        ↓
preview card disappears
```

The image can also respond to hovering the existing circular:

```text
NEXT CASE
↗
```

interaction.

The exact trigger should follow the existing DOM structure rather than creating duplicate click targets.

---

# 7. 4:3 Image Ratio — REQUIRED

The next-project image must always use a **4:3 visual ratio**.

Use:

```css
aspect-ratio: 4 / 3;
```

The preview card should therefore have:

```text
width
+
4:3 height
```

Example:

```css
.footer-next-preview-wrap {
  aspect-ratio: 4 / 3;
}
```

The exact width should be responsive.

Do not make the image extremely narrow and tall.

Do not use the project's old portrait image behavior here.

---

# 8. Never Distort the Preview Image

The preview image itself must preserve its proportions.

Use:

```css
object-fit: cover;
```

ONLY if the preview card intentionally crops the image while preserving a clean 4:3 composition.

If the full image is important and fits naturally inside the 4:3 ratio, use:

```css
object-fit: contain;
```

The agent must inspect the selected next-project asset before deciding.

Priority:

```text
no distortion
+
intentional crop only
```

---

# 9. The Preview Should Feel Like a Card

The reference interaction suggests a floating project preview.

The card can have:

```text
clean rectangular shape
subtle border
subtle shadow if already consistent with the site's design
```

But do not introduce a completely new card system.

Prefer the existing visual treatment from the portfolio.

Do not create:

```text
glassmorphism
heavy blur
giant rounded card
gradient
thick border
```

unless the existing design system already uses those.

The card should feel like a piece of the next project appearing temporarily.

---

# 10. Positioning

The preview should float near the Next Case interaction rather than becoming a normal layout block.

Conceptually:

```text
                 ┌───────────────────────┐
                 │                       │
                 │       IMAGE           │
                 │                       │
                 └───────────────────────┘
                              ↕
                       NEXT CASE
```

The image can be:

```text
absolute
```

inside a local relative wrapper.

Do not position it relative to the viewport with random coordinates.

Use the existing footer container as the positioning context.

Avoid:

```css
left: 1137px;
top: 147px;
```

or similarly brittle values.

---

# 11. Z-Index

The preview should appear above nearby footer content when active.

Use a local stacking context if needed.

Conceptually:

```css
.footer-next-content {
  position: relative;
}

.footer-next-preview-wrap {
  position: absolute;
  z-index: ...;
}
```

Do not globally increase the footer's z-index.

Do not interfere with:

```text
navigation
footer curtain
global modal
cursor
```

---

# 12. Animation

Reuse the website's existing motion language.

The preferred sequence:

### Enter

```text
opacity: 0 → 1
transform: translateY(20px) scale(0.97)
```

### Rest

```text
opacity: 1
transform: translateY(0) scale(1)
```

### Exit

```text
opacity: 1 → 0
transform: translateY(10px) scale(0.98)
```

These are examples only.

Use the project's existing easing/duration conventions if available.

Do not add a new animation library.

---

# 13. Hover Should Feel Editorial

The preview should **peek**, not aggressively follow the cursor.

Avoid:

```text
large mouse tracking
rapid movement
rotation
3D distortion
bounce
```

Preferred:

```text
slow entrance
small movement
small scale adjustment
smooth disappearance
```

The user should discover the preview rather than be attacked by it.

---

# 14. Magnetic Interaction

The existing footer already uses magnetic interactions:

```jsx
className="footer-round magnetic"
data-strength="42"
```

Do not replace that.

The Next Case circle should continue to use the existing magnetic behavior.

The preview image can appear when hovering the existing interaction, but the magnetic button itself should remain unchanged unless absolutely necessary.

---

# 15. Existing Circle CTA

Keep:

```text
NEXT CASE
↗
```

as the existing circular CTA.

Do not redesign it.

Do not create:

```text
NextProjectButton
```

if the current footer-round component already provides the correct behavior.

The uploaded implementation already renders this CTA in the `nextProject` branch. fileciteturn4file0L136-L154

---

# 16. Existing “All Work” CTA

Keep the existing:

```text
All Work →
```

button.

Do not redesign it.

Do not change its typography, border, hover, or magnetic behavior.

The current implementation already provides the All Work link in the next-project footer state. fileciteturn4file0L138-L143

---

# 17. Title

Keep the next-project title large:

```text
NEURON
```

The title should remain visible even when the preview is hidden.

It should remain the primary footer visual anchor.

The preview is secondary.

---

# 18. Preview Size

The preview should be large enough to clearly show the next project but not so large that it covers the whole footer.

Recommended conceptual range:

```text
Desktop:
width: 420–620px

Tablet:
width: 320–480px

Mobile:
width: 260–340px
```

Use responsive CSS rather than fixed values.

Example:

```css
width: clamp(280px, 32vw, 600px);
aspect-ratio: 4 / 3;
```

These values are guidelines, not mandatory.

Match the reference composition and existing footer scale.

---

# 19. Mobile Behavior

Hover does not exist reliably on mobile.

Therefore, do not make the interaction depend on hover alone.

On mobile, the preview should either:

```text
remain hidden
```

or:

```text
appear as part of the natural Next Case interaction
```

depending on the site's existing interaction conventions.

Do not create an awkward always-floating image that blocks the CTA.

Touch targets must remain accessible.

---

# 20. Desktop Hover Behavior

Desktop:

```text
pointer enters Next Case title / interaction
        ↓
preview appears
        ↓
pointer leaves
        ↓
preview disappears
```

The preview should not remain visible after leaving the interaction unless that is part of the existing transition system.

---

# 21. Respect the Existing Footer Reveal

The footer already has a curved reveal driven by GSAP/ScrollTrigger and a curtain. Do not alter this animation.

The existing footer also checks:

```text
prefers-reduced-motion
```

and disables the curtain appropriately.

The new preview interaction must respect that same accessibility principle. fileciteturn4file0L51-L57

If reduced motion is enabled:

```text
no hover animation
or
instant/simple opacity transition
```

The preview must still be usable.

---

# 22. No Changes to the Global Footer CSS

Do not broadly change selectors such as:

```css
.footer
.footer-top
.footer-bottom
.footer-heading
.footer-round
.footer-pill
.footer-curtain
```

unless the change is strictly required and proven safe.

Prefer highly scoped selectors such as:

```css
.footer-next-content
.footer-next-preview-wrap
.footer-next-preview-img
```

and only within the `nextProject` state.

Even better, add a specific state class if necessary:

```text
.footer--has-next-project
```

without changing the styling of normal contact-footer usage.

---

# 23. Recommended State Class

A safe approach is:

```jsx
<footer
  className={`footer ${nextProject ? "footer--has-next-project" : ""}`}
  ...
>
```

Then scope all special behavior:

```css
.footer--has-next-project .footer-next-preview-wrap {
  ...
}
```

This ensures the new behavior only exists when a `nextProject` is actually being rendered.

Do not alter the appearance of the normal contact footer.

---

# 24. Keep Existing Routing

The preview card must remain a valid link to:

```text
/work/{nextProject.slug}
```

Do not create separate click handling.

Do not use:

```javascript
window.location.href
```

Use the existing React Router `<Link>`.

---

# 25. Preserve Alt Text

Keep:

```jsx
alt={nextProject.title}
```

or another meaningful equivalent.

The preview is still functional content, not merely decoration.

---

# 26. Final Desired Experience

Initial state:

```text
NEURON


────────────────────────────────────────────────────

                         NEXT CASE ↗
```

Hover:

```text
NEURON

                    ┌───────────────────┐
                    │                   │
                    │      NEURON       │
                    │     PREVIEW       │
                    │                   │
                    └───────────────────┘

────────────────────────────────────────────────────

                         NEXT CASE ↗
```

The card should appear as though the next project is **peeking through the footer**.

It should feel connected to the Next Case CTA without becoming a permanent image block.

---

# 27. Visual Character

The interaction should communicate:

```text
curiosity
discovery
anticipation
continuity
```

It should feel like:

> “There is another project behind this.”

not:

> “Here is a giant thumbnail.”

---

# 28. Do Not Add New Footer Sections

Do not add:

```text
new footer heading
new footer navigation
new contact block
new social section
new metadata
```

The only new behavior is the **next-project image preview**.

---

# 29. Verification

### Global safety

- [ ] Normal footer without `nextProject` looks exactly as before.
- [ ] Existing footer curtain is unchanged.
- [ ] Existing curved reveal is unchanged.
- [ ] Existing footer GSAP is unchanged.
- [ ] Existing magnetic interactions are unchanged.
- [ ] Existing footer CTA styles are unchanged.
- [ ] Footer bottom/socials are unchanged.

### Next-project behavior

- [ ] Next project title remains visible.
- [ ] Preview is hidden by default.
- [ ] Hover reveals preview.
- [ ] Preview uses 4:3 ratio.
- [ ] Preview maintains correct image proportions.
- [ ] Preview appears as a floating/peeking card.
- [ ] Preview does not permanently consume layout space.
- [ ] Preview has smooth enter/exit behavior.
- [ ] Preview is linked to the next project.
- [ ] Existing `nextProject.slug` routing still works.
- [ ] Existing `nextProject.image` is used.

### Responsive

- [ ] Desktop hover works.
- [ ] Tablet remains usable.
- [ ] Mobile does not depend on hover.
- [ ] No horizontal overflow.
- [ ] Preview does not block the CTA.
- [ ] Preview does not escape the page unexpectedly.

### Accessibility

- [ ] Reduced motion is respected.
- [ ] Preview remains keyboard-accessible through the existing link.
- [ ] Existing focus behavior is preserved.
- [ ] No inaccessible custom click handlers are introduced.

---

# 30. Final Implementation Rule

**Do not rebuild the footer.**

Use the existing `Footer` component and its existing `nextProject` branch.

Only enhance the next-project preview behavior.

The existing code already provides the structural hooks:

```text
footer-next-content
footer-next-title-link
footer-next-heading
footer-next-preview-wrap
footer-next-preview-img
footer-round
```

Use those hooks or add a very small scoped modifier.

The final implementation should be:

```text
existing footer
+
scoped next-project preview interaction
```

NOT:

```text
existing footer
+
new footer system
```

---

# Final Creative Direction

The bottom of the SkyGuide case study should end with a sense of **continuation**.

The visitor sees:

```text
NEURON
```

Then, on interaction, the project quietly appears:

```text
┌──────────────────────────────┐
│                              │
│       NEXT PROJECT           │
│          IMAGE               │
│                              │
└──────────────────────────────┘
```

It should feel like **opening a door to the next project**, not displaying another ordinary card.

Keep the image at **4:3**.

Keep it hidden until interaction.

Keep the animation subtle.

Keep all existing global footer behavior untouched.

**This is the final visual polish to the Next Case area — make it feel precise, elegant, and native to the existing portfolio.**
