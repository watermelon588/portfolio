# PROJECT_OVERVIEW.md

> **Status:** Active — planning phase · **Last updated:** 2026-07-09 · **Owner:** Rohit Maity (maityrohit021@gmail.com)

## What this is

A personal portfolio website for Rohit Maity — full-stack (MERN) developer — designed to compete visually with award-winning portfolios (reference class: dennissnellenberg.com, Awwwards SOTD work) while showcasing engineering depth through interactive project breakdowns and an AI voice assistant that speaks in Rohit's own cloned voice.

This is not a template portfolio. It is a designed product with three pillars:

1. **Craft** — a strict design system (tokens, one easing family, fluid typography, light/dark section worlds) executed with GSAP, Lenis, Motion, React Three Fiber, and curated ReactBits components. Documented in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
2. **Proof of work** — MDX case studies and dev logs that read like engineering write-ups, not screenshots with captions.
3. **Differentiator** — an AI layer ([AI_PIPELINE.md](./AI_PIPELINE.md)): visitors can *talk to the portfolio* (ElevenLabs voice clone + Claude) and interrogate any project ("why Mongo over Postgres here?") via RAG over the case-study corpus.

## Goals

| # | Goal | Measure |
|---|---|---|
| G1 | Land interviews / freelance leads | Contact conversions, recruiter feedback |
| G2 | Demonstrate front-end mastery | Motion quality, Lighthouse ≥ 90 across the board, Awwwards-submission-worthy |
| G3 | Demonstrate full-stack + AI competence | Working Express API, FastAPI RAG + voice pipeline in production |
| G4 | Sustainable to maintain | Content = MDX files + small admin API; new project publishable in < 1 hour |

## Audience

Recruiters and hiring managers (skim: 30–90 seconds → hero, selected work, contact), fellow engineers (deep-read: case studies, dev logs, playground), and prospective freelance clients (trust signals: polish, testimonials, availability chip).

## Scope — v1.0

- Pages: Home, Work index, Case study (×3–5 launch projects), About, Dev Logs, Playground/Lab, Contact, 404, `/ask` (AI, Phase 6)
- Backend: projects/contact/dev-log APIs, single-admin auth, contact notifications
- AI: voice assistant + per-project chat (phased in after core site ships)

## Non-goals (v1)

- Multi-user CMS, comments, newsletters, analytics dashboards
- i18n (English only at launch)
- Blog SEO farming — dev logs are craft artifacts, not content marketing
- Native app / PWA offline mode

## Stack summary

React 19 + Vite + Tailwind v4 SPA · Express 5 + Mongoose 8 API · FastAPI AI sidecar (Claude + ElevenLabs + Voyage embeddings + Atlas Vector Search) · MongoDB Atlas · Cloudinary · pnpm monorepo. Full rationale in [DECISIONS.md](./DECISIONS.md); topology in [ARCHITECTURE.md](./ARCHITECTURE.md).

## Key links

- Repo: local (`C:\Users\Rohit Maity\Desktop\coding\Webdev\project\portfolio`) — git init pending (Phase 1)
- Domain: TBD (candidate: rohitmaity.dev)
- Reference teardown + inspiration list: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) Part IX
