# FORCASTR — Project Page Instruction

## Goal

Create a dedicated **FORCASTR** project page inside the existing portfolio.

FORCASTR is a small project, so this page must be **short, visual, and minimal**.

Use the existing **SkyGuide project page as the structural and styling reference**, but do NOT reproduce its length or storytelling depth.

The page should communicate the project in roughly **30–60 seconds of scrolling**.

---

## 1. READ BEFORE IMPLEMENTING

First inspect the repository and read:

- `design.md`
- all relevant `.md` documentation files
- the existing SkyGuide project page
- the existing project-page architecture
- project registry / routing
- reusable media components
- existing buttons
- existing hover/magnetic interactions
- existing page transitions
- existing scroll/reveal animations
- existing Navbar and Footer

Follow the existing design system.

**Do not modify unrelated pages, components, global styles, or interactions.**

---

## 2. PROJECT CONTENT

### Name
**FORCASTR**

### Tagline
**Feel the forecast.**

### Short description
> A calm, visual weather experience designed to make forecasts feel less like data and more like an atmosphere.

### Project description
> FORCASTR turns current conditions, forecasts, and hourly weather into one calm interface. Instead of overwhelming the user with numbers, it uses visual hierarchy, motion, and weather-aware themes to make the forecast easier to read.

---

## 3. PAGE STRUCTURE

Keep the page intentionally compact:

```text
HERO
↓
LARGE VISUAL
↓
SHORT INTRO
↓
2–3 FEATURE VISUALS
↓
THEME / ATMOSPHERE VISUAL
↓
TECH STACK
↓
LIVE PROJECT CTA
↓
EXISTING GLOBAL FOOTER
```

Do not add unnecessary sections.

Do NOT create:
- long case-study storytelling
- research sections
- problem/solution essays
- architecture sections
- development timeline
- statistics sections
- testimonials
- FAQ
- large technical explanations

---

## 4. HERO

Use the existing project-page hero system.

Display:

**FORCASTR**

**Feel the forecast.**

Supporting copy:

> A calm, visual weather experience designed to make forecasts feel less like data and more like an atmosphere.

Keep typography, spacing, reveal animation, and alignment consistent with SkyGuide and the existing design system.

Do not create a new hero component.

---

## 5. HERO IMAGE

Find the highest-quality FORCASTR visual inside the repository.

Search especially:

```text
src/assets/
src/assets/Figma/
src/assets/Figma/designs/
src/assets/Figma/themes/
```

Look for:
- landing screen
- current weather screen
- forecast screen
- hourly weather screen
- expanded forecast
- theme explorations
- Figma exports

Use the strongest visual as the hero.

### Image rules

- preserve the original aspect ratio
- do not stretch
- do not unnecessarily crop
- do not use low-resolution assets when HQ versions exist
- use the full visual where possible
- allow the actual image ratio to determine the media treatment

If the visual works best as a full-width image, make it full-width.

---

## 6. INTRO SECTION

### Heading
**Weather, without the noise.**

### Copy
> FORCASTR turns current conditions, forecasts, and hourly weather into one calm interface. Instead of overwhelming the user with numbers, it uses visual hierarchy, motion, and weather-aware themes to make the forecast easier to read.

Keep this compact.

---

## 7. FEATURE VISUALS

Use **2–3 actual FORCASTR images** from the repository.

Prioritize:
1. Current weather
2. Forecast
3. Hourly weather

Use different layouts where the image ratios justify it.

Example:

```text
        LARGE CURRENT WEATHER IMAGE

   FORECAST IMAGE       HOURLY IMAGE
```

Do not force every image into the same aspect ratio.

Do not put images inside unnecessary decorative cards.

Use existing portfolio media/grid components.

---

## 8. FEATURE COPY

Keep each description extremely short.

### Current Weather

> Everything important at a glance.

> Temperature, RealFeel, humidity, pressure, wind, visibility, and daily extremes without the usual dashboard clutter.

### Forecast

> Five days, without the spreadsheet.

> Expandable daily forecasts reveal morning, afternoon, evening, and night conditions only when you need them.

### Hourly

> See what changes next.

> A focused 24-hour view with expandable hourly details and smooth interactions.

Do not expand these into long paragraphs.

---

## 9. THEMES

If suitable theme visuals exist, include one strong visual showing the visual/theme system.

### Heading
**Weather changes the mood.**

### Copy
> FORCASTR uses centrally managed themes to keep the background, typography, accents, and weather visuals working together.

Use one large image or a restrained visual arrangement.

Do not create a large gallery.

---

## 10. TECHNOLOGY

Keep the technical section minimal.

### Heading
**Built from scratch.**

### Content

```text
React · Vite · Tailwind CSS · OpenWeather API · Axios · React Router
```

Optional supporting line:

> No template. No UI kit. Built from the ground up.

Do not create an architecture diagram or technical deep dive.

---

## 11. LIVE PROJECT CTA

Add a clear CTA using the **existing portfolio button component**.

Button text:

**Visit FORCASTR ↗**

For now use this placeholder:

```text
https://forcastr-live-placeholder.com
```

Make the placeholder easy to replace later.

Do NOT invent a deployed URL.

If the existing project-page system supports source links, also include:

**View source ↗**

Repository:

```text
https://github.com/watermelon588/FORCASTR
```

Reuse existing link/button styling.

---

## 12. PROJECT REGISTRATION

Register the project through the existing project registry/routing architecture.

Use:

```text
forcastr
```

as the project slug unless the existing routing convention requires another format.

Do not create a one-off architecture if the portfolio already has a reusable project-page system.

Do not modify existing project registrations.

---

## 13. MEDIA BEHAVIOR

The page should be image-led.

Use:
- high-quality images
- full-width media where appropriate
- natural image ratios
- existing parallax/reveal behavior
- existing hover behavior

Do not crop images simply to make them fit a fixed container.

Do not introduce outer boxes around images unless the existing design system already uses them for that specific media treatment.

---

## 14. ANIMATION

Keep motion subtle.

Reuse existing:
- image reveals
- scroll reveals
- parallax
- magnetic buttons
- hover effects
- cursor interactions
- page transitions

Do not introduce:
- particle effects
- elaborate 3D animation
- excessive parallax
- text scrambling
- animated gradients
- new animation libraries

The project is intentionally simple.

---

## 15. RESPONSIVE

### Desktop
- strong hero
- large visual
- spacious editorial layout
- 2-column feature media where appropriate

### Tablet
- maintain visual hierarchy
- reduce spacing naturally

### Mobile
- single-column layout
- preserve image ratios
- no horizontal overflow
- no unnecessary image cropping
- readable typography
- comfortable spacing

Use the existing responsive system.

---

## 16. NAVBAR / FOOTER

Use the existing global:
- Navbar
- Footer
- menu
- cursor
- page transitions

Do not redesign or modify them for FORCASTR.

The page should simply plug into the existing portfolio system.

---

## 17. DESIGN LANGUAGE

The final page should feel like a **smaller sibling of SkyGuide**.

Same:
- typography
- spacing language
- media treatment
- dividers
- interactions
- button behavior
- page transitions

But significantly:
- shorter
- quieter
- more visual
- less text-heavy

The visuals should do most of the storytelling.

---

## 18. ABSOLUTE RULES

**DO NOT TOUCH ANYTHING ELSE.**

Do not:
- rewrite global CSS
- change global typography
- change global colors
- modify Navbar styling
- modify Footer styling
- modify existing buttons
- modify existing interactions
- modify SkyGuide
- modify Neuron
- modify Yap Chat
- modify About
- modify Home
- modify unrelated project pages
- add unnecessary dependencies
- create duplicate components when reusable components already exist

Only implement and register the FORCASTR project page.

---

## 19. FINAL VALIDATION

Before finishing, verify:

- [ ] `design.md` was read.
- [ ] Relevant `.md` files were read.
- [ ] SkyGuide implementation was inspected.
- [ ] Existing project architecture was reused.
- [ ] Existing FORCASTR assets were located.
- [ ] Highest-quality suitable visuals were used.
- [ ] Images are not unnecessarily cropped.
- [ ] Hero is visually strong.
- [ ] Page remains short.
- [ ] 2–3 feature visuals are included.
- [ ] Theme visual is included if suitable.
- [ ] Tech stack remains minimal.
- [ ] Live link uses the placeholder URL.
- [ ] Existing buttons/interactions are reused.
- [ ] Existing Navbar/Footer remain untouched.
- [ ] No unrelated files/components were modified.

### Final principle

> **FORCASTR is a small project. Make the page feel small, polished, visual, and intentional. Do not inflate it into a case study.**
