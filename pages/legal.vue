<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader eyebrow="LEGAL">
      Privacy &amp; <span class="italic">Terms</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <div class="bg-cream-deep border-b border-ink px-4 sm:px-6 lg:px-14 py-8 font-mono text-[11px] tracking-[0.18em] text-green flex flex-col sm:flex-row justify-between gap-2">
      <span>FILED · 14 · IV · MMXXVI</span>
      <span>VERSION 1.0</span>
      <span>CLASSIFICATION · PUBLIC</span>
      <span>JURISDICTION · QLD · AUSTRALIA</span>
    </div>

    <!-- Jump links -->
    <div class="border-b border-ink px-4 sm:px-6 lg:px-14 py-6 flex gap-8">
      <a href="#privacy" class="font-mono text-[11px] tracking-[0.18em] text-green uppercase hover:text-ink transition-colors no-underline">Privacy Policy ↓</a>
      <a href="#terms" class="font-mono text-[11px] tracking-[0.18em] text-green uppercase hover:text-ink transition-colors no-underline">Terms of Use ↓</a>
    </div>

    <!-- ── PRIVACY POLICY ── -->
    <div id="privacy">
      <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[80px] bg-cream-deep">
        <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
          <div>
            <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">Privacy Policy</p>
          </div>
          <div>
            <p class="font-serif italic m-0 leading-[1.3]" style="font-size: clamp(24px, 3vw, 40px)">
              We collect only what we need, hold it in Australia, and never sell it<span class="text-wattle">.</span>
            </p>
          </div>
        </div>
      </section>

      <section
        v-for="s in privacySections"
        :key="s.t"
        class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[80px]"
      >
        <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
          <h2 class="font-serif italic font-normal m-0 leading-[1.15]" style="font-size: 28px">{{ s.t }}</h2>
          <div class="flex flex-col gap-6">
            <p
              v-for="(para, i) in s.p"
              :key="i"
              class="font-serif text-[18px] text-ink-soft leading-[1.65] m-0"
            >{{ para }}</p>
          </div>
        </div>
      </section>

      <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[80px]">
        <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">Privacy contact</p>
          <div>
            <p class="font-serif font-medium text-[24px] m-0 mb-2">Privacy Officer</p>
            <a href="mailto:privacy@acaciaclimbing.org" class="font-mono text-[13px] tracking-[0.12em] text-green underline">privacy@acaciaclimbing.org</a>
          </div>
        </div>
      </section>
    </div>

    <!-- ── TERMS OF USE ── -->
    <div id="terms">
      <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[80px] bg-cream-deep">
        <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
          <div>
            <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">Terms of Use</p>
          </div>
          <div>
            <p class="font-serif italic m-0 leading-[1.3]" style="font-size: clamp(24px, 3vw, 40px)">
              Plain terms for using this site and the crag register. Climb at your own risk, respect Country, contribute generously<span class="text-wattle">.</span>
            </p>
          </div>
        </div>
      </section>

      <section
        v-for="s in termsSections"
        :key="s.t"
        class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[80px]"
      >
        <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
          <h2 class="font-serif italic font-normal m-0 leading-[1.15]" style="font-size: 28px">{{ s.t }}</h2>
          <div class="flex flex-col gap-6">
            <p
              v-for="(para, i) in s.p"
              :key="i"
              class="font-serif text-[18px] text-ink-soft leading-[1.65] m-0"
            >{{ para }}</p>
          </div>
        </div>
      </section>

      <section class="px-4 sm:px-6 lg:px-14 py-[80px]">
        <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">Terms contact</p>
          <div>
            <p class="font-serif font-medium text-[24px] m-0 mb-2">Secretary, Acacia Climbing Coalition Inc.</p>
            <a href="mailto:secretary@acaciaclimbing.org" class="font-mono text-[13px] tracking-[0.12em] text-green underline">secretary@acaciaclimbing.org</a>
          </div>
        </div>
      </section>
    </div>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Privacy & Terms · Acacia Climbing Coalition' })

const privacySections = [
  { t: 'Who we are', p: ['Acacia Climbing Coalition Inc. ("Acacia", "we", "us") is an Australian not-for-profit incorporated in Queensland, ABN 00 000 000 000. Our registered office is in Brisbane, Queensland, Australia.', 'This Privacy Policy describes how we collect, hold, use and disclose personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.'] },
  { t: 'Information we collect', p: ['We collect personal information you provide to us directly: name, email address, postal address (where given), and information you submit through our donation, volunteer, partner, newsletter or report-an-access-issue forms.', 'We also collect technical information automatically when you visit our website: IP address, browser type, pages visited, and the time and duration of your visit. We do not use third-party advertising trackers.'] },
  { t: 'How we use it', p: ["We use personal information to: respond to your enquiries; process donations and issue receipts; coordinate volunteer activities; send the quarterly dispatch (only if you've subscribed); investigate reported access issues; and meet our obligations as an incorporated association and DGR."] },
  { t: 'Who we share it with', p: ['We do not sell personal information. We share personal information only: with service providers who help us operate (payment processor, email platform, survey tools), each bound by confidentiality; with regulators or courts where required by law; and, in the case of access-issue reports, with the relevant land manager or council — and only with details necessary to act on the report.'] },
  { t: 'Your rights', p: ['You may request access to, or correction of, your personal information at any time by emailing privacy@acaciaclimbing.org. You may also withdraw consent to receive the dispatch via the unsubscribe link in every email.', 'If you are dissatisfied with our handling of your personal information, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC).'] },
  { t: 'How we protect it', p: ['We hold personal information on Australian servers, encrypted in transit and at rest. Access is limited to the volunteers and contractors who need it to do their work, each under a confidentiality undertaking.'] },
  { t: 'Changes to this policy', p: ['We may update this policy from time to time. The filed date above indicates the most recent revision. Material changes will be communicated via the dispatch.'] },
]

const termsSections = [
  { t: 'Acceptance', p: ['By accessing acaciaclimbing.org or any subdomain (the "Site"), you agree to these Terms of Use. If you do not agree, please do not use the Site.'] },
  { t: 'About this Site', p: ['The Site is operated by Acacia Climbing Coalition Inc., an Australian incorporated association. Its purpose is to inform the public about the work of the coalition and to coordinate the recognition, documentation and stewardship of outdoor climbing in Australia.'] },
  { t: 'The crag register — climb at your own risk', p: ['The crag register published on the Site is a documentary record. It is not a guidebook, not a route grade authority, and not a guarantee of safety. Climbing is dangerous; outdoor climbing on natural rock especially so.', 'The grades, route descriptions, anchor information, and access notes in the register are provided "as is" and may be incorrect, incomplete or out of date. You climb at your own risk. Acacia, its volunteers and partner organisations accept no liability for any injury, loss or damage arising from use of the register or attendance at any documented crag.'] },
  { t: 'Country & access', p: ['Many crags are on Country to which Traditional Owners have ongoing connection, and on land managed by councils, private landholders or state agencies. Inclusion in the register does not constitute an invitation to climb. You are responsible for understanding the access status, cultural protocols, and any closures or restrictions applying to a crag before you visit.'] },
  { t: 'Contributions', p: ["If you submit information to the register, file an access-issue report, or otherwise contribute content to the Site, you grant Acacia a non-exclusive, perpetual, royalty-free licence to use, edit, publish and archive that content in furtherance of the coalition's mission. You confirm that you have the right to make the contribution and that it is accurate to the best of your knowledge."] },
  { t: 'Donations', p: ['Acacia is registered as a deductible gift recipient (DGR) under Australian law. Donations are processed by a third-party payment provider; receipts are issued electronically. Donations are non-refundable except where required by law.'] },
  { t: 'Intellectual property', p: ['Site content — text, photography, register data, design — is © Acacia Climbing Coalition Inc. unless otherwise attributed. You may quote and link to material with attribution; you may not reproduce substantial portions of the register or design without written permission.'] },
  { t: 'Limitation of liability', p: ['To the fullest extent permitted by law, Acacia, its directors, volunteers and partner organisations are not liable for any direct, indirect, incidental or consequential loss arising from use of the Site or reliance on its content. Nothing in these Terms limits any right or remedy you have under the Australian Consumer Law.'] },
  { t: 'Governing law', p: ['These Terms are governed by the laws of Queensland, Australia. The courts of Queensland have exclusive jurisdiction over any dispute.'] },
  { t: 'Changes', p: ['We may update these Terms from time to time. The filed date above indicates the most recent revision. Continued use of the Site after a revision constitutes acceptance of the updated Terms.'] },
]
</script>
