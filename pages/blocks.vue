<template>
  <div>
    <SitePageHeader
      eyebrow="Block gallery"
      title="Every block,"
      accent="side by side"
      lede="All the blocks you can add to a page in the Studio, filled with example words. Spot one you like here, then pick it by the same name from the Studio's Add item menu."
    />

    <!-- Jump links -->
    <nav aria-label="Blocks" class="max-w-[1240px] mx-auto px-6 pb-6">
      <ul class="list-none p-0 m-0 flex flex-wrap gap-2.5">
        <li v-for="b in BLOCKS" :key="b.name">
          <a :href="`#${b.anchor ?? b.type}`" class="inline-block no-underline text-forest bg-paper-light border-2 border-outline rounded-full px-3.5 py-1.5 text-sm font-bold hover:bg-wattle">{{ b.name }}</a>
        </li>
      </ul>
    </nav>

    <template v-for="b in BLOCKS" :key="b.name">
      <div :id="b.anchor ?? b.type" class="max-w-[1240px] mx-auto px-6 pt-12 scroll-mt-4">
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 border-t-[3px] border-dashed border-outline/25 pt-6">
          <span class="inline-block bg-forest text-paper border-2 border-outline rounded-full px-4 py-1.5 font-grotesk font-extrabold text-sm">{{ b.name }}</span>
          <span class="text-[15px]"><strong>Good for:</strong> {{ b.goodFor }}</span>
        </div>
      </div>
      <!-- data-block is used to take the thumbnail pictures for the Studio menu -->
      <div :data-block="b.anchor ?? b.type">
        <SanitySections :sections="[{ _key: b.anchor ?? b.type, _type: b.type, ...b.example }]" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// A reference page for choosing blocks. Not linked from the site and hidden from Google.
definePageMeta({ prefooter: false })
useHead({
  title: 'Block gallery · Acacia Climbing Coalition',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

// Rich text, the shape the Studio saves it in
let k = 0
const text = (...paras: string[]) =>
  paras.map((p) => ({ _type: 'block', _key: `t${k++}`, style: 'normal', markDefs: [], children: [{ _type: 'span', _key: `s${k++}`, text: p, marks: [] }] }))
const card = (c: Record<string, any>) => ({ _type: 'card', _key: `c${k++}`, ...c })

const BLOCKS: { type: string; anchor?: string; name: string; goodFor: string; example: Record<string, any> }[] = [
  {
    type: 'heroSection',
    name: 'Hero (big poster headline)',
    goodFor: 'the very top of the homepage or a campaign page. One per page.',
    example: {
      label: "Hey, we're Acacia. A friendly bunch of climbers.",
      heading: 'Our crags,\nlooked after',
      body: "We work with councils so bouldering spots get recognised, mapped and looked after.",
      primaryLabel: 'See the crag map', primaryHref: '/progress',
      secondaryLabel: 'How you can help', secondaryHref: '/get-involved',
    },
  },
  {
    type: 'marqueeSection',
    name: 'Scrolling band',
    goodFor: 'a bit of energy between sections. Pick moss, forest or wattle.',
    example: { colour: 'moss', items: ['Australian bouldering', 'starting in SEQ', 'come say g\'day'] },
  },
  {
    type: 'tabsSection',
    name: 'Tabs panel',
    goodFor: 'two to four short answers that share one spot, like What / How / Where.',
    example: {
      tabs: [
        { _key: 'a', label: 'What', heading: 'What is ACC?', body: text('A bunch of climbers working to get outdoor bouldering formally recognised by councils around Australia.') },
        { _key: 'b', label: 'How', heading: 'How does it work?', body: text('Research, chat with council, map every boulder on KAYA, then get it signed off.') },
      ],
    },
  },
  {
    type: 'textSection',
    name: 'Text (with optional quote card)',
    goodFor: 'explaining something, with a big quote beside it if you like.',
    example: {
      heading: 'Why we started',
      body: text("Most councils in Australia don't have a way to formally recognise outdoor climbing.", 'That leaves crags with unclear access and nobody speaking for climbers.'),
      quote: '"Documented crag, protected crag."',
      quoteBody: "A crag that's mapped and known to council is a lot easier to keep open.",
      quoteTone: 'wattle',
    },
  },
  {
    type: 'imageTextSection',
    name: 'Photo and text',
    goodFor: 'showing the work: a clean-up day, new signage, a crag. Photo can sit left or right.',
    example: {
      label: 'Out at Tooheys',
      heading: 'New stairs are in',
      body: text('A short write-up to go with the photo. Who was there, what got done, and what it means for climbers.'),
      imageSide: 'left',
      linkLabel: 'Read the update', linkHref: '/updates',
    },
  },
  {
    type: 'imageTextSection',
    anchor: 'imageTextCutout',
    name: 'Photo and text (cut-out style)',
    goodFor: 'people and moments. Upload a photo with the background removed and pick "Cut-out on a shape".',
    example: {
      label: 'Who\'s behind it',
      heading: 'Started by a local boulderer',
      body: text('A short, first-person hello. Why you started, and what you\'re hoping to build.'),
      look: 'cutout', shape: 'lichen', imageSide: 'right',
      linkLabel: 'Meet the crew', linkHref: '/about',
    },
  },
  {
    type: 'formSection',
    name: 'Sign-up form',
    goodFor: 'collecting helpers without relying on email links. Set where it sends under "Where it sends".',
    example: {
      label: 'Got an hour?', heading: 'Lend a hand',
      intro: "Tell us a bit about yourself and what you'd like to help with. We'll get in touch.",
      interests: ['Clean-up days', 'Track work', 'Writing to council', 'Mapping on KAYA'],
      privacyNote: "We'll only use your details to get in touch about helping out.",
    },
  },
  {
    type: 'cardsSection',
    name: 'Cards',
    goodFor: 'ways to help, milestones, partners. 2, 3 or 4 across, colours and tilt are up to you.',
    example: {
      heading: 'Ways to help', columns: 3, titleStyle: 'display', tilted: true,
      cards: [
        card({ kicker: 'Volunteer', chipTone: 'lichen', title: 'Give an hour or two', body: 'Clean-ups, track work and mapping.', linkLabel: "I'm keen", linkHref: '/get-involved', buttonColour: 'moss', halftone: true }),
        card({ kicker: 'Report', chipTone: 'wattle', title: 'Be our eyes', body: 'Tell us about closed tracks, new signs or damage.', tone: 'sandstone' }),
        card({ kicker: 'Partners', title: 'Working with', tone: 'forest', items: [{ _key: 'i1', title: 'RCQ', body: "Rock Climbing Queensland, the state's peak climbing body." }, { _key: 'i2', title: 'KAYA', body: 'Where our guidebooks live.' }] }),
      ],
    },
  },
  {
    type: 'factsSection',
    name: 'Big numbers',
    goodFor: 'a quick snapshot for councils and grant bodies. Real, checkable numbers only.',
    example: {
      heading: 'So far',
      facts: [
        { _key: 'f1', value: '5', label: "Crags we're working on" },
        { _key: 'f2', value: '1', label: 'Council recognition so far' },
        { _key: 'f3', value: '8', label: 'Steps to protect a crag' },
        { _key: 'f4', value: '7', label: 'States and territories still to reach' },
      ],
      note: 'Example numbers, as of October 2026.',
    },
  },
  {
    type: 'stepsSection',
    name: 'Numbered steps',
    goodFor: 'a process people can follow, like the eight steps to protect a crag.',
    example: {
      label: 'Every crag goes through the same steps', heading: 'How we do it', band: 'sandstone',
      steps: ['Research the area', 'Talk with council', 'Map it on KAYA', 'Get it signed off'],
      linkLabel: 'See where each crag is up to', linkHref: '/progress',
    },
  },
  {
    type: 'timelineSection',
    name: 'Timeline',
    goodFor: 'what happened when. Each entry gets a date chip.',
    example: {
      heading: "Where we've been",
      items: [
        { _key: 'l1', date: '2025', title: 'First council chats', detail: 'Started talking with Brisbane City Council.' },
        { _key: 'l2', date: '2026', title: 'Tooheys recognised', detail: 'Bouldering formally recognised, stairs and signs in.' },
      ],
    },
  },
  {
    type: 'peopleSection',
    name: 'People',
    goodFor: 'introducing the crew or volunteers (with their OK).',
    example: {
      heading: 'The crew',
      people: [
        { _key: 'p1', name: 'Your name', role: 'What you do', location: 'Brisbane' },
        { _key: 'p2', name: 'A volunteer', role: 'Mapping and site visits', location: 'Ipswich' },
        { _key: 'p3', name: 'Another volunteer', role: 'Council letters', location: 'Logan' },
      ],
    },
  },
  {
    type: 'faqSection',
    name: 'Questions (FAQ)',
    goodFor: 'the same questions you keep getting asked. The first one starts open.',
    example: {
      heading: 'Good questions',
      items: [
        { _key: 'q1', question: 'Is it okay to climb at these crags?', answer: 'Access status here is general information, not permission. Always check signage and local rules before you go.' },
        { _key: 'q2', question: 'Can I help if I\'m new to climbing outside?', answer: 'Absolutely. Plenty of the work is mapping, writing and turning up to clean-up days.' },
        { _key: 'q3', question: 'Who runs Acacia?', answer: 'A small, independent volunteer crew. We keep Rock Climbing Queensland in the loop on our council work.' },
      ],
    },
  },
  {
    type: 'updatesSection',
    name: 'Latest updates',
    goodFor: 'keeping a page feeling alive. Pulls the newest posts from Updates by itself.',
    example: { count: 3 },
  },
  {
    type: 'videoSection',
    name: 'Video',
    goodFor: 'a YouTube or Vimeo video. Nothing loads from YouTube until someone presses play.',
    example: { heading: 'Cedar Creek', caption: 'Paste a YouTube or Vimeo link in the Studio and the video shows here.' },
  },
  {
    type: 'statementSection',
    name: 'Centred statement',
    goodFor: 'a calm, important message, like the Acknowledgement of Country.',
    example: { heading: 'We climb on Country', sprig: true, body: text('A short, centred message that deserves room to breathe.') },
  },
  {
    type: 'ctaSection',
    name: 'Call to action panel',
    goodFor: 'one clear ask at the end of a page. Sandstone, wattle or lichen.',
    example: {
      label: 'Not in South East Queensland?', heading: 'We want to hear from climbers everywhere', tone: 'sandstone',
      body: "If there's a crag near you with access worries, tell us about it.",
      buttonLabel: 'Tell us about your local', buttonHref: 'mailto:hello@acaciaclimbing.org',
    },
  },
  {
    type: 'proseSection',
    name: 'Long text (policies)',
    goodFor: 'privacy, terms, codes of conduct. Plain reading, no fuss.',
    example: {
      footnote: 'Questions? hello@acaciaclimbing.org',
      blocks: [
        { _key: 'r1', title: 'Who we are', body: text('A short paragraph explaining one part of the policy.') },
        { _key: 'r2', title: 'What we collect', body: text('Another part, kept in plain English.') },
      ],
    },
  },
  {
    type: 'cragRegisterSection',
    name: "Crag cards (\"Where it's at\")",
    goodFor: 'showing the furthest-along crags. Fills itself from the Crags list.',
    example: { heading: "Where it's at", linkLabel: 'See where every crag is up to' },
  },
]
</script>
