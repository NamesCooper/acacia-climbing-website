<template>
  <section id="about" class="max-w-[1240px] mx-auto px-6 pt-22 scroll-mt-6">
    <div class="relative bg-sandstone border-[3px] border-outline rounded-[32px] overflow-hidden shadow-[8px_8px_0_var(--color-outline)]">
      <div aria-hidden="true" class="halftone absolute -right-20 -bottom-20 size-[420px] rounded-full hidden lg:block" style="--dot: var(--color-sandstone-deep)"></div>

      <div class="relative px-6 py-12 sm:px-14 sm:py-16 flex flex-wrap gap-10 items-center">
        <div class="flex-[999_1_480px] min-w-0">
          <!-- Tabs: arrow keys move between them, as screen readers expect -->
          <div role="tablist" aria-label="About ACC" class="flex flex-wrap gap-2.5" @keydown="onKey">
            <button
              v-for="(t, i) in tabs"
              :id="'about-tab-' + i"
              :key="i"
              ref="tabRefs"
              type="button"
              role="tab"
              :aria-selected="active === i"
              :aria-controls="'about-panel-' + i"
              :tabindex="active === i ? 0 : -1"
              class="font-grotesk font-extrabold text-base border-[3px] border-outline rounded-full px-5 py-2.5 cursor-pointer"
              :class="active === i
                ? 'bg-outline text-paper shadow-[3px_3px_0_var(--color-moss)]'
                : 'bg-paper-light text-outline shadow-[3px_3px_0_var(--color-outline)]'"
              @click="active = i"
            >{{ t.label }}</button>
          </div>

          <div
            v-for="(t, i) in tabs"
            v-show="active === i"
            :id="'about-panel-' + i"
            :key="i"
            role="tabpanel"
            :aria-labelledby="'about-tab-' + i"
          >
            <h2 class="mt-7 mb-0 font-display text-[clamp(44px,6vw,72px)] leading-[0.92] tracking-[-0.02em]">{{ t.heading }}</h2>
            <!-- Rich text from the Studio: bold words come through as <strong> -->
            <div class="mt-4 max-w-[560px] text-lg leading-relaxed [&_p]:m-0 [&_p+p]:mt-3">
              <PortableText :value="t.body ?? []" />
            </div>
          </div>
        </div>

        <!-- Spot for the mascot once it's ready. Only on wide screens for now: on phones and
             tablets it sat under the text as an empty-looking box. -->
        <div class="hidden lg:flex flex-[1_1_240px] justify-center">
          <div class="w-[180px] h-[200px] sm:w-[240px] sm:h-[280px] bg-paper border-[3px] border-outline rounded-3xl flex items-center justify-center">
            <img src="/brand/sprig-green.png" alt="" class="anim-bob w-[100px] sm:w-[140px] h-auto" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'

const props = defineProps<{ tabs: { label: string; heading: string; body?: any[] }[] }>()

// `ref` makes a value reactive: when it changes, the template re-renders.
const active = ref(0)
const tabRefs = ref<HTMLButtonElement[]>([])


function onKey(e: KeyboardEvent) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  const dir = e.key === 'ArrowRight' ? 1 : -1
  active.value = (active.value + dir + props.tabs.length) % props.tabs.length
  tabRefs.value[active.value]?.focus()
}
</script>
