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
        <!-- iPhone-style mockup: dark body, side buttons, rounded screen and the Dynamic Island.
             Drawn in CSS so any screenshot from the Studio drops straight in. -->
        <div v-if="s.image?.src" class="relative w-full max-w-[250px]">
          <span aria-hidden="true" class="absolute -left-[5px] top-[18%] h-[7%] w-[5px] rounded-l bg-outline"></span>
          <span aria-hidden="true" class="absolute -left-[5px] top-[27%] h-[7%] w-[5px] rounded-l bg-outline"></span>
          <span aria-hidden="true" class="absolute -right-[5px] top-[22%] h-[11%] w-[5px] rounded-r bg-outline"></span>
          <div class="bg-outline rounded-[44px] p-[9px] shadow-[6px_6px_0_var(--color-moss)] ring-[3px] ring-outline">
            <div class="relative aspect-[1320/2868] rounded-[36px] overflow-hidden bg-black">
              <!-- Tap to see the screenshot full size -->
              <button type="button" class="block size-full cursor-zoom-in p-0 border-0 bg-transparent" @click="zoom(s.image)">
                <img :src="s.image.src" :alt="s.image.alt ?? ''" loading="lazy" class="block size-full object-cover object-top" />
                <span class="sr-only">Enlarge this screenshot</span>
              </button>
              <span aria-hidden="true" class="absolute top-[1.6%] left-1/2 -translate-x-1/2 w-[32%] h-[3.4%] rounded-full bg-black"></span>
            </div>
          </div>
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

    <!-- Full-size view. <dialog> handles Escape, focus and the dimmed backdrop for us. -->
    <dialog
      ref="dialogEl"
      class="m-auto p-0 bg-transparent border-0 max-w-[92vw] max-h-[92vh] overflow-visible backdrop:bg-outline/80"
      @click.self="close"
    >
      <div v-if="zoomed" class="relative">
        <img :src="zoomed.src" :alt="zoomed.alt ?? ''" class="block max-h-[88vh] max-w-[92vw] w-auto h-auto rounded-[28px] border-[3px] border-outline shadow-[6px_6px_0_var(--color-moss)]" />
        <button
          type="button"
          class="absolute -top-4 -right-4 size-11 rounded-full bg-wattle border-[3px] border-outline font-grotesk font-extrabold text-xl cursor-pointer shadow-[3px_3px_0_var(--color-outline)]"
          @click="close"
        ><span aria-hidden="true">✕</span><span class="sr-only">Close</span></button>
      </div>
    </dialog>
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

const dialogEl = ref<HTMLDialogElement | null>(null)
const zoomed = ref<{ src?: string; alt?: string } | null>(null)
function zoom(img: { src?: string; alt?: string }) {
  zoomed.value = img
  dialogEl.value?.showModal()
}
function close() {
  dialogEl.value?.close()
}
</script>
