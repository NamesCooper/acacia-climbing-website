<template>
  <footer class="bg-forest text-paper border-t-2 border-paper/20 px-6 pt-12 pb-8">
    <div class="max-w-[1240px] mx-auto">
      <div class="flex flex-wrap justify-between items-start gap-10">
        <div class="max-w-[360px]">
          <UiWordmark :size="40" />
          <p class="mt-4 mb-0 font-poster text-2xl leading-snug">Made by climbers, for the places we love</p>
        </div>
        <nav aria-label="Footer" class="flex flex-wrap gap-x-14 gap-y-8">
          <div v-for="col in columns" :key="col.heading">
            <p class="m-0 mb-3 font-grotesk font-extrabold text-sm uppercase tracking-[0.08em] text-wattle">{{ col.heading }}</p>
            <ul class="list-none p-0 m-0 flex flex-col gap-2">
              <li v-for="link in col.links" :key="link.label">
                <a v-if="link.href" :href="link.href" class="text-paper/85 hover:text-wattle no-underline">{{ link.label }}</a>
                <NuxtLink v-else :to="link.to!" class="text-paper/85 hover:text-wattle no-underline">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="mt-12 pt-5 border-t border-paper/20 flex flex-wrap justify-between gap-3 text-[13px] text-paper/70">
        <span>© {{ year }} Acacia Climbing Pty Ltd · ABN 38 237 542 815</span>
        <span>For climbers across Australia · Starting in SEQ · Guidebooks on KAYA</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const columns: { heading: string; links: { label: string; to?: string; href?: string }[] }[] = [
  {
    heading: 'Explore',
    links: [
      { label: 'The crag map', to: '/progress' },
      { label: 'Updates', to: '/updates' },
      { label: 'About us', to: '/about' },
    ],
  },
  {
    heading: 'Help out',
    links: [
      { label: 'Ways to help', to: '/get-involved' },
      { label: 'Report a crag issue', href: 'mailto:hello@acaciaclimbing.org?subject=Crag%20report' },
      { label: 'Donate', to: '/get-involved#donate' },
    ],
  },
  {
    heading: 'Say g\'day',
    links: [
      { label: 'hello@acaciaclimbing.org', href: 'mailto:hello@acaciaclimbing.org' },
      { label: 'Privacy and terms', to: '/privacy' },
    ],
  },
]
</script>
