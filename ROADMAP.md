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

- [ ] Read the draft Guidebooks page in the Studio (Pages, Guidebooks), tweak, publish, then add it to the nav menu
- [ ] Ask KAYA (as their LCO) for a brand kit and an OK to use app screenshots
- [ ] When grants come up, ask an accountant about a non-profit structure (incorporated association or ACNC charity, or RCQ auspicing). ACC is currently a sole-trader business name

- [ ] Hook up the sign-up form on Get involved: make a free Formspree form (formspree.io, sign up with hello@acaciaclimbing.org), copy its link, paste it into the form block's "Where it sends" tab, publish. Until then it opens a pre-filled email
- [ ] Post the first update (the homepage "Latest updates" block appears once there's one)
- [ ] Shorten the first proof chip on the homepage if it wraps on your phone
- [ ] Add a photo of yourself to About's "Who's behind it" when you have a cut-out
- [ ] Share a page link to yourself to check the preview picture

## Illustrations and real content (Cooper)

- [ ] Friendly line-art figures in a few poses, like the first GPT sheet (see "Illustration and photo direction" in CLAUDE.md)
- [ ] Climber and volunteer vignettes in the same style, plus prop spot icons (chalk bag, shoe, brush, pad)
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
- [x] Privacy no longer mentions a newsletter. Sign-up form has "Just keep me posted"; those emails land in the inbox for now
- [ ] Once "Just keep me posted" passes about 50 people, move the list to Buttondown or Mailchimp and update Privacy to name it
- [x] "The advocacy team" changed to "we" on Get involved
- [x] Updates link is in the new homepage nav. Inner pages get it when they're restyled
- [x] Crag pages at /crags/<id> (status, pathway, facts, help and report buttons)
- [ ] Add KAYA links to each crag in Sanity (the `KAYA guidebook link` field). The map panel and crag page show the button once it's filled in
- [ ] Crag pages, next: a photo per crag and a short "how to get there and where to park" once the land manager is happy for it to be public

## Later

- [x] "First time outside" guide for gym climbers heading outdoors (Studio page, in the menu and footer)

- [ ] Move page copy (mission, about, work) into Sanity so words can change without code
- [ ] "Report a crag issue" form (the sign-up form block can be reused for this)
- [ ] Archive the old `acc-crag-map` repo on GitHub (its data now lives here)
