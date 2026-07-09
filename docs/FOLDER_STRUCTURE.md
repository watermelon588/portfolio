# FOLDER_STRUCTURE.md

> **Status:** Planned (Phase 1 scaffold target) · **Last updated:** 2026-07-09

```
portfolio/
├── CLAUDE.md                    # AI-assistant operating manual (auto-loaded)
├── README.md                    # (Phase 1) public-facing readme
├── docs/                        # ← all project documentation (this suite)
├── package.json                 # workspace root (pnpm), shared scripts
├── pnpm-workspace.yaml
├── turbo.json                   # (optional) task pipeline
├── .github/workflows/           # CI: lint, test, build, deploy
│
├── packages/
│   └── shared/                  # cross-app contracts
│       ├── src/schemas/         # Zod schemas (project, contact, chat…)
│       ├── src/types/           # inferred TS types
│       └── src/tokens/          # design tokens as data (colors, easing, durations)
│
├── apps/
│   ├── web/                     # React 19 + Vite + TS + Tailwind v4
│   │   ├── index.html
│   │   ├── vite.config.ts       # + @mdx-js/rollup, prerender step
│   │   ├── public/fonts/        # self-hosted woff2 subsets
│   │   ├── content/             # MDX — the content layer
│   │   │   ├── case-studies/    #   one folder per project (mdx + assets meta)
│   │   │   └── dev-logs/
│   │   └── src/
│   │       ├── main.tsx / App.tsx / routes.tsx
│   │       ├── styles/          # tokens.css (DESIGN_SYSTEM Part III), base.css
│   │       ├── providers/       # MotionProvider (lenis + gsap + device gates), ThemeSection
│   │       ├── hooks/           # useMagnetic, useSplitLines, useScrollScene, useCursor
│   │       ├── components/
│   │       │   ├── ui/          # MagneticButton, Pill, Hairline, Label, LocalTime…
│   │       │   ├── motion/      # CurvedReveal, Preloader, PageTransition, CursorFollower, SplitLines
│   │       │   ├── sections/    # Hero, WorkList, Manifesto, StripGallery, ContactCTA…
│   │       │   ├── ai/          # AIVoiceOrb, VoicePanel, ProjectChat  (Phase 6 — mount points reserved)
│   │       │   └── vendor/
│   │       │       └── reactbits/   # vendored TS-Tailwind components (LiquidEther, SplashCursor,
│   │       │                        # StaggeredMenu, FlowingMenu, ScrollReveal, FallingText,
│   │       │                        # TextPressure, MagicBento, Masonry, ImageTrail, Stepper,
│   │       │                        # ShapeBlur, LineSidebar) — track upstream in TECH_DEBT
│   │       ├── pages/           # home, work, work.$slug, about, logs, logs.$slug, lab, contact, ask, 404
│   │       ├── lib/             # api client, seo helpers, analytics
│   │       └── three/           # R3F scenes (hero background, lab experiments)
│   │
│   ├── api/                     # Node 22+ · Express 5 · TS
│   │   └── src/
│   │       ├── index.ts / app.ts
│   │       ├── config/          # env loading (zod-validated)
│   │       ├── middleware/      # auth, rateLimit, validate, errorHandler
│   │       ├── models/          # Mongoose: Project, Contact, DevLogMeta, Admin
│   │       ├── routes/          # projects, logs, contact, auth, admin, health
│   │       ├── services/        # mail (Resend), cloudinary sign
│   │       └── tests/           # vitest + supertest
│   │
│   └── ai/                      # Python 3.12 · FastAPI · uv
│       ├── pyproject.toml
│       ├── app/
│       │   ├── main.py          # app factory, CORS, slowapi
│       │   ├── config.py        # pydantic-settings
│       │   ├── routers/         # chat.py, voice.py, ingest.py, health.py
│       │   ├── services/        # claude.py, elevenlabs.py, embeddings.py, retriever.py
│       │   ├── rag/             # chunking, prompts, persona
│       │   └── models/          # pydantic request/response schemas
│       └── tests/               # pytest + httpx
│
└── .env.example files per app   # templates in CONFIGURATION.md
```

## Conventions

- **Vendored ReactBits** live only under `components/vendor/reactbits/`, one folder per component, with an `UPSTREAM.md` noting source URL + fetch date. Never edit-in-place without noting divergence ([TECH_DEBT.md](./TECH_DEBT.md)).
- **Sections vs pages:** pages compose `sections/*`; sections own their ScrollTrigger scope and clean up on unmount.
- **AI mount points** (`components/ai/`, `/ask` route) exist from Phase 1 as stubs so Phase 6 slots in without layout rework.
- **Content:** adding a project = new folder in `content/case-studies/` + one admin API call for its meta record; see [CONTRIBUTING.md](./CONTRIBUTING.md).
