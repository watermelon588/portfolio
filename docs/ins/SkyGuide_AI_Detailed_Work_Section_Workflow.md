# SkyGuide AI --- Portfolio Detailed Work Section

## Exact Recreation Workflow & Technical Specification

> **Purpose:** Recreate the interaction model, visual hierarchy, motion
> language, and case-study presentation shown in the provided portfolio
> reference recording, but replace the reference project's content with
> **SkyGuide AI** and describe SkyGuide AI using technically accurate,
> portfolio-level language.
>
> **Important:** This specification is for the **Detailed Work / Case
> Study section/page**, not for redesigning the entire portfolio. The
> goal is to reproduce the *behavior and presentation pattern* of the
> reference as closely as possible while making the content specific to
> SkyGuide AI.

------------------------------------------------------------------------

# 1. Reference Analysis

The reference behaves like a premium interactive case-study page rather
than a conventional project-description page.

The observed flow is approximately:

``` text
PROJECT INTRO
    ↓
Project metadata
    ↓
Large horizontal visual / live-site preview
    ↓
Scroll-driven showcase of project screens
    ↓
Large project imagery / device mockups
    ↓
Multiple responsive compositions
    ↓
Closing "Next case" transition
```

The visual language is deliberately restrained:

-   Large typography
-   Very high whitespace
-   Minimal navigation
-   Strong editorial hierarchy
-   Full-width visual compositions
-   Mostly monochrome surfaces
-   Thin dividers
-   Small metadata labels
-   Large media that does the storytelling
-   Circular floating interaction element
-   Scroll-driven movement rather than many conventional buttons
-   Case-study transitions that feel like part of the same continuous
    page

The important design principle is:

> **The project itself is the interface.**

Instead of presenting a large amount of explanatory copy first, the page
establishes the project identity, then progressively reveals the work
through visual compositions.

------------------------------------------------------------------------

# 2. Target Experience for SkyGuide AI

The SkyGuide AI version should communicate:

> **A real-time personalized celestial matchmaking and
> telescope-alignment platform.**

The central product question should be prominent:

> **"I have a telescope. What should I look at right now --- and how do
> I point at it?"**

The case study should make the technical architecture visible without
turning the page into documentation.

The viewer should understand the project progressively:

``` text
WHAT IT IS
    ↓
WHO IT IS FOR
    ↓
WHAT PROBLEM IT SOLVES
    ↓
HOW THE SYSTEM WORKS
    ↓
HOW THE USER INTERACTS WITH IT
    ↓
WHAT MAKES THE ENGINE TECHNICALLY INTERESTING
    ↓
WHAT WAS ACTUALLY BUILT
```

------------------------------------------------------------------------

# 3. Recommended Case Study Structure

Use the following exact section order.

``` text
01 — Hero / Project Identity
02 — Metadata
03 — Product Preview
04 — Problem / Product Question
05 — System Architecture
06 — Astronomy Intelligence
07 — Personalized Recommendation Engine
08 — Real-Time Telescope Alignment
09 — Mobile Companion
10 — Product Surfaces
11 — Scale / Data
12 — Engineering Decisions
13 — Deployment / Production
14 — Closing Result
15 — Next Case
```

Do not put all sections into a conventional two-column text layout.

The majority of the page should remain visual.

------------------------------------------------------------------------

# 4. Section 01 --- Hero / Project Identity

## Layout

Start with a large amount of whitespace.

At the top:

``` text
SkyGuide AI
```

Use very large typography.

Under it, use a compact project descriptor:

``` text
REAL-TIME ASTRONOMICAL OBSERVATION PLATFORM
```

Then introduce the technical proposition:

``` text
An AI-powered astronomical observation platform that combines
astronomical computation, real-time sensor data, telescope
alignment, environmental conditions, and personalized
target recommendations into one observing workflow.
```

Keep this paragraph narrow rather than stretching it across the screen.

------------------------------------------------------------------------

# 5. Section 02 --- Metadata

The reference uses small editorial metadata blocks.

Replicate that structure.

Suggested SkyGuide metadata:

  Label          Value
  -------------- -------------------------------------
  ROLE           Full-stack / Systems Engineering
  TYPE           Real-time Astronomy Platform
  STACK          React · Node.js · FastAPI · MongoDB
  ARCHITECTURE   Distributed Microservices
  REAL-TIME      Socket.IO
  DEPLOYMENT     Vercel · Render · MongoDB Atlas
  DATA           13,311 celestial objects
  YEAR           2026

Do not make these cards visually heavy.

Use:

-   small uppercase labels
-   muted text
-   thin dividers
-   generous horizontal spacing

The metadata should feel like an editorial caption rather than a
dashboard.

------------------------------------------------------------------------

# 6. Section 03 --- Product Preview

Immediately after the metadata, transition into a large visual.

The reference uses a large horizontal project preview that dominates the
viewport.

For SkyGuide AI, use:

``` text
SkyGuide AI Dashboard
```

The dashboard should show, if available:

-   Observer location
-   Current sky conditions
-   Telescope state
-   Recommended targets
-   Tonight information
-   Astro assistant
-   Alignment state

The visual should be large enough that the viewer can understand that
this is a real product.

### Important

Do not surround the preview with a conventional card.

Prefer:

``` text
full-width media
```

over:

``` text
rounded card + shadow + caption
```

The reference relies heavily on composition and whitespace.

------------------------------------------------------------------------

# 7. Section 04 --- Product Question

After the first major visual, introduce the product problem.

Use one oversized statement:

``` text
WHAT SHOULD I OBSERVE TONIGHT?
```

Then a smaller explanation:

``` text
Astronomy software can tell an observer where an object is.
SkyGuide AI goes further: it considers the observer, telescope,
sky conditions, Moon, visibility and timing to determine what is
worth observing now — then helps the observer point the telescope
at it.
```

The text should not dominate the page.

The visual hierarchy must remain:

``` text
large statement
small explanation
large visual
```

------------------------------------------------------------------------

# 8. Section 05 --- System Architecture

This is where the portfolio case study becomes technically descriptive.

Present the architecture visually.

## Architecture

``` text
                         SKYGUIDE AI
                              │
                              ▼
                     ┌─────────────────┐
                     │  React Frontend │
                     │                 │
                     │ Dashboard       │
                     │ Tonight         │
                     │ Explore         │
                     │ Community       │
                     │ Alignment       │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ Node.js Gateway │
                     │                 │
                     │ Express         │
                     │ Authentication  │
                     │ Business Logic  │
                     │ Socket.IO       │
                     │ Session State   │
                     └───────┬─────────┘
                             │
                 ┌───────────┴────────────┐
                 │                        │
                 ▼                        ▼
        ┌─────────────────┐      ┌─────────────────┐
        │ FastAPI Astro   │      │ MongoDB Atlas   │
        │ Engine          │      │                 │
        │                 │      │ Users           │
        │ Astropy         │      │ Telescopes      │
        │ Catalog         │      │ Catalog         │
        │ Visibility      │      │ Observations    │
        │ Moon            │      │ Community       │
        │ Ephemeris       │      └─────────────────┘
        │ Recommendations │
        └─────────────────┘
```

The portfolio copy should describe the architectural reasoning:

> **The system separates product orchestration from scientific
> computation. Node.js owns authentication, user state, business
> workflows and real-time communication, while FastAPI isolates
> astronomy-heavy computation and scientific transformations.**

This is more technically credible than simply saying "built with
microservices."

------------------------------------------------------------------------

# 9. Section 06 --- Astronomy Intelligence

Use a large visual of:

-   Tonight page
-   Sky map
-   target visibility
-   Moon panel
-   observing conditions
-   catalog explorer

Then explain the computation.

Suggested copy:

``` text
The astronomy layer is isolated from the UI.

FastAPI handles coordinate transformations, celestial
catalog resolution, visibility calculations, lunar context,
ephemeris generation and recommendation inputs.

The frontend never becomes the source of astronomical truth.
It consumes already-computed observational state.
```

Highlight the scale:

``` text
13,311
CELESTIAL OBJECTS
```

Then:

``` text
110 Messier
7,993 NGC
5,208 IC
```

The 13k catalog should be treated as a visual milestone.

------------------------------------------------------------------------

# 10. Section 07 --- Personalized Recommendation Engine

This should be one of the strongest technical sections.

The recommendation story is:

``` text
Observer
   +
Location
   +
Telescope
   +
Sky Conditions
   +
Moon
   +
Object Visibility
   +
Time Window
   ↓
Recommendation
```

Explain that the system does not simply recommend popular objects.

It evaluates observational context.

Suggested portfolio copy:

> **SkyGuide AI turns a static celestial catalog into a contextual
> recommendation system.**
>
> A target becomes interesting only when it makes sense for the
> observer's current situation --- including location, telescope
> configuration, visibility, lunar conditions, weather and available
> observing windows.

Show this as a visual pipeline rather than a large paragraph.

------------------------------------------------------------------------

# 11. Section 08 --- Real-Time Telescope Alignment

This is the most technically distinctive interaction and should receive
a large visual treatment.

The flow is:

``` text
PHONE
  │
  │ orientation sensors
  ▼
Orientation / Calibration
  │
  │ orientation_update
  ▼
Socket.IO pairing room
  │
  ▼
Node.js Alignment Engine
  │
  │ target + telescope state
  ▼
FastAPI Astro Engine
  │
  │ Alt/Az + angular rates
  ▼
Alignment state
  │
  ▼
Dashboard guidance
```

The key technical explanation:

> **The phone does not send raw sensor events directly into astronomical
> calculations.**

Instead:

``` text
native sensor events
        ↓
calibration
        ↓
device-independent orientation
        ↓
orientation_update
        ↓
real-time alignment engine
```

FastAPI provides the scientific ephemeris segment.

The Node gateway then performs low-latency per-packet calculations
without making an HTTP request for every sensor packet.

This architecture is important because a 20Hz sensor stream cannot
afford a network round trip for every frame.

Use this as a highlighted engineering decision:

``` text
SCIENTIFIC COMPUTATION
FastAPI / Astropy

REAL-TIME STATE
Node.js / Socket.IO

PRESENTATION
React
```

------------------------------------------------------------------------

# 12. Section 09 --- Mobile Companion

Show the phone UI as a separate visual composition.

The important story:

``` text
QR CODE
   ↓
PHONE
   ↓
PAIRING SESSION
   ↓
SENSOR STREAM
   ↓
ALIGNMENT GUIDANCE
```

Explain why it is separate:

> The phone is physically mounted to the telescope, so it should not
> download the entire desktop application. SkyGuide AI uses a dedicated
> lightweight Vite entry and PWA shell containing only the modules
> required for pairing, sensors and guidance.

This is a strong systems-design detail.

Show:

``` text
Desktop application
        +
Lightweight mobile companion
```

rather than presenting it as a generic responsive page.

------------------------------------------------------------------------

# 13. Section 10 --- Product Surfaces

Follow the reference's visual rhythm by presenting multiple product
surfaces in sequence.

Do not show them as a conventional gallery.

Instead, create large compositions:

### Composition A

``` text
Dashboard
```

### Composition B

``` text
Tonight
```

### Composition C

``` text
Explore / 13k catalog
```

### Composition D

``` text
Alignment
```

### Composition E

``` text
Community
```

### Composition F

``` text
Mobile Companion
```

Each visual should occupy significant viewport space.

Use alternating composition:

``` text
full-width
↓
centered device
↓
three-panel row
↓
full-width
↓
phone + desktop
```

This creates the same editorial rhythm seen in the reference.

------------------------------------------------------------------------

# 14. Section 11 --- Scale / Data

Create a strong numeric section.

Example:

``` text
13,311
OBJECTS
```

Underneath:

``` text
MESSIER      110
NGC        7,993
IC         5,208
```

Then explain:

> The original curated catalog was expanded into a production-scale
> astronomical dataset. The visibility and recommendation pipeline was
> subsequently redesigned so catalog growth did not turn every observing
> request into an expensive computation.

Use the number as typography first and explanation second.

------------------------------------------------------------------------

# 15. Section 12 --- Engineering Decisions

This section should feel like an engineering postmortem, not a feature
list.

Use a list of decisions.

### Decision 01 --- Separate astronomy from application logic

``` text
FastAPI
→ scientific computation

Node.js
→ application orchestration
```

### Decision 02 --- Use Socket.IO for device synchronization

``` text
Phone
↕
Pairing Room
↕
Dashboard
```

### Decision 03 --- Cache expensive sky calculations

``` text
First calculation
        ↓
Mongo-backed cache
        ↓
Instant subsequent reads
```

### Decision 04 --- Do not expose the astronomy engine directly

``` text
Browser
   ↓
Node Gateway
   ↓
FastAPI
```

This also becomes a security boundary.

### Decision 05 --- Use a separate mobile bundle

``` text
Desktop SPA
≠
Mobile companion
```

The phone only receives the code required for the alignment workflow.

------------------------------------------------------------------------

# 16. Section 13 --- Production

Use a large deployment visual.

``` text
Vercel
  │
  ▼
React Frontend

Render
  │
  ├── Node.js Gateway
  │
  └── FastAPI Astro Engine

MongoDB Atlas
  │
  ▼
Persistent application data

Cloudinary
  │
  ▼
Community image storage
```

Then add:

``` text
PRODUCTION HARDENING
```

Mention:

-   authentication
-   rate limiting
-   request validation
-   NoSQL injection protection
-   secure cookies
-   engine isolation
-   ephemeral-disk handling
-   Cloudinary migration
-   production error handling

The point is to show that the project was engineered beyond a localhost
demo.

------------------------------------------------------------------------

# 17. Section 14 --- Closing Result

The closing section should return to the product question.

Large text:

``` text
FROM
“WHAT CAN I SEE?”
```

Then:

``` text
TO
“WHAT SHOULD I LOOK AT RIGHT NOW?”
```

Then:

``` text
AND
“HOW DO I POINT AT IT?”
```

Finish with a concise technical summary:

> SkyGuide AI combines a distributed application architecture,
> scientific astronomy computation, real-time sensor streaming,
> contextual recommendation, telescope alignment and an AI assistant
> into a single observing workflow.

The final result should feel like a product, not a collection of
disconnected engineering experiments.

------------------------------------------------------------------------

# 18. Section 15 --- Next Case Transition

The reference ends with a large "Next case" composition.

Recreate the interaction.

Structure:

``` text
NEXT CASE

[ large next-project title ]

[ centered preview image ]

[ circular next-case button ]

[ All work → ]
```

Keep the page visually quiet.

The next-case button should be circular and should respond to cursor
movement.

Do not make it a standard rectangular CTA.

------------------------------------------------------------------------

# 19. Exact Visual Language

## Typography

Use:

``` text
Satoshi
```

Prefer:

``` css
font-family: "Satoshi", sans-serif;
```

Large headings should use a tight, editorial scale.

Suggested hierarchy:

``` text
Hero title:
clamp(4rem, 9vw, 10rem)

Section title:
clamp(3rem, 7vw, 8rem)

Body:
clamp(1rem, 1.2vw, 1.25rem)

Metadata:
0.65rem – 0.75rem
```

Avoid excessive font weights.

Use regular / medium / bold only where necessary.

------------------------------------------------------------------------

# 20. Color System

Keep the case study predominantly monochrome.

Suggested:

``` css
--background: #090909;
--foreground: #f4f4f4;
--muted: #8b8b8b;
--line: rgba(255,255,255,0.14);
--accent: #4f5cff;
```

Do not introduce gradients.

The accent should be used sparingly:

-   active states
-   circular interaction
-   important numbers
-   hover state
-   navigation state

The reference's visual strength comes from restraint.

------------------------------------------------------------------------

# 21. Spacing System

Use extremely generous vertical spacing.

Suggested baseline:

``` text
small gap:      16px
metadata gap:   32px
section gap:    120px
major gap:      180px
hero spacing:   220px+
```

For major visual transitions, allow the media to breathe.

Do not compress sections simply because the content is technical.

------------------------------------------------------------------------

# 22. Media Treatment

The project screenshots are the primary storytelling mechanism.

Use:

``` text
full-width screenshots
desktop browser frames
phone frames
device compositions
cropped cinematic media
```

Avoid:

``` text
tiny screenshots inside cards
dense grids
heavy borders
drop shadows everywhere
```

The media should often touch or nearly touch the viewport edges.

------------------------------------------------------------------------

# 23. Scroll Behavior

The reference relies heavily on scroll progression.

Implement the page as a sequence of scroll-driven compositions.

Recommended stack:

``` text
React
+
GSAP
+
ScrollTrigger
```

Use ScrollTrigger for:

-   image reveal
-   image scale
-   horizontal translation
-   pinned media
-   text movement
-   section transitions
-   next-case interaction

Do not animate everything.

Animation should communicate progression.

------------------------------------------------------------------------

# 24. Hero Animation

On initial page load:

``` text
small metadata
      ↓
large title
      ↓
metadata settles
      ↓
first media enters
```

Use:

``` text
opacity
transform: translateY(...)
clip-path
scale
```

Avoid dramatic bouncing.

The reference is editorial, not playful.

------------------------------------------------------------------------

# 25. Project Preview Animation

For the large first visual:

``` text
initial:
scale(1.08)
opacity: 0

scroll:
scale(1)
opacity: 1
```

Optionally introduce a subtle horizontal movement.

The media should feel like it is entering the viewer's field of view
rather than simply appearing.

------------------------------------------------------------------------

# 26. Image Showcase Animation

For each large project visual:

``` text
media starts slightly below
        ↓
scroll enters viewport
        ↓
translateY → 0
scale → 1
opacity → 1
        ↓
media remains stable
        ↓
next composition begins
```

Keep durations around:

``` text
0.7s – 1.2s
```

with smooth easing.

------------------------------------------------------------------------

# 27. Horizontal / Pinned Sections

For sections containing several product screenshots, use a pinned
horizontal sequence.

Concept:

``` text
VERTICAL SCROLL
       ↓
SECTION PINNED
       ↓
SCREEN 01 → SCREEN 02 → SCREEN 03 → SCREEN 04
       ↓
SECTION RELEASES
       ↓
NORMAL SCROLL
```

This is especially appropriate for:

``` text
Dashboard
Tonight
Explore
Alignment
Community
```

The viewer should feel like they are moving through the product.

------------------------------------------------------------------------

# 28. Device Composition

For desktop + phone scenes:

``` text
                 DESKTOP
              ┌─────────────┐
              │             │
              │  Dashboard  │
              │             │
              └─────────────┘

        ┌─────────┐
        │  PHONE  │
        │         │
        │ Align   │
        │         │
        └─────────┘
```

Animate the phone independently.

For example:

``` text
desktop:
translateX(0)

phone:
translateX(80px)
rotate(-4deg)
```

On scroll:

``` text
phone:
translateX(0)
rotate(0deg)
```

Do not overdo the perspective.

------------------------------------------------------------------------

# 29. Circular Floating Interaction

The reference contains a circular floating action element.

Recreate it for:

``` text
Next case
```

and optionally:

``` text
View live project
```

Behavior:

``` text
cursor approaches
      ↓
circle follows cursor subtly
      ↓
cursor enters target
      ↓
circle expands / changes label
```

Keep the interaction subtle.

The circle should feel like part of the visual composition.

------------------------------------------------------------------------

# 30. Responsive Behavior

The desktop experience is the primary composition.

However, mobile must not become a broken desktop layout.

### Desktop

``` text
large typography
full-width media
multi-column metadata
horizontal showcase
pinned sequences
device compositions
```

### Tablet

``` text
reduce type scale
reduce media width
collapse metadata
shorten horizontal sequences
```

### Mobile

``` text
single-column
stacked media
reduced animation
no complex horizontal overflow
smaller typography
full-width screenshots
```

Never allow:

``` text
horizontal page overflow
```

------------------------------------------------------------------------

# 31. Accessibility

Respect:

``` css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

``` text
no parallax
no cursor-following
no large transforms
no pinned animation dependencies
```

Content must still appear in its final readable state.

Also ensure:

-   semantic headings
-   alt text
-   keyboard-accessible links
-   visible focus states
-   sufficient contrast
-   no interaction that depends exclusively on hover

------------------------------------------------------------------------

# 32. Component Architecture

Suggested React structure:

``` text
src/
└── pages/
    └── SkyGuideCaseStudy/
        ├── SkyGuideCaseStudy.jsx
        ├── SkyGuideCaseStudy.css
        │
        ├── sections/
        │   ├── CaseHero.jsx
        │   ├── CaseMeta.jsx
        │   ├── ProductPreview.jsx
        │   ├── ProblemStatement.jsx
        │   ├── ArchitectureSection.jsx
        │   ├── AstronomyEngineSection.jsx
        │   ├── RecommendationSection.jsx
        │   ├── AlignmentSection.jsx
        │   ├── MobileCompanionSection.jsx
        │   ├── ProductSurfaces.jsx
        │   ├── ScaleSection.jsx
        │   ├── EngineeringDecisions.jsx
        │   ├── ProductionSection.jsx
        │   ├── CaseConclusion.jsx
        │   └── NextCase.jsx
        │
        └── components/
            ├── CaseMedia.jsx
            ├── CaseLabel.jsx
            ├── CaseMetaItem.jsx
            ├── FloatingCircle.jsx
            └── ScrollReveal.jsx
```

------------------------------------------------------------------------

# 33. Data-Driven Content

Do not hard-code every section directly into JSX.

Create a project data object:

``` javascript
const skyGuideCaseStudy = {
  title: "SkyGuide AI",

  category: "Real-time Astronomy Platform",

  description:
    "An AI-powered astronomical observation platform " +
    "combining scientific computation, real-time sensor data, " +
    "telescope alignment and personalized recommendations.",

  stack: [
    "React",
    "Node.js",
    "FastAPI",
    "MongoDB",
    "Socket.IO",
    "Astropy"
  ],

  metrics: [
    {
      value: "13,311",
      label: "Celestial Objects"
    },
    {
      value: "20Hz",
      label: "Orientation Stream"
    },
    {
      value: "3",
      label: "Core Services"
    }
  ]
};
```

This makes future case studies easier to build.

------------------------------------------------------------------------

# 34. Media Data Model

Use a media array:

``` javascript
const media = [
  {
    type: "image",
    src: "/case-study/skyguide/dashboard.webp",
    alt: "SkyGuide AI dashboard"
  },
  {
    type: "image",
    src: "/case-study/skyguide/tonight.webp",
    alt: "SkyGuide AI Tonight observation view"
  },
  {
    type: "image",
    src: "/case-study/skyguide/explore.webp",
    alt: "SkyGuide AI celestial catalog explorer"
  },
  {
    type: "image",
    src: "/case-study/skyguide/alignment.webp",
    alt: "SkyGuide AI telescope alignment interface"
  }
];
```

This makes the visual sequence easy to reorder.

------------------------------------------------------------------------

# 35. Performance Requirements

The case study will contain large media, so performance is critical.

Use:

``` text
WebP / AVIF
responsive image sizes
lazy loading
blur-up placeholders
poster frames for video
preload only hero media
```

Do not load every case-study image on initial page load.

Use:

``` html
loading="lazy"
```

for below-the-fold assets.

For hero media:

``` html
fetchpriority="high"
```

where appropriate.

------------------------------------------------------------------------

# 36. Technical Accuracy Rules

Do not describe SkyGuide AI using generic AI buzzwords.

Avoid:

``` text
AI-powered everything
revolutionary AI
smart astronomy
next-generation technology
```

Prefer technically precise descriptions:

``` text
contextual recommendation engine
astronomical ephemeris computation
coordinate transformation
real-time orientation streaming
device-independent calibration
geospatial observer discovery
distributed service architecture
WebSocket session synchronization
Mongo-backed caching
```

This is especially important for a developer portfolio.

------------------------------------------------------------------------

# 37. Recommended Portfolio Copy

## Short Description

``` text
SkyGuide AI is a real-time astronomical observation platform
that combines scientific astronomy computation with contextual
recommendations and live telescope alignment.

The system separates application orchestration from scientific
computation: a Node.js gateway manages authentication, business
logic and realtime sessions, while a FastAPI astronomy engine
handles celestial calculations, visibility, ephemeris and
recommendation inputs.
```

## Technical Description

``` text
The platform is built as a distributed system around a Node.js
application gateway and an isolated FastAPI astronomy engine.

The gateway owns user identity, telescope configuration,
business workflows and Socket.IO pairing sessions. The Python
service owns astronomy-specific computation through Astropy and
related astronomy libraries.

A mobile companion streams calibrated orientation data at 20Hz
through short-lived pairing sessions. The gateway consumes this
stream and combines it with ephemeris segments generated by the
FastAPI service to calculate low-latency telescope-to-target
alignment without making an HTTP request for every sensor frame.

Above the observation engine sits a contextual recommendation
layer that considers the observer's location, telescope,
visibility, Moon, weather and observation windows to determine
which celestial targets are most useful to observe at a given
moment.
```

------------------------------------------------------------------------

# 38. Portfolio Narrative

The entire case study should tell one technical story.

Start:

``` text
There are thousands of things in the sky.
The hard part is knowing what is worth looking at now.
```

Then:

``` text
SkyGuide AI understands the observer.
```

Then:

``` text
It understands the telescope.
```

Then:

``` text
It understands the sky.
```

Then:

``` text
It recommends a target.
```

Then:

``` text
It helps point the telescope.
```

Then:

``` text
It guides the observation in real time.
```

Finally:

``` text
The result is an observing loop rather than another astronomy catalog.
```

This narrative should control the order of visuals.

------------------------------------------------------------------------

# 39. Exact Page Rhythm

The final page should approximately feel like:

``` text
                    SkyGuide AI


        REAL-TIME ASTRONOMICAL PLATFORM


        project description

ROLE                 STACK               YEAR
Full-stack           React / Node        2026


────────────────────────────────────────────────


             [ LARGE PRODUCT VISUAL ]



                 THE PROBLEM


      What should I look at right now?


        short explanation



             [ LARGE VISUAL ]



                THE SYSTEM


       React → Node → FastAPI → Mongo



          [ ARCHITECTURE VISUAL ]



             THE INTELLIGENCE


             13,311 OBJECTS


          [ SKY / CATALOG VISUAL ]



          THE RECOMMENDATION LOOP


 Observer + Telescope + Sky + Moon
                ↓
           Recommendation


          [ PRODUCT VISUAL ]



             REAL-TIME ALIGNMENT


 Phone → Socket → Gateway → Astro Engine


          [ PHONE + DESKTOP ]



              THE PRODUCT


 Dashboard   Tonight   Explore
 Alignment   Community   Mobile


        [ LARGE MEDIA SEQUENCE ]



             ENGINEERING


     separation
     realtime
     caching
     security
     deployment



             THE RESULT


      “What should I look at?”
                 ↓
      “How do I point at it?”



              NEXT CASE

          [ NEXT PROJECT ]
```

------------------------------------------------------------------------

# 40. Implementation Order

Build in this order.

## Phase 1 --- Structure

Create:

``` text
SkyGuideCaseStudy.jsx
```

and implement every section with placeholder blocks.

Do not start with animations.

Verify the page hierarchy first.

------------------------------------------------------------------------

## Phase 2 --- Typography + Spacing

Implement:

``` text
font
type scale
line heights
metadata
section spacing
dividers
background
```

Match the reference's whitespace before adding motion.

------------------------------------------------------------------------

## Phase 3 --- Real Media

Replace placeholders with actual SkyGuide AI assets.

Required minimum set:

``` text
hero
dashboard
tonight
explore
alignment
mobile companion
architecture
recommendation
community
```

------------------------------------------------------------------------

## Phase 4 --- Scroll Motion

Add GSAP only after the static composition looks correct.

Implement:

``` text
hero reveal
image reveal
scale transitions
horizontal product showcase
pinned sections
next-case interaction
```

------------------------------------------------------------------------

## Phase 5 --- Cursor Interaction

Add the circular floating interaction last.

Do not let cursor interaction become the primary experience.

------------------------------------------------------------------------

## Phase 6 --- Responsive

Test:

``` text
1440px
1280px
1024px
768px
480px
375px
```

Check:

``` text
no horizontal overflow
no clipped media
no oversized typography
no broken pinned sections
no inaccessible controls
```

------------------------------------------------------------------------

## Phase 7 --- Performance

Audit:

``` text
Lighthouse
image sizes
lazy loading
layout shift
animation cost
initial JS
font loading
```

------------------------------------------------------------------------

# 41. Final Quality Bar

The finished section should **not** look like:

``` text
portfolio
  ↓
project card
  ↓
technology list
  ↓
screenshots
  ↓
paragraph
```

It should feel like:

``` text
editorial case study
        +
interactive product showcase
        +
technical system narrative
```

The viewer should be able to understand the project without reading
every sentence, while a technical reviewer should be able to see that
the architecture is deliberate.

The strongest sequence is:

``` text
VISUAL
  ↓
PRODUCT IDEA
  ↓
TECHNICAL SYSTEM
  ↓
REAL-TIME INTERACTION
  ↓
ENGINEERING DECISION
  ↓
VISUAL RESULT
```

That is the core principle for recreating the reference's detailed-work
experience for SkyGuide AI.
