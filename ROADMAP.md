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

## Design refresh (V2, retro poster)

- [x] Pick a direction from the Claude Design canvas (G · Retro poster homepage)
- [x] Swap colour and font tokens in `assets/css/main.css`
- [x] Rebuild the homepage in the new style (`components/retro/`)
- [ ] Save it as the ACC design system in Claude Design
- [ ] Turn the Sprig Dot wordmark into proper SVG logo files
- [ ] Design the mascot, then drop it into the hero and About panel
- [ ] Restyle the crag map page (`/progress`)
- [ ] Restyle the Updates page
- [ ] Restyle Get involved, Volunteer and Report
- [ ] Restyle About, Mission and Work (and fix the placeholder stats while you're there)
- [ ] Move homepage copy (hero, tabs, help pills) into Sanity

## Honesty and credibility fixes (flagged during the rebuild)

- [ ] `/work` shows numbers that look like placeholders (2,400+ members, 86 crags logged, 1,240 routes, 340 climbers trained, 9 partner gyms). Replace with real figures or remove until they're true. Councils will read these
- [x] Site-wide viewport was fixed at `width=1440`; now `width=device-width`. Still worth checking each inner page on your phone
- [ ] Get involved says donations are "tax-deductible giving through an ACNC-registered DGR". Only keep that if ACC actually has DGR status; otherwise reword (e.g. "Every dollar goes to documentation and advocacy")
- [ ] Get involved also mentions "the advocacy team" following up reports. Fine if true, but "we" is more honest while it's mostly you
- [x] Updates link is in the new homepage nav. Inner pages get it when they're restyled
- [ ] Add KAYA links to each crag in Sanity (the `KAYA guidebook link` field) and show them on the crag panel

## Later

- [ ] Move page copy (mission, about, work) into Sanity so words can change without code
- [ ] Contact / "report a crag issue" form that lands in your inbox or Notion
- [ ] Archive the old `acc-crag-map` repo on GitHub (its data now lives here)
