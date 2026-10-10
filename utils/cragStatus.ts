// One place for how each access status looks, used by the homepage cards and the crag map.
// Nuxt auto-imports anything in /utils, so components can call these without an import line.
// Colours differ in lightness, not just hue, so they still read for colour-blind visitors.

export type CragStatus = 'completed' | 'recognised' | 'progress' | 'scoping'

export const STATUS_ORDER: CragStatus[] = ['completed', 'recognised', 'progress', 'scoping']

export const STATUS_LABEL: Record<CragStatus, string> = {
  completed: 'Access secured',
  recognised: 'Council recognised',
  progress: 'In progress',
  scoping: 'Getting started',
}

// Tailwind classes for the little status chip
export const STATUS_CHIP: Record<CragStatus, string> = {
  completed: 'bg-forest text-paper border-forest',
  recognised: 'bg-moss text-paper border-forest',
  progress: 'bg-wattle text-forest border-forest',
  scoping: 'bg-paper text-forest border-forest border-dashed',
}

// Raw colours for things Tailwind can't reach (map pins, map outlines)
export const STATUS_COLOUR: Record<CragStatus, string> = {
  completed: '#203022',
  recognised: '#4F6B34',
  progress: '#EFC248',
  scoping: '#FFFCF2',
}

export function statusLabel(status: string) {
  return STATUS_LABEL[status as CragStatus] ?? status
}
export function statusChip(status: string) {
  return STATUS_CHIP[status as CragStatus] ?? STATUS_CHIP.scoping
}
export function statusColour(status: string) {
  return STATUS_COLOUR[status as CragStatus] ?? STATUS_COLOUR.scoping
}
