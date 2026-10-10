<template>
  <div>
    <RetroPageHeader
      eyebrow="The fine print"
      title="Privacy and"
      accent="terms"
      lede="The short, plain-English version of how this site works and what we do with anything you send us."
    />

    <section class="max-w-[860px] mx-auto px-6 pb-24">
      <div class="bg-paper-light border-[3px] border-outline rounded-[28px] p-7 sm:p-10 shadow-[6px_6px_0_var(--color-outline)]">
        <div v-for="(s, i) in sections" :key="s.title" :class="i ? 'mt-8 pt-8 border-t-2 border-outline/15' : ''">
          <h2 class="m-0 font-grotesk font-extrabold text-2xl">{{ s.title }}</h2>
          <p v-for="p in s.body" :key="p" class="mt-3 mb-0 text-[17px] leading-relaxed">{{ p }}</p>
        </div>
      </div>
      <p class="mt-6 mb-0 text-sm opacity-80">Acacia Climbing Pty Ltd · ABN 38 237 542 815 · Questions? hello@acaciaclimbing.org</p>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ prefooter: false })

useHead({
  title: 'Privacy and terms · Acacia Climbing Coalition',
  meta: [{ name: 'description', content: 'How Acacia Climbing Coalition handles your information, and the terms for using this site.' }],
})

const sections = [
  {
    title: 'Who we are',
    body: [
      'This site is run by Acacia Climbing Pty Ltd (ABN 38 237 542 815), trading as Acacia Climbing Coalition, based in Queensland, Australia.',
    ],
  },
  {
    title: 'What we collect',
    body: [
      "We don't have accounts, forms or newsletters on this site. If you email us, we receive your name, email address and whatever you choose to tell us.",
      'Our host, Cloudflare, keeps basic technical logs (like IP addresses) to keep the site running and secure.',
    ],
  },
  {
    title: 'How we use it',
    body: [
      "We only use what you send us to reply to you, coordinate volunteering, and follow up crag reports. We don't sell or share your details, and we'll delete them if you ask.",
      "We handle personal information in line with the Australian Privacy Principles. Email hello@acaciaclimbing.org with any questions or requests.",
    ],
  },
  {
    title: 'Climbing info on this site',
    body: [
      'Access status and crag details here are general information, not permission to climb. Access can change, so always check signage, local rules and any closures before you visit.',
      "Climbing is risky. You're responsible for your own safety and for respecting the land, other users and Traditional Owners.",
    ],
  },
  {
    title: 'Using our content',
    body: [
      "You're welcome to share and link to anything here with credit to Acacia Climbing Coalition. Detailed guidebook information lives on KAYA under their terms.",
    ],
  },
]
</script>
