# Components

Every visual piece of the site, where it's used, and how to drop it into a page.
Nuxt auto-imports components and names them by folder: `components/section/Cards.vue` is `<SectionCards>`. No imports needed in pages.

## The four layers

| Layer | Folder | What it is |
|-------|--------|-----------|
| Bricks | `components/ui/` | Small reusable bits: buttons, chips, cards, headings |
| Frame | `components/site/` | Wraps every page (nav, footer, help band) plus the inner-page header |
| Homepage | `components/home/` | One-off homepage sections |
| Sections | `components/section/` | Full-width blocks for inner pages. Build new pages from these |

## Matrix

✓ = used on that page today

| Component | Home | Map | Updates | About | Get involved | Privacy |
|-----------|:----:|:---:|:-------:|:-----:|:------------:|:-------:|
| **Frame** | | | | | | |
| SiteNav (layout) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| SiteFooter (layout) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| SiteHelpBand (layout) | ✓ | ✓ | ✓ | ✓ | | |
| SitePageHeader | | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Homepage** | | | | | | |
| HomeHero | ✓ | | | | | |
| HomeMarquee | ✓ | | | | | |
| HomeAboutTabs | ✓ | | | | | |
| HomeCragCards | ✓ | | | | | |
| **Sections** | | | | | | |
| SectionSplit | | | | ✓ | | |
| SectionSteps | | | | ✓ | | |
| SectionCards | | | | ✓✓ | ✓ | |
| SectionStatement | | | | ✓ | | |
| SectionCallout | | | | | ✓ | |
| SectionProse | | | | | | ✓ |

The map (`/progress`) and `/updates` still use their own markup, as they're data-driven one-offs.

## Sections (for building pages)

### `SectionSplit`
Text on the left, a highlighted quote card on the right.
Props: `title`, `lead?`, `paragraphs: string[]`, `cta?: Cta`, `highlight?: { quote, body?, tone? }`

### `SectionSteps`
Numbered steps on a coloured band.
Props: `title`, `lead?`, `steps: string[]`, `link?: Cta`, `band?: 'sandstone' | 'wattle'`

### `SectionCards`
A grid of poster cards. Each card can have a chip, body, a list of items and a button.
Props: `title?`, `lead?`, `intro?`, `cards: CardItem[]`, `columns?: 2 | 3 | 4`, `titleStyle?: 'display' | 'grotesk'`, `tilted?`

### `SectionStatement`
Centred, quiet text block with the sprig. Good for acknowledgements.
Props: `title`, `paragraphs: string[]`, `sprig?`

### `SectionCallout`
One big framed panel with a headline and a button.
Props: `title`, `lead?`, `body?`, `cta?: Cta`, `tone?: 'sandstone' | 'wattle' | 'lichen'`

### `SectionProse`
Long reading text in one card (policies, explainers).
Props: `blocks: { title, paragraphs[] }[]`, `footnote?`

## Bricks

| Component | Props | Notes |
|-----------|-------|-------|
| `UiButton` | `to?` / `href?`, `variant: wattle \| moss \| paper`, `size: sm \| md \| lg` | Renders a link, external link or button |
| `UiChip` | `tone`, `status?`, `dashed?` | Pass a crag `status` to get its colour automatically |
| `UiCard` | `as`, `tone: light \| wattle \| sandstone \| lichen \| forest`, `size`, `tilt?`, `halftone?` | The poster box |
| `UiRisoHeading` | `text`, `accent?`, `as`, `size: md \| lg \| xl`, `shadow: wattle \| moss` | Big italic headline with the offset shadow |
| `UiSectionTitle` | `title`, `lead?`, `as`, `small?`, `light?` | Uppercase grotesk section title |
| `UiHalftone` | `dot` | Dotted circle decoration |
| `UiSparkle` | | Twinkling star |
| `UiWordmark` | `size` | The Sprig Dot logo |

Shared shapes (`Cta`, `CardItem`, `ProseBlock`) live in `types/content.ts`.

## Building a new page in code

```vue
<template>
  <div>
    <SitePageHeader eyebrow="Events" title="Come climb" accent="with us" lede="..." />
    <SectionCards :cards="events" />
    <SectionCallout title="Got an idea?" :cta="{ label: 'Email us', href: 'mailto:hello@acaciaclimbing.org' }" />
  </div>
</template>
```

## How this maps to Sanity

The Studio's "Page" type has section blocks. Each one draws with a section component:

| Sanity section | Component |
|----------------|-----------|
| Text | `SectionSplit` |
| Cards | `SectionCards` |
| Timeline | `SectionCards` (date as the chip) |
| Call to action | `SectionCallout` |
| People | `SectionCards` (location as the chip) |
| Crag register | `HomeCragCards` |

The renderer is `components/SanitySections.vue`. The catch-all `pages/[...slug].vue` shows any Studio page whose slug has no Vue file of its own, so code pages (About etc.) always win. `nuxt.config.ts` asks Sanity for every page slug at build time so each one is baked in.

To make a page in the Studio: Pages → new → fill in title, web address (slug), heading and sections → Publish. The site rebuilds in a couple of minutes and the page is at acaciaclimbing.org/<slug>.

New section type? Add a schema in `studio/schemaTypes/sections.ts`, a component in `components/section/` if no existing one fits, and a `v-else-if` in `SanitySections.vue`.
