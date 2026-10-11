<template>
  <!-- Section heading: optional friendly lead-in line, then a chunky uppercase title. -->
  <div>
    <p v-if="lead" class="m-0 mb-2 font-poster text-2xl" :class="light ? 'text-paper' : ''">{{ lead }}</p>
    <component
      :is="as"
      class="m-0 font-grotesk font-extrabold uppercase leading-[0.95] tracking-[-0.03em]"
      :class="[small ? 'text-[clamp(30px,4vw,44px)]' : 'text-[clamp(36px,5vw,56px)]', light ? 'text-paper' : 'text-forest']"
    >{{ title }}</component>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ title: string; lead?: string; as?: string; small?: boolean; light?: boolean }>(),
  { as: 'h2' },
)
</script>
