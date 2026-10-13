<template>
  <!-- The "Sprig Dot" wordmark: lowercase "acacia" with the wattle sprig as the dot on the i.
       Built from live text so it stays sharp at any size. Swap for an SVG file once the logo is final.
       With `tagline`, "Climbing Coalition" sits underneath in small gold capitals (the full lockup,
       used in the nav and footer). Without it, just "acacia" for tight spots. -->
  <span class="inline-flex flex-col items-start" role="img" :aria-label="tagline ? 'Acacia Climbing Coalition' : 'acacia'">
    <span
      aria-hidden="true"
      class="font-grotesk font-extrabold leading-none tracking-[-0.05em] whitespace-nowrap"
      :style="{ fontSize: size + 'px' }"
    >acac<span class="relative inline-block">ı<img
      src="/brand/sprig-gold.png"
      alt=""
      class="absolute left-1/2 h-auto max-w-none"
      :style="{ width: size * 0.78 + 'px', top: -size * 0.42 + 'px', transform: 'translateX(-44%) rotate(-12deg)' }"
    ></span>a</span>
    <span
      v-if="tagline"
      aria-hidden="true"
      class="font-grotesk font-extrabold uppercase whitespace-nowrap text-wattle leading-none pl-[0.15em]"
      :style="{ fontSize: Math.max(10, size * 0.29) + 'px', letterSpacing: '0.2em', marginTop: size * 0.12 + 'px' }"
    >Climbing Coalition</span>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number; tagline?: boolean }>(), { size: 44, tagline: false })
</script>
