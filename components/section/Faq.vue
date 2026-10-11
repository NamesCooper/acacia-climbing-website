<template>
  <!-- Questions that open and close. Uses <details>, so it works without JavaScript and with keyboards. -->
  <section class="max-w-[920px] mx-auto px-6 py-10 sm:py-14">
    <UiSectionTitle v-if="title" :title="title" :lead="lead" />
    <div class="flex flex-col gap-4" :class="title ? 'mt-8' : ''">
      <details
        v-for="(item, i) in items"
        :key="item.question"
        class="group bg-paper-light border-[3px] border-outline rounded-[22px] shadow-[5px_5px_0_var(--color-outline)]"
        :open="i === 0"
      >
        <summary class="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center justify-between gap-4 px-5 py-4 sm:px-6 font-grotesk font-extrabold text-lg leading-snug">
          {{ item.question }}
          <span aria-hidden="true" class="flex-shrink-0 size-9 rounded-full bg-wattle border-[3px] border-outline flex items-center justify-center text-2xl leading-none transition-transform group-open:rotate-45">+</span>
        </summary>
        <div class="px-5 pb-5 sm:px-6 text-[17px] leading-relaxed">
          <p v-for="p in paragraphs(item.answer)" :key="p" class="m-0 [&+p]:mt-3">{{ p }}</p>
        </div>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title?: string; lead?: string; items: { question: string; answer?: string }[] }>()
// A blank line in the answer starts a new paragraph
const paragraphs = (text = '') => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
</script>
