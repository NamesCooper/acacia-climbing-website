<template>
  <div>
    <SitePageHeader
      eyebrow="The fine print"
      title="Privacy and"
      accent="terms"
      lede="The short, plain-English version of how this site works and what we do with anything you send us."
    />

    <SectionProse
      :blocks="blocks"
      footnote="Acacia Climbing Pty Ltd · ABN 38 237 542 815 · Questions? hello@acaciaclimbing.org"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProseBlock } from '~/types/content'

definePageMeta({ prefooter: false })

useHead({
  title: 'Privacy and terms · Acacia Climbing Coalition',
  meta: [{ name: 'description', content: 'How Acacia Climbing Coalition handles your information, and the terms for using this site.' }],
})

const blocks: ProseBlock[] = [
  {
    title: 'Who we are',
    paragraphs: ['This site is run by Acacia Climbing Pty Ltd (ABN 38 237 542 815), trading as Acacia Climbing Coalition, based in Queensland, Australia.'],
  },
  {
    title: 'What we collect',
    paragraphs: [
      "We don't have accounts, forms or newsletters on this site. If you email us, we receive your name, email address and whatever you choose to tell us.",
      'Our host, Cloudflare, keeps basic technical logs (like IP addresses) to keep the site running and secure.',
    ],
  },
  {
    title: 'How we use it',
    paragraphs: [
      "We only use what you send us to reply to you, coordinate volunteering, and follow up crag reports. We don't sell or share your details, and we'll delete them if you ask.",
      'We handle personal information in line with the Australian Privacy Principles. Email hello@acaciaclimbing.org with any questions or requests.',
    ],
  },
  {
    title: 'Climbing info on this site',
    paragraphs: [
      'Access status and crag details here are general information, not permission to climb. Access can change, so always check signage, local rules and any closures before you visit.',
      "Climbing is risky. You're responsible for your own safety and for respecting the land, other users and Traditional Owners.",
    ],
  },
  {
    title: 'Using our content',
    paragraphs: ["You're welcome to share and link to anything here with credit to Acacia Climbing Coalition. Detailed guidebook information lives on KAYA under their terms."],
  },
]
</script>
