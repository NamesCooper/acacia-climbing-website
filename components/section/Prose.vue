<template>
  <!-- Long-form reading text in one card: headed blocks of paragraphs. Good for policies and explainers. -->
  <section class="max-w-[860px] mx-auto px-6 py-10 sm:py-14">
    <UiCard size="lg">
      <div v-for="(b, i) in blocks" :key="b.title" :class="i ? 'mt-8 pt-8 border-t-2 border-outline/15' : ''">
        <h2 class="m-0 font-grotesk font-extrabold text-2xl">{{ b.title }}</h2>
        <p v-for="p in b.paragraphs" :key="p" class="mt-3 mb-0 text-[17px] leading-relaxed">{{ p }}</p>
      </div>
    </UiCard>
    <p v-if="footnote" class="mt-6 mb-0 text-sm opacity-80">{{ footnote }}</p>
  </section>
</template>

<script setup lang="ts">
import type { ProseBlock } from '~/types/content'

defineProps<{ blocks: ProseBlock[]; footnote?: string }>()
</script>
