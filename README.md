# Acacia Climbing Coalition website

The website for [acaciaclimbing.org](https://acaciaclimbing.org). Nuxt site on Cloudflare Pages, content in Sanity.

This is a first-time, work-in-progress project. If you're Claude, read `CLAUDE.md`. If you're Cooper, `ROADMAP.md` has the next small things to do.

## How it fits together

```
You edit in Sanity Studio  ──publish──▶  Sanity webhook  ──▶  Cloudflare deploy hook
(acaciaclimbing.sanity.studio)                                       │
                                                                     ▼
                                           Cloudflare runs `pnpm generate`, which
                                           pulls content from Sanity and writes
                                           plain HTML pages. Live in ~2 minutes.
```

## Everyday commands

| What | Where | Command |
|---|---|---|
| Run the site locally | repo root | `pnpm dev` → http://localhost:3000 |
| Build like Cloudflare does | repo root | `pnpm generate` |
| Run the Studio locally | `/studio` | `npm run dev` → http://localhost:3333 |
| Deploy Studio changes | `/studio` | `npm run deploy` |

## Working with Claude

Open this folder in Claude Code (`claude` in the terminal). It picks up `CLAUDE.md`, the `acc-helper` agent and these shortcuts:

- `/whats-next` picks one small task that fits the time you've got
- `/log-update` turns "we met Ipswich council today" into a published update
- `/check-site` builds the site and tells you if anything's broken

The Sanity MCP (`.mcp.json`) lets Claude read and edit content directly. First run asks you to sign in to Sanity.

## First-time setup

See the "Get Sanity live" checklist in `ROADMAP.md`. Until a Sanity project ID is set, the site falls back to the old JSON files in `public/data`, so nothing breaks in the meantime.

## Visual editor (Studio → "Visual editor" tab)

The same code builds two sites:

| | Live site | Preview site |
|---|---|---|
| Worker | `acaciaclimbing` | `acaciaclimbing-preview` |
| Build | `pnpm run build` (static) | `pnpm run build:preview` (small server) |
| Deploy | `npx wrangler deploy` | `npx wrangler deploy -c wrangler.preview.jsonc` |
| Shows | Published content, rebuilt on publish | Drafts, live, with click-to-edit |

The preview site needs one secret in Cloudflare, `NUXT_SANITY_READ_TOKEN`: a Sanity API token with **Viewer** rights (sanity.io/manage → API → Tokens). It never reaches the browser; `server/api/preview-query.post.ts` uses it and only runs the named queries in `utils/queries.ts`.

Click-to-edit only works on words that come from Sanity (Studio pages, updates). Text written in Vue files isn't editable there.
