# SkyGuide AI — Visual Layout Correction & Image Composition Instructions

## Primary Goal

The current implementation is **over-cropping images and treating every image as if it belongs to the same viewport**.

Fix the Detailed Work section so that the visual storytelling feels more like an editorial / visual case study:

```text
DIFFERENT IMAGE
        ↓
DIFFERENT VIEWPORT
        ↓
DIFFERENT COMPOSITION
        ↓
SAME DESIGN LANGUAGE
```

Do **not** force every image into one universal media frame.

The images are part of the story, so their original aspect ratios and visual subjects must be respected.

---

# 1. CRITICAL — STOP CROPPING EVERYTHING

The biggest issue is the current generic image treatment.

Do NOT force all images through something equivalent to:

```css
width: 100%;
height: 100%;
object-fit: cover;
```

This causes:

```text
portrait image
      ↓
landscape viewport
      ↓
huge crop
```

or:

```text
wide image
      ↓
tall viewport
      ↓
unnecessary crop
```

Instead, the viewport must be chosen based on the **actual image ratio and visual composition**.

---

# 2. Use Different Viewports for Different Image Ratios

Create several media composition modes.

For example:

```text
PORTRAIT
LANDSCAPE
SQUARE
WIDE
FULL-BLEED
DEVICE
COLLAGE
```

Conceptually:

```jsx
<CaseMedia variant="portrait" />
<CaseMedia variant="landscape" />
<CaseMedia variant="wide" />
<CaseMedia variant="square" />
<CaseMedia variant="fullBleed" />
```

Use the project's actual component structure if a reusable media component already exists.

Do not create a new media system if one already exists.

---

# 3. Image Ratio Rules

### Portrait Images

Examples:

```text
person looking through telescope
vertical Moon image
spacecraft portrait
telescope observer
phone mockup
```

Use a **tall portrait viewport**.

Conceptually:

```css
.media--portrait {
  aspect-ratio: 4 / 5;
}
```

or an appropriate ratio close to the source.

Prefer:

```css
height: auto;
```

when the full source image should be visible.

---

### Landscape Images

Examples:

```text
radio telescope landscape
observatory
wide sky
Earth horizon
wide product composition
```

Use:

```css
.media--landscape {
  aspect-ratio: 16 / 9;
}
```

or another ratio appropriate to the original image.

Do not force portrait images into this.

---

### Square Images

Examples:

```text
Moon close-up
community graphic
small visual artifact
```

Allow them to remain square.

```css
aspect-ratio: 1 / 1;
```

---

### Extremely Tall Images

For very tall images:

```text
vertical telescope imagery
phone-focused compositions
portrait photography
```

do not squash them into a short container.

Use either:

```text
full natural height
```

or:

```text
large portrait viewport
```

depending on the intended composition.

---

# 4. Do NOT Introduce Outer Image Boxes

This is critical.

Images should appear as **images**, not as cards.

Do not create:

```text
gray box
white card
bordered media frame
shadowed media container
background panel
```

around an image unless the design explicitly requires an actual product UI card.

Avoid:

```css
background: var(--surface-gray);
border: 1px solid var(--border);
```

on generic image containers.

There should not be visible unused space surrounding a narrower image.

Bad:

```text
┌──────────────────────────────────────────────┐
│                                              │
│             ┌──────────────┐                 │
│             │    IMAGE     │                 │
│             └──────────────┘                 │
│                                              │
└──────────────────────────────────────────────┘
```

Good:

```text
          ┌──────────────┐
          │              │
          │    IMAGE     │
          │              │
          │              │
          └──────────────┘
```

The media element itself should define the visual boundary.

---

# 5. Preserve the Existing Parallax Language

The image should still participate in the site's existing subtle parallax/reveal treatment.

Use the existing animation primitive.

The desired feeling:

```text
scroll
  ↓
image moves slightly
  ↓
image settles
```

Not:

```text
scroll
  ↓
image aggressively zooms
  ↓
image crops
  ↓
image jumps
```

Keep the existing:

```text
reveal
easing
parallax
hover
cursor
```

where already available.

Do not introduce a completely new animation language.

---

# 6. Natural Image Composition Comes First

Before choosing a viewport, ask:

```text
What is the visual subject?
Where is the subject?
What empty space is intentional?
What part of the image must remain visible?
```

Examples:

### Child looking upward

Keep:

```text
face
body
sky
```

visible.

Do not crop the face because a generic `16:9` container was used.

---

### Person with telescope

Keep:

```text
observer
telescope
Moon / sky
```

visible.

---

### Moon image

Do not aggressively crop the Moon.

Allow negative space around it.

---

### Spacecraft

Preserve the spacecraft and the surrounding scale of space.

---

# 7. Add MORE IMAGES

The current case study is too text-heavy.

Increase the number of strong visual moments.

The page should feel like:

```text
visual
visual
statement
visual
product
visual
product
visual
technical
visual
community
visual
closing
```

not:

```text
text
image
text
image
text
image
```

There should be **many more visual moments**.

---

# 8. Target Image Count

Aim for approximately:

```text
12–18 meaningful visual moments
```

This can include:

```text
full images
cropped compositions
UI screenshots
phone mockups
device compositions
image pairs
image trios
technical diagrams
community visuals
```

Do not add filler.

Every visual needs a reason.

---

# 9. We Can Add More Assets Later

The implementation must be designed so more imagery can be added easily.

If an image or short video would materially improve a section, structure the page so it can accept one later.

For example:

```javascript
{
  type: "image",
  src: "...",
  variant: "portrait",
  position: "right",
  parallax: true
}
```

or:

```javascript
{
  type: "video",
  src: "...",
  variant: "wide",
  autoplay: true,
  muted: true
}
```

Do not hard-code the assumption that the current asset set is final.

---

# 10. Use 2–3 Images Together

There is **NO hard rule** that a section must be:

```text
text
↓
one image
↓
text
↓
one image
```

That is too repetitive.

Some sections should use:

```text
2 images
```

or:

```text
3 images
```

together.

Examples:

```text
[ portrait ] [ landscape ]
```

or:

```text
[ image ] [ image ] [ image ]
```

or:

```text
          [ large image ]

[ small ]       [ small ]
```

or:

```text
[ large portrait ] [ two stacked images ]
```

The layout should respond to the content.

---

# 11. Use 2-Column Layouts

Selected sections should become two-column compositions where appropriate.

Example:

```text
┌──────────────────┬──────────────────┐
│                  │                  │
│     IMAGE        │    TEXT          │
│                  │                  │
│                  │                  │
└──────────────────┴──────────────────┘
```

Other sections:

```text
┌──────────────────┬──────────────────┐
│      TEXT        │      IMAGE       │
└──────────────────┴──────────────────┘
```

Alternate the visual weight.

Do not repeat the same alignment for every section.

---

# 12. Use 3-Column Layouts

For image-rich moments:

```text
┌──────────┬──────────┬──────────┐
│          │          │          │
│ IMAGE 01 │ IMAGE 02 │ IMAGE 03 │
│          │          │          │
└──────────┴──────────┴──────────┘
```

This would be especially useful for:

```text
observing
community
mobile
celestial targets
product surfaces
```

Keep gaps generous and use the existing grid system.

---

# 13. Asymmetrical Layouts

Use asymmetry when it improves the storytelling.

Example:

```text
┌───────────────────────────┐
│                           │
│       LARGE IMAGE         │
│                           │
└───────────────┬───────────┘
                │
       ┌────────┴──────┐
       │ SMALL IMAGE   │
       └───────────────┘
```

Or:

```text
TEXT                    IMAGE
                        IMAGE
                        IMAGE
```

Or:

```text
IMAGE        TEXT
IMAGE
```

Do not force a symmetrical grid everywhere.

---

# 14. The Page Should Feel Like a Visual Essay

The composition should create rhythm:

```text
quiet
  ↓
large image
  ↓
small text
  ↓
visual collision
  ↓
technical explanation
  ↓
human image
  ↓
product UI
  ↓
large image
```

Allow some sections to be almost entirely visual.

---

# 15. Emotional Image Sequence

Use the supplied imagery in an intentional emotional progression.

Recommended:

### Opening

```text
sky / telescope / Moon
```

Emotion:

```text
wonder
```

### Human curiosity

```text
child / person looking upward
```

Emotion:

```text
curiosity
```

### The problem

```text
large sky / telescope / spacecraft
```

Emotion:

```text
scale
```

### Product

```text
SkyGuide UI
```

Emotion:

```text
clarity
```

### Intelligence

```text
sky maps / Moon / target visuals
```

Emotion:

```text
understanding
```

### Alignment

```text
telescope + phone
```

Emotion:

```text
action
```

### Community

```text
people / community imagery
```

Emotion:

```text
connection
```

### Closing

```text
Moon / deep sky / human observer
```

Emotion:

```text
wonder
```

---

# 16. Product Screenshots Should Not Always Be Full Width

Mix them.

Examples:

```text
one large desktop screenshot
```

then:

```text
three smaller phone screens
```

then:

```text
one portrait device
+
one wide dashboard
```

then:

```text
cropped interface detail
```

This gives the project visual rhythm.

---

# 17. Use Image Cropping Intentionally — Not Accidentally

Cropping is allowed.

But it must be **art directed**.

Good crop:

```text
deliberately focuses on telescope
```

Bad crop:

```text
person's head cut off because viewport was wrong
```

The agent must inspect each image before selecting its viewport.

---

# 18. Position Images Based on Subject

Use:

```css
object-position
```

when a crop is intentional.

Examples:

```css
object-position: center top;
object-position: center;
object-position: 70% center;
object-position: left center;
```

Do not use the same:

```css
object-position: center center;
```

for everything.

---

# 19. Full-Bleed Image Moments

Some of the strongest astronomy imagery should become almost full viewport moments.

For example:

```text
┌───────────────────────────────────────────────┐
│                                               │
│                                               │
│              LARGE SKY IMAGE                 │
│                                               │
│                                               │
└───────────────────────────────────────────────┘
```

Minimal text can sit over it:

```text
WE'VE ALWAYS LOOKED UP.
```

Do not put a card around the image.

---

# 20. Small Image + Large Image Pair

Use this for visual pacing:

```text
                    ┌─────────────────────┐
                    │                     │
                    │      LARGE IMAGE    │
                    │                     │
                    └─────────────────────┘

         ┌──────────────┐
         │ SMALL IMAGE  │
         └──────────────┘
```

This works particularly well with:

```text
Moon
telescope
human observer
UI detail
```

---

# 21. Image + Image + Text

Use compositions such as:

```text
┌────────────┬────────────┬──────────────────┐
│            │            │                  │
│   IMAGE    │   IMAGE    │      TEXT        │
│            │            │                  │
└────────────┴────────────┴──────────────────┘
```

This is encouraged.

There is no requirement that every section contain only one image.

---

# 22. Image-Only Moments

Some sections should have **no explanatory paragraph at all**.

Example:

```text
            [ FULL SKY IMAGE ]

            LOOK UP.
```

Then continue.

This gives the page breathing room.

---

# 23. Technical Sections Need Visual Proof

When explaining:

```text
FastAPI
Astropy
Socket.IO
20Hz
ephemeris
Alt/Az
recommendations
```

show a relevant interface or diagram near the explanation.

Do not create a giant technical paragraph followed by an unrelated stock image.

---

# 24. Architecture Visual

Instead of making architecture a giant text block, use:

```text
                    PHONE
                      │
                      ▼
                SOCKET.IO
                      │
                      ▼
              NODE / EXPRESS
                      │
               ┌──────┴──────┐
               ▼             ▼
          FASTAPI          MONGODB
               │
               ▼
         ASTROPY / SKYFIELD
```

Keep it visually minimal.

Use existing typography and line styles.

---

# 25. Recommendation Visual

Show the logic visually:

```text
LOCATION
    +
TELESCOPE
    +
WEATHER
    +
MOON
    +
VISIBILITY
    ↓
MATCH SCORE
    ↓
WHAT TO OBSERVE
```

Then show the actual SkyGuide target interface.

---

# 26. Alignment Visual

Show:

```text
PHONE
   ↓
ORIENTATION
   ↓
SOCKET.IO
   ↓
NODE
   ↓
EPHEMERIS
   ↓
TARGET
```

Then place the telescope/phone visual beside it.

This creates a strong bridge between:

```text
human interaction
```

and:

```text
engineering
```

---

# 27. Video

The uploaded reference recording should influence pacing and interaction.

If short videos are available, they can be used for:

```text
telescope movement
sky motion
phone interaction
dashboard animation
scroll reveal
community movement
```

Prefer a short looping visual over a static screenshot when movement communicates something meaningful.

Video should:

```text
autoplay
muted
loop
playsInline
```

when appropriate.

Do not add video merely because it is technically possible.

---

# 28. Parallax

Use subtle parallax for:

```text
large atmospheric images
portrait images
device compositions
background astronomy imagery
```

Use smaller movement for UI screenshots.

Suggested relationship:

```text
background image
→ slightly slower

main image
→ normal

foreground text/device
→ slightly faster
```

Keep it subtle.

---

# 29. Hover

Images may use the existing portfolio hover system.

Good:

```text
slight scale
small translation
cursor response
caption reveal
```

Avoid:

```text
dramatic zoom
color inversion
huge rotation
heavy blur
```

---

# 30. Do Not Make Every Image Interactive

Some images should remain completely still.

A strong visual rhythm requires:

```text
interactive
↓
still
↓
interactive
↓
still
```

Otherwise the page becomes visually noisy.

---

# 31. Maintain the Existing Design System

Although the image compositions become more experimental, the following MUST remain consistent:

```text
font
text hierarchy
colors
buttons
cursor
hover language
curvy reveal
spacing tokens
navigation
footer
responsive breakpoints
```

New complexity should come from **composition**, not from a new design system.

---

# 32. Content Grid

Use the existing site grid.

The case study may move between:

```text
1 column
2 columns
3 columns
full bleed
```

but all compositions should snap to the same underlying grid.

This keeps the experimentation controlled.

---

# 33. Section Layout Examples

The agent should freely use structures such as:

### Layout A

```text
TEXT
────────
LARGE IMAGE
```

### Layout B

```text
IMAGE       TEXT
IMAGE
```

### Layout C

```text
IMAGE       IMAGE
        TEXT
```

### Layout D

```text
LARGE IMAGE
   SMALL IMAGE
       SMALL IMAGE
```

### Layout E

```text
TEXT
IMAGE IMAGE IMAGE
```

### Layout F

```text
IMAGE
        IMAGE
TEXT
```

### Layout G

```text
FULL BLEED IMAGE
```

Choose based on the visual material.

---

# 34. Do Not Force Uniform Section Heights

Different compositions should have different natural heights.

Avoid:

```css
height: 80vh;
```

for every section/image.

The section height should emerge from:

```text
image ratio
content
composition
viewport
```

---

# 35. Avoid Magic Numbers

Do not solve composition with dozens of:

```text
top: 73px
left: 127px
margin-left: 83px
width: 61vw
```

Use:

```text
grid
flex
gap
clamp()
max-width
aspect-ratio
container
```

and existing design tokens.

Absolute positioning should be reserved for compositions that genuinely require overlap.

---

# 36. Build a Reusable Media Composition System

If the existing code does not already have one, create a small compositional abstraction rather than many one-off CSS hacks.

Conceptually:

```jsx
<MediaBlock
  src={...}
  variant="portrait"
  layout="center"
  parallax
/>

<MediaBlock
  src={...}
  variant="landscape"
  layout="wide"
  parallax
/>

<MediaGroup columns={3}>
  ...
</MediaGroup>
```

Keep it small.

Do not create a second component library.

---

# 37. Asset Selection Priority

When choosing between two images, prioritize:

```text
1. emotional impact
2. visual clarity
3. relevance to section
4. composition potential
5. technical relevance
```

Do not choose an image only because it shows a feature.

---

# 38. Image Order Must Tell a Story

The image sequence should gradually evolve:

```text
SKY
↓
HUMAN
↓
PROBLEM
↓
PRODUCT
↓
INTELLIGENCE
↓
ACTION
↓
COMMUNITY
↓
ENGINEERING
↓
WONDER
```

The visual story should make sense even if the visitor ignores most of the text.

---

# 39. Final Visual Goal

The finished case study should feel closer to:

```text
VISUAL ESSAY
+
PRODUCT SHOWCASE
+
ENGINEERING STORY
```

and less like:

```text
README
+
FEATURE LIST
+
SCREENSHOT GALLERY
```

---

# 40. Definition of Done

- [ ] Images are no longer generically cropped.
- [ ] Portrait images use portrait-oriented viewports.
- [ ] Landscape images use landscape-oriented viewports.
- [ ] Square images can remain square.
- [ ] Natural image ratios are preserved where appropriate.
- [ ] No unnecessary outer gray/white media boxes.
- [ ] Images appear directly on the page.
- [ ] Existing parallax/reveal behavior remains.
- [ ] More visual moments are added.
- [ ] Target approximately 12–18 meaningful visual moments.
- [ ] Several sections use 2 images together.
- [ ] Several sections use 3 images together where useful.
- [ ] Selected sections use 2-column layouts.
- [ ] Selected sections use 3-column layouts.
- [ ] Some sections are full bleed.
- [ ] Some sections are image-only.
- [ ] Some sections use asymmetrical compositions.
- [ ] Product screenshots are mixed with atmospheric imagery.
- [ ] Technical sections have relevant visual proof.
- [ ] Existing design system remains untouched.
- [ ] No universal fixed media height is used.
- [ ] No arbitrary crop destroys important subjects.
- [ ] No excessive animation is introduced.
- [ ] No horizontal overflow occurs.
- [ ] Mobile composition remains intentional.

---

# Final Instruction to the Agent

**Stop treating the case study as a sequence of identical image cards.**

The images are the storytelling engine.

Use the correct viewport for the image.

Respect the original aspect ratio.

Do not introduce outer media boxes.

Reuse the existing parallax/reveal language.

Use **more images**.

Use **2–3 images together** when the story benefits from it.

Move freely between:

```text
1 column
2 columns
3 columns
full bleed
asymmetrical
image-only
image + text
image + image
image + image + image
```

There is **no hard rule** that every section must follow:

```text
text → image → text → image
```

Choose the layout based on the imagery and the emotional moment.

The final page should feel like:

> **someone telling the story of why they built SkyGuide AI through images — and then letting the technical architecture explain how the magic actually works.**

**More visual. Less repetitive. Less cropped. More intentional. More human. More SkyGuide.**
