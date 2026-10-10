<template>
  <section class="relative max-w-[1000px] mx-auto px-6 pt-8 pb-14 text-center">
    <!-- sparkles -->
    <RetroSparkle class="absolute left-[4%] top-[22%] text-outline hidden sm:block" :size="64" />
    <RetroSparkle class="absolute right-[6%] top-[12%] text-outline" :size="44" delay=".8s" />
    <RetroSparkle class="absolute right-[10%] top-[68%] text-outline hidden sm:block" :size="34" delay="1.4s" />

    <p class="relative m-0 font-poster text-[clamp(22px,3.4vw,34px)] leading-tight">
      A friendly bunch of climbers from South East Queensland
    </p>

    <!-- Two-ink riso headline: the wattle copy sits slightly off-register behind the dark one -->
    <h1 class="relative mt-4 mb-0 font-display text-[clamp(64px,13vw,148px)] leading-[0.88] tracking-[-0.025em]">
      <span aria-hidden="true" class="absolute inset-0 text-wattle translate-x-[6px] translate-y-[6px]">Keep the<br>crags open</span>
      <span class="relative">Keep the<br>crags open</span>
    </h1>

    <p class="relative mx-auto mt-7 mb-0 max-w-[600px] text-lg sm:text-xl leading-relaxed">
      We're working with councils so local bouldering spots get recognised, mapped and looked after.
      It's our first go at this, and we're doing it out in the open.
    </p>

    <div class="relative flex flex-wrap justify-center gap-4 mt-9">
      <NuxtLink
        to="/progress"
        class="nudge no-underline bg-moss text-paper border-[3px] border-outline rounded-full px-7 py-4 font-grotesk font-extrabold text-lg shadow-[5px_5px_0_var(--color-outline)]"
      >See the crag map</NuxtLink>
      <NuxtLink
        to="/get-involved"
        class="nudge no-underline bg-paper-light text-outline border-[3px] border-outline rounded-full px-7 py-4 font-grotesk font-extrabold text-lg shadow-[5px_5px_0_var(--color-outline)]"
      >How you can help</NuxtLink>
    </div>

    <div class="relative mx-auto mt-12 size-[200px] rounded-full border-[3px] border-dashed border-outline/30 flex items-center justify-center">
      <img src="/brand/sprig-gold.png" alt="" class="anim-bob w-[120px] h-auto" />
    </div>
  </section>
</template>
