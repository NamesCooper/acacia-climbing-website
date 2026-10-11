<template>
  <div>
    <SitePageHeader
      eyebrow="Lend a hand"
      title="Every bit"
      accent="helps"
      lede="We're a small crew, so a bit of help goes a long way. Pick whatever suits you, flick us an email, and we'll take it from there."
    />

    <SectionCards :cards="ways" />

    <SectionCallout
      lead="Not in South East Queensland?"
      title="We want to hear from climbers everywhere"
      body="We're starting in SEQ, but the goal is every state. If there's a crag near you with access worries, or you're already looking after one, tell us about it. It all helps shape where we go next."
      :cta="{ label: 'Tell us about your local', href: mailto('Climbing near me') }"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardItem } from '~/types/content'

// The big "Got an hour?" band would just repeat this page, so hide it here
definePageMeta({ prefooter: false })

useHead({
  title: 'Get involved · Acacia Climbing Coalition',
  meta: [{ name: 'description', content: 'Volunteer, report a crag issue, help with council letters or chip in. Every bit helps keep Australian crags open.' }],
})

const mailto = (subject: string) => `mailto:hello@acaciaclimbing.org?subject=${encodeURIComponent(subject)}`

const ways: CardItem[] = [
  {
    id: 'volunteer',
    chip: 'Volunteer',
    chipTone: 'lichen',
    halftone: true,
    title: 'Give an hour or two',
    body: 'Crag clean-ups, track work, site visits and mapping. Weekends mostly, and no experience needed beyond knowing your way around a crag.',
    cta: { label: "I'm keen to volunteer", href: mailto('Keen to volunteer'), variant: 'moss' },
  },
  {
    id: 'report',
    chip: 'Report',
    chipTone: 'wattle',
    halftone: true,
    title: 'Be our eyes on the ground',
    body: "Closed tracks, new signs, damage, a gate that wasn't there last week. Tell us what you've seen, where and when, and we'll log it and follow it up.",
    cta: { label: 'Report a crag issue', href: mailto('Crag report') },
  },
  {
    id: 'council',
    chip: 'Speak up',
    chipTone: 'sandstone',
    halftone: true,
    title: 'Help with council letters',
    body: "When a council is deciding something, letters from local climbers really count. We'll let you know when it matters and help with what to say.",
    cta: { label: 'Count me in', href: mailto('Keen to help with council letters') },
  },
  {
    id: 'donate',
    chip: 'Donate',
    chipTone: 'paper',
    chipDashed: true,
    halftone: true,
    title: 'Chip in for the crags',
    body: "Donations go straight to signage, mapping and council submissions. We're not a registered charity yet, so it isn't tax-deductible for now.",
    cta: { label: "I'd like to donate", href: mailto('Donating to Acacia') },
  },
]
</script>
