# API_SPEC.md

> **Status:** Draft v0.1 (pre-implementation contract) · **Last updated:** 2026-07-09
> Two services: **`apps/api`** (Express, core data) and **`apps/ai`** (FastAPI, AI features). Shapes here are the contract; Zod/Pydantic schemas in `packages/shared` and `apps/ai/app/models` must match.

## Conventions

- Base URLs: `https://api.<domain>` (Express) · `https://ai.<domain>` (FastAPI). Local: `:4000` / `:8000`.
- JSON everywhere; timestamps ISO-8601 UTC; ids are Mongo ObjectIds serialized as strings.
- Success: `2xx` with resource or `{ data, meta? }` for lists. Errors — one envelope:

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "email is invalid", "details": [ ... ] } }
```

Codes: `VALIDATION_ERROR` 400 · `UNAUTHORIZED` 401 · `FORBIDDEN` 403 · `NOT_FOUND` 404 · `RATE_LIMITED` 429 · `INTERNAL` 500 · `AI_UPSTREAM` 502 · `BUDGET_EXCEEDED` 429 (AI).

- CORS: allowlist = site origin(s) only. All responses `application/json` unless SSE (`text/event-stream`).
- Rate limits (defaults): public GET 120/min/IP · `POST /contact` 5/hour/IP · AI chat 20 msg/session, 60/min/IP burst guard.

---

## Express — `apps/api`

### Public

| Method & path | Purpose | Notes |
|---|---|---|
| `GET /api/health` | liveness | `{ status: "ok", uptime }` |
| `GET /api/projects` | project cards for Work/Home | query: `?tag=design|development|ai`, `?featured=true`; sorted by `order` |
| `GET /api/projects/:slug` | one project meta | 404 envelope if unknown; case-study body itself is MDX in the web bundle |
| `GET /api/logs` | dev-log metadata list | pagination `?page&limit` (max 50), returns `{ data, meta: { total, page } }` |
| `POST /api/contact` | contact form intake | body below; honeypot field `website` must be empty; strict rate limit; sends Resend notification + stores document |

`POST /api/contact` body (Zod: `contactSchema`):

```json
{
  "name": "string 2..80",
  "email": "valid email",
  "projectType": "design | development | fullstack | ai | other",
  "message": "string 10..2000",
  "website": ""            // honeypot — non-empty ⇒ silently accepted, dropped
}
```
→ `201 { "id": "...", "received": true }`

### Auth (single admin)

| Method & path | Purpose |
|---|---|
| `POST /api/auth/login` | `{ email, password }` → `{ accessToken }` (15 min JWT) + httpOnly refresh cookie (7 d, rotating) |
| `POST /api/auth/refresh` | cookie → new access token |
| `POST /api/auth/logout` | revoke refresh |

### Admin (Bearer access token)

| Method & path | Purpose |
|---|---|
| `POST /api/admin/projects` | create project meta |
| `PUT /api/admin/projects/:id` | update (incl. `order`, `featured`, `published`) |
| `DELETE /api/admin/projects/:id` | soft-delete (`published:false` first; hard delete requires `?hard=true`) |
| `GET /api/admin/contacts` | inbox with pagination + `?unread=true` |
| `PATCH /api/admin/contacts/:id` | mark read/archived |
| `POST /api/admin/media/sign` | short-lived Cloudinary upload signature |

Project resource shape: see [DATABASE.md](./DATABASE.md) → `projects`.

---

## FastAPI — `apps/ai`

Space reserved by Phase 1; implemented Phase 6. Full pipeline detail: [AI_PIPELINE.md](./AI_PIPELINE.md).

| Method & path | Purpose | Notes |
|---|---|---|
| `GET /ai/health` | liveness + model config echo (no secrets) | |
| `POST /ai/chat` | site-wide assistant chat (text mode) | **SSE stream** |
| `POST /ai/projects/{slug}/chat` | project-scoped RAG chat ("interactive breakdown") | **SSE stream**; retrieval filtered to that project's chunks |
| `POST /ai/voice/session` | mint short-lived **ElevenLabs signed URL / conversation token** for the browser voice widget | origin-checked; per-IP + daily global caps |
| `POST /ai/tts` | one-shot TTS in Rohit's voice (e.g., spoken project intros) | cached by content hash |
| `POST /ai/ingest` | (admin token) re-index content: chunk → embed → upsert vectors | idempotent per content hash |

### `POST /ai/chat` request

```json
{
  "sessionId": "uuid (client-generated, stored in localStorage)",
  "messages": [ { "role": "user | assistant", "content": "string ≤ 2000" } ],
  "scope": "site | project:<slug>"
}
```

### SSE stream events

```
event: token      data: {"text":"..."}          // incremental model text
event: sources    data: {"chunks":[{"slug":"...","title":"...","section":"..."}]}
event: usage      data: {"inputTokens":123,"outputTokens":456}
event: done       data: {"finishReason":"end_turn"}
event: error      data: {"code":"BUDGET_EXCEEDED","message":"..."}
```

### Guardrails (enforced server-side)

- Session budget: ≤ 20 user messages / ≤ ~30k output tokens per `sessionId`/day; then `BUDGET_EXCEEDED`.
- Persona containment: system prompt pins the assistant to portfolio/Rohit topics; off-topic → polite redirect (see AI_PIPELINE §Prompting).
- Input caps: 2000 chars/message; conversation truncated to last ~12 turns + retrieval context.
- Voice sessions: max 5 min each, 3/day/IP; signed URLs expire ≤ 60 s after mint.
- Abuse: same CORS allowlist as api; anonymized IP hash in logs; no PII stored beyond contact form.

## Versioning & change policy

Pre-1.0: breaking changes allowed but must update this doc + `packages/shared` schemas + [CHANGELOG.md](./CHANGELOG.md) in the same PR. Post-launch: additive by default; breaking ⇒ `/v2` prefix.
