<template>
  <!-- A YouTube or Vimeo video in a poster frame. Nothing loads from YouTube/Vimeo until someone
       presses play, which keeps the page fast and avoids their cookies until then. -->
  <section class="max-w-[1100px] mx-auto px-6 py-10 sm:py-14">
    <UiSectionTitle v-if="title" :title="title" :lead="lead" />
    <figure class="m-0" :class="title ? 'mt-8' : ''">
      <div class="relative aspect-video bg-forest border-[3px] border-outline rounded-[28px] overflow-hidden shadow-[8px_8px_0_var(--color-outline)]">
        <iframe
          v-if="playing && embed"
          :src="embed.src"
          :title="caption || title || 'Video'"
          class="absolute inset-0 size-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowfullscreen
        />
        <button
          v-else
          type="button"
          class="group absolute inset-0 w-full cursor-pointer border-0 p-0 bg-forest"
          :aria-label="`Play video${caption ? ': ' + caption : ''}`"
          @click="playing = true"
        >
          <img v-if="embed?.poster" :src="embed.poster" alt="" class="absolute inset-0 size-full object-cover opacity-85" loading="lazy" />
          <div v-else aria-hidden="true" class="halftone absolute -right-20 -bottom-20 size-80 rounded-full opacity-60" style="--dot: var(--color-moss)"></div>
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-20 sm:size-24 rounded-full bg-wattle border-[3px] border-outline shadow-[5px_5px_0_var(--color-outline)] flex items-center justify-center transition-transform group-hover:scale-105">
            <span class="ml-1.5 border-y-[14px] border-y-transparent border-l-[22px] border-l-outline"></span>
          </span>
        </button>
      </div>
      <figcaption v-if="caption" class="mt-4 text-sm opacity-80">{{ caption }}</figcaption>
    </figure>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ title?: string; lead?: string; url?: string; caption?: string }>()
const playing = ref(false)

// Turns a normal YouTube or Vimeo link into an embed link (and a YouTube thumbnail)
const embed = computed(() => {
  const url = props.url ?? ''
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return { src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`, poster: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg` }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return { src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1`, poster: undefined }
  return null
})
</script>
