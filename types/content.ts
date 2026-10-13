// Shared shapes for section props. Keep these simple: they'll map to Sanity fields later.

export interface Cta {
  label: string
  /** A page on this site, e.g. "/progress" */
  to?: string
  /** Email or another site, e.g. "mailto:hello@acaciaclimbing.org" */
  href?: string
  variant?: 'wattle' | 'moss' | 'paper' | 'link'
}

export type Tone = 'light' | 'wattle' | 'sandstone' | 'lichen' | 'gum' | 'forest'
export type ChipTone = 'wattle' | 'lichen' | 'sandstone' | 'moss' | 'forest' | 'paper'

export interface CardItem {
  /** Anchor id so other pages can link straight to this card, e.g. /get-involved#donate */
  id?: string
  chip?: string
  chipTone?: ChipTone
  chipDashed?: boolean
  title: string
  body?: string
  /** Small titled list inside the card (e.g. partners) */
  items?: { title: string; body?: string }[]
  cta?: Cta
  tone?: Tone
  halftone?: boolean
}

export interface ProseBlock {
  title: string
  paragraphs: string[]
}
