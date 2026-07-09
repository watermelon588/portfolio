# DATABASE.md

> **Status:** Designed, pre-implementation · **Last updated:** 2026-07-09
> MongoDB Atlas · Mongoose 8 (`apps/api`) · PyMongo (`apps/ai`, read + vector ops). Free M0 to start; Flex/M10 if AI traffic demands.

## Collections

### `projects` — portfolio project metadata (case-study *body* is MDX in-repo)
```ts
{
  _id, slug: string (unique, kebab),
  title: string, year: number,
  roles: ("design"|"development"|"fullstack"|"ai")[],
  summary: string,            // one-liner for lists/OG
  stack: string[],
  featured: boolean, order: number,          // homepage curation
  cover: { cloudinaryId, width, height, dominant: string },  // dominant hex → placeholder bg (reference-site trick)
  media: [{ cloudinaryId, kind: "image"|"video", alt }],
  links: { live?: string, repo?: string },
  published: boolean,
  createdAt, updatedAt
}
```
Indexes: `{slug:1}` unique · `{published:1, featured:1, order:1}` · `{roles:1}`

### `contacts` — form submissions
```ts
{ _id, name, email, projectType, message,
  status: "new"|"read"|"archived",
  meta: { ipHash, userAgent },     // ipHash = sha256(ip+salt), for rate/abuse forensics only
  createdAt }
```
Indexes: `{status:1, createdAt:-1}` · TTL **not** applied (business records); archived ≥ 1y pruned manually.

### `devlogs` — dev-log metadata (body = MDX in-repo)
```ts
{ _id, slug (unique), title, excerpt, tags: string[], readingMinutes,
  publishedAt, published: boolean }
```
Indexes: `{slug:1}` unique · `{published:1, publishedAt:-1}`

### `admins` — single admin auth
```ts
{ _id, email (unique), passwordHash /* argon2id */,
  refreshTokens: [{ tokenHash, expiresAt, createdAt }] }
```

### `ai_chunks` — RAG corpus (written by `apps/ai` ingest)
```ts
{ _id, hash (unique, content-addressed), docType: "case-study"|"devlog"|"bio"|"decision",
  projectSlug?: string, heading: string, text: string,
  embedding: number[1024],          // Voyage
  updatedAt }
```
Indexes: `{hash:1}` unique · `{projectSlug:1}` · **Atlas Vector Search index:**
```json
{ "fields": [
  { "type": "vector", "path": "embedding", "numDimensions": 1024, "similarity": "cosine" },
  { "type": "filter", "path": "projectSlug" },
  { "type": "filter", "path": "docType" } ] }
```

### `ai_sessions` — chat budget tracking + transcripts
```ts
{ _id, sessionId (unique), scope, messages: [{ role, content, at }],
  usage: { userMsgs, outputTokens }, createdAt, lastAt }
```
Indexes: `{sessionId:1}` unique · **TTL:** `{lastAt:1}` expireAfterSeconds = 30 days (privacy promise in AI_PIPELINE).

## Data ownership

| Collection | Writer | Readers |
|---|---|---|
| projects, contacts, devlogs, admins | `apps/api` | api (+ web via api) |
| ai_chunks, ai_sessions | `apps/ai` | ai only |

No cross-service writes — the seam stays clean.

## Operational

- **Migrations:** pre-launch, schema evolves freely (Mongoose defaults). Post-launch: versioned scripts in `apps/api/src/migrations/`, run manually against Atlas, logged in CHANGELOG.
- **Seed:** `pnpm --filter api seed` loads 3–5 sample projects + admin user (dev only).
- **Backups:** Atlas continuous backups on paid tier; on M0, weekly `mongodump` via GitHub Action to private storage.
- **Validation:** all writes pass Zod (api) / Pydantic (ai) before Mongoose/PyMongo; DB-level schema validation kept loose intentionally.
- **Connections:** one client per service, pooled; api uses `maxPoolSize: 10` (Railway small instance), ai uses Motor/PyMongo pool 5.
