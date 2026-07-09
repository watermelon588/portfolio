# DEPLOYMENT.md

> **Status:** Planned (first deploy end of Phase 3) · **Last updated:** 2026-07-09

## Topology

| Piece | Platform | Why |
|---|---|---|
| `apps/web` | **Vercel** | CDN, preview deploys, immutable assets; SPA + prerendered routes |
| `apps/api` | **Railway** | Simple Node hosting, PR environments, cheap always-on |
| `apps/ai` | **Railway** (same project, separate service) | Python friendly; independent scaling from api |
| DB | **MongoDB Atlas** | M0 free → Flex when AI ships |
| Media | **Cloudinary** | `f_auto,q_auto` transforms, free tier generous |
| Email | **Resend** | Contact notifications |
| DNS/domain | TBD (candidate rohitmaity.dev) | `@`/`www` → Vercel · `api.` → Railway · `ai.` → Railway |

## CI/CD (GitHub Actions)

```
on: pull_request        → lint + typecheck + unit tests (web, api) + pytest (ai) + build web
on: push main           → all of the above, then:
                          • Vercel production deploy (web)
                          • Railway deploy api + ai (via railway up / GH integration)
                          • if content/** changed: POST /ai/ingest (INGEST_TOKEN) after ai deploy
on: pull_request (web)  → Vercel preview URL + Playwright smoke on preview
```

- `main` is protected: CI green required. Releases tagged `vX.Y.Z` after CHANGELOG update.
- Secrets live in GH Actions/Vercel/Railway dashboards only ([CONFIGURATION.md](./CONFIGURATION.md)).

## First-deploy checklist (run once, Phase 3)

- [ ] Atlas cluster + database user + IP access (Railway static egress or 0.0.0.0/0 + strong auth)
- [ ] Vercel project → `apps/web`, build `pnpm --filter web build`, output `apps/web/dist`
- [ ] Railway services api/ai with health checks `/api/health`, `/ai/health`
- [ ] Env vars set on all three platforms; boot-validation passes
- [ ] Domain + TLS: apex → Vercel, `api.`/`ai.` CNAME → Railway; CORS_ORIGINS updated
- [ ] Resend domain verification (SPF/DKIM) for `CONTACT_FROM`
- [ ] Cloudinary upload preset (signed) restricted to admin flow
- [ ] Uptime monitor (UptimeRobot/BetterStack free) on all three health URLs
- [ ] `robots.txt` + sitemap live; OG images render (test with social debuggers)

## Release & rollback

- **Web:** Vercel keeps every deployment — rollback = promote previous (instant).
- **api/ai:** Railway redeploy previous image; DB changes must be backward-compatible one release back (expand-migrate-contract).
- **AI kill switch:** flip `AI_ENABLED=false` + `VITE_AI_ENABLED=false` (site fully functional without AI — designed degradation).
- Post-deploy smoke: home loads < 3s, `/api/projects` 200, contact test submission, (Phase 6) one `/ai/chat` round-trip.

## Cost picture (monthly, verify at setup)

Vercel Hobby $0 · Railway ~$5–10 (two small services) · Atlas M0 $0 (→ Flex ~$8–30 with vectors) · Cloudinary $0 · Resend $0 (100/day) · **ElevenLabs Creator ~$22 when Phase 6 ships** · Claude API usage-based, capped by guardrails (~$5–15). Total: **~$10/mo pre-AI, ~$40–60/mo with AI live.**
