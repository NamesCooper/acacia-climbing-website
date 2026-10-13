<template>
  <!-- Full-screen map under the nav. On desktop the panel floats over the map's left side;
       on phones the map comes first and the panel follows underneath. -->
  <section class="relative lg:h-[calc(100svh-97px)] lg:min-h-[620px] border-y-[3px] border-outline bg-paper">
    <!-- MAP -->
    <div class="relative h-[62svh] min-h-[360px] lg:absolute lg:inset-0 lg:h-auto">
      <div ref="mapEl" class="absolute inset-0" role="application" aria-label="Map of crags across Australia" />
      <!-- legend -->
      <div class="absolute right-3 bottom-3 sm:right-5 sm:bottom-5 z-[500] bg-paper-light border-[3px] border-outline rounded-2xl px-2.5 py-2 sm:px-3.5 sm:py-2.5 shadow-[3px_3px_0_var(--color-outline)]">
        <ul class="list-none p-0 m-0 flex flex-col gap-1 sm:gap-1.5 text-[11px] sm:text-[13px] font-bold">
          <li v-for="s in legend" :key="s" class="flex items-center gap-2">
            <span class="size-3 sm:size-3.5 rounded-full border-2 border-outline" :style="{ background: statusColour(s) }" />
            {{ statusLabel(s) }}
          </li>
        </ul>
      </div>
    </div>

    <div class="px-4 py-6 sm:px-6 lg:p-0">
        <!-- PANEL -->
        <section ref="panelEl" aria-label="Crag details" class="relative z-[600] bg-paper-light border-[3px] border-outline rounded-[28px] shadow-[6px_6px_0_var(--color-outline)] flex flex-col overflow-hidden scroll-mt-4 lg:absolute lg:left-6 lg:top-6 lg:bottom-6 lg:w-[400px]">
          <!-- Title bar, always on top of the panel -->
          <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b-[3px] border-outline bg-wattle">
            <p class="m-0 font-grotesk font-extrabold text-xs uppercase tracking-[0.08em]">The crag map</p>
            <h1 class="mt-1 mb-0 font-display text-[40px] leading-[0.95]">Where it's at</h1>
          </div>
          <!-- back: home from the top level, then up a level once you've zoomed in -->
          <NuxtLink
            v-if="view === 'australia'"
            to="/"
            class="flex-shrink-0 block no-underline text-outline px-6 py-3 border-b-[3px] border-outline bg-sandstone font-grotesk font-extrabold text-sm uppercase tracking-[0.06em] hover:bg-wattle"
          >← Back to home</NuxtLink>
          <button
            v-else
            type="button"
            class="flex-shrink-0 text-left px-6 py-3 border-0 border-b-[3px] border-outline bg-sandstone font-grotesk font-extrabold text-sm uppercase tracking-[0.06em] cursor-pointer hover:bg-wattle"
            @click="goBack"
          >← {{ view === 'crag' ? currentState?.name ?? 'Back' : 'All of Australia' }}</button>

          <div class="flex-1 overflow-y-auto">
            <!-- AUSTRALIA -->
            <div v-if="view === 'australia'" class="p-6">
              <h2 class="m-0 font-grotesk font-extrabold text-2xl uppercase tracking-[-0.01em]">Pick a state</h2>
              <p class="mt-2 mb-4 text-[15px] leading-relaxed">Every crag we're working on, and how far along it is. We're starting in South East Queensland, with the rest of Australia to come. Tap a state to have a look.</p>
              <ul class="list-none p-0 m-0 flex flex-col gap-2.5">
                <li v-for="s in STATES" :key="s.id">
                  <button
                    type="button"
                    class="w-full flex items-center justify-between gap-3 text-left bg-paper border-[3px] border-outline rounded-2xl px-4 py-3 cursor-pointer hover:bg-wattle transition-colors"
                    @click="selectState(s.id)"
                  >
                    <span class="font-grotesk font-extrabold text-lg">{{ s.name }}</span>
                    <span
                      class="flex-shrink-0 border-2 rounded-full px-2.5 py-0.5 text-[12px] font-bold"
                      :class="cragsIn(s.id).length ? 'bg-moss text-paper border-forest' : 'bg-paper-light border-forest border-dashed'"
                    >{{ cragsIn(s.id).length ? cragsIn(s.id).length + ' crags' : 'Coming soon' }}</span>
                  </button>
                </li>
              </ul>
            </div>

            <!-- STATE -->
            <div v-else-if="view === 'state'" class="p-6">
              <h2 class="m-0 font-grotesk font-extrabold text-2xl uppercase tracking-[-0.01em]">{{ currentState?.name }}</h2>
              <p class="mt-2 mb-4 text-[15px] leading-relaxed">{{ stateCrags.length }} crags so far. Pick one to see how it's going.</p>
              <ul class="list-none p-0 m-0 flex flex-col gap-3">
                <li v-for="c in stateCrags" :key="c.id">
                  <button
                    type="button"
                    class="w-full text-left bg-paper border-[3px] border-outline rounded-2xl px-4 py-3.5 cursor-pointer hover:bg-wattle/40 transition-colors"
                    @click="selectCrag(c.id)"
                  >
                    <span class="flex items-start justify-between gap-2">
                      <span class="font-grotesk font-extrabold text-xl leading-tight">{{ c.name }}</span>
                      <span class="flex-shrink-0 border-2 rounded-full px-2.5 py-0.5 text-[12px] font-bold" :class="statusChip(c.status)">{{ statusLabel(c.status) }}</span>
                    </span>
                    <span class="block mt-1 text-sm">{{ c.council }}</span>
                    <span class="block mt-2.5 h-3 border-2 border-outline rounded-full bg-paper-light overflow-hidden">
                      <span class="block h-full bg-moss" :style="{ width: progressOf(c.id).pct + '%' }" />
                    </span>
                    <span class="block mt-1.5 text-[13px] font-bold">{{ progressOf(c.id).done }} of {{ progressOf(c.id).total }} steps done</span>
                  </button>
                </li>
              </ul>
            </div>

            <!-- COMING SOON -->
            <div v-else-if="view === 'coming-soon'" class="p-6">
              <h2 class="m-0 font-display text-[44px] leading-[0.95]">{{ currentState?.name }}</h2>
              <p class="mt-4 mb-0 text-[16px] leading-relaxed">
                We're starting in South East Queensland and want to reach every state. Climbing in {{ currentState?.name }}?
                We'd love to hear about your local crags, any access worries, and who's already looking after them.
              </p>
              <NuxtLink
                :to="{ path: '/get-involved', query: { help: 'telling-us-about-your-local', crag: currentState?.name }, hash: '#sign-up' }"
                class="nudge inline-block mt-6 no-underline bg-wattle border-[3px] border-outline rounded-full px-5 py-2.5 font-grotesk font-extrabold shadow-[4px_4px_0_var(--color-outline)]"
              >Tell us about your local</NuxtLink>
            </div>

            <!-- CRAG -->
            <div v-else-if="view === 'crag' && currentCrag" class="p-6">
              <span class="inline-block border-2 rounded-full px-3 py-1 text-[13px] font-bold" :class="statusChip(currentCrag.status)">{{ statusLabel(currentCrag.status) }}</span>
              <h2 class="mt-3 mb-0 font-display text-[42px] leading-[0.95]">{{ currentCrag.name }}</h2>
              <p class="mt-1.5 mb-0 text-sm">{{ currentCrag.subtitle }}</p>

              <div class="grid grid-cols-2 gap-3 mt-5">
                <div class="bg-sandstone border-[3px] border-outline rounded-2xl px-3.5 py-3">
                  <p class="m-0 font-grotesk font-extrabold text-[28px] leading-none">{{ currentCrag.problems || 'TBC' }}</p>
                  <p class="m-0 mt-1 text-[12px] font-bold uppercase tracking-[0.06em]">Problems</p>
                </div>
                <div class="bg-lichen border-[3px] border-outline rounded-2xl px-3.5 py-3">
                  <p class="m-0 font-grotesk font-extrabold text-[28px] leading-none">{{ progressOf(currentCrag.id).done }}/{{ progressOf(currentCrag.id).total }}</p>
                  <p class="m-0 mt-1 text-[12px] font-bold uppercase tracking-[0.06em]">Steps done</p>
                </div>
              </div>

              <p v-if="currentCrag.description" class="mt-5 mb-0 text-[15px] leading-relaxed">{{ currentCrag.description }}</p>

              <h3 class="mt-6 mb-2 font-grotesk font-extrabold text-sm uppercase tracking-[0.06em]">The access pathway</h3>
              <ol class="list-none p-0 m-0 flex flex-col gap-2">
                <li v-for="m in cragMilestones" :key="m.text" class="flex items-start gap-2.5 text-[14px] leading-snug">
                  <span
                    class="flex-shrink-0 mt-0.5 size-5 rounded-full border-2 border-outline flex items-center justify-center text-[11px] font-bold"
                    :class="m.status === 'done' ? 'bg-moss text-paper' : m.status === 'progress' ? 'bg-wattle' : 'bg-paper-light border-dashed'"
                    :aria-label="m.status === 'done' ? 'Done' : m.status === 'progress' ? 'In progress' : 'To do'"
                  >{{ m.status === 'done' ? '✓' : m.status === 'progress' ? '…' : '' }}</span>
                  <span :class="m.status === 'todo' ? 'opacity-60' : ''">{{ m.text }}</span>
                </li>
              </ol>

              <dl class="mt-6 mb-0 border-[3px] border-outline rounded-2xl overflow-hidden text-[14px]">
                <div v-for="[k, v] in details" :key="k" class="flex justify-between gap-3 px-3.5 py-2 border-b-2 border-outline/15 last:border-b-0">
                  <dt class="font-bold">{{ k }}</dt>
                  <dd class="m-0 text-right">{{ v || 'TBC' }}</dd>
                </div>
              </dl>

              <div class="flex flex-wrap gap-3 mt-5">
                <a
                  v-if="currentCrag.kayaUrl"
                  :href="currentCrag.kayaUrl"
                  target="_blank"
                  rel="noopener"
                  class="nudge no-underline bg-wattle border-[3px] border-outline rounded-full px-4 py-2 font-grotesk font-extrabold text-sm shadow-[3px_3px_0_var(--color-outline)]"
                >Guidebook on KAYA ↗</a>
                <NuxtLink
                  :to="{ path: '/contact', query: { topic: 'crag-report', crag: currentCrag.name } }"
                  class="nudge no-underline bg-paper border-[3px] border-outline rounded-full px-4 py-2 font-grotesk font-extrabold text-sm shadow-[3px_3px_0_var(--color-outline)]"
                >Report something here</NuxtLink>
              </div>
              <p class="mt-4 mb-0 text-[12px] opacity-70">Last updated {{ formatDate(currentCrag.updatedAt) }}. Always check signage and local access info before you climb.</p>
            </div>
          </div>
        </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Map as LeafletMap, LayerGroup, Layer, Marker } from 'leaflet'
import type { Crag } from '~/composables/useCragData'

definePageMeta({ prefooter: false })

usePageSeo({
  title: () => "Crag map · Acacia Climbing Coalition",
  description: () => 'Access progress for every crag Acacia Climbing Coalition is working on, starting in South East Queensland.',
})

// Crag, milestone and area data, baked in at build time (see composables/useCragData.ts)
const { data: cragData } = await useCragData()

interface StateConfig { id: string; name: string; center: [number, number]; zoom: number }
const STATES: StateConfig[] = [
  { id: 'QLD', name: 'Queensland', center: [-27.5, 152.6], zoom: 8 },
  { id: 'NSW', name: 'New South Wales', center: [-32.5, 147.0], zoom: 6 },
  { id: 'VIC', name: 'Victoria', center: [-37.0, 144.5], zoom: 7 },
  { id: 'TAS', name: 'Tasmania', center: [-42.0, 146.5], zoom: 7 },
  { id: 'SA', name: 'South Australia', center: [-30.0, 135.5], zoom: 6 },
  { id: 'WA', name: 'Western Australia', center: [-26.0, 121.0], zoom: 5 },
  { id: 'NT', name: 'Northern Territory', center: [-19.5, 133.0], zoom: 6 },
  { id: 'ACT', name: 'ACT', center: [-35.5, 149.0], zoom: 9 },
]
const STATE_NAME_MAP: Record<string, string> = {
  'Queensland': 'QLD', 'New South Wales': 'NSW', 'Victoria': 'VIC', 'South Australia': 'SA',
  'Western Australia': 'WA', 'Tasmania': 'TAS', 'Northern Territory': 'NT', 'Australian Capital Territory': 'ACT',
}
// "Access issue" only shows in the key when a crag actually has it
const legend = computed(() => STATUS_ORDER.filter((s) => s !== 'issue' || cragData.value.crags.some((c) => c.status === 'issue')))

// ── State for the panel ──
const view = ref<'australia' | 'state' | 'coming-soon' | 'crag'>('australia')
const currentState = ref<StateConfig | null>(null)
const currentCrag = ref<Crag | null>(null)
const mapEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)

const crags = computed(() => cragData.value.crags)
const cragsIn = (stateId: string) => crags.value.filter((c) => c.state === stateId)
const stateCrags = computed(() => (currentState.value ? cragsIn(currentState.value.id) : []))
const cragMilestones = computed(() => cragData.value.milestones.filter((m) => m.crag_id === currentCrag.value?.id))

function progressOf(id: string) {
  const steps = cragData.value.milestones.filter((m) => m.crag_id === id)
  const done = steps.filter((m) => m.status === 'done').length
  const total = steps.length || 8
  return { done, total, pct: Math.round((done / total) * 100) }
}

const details = computed(() => {
  const c = currentCrag.value
  if (!c) return []
  return [['Land manager', c.council], ['Rock', c.style], ['Season', c.season], ['Status', c.councilStatus]] as [string, string | undefined][]
})

function formatDate(iso?: string) {
  if (!iso) return 'recently'
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ── Leaflet (browser only, not reactive) ──
let L: typeof import('leaflet') | null = null
let map: LeafletMap | null = null
let pinLayer: LayerGroup | null = null
let areaLayer: Layer | null = null
const pins: Record<string, Marker> = {}
const statePolys: Record<string, any> = {}

const AUSTRALIA: [[number, number], [number, number]] = [[-44, 112], [-10, 154]]

function pinIcon(c: Crag, active = false) {
  // At least 24px so they're easy to tap (WCAG 2.2 target size)
  const size = active ? 34 : 26
  return L!.divIcon({
    className: '',
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:999px;background:${statusColour(c.status)};border:3px solid #1E1A16;box-shadow:3px 3px 0 #1E1A16;${c.status === 'scoping' ? 'border-style:dashed;' : ''}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function styleStates() {
  Object.entries(statePolys).forEach(([id, poly]) => {
    const has = cragsIn(id).length > 0
    const selected = currentState.value?.id === id
    poly.setStyle({
      color: '#1E1A16',
      weight: selected ? 3 : 1.5,
      opacity: selected ? 1 : 0.5,
      fillColor: has ? '#A9B97E' : '#D8C29A',
      fillOpacity: selected ? 0.35 : has ? 0.25 : 0.12,
    })
  })
}

function clearArea() {
  if (areaLayer && map) { map.removeLayer(areaLayer); areaLayer = null }
}
function showArea(c: Crag) {
  clearArea()
  const feature = cragData.value.areas.features.find((f: any) => f.properties?.crag_id === c.id)
  if (!feature || !L || !map) return
  areaLayer = L.geoJSON(feature, {
    style: { color: '#1E1A16', weight: 2.5, dashArray: '6 5', fillColor: '#EFC248', fillOpacity: 0.3 },
  }).addTo(map)
}
function highlightPin(id: string | null) {
  crags.value.forEach((c) => pins[c.id]?.setIcon(pinIcon(c, c.id === id)))
}

// On phones the panel sits under the map, so bring it into view after a tap
function revealPanel() {
  if (window.innerWidth < 1024) panelEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function goAustralia() {
  view.value = 'australia'
  currentState.value = null
  currentCrag.value = null
  clearArea()
  highlightPin(null)
  styleStates()
  map?.flyToBounds(AUSTRALIA, { duration: 0.8, paddingTopLeft: [window.innerWidth >= 1024 ? 430 : 0, 0] })
}

function selectState(id: string) {
  const s = STATES.find((x) => x.id === id)
  if (!s) return
  currentState.value = s
  currentCrag.value = null
  clearArea()
  highlightPin(null)
  view.value = cragsIn(id).length ? 'state' : 'coming-soon'
  styleStates()
  map?.flyTo(s.center, s.zoom, { duration: 0.8 })
}

function selectCrag(id: string) {
  const c = crags.value.find((x) => x.id === id)
  if (!c) return
  if (currentState.value?.id !== c.state) currentState.value = STATES.find((s) => s.id === c.state) ?? null
  currentCrag.value = c
  view.value = 'crag'
  styleStates()
  highlightPin(id)
  showArea(c)
  map?.flyTo([c.lat, c.lng], 13, { duration: 0.8 })
  revealPanel()
}

function goBack() {
  if (view.value === 'crag' && currentState.value) selectState(currentState.value.id)
  else goAustralia()
}

onMounted(async () => {
  L = (await import('leaflet')).default as typeof import('leaflet')
  await import('leaflet/dist/leaflet.css')
  if (!mapEl.value) return

  map = L.map(mapEl.value, { zoomControl: false, minZoom: 3, zoomSnap: 0.25 })
  L.control.zoom({ position: 'topright' }).addTo(map)
  // Map tiles. CARTO needs a free key (since Sept 2026), set as NUXT_PUBLIC_CARTO_KEY in Cloudflare's
  // build settings. Without one we fall back to OpenStreetMap's own tiles so the map is never blank.
  const { cartoKey } = useRuntimeConfig().public
  const OSM = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  const tiles = cartoKey
    ? L.tileLayer(`https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${cartoKey}`, {
        maxZoom: 19,
        attribution: `${OSM} &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      })
    : L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: OSM })
  tiles.addTo(map)
  // Leave room for the floating panel on desktop
  map.fitBounds(AUSTRALIA, { paddingTopLeft: [window.innerWidth >= 1024 ? 430 : 0, 0] })

  try {
    const geo = await fetch('/states.geojson').then((r) => r.json())
    L.geoJSON(geo, {
      onEachFeature: (feature: any, layer: any) => {
        const name = feature.properties.STATE_NAME ?? feature.properties.name ?? feature.properties.NAME
        const id = STATE_NAME_MAP[name]
        if (!id) return
        statePolys[id] = layer
        layer.on('click', () => selectState(id))
      },
    }).addTo(map)
    styleStates()
  } catch (e) {
    console.warn('states.geojson not loaded', e)
  }

  pinLayer = L.layerGroup().addTo(map)
  crags.value.forEach((c) => {
    const pin = L!.marker([c.lat, c.lng], { icon: pinIcon(c), title: c.name, keyboard: true })
    pin.bindTooltip(c.name, { direction: 'top', offset: [0, -12] })
    pin.on('click', () => selectCrag(c.id))
    pin.addTo(pinLayer!)
    pins[c.id] = pin
  })
})

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<style>
/* Leaflet bits that Tailwind can't reach */
.leaflet-container { font-family: var(--font-sans); background: var(--color-paper); }
/* Warm the map tiles towards the paper colour so they sit in the poster palette */
.leaflet-tile-pane { filter: sepia(0.28) saturate(0.85) brightness(1.02); }
.leaflet-tooltip {
  font-family: var(--font-grotesk);
  font-weight: 800;
  border: 3px solid var(--color-outline);
  border-radius: 999px;
  box-shadow: 3px 3px 0 var(--color-outline);
  padding: 4px 12px;
}
.leaflet-tooltip-top::before { display: none; }
.leaflet-bar { border: 3px solid var(--color-outline) !important; border-radius: 14px !important; overflow: hidden; box-shadow: 3px 3px 0 var(--color-outline); }
.leaflet-bar a { color: var(--color-outline) !important; background: var(--color-paper-light) !important; font-weight: 800; }
</style>
