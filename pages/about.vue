<template>
  <div>
    <SitePageHeader
      eyebrow="About us"
      title="Climbers, for the long"
      accent="haul"
      lede="Acacia Climbing Coalition is a small, volunteer-run crew working to get outdoor climbing recognised and looked after across Australia. We're starting in South East Queensland, and building it in the open."
    />

    <SectionSplit
      title="Why we started"
      :paragraphs="[
        'Most councils in Australia don\'t have a way to formally recognise outdoor climbing. That leaves crags with unclear access, no stairs or signs, and nobody speaking for climbers when decisions get made.',
        'At the same time, more people than ever are climbing in gyms and wanting to head outside, with very little to tell them where it\'s okay to go and how to look after it when they get there.',
      ]"
      :highlight="highlight"
    />

    <SectionSteps
      lead="Every crag goes through the same eight steps"
      title="How we do it"
      :steps="steps"
      :link="{ label: 'See where each crag is up to', to: '/progress' }"
    />

    <SectionCards title="Where we're up to" :cards="milestones" title-style="grotesk" />

    <SectionCards :cards="people" title-style="grotesk" />

    <SectionStatement
      title="We climb on Country"
      :paragraphs="[
        'The crags we document sit on the lands of many Aboriginal and Torres Strait Islander peoples, including the Turrbal, Jagera, Yugarapul, Jinibara and Kabi Kabi peoples in South East Queensland. We pay our respects to Elders past and present.',
        'We want consultation with Traditional Owners to be part of how every crag is documented, not an afterthought. We\'re still building those relationships, and we\'ll share how that\'s going as it happens.',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardItem } from '~/types/content'

useHead({
  title: 'About · Acacia Climbing Coalition',
  meta: [{ name: 'description', content: 'Who we are, why we started, and how we work with councils to get outdoor climbing recognised across Australia.' }],
})

const highlight = {
  quote: '"Documented crag, protected crag."',
  body: "A crag that's mapped, written up and known to council is a lot easier to keep open. So that's what we do, one crag at a time, and we share every step along the way.",
}

const steps = [
  'Research the area, its history and its climbing',
  'Reach out to guidebook authors and locals',
  'Talk with council and park rangers',
  'Agree a plan together',
  'Site visits: GPS, photos and mapping on KAYA',
  'Sort out any access issues',
  'Final council approvals',
  'Publish the guidebook on KAYA',
]

// Keep these true. Councils and grant bodies read this page after meetings.
const milestones: CardItem[] = [
  { chip: 'Done', chipTone: 'moss', title: 'Tooheys Forest recognised', body: 'Brisbane City Council formally recognises bouldering at Tooheys, with new stairs and signage now in.' },
  { chip: 'Underway', chipTone: 'wattle', title: 'White Rock and Plunketts', body: 'Talking with Ipswich and Logan councils about formal access, with site visits and mapping underway.' },
  { chip: 'Underway', chipTone: 'wattle', title: 'Digital guidebooks', body: 'Documenting our crags on KAYA, so every crag is properly on the record.' },
  { chip: 'Next up', chipTone: 'paper', chipDashed: true, title: 'More of Australia', body: 'Cedar Creek and Passchendaele are just getting started. After SEQ, the plan is every state.' },
]

const people: CardItem[] = [
  {
    title: "Who's behind it",
    body: "Right now Acacia is a small volunteer crew, coordinated by Cooper, who is also the bouldering representative for ACAQ, Queensland's peak climbing access body. Everything here gets done in spare hours, with a lot of help from local climbers.",
    cta: { label: 'Come be part of it', to: '/get-involved' },
  },
  {
    tone: 'forest',
    title: 'Working with',
    items: [
      { title: 'ACAQ', body: "Queensland's peak climbing access body. Our Queensland work happens under their umbrella." },
      { title: 'KAYA', body: 'Where our digital guidebooks live, so climbers have accurate, up-to-date info.' },
      { title: 'Local councils', body: 'Brisbane, Ipswich, Logan, Moreton Bay and Southern Downs, so far.' },
    ],
  },
]
</script>
