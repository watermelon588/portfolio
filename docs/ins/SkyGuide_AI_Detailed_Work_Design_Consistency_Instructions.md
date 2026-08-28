# SkyGuide AI --- Detailed Work Section

## Design Consistency & Reuse Instructions for the Implementation Agent

> **Primary instruction:** Build the new Detailed Work / Case Study
> experience by **reusing the website's existing design system,
> components, buttons, reveal effects, hover interactions, typography,
> colors, spacing rules, and responsive behavior**.
>
> **Do NOT rebuild these primitives from scratch.**
>
> The reference should influence the **layout, composition, sequencing,
> and storytelling**, but it must **not introduce a second visual
> language** into the website.

------------------------------------------------------------------------

# 1. Non-Negotiable Rule

The Detailed Work section must look like it has always belonged to the
existing SkyGuide portfolio.

The implementation should feel like:

``` text
EXISTING WEBSITE DESIGN SYSTEM
            +
REFERENCE'S CASE-STUDY COMPOSITION
            =
NATIVE SKYGUIDE CASE STUDY
```

It must NOT become:

``` text
EXISTING WEBSITE
       +
NEW CASE STUDY DESIGN SYSTEM
       =
TWO DIFFERENT WEBSITES
```

If an existing component already solves a visual problem, **use it**.

If an existing animation already exists, **reuse it**.

If an existing button already exists, **use it unchanged or extend it
minimally**.

Do not create a visually similar replacement just because it is easier
to code.

------------------------------------------------------------------------

# 2. First Step --- Audit Before Coding

Before creating any new component, inspect the existing frontend.

The agent must identify:

### Existing UI primitives

``` text
Buttons
Links
Navigation
Cards
Images
Media containers
Section wrappers
Headings
Labels
Badges
Dividers
Modals
Tooltips
Loaders
Toast
Cursor interactions
```

### Existing motion primitives

Look specifically for:

``` text
Curvy edge reveals
Image reveals
Clip-path animations
Hover transitions
Magnetic buttons
Cursor-following elements
Scroll reveals
GSAP timelines
Framer Motion animations
Page transitions
Text reveals
Parallax
Scale transitions
```

### Existing design tokens

Find the actual source of truth for:

``` text
background colors
foreground colors
muted colors
accent colors
font family
font weights
font sizes
border colors
border widths
radii
shadows
spacing
breakpoints
animation durations
easing functions
```

Do not guess these values.

------------------------------------------------------------------------

# 3. Existing Design System Is the Source of Truth

The case-study page must inherit the site's existing design tokens.

If the project already defines:

``` css
--background
--foreground
--muted
--accent
--border
--spacing-*
```

use those variables.

Do NOT create:

``` css
--case-study-background
--case-study-accent
--case-study-blue
--case-study-gray
```

unless there is a genuine semantic requirement.

The case study should consume the global system.

------------------------------------------------------------------------

# 4. Color Consistency

The entire website should feel like one product.

Therefore:

### DO

Use the existing:

``` text
background
surface
foreground
muted text
accent
border
hover
active
```

values.

### DO NOT

Introduce a new palette specifically for the case study.

For example, do not do this:

``` css
.case-study {
    background: #080808;
}

.case-study-button {
    background: #5d63ff;
}

.case-study-text {
    color: #ededed;
}
```

if the website already has equivalent tokens.

Instead:

``` css
.case-study {
    background: var(--background);
}

.case-study-button {
    background: var(--accent);
}

.case-study-text {
    color: var(--foreground);
}
```

The exact implementation should follow the existing project's actual
token names.

------------------------------------------------------------------------

# 5. Typography Consistency

The Detailed Work page must use the **same typography system as the rest
of the website**.

Do not introduce:

``` text
another font
another heading style
another letter-spacing system
another paragraph width convention
another button font
```

If the website uses Satoshi, use Satoshi.

If the existing site already has heading classes/components, reuse them.

The hierarchy should be established using the existing typography scale
wherever possible.

For example:

``` text
existing display heading
existing section heading
existing body
existing metadata
existing caption
```

Do not create arbitrary values for every heading.

------------------------------------------------------------------------

# 6. Text Color Hierarchy

Use the same hierarchy throughout the site:

``` text
Primary
↓
Secondary
↓
Muted
↓
Disabled
```

The case study should not suddenly make all text pure white.

Use the existing opacity/token system.

For example:

``` text
Primary:
existing foreground token

Secondary:
existing secondary token

Metadata:
existing muted token

Borders:
existing border token
```

The reference's editorial aesthetic should come from **scale and
spacing**, not from inventing new colors.

------------------------------------------------------------------------

# 7. Existing Buttons --- MUST REUSE

This is one of the most important requirements.

The website already has designed buttons.

The agent must **reuse those buttons**.

Do NOT create a new button implementation such as:

``` jsx
<button className="case-study-button">
```

with independently invented:

``` text
border-radius
padding
font
hover
background
transition
shadow
```

if an existing Button component exists.

Instead:

``` jsx
<Button>
    View Project
</Button>
```

or the project's equivalent.

------------------------------------------------------------------------

# 8. Button Variants

If the existing button system has variants:

``` text
primary
secondary
outline
ghost
icon
magnetic
```

choose the closest existing variant.

If the reference has a circular interaction that does not map directly
to an existing button, create **only a thin composition wrapper around
the existing primitive**.

Example:

``` jsx
<FloatingAction>
    <Button variant="primary">
        Next Case
    </Button>
</FloatingAction>
```

The interaction wrapper can control position.

The actual button styling must remain consistent with the site's
established language.

------------------------------------------------------------------------

# 9. Existing Curvy Edge Reveal --- REUSE EXACTLY

The website already contains a **curvy-edge reveal effect** matching the
reference.

This must be treated as an existing design primitive.

Do NOT rebuild it with a new:

``` text
SVG
clip-path
border-radius
mask
GSAP timeline
```

unless absolutely required.

Find the existing implementation and reuse it.

Example:

``` jsx
<CurvyReveal>
    <CaseStudySection />
</CurvyReveal>
```

Use the project's actual component/API.

The same reveal should appear visually identical to existing website
transitions.

------------------------------------------------------------------------

# 10. Existing Hover Effects --- REUSE

The website already has hover interactions.

These are part of the site's identity.

Do not invent new hover behavior for every case-study element.

For example, if existing project cards use:

``` text
image movement
border transition
text movement
opacity shift
cursor effect
```

the Detailed Work media should use the same interaction language where
appropriate.

Avoid:

``` css
.case-study-image:hover {
    transform: scale(1.12);
    filter: brightness(1.2);
}
```

if this creates a new interaction style.

Instead reuse the existing hover utility/component.

------------------------------------------------------------------------

# 11. Do Not Duplicate Existing Animation Logic

Before writing:

``` javascript
gsap.to(...)
```

or:

``` javascript
motion.div
```

check whether the project already has an equivalent animation.

The goal is:

``` text
ONE DESIGN SYSTEM
ONE MOTION LANGUAGE
ONE SET OF PRIMITIVES
```

not:

``` text
GLOBAL ANIMATIONS
+
CASE STUDY ANIMATIONS
+
REFERENCE-SPECIFIC ANIMATIONS
```

------------------------------------------------------------------------

# 12. Reference Matching Should Happen at the Composition Level

The reference should influence:

``` text
section order
media scale
whitespace
scroll rhythm
visual storytelling
case-study pacing
image composition
project narrative
```

It should NOT cause us to replace:

``` text
buttons
fonts
colors
hover effects
reveal effects
navigation
spacing tokens
interaction primitives
```

This distinction is critical.

------------------------------------------------------------------------

# 13. Spacing --- Follow the Existing System

Do not randomly assign:

``` css
margin-top: 173px;
padding-bottom: 217px;
gap: 83px;
```

throughout the page.

First identify the website's existing spacing scale.

For example:

``` text
space-1
space-2
space-3
space-4
space-5
space-6
```

or whatever system the project uses.

Then compose the case study from those values.

The page can have **larger editorial spacing** than other pages, but it
must still be mathematically related to the existing system.

------------------------------------------------------------------------

# 14. Spacing Philosophy

The reference relies heavily on whitespace.

Reproduce that through consistent spacing rather than arbitrary empty
margins.

Preferred structure:

``` text
section
↓
existing large spacing token
↓
heading
↓
existing content spacing
↓
media
↓
existing large spacing token
↓
next section
```

Avoid:

``` text
random margin overrides
negative margins everywhere
absolute-positioned spacing hacks
viewport-specific magic numbers
```

------------------------------------------------------------------------

# 15. Container Width

The Detailed Work section should use the existing site's container/grid
system.

If the website already has:

``` css
.container
.page-container
.max-width
.content-grid
```

reuse it.

Do not create:

``` css
.case-study-container {
    max-width: 1487px;
}
```

unless the existing system genuinely cannot support the required
composition.

The reference's full-width visuals can still break out of the normal
text column using an existing full-bleed utility.

------------------------------------------------------------------------

# 16. Full-Bleed Media

For reference-style large imagery:

``` text
text
inside standard content width

media
may extend to viewport width
```

Implement this using the existing layout primitives.

Preferred:

``` jsx
<Section>
    <Container>
        <CaseStudyText />
    </Container>

    <FullBleed>
        <CaseStudyMedia />
    </FullBleed>
</Section>
```

rather than manually calculating:

``` css
width: 100vw;
margin-left: calc(-50vw + 50%);
```

everywhere.

------------------------------------------------------------------------

# 17. Image Reveal

If the site already has an image reveal component, use it.

The case study should feel visually connected to the rest of the
portfolio.

The desired relationship is:

``` text
Existing Image Reveal
        ↓
Existing Curvy Edge
        ↓
Case Study Image
```

not:

``` text
New Case Study Image Animation
        ↓
New Mask
        ↓
New Easing
        ↓
New Reveal
```

------------------------------------------------------------------------

# 18. Hover Effects on Media

Reuse the website's existing image hover behavior.

If the existing system already supports:

``` text
image scale
cursor interaction
overlay
caption reveal
movement
```

use the existing behavior.

Do not make the case-study images excessively interactive.

The reference is editorial.

The content should remain the focus.

------------------------------------------------------------------------

# 19. Cursor / Magnetic Interactions

If the existing portfolio has a magnetic cursor or cursor-following
button, reuse it.

Do not create a second cursor system.

There must never be two competing cursor interaction implementations.

Use:

``` text
existing cursor
+
existing magnetic interaction
+
new content
```

not:

``` text
existing cursor
+
case-study cursor
```

------------------------------------------------------------------------

# 20. Navigation

The case study should use the existing website navigation.

Do NOT create:

``` text
CaseStudyNavbar
```

unless the architecture genuinely requires a different navigation state.

If the current website has:

``` text
Navbar
Home
Work
About
Contact
```

the Detailed Work page should feel like the same site.

The reference's minimal navigation should be interpreted through the
existing navigation system.

------------------------------------------------------------------------

# 21. Page Transition

If the existing website already has a page transition:

``` text
route transition
curtain
curvy reveal
fade
mask
```

use it.

Do not create a second route-transition animation specifically for
SkyGuide.

------------------------------------------------------------------------

# 22. Component Reuse Priority

When implementing a new element, follow this decision tree:

``` text
Does an existing component solve this?
        │
       YES
        ↓
     REUSE IT
        │
       NO
        ↓
Does an existing primitive support a variant?
        │
       YES
        ↓
     EXTEND IT
        │
       NO
        ↓
Can a small wrapper compose existing primitives?
        │
       YES
        ↓
     COMPOSE IT
        │
       NO
        ↓
Create the smallest new primitive necessary.
```

The last option should be rare.

------------------------------------------------------------------------

# 23. Do Not Modify Existing Components Unnecessarily

Do not change a global button because the case study needs slightly
different spacing.

Do not change the global navbar because the case study needs different
placement.

Do not change the global typography system because one heading needs to
be larger.

Prefer local composition:

``` text
existing primitive
+
case-study layout wrapper
```

instead of modifying the primitive globally.

This prevents regressions.

------------------------------------------------------------------------

# 24. Avoid One-Off CSS

Do not fill the stylesheet with:

``` css
.case-study-title-1
.case-study-title-2
.case-study-special-button
.case-study-final-button
.case-study-image-hover-2
.case-study-mobile-fix
```

If the same styling concept appears more than once, it should probably
be:

``` text
existing token
existing component
existing utility
or
small reusable case-study primitive
```

------------------------------------------------------------------------

# 25. Responsive Design Must Match the Existing Website

Do not create an independent breakpoint system.

Reuse the project's existing:

``` text
mobile breakpoint
tablet breakpoint
desktop breakpoint
large desktop breakpoint
```

The case study should respond using the same rules as the rest of the
website.

Example:

``` text
Desktop:
large editorial composition

Tablet:
same composition simplified

Mobile:
single-column narrative
```

The visual hierarchy changes.

The design language does not.

------------------------------------------------------------------------

# 26. Mobile Rules

On mobile:

``` text
keep typography consistent
keep colors consistent
keep button style consistent
keep reveal style consistent
keep spacing proportional
```

Do NOT:

``` text
invent mobile-specific colors
replace buttons
create a different animation language
add excessive rounded cards
```

The mobile page should feel like the same portfolio compressed
intelligently.

------------------------------------------------------------------------

# 27. Accessibility Must Survive the Reuse

Existing interaction components must remain accessible.

Ensure:

``` text
buttons remain keyboard accessible
links remain semantic
focus states remain visible
hover effects have non-hover equivalents
reduced motion is respected
images have alt text
```

Do not replace semantic buttons with:

``` html
<div onClick={...}>
```

just to reproduce a visual effect.

------------------------------------------------------------------------

# 28. Technical Content Must Also Follow the Existing Text System

SkyGuide's technical content should be descriptive but visually
consistent.

Use the existing hierarchy:

``` text
eyebrow
heading
body
technical metadata
caption
```

For example:

``` text
REAL-TIME SYSTEMS

A distributed astronomy platform that separates application
orchestration from scientific computation.

React · Node.js · FastAPI · MongoDB · Socket.IO
```

Do not introduce documentation-style formatting everywhere.

The portfolio is still a visual case study.

------------------------------------------------------------------------

# 29. Technical Storytelling

The page should communicate SkyGuide's engineering without becoming a
README.

Recommended narrative:

``` text
WHAT IS IT?
        ↓
WHAT PROBLEM DOES IT SOLVE?
        ↓
HOW DOES THE SYSTEM WORK?
        ↓
HOW DOES THE USER INTERACT WITH IT?
        ↓
WHAT MAKES THE ENGINEERING INTERESTING?
        ↓
WHAT WAS SHIPPED?
```

The technical details should be attached to visual evidence.

------------------------------------------------------------------------

# 30. SkyGuide Architecture Presentation

Use the existing visual language to present:

``` text
React
   ↓
Node.js Gateway
   ↓
FastAPI Astro Engine
   ↓
MongoDB Atlas
```

and:

``` text
Phone
   ↓
Orientation Stream
   ↓
Socket.IO
   ↓
Alignment Engine
   ↓
Astrometric Ephemeris
   ↓
Guidance
```

Do not create a completely different diagram style from the rest of the
website.

If the website already has a visual treatment for technical diagrams,
reuse it.

Otherwise keep the diagram extremely minimal.

------------------------------------------------------------------------

# 31. SkyGuide Color Meaning

Color should remain semantic.

For example:

``` text
primary text
→ normal information

muted text
→ metadata

accent
→ interaction / active state / important data

green
→ only if the existing system already uses it for success/completion

red
→ only for errors
```

Do not use accent color as decoration everywhere.

The existing website should determine what colors mean.

------------------------------------------------------------------------

# 32. Avoid "Design Drift"

Before considering the page complete, compare it with three existing
pages:

``` text
Homepage
About
Existing Work / Project section
```

Check:

``` text
font
font weights
text colors
background
button appearance
hover behavior
reveal animation
section spacing
container width
navbar
footer
mobile behavior
```

If the new page looks like it belongs to a different designer, stop and
fix the inconsistency.

------------------------------------------------------------------------

# 33. Visual Reference Matching Checklist

The reference should be matched in:

### Composition

``` text
large hero
large media
editorial whitespace
alternating content
strong visual rhythm
large closing section
next-case transition
```

### Motion

``` text
smooth reveal
scroll progression
image movement
subtle scale
existing curvy reveal
existing hover
```

### Interaction

``` text
existing buttons
existing cursor
existing hover
existing transitions
existing navigation
```

### Identity

``` text
SkyGuide typography
SkyGuide colors
SkyGuide spacing
SkyGuide components
SkyGuide interaction language
```

------------------------------------------------------------------------

# 34. Implementation Architecture

Recommended structure:

``` text
SkyGuideCaseStudy/
│
├── SkyGuideCaseStudy.jsx
│
├── sections/
│   ├── Hero.jsx
│   ├── ProjectMeta.jsx
│   ├── ProductPreview.jsx
│   ├── Problem.jsx
│   ├── Architecture.jsx
│   ├── AstronomyEngine.jsx
│   ├── RecommendationEngine.jsx
│   ├── Alignment.jsx
│   ├── MobileCompanion.jsx
│   ├── ProductShowcase.jsx
│   ├── Engineering.jsx
│   ├── Production.jsx
│   ├── Result.jsx
│   └── NextCase.jsx
│
└── data/
    └── skyguideCaseStudy.js
```

These sections should **compose existing global components**.

Do not create a duplicate component library inside this folder.

------------------------------------------------------------------------

# 35. New Components Should Be Layout Components

Good new components:

``` text
CaseStudyHero
CaseStudySection
CaseStudyMedia
CaseStudyArchitecture
CaseStudyMetric
CaseStudyShowcase
```

Bad new components:

``` text
CaseStudyButton
CaseStudyNavbar
CaseStudyCard
CaseStudyHoverButton
CaseStudyReveal
CaseStudyCursor
```

if equivalent global components already exist.

------------------------------------------------------------------------

# 36. Motion Implementation Rule

Before adding an animation:

### Step 1

Search existing code.

``` text
grep/search:
reveal
hover
cursor
magnetic
clip-path
gsap
ScrollTrigger
motion
transition
```

### Step 2

Identify the existing implementation.

### Step 3

Reuse it.

### Step 4

Only add new motion when the reference requires behavior that genuinely
does not exist.

### Step 5

If adding new motion, use the same:

``` text
duration
easing
transform conventions
opacity conventions
reduced-motion behavior
```

as the existing system.

------------------------------------------------------------------------

# 37. Performance Rule

Do not add a heavy animation library if the website already has one.

For example:

``` text
Existing GSAP
→ use GSAP

Existing Framer Motion
→ use Framer Motion

Existing CSS transitions
→ use CSS
```

Do not introduce:

``` text
GSAP
+
Framer Motion
+
another animation library
```

just for the case study.

------------------------------------------------------------------------

# 38. Image Loading

Reuse existing image-loading behavior.

If the website already has:

``` text
blur-up
lazy loading
image component
Cloudinary transformation
responsive images
```

use those.

Do not create a second image pipeline.

The project already uses Cloudinary for persistent gallery imagery,
while the frontend deployment uses Vercel and the backend services run
on Render. The case study should respect the existing asset strategy
rather than introducing an unrelated storage mechanism.

------------------------------------------------------------------------

# 39. Existing Footer

The case study must use the existing footer.

Do not redesign the footer specifically for this page.

The final transition should flow naturally into the site's existing
footer or next-project system.

------------------------------------------------------------------------

# 40. Final "Next Case" Interaction

The reference's closing interaction can be recreated as a composition.

But:

``` text
existing button
existing hover
existing cursor
existing reveal
```

must remain the underlying system.

Only the layout and content should be new.

Example:

``` jsx
<NextCaseSection>
    <ExistingProjectLink>
        <ExistingButton>
            Next Case
        </ExistingButton>
    </ExistingProjectLink>
</NextCaseSection>
```

Use the actual project components instead of these placeholder names.

------------------------------------------------------------------------

# 41. Design QA Before Completion

The implementation agent MUST perform a consistency pass after building
the page.

Compare:

``` text
Homepage
About
Existing Work
SkyGuide Case Study
```

side by side.

Verify:

### Typography

``` text
same font
same weight behavior
same heading rhythm
same body text
same metadata
```

### Color

``` text
same background
same foreground
same muted
same accent
same borders
```

### Components

``` text
same buttons
same links
same navbar
same footer
same image treatment
```

### Motion

``` text
same reveal
same hover
same easing
same cursor
same page transition
```

### Layout

``` text
same container
same grid
same spacing scale
same breakpoints
```

------------------------------------------------------------------------

# 42. Anti-Pattern Examples

## ❌ Wrong

``` text
Reference:
minimal black portfolio

Implementation:
new black background
new blue accent
new rounded buttons
new cards
new hover effect
new cursor
new GSAP reveal
new navbar
```

This creates a second design system.

------------------------------------------------------------------------

## ✅ Correct

``` text
Existing SkyGuide Portfolio
          +
Reference-inspired case-study layout
          +
Existing buttons
          +
Existing curvy reveal
          +
Existing hover
          +
Existing typography
          +
Existing color tokens
          +
Existing spacing
```

------------------------------------------------------------------------

# 43. Most Important Agent Instruction

**DO NOT START BY WRITING CSS.**

Start by inspecting:

``` text
1. existing components
2. existing design tokens
3. existing animation utilities
4. existing button implementation
5. existing reveal implementation
6. existing hover implementation
7. existing layout/container system
8. existing responsive breakpoints
```

Then compose the new case study from those primitives.

The implementation should require **more composition than invention**.

------------------------------------------------------------------------

# 44. Definition of Done

The Detailed Work section is complete only when:

-   [ ] It follows the reference's editorial composition.
-   [ ] It uses the existing website navbar.
-   [ ] It uses the existing website footer.
-   [ ] It uses the existing button components.
-   [ ] It uses the existing curvy-edge reveal.
-   [ ] It uses the existing hover effects.
-   [ ] It uses the existing cursor/magnetic interaction if available.
-   [ ] It uses the existing typography.
-   [ ] It uses the existing color tokens.
-   [ ] It uses the existing spacing scale.
-   [ ] It uses the existing container/grid system.
-   [ ] It uses the existing responsive breakpoints.
-   [ ] It does not introduce a competing design system.
-   [ ] It does not duplicate global components.
-   [ ] It does not introduce unnecessary animation libraries.
-   [ ] It respects reduced-motion behavior.
-   [ ] It does not create horizontal overflow.
-   [ ] It looks visually native beside the existing pages.
-   [ ] The technical content accurately represents SkyGuide AI.
-   [ ] The page tells a coherent product → architecture → engineering
    story.

------------------------------------------------------------------------

# 45. Final Principle

The goal is **not**:

> "Make this page look exactly like the reference."

The goal is:

> **"Make this page behave and compose like the reference while looking
> unmistakably like the existing SkyGuide portfolio."**

The reference provides the **case-study grammar**.

The existing website provides the **visual language**.

SkyGuide AI provides the **content and technical story**.

Therefore:

``` text
REFERENCE
= composition + pacing + storytelling

EXISTING WEBSITE
= typography + colors + buttons + spacing + motion + components

SKYGUIDE AI
= product + architecture + engineering + visuals
```

That separation must be maintained throughout implementation.
