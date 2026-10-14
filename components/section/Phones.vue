<template>
  <!-- "How it works" in a few steps. Each step can show a phone screenshot in a phone frame.
       Steps without a screenshot show as a numbered card instead, so the block still looks
       finished before the screenshots arrive. -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <img v-if="logo?.src" :src="logo.src" :alt="logo.alt ?? ''" class="block h-8 sm:h-9 w-auto mb-6" />
    <UiSectionTitle :title="title" :lead="lead" />
    <p v-if="intro" class="mt-4 mb-0 max-w-[680px] text-lg leading-relaxed">{{ intro }}</p>

    <ol class="list-none p-0 m-0 mt-10 grid gap-10 sm:gap-8" :class="screens.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'">
      <li v-for="(s, i) in screens" :key="i" class="min-w-0 flex flex-col items-start">
        <!-- Phone frame: thick outline and hard shadow like every other poster box -->
        <div
          v-if="s.image?.src"
          class="w-full max-w-[260px] aspect-[9/19] bg-outline border-[3px] border-outline rounded-[38px] p-2 shadow-[6px_6px_0_var(--color-outline)]"
        >
          <img :src="s.image.src" :alt="s.image.alt ?? ''" loading="lazy" class="block size-full object-cover object-top rounded-[30px] bg-paper" />
        </div>
        <span
          v-else
          aria-hidden="true"
          class="inline-flex items-center justify-center size-12 rounded-full bg-moss text-paper border-[3px] border-outline font-grotesk font-extrabold text-lg"
        >{{ i + 1 }}</span>
        <h3 class="mt-5 mb-0 font-grotesk font-extrabold text-2xl leading-tight">
          <span class="sr-only">Step {{ i + 1 }}: </span>{{ s.title }}
        </h3>
        <p v-if="s.body" class="mt-2 mb-0 text-[17px] leading-relaxed max-w-[340px]">{{ s.body }}</p>
      </li>
    </ol>

    <UiButton v-if="cta" class="mt-10" :to="cta.to" :href="cta.href" :variant="cta.variant">{{ cta.label }}</UiButton>
  </section>
</template>

<script setup lang="ts">
import type { Cta } from '~/types/content'

defineProps<{
  title: string
  lead?: string
  intro?: string
  logo?: { src?: string; alt?: string }
  screens: { title: string; body?: string; image?: { src?: string; alt?: string } }[]
  cta?: Cta
}>()
</script>
