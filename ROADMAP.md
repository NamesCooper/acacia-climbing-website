# ACC website roadmap

Small, finishable tasks. Ask Claude `/whats-next` and it will pick one that fits your time.
Tick things off as you go. Add new ideas at the bottom of the right section rather than doing them straight away.

## Get Sanity live (about an evening, in order)

- [x] Sanity project set up (qxrv033n) with crags imported
- [x] Crags imported into Sanity
- [x] Deploy the Studio (live at acaciaclimbing.sanity.studio)
- [ ] Check the site locally reads from Sanity: `pnpm dev`, open http://localhost:3000/progress
- [x] Cloudflare Workers builds connected (production branch: main)
- [ ] Cloudflare Pages: create a deploy hook. In Sanity (manage.sanity.io > API > Webhooks) add a webhook to that URL, triggered on create/update/delete
- [ ] Connect Claude to Sanity: run `claude` in this folder and approve the Sanity MCP sign-in
- [ ] Post your first update with `/log-update` (even "we've started rebuilding the site" counts)
- [x] Merged into main and live

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

- [x] `/work` placeholder stats replaced with real register numbers (5 crags, 1 recognised, 2 in progress); community and education rewritten as plans, not claims
- [x] Site-wide viewport was fixed at `width=1440`; now `width=device-width`. Still worth checking each inner page on your phone
- [x] Removed the DGR / tax-deductible / ACNC / "Inc." claims from Get involved, Donate, About, Privacy, Legal and Terms. If ACC gets DGR status later, add it back
- [ ] Add ACC's real ABN to the Privacy, Legal and Terms pages (the placeholder was removed)
- [ ] Check About still tells the story the way you'd tell it (fake team and timeline replaced with real milestones and a short "who's behind it")
- [ ] Mission: Traditional Owner line now says we're building those relationships. Update it when there's something real to share
- [ ] Privacy mentions a "quarterly dispatch" newsletter. Remove it if there isn't one
- [x] "The advocacy team" changed to "we" on Get involved
- [x] Updates link is in the new homepage nav. Inner pages get it when they're restyled
- [ ] Add KAYA links to each crag in Sanity (the `KAYA guidebook link` field) and show them on the crag panel

## Later

- [ ] Move page copy (mission, about, work) into Sanity so words can change without code
- [ ] Contact / "report a crag issue" form that lands in your inbox or Notion
- [ ] Archive the old `acc-crag-map` repo on GitHub (its data now lives here)
