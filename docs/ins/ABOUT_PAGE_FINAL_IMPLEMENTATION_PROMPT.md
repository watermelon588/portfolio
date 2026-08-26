# About Page — Final Implementation Prompt

## Objective

Finish the dedicated `/about` page as a **minimal editorial personal-profile page**.

The page communicates only:

1. **Who I am**
2. **What I am currently up to**
3. **Where to find me**

Use the project's **predefined design system and existing components as the source of truth**. Reuse the existing Navbar, Footer, typography, spacing, motion system, page transitions, buttons, hover effects, and magnetic/elastic interactions.

Do not invent a new visual language.

---

## 1. Keep the Page Minimal

This is a personal About page, **not a résumé**.

Do NOT add:

- Awards
- Experience timeline
- Work history
- Client logos
- Skills matrix
- Technology grid
- Statistics
- Testimonials
- Certifications
- Career timeline
- Large social cards
- AI chatbot
- Voice assistant
- Audio player
- Unnecessary interactive widgets

The only content sections are:

```text
01 — WHO I AM
02 — CURRENTLY
03 — ELSEWHERE
```

The design system favors strong editorial typography, spacious layouts, high contrast, minimal UI chrome, asymmetry, and subtle motion. Extend those established patterns instead of inventing unrelated patterns.

---

## 2. Reuse Existing Site Components

Before implementing anything, inspect the repository and reuse existing:

- Navbar
- Footer
- Page/container wrappers
- Section eyebrow styles
- Typography tokens
- Color tokens
- MagneticButton
- Existing circular About button
- Existing magnetic behavior
- Existing elastic release
- Existing hover effects
- Existing reveal animations
- MotionProvider
- Router/link components
- Responsive utilities

**Do not rebuild these.**

If an existing component already provides an interaction, configure/use it instead of creating a second implementation.

---

# 3. Visual Direction

The page should feel:

- Editorial
- Personal
- Quiet
- Spacious
- Typographic
- Minimal
- Premium
- Slightly asymmetric
- Human

The composition should rely on:

```text
large typography
+
small metadata
+
one strong personal image
+
large whitespace
```

Do not fill empty space just because it exists.

No glassmorphism, gradients, decorative blobs, excessive rounded cards, or unnecessary effects.

---

# 4. Design Tokens

Use the existing project tokens.

Do not hardcode colors.

Use the approved light-world palette through the existing variables:

```text
Background → #F6F6F6
Ink        → #000000
Accent     → #0049CD
Accent deep → #003AA3
Gray       → #9D9D9C
```

Use the existing Satoshi typography system.

Do not introduce another font.

---

# 5. Navbar

Reuse the existing Navbar exactly as used elsewhere on the site.

Do not create an About-specific navigation.

Do not modify global Navbar behavior.

---

# 6. Section 01 — WHO I AM

This is the main editorial introduction.

Use:

```text
01 — WHO I AM
```

as the small uppercase eyebrow.

Then create a **large personal statement** with a short supporting paragraph.

Conceptually:

```text
01 — WHO I AM


I build things
for the web.


I'm Rohit — a full-stack developer
interested in AI, software, and
interactive experiences.
```

These words are only a structural example unless already approved elsewhere. **Do not invent final biography content.** Use the actual approved content supplied for the page.

The large statement should carry most of the visual weight.

Do not turn this into a résumé introduction.

---

# 7. One Personal Image

Use **exactly one provided personal image**.

Do not create:

- Image gallery
- Multiple portraits
- Decorative image cards
- Generated replacement imagery

The image should feel editorial, not like a profile-card component.

Conceptually:

```text
┌─────────────────────────────┐
│                             │
│       PERSONAL IMAGE        │
│                             │
└─────────────────────────────┘
```

Use a meaningful size.

Do not add:

- Card background
- Shadow
- Glass
- Decorative frame
- Unnecessary border

Default image radius:

```css
border-radius: 0;
```

Preserve the supplied image's natural composition and avoid unwanted cropping.

---

# 8. Hero Layout

Desktop should use an editorial asymmetric composition.

Conceptually:

```text
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  01 — WHO I AM                                           │
│                                                          │
│  LARGE STATEMENT                    PERSONAL IMAGE       │
│  LARGE STATEMENT                    PERSONAL IMAGE       │
│  LARGE STATEMENT                    PERSONAL IMAGE       │
│                                                          │
│  supporting copy                                         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Use the existing grid/container system.

Do not invent arbitrary fixed-width columns.

The exact final positioning should be determined by the project's established layout tokens.

---

# 9. Intro Motion

Reuse the existing page/section reveal animation.

Do not create a second reveal system.

A restrained sequence is enough:

```text
eyebrow
  ↓
large statement
  ↓
supporting copy
  ↓
image
```

Use transform/opacity-based animation.

Do not animate every word or element unnecessarily.

---

# 10. Existing Buttons and Hover Effects

If a CTA is needed, **reuse an existing project button**.

Do not create:

```text
AboutButton.tsx
CircleButton.tsx
SocialButton.tsx
```

if an existing component already handles it.

Reuse:

- existing MagneticButton
- magnetic behavior
- elastic release
- existing hover fill
- existing easing
- existing responsive behavior

The already-created circular `About me` button and its magnetic/elastic system must remain the source of truth.

Do not rebuild magnetic physics.

Do not introduce a new animation library.

---

# 11. Do Not Add a Redundant About CTA

The circular `About me` button is primarily the Home → About CTA.

On the dedicated About page, do not add another unnecessary:

```text
About me →
```

button.

The Navbar and social links already provide navigation.

Do not add:

```text
← Back home
```

unless the existing site architecture already uses it consistently.

---

# 12. Section 02 — CURRENTLY

This section answers:

> What is Rohit doing right now?

Use:

```text
02 — CURRENTLY
```

Then keep the content concise.

Possible structure:

```text
BUILDING

[Current project]


EXPLORING

AI · agentic systems · interactive experiences


LEARNING

[Current area]
```

Use the actual current information supplied by the project/user.

Do not invent projects, interests, or activities.

If there is only one meaningful current item, show one. Do not add filler categories.

---

# 13. Currently Layout

Use editorial typography, not cards.

For example:

```text
02 — CURRENTLY


Building                  TripVerse

Exploring                 AI · agentic systems

Learning                  ...
```

or a stacked version if that fits the existing grid better.

Do NOT create:

```text
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Building │ │Exploring │ │ Learning │
└──────────┘ └──────────┘ └──────────┘
```

No card grid.

No shadows.

No glass.

No unnecessary rounded containers.

---

# 14. Section 03 — ELSEWHERE

Keep this extremely simple.

```text
03 — ELSEWHERE


GitHub ↗
LinkedIn ↗
X ↗
Email ↗
```

Only include social links that actually exist.

Prefer a horizontal arrangement on desktop:

```text
GitHub ↗    LinkedIn ↗    X ↗    Email ↗
```

Stack naturally on smaller screens.

---

# 15. Social Hover

Reuse the project's existing link hover interaction.

Do not create new:

- underline animations
- magnetic effects
- icon effects
- cursor effects
- color blobs

unless the repository already has them as reusable primitives.

---

# 16. Dividers

If the reference composition uses subtle horizontal rules, use the project's existing divider/hairline style and border token.

Do not introduce a new gray.

Do not divide every small content item.

Use dividers only where they help structure the major sections.

---

# 17. Spacing

Use existing section/container spacing and fluid `clamp()` tokens.

Do not introduce arbitrary large magic numbers.

The page should have substantial whitespace.

The emptiness is intentional.

---

# 18. Footer

Reuse the existing Footer exactly.

Do not create a custom About footer.

Do not modify the global Footer for this page.

---

# 19. Responsive Behavior

The page must be deliberately responsive.

### Desktop

- Large typography
- Asymmetric composition
- Multi-column layout
- Large image
- Generous whitespace

### Tablet

Reduce:

- Typography scale
- Column gap
- Image size
- Section spacing

### Mobile

Compose vertically:

```text
01 — WHO I AM

large statement

supporting paragraph

personal image


02 — CURRENTLY

...


03 — ELSEWHERE

...
```

Do not simply shrink the desktop layout.

The image remains present on mobile unless there is a genuine performance reason to hide it.

---

# 20. Motion on Mobile

Reduce complex motion where appropriate.

Important information must never depend on hover.

Respect the project's existing MotionProvider and reduced-motion behavior.

---

# 21. Accessibility

Use semantic HTML:

```text
<main>
<section>
<h1>
<h2>
<p>
<nav>
<a>
```

Requirements:

- One clear page `<h1>`
- Logical heading hierarchy
- Meaningful image alt text
- Keyboard-accessible links
- Visible focus states
- Good contrast
- Reduced-motion support

Do not make interaction dependent on magnetic effects.

---

# 22. No New Dependencies

Do not add:

- Animation libraries
- UI libraries
- Carousel libraries
- Icon libraries
- Font libraries

Use the project's existing stack.

---

# 23. Component Structure

A reasonable structure is:

```text
About
├── existing Navbar
├── AboutIntro
│   ├── SectionEyebrow
│   ├── IntroStatement
│   ├── IntroDescription
│   └── PersonalImage
├── Currently
│   ├── SectionEyebrow
│   └── CurrentContent
├── Elsewhere
│   ├── SectionEyebrow
│   └── SocialLinks
└── existing Footer
```

Do not over-componentize tiny wrappers.

Use meaningful component names.

---

# 24. Content Architecture

If the project already has a personal/site content data source, reuse it.

Otherwise keep About content in a small dedicated data structure rather than scattering strings through JSX.

Conceptually:

```ts
export const aboutContent = {
  intro: {
    heading: "...",
    description: "...",
    image: "...",
  },

  currently: {
    building: "...",
    exploring: "...",
    learning: "...",
  },

  socials: [
    ...
  ],
};
```

Do not invent final content.

---

# 25. Do Not Modify Other Pages

Only modify the About page and genuinely necessary shared components.

Do not redesign:

- Home
- Work
- Gallery
- Contact
- Navbar
- Footer

unless a shared component requires a compatibility fix.

---

# 26. Visual Restraint

This page is **not an animation showcase**.

Do not add:

- Floating blobs
- Particles
- Cursor trails
- WebGL
- Parallax everywhere
- Animated gradients
- Excessive text effects
- Magnetic effects on every link
- Image distortion
- Infinite marquees

Use the existing interaction language sparingly.

---

# 27. Final Visual Blueprint

The page should approximately feel like:

```text
ABOUT


01 — WHO I AM


I build things
for the web.

Short personal description.


                         ┌───────────────┐
                         │               │
                         │  ROHIT IMAGE  │
                         │               │
                         └───────────────┘


────────────────────────────────────────────────────


02 — CURRENTLY


Building        ...
Exploring       ...
Learning        ...


────────────────────────────────────────────────────


03 — ELSEWHERE


GitHub ↗    LinkedIn ↗    X ↗    Email ↗


FOOTER
```

This is a composition guide, not a literal layout.

Use the existing project grid and responsive system for final positioning.

---

# 28. Absolute Requirements

- [ ] Dedicated `/about` page.
- [ ] Existing Navbar reused.
- [ ] Existing Footer reused.
- [ ] Existing design tokens reused.
- [ ] Satoshi reused.
- [ ] Existing light-world palette reused.
- [ ] No gradients.
- [ ] No glassmorphism.
- [ ] No unnecessary rounded cards.
- [ ] No awards.
- [ ] No experience timeline.
- [ ] No résumé section.
- [ ] No skills grid.
- [ ] No AI chatbot.
- [ ] No voice/audio system.
- [ ] Exactly one personal image.
- [ ] Image remains editorial and unboxed.
- [ ] Three content areas only: Who I Am, Currently, Elsewhere.
- [ ] Existing buttons reused where appropriate.
- [ ] Existing magnetic/elastic effects reused.
- [ ] Existing hover effects reused.
- [ ] No new button implementation.
- [ ] No new animation library.
- [ ] Responsive desktop/tablet/mobile composition.
- [ ] Reduced-motion support.
- [ ] Keyboard accessibility.
- [ ] Semantic HTML.
- [ ] No unrelated page changes.

---

# Final Instruction

Build the About page as a **quiet, editorial personal profile**, not a résumé.

The page should answer only:

> **Who is Rohit?**  
> **What is Rohit doing now?**  
> **Where can I find Rohit?**

Everything else should be removed.

Use the project's **predefined design system and existing components as the source of truth**. Extend existing patterns instead of inventing new ones.

Reuse the already-created buttons, magnetic/elastic effects, hover interactions, typography, motion, spacing, Navbar, Footer, and page transitions.

The final feeling should be:

> **One person. One image. Three pieces of information. Lots of space.**
