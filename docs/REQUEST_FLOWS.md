# REQUEST_FLOWS.md

> **Status:** Designed, pre-implementation · **Last updated:** 2026-07-09
> Sequence walkthroughs for the flows that matter. Contracts: [API_SPEC.md](./API_SPEC.md) · topology: [ARCHITECTURE.md](./ARCHITECTURE.md).

## 1. First visit → interactive home

```mermaid
sequenceDiagram
  participant B as Browser
  participant V as Vercel CDN (web)
  participant A as Express api
  B->>V: GET / (prerendered HTML + hashed assets)
  V-->>B: HTML (meta/OG complete) + critical CSS + font preload
  Note over B: Preloader plays (≤2.5s budget)<br/>Lenis + GSAP init via MotionProvider
  B->>A: GET /api/projects?featured=true
  A-->>B: project cards (cached, ETag)
  Note over B: Hero WebGL (Liquid Ether) lazy-mounts<br/>only if desktop + !reducedMotion + !lowEnd
```
Failure modes: api down → work section renders from build-time snapshot fallback; WebGL init throws → static gradient poster swap (no layout shift).

## 2. Route change (SPA page transition)

```
click → router intent intercepted → PageTransition overlay in (curved screen, ~0.5s, scroll locked)
      → route swaps + data prefetch resolves → overlay out (~0.8s) → entrance timeline (rise + stagger)
      → ScrollTriggers of old page killed on unmount; Lenis scrollTo(0, immediate)
```
Reduced motion: overlay replaced by 150ms opacity fade; scroll reset instant.

## 3. Contact submission

```mermaid
sequenceDiagram
  participant B as Browser (Stepper form)
  participant A as Express api
  participant M as MongoDB
  participant R as Resend
  B->>A: POST /api/contact {name,email,projectType,message,website:""}
  A->>A: rate limit (5/h/IP) → honeypot check → Zod validate
  A->>M: insert contacts doc (status:new, ipHash)
  A->>R: send notification email (async, failure logged not surfaced)
  A-->>B: 201 {received:true}
  Note over B: success state: bounce-in check (--success),<br/>errors map to field-level messages from envelope
```

## 4. Project-scoped AI chat (RAG, text) — Phase 6

```mermaid
sequenceDiagram
  participant B as Browser (case study panel)
  participant AI as FastAPI ai
  participant VY as Voyage (embed)
  participant M as Atlas ($vectorSearch)
  participant C as Claude API
  B->>AI: POST /ai/projects/twice-clone/chat (SSE) {sessionId, messages}
  AI->>AI: budget check (session caps) → sanitize input
  AI->>VY: embed(query)
  AI->>M: $vectorSearch k=8 filter projectSlug
  AI->>C: stream(persona + chunks + history)
  C-->>AI: token stream
  AI-->>B: SSE: token* → sources → usage → done
  AI->>M: upsert ai_sessions (usage, transcript, TTL 30d)
```
Failure modes: budget hit → `error` event `BUDGET_EXCEEDED` + UI offers contact form; Claude 5xx → one retry then `AI_UPSTREAM`.

## 5. Voice session (ElevenLabs Agents) — Phase 6

```mermaid
sequenceDiagram
  participant B as Browser (AIVoiceOrb)
  participant AI as FastAPI ai
  participant EL as ElevenLabs
  B->>AI: POST /ai/voice/session
  AI->>AI: origin check + caps (3/day/IP, 5 min max)
  AI->>EL: create conversation → signed URL (TTL ≤60s)
  AI-->>B: {signedUrl, expiresAt}
  B->>EL: WebRTC connect (mic ↔ agent, cloned voice out)
  EL->>AI: custom-LLM bridge: POST (query context)
  AI->>AI: same RAG steps as flow 4
  AI-->>EL: grounded answer text
  EL-->>B: spoken audio (Rohit's voice) + transcript events
```

## 6. Admin publishes a project

```
login (JWT + refresh cookie) → POST /api/admin/media/sign → direct browser→Cloudinary upload
→ POST /api/admin/projects {meta} → merge MDX case study into repo (PR) → CI: build web + POST /ai/ingest (changed hashes only)
→ live: list/API instantly, case-study page on deploy, AI answers on ingest completion
```

## 7. Health & observability

- `GET /api/health`, `GET /ai/health` polled by Railway; Vercel handles web.
- Client web-vitals beacon → `POST /api/vitals` (fire-and-forget, sampled 10%) — feeds [PROJECT_SCORECARD.md](./PROJECT_SCORECARD.md).
- Request IDs: client generates per page-load UUID, sent as `X-Request-Id`, echoed in logs both services.
