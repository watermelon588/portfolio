# Fix — Project Metadata / Credits Section

## Goal

Fix this specific project-information section so it follows the **same composition, alignment, spacing, and visual hierarchy as the provided reference**.

This is a **small targeted correction**.

Do not redesign the section. Do not introduce new components, colors, typography, buttons, hover effects, or spacing systems. Reuse the existing website design system.

---

## 1. Keep Only Three Metadata Fields

Remove all current metadata except:

```text
ROLE
ARCHITECTURE
YEAR
```

Use exactly:

```text
ROLE
Full-stack / Systems Engineering

ARCHITECTURE
Distributed Microservices

YEAR
2026
```

Remove:

```text
TYPE
STACK
REAL-TIME
DEPLOYMENT
DATA
CREDITS
LOCATION
```

Do not add any additional metadata.

---

## 2. Match the Reference Composition

The reference uses one shared content axis:

```text
                    TWICE
                    ↑
                    │
                    │ same left edge
                    ↓
              ROLE / SERVICES
```

For SkyGuide:

```text
                    SKYGUIDE AI
                    ↑
                    │
                    │ same left edge
                    ↓
              ROLE       ARCHITECTURE       YEAR
```

The large heading and the metadata grid must use the **same container/grid alignment**.

Do not center the heading independently from the metadata.

Do not create separate container widths.

---

## 3. Heading

Use:

```text
SKYGUIDE AI
```

Requirements:

- large editorial display size matching the reference
- same existing portfolio font
- same existing font weight
- left aligned
- no card/background
- generous whitespace above and below
- aligned to the first metadata column

The heading should occupy the same visual role as `TWICE` in the reference.

Do not invent a new typography system.

---

## 4. Three-Column Metadata Grid

Desktop structure:

```text
ROLE                    ARCHITECTURE                    YEAR

────────────────        ───────────────────             ─────────────

Full-stack /            Distributed                     2026
Systems Engineering     Microservices
```

Use the existing site grid/container if available.

Conceptually:

```css
grid-template-columns: repeat(3, 1fr);
```

Do not use absolute positioning or viewport-specific magic numbers.

---

## 5. Metadata Styling

Each item follows:

```text
LABEL

────────────────────

VALUE
```

Labels:

```text
ROLE
ARCHITECTURE
YEAR
```

Use:

- existing small-label typography
- uppercase
- existing muted color
- existing letter spacing

Values use the existing body typography and foreground color.

Do not make values bold, accent-colored, or oversized.

---

## 6. Divider

Use a thin divider between each label and its value.

Reuse the existing border/divider token.

Do not introduce a new gray.

Do not add cards, shadows, rounded containers, or backgrounds.

The reference relies on whitespace and thin lines.

---

## 7. Spacing

Preserve the reference's generous editorial whitespace:

```text
large whitespace
        ↓
SKYGUIDE AI
        ↓
generous gap
        ↓
ROLE / ARCHITECTURE / YEAR
        ↓
divider
        ↓
values
```

Use the website's existing spacing system.

Do not fill the section with arbitrary pixel values or negative-margin hacks.

---

## 8. Responsive

Desktop:

```text
ROLE        ARCHITECTURE        YEAR
```

Mobile:

```text
ROLE
──────
Full-stack / Systems Engineering

ARCHITECTURE
──────
Distributed Microservices

YEAR
──────
2026
```

The heading remains left aligned with the metadata.

No horizontal overflow.

Use the existing responsive breakpoints.

---

## 9. Do Not Touch

Do not modify:

```text
global typography
global colors
global spacing tokens
global buttons
global navbar
global footer
existing reveal effects
existing hover effects
other case-study sections
```

Only fix this project metadata section.

---

## 10. Verification

- [ ] Only ROLE, ARCHITECTURE, YEAR remain.
- [ ] Heading is `SKYGUIDE AI`.
- [ ] Heading uses existing display typography.
- [ ] Heading and metadata share the exact same left alignment axis.
- [ ] Three equal metadata columns on desktop.
- [ ] Labels are small, uppercase, muted.
- [ ] Thin dividers match the existing site.
- [ ] Values use existing body typography.
- [ ] No cards or new visual treatments.
- [ ] Existing colors and spacing tokens are used.
- [ ] Mobile stacks cleanly.
- [ ] No horizontal overflow.
- [ ] Nothing outside this section changes.

---

## Final Instruction

**Match the reference's layout and alignment, not its content.**

The result should be a minimal editorial project-information block using the existing portfolio design system:

```text
SKYGUIDE AI

ROLE            ARCHITECTURE            YEAR
──────          ───────────             ─────
Full-stack      Distributed             2026
/ Systems       Microservices
Engineering
```

**Keep it simple. Keep it aligned. Do not add anything extra.**
