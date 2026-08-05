<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader eyebrow="PRIVACY POLICY">
      How we handle <span class="italic">your information</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <div class="bg-cream-deep border-b border-ink px-4 sm:px-6 lg:px-14 py-8 font-mono text-[11px] tracking-[0.18em] text-green flex flex-col sm:flex-row justify-between gap-2">
      <span>FILED · 14 · IV · MMXXVI</span>
      <span>VERSION 1.0</span>
      <span>CLASSIFICATION · PUBLIC</span>
      <span>OFFICE · BRISBANE</span>
    </div>

    <!-- Intro -->
    <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[120px]">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div>
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">Summary</p>
        </div>
        <div>
          <p
            class="font-serif italic m-0 leading-[1.3]"
            style="font-size: clamp(24px, 3vw, 44px)"
          >
            We collect only what we need, hold it in Australia, and never sell it<span class="text-wattle">.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Policy sections -->
    <section
      v-for="s in sections"
      :key="s.n"
      class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[120px]"
    >
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div>
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

    <!-- Contact -->
    <section class="px-4 sm:px-6 lg:px-14 py-[120px]">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div>
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">Contact</p>
        </div>
        <div>
          <p class="font-serif font-medium text-[26px] m-0 mb-3">Privacy Officer</p>
          <a
            href="mailto:privacy@acaciaclimbing.org"
            class="font-mono text-[14px] tracking-[0.12em] text-green underline"
          >privacy@acaciaclimbing.org</a>
        </div>
      </div>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Privacy Policy · Acacia Climbing Coalition' })

const sections = [
  {
    n: '01',
    t: 'Who we are',
    p: [
      'Acacia Climbing Coalition Inc. ("Acacia", "we", "us") is an Australian not-for-profit incorporated in Queensland, ABN 00 000 000 000. Our registered office is in Brisbane, Queensland, Australia.',
      'This Privacy Policy describes how we collect, hold, use and disclose personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.',
    ],
  },
  {
    n: '02',
    t: 'Information we collect',
    p: [
      'We collect personal information you provide to us directly: name, email address, postal address (where given), and information you submit through our donation, volunteer, partner, newsletter or report-an-access-issue forms.',
      'We also collect technical information automatically when you visit our website: IP address, browser type, pages visited, and the time and duration of your visit. We do not use third-party advertising trackers.',
    ],
  },
  {
    n: '03',
    t: 'How we use it',
    p: [
      "We use personal information to: respond to your enquiries; process donations and issue receipts; coordinate volunteer activities; send the quarterly dispatch (only if you've subscribed); investigate reported access issues; and meet our obligations as an incorporated association and DGR.",
    ],
  },
  {
    n: '04',
    t: 'Who we share it with',
    p: [
      'We do not sell personal information. We share personal information only: with service providers who help us operate (payment processor, email platform, survey tools), each bound by confidentiality; with regulators or courts where required by law; and, in the case of access-issue reports, with the relevant land manager or council — and only with details necessary to act on the report.',
    ],
  },
  {
    n: '05',
    t: 'Your rights',
    p: [
      'You may request access to, or correction of, your personal information at any time by emailing privacy@acaciaclimbing.org. You may also withdraw consent to receive the dispatch via the unsubscribe link in every email.',
      'If you are dissatisfied with our handling of your personal information, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC).',
    ],
  },
  {
    n: '06',
    t: 'How we protect it',
    p: [
      'We hold personal information on Australian servers, encrypted in transit and at rest. Access is limited to the volunteers and contractors who need it to do their work, each under a confidentiality undertaking.',
    ],
  },
  {
    n: '07',
    t: 'Changes to this policy',
    p: [
      'We may update this policy from time to time. The "filed" date above indicates the most recent revision. Material changes will be communicated via the dispatch.',
    ],
  },
]
</script>
