<template>
  <div v-if="crag">
    <SitePageHeader :eyebrow="crag.subtitle || crag.council" :title="crag.name" :lede="crag.councilStatus">
      <span class="inline-block mt-6 border-2 rounded-full px-3 py-1 text-[13px] font-bold" :class="statusChip(crag.status)">{{ statusLabel(crag.status) }}</span>
    </SitePageHeader>

    <section class="max-w-[1240px] mx-auto px-6 pb-20 grid gap-10 lg:grid-cols-[1fr_380px] items-start">
      <!-- The story and the access pathway -->
      <div>
        <template v-if="crag.description">
          <h2 class="m-0 font-grotesk font-extrabold uppercase text-forest text-[clamp(30px,5vw,44px)] leading-[0.95] tracking-[-0.02em]">Where it's at</h2>
          <p class="mt-5 mb-0 text-lg leading-relaxed max-w-[680px]">{{ crag.description }}</p>
        </template>

        <template v-if="steps.length">
          <h2 class="mt-12 mb-0 font-grotesk font-extrabold uppercase text-forest text-[clamp(30px,5vw,44px)] leading-[0.95] tracking-[-0.02em]">The access pathway</h2>
          <p class="mt-3 mb-0">{{ done }} of {{ steps.length }} steps done.</p>
          <ol class="list-none p-0 m-0 mt-5 flex flex-col gap-3 max-w-[680px]">
            <li v-for="m in steps" :key="m.text" class="flex items-start gap-3 text-[16px] leading-snug">
              <span
                class="flex-shrink-0 mt-0.5 size-6 rounded-full border-2 border-outline flex items-center justify-center text-[12px] font-bold"
                :class="m.status === 'done' ? 'bg-moss text-paper' : m.status === 'progress' ? 'bg-wattle' : 'bg-paper-light border-dashed'"
                aria-hidden="true"
              >{{ m.status === 'done' ? '✓' : m.status === 'progress' ? '…' : '' }}</span>
              <span :class="m.status === 'todo' ? 'opacity-70' : ''">
                <span class="sr-only">{{ m.status === 'done' ? 'Done: ' : m.status === 'progress' ? 'In progress: ' : 'To do: ' }}</span>{{ m.text }}
              </span>
            </li>
          </ol>
        </template>
      </div>

      <!-- Quick facts and what you can do -->
      <div class="lg:sticky lg:top-6">
        <UiCard>
          <dl class="m-0 text-[15px]">
            <div v-for="[k, v] in facts" :key="k" class="flex justify-between gap-4 py-2.5 border-b-2 border-outline/15 last:border-b-0">
              <dt class="font-bold">{{ k }}</dt>
              <dd class="m-0 text-right">{{ v }}</dd>
            </div>
          </dl>
          <div class="mt-6 flex flex-col gap-3">
            <UiButton v-if="crag.kayaUrl" :href="crag.kayaUrl">Guidebook on KAYA ↗<span class="sr-only"> (opens in a new tab)</span></UiButton>
            <UiButton :to="`/progress?crag=${crag.id}`" variant="paper">See it on the map</UiButton>
            <UiButton :to="`/get-involved?crag=${encodeURIComponent(crag.name)}#sign-up`" variant="moss">Help out here</UiButton>
            <UiButton :to="`/contact?topic=crag-report&crag=${encodeURIComponent(crag.name)}`" variant="paper">Report something here</UiButton>
          </div>
        </UiCard>
        <p class="mt-4 mb-0 text-[13px] opacity-80">Last updated {{ updated }}. Always check signs and the land manager's website before you climb.</p>
      </div>
    </section>

    <!-- A nudge for people heading out for the first time -->
    <section class="bg-sandstone border-y-[3px] border-outline">
      <div class="max-w-[1240px] mx-auto px-6 py-14 flex flex-wrap items-center justify-between gap-6">
        <div class="max-w-[640px]">
          <p class="m-0 font-poster text-[22px]">Never climbed outside before?</p>
          <h2 class="mt-1 mb-0 font-display text-[clamp(32px,5vw,48px)] leading-[0.95]">Start with the basics</h2>
          <p class="mt-3 mb-0">What to bring, what's different from the gym, and how to look after the place.</p>
        </div>
        <UiButton to="/first-time-outside" variant="paper">First time outside</UiButton>
      </div>
    </section>

    <!-- The other crags, so every crag page links to the rest (and Google finds them all) -->
    <section v-if="others.length" class="max-w-[1240px] mx-auto px-6 py-16">
      <h2 class="m-0 font-grotesk font-extrabold uppercase text-forest text-[clamp(30px,5vw,44px)] leading-[0.95] tracking-[-0.02em]">More crags</h2>
      <ul class="list-none p-0 m-0 mt-6 flex flex-wrap gap-3">
        <li v-for="c in others" :key="c.id">
          <NuxtLink :to="`/crags/${c.id}`" class="nudge no-underline inline-flex items-center gap-2 bg-paper-light border-[3px] border-outline rounded-full pl-2 pr-4 py-1.5 font-grotesk font-bold shadow-[3px_3px_0_var(--color-outline)]">
            <span class="inline-block size-4 rounded-full border-2 border-outline" :class="c.status === 'scoping' ? 'border-dashed' : ''" :style="{ background: statusColour(c.status) }" aria-hidden="true"></span>
            {{ c.name }}<span class="sr-only">, {{ statusLabel(c.status) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
// One page per crag, e.g. /crags/tooheys. The `[id]` in the file name makes it a "dynamic route":
// Nuxt reads the id from the address and hands it to us as route.params.id. Every crag in the
// Studio gets a page automatically; nuxt.config.ts lists them so they're all baked in at build time.
const route = useRoute()
const { data } = await useCragData()

const crag = computed(() => data.value.crags.find((c) => c.id === route.params.id))

// An unknown id shows the normal "page not found" screen instead of an empty page
if (!crag.value) throw createError({ statusCode: 404, statusMessage: 'Crag not found', fatal: true })

const steps = computed(() => data.value.milestones.filter((m) => m.crag_id === crag.value?.id))
const done = computed(() => steps.value.filter((m) => m.status === 'done').length)
const others = computed(() => data.value.crags.filter((c) => c.id !== crag.value?.id))

const facts = computed(() => {
  const c = crag.value!
  return ([
    ['Land manager', c.council],
    ['Rock', c.style],
    ['Problems', c.problems],
    ['Season', c.season],
  ] as [string, string | undefined][]).filter(([, v]) => v)
})

const updated = computed(() => {
  const iso = crag.value?.updatedAt
  return iso ? new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }) : 'recently'
})

usePageSeo({
  title: () => `${crag.value?.name} bouldering access · Acacia Climbing Coalition`,
  description: () => {
    const c = crag.value
    if (!c) return undefined
    const more = c.councilStatus ? ` ${c.councilStatus.replace(/\.$/, '')}.` : ''
    return `Where bouldering access at ${c.name} (${c.council}) is up to, and how you can help.${more}`
  },
})
</script>
