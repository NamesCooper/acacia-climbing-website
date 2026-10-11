<template>
  <!-- The newest updates from the Updates section, so a page feels alive without extra work -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <div class="flex flex-wrap justify-between items-end gap-4">
      <UiSectionTitle :title="title || 'Latest updates'" :lead="lead" />
      <NuxtLink to="/updates" class="font-grotesk font-bold text-lg text-forest">All updates →</NuxtLink>
    </div>

    <ul v-if="latest.length" class="list-none p-0 m-0 mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <li v-for="u in latest" :key="u.slug">
        <NuxtLink :to="`/updates#${u.slug}`" class="group block h-full no-underline text-outline">
          <UiCard size="md" class="h-full transition-transform group-hover:-translate-y-1">
            <UiChip tone="wattle">{{ formatDate(u.date) }}</UiChip>
            <h3 class="mt-4 mb-0 font-display text-[28px] leading-[1.05]">{{ u.title }}</h3>
            <p v-if="u.summary" class="mt-3 mb-0 text-[16px] leading-relaxed">{{ u.summary }}</p>
          </UiCard>
        </NuxtLink>
      </li>
    </ul>

    <!-- Honest empty state until the first update is posted -->
    <UiCard v-else size="md" tone="sandstone" class="mt-9">
      <p class="m-0 font-display text-[28px] leading-[1.05]">First updates coming soon</p>
      <p class="mt-2 mb-0 text-[16px] leading-relaxed">News from the crags will show up here as it happens.</p>
    </UiCard>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ title?: string; lead?: string; count?: number }>(), { count: 3 })
const { data: updates } = await useUpdates()
const latest = computed(() => (updates.value ?? []).slice(0, props.count))

function formatDate(iso?: string) {
  return iso ? new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
}
</script>
