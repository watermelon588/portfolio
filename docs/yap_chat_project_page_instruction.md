# Yap Chat — Portfolio Project Page Implementation Instructions

## Objective

Create a **dedicated Yap Chat project page** in the portfolio using the existing **SkyGuide AI project page as the primary structural and interaction reference**.

The goal is NOT to copy SkyGuide's content.

The goal is to reuse the same portfolio case-study system:

- typography
- spacing
- section rhythm
- media treatment
- parallax
- reveal animations
- project navigation
- footer transition
- existing buttons
- existing interactions

and tell the story of **Yap Chat** through a shorter, more visual and technically credible case study.

Yap Chat should feel like a sibling project to SkyGuide and Neuron — **not a new website inserted into the portfolio**.

---

# 1. READ DOCUMENTATION BEFORE TOUCHING CODE

Before implementing anything, inspect the repository and read all relevant Markdown files.

At minimum:

- `design.md`
- all existing portfolio/project-page instruction Markdown files
- SkyGuide project instructions
- Neuron project instructions
- any routing/project-registration documentation
- any animation documentation
- any component documentation
- any media/parallax documentation
- the Yap Chat README

The Yap Chat README is the technical source of truth for this project.

Do not invent architecture or features beyond what the documentation supports.

The README describes Yap Chat as:

> Private, code-based chat rooms with voice notes, photo sharing and peer-to-peer group video calling.

It is built on:

> MERN + Socket.IO + WebRTC

The README also documents the feature set, architecture, security hardening, testing, deployment considerations, and known limitations. fileciteturn7file0L1-L20

---

# 2. STUDY THE EXISTING SKYGUIDE PROJECT PAGE

Inspect the current SkyGuide project implementation before creating Yap Chat.

Reuse the existing:

- project-page shell
- hero structure
- case-study typography
- section spacing
- metadata treatment
- media containers
- media ratios
- parallax
- GSAP reveal animations
- feature showcase
- architecture cards
- decisions list
- conclusion
- footer / next-project transition

Do not recreate these systems from scratch.

The existing portfolio already has reusable infrastructure for:

- `Preloader`
- `Navbar`
- `Footer`
- GSAP / ScrollTrigger
- magnetic interaction
- project registry
- case-study registry
- feature showcase

The current project page architecture already imports these shared pieces. fileciteturn7file1L1-L14

---

# 3. HARD CONSTRAINT — REUSE EXISTING COMPONENTS

Before creating a new component, search the repository.

If an existing component can do the job, use it.

Priority:

```text
existing component
        ↓
existing interaction
        ↓
existing animation utility
        ↓
existing project-page section
        ↓
Yap-specific configuration
        ↓
new component only if genuinely necessary
```

Especially reuse:

- buttons
- circular buttons
- pills
- magnetic buttons
- project navigation
- media containers
- feature showcases
- architecture cards
- decision lists
- footer
- navbar
- parallax
- page transitions

Do not create duplicate button styles.

Do not create a second footer.

Do not create a second navigation.

Do not recreate existing hover effects.

---

# 4. GLOBAL STYLING MUST NOT BE TOUCHED

This task is strictly scoped.

Do NOT modify:

- global footer
- global navbar
- global buttons
- global typography
- global container system
- global body/reset
- SkyGuide page
- Neuron page
- other project pages
- shared GSAP/parallax behavior

unless a tiny project-registration change is required.

If Yap Chat requires new styles, scope them:

```css
.yap-...
```

Do not create generic selectors.

For example, avoid:

```css
.hero {}
.card {}
.section {}
.button {}
img {}
.footer {}
```

Use:

```css
.yap-hero {}
.yap-showcase {}
.yap-media {}
```

---

# 5. PROJECT REGISTRATION

Create Yap Chat as an individual portfolio project.

Use the existing project registry and routing system.

Required slug:

```text
yap-chat
```

or the repository's established slug if one already exists. Do not invent a conflicting slug.

The page must have its own:

- route
- project entry
- case-study content
- asset mapping
- dedicated page/component

Do not hard-code the entire page into SkyGuide.

Do not rename SkyGuide.

Do not remove existing projects.

---

# 6. PROJECT POSITIONING

Yap Chat is not just another chat UI.

The portfolio story should communicate:

> **A private place to actually yap.**

It combines:

- private code-based rooms
- one-to-one messaging
- photos
- voice notes
- presence
- group video calling
- WebRTC peer-to-peer media
- Socket.IO real-time signalling
- QR / invite links
- security hardening

The README explicitly defines rooms as code-based rather than one giant public room, and users can share room codes as text, links, or QR. fileciteturn7file0L25-L31

The product's strongest emotional idea is:

> **Private conversations without turning the interface into a corporate meeting room.**

Use humor carefully.

The page can have moments such as:

> “Sometimes you just want to yap.”

or:

> “No feed. No algorithm. Just your people.”

But technical claims must remain accurate.

---

# 7. PAGE LENGTH

Yap Chat should be **shorter than SkyGuide**.

Target:

```text
7–8 sections
```

The page should be:

- quick
- visual
- technically interesting
- emotionally readable
- easy to scan

Do not turn the README into a portfolio page.

---

# 8. HERO — SECTION 01

## Kicker

```text
01 — PRIVATE REAL-TIME COMMUNICATION
```

## Heading

```text
YAP CHAT
```

## Tagline

```text
A private place to actually yap.
```

## Supporting text

```text
Code-based chat rooms for people who want to talk, share, send voice notes,
and jump into a video call without turning everything into a social network.
```

Keep the hero typography large and editorial.

Do not add a giant block of technical text here.

---

# 9. HERO MEDIA — FULL-WIDTH HIGH-QUALITY VISUAL

This is one of the most important requirements.

Use the **highest-quality Yap Chat hero visual** as a **full-width visual spanning the viewport**.

Do not put it inside a small generic card.

Do not constrain it to a narrow `.container`.

The hero visual should feel cinematic and immersive.

## Hero media priority

Use the strongest full-width visual available from the Yap Chat `gallery` / `visual` assets.

Inspect the actual files and choose based on visual strength.

Prioritize:

1. strongest product screenshot/composition
2. strongest full product overview
3. strongest video-call visual
4. strongest real-time communication visual

If a high-quality hero video exists, prefer video for the hero.

The Yap Chat source documentation confirms the product includes an animated landing page using GSAP and a ScrollStack preview of the app. fileciteturn7file0L92-L98

## Hero behavior

Use:

- full viewport width
- natural image ratio when appropriate
- subtle parallax
- existing GSAP reveal
- existing media behavior
- no unnecessary frame/border
- no generic rounded card

The hero should look like a real product presentation.

---

# 10. SECTION 02 — WHY YAP CHAT EXISTS

## Kicker

```text
02 — WHY I BUILT IT
```

## Heading

```text
THE INTERNET HAS ENOUGH PLACES TO TALK.
I WANTED ONE THAT FELT PRIVATE.
```

## Body

```text
Most communication products assume the room already exists:
a follower graph, a giant server, a group chat with fifty people,
or another feed waiting to steal the evening.

Yap Chat starts somewhere smaller.

Create a room. Share the code. Let the people you actually want in.
Then talk.
```

## Technical bridge

```text
Underneath that simple interaction is a real-time system handling
authentication, room membership, message delivery, presence and media.
```

This section should establish the emotional motivation before showing implementation details.

---

# 11. VISUAL DIRECTION — SECTION 02

Use one strong image plus one smaller supporting image.

Do not make them identical.

Recommended composition:

```text
large visual
+
small offset visual
```

Use the Yap Chat gallery/visual assets that communicate:

- room creation
- chat
- private communication
- people/collaboration
- product identity

The README confirms room creation, custom/generated room codes, join links, QR codes and private room membership. fileciteturn7file0L58-L66

---

# 12. SECTION 03 — REAL-TIME MESSAGING

## Kicker

```text
03 — REAL-TIME, WITHOUT THE NOISE
```

## Heading

```text
TEXT. PHOTOS. VOICE NOTES.
SAME ROOM.
```

## Body

```text
Messages move through Socket.IO, so the room updates in real time instead
of waiting for refreshes or polling to catch up.

Photos live in the media panel.
Voice notes can be recorded, paused, replayed and discarded before sending.
Presence and unseen-message counts keep the room feeling alive.
```

The README specifically confirms:

- Socket.IO messaging
- photo sharing
- voice notes with record/pause/play/discard
- online/offline presence
- unseen-message counts
- user search within a room. fileciteturn7file0L68-L77

## Humor line

```text
Because apparently “seen 2 minutes ago” is already enough emotional damage.
```

Use humor sparingly.

---

# 13. VISUAL LAYOUT — SECTION 03

Use **2–3 visuals** depending on what is actually available.

Recommended:

```text
large chat UI
+
portrait / voice-note visual
+
small supporting image
```

Do not force identical dimensions.

Allow different source ratios.

Preserve the original artwork.

Use existing parallax.

---

# 14. SECTION 04 — VIDEO CALLING

This should be one of the strongest sections visually.

## Kicker

```text
04 — THEN IT GOT LOUDER
```

## Heading

```text
CHAT IS NICE.
EIGHT PEOPLE ON VIDEO IS ANOTHER STORY.
```

## Body

```text
A chat can turn into a group call without leaving the room.
The call stack uses WebRTC mesh connections, while Socket.IO handles
the signalling needed to get peers connected.

Mic and camera controls, screen sharing, emoji reactions, participant
management and an in-call chat panel keep the call self-contained.
```

The README confirms:

- group calls up to 8
- peer-to-peer WebRTC mesh
- call creation and room/call codes
- mic/camera toggles
- screen sharing
- in-call side panel
- emoji reactions
- host handover
- graceful degradation without camera or mic. fileciteturn7file0L79-L89

## Humor line

```text
One room. Eight people. Somewhere, someone's microphone is definitely on.
```

Use only if it fits the visual tone.

---

# 15. VIDEO-CALL HERO VISUAL

Use the strongest high-resolution video-call image.

The README specifically identifies:

```text
videocall.png
```

as showing:

- four participants
- side chat panel
- emoji reactions

fileciteturn7file0L44-L50

If the project contains a higher-quality video or visual showing the same feature, prefer the higher-quality asset.

This should be a **large / cinematic media section**, potentially full-width.

Do not make it a tiny architecture thumbnail.

---

# 16. SECTION 05 — ARCHITECTURE

## Kicker

```text
05 — UNDER THE HOOD
```

## Heading

```text
REAL-TIME UX. REAL-TIME PROBLEMS.
```

## Body

```text
The interface stays simple because the complexity is pushed underneath it.

React handles the experience.
Node + Express handle the application layer.
MongoDB persists users, rooms and messages.
Socket.IO carries real-time messaging and signalling.
WebRTC moves the actual call media peer-to-peer.
Cloudinary handles uploaded images and voice notes.
```

These technologies are explicitly documented in the Yap Chat README. fileciteturn7file0L102-L116

---

# 17. ARCHITECTURE VISUALIZATION

Use the existing portfolio architecture-card system.

Create three concise cards.

### CARD 01

```text
REAL-TIME LAYER

Socket.IO

Messages and signalling move through persistent socket connections.
```

### CARD 02

```text
MEDIA LAYER

WebRTC

Call media travels peer-to-peer instead of passing through the server.
```

### CARD 03

```text
APPLICATION LAYER

Node · Express · MongoDB

Authentication, rooms, messages, persistence and API logic.
```

Do not invent a distributed microservice architecture.

Do not claim SFU architecture.

The README explicitly says the current calls use a mesh topology and are comfortable at about 8 participants. fileciteturn7file0L347-L350

---

# 18. SECTION 06 — SECURITY

This section should make the project feel engineered rather than just visually polished.

## Kicker

```text
06 — PRIVATE MEANS SOMETHING
```

## Heading

```text
THE ROOM CODE ISN'T THE SECURITY MODEL.
```

## Body

```text
Authentication starts with signed JWT sessions.
Passwords are hashed with bcrypt.
Room membership is checked on message operations.
Rate limits protect authentication and API routes.
CORS is locked in production.
Helmet hardens HTTP headers.
Uploads are restricted so the server cannot become an accidental request proxy.
```

These security measures are explicitly documented in the README. fileciteturn7file0L275-L294

---

# 19. SECURITY VISUAL

Use a smaller, editorial visual rather than another giant product screenshot.

Good candidates:

- architectural visual
- monochrome technical visual
- UI detail
- abstract communication image

Use whitespace heavily.

This section should feel quieter than the video-call section.

---

# 20. SECTION 07 — TESTING / REALITY CHECK

## Kicker

```text
07 — IT ACTUALLY HAD TO WORK
```

## Heading

```text
NOT JUST “LOOKS GOOD IN THE SCREENSHOT.”
```

## Body

```text
The real test was getting the system to survive actual signalling,
messaging and security paths.

Video-call signalling was tested across creation, join ordering,
offer/answer relay, reactions, late joins, disconnect cleanup and host handover.

The API security suite covered token failures, NoSQL injection attempts,
IDOR protection, upload restrictions and login rate limiting.
```

The README reports:

- 20/20 video-call signalling tests
- 15/15 API security tests
- real WebRTC negotiation testing
- responsive testing across 320–1440px. fileciteturn7file0L298-L326

## Stats

Use only the documented numbers:

```text
20/20
VIDEO CALL SIGNALLING

15/15
API SECURITY

320 → 1440
RESPONSIVE CHECKS
```

Do not manufacture additional metrics.

---

# 21. TESTING VISUAL

Use a compact multi-image composition if useful:

```text
large testing/product visual
+
small UI detail
```

Do not overload this section.

The numbers should remain readable and authoritative.

---

# 22. SECTION 08 — CLOSING

## Kicker

```text
08 — THE POINT
```

## Heading

```text
LESS PLATFORM.
MORE PEOPLE.
```

## Accent line

```text
JUST OPEN A ROOM AND YAP.
```

## Body

```text
Yap Chat started as a simple communication idea and turned into a full-stack
real-time system: room-based identity, live messaging, media uploads,
voice notes, WebRTC calls, signalling, authentication and security hardening.

The interface stays simple because the engineering underneath it does the heavy lifting.
```

## Closing line

```text
Sometimes the best social product is the one that gets out of the way.
```

---

# 23. CLOSING VISUAL

Use one of the strongest brand/product visuals from the Yap Chat `gallery` or `visual` folders.

Prefer:

- full-width
- high quality
- emotionally strong
- visually different from the hero

Do not repeat the hero image unless it is intentionally used as a visual callback.

Use subtle parallax.

---

# 24. USE ALL AVAILABLE YAP CHAT VISUAL ASSETS INTELLIGENTLY

The project already contains a large visual collection.

The task is to **inspect and use the gallery/visual assets intentionally**, not dump every image onto the page.

Use:

- hero-quality assets for hero/major sections
- UI screenshots for technical/product sections
- video-call visuals for real-time section
- portrait/editorial visuals for emotional breaks
- architecture/technical visuals for engineering sections
- small visuals as supporting detail

The README's preview itself includes signup, chat with media panel, profile details, terms/privacy, plus a dedicated video-call preview. fileciteturn7file0L35-L50

### Important:

Do not use an asset merely because it exists.

Use an image only when it adds information, emotion, or rhythm.

---

# 25. IMAGE RATIO RULES

Different assets should use different viewports.

Do NOT force every image into the same ratio.

Support:

```text
16:9
4:3
3:4
1:1
natural
full-bleed
```

Rules:

- preserve important content
- avoid destructive cropping
- use `object-fit: contain` when full artwork visibility matters
- use `cover` only when the composition intentionally supports cropping
- give portrait images more vertical space
- give landscape images wider presentation
- allow full-width images to extend beyond the standard `.container`

The final page should feel art-directed.

---

# 26. FULL-WIDTH HERO REQUIREMENT

For the primary Yap Chat hero visual:

```text
width: 100vw
```

It should reach both viewport edges.

Do not constrain the hero visual inside the normal content container.

Use the existing full-bleed / viewport breakout technique already used elsewhere in the portfolio.

Do not create a global full-width utility if one already exists.

---

# 27. PARALLAX

Reuse the existing portfolio parallax system.

Do not build another scroll engine.

The visual system should behave consistently with SkyGuide / Neuron.

Use subtle movement:

```text
image y-percent
+
small scale adjustment
```

Respect:

```text
prefers-reduced-motion
```

The existing project implementation already uses GSAP/ScrollTrigger for:

- hero text reveal
- media parallax
- section reveals
- cards

fileciteturn7file1L170-L219 fileciteturn7file1L222-L288

Reuse this behavior rather than replacing it.

---

# 28. EXISTING BUTTONS / INTERACTIONS

All CTA buttons must use the existing portfolio button components/styles.

Do not create:

```text
new blue button
new pill system
new circle button
new magnetic button
```

Reuse the existing:

- pill
- magnetic
- round CTA
- arrow
- hover fill
- cursor effect

The existing Neuron implementation demonstrates the intended shared button pattern via `.footer-pill` and `.footer-round` magnetic controls. fileciteturn7file1L321-L355

Use the same system for Yap Chat.

---

# 29. MICRO-INTERACTIONS

Add interaction only where it supports the story.

Good:

- image parallax
- button magnetic effect
- subtle image reveal
- scroll-triggered text reveal
- video autoplay/mute/loop
- hover response on project media
- existing menu interaction

Avoid:

- cursor-following UI everywhere
- random floating elements
- excessive 3D
- constant movement
- excessive blur
- decorative particles

---

# 30. TECHNICAL STORY

The page should move logically:

```text
PRIVATE ROOM
      ↓
REAL-TIME CHAT
      ↓
MEDIA + VOICE
      ↓
VIDEO CALLING
      ↓
REAL-TIME ARCHITECTURE
      ↓
SECURITY
      ↓
TESTING
      ↓
WHY IT MATTERS
```

The visitor should understand both:

```text
why I built it
```

and

```text
how I built it
```

without reading a wall of text.

---

# 31. TONE

Use:

- confident
- technical
- human
- slightly funny
- concise
- first-person where appropriate

Avoid generic SaaS language.

Do not write:

> “Yap Chat is a revolutionary next-generation communication platform empowering seamless collaboration.”

Write:

> “Create a room. Share the code. Talk.”

Technical writing should still sound like the person who built it.

Humor should reinforce the product idea rather than become a comedy routine.

---

# 32. TECHNICAL ACCURACY

Do not claim:

- end-to-end encryption
- SFU video architecture
- horizontally scalable WebRTC mesh
- server-side media relay
- zero-knowledge architecture
- millions of users
- production scale metrics

The README explicitly states that:

- messages are NOT end-to-end encrypted
- video calls use mesh
- calls are in-memory
- scaling beyond the current design would require an SFU
- multiple instances would require shared Socket.IO state
- rate limiting is per-process. fileciteturn7file0L343-L350

These limitations can actually strengthen the portfolio story because they show engineering honesty.

---

# 33. OPTIONAL “HONEST ENGINEERING” MOMENT

Near the testing/closing section, optionally include a small note:

```text
BUILT WITH TRADE-OFFS.

WebRTC mesh keeps the system simple and server-light,
but eight people is where the architecture says “okay, enough.”

Beyond that, I'd want an SFU.
```

This is useful because it demonstrates architectural reasoning rather than pretending the system is infinitely scalable.

Use only if it fits the page rhythm.

---

# 34. RESPONSIVE DESIGN

Desktop:

- large typography
- full-width hero visual
- asymmetric compositions
- strong media presence

Tablet:

- reduce spacing
- preserve visual hierarchy
- adapt columns intelligently

Mobile:

- stack naturally
- preserve image ratios
- avoid horizontal overflow
- do not shrink giant desktop compositions into unusable thumbnails
- preserve button functionality
- preserve readable typography

The README confirms the original application itself was checked across 320, 375, 414, 768, 1024, 1280 and 1440 widths. fileciteturn7file0L322-L326

---

# 35. DO NOT CREATE UNNECESSARY CONTAINERS

Do not put every image inside:

```text
white card
rounded card
bordered card
shadowed card
```

The portfolio's visual language is editorial.

Use raw/full-bleed images where appropriate.

Use framed media only where it adds meaning.

The hero especially should feel like an image rather than a UI card.

---

# 36. FOOTER / NEXT PROJECT

Use the existing global Footer.

Do not create a Yap-specific footer.

Pass the correct next-project data through the existing mechanism.

Do not modify the global footer styling to accommodate Yap Chat.

Keep existing curved/reveal behavior intact.

---

# 37. CODE DISCIPLINE

Before modifying code:

1. inspect current architecture
2. identify existing reusable components
3. identify existing media utilities
4. identify existing project registration
5. identify shared animation behavior
6. implement only Yap-specific content/configuration

Avoid broad refactors.

Avoid changing working code unrelated to Yap Chat.

---

# 38. FINAL VALIDATION

## Content

- [ ] The visitor understands what Yap Chat is.
- [ ] The visitor understands why it was built.
- [ ] The visitor understands its real-time architecture.
- [ ] The visitor understands the WebRTC choice.
- [ ] The visitor understands security decisions.
- [ ] The visitor sees actual product visuals.
- [ ] The copy is concise.
- [ ] Humor is subtle.

## Visual

- [ ] Hero image is full viewport width.
- [ ] Hero uses the highest-quality suitable asset.
- [ ] Gallery/visual assets are intentionally used.
- [ ] Image ratios are preserved.
- [ ] Images are not unnecessarily cropped.
- [ ] Different sections use different visual layouts.
- [ ] Page feels visually rich without becoming cluttered.
- [ ] Typography matches existing portfolio.
- [ ] Colors match existing portfolio.

## Motion

- [ ] Existing parallax is reused.
- [ ] Existing reveal animations are reused.
- [ ] Existing hover effects are preserved.
- [ ] Existing magnetic effects are preserved.
- [ ] No second animation system is introduced.
- [ ] Reduced-motion behavior works.

## Architecture

- [ ] Yap Chat is separately registered.
- [ ] Yap Chat has its own route.
- [ ] SkyGuide is unchanged.
- [ ] Neuron is unchanged.
- [ ] Global footer is unchanged.
- [ ] Global navbar is unchanged.
- [ ] Shared buttons are unchanged.
- [ ] Shared animation utilities are unchanged.

## Technical accuracy

- [ ] Socket.IO is represented accurately.
- [ ] WebRTC mesh is represented accurately.
- [ ] 8-person call limit is represented accurately.
- [ ] MongoDB/Mongoose is represented accurately.
- [ ] Cloudinary is represented accurately.
- [ ] JWT + bcrypt are represented accurately.
- [ ] Security claims are supported by the README.
- [ ] No unsupported claims are introduced.

---

# 39. DEFINITION OF DONE

The final page should feel like:

> **SkyGuide's more social, slightly chaotic sibling.**

The visual language remains consistent with the portfolio.

The story is:

```text
I wanted a smaller, more private place to talk.
        ↓
So I built code-based rooms.
        ↓
Then real-time messaging.
        ↓
Then photos and voice notes.
        ↓
Then WebRTC calls.
        ↓
Then I had to make all of that reliable and secure.
```

The visitor should leave with two impressions:

### Emotion

> “This feels like a place I would actually use with my people.”

### Engineering

> “Okay, this guy didn't just build a chat UI — he built the real-time system underneath it.”

That balance is the entire point of the page.
