# Acacia Climbing Coalition Website

## What this project is

The website for Acacia Climbing Coalition (ACC), a registered Australian climbing access advocacy organisation operating in South East Queensland. The site serves two audiences with equal weight:

- Climbers and volunteers who need to feel the mission and find a clear pathway to contribute
- Council officers, land managers, and grant bodies who need to see a credible, organised, professional counterparty

ACC operates under the ACAQ (Australian Climbing Association Queensland) umbrella and uses KAYA for digital guidebook hosting. The long-term goal is a funded non-profit with national scope.

## Tech stack

- Nuxt 3 with Vue 3 composition API
- Tailwind CSS for styling
- JSON files in the repo as the data layer (no database)
- Cloudflare Pages for hosting
- Git for version control

---

## Brand System — V1 · 2026

### Colours

| Token | Hex | Role |
|-------|-----|------|
| `cream` | #F2EBDC | Paper — primary background |
| `ink` | #1C2A1E | Dark Green — primary text / dark section backgrounds |
| `mid-green` | #2E6B40 | Secondary green — muted text, roman numerals, active status |
| `charcoal` | #141914 | Deepest contrast — nav bar, darkest gaps |
| `wattle` | #D39E17 | Accent — dots, donate CTA, in-sentence highlights |

Derived:
- `parchment` #F9F7F2 — off-white surface, sits above cream (cards, overlays)
- `cream-soft` #F7F3EA
- `ink-soft` #2A3E2C

Never use old olive/brown values (#EFE6D2, #6A7560, #BE7B2E).

### Type Scale

| Name | Size | Font |
|------|------|------|
| Hero Display | 128px | Cormorant Garamond |
| H1 | 88px | Cormorant Garamond |
| H2 | 56px | Cormorant Garamond |
| H3 | 32px | Cormorant Garamond |
| Lead | 20px italic | Cormorant Garamond Italic |
| Body | 16px | Inter Tight |
| Small | 14px | Inter Tight |
| Meta | 12px | Inter Tight |
| Caption | 11px | JetBrains Mono |

- **Display:** Cormorant Garamond — mix upright + italic per heading; italic for in-sentence emphasis words (*recognises*, *all of us*, *stewardship*)
- **Body:** Inter Tight
- **Mono / labels:** JetBrains Mono (caption level only)

### UI Patterns

**Section labels** — `§ XX · SECTION NAME` in Inter Tight Meta (12px), uppercase, ink/50 opacity, top-left above section heading.

**Accent dot** — wattle (#D39E17) full-stop after display headings signals primary heading terminus.

**Roman numerals (pillars)** — large I / II / III / IV in Cormorant Garamond Italic, mid-green (#2E6B40).

**Status badges:**
- `ACTIVE` — mid-green (#2E6B40) bg, cream text, Inter Tight 11px uppercase
- `IN PROGRESS` — wattle (#D39E17) bg, ink text
- `INACTIVE` — muted/outline style

**Buttons:**
- Primary (filled): charcoal bg, cream text, Inter Tight uppercase, sharp corners, letter-spacing
- Secondary (outlined): transparent bg, 1px ink border, ink text
- Donate CTA (nav only): wattle (#D39E17) bg, ink text

**Navigation:** charcoal (#141914) bg, cream Inter Tight Meta links (uppercase, spaced).

**Dark sections (hero, footer):** ink (#1C2A1E) bg, cream or cream/70 text. Footer wordmark is Cormorant Garamond Hero Display in cream.

**Dividers:** 1px solid — ink/low-opacity on cream sections, cream/20 on dark sections.

**Tables / registers:** column headers Inter Tight Meta uppercase ink/50; rows Inter Tight Body; row numbers Inter Tight Small ink/40.

**Cards / partner grid:** thin 1px ink border, category label Inter Tight Meta uppercase ink/50, title Inter Tight Small/Body, body Inter Tight Small ink/70.

The visual signature is a wattle full-stop after display headings and one italicised word per composition. Refer to the four-mode layout system (Milestone, Documentary, Editorial 50/50, List) when building new pages.

---

## Project conventions

### Styling

- Tailwind utility classes by default
- Custom CSS only when Tailwind genuinely cannot do the job

### Data layer

- The Progress Map and crag data live in JSON files in the repo
- Treat JSON files as the source of truth, not as throwaway content
- When updating crag, area, subarea, or climb data, preserve existing structure and field names
- Coordinates are in decimal degrees, WGS84
- Each crag should have at minimum: name, council jurisdiction, access status, GPS coordinates, last updated date

### Components

- Prefer composition over duplication
- New layout components should reflect one of the four modes from the brand system
- Reusable components live in /components, page components in /pages
- Use Vue 3 composition API (`<script setup>`) not Options API

### Content

- Voice is serious but not corporate, earthy and grounded, mission-centred not personality-driven
- Avoid em dashes (comma rhythm preferred)
- Sentence case for headings, not Title Case
- Australian English spelling (recognise, organisation, colour)
- Reference points: editorial magazines like Alpinist, national park signage, well-designed conservation non-profits. Avoid: climbing gym brand voice, adventure tourism, tech startup tone

---

## How to work with me

Frontend developer learning Nuxt, Vue, and the broader JS ecosystem. Fluent in HTML, CSS, and standard JavaScript — Nuxt patterns and Vue composition specifics are still new.

- When introducing a Nuxt or Vue concept I might not know, briefly explain what it does before showing the code
- For HTML, CSS, and standard JavaScript, don't over-explain
- When making changes across multiple files, walk me through the change at the architectural level first, then make the edits
- If a decision could be made multiple ways, briefly name the tradeoffs before picking one
- Optimise for learning the right pattern, not for shipping fast

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
- Not a static brochure (it should feel alive and updated)

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
