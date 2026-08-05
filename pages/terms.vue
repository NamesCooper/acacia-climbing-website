<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader eyebrow="§ 05 · TERMS OF USE">
      The terms <span class="italic">of using this site</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <!-- Filing strip -->
    <div class="bg-cream-deep border-b border-ink px-4 sm:px-6 lg:px-14 py-8 font-mono text-[11px] tracking-[0.18em] text-green flex flex-col sm:flex-row justify-between gap-2">
      <span>FILED · 14 · IV · MMXXVI</span>
      <span>VERSION 1.0</span>
      <span>CLASSIFICATION · PUBLIC</span>
      <span>JURISDICTION · QLD</span>
    </div>

    <!-- Intro section -->
    <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[120px]">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div>
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">§ 05.00 / SUMMARY</p>
        </div>
        <div>
          <p
            class="font-serif italic m-0 leading-[1.3]"
            style="font-size: clamp(24px, 3vw, 44px)"
          >
            Plain terms for using this site and the crag register. The short version: climb at your own risk, respect Country, contribute generously<span class="text-wattle">.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Terms sections -->
    <section
      v-for="s in sections"
      :key="s.n"
      class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[120px]"
    >
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div>
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0 mb-3">§ 05.{{ s.n }}</p>
          <h2
            class="font-serif italic font-normal m-0 leading-[1.15]"
            style="font-size: 32px"
          >{{ s.t }}</h2>
        </div>
        <div class="flex flex-col gap-6">
          <p
            v-for="(para, i) in s.p"
            :key="i"
            class="font-serif text-[19px] text-ink-soft leading-[1.65] m-0"
          >{{ para }}</p>
        </div>
      </div>
    </section>

    <!-- Contact block -->
    <section class="px-4 sm:px-6 lg:px-14 py-[120px]">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div>
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">§ 05 / CONTACT</p>
        </div>
        <div>
          <p class="font-serif font-medium text-[26px] m-0 mb-3">Secretary, Acacia Climbing Coalition Inc.</p>
          <a
            href="mailto:secretary@acaciaclimbing.org"
            class="font-mono text-[14px] tracking-[0.12em] text-green underline"
          >secretary@acaciaclimbing.org</a>
        </div>
      </div>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Terms of Use · Acacia Climbing Coalition' })

const sections = [
  {
    n: '01',
    t: 'Acceptance',
    p: [
      'By accessing acaciaclimbing.org or any subdomain (the "Site"), you agree to these Terms of Use. If you do not agree, please do not use the Site.',
    ],
  },
  {
    n: '02',
    t: 'About this Site',
    p: [
      'The Site is operated by Acacia Climbing Coalition Inc., an Australian incorporated association. Its purpose is to inform the public about the work of the coalition and to coordinate the recognition, documentation and stewardship of outdoor climbing in Australia.',
    ],
  },
  {
    n: '03',
    t: 'The crag register — climb at your own risk',
    p: [
      'The crag register published on the Site is a documentary record. It is not a guidebook, not a route grade authority, and not a guarantee of safety. Climbing is dangerous; outdoor climbing on natural rock especially so.',
      'The grades, route descriptions, anchor information, and access notes in the register are provided "as is" and may be incorrect, incomplete or out of date. You climb at your own risk. Acacia, its volunteers and partner organisations accept no liability for any injury, loss or damage arising from use of the register or attendance at any documented crag.',
    ],
  },
  {
    n: '04',
    t: 'Country & access',
    p: [
      'Many crags are on Country to which Traditional Owners have ongoing connection, and on land managed by councils, private landholders or state agencies. Inclusion in the register does not constitute an invitation to climb. You are responsible for understanding the access status, cultural protocols, and any closures or restrictions applying to a crag before you visit.',
    ],
  },
  {
    n: '05',
    t: 'Contributions',
    p: [
      "If you submit information to the register, file an access-issue report, or otherwise contribute content to the Site, you grant Acacia a non-exclusive, perpetual, royalty-free licence to use, edit, publish and archive that content in furtherance of the coalition's mission. You confirm that you have the right to make the contribution and that it is accurate to the best of your knowledge.",
    ],
  },
  {
    n: '06',
    t: 'Donations',
    p: [
      'Acacia is registered as a deductible gift recipient (DGR) under Australian law. Donations are processed by a third-party payment provider; receipts are issued electronically. Donations are non-refundable except where required by law.',
    ],
  },
  {
    n: '07',
    t: 'Intellectual property',
    p: [
      'Site content — text, photography, register data, design — is © Acacia Climbing Coalition Inc. unless otherwise attributed. You may quote and link to material with attribution; you may not reproduce substantial portions of the register or design without written permission.',
    ],
  },
  {
    n: '08',
    t: 'Limitation of liability',
    p: [
      'To the fullest extent permitted by law, Acacia, its directors, volunteers and partner organisations are not liable for any direct, indirect, incidental or consequential loss arising from use of the Site or reliance on its content. Nothing in these Terms limits any right or remedy you have under the Australian Consumer Law.',
    ],
  },
  {
    n: '09',
    t: 'Governing law',
    p: [
      'These Terms are governed by the laws of Queensland, Australia. The courts of Queensland have exclusive jurisdiction over any dispute.',
    ],
  },
  {
    n: '10',
    t: 'Changes',
    p: [
      'We may update these Terms from time to time. The "filed" date below indicates the most recent revision. Continued use of the Site after a revision constitutes acceptance of the updated Terms.',
    ],
  },
]
</script>
