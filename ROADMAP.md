# ACC website roadmap

Small, finishable tasks. Ask Claude `/whats-next` and it will pick one that fits your time.
Tick things off as you go. Add new ideas at the bottom of the right section rather than doing them straight away.

## Get Sanity live (about an evening, in order)

- [ ] Create a free Sanity account and project: in `/studio` run `npx sanity init --env` (pick "production" dataset). Copy the project ID into `studio/.env` and the root `.env`
- [ ] Import the existing crags: in `/studio` run `npm run import-legacy`
- [ ] Deploy the Studio: in `/studio` run `npm run deploy` (lives at acaciaclimbing.sanity.studio)
- [ ] Check the site locally reads from Sanity: `pnpm dev`, open http://localhost:3000/progress
- [ ] Cloudflare Pages: set build command `pnpm generate`, output folder `.output/public`, and add the two `NUXT_PUBLIC_SANITY_*` env vars
- [ ] Cloudflare Pages: create a deploy hook. In Sanity (manage.sanity.io > API > Webhooks) add a webhook to that URL, triggered on create/update/delete
- [ ] Connect Claude to Sanity: run `claude` in this folder and approve the Sanity MCP sign-in
- [ ] Post your first update with `/log-update` (even "we've started rebuilding the site" counts)
- [ ] Merge `sanity-rebuild` into `main` once the preview looks right

## Design refresh (V2, homey)

- [ ] Pick a direction from the Claude Design canvas
- [ ] Save it as the ACC design system in Claude Design
- [ ] Swap colour and font tokens in `assets/css/main.css`
- [ ] Restyle the homepage, one section per sitting
- [ ] Restyle the inner pages

## Honesty and credibility fixes (flagged during the rebuild)

- [ ] `/work` shows numbers that look like placeholders (2,400+ members, 86 crags logged, 1,240 routes, 340 climbers trained, 9 partner gyms). Replace with real figures or remove until they're true. Councils will read these
- [ ] Site-wide viewport is fixed at `width=1440` in `nuxt.config.ts`, so phones show a shrunk desktop page. The components are already responsive, so switching to `width=device-width, initial-scale=1` should mostly just work. Test each page on your phone
- [ ] Add an "Updates" link to the nav and footer once there are two or three updates
- [ ] Add KAYA links to each crag in Sanity (the `KAYA guidebook link` field) and show them on the crag panel

## Later

- [ ] Move page copy (mission, about, work) into Sanity so words can change without code
- [ ] Contact / "report a crag issue" form that lands in your inbox or Notion
- [ ] Archive the old `acc-crag-map` repo on GitHub (its data now lives here)
