<template>
  <div class="relative overflow-hidden w-full font-sans" style="height: 100dvh; background: #1C2A1E;">

    <!-- Background landscape -->
    <div class="absolute inset-0">
      <CragPlate title="" number="001" variant="a" />
    </div>

    <!-- Gradient overlay — heavy at top and bottom, light in middle -->
    <div
      class="absolute inset-0"
      style="background: linear-gradient(180deg,
        rgba(28,42,30,0.82) 0%,
        rgba(28,42,30,0.30) 35%,
        rgba(28,42,30,0.35) 65%,
        rgba(28,42,30,0.88) 100%)"
    />

    <!-- Content layer -->
    <div class="absolute inset-0 z-10 px-4 sm:px-6 lg:px-12">

      <!-- Top bar -->
      <div class="flex justify-between items-center pt-6 lg:pt-8">
        <span
          class="font-mono uppercase tracking-[0.22em]"
          style="font-size: 14px; color: rgba(242,235,220,0.55)"
        >Acacia Climbing Coalition</span>
      </div>

      <!-- Main content — centred, anchored in the landscape -->
      <div class="absolute left-4 sm:left-6 lg:left-12 right-4 sm:right-6 lg:right-12 text-center" style="top: clamp(120px, 36%, 400px)">
        <div
          class="font-mono uppercase tracking-[0.22em] mb-5 sm:mb-7 text-wattle"
          style="font-size: 14px"
        >Coming soon</div>

        <h1
          class="font-serif font-normal m-0 tracking-[-0.035em] text-cream"
          style="font-size: clamp(62px, 9vw, 130px); line-height: 0.88"
        >
          Protecting<br/>Australia's<br/>
          <span class="italic text-wattle">Crags.</span>
        </h1>

        <p
          class="font-serif italic mt-5 sm:mt-9 mx-auto m-0"
          style="font-size: clamp(18px, 1.6vw, 20px); color: rgba(242,235,220,0.70); max-width: 520px; line-height: 1.5"
        >
          Working with councils, climbers, and communities to protect and formalise climbing access across Australia.
        </p>

        <div class="mt-5 sm:mt-9 flex items-center justify-center gap-4">
          <a
            href="mailto:hello@acaciaclimbing.org"
            class="font-mono uppercase tracking-[0.18em] text-ink bg-wattle px-6 py-3 hover:opacity-90 transition-opacity whitespace-nowrap"
            style="font-size: 12px; text-decoration: none"
          >Get in touch</a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="absolute bottom-0 left-4 sm:left-6 lg:left-12 right-4 sm:right-6 lg:right-12 flex justify-center sm:justify-between pb-6 lg:pb-8"
        style="color: rgba(242,235,220,0.30)"
      >
        <span class="font-mono tracking-[0.12em] whitespace-nowrap" style="font-size: 10px">© 2026 ACACIA CLIMBING PTY LTD</span>
        <span class="font-mono tracking-[0.12em] hidden sm:block whitespace-nowrap" style="font-size: 10px">ABN 38 237 542 815</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
})
</script>
