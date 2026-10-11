# ACC website roadmap

Small, finishable tasks. Ask Claude `/whats-next` and it will pick one that fits your time.
Tick things off as you go. Add new ideas at the bottom of the right section rather than doing them straight away.

## Get Sanity live (about an evening, in order)

- [x] Sanity project set up (qxrv033n) with crags imported
- [x] Crags imported into Sanity
- [x] Deploy the Studio (live at acaciaclimbing.sanity.studio)
- [ ] Check the site locally reads from Sanity: `pnpm dev`, open http://localhost:3000/progress
- [x] Cloudflare Workers builds connected (production branch: main)
- [x] Publishing in Sanity rebuilds the live site (Cloudflare deploy hook + Sanity webhook)
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
- [x] Restyle the crag map (new free map tiles, works on phones)
- [x] Restyle Updates, and add About, Get involved and Privacy pages in V2
- [x] Remove all V1 styling
- [x] Move homepage copy (hero, tabs, help pills) into Sanity
- [x] Nav and footer as full-width forest bands, help ask merged into the footer
- [x] Block gallery (acaciaclimbing.org/blocks) with picture thumbnails in the Studio

## Launch checklist (Cooper)

- [ ] Hook up the sign-up form on Get involved: make a free Formspree form (formspree.io, sign up with hello@acaciaclimbing.org), copy its link, paste it into the form block's "Where it sends" tab, publish. Until then it opens a pre-filled email
- [ ] Post the first update (the homepage "Latest updates" block appears once there's one)
- [ ] Shorten the first proof chip on the homepage if it wraps on your phone
- [ ] Add a photo of yourself to About's "Who's behind it" when you have a cut-out
- [ ] Share a page link to yourself to check the preview picture

## Illustrations and real content (Cooper)

- [ ] Mascots: line-art characters in a few poses (see "Illustration and photo direction" in CLAUDE.md)
- [ ] Climber and volunteer figures in the line-art style, plus prop spot icons (chalk bag, shoe, fist bump)
- [ ] Gather real photos: clean-up days, Tooheys stairs and signs, crags. Phone photos are fine
- [ ] Swap example words in Studio pages for real ones (Pages with the yellow dot are still mockup)

## When content lands (ask Claude)

- [x] Photo style: black and white cut-out on a palette shape, with stickers, as an option on "Photo and text"
- [ ] Small outlined spot icons on cards
- [ ] Drop the mascot into the hero badge and the tabs panel
- [ ] Re-take block thumbnails for the Studio and the design canvas after any look changes

## Honesty and credibility fixes (flagged during the rebuild)

- [x] `/work` placeholder stats replaced with real register numbers (5 crags, 1 recognised, 2 in progress); community and education rewritten as plans, not claims
- [x] Site-wide viewport was fixed at `width=1440`; now `width=device-width`. Still worth checking each inner page on your phone
- [x] Removed the DGR / tax-deductible / ACNC / "Inc." claims from Get involved, Donate, About, Privacy, Legal and Terms. If ACC gets DGR status later, add it back
- [x] Real ABN (38 237 542 815) on the footer and Privacy page
- [ ] Check About still tells the story the way you'd tell it (fake team and timeline replaced with real milestones and a short "who's behind it")
- [ ] Mission: Traditional Owner line now says we're building those relationships. Update it when there's something real to share
- [ ] Privacy mentions a "quarterly dispatch" newsletter. Remove it if there isn't one
- [x] "The advocacy team" changed to "we" on Get involved
- [x] Updates link is in the new homepage nav. Inner pages get it when they're restyled
- [ ] Add KAYA links to each crag in Sanity (the `KAYA guidebook link` field) and show them on the crag panel

## Later

- [ ] Move page copy (mission, about, work) into Sanity so words can change without code
- [ ] "Report a crag issue" form (the sign-up form block can be reused for this)
- [ ] Archive the old `acc-crag-map` repo on GitHub (its data now lives here)
