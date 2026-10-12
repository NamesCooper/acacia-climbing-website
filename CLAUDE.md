# Acacia Climbing Coalition Website

## What this project is

The website for Acacia Climbing Coalition (ACC), an Australian climbing access organisation. The scope is all of Australia; the work starts in South East Queensland. Copy should say that, never imply ACC is SEQ-only. The site serves two audiences with equal weight:

- Climbers and volunteers who need to feel the mission and find a clear pathway to contribute
- Council officers, land managers, and grant bodies who need to see a credible, organised, professional counterparty

ACC operates under the RCQ (Rock Climbing Queensland, formerly ACAQ) umbrella and uses KAYA for digital guidebook hosting. Cooper also works with KAYA as a support engineer. There's no gym arrangement yet, but KAYA may pay him to onboard and support gyms on its indoor app; the site discloses this wherever gyms or money come up, as a possibility, not a done deal. Guidebook income goes back to RCQ, councils and theCrag; donations go to Crag Care Days, comps, giveaways and, once there's backing, sponsoring climbers who document and share crags (including free KAYA memberships). ACC isn't funnelling people into paid memberships. Never speak badly of existing guides or theCrag: the message is simply that nothing current and modern exists yet, and ACC is building it. The SEQ guidebook author is not involved; don't imply otherwise. Cooper presents with the website itself, not a slide deck The long-term goal is a funded non-profit with national scope.

## Tech stack

- Nuxt 3 with Vue 3 composition API, built as a static site (`pnpm generate`)
- Tailwind CSS v4 for styling (tokens in `assets/css/main.css`)
- Sanity for content (crags, milestones, updates, site settings). Studio lives in `/studio`, deployed to Sanity's hosting
- Cloudflare Workers (static assets, see `wrangler.jsonc`) for hosting. `pnpm run build` runs `nuxt generate`; nitro preset is forced to `static`. A Sanity webhook triggers a Cloudflare deploy hook so publishing rebuilds the site
- Git for version control

## Where things live

- `studio/schemaTypes/` defines what can be edited in Sanity (page and its blocks in `sections.ts`, crag, milestone, update, siteSettings)
- `composables/useCragData.ts`, `useUpdates.ts`, `usePage.ts` and `useSiteChrome.ts` are the only places the site reads content. They run at build time
- `public/data/*.json` is a saved copy of the crag data. The site falls back to it if Sanity is unreachable during a build, so keep it roughly in sync
- `scripts/json-to-ndjson.mjs` is the one-off migration from the legacy JSON into Sanity
- `.mcp.json` connects Claude to Sanity (read and edit content, deploy schema)
- `.claude/agents/acc-helper.md` and `.claude/skills/` are Cooper's helper and its shortcuts (`/whats-next`, `/log-update`, `/check-site`)
- `layouts/default.vue` wraps every page with the nav and the footer. The nav and footer are full-width forest bands that frame every page. The footer has the "Got an hour?" ask on top, then logo, links and small print. Words and links come from the Studio's Navigation, Footer and "Got an hour?" band documents (`studio/schemaTypes/chrome.ts`) via `composables/useSiteChrome.ts`, with `public/data/chrome.json` as the backup copy. Hide the ask on a Vue page with `definePageMeta({ prefooter: false })`; Studio pages have a switch
- Link previews: `composables/usePageSeo.ts` sets each page's title, description and share picture (`public/og.png` unless the Page has its own "Share picture"); `layouts/default.vue` adds the canonical link
- The crag map (`/progress`) is full-screen. Tiles come from CARTO and need `NUXT_PUBLIC_CARTO_KEY` in Cloudflare's build variables; without it they fall back to OpenStreetMap
- Components are split into four folders (full list in `docs/COMPONENTS.md`):
  - `components/ui/` small bricks: `UiButton`, `UiChip`, `UiCard`, `UiRisoHeading`, `UiSectionTitle`, `UiHalftone`, `UiSparkle`, `UiWordmark`
  - `components/site/` the frame on every page: `SiteNav`, `SiteFooter` (includes the help ask), `SitePageHeader`
  - `components/home/` homepage-only sections: `HomeHero`, `HomeMarquee`, `HomeAboutTabs`, `HomeCragCards`
  - `components/section/` reusable inner-page sections: `SectionSplit`, `SectionSteps`, `SectionCards`, `SectionStatement`, `SectionCallout`, `SectionProse`, `SectionImageText`, `SectionFacts`, `SectionFaq`, `SectionLatestUpdates` (hidden until there's an update), `SectionVideo`, `SectionForm` (sign-up form; sends to Formspree or Web3Forms set in the Studio, else opens a pre-filled email)
- `/blocks` is a hidden gallery of every Studio block with example words; its screenshots are the Studio's "Add item" thumbnails (`studio/static/blocks/*.jpg`)
- `types/content.ts` holds the shared shapes (`Cta`, `CardItem`, `ProseBlock`) the sections take
- `utils/cragStatus.ts` is the single source for status labels and colours (homepage cards and map)
- Pages: `/progress` (crag map) and `/updates` are Vue files. Every other page (home, about, get-involved, privacy, anything new) is a Studio Page: `pages/index.vue` (slug `home`) and `pages/[...slug].vue` load it via `usePage()` and draw its blocks with `components/SanitySections.vue`. To change page words or layout, edit the Page in the Studio, not Vue
- `public/data/pages.json` is the backup copy of the Studio pages (made by `scripts/seed-pages.mjs`), used only if Sanity is unreachable during a build
- The Studio's "Visual editor" tab shows a second, preview copy of the site (`pnpm build:preview`, `wrangler.preview.jsonc`, `preview/`, `server/api/preview-query.post.ts`). All queries live in `utils/queries.ts` and run through `sanityFetch()`. See README
- `ROADMAP.md` is the running list of small next tasks

---

## Brand System — V2 · retro poster (October 2026)

Bold, rounded, friendly. Think 1930s cartoon posters and riso prints: big italic serif headlines, thick dark outlines, flat bush colours, paper grain and the odd sparkle. Fun and clean, never cluttered. One idea per section.

The approved homepage mockup lives on the Claude Design canvas ("G · Retro poster homepage"). Every page now uses V2. There is no V1 styling left; don't reintroduce old tokens (ink, cream, charcoal) or fonts (Inter Tight, JetBrains Mono).

### Colours (tokens in `assets/css/main.css`)

| Token | Hex | Use |
|-------|-----|-----|
| `paper` | #F1EADA | Page background |
| `paper-light` | #FFFCF2 | Cards, buttons |
| `outline` | #1E1A16 | Thick outlines, hard shadows, body text |
| `forest` | #203022 | Logo green, dark sections (pre-footer, footer) |
| `moss` | #4F6B34 | Progress bars, primary button |
| `lichen` | #A9B97E | "Recognised" chips, soft fills |
| `wattle` | #EFC248 | Actions and highlights: buttons, chips, riso headline shadow. Never as text on paper |
| `wattle-deep` | #D29F2A | Logo gold, halftone dots on wattle |
| `sandstone` | #D8C29A | Calm panels and bands (dusty, so it never competes with wattle) |
| `sandstone-deep` | #B39A70 | Halftone dots on sandstone |
| `gum` | #8FA6A0 | Gum-leaf grey-green: cool, calm panels and bands |
| `gum-deep` | #6F8781 | Halftone dots on gum |
| `ironbark` | #8A3B2A | Warnings only: the "Access issue" status, closures. Paper text on it |

No orange or pink. Wattle is for actions and highlights; sandstone and gum are for calm panels; ironbark is only for warnings. Alternate greens (lichen, gum) with the yellows down a page so it doesn't read as one long beige scroll.

### Type

| Role | Font | Tailwind |
|------|------|----------|
| Big headlines | Fraunces italic 900, soft | `font-display` |
| Friendly lead-in lines | Instrument Serif | `font-poster` |
| Section titles (uppercase), buttons, labels, wordmark | Bricolage Grotesque 700/800 | `font-grotesk` |
| Body | DM Sans | `font-sans` (default) |
| Marquee | Bagel Fat One | `font-bagel` |
| Accent italic ("We'd love the help.") | Cormorant Garamond italic | `font-serif italic` |

### Logo

"Sprig Dot": lowercase `acacia` in Bricolage Grotesque 800 with the wattle sprig as the dot on the i. Use `<UiWordmark :size="44" />`. Sprig artwork is in `public/brand/` (gold, green, light). The old serif "A" monogram is kept as a formal seal for council and grant documents only.

### Patterns

- **Poster box:** 3px `outline` border + hard 4 to 8px offset shadow, big radius (20 to 32px) or full pill
- **Riso headline:** duplicate the text behind in `wattle` (or `moss` on wattle backgrounds) offset ~6px, `aria-hidden` on the copy
- **Halftone circle:** `.halftone` with `--dot` set to a deeper shade of the panel colour
- **Tilt:** stickers and pills sit at -3 to 3deg via `.tilt` + `--tilt`, and straighten on hover
- **Motion:** marquee, bobbing sprig, twinkling sparkles, progress bars filling. All switch off under `prefers-reduced-motion`
- **Grain:** applied once to the whole site via `body::after`. Don't add more
- The mascot (in progress) will live in the About panel and hero. Until then, the sprig stands in

### Illustration and photo direction

- **Line art first** (changed from rubber hose, October 2026): friendly modern cartoon line art, simple rounded faces, relaxed real-climber poses, small props (chalk bag, shoes, pad, fist bump) as spot icons. Not 1930s or Cuphead style
- Fills in the bush palette (forest for dark clothing and pads, not black; wattle, sandstone, lichen accents). Line weight heavy enough to sit next to the 3px poster outlines
- Australian settings: sandstone and granite boulders, eucalypts and wattle. No alpine peaks or pine trees
- Get climbing details right: crash pads sit on the ground under a climber, never worn on the back while climbing
- **Not Corporate Memphis.** It reads as tech startup, which this site avoids
- Real photos: black and white cut-outs sitting on a bold palette shape (wattle, moss, lichen, sandstone), with a sticker or two around them. Makes any phone photo look on-brand
- Small outlined spot icons (3px outline, flat fill, hard shadow) are welcome on cards
- AI-generated mockups are a mood board only, never on the live site. The plan is one commissioned illustrator for a consistent set
- Cooper is sorting the mascots and gathering real photos and video; don't invent people, quotes or photos

---

## Project conventions

### Styling

- Tailwind utility classes by default
- Custom CSS only when Tailwind genuinely cannot do the job

### Data layer

- Sanity is the source of truth for page copy, crags, milestones, area boundaries and updates
- Change content through the Studio or the Sanity MCP, not by editing JSON or Vue files
- When changing a schema, keep existing field names (the site and migration depend on them). Pushing to main deploys the Studio and schema automatically (`.github/workflows/deploy-studio.yml`); `npx sanity deploy` from `/studio` does it by hand
- Pages get content only through the composables, via `useAsyncData`, so it is baked in at build time and visible to Google
- Coordinates are in decimal degrees, WGS84
- Each crag should have at minimum: name, council jurisdiction, access status, GPS coordinates, last updated date

### Components

- Prefer composition over duplication
- New sections follow the V2 retro poster patterns above; homepage sections live in `components/home`, inner-page sections in `components/section`. Build new pages from `Section*` components first, and only write custom markup when none fit
- Reusable components live in /components, page components in /pages
- Use Vue 3 composition API (`<script setup>`) not Options API

### Content

- Voice is homey, warm and honest. ACC is a group of climbers doing this for the first time and saying so. Openly a work in progress, community-first, not a polished institution
- Still careful and fair about councils and land managers, and never claim progress or numbers that aren't real
- Avoid em dashes (comma rhythm preferred)
- Sentence case for headings, not Title Case
- Australian English spelling (recognise, organisation, colour)
- Reference points: a well-loved local club newsletter, national park signage, small conservation groups doing good work. Avoid: climbing gym brand voice, adventure tourism, tech startup tone, corporate polish

---

## How to work with me

Frontend developer learning Nuxt, Vue, and the broader JS ecosystem. Fluent in HTML, CSS, and standard JavaScript — Nuxt patterns and Vue composition specifics are still new.

- When introducing a Nuxt or Vue concept I might not know, briefly explain what it does before showing the code
- For HTML, CSS, and standard JavaScript, don't over-explain
- When making changes across multiple files, walk me through the change at the architectural level first, then make the edits
- If a decision could be made multiple ways, briefly name the tradeoffs before picking one
- Keep tasks small and finishable (20 to 40 minutes). Split anything bigger and do the first piece
- Prefer content changes in Sanity over code changes when either would work
- Always finish by saying how to see the result
- Momentum matters more than perfection. This is a first-time, solo, active work in progress
- Priority right now is launching publicly. Don't hold launch for illustrations, photos or video; they drop in afterwards

---

## What this site needs to do

1. Communicate ACC's mission and credibility within three seconds of landing
2. Showcase the Brisbane City Council recognition and Tooheys Forest Park outcomes as social proof
3. Provide a Progress Map showing crag-by-crag access status across South East Queensland
4. Make contribution pathways visible and frictionless (volunteer signup, council email lists, stewardship events)
5. Host digital guidebook references that link out to KAYA
6. Function as a credible counterparty for council officers and grant bodies who Google ACC after meetings

## What this site is not

- Not a personal media brand for the founder
- Not an adventure or lifestyle site
- Not a climbing gym promotional page
- Not a static brochure (it should feel alive and updated, which is what `/updates` is for)
- Not a corporate front. It's fine, even good, for it to show the work in progress

---

## Git practices

- Meaningful commit messages, present tense ("Add progress map data for Plunketts" not "added progress map data")
- Branch for any significant feature work
- Don't commit half-broken state to main

## Things to flag

- Performance issues that would affect Cloudflare Pages deployment
- Accessibility problems (this is an advocacy organisation, accessibility matters)
- SEO issues, especially anything that would prevent councils from finding ACC through Google
- Mobile experience problems (most volunteer traffic will be mobile)
