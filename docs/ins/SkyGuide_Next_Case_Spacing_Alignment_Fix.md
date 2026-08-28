# Fix --- Next Case Section Alignment & Spacing

## Goal

Fix only the **Next Case** portion shown in the reference screenshot.

Do **not** redesign the section and do not create new buttons, hover
effects, reveal animations, typography, or colors.

Use the existing portfolio design system and existing interaction
primitives.

------------------------------------------------------------------------

## Current Composition

The section currently contains:

``` text
NEXT CASE                         [menu]

NEURON


[ large project preview image ]


──────────────────────────────────────────────

                         [ NEXT CASE
                           ↗ ]
```

The overall composition is already correct.

The task is to make the spacing, alignment, sizing, and overlap feel
intentional and polished.

------------------------------------------------------------------------

# 1. Keep the Existing Visual Language

Reuse:

-   Existing navbar/menu button
-   Existing typography
-   Existing color tokens
-   Existing button styles
-   Existing hover effect
-   Existing cursor interaction
-   Existing reveal animation
-   Existing divider treatment

**Do not introduce new visual primitives.**

------------------------------------------------------------------------

# 2. Top "NEXT CASE" Label

Keep the small:

``` text
NEXT CASE
```

label at the upper-left.

Requirements:

-   Align it to the same global horizontal container as the rest of the
    portfolio.
-   Use the existing small-label / eyebrow typography.
-   Use the existing muted/accent text color.
-   Do not increase its size.
-   Do not add a background or container.
-   Keep its position visually independent from the large project title.

The label should feel like metadata, not a heading.

------------------------------------------------------------------------

# 3. Project Title

Keep:

``` text
NEURON
```

as the dominant title.

Requirements:

-   Use the site's existing large/display typography.
-   Preserve the current font.
-   Preserve the existing font weight.
-   Keep the title aligned with the main content container.
-   Maintain generous whitespace above and below it.
-   Do not introduce a new case-study-specific typography scale.

The title should remain the primary visual element before the project
preview.

------------------------------------------------------------------------

# 4. Project Preview Image

Keep the large horizontal project image exactly as the main visual.

Requirements:

-   Preserve the current image/content.
-   Do not alter the image itself.
-   Do not crop important content.
-   Keep the existing media reveal behavior.
-   Maintain the same left/right alignment with the section container.
-   Keep a small, intentional gap between the title and image.
-   The image should feel like one large editorial media block rather
    than a card.

Do not add:

``` text
border radius
shadow
extra border
gradient overlay
```

unless these already exist globally.

------------------------------------------------------------------------

# 5. Divider Position

The horizontal divider below the image should be visually connected to
the Next Case interaction.

Current structure:

``` text
IMAGE
  ↓
some whitespace
  ↓
────────────────────────────────────────
```

Keep the divider thin and subtle using the **existing divider/border
token**.

Important:

The divider should sit close enough to the circular Next Case control
that the circle clearly appears to intersect the divider.

------------------------------------------------------------------------

# 6. Next Case Circle

The circular:

``` text
NEXT CASE
↗
```

interaction is the focal point of the bottom portion.

### Position

The circle should:

-   Sit on the horizontal divider.
-   Be vertically centered on the divider.
-   Overlap the divider rather than sitting completely above or below
    it.
-   Extend roughly half above and half below the divider.
-   Remain inside the page's right-side content boundary.

Conceptually:

``` text
───────────────────────────────●────────────────────

                           ┌─────────┐
                           │ NEXT    │
                           │ CASE    │
                           │    ↗    │
                           └─────────┘
```

More accurately, the circle itself should be centered on the divider:

``` text
───────────────────────┼──────────────────────────
                       │
                  ┌────┴────┐
                  │         │
                  │ NEXT    │
                  │ CASE    │
                  │    ↗    │
                  │         │
                  └─────────┘
```

The divider must visually pass behind the circle.

------------------------------------------------------------------------

# 7. Circle Size

Do not make the circle excessively large.

Use the existing circular button/action component or its established
sizing.

The circle should be large enough to contain:

``` text
NEXT CASE
   ↗
```

comfortably, but should not dominate the project title or image.

If an existing circular action already exists elsewhere in the
portfolio, match that exact diameter.

------------------------------------------------------------------------

# 8. Circle Layering

The circle must visually sit **above the divider**.

Use the existing component's layering conventions.

Expected stacking:

``` text
page background
      ↓
divider
      ↓
circle/button
```

The divider should disappear behind the circle.

Do not create a new visual line inside the circle.

------------------------------------------------------------------------

# 9. Horizontal Alignment

The circle should be positioned relative to the same section/container
rather than using arbitrary viewport coordinates.

Avoid:

``` css
right: 127px;
top: 43px;
```

or other magic-number positioning that only works at one viewport width.

Prefer:

``` text
existing container
+
relative section
+
absolute/right-aligned action
```

The circle should remain correctly positioned when the viewport changes.

------------------------------------------------------------------------

# 10. Vertical Spacing

The desired rhythm is:

``` text
NEURON
        ↓
generous whitespace
        ↓
IMAGE
        ↓
moderate whitespace
        ↓
DIVIDER
        ↓
circle centered on divider
        ↓
bottom breathing room
```

Do not compress the section.

Do not add excessive empty space between:

``` text
image → divider
```

The divider should feel like the transition from the project preview
into the next-project action.

------------------------------------------------------------------------

# 11. Important: Do Not Rebuild the Interaction

The circle is an existing portfolio-style interaction.

If the project already has:

-   magnetic behavior
-   hover expansion
-   cursor-following
-   arrow animation
-   button transitions

reuse those implementations.

Only adjust its **placement and sizing** if required.

Do not write a new hover system for this section.

------------------------------------------------------------------------

# 12. Responsive Behavior

### Desktop

Maintain the composition:

``` text
large title
large image
full-width divider
circle overlapping divider
```

### Tablet

Scale spacing and media naturally using existing breakpoints.

The circle remains attached to the divider.

### Mobile

Do not allow the circle to cause horizontal overflow.

If the existing design system has a mobile variant for circular actions,
use it.

The circle should remain visually connected to the divider, but may be
reduced in size according to the existing responsive scale.

------------------------------------------------------------------------

# 13. Do Not Change These

This task is intentionally narrow.

Do **not** modify:

``` text
NEURON text/content
project image
navbar
menu button
global typography
global colors
global spacing tokens
global buttons
global hover system
global reveal system
footer
other case-study sections
```

Only fix this Next Case composition.

------------------------------------------------------------------------

# 14. Verification

After implementation, check at:

``` text
1440px
1280px
1024px
768px
480px
375px
```

Verify:

-   [ ] `NEXT CASE` label aligns with the site's container.
-   [ ] `NEURON` aligns with the same content axis.
-   [ ] Image remains correctly aligned.
-   [ ] Image is not unintentionally cropped.
-   [ ] Divider uses the existing border style.
-   [ ] Circle is centered vertically on the divider.
-   [ ] Divider passes behind the circle.
-   [ ] Circle does not drift when viewport width changes.
-   [ ] No horizontal overflow.
-   [ ] Existing hover interaction still works.
-   [ ] Existing cursor interaction still works.
-   [ ] Existing reveal animation is unchanged.
-   [ ] No new design primitives were introduced.

------------------------------------------------------------------------

# Final Instruction

**Fix the composition, not the design system.**

The desired result is the same visual language already present on the
portfolio, with the Next Case section feeling more precisely aligned and
intentionally spaced.

Use existing components and tokens wherever possible.

**Do not rebuild anything that already exists.**
