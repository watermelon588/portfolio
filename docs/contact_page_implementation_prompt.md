# Contact Page — Exact Implementation Prompt

## Objective

Rebuild the **Contact page** shown in the provided reference video as a native page inside the existing portfolio.

The reference video is the visual and interaction target.

This is **not** an instruction to redesign the portfolio.

The goal is to reproduce the contact-page experience from the video while fitting it perfectly into the existing codebase and design system.

### Critical constraint

**DO NOT TOUCH ANYTHING ELSE.**

Only make the changes required for the Contact page.

Do not modify:

- other project pages
- existing project layouts
- homepage
- about page
- work/project cards
- global typography
- global colors
- global spacing system
- existing navbar behavior
- existing footer behavior
- existing buttons
- existing animation utilities
- existing cursor system
- existing components

unless absolutely necessary to register/connect the Contact page.

If something already exists, **reuse it instead of rebuilding it.**

---

# 1. FIRST — READ THE REPOSITORY DOCUMENTATION

Before writing or modifying code, inspect the repository.

Read **all relevant `.md` documentation files**, especially:

```text
design.md
```

and any documentation covering:

- page structure
- typography
- layout
- navigation
- buttons
- interactions
- animation
- responsive behavior
- existing components
- portfolio architecture
- routing
- contact/about/work pages
- previous implementation instructions

Also inspect the existing implementations of:

- About page
- Work/project pages
- SkyGuide page
- Neuron page
- any existing Contact page
- Navbar
- Footer
- buttons
- magnetic interactions
- cursor interactions
- menu interactions
- page transitions

Do not start implementation until the existing design language and reusable components have been understood.

---

# 2. ANALYSE THE REFERENCE VIDEO BEFORE IMPLEMENTING

The supplied reference video is approximately **38 seconds**, showing a dark editorial portfolio contact page.

The visual language is:

- extremely minimal
- dark charcoal/near-black background
- white/off-white typography
- thin horizontal dividers
- generous whitespace
- editorial typography
- asymmetric two-column composition
- very little decoration
- tiny numbered labels
- subtle interaction feedback
- compact navigation
- compact contact/social information

The page should feel like a **premium creative developer/design portfolio**, not a conventional SaaS contact form.

---

# 3. REFERENCE VIDEO — OBSERVED STRUCTURE

The video clearly establishes the following composition.

## Overall desktop layout

The page is divided into two primary areas:

```text
LEFT / MAIN CONTENT
                         RIGHT / CONTACT DETAILS
```

The left side contains:

- large headline
- contact form
- numbered form questions

The right side contains:

- small profile/avatar image
- contact details
- personal/company information
- social links

The top navigation remains compact and editorial.

---

# 4. TOP NAVIGATION

At the top of the page, retain the existing portfolio navigation system.

The reference composition contains:

```text
small brand/logo at top-left

Work     About     Contact
```

with a compact circular menu control toward the upper-right.

### IMPORTANT

Do **not** recreate the navbar.

Use the existing Navbar component.

If the existing navbar already has:

- menu button
- magnetic interaction
- active page treatment
- cursor behavior
- mobile menu
- page transition

reuse all of it.

Only configure the Contact route/active state if necessary.

---

# 5. PAGE BACKGROUND

Use the existing portfolio background/design tokens.

The reference is approximately:

```text
deep charcoal / near-black
```

It is NOT pure black.

Do not introduce a new background color system.

Use the same global design variables already used by the portfolio.

No:

- gradients
- glassmorphism
- cards
- glowing backgrounds
- decorative blobs
- excessive shadows

The page is intentionally flat and editorial.

---

# 6. HERO — PRIMARY CONTACT MESSAGE

The opening viewport should immediately show a large editorial heading on the left.

Reference wording:

```text
Let's start a
project together
```

Use exactly this unless the repository's design/content documentation specifies a different approved copy.

The heading should be:

- large
- light/regular weight
- tightly composed
- left aligned
- approximately 2–3 lines on desktop
- visually dominant
- vertically positioned around the upper-middle portion of the page

Do not make it enormous like a landing-page hero.

It should feel like a contact invitation rather than a marketing headline.

---

# 7. SMALL PROFILE IMAGE / AVATAR

Near the hero headline, the reference shows a small circular portrait/avatar.

Place the existing portfolio/profile image here if one exists.

### Rules

- use an existing asset
- do not generate a new portrait
- do not redesign the image
- preserve its quality
- keep it relatively small
- use a subtle circular crop only if that matches the existing asset/design
- do not turn it into a large profile card

The avatar acts as a human touch beside the headline.

It should remain visually secondary to the heading.

---

# 8. HERO → FORM TRANSITION

The reference page does not use a large boxed form.

Instead, the form begins naturally below the headline using:

```text
01
────────────────────────────
What's your name?
John Doe
```

Then:

```text
02
────────────────────────────
What's your email?
john@doe.com
```

Then:

```text
03
────────────────────────────
What's the name of your organization?
John & Doe
```

Then:

```text
04
────────────────────────────
What services are you looking for?
Web Design, Web Development...
```

Then:

```text
05
────────────────────────────
Your message
Hello Dennis, can you help me with...
```

The exact labels should follow the reference unless existing project requirements specify approved wording.

---

# 9. FORM DESIGN

This is one of the most important parts of the implementation.

The form must NOT look like:

```text
label
[large rounded input box]
```

Instead, use the editorial form structure shown in the reference.

Each field is:

```text
small number
+
question
+
subtle value/input
+
thin horizontal divider
```

Example:

```text
01      What's your name?
        John Doe
────────────────────────────────────
```

The input itself should visually disappear into the page.

No large borders around individual fields.

No rounded input containers.

No heavy background fills.

No giant input boxes.

---

# 10. FORM FIELD TYPOGRAPHY

Question:

- small-to-medium
- white/off-white
- readable
- regular weight

Input/value:

- slightly muted
- smaller
- subdued
- becomes brighter when active/focused

Number:

```text
01
02
03
04
05
```

Keep the number small and understated.

Use existing typography tokens.

Do not introduce a new font.

---

# 11. FORM INTERACTION — MATCH THE VIDEO

The reference video shows actual interaction with the form.

When a field is focused:

- the cursor appears naturally
- the field becomes active
- the typed content appears inline
- browser/autocomplete behavior can remain native
- surrounding visual hierarchy remains unchanged

Do not create a giant animated focus state.

The interaction should be subtle.

---

# 12. INPUT BEHAVIOR

Use real semantic HTML inputs/textareas.

Recommended mapping:

### Field 01

```text
Name
```

Use:

```html
<input type="text">
```

### Field 02

```text
Email
```

Use:

```html
<input type="email">
```

### Field 03

```text
Organization
```

Use:

```html
<input type="text">
```

### Field 04

```text
Services
```

Use:

```html
<input type="text">
```

or the existing approved form component if one exists.

### Field 05

```text
Message
```

Use:

```html
<textarea>
```

Do not fake inputs with divs.

---

# 13. PLACEHOLDER / VALUE STYLING

When empty, the field should show subtle placeholder copy.

For example:

```text
John Doe
john@doe.com
John & Doe
Web Design, Web Development...
Hello Dennis, can you help me with...
```

Use muted text.

On focus:

- do not dramatically enlarge
- do not add a thick border
- do not add a colored box
- maintain the same editorial line

---

# 14. RIGHT-SIDE CONTACT DETAILS

The right side of the page remains visible while the user moves through the form.

The reference contains a compact information block similar to:

```text
CONTACT DETAILS

info@...
+31 ...

Dennis ...
CoC: ...
VAT: ...
Location: The Netherlands
```

and a social section:

```text
SOCIALS

Awards
Instagram
Twitter
LinkedIn
```

### IMPORTANT

Do not blindly copy the reference person's real contact details.

Use the portfolio owner's actual approved contact information already present in the repository.

Search the project for existing:

- email
- phone
- location
- social links
- LinkedIn
- GitHub
- Instagram
- Twitter/X
- other approved links

If those already exist in a shared data/config file, reuse them.

Do not invent contact information.

---

# 15. RIGHT COLUMN POSITIONING

The right column should be visually compact.

It should NOT become a large sidebar card.

Use something approximately like:

```text
                    CONTACT DETAILS
                    ───────────────

                    email
                    phone

                    name / company
                    registration info
                    location

                    SOCIALS
                    ───────
                    ...
```

The information should sit comfortably in the upper/middle-right portion of the viewport.

The left column carries the emotional weight.

The right column carries factual information.

---

# 16. RESPONSIVE BEHAVIOR

Desktop is the primary target.

The reference is clearly designed around a wide desktop composition.

For mobile:

```text
headline
avatar
form
contact details
socials
```

should stack naturally.

Do not try to force the desktop two-column layout onto a narrow phone.

Use existing responsive breakpoints.

Do not create a new breakpoint system.

---

# 17. PAGE HEIGHT / SCROLLING

The contact page should be tall enough for the entire form.

The reference video shows the user scrolling through the form and later returning toward the upper part of the page.

The form should therefore naturally extend beyond the first viewport.

Do NOT force everything into `100vh`.

Do NOT hide the lower fields.

Do NOT crop the page.

The page should scroll naturally.

---

# 18. SCROLL EXPERIENCE

The reference interaction is intentionally simple.

Use the existing smooth-scroll system if the portfolio already has one.

Use existing:

- Lenis
- GSAP
- ScrollTrigger
- reveal utilities

if already available.

Do not install another scrolling library.

Do not create a new scroll engine.

---

# 19. HERO TEXT ANIMATION

On initial page load, the heading may use the same subtle entrance animation already used elsewhere in the portfolio.

Recommended:

```text
opacity: 0 → 1
small upward movement
```

Use the existing reveal implementation.

No:

- bouncing
- rotating letters
- typing effect
- aggressive stagger
- text scrambling

The reference is calm.

---

# 20. FORM REVEAL

The form can subtly reveal as it enters the viewport.

Each row may appear with a small vertical/opacity transition.

But keep it extremely subtle.

Example:

```text
opacity: 0
y: 15px

→

opacity: 1
y: 0
```

Use existing animation utilities where possible.

---

# 21. DIVIDERS

Thin horizontal rules are an important part of the visual language.

Use the existing divider/stripe styles if available.

The divider should be:

- extremely thin
- low contrast
- full width of the form row
- aligned with the form grid

Do not make them bright white.

Do not turn them into card borders.

---

# 22. FORM GRID

Desktop form row can follow:

```text
[01] [question / input]
```

with the number occupying a small fixed column.

For example:

```text
01        What's your name?
          John Doe
```

The right side contact column should remain separate.

Do not use a conventional centered form.

The asymmetry is part of the design.

---

# 23. CONTACT CTA / SUBMIT BUTTON

The reference does not rely on a conventional giant:

```text
SEND MESSAGE
```

button dominating the page.

If a submit CTA is needed:

**reuse an existing portfolio button.**

Use existing:

- pill button
- round button
- magnetic button
- arrow interaction

Do not create a new button style.

The submit action should feel like part of the existing portfolio system.

---

# 24. BUTTON INTERACTION

If the existing portfolio has magnetic interaction:

reuse it.

If it has:

- arrow movement
- hover fill
- circular expansion
- cursor response

reuse the same behavior.

Do not create a one-off contact-page interaction.

The current portfolio already contains magnetic/button patterns, so use them.

---

# 25. MENU INTERACTION

The reference video shows interaction with the compact circular menu control.

At approximately the later portion of the reference:

- the circular control becomes visually active
- the button changes state/color
- the interaction feels responsive
- the page remains minimal

Do NOT recreate the menu system.

Use the existing Navbar/menu implementation.

If the current Navbar already provides the same interaction, simply ensure the Contact page uses it correctly.

---

# 26. VISUAL HIERARCHY

The page should have exactly this hierarchy:

```text
1. CONTACT HEADLINE
        ↓
2. SMALL HUMAN AVATAR
        ↓
3. FORM QUESTIONS
        ↓
4. CONTACT DETAILS
        ↓
5. SOCIAL LINKS
```

Do not introduce additional visual sections unless the existing documentation requires them.

---

# 27. DO NOT ADD GENERIC CONTACT-PAGE ELEMENTS

Do NOT automatically add:

- map
- huge CTA section
- FAQ
- testimonials
- contact cards
- office photos
- decorative illustrations
- animated gradient
- giant social icons
- newsletter
- newsletter signup
- newsletter card
- location map
- calendar embed

unless explicitly present in the repository/design documentation.

The reference is deliberately minimal.

---

# 28. DESIGN LANGUAGE

The final page should feel:

- editorial
- premium
- personal
- restrained
- technical
- confident
- quiet

Think:

```text
creative developer portfolio
+
studio contact page
+
minimal editorial form
```

Not:

```text
startup landing page
+
SaaS dashboard
+
generic contact template
```

---

# 29. COLORS

Follow `design.md` and the existing design tokens.

Expected visual relationship:

```text
Background:
deep charcoal / near-black

Primary text:
white / off-white

Secondary text:
muted gray

Dividers:
very subtle gray

Interactive accent:
use the existing portfolio accent color
```

Do not introduce a new accent color.

The reference contains a brief bright accent state on the circular menu interaction; reproduce that through the existing interaction system rather than inventing a new color token.

---

# 30. TYPOGRAPHY

Use the existing portfolio font.

Do NOT:

- import another font
- use system fallback unnecessarily
- create a custom contact-page font stack

Match:

- heading weight
- body weight
- letter spacing
- line height
- uppercase labels
- small metadata

from the existing design system.

---

# 31. CONTENT SOURCE

Contact details should come from the repository.

Search for:

```text
email
phone
location
social
github
linkedin
instagram
twitter
contact
profile
```

Reuse existing data.

Do not duplicate contact information into multiple hard-coded locations if a shared source already exists.

---

# 32. ROUTING

Create/connect the Contact route using the existing router.

Do not change unrelated routes.

Do not rename:

- Work
- About
- project routes
- home routes

The Contact page should become the destination of the existing Contact navigation item.

---

# 33. COMPONENT REUSE — MANDATORY

Before creating any component, search for an existing equivalent.

Reuse:

```text
Navbar
Footer
Button
MagneticButton
BackButton
CustomCursor
page transition
scroll system
form/input primitives
avatar/profile component
social links
reveal animation
```

if they already exist.

Do not duplicate them.

If there is already an existing Contact page skeleton, improve/use it rather than replacing the entire architecture.

---

# 34. CSS SCOPE

If Contact-specific CSS is required, scope it.

Use names such as:

```css
.contact-page
.contact-hero
.contact-form
.contact-form-row
.contact-form-number
.contact-form-question
.contact-form-input
.contact-details
.contact-socials
```

Do NOT use generic global selectors like:

```css
.hero
.form
.input
.row
.button
.card
```

Do not change global CSS unless absolutely necessary.

---

# 35. ACCESSIBILITY

The form must remain accessible.

Each field needs:

- semantic label
- accessible name
- correct input type
- keyboard focus
- visible but subtle focus state
- autocomplete where appropriate

Do not sacrifice accessibility to reproduce the visual.

The visual label may be the visible question itself.

---

# 36. FORM SUBMISSION

If the repository already has a contact API/form submission mechanism:

**use it.**

Do not create a fake submission flow.

If no backend exists, preserve the existing intended behavior documented by the repository rather than inventing an API.

If submission is currently only visual/static, keep it consistent with the existing project architecture.

Do not introduce a new backend/service as part of this task.

---

# 37. REFERENCE VIDEO TIMELINE — VISUAL CHECKLIST

Use the reference video as a sequence to validate the result.

### 0–5 seconds

Expected:

- page at upper scroll position
- dark background
- large “Let's start a project together” heading
- small avatar
- first contact fields visible
- right contact details visible
- compact navbar

### 5–10 seconds

Expected:

- page has moved down
- form becomes the dominant visual
- upper heading moves out of focus
- numbered questions remain visible
- right-side contact information stays clean

### 10–20 seconds

Expected:

- interaction with name/email fields
- typed values appear naturally
- subtle focus states
- no layout jump
- no giant input container

### 20–25 seconds

Expected:

- continued form interaction
- editorial layout remains stable
- right-side contact block remains visually quiet

### 25–30 seconds

Expected:

- page returns toward the upper section
- hero heading becomes visible again
- original composition reappears naturally

### 30–35 seconds

Expected:

- lower form/social region is visible
- menu interaction is demonstrated
- circular menu control responds visually

### 35–38 seconds

Expected:

- page returns toward the opening composition
- hero remains visually dominant
- overall page stays minimal

Do not reproduce the exact mouse cursor movement.

Reproduce the **resulting UI behavior**.

---

# 38. IMPORTANT — DO NOT OVER-ANIMATE

This page is not an animation showcase.

The reference's quality comes from:

- typography
- whitespace
- alignment
- subtle transitions
- interaction details
- restraint

Avoid:

```text
parallax everywhere
floating objects
3D elements
particles
text scrambling
cursor trails
glows
gradient blobs
large transitions
```

Use motion only where it already exists in the portfolio system.

---

# 39. DESKTOP SPACING

Use the existing container and spacing tokens.

The approximate composition should feel like:

```text
┌──────────────────────────────────────────────────────────┐
│ logo                         Work About Contact       ○  │
│                                                          │
│                                                          │
│        Let's start a                         contact     │
│        project together                      details     │
│                                             socials      │
│                                                          │
│        01   What's your name?                            │
│             John Doe                                     │
│        ─────────────────────────                         │
│                                                          │
│        02   What's your email?                           │
│             john@doe.com                                 │
│        ─────────────────────────                         │
│                                                          │
│        ...                                               │
└──────────────────────────────────────────────────────────┘
```

This is a conceptual composition, not a request to hard-code pixel positions.

Use responsive CSS and the existing layout system.

---

# 40. DO NOT ABSOLUTELY POSITION EVERYTHING

The reference may visually appear highly composed.

Do not achieve it by putting every element at:

```css
position: absolute;
top: ...
left: ...
```

Build a robust responsive layout.

Use:

- grid
- flex
- normal document flow
- existing container system

Use absolute positioning only for genuinely decorative/overlay elements.

---

# 41. PAGE TRANSITION

Use the existing page transition/preloader system.

Do not create a new Contact-specific loading animation.

If the portfolio already has a preloader, ensure Contact uses the existing one.

---

# 42. FOOTER

If the existing site architecture places a Footer after the Contact page:

reuse it exactly.

Do not redesign the footer.

Do not create a Contact-specific footer.

If the reference video does not show the footer, that does not mean the global footer should be removed.

Follow the existing portfolio architecture.

---

# 43. FINAL VALIDATION — STRICT

Before considering the task complete:

## Documentation

- [ ] `design.md` was read.
- [ ] Relevant `.md` files were read.
- [ ] Existing Contact implementation was inspected.
- [ ] Existing Navbar was inspected.
- [ ] Existing buttons/interactions were inspected.
- [ ] Existing animation system was inspected.

## Visual

- [ ] Dark editorial background.
- [ ] Large left-side contact headline.
- [ ] Small profile/avatar image.
- [ ] Numbered form rows.
- [ ] Thin horizontal dividers.
- [ ] Compact right-side contact details.
- [ ] Social links on right.
- [ ] No unnecessary cards.
- [ ] No gradients.
- [ ] No excessive decoration.
- [ ] Correct typography.
- [ ] Correct spacing.
- [ ] Correct visual hierarchy.

## Interaction

- [ ] Real inputs.
- [ ] Keyboard accessible.
- [ ] Focus states are subtle.
- [ ] Typing works.
- [ ] Scrolling works.
- [ ] Existing smooth scroll is preserved.
- [ ] Existing magnetic interactions are preserved.
- [ ] Existing menu interaction is preserved.
- [ ] Existing cursor behavior is preserved.
- [ ] Existing page transitions are preserved.

## Responsive

- [ ] Desktop matches the reference composition.
- [ ] Tablet remains balanced.
- [ ] Mobile stacks correctly.
- [ ] No horizontal overflow.
- [ ] No cropped form fields.
- [ ] No hidden contact details.
- [ ] Avatar remains appropriately sized.

## Code safety

- [ ] No unrelated components changed.
- [ ] No global CSS rewritten.
- [ ] No existing buttons modified.
- [ ] No existing navbar redesign.
- [ ] No existing footer redesign.
- [ ] No other project page modified.
- [ ] No new dependency added unless absolutely necessary.
- [ ] No duplicate components created unnecessarily.

---

# 44. FINAL INSTRUCTION TO THE AGENT

**Do not interpret this as permission to refactor the project.**

This is a **surgical implementation task**.

Your workflow must be:

```text
READ ALL RELEVANT DOCS
        ↓
READ design.md CAREFULLY
        ↓
INSPECT EXISTING CONTACT / ABOUT / PROJECT PAGES
        ↓
INSPECT REUSABLE COMPONENTS
        ↓
INSPECT EXISTING BUTTON + MENU + ANIMATION SYSTEMS
        ↓
STUDY THE REFERENCE VIDEO
        ↓
IMPLEMENT CONTACT PAGE ONLY
        ↓
REUSE EVERYTHING POSSIBLE
        ↓
MATCH THE REFERENCE'S COMPOSITION
        ↓
TEST DESKTOP + MOBILE
        ↓
VERIFY NO OTHER FILE/COMPONENT WAS UNNECESSARILY CHANGED
```

The final result should feel like the reference page **belongs to this portfolio from day one**.

It should not look like a copied template.

It should not look like a generic AI-generated contact page.

It should look like the existing portfolio's own Contact page — with the **same design language, same interactions, same components, and same level of restraint**, while closely matching the supplied reference video's composition and behavior.

## Absolute rule

> **MAKE THE CONTACT PAGE. DO NOT TOUCH ANYTHING ELSE.**
