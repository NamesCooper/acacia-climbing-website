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

    <!-- Content -->
    <div class="relative z-10 flex flex-col px-4 sm:px-6 lg:px-12" style="height: 100dvh">

      <!-- Top bar -->
      <div class="flex justify-between items-center pt-6 lg:pt-8">
        <span
          class="font-mono uppercase tracking-[0.22em]"
          style="font-size: 10px; color: rgba(242,235,220,0.55)"
        >Acacia Climbing Coalition</span>
      </div>

      <!-- Main content -->
      <div class="flex-1 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
        <div
          class="font-mono uppercase tracking-[0.22em] mb-6 text-wattle"
          style="font-size: 14px;"
        >Coming soon</div>

        <h1
          class="font-serif font-normal m-0 tracking-[-0.035em] text-cream"
          style="font-size: clamp(34px, 8vw, 140px); line-height: 0.88"
        >
          Protecting<br/>Australia's
          <span class="italic text-wattle">Crags.</span>
        </h1>

        <p
          class="font-serif italic mt-5 sm:mt-7 m-0"
          style="font-size: clamp(14px, 1.6vw, 18px); color: rgba(242,235,220,0.70); max-width: 480px; line-height: 1.5"
        >
          Working with councils, climbers, and communities to protect and formalise climbing access across Australia.<br class="hidden sm:block" />
        </p>

        <div class="mt-4 sm:mt-6 flex items-center gap-4">
          <a
            href="mailto:hello@acaciaclimbing.org"
            class="font-mono uppercase tracking-[0.18em] text-ink bg-wattle px-5 py-2 hover:opacity-90 transition-opacity"
            style="font-size: 12px; text-decoration: none"
          >Get in touch</a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="flex justify-between items-end pb-6 lg:pb-8"
        style="color: rgba(242,235,220,0.30)"
      >
        <span class="font-mono tracking-[0.12em]" style="font-size: 9px">© 2026 ACACIA CLIMBING PTY LTD</span>
        <span class="font-mono tracking-[0.12em]" style="font-size: 9px">ABN 38 237 542 815</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
})
</script>
