<template>
  <div class="h-screen flex flex-col font-sans">
    <LayoutTheNav />
    <div class="progress-root flex-1 min-h-0">

    <!-- ── SIDEBAR ── -->
    <aside class="sidebar bg-parchment border-r border-green/20 flex flex-col overflow-hidden" :class="{ 'sheet-open': mobileTab === 'crags' }">
      <div class="sheet-handle" />

      <!-- Top header -->
      <div class="flex-shrink-0 px-6 pt-6 pb-5 border-b border-green/[18%]">
        <div class="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-green mb-1.5">{{ eyebrow }}</div>
        <div class="font-serif text-[28px] font-semibold text-ink leading-[1.15] tracking-[-0.02em]">{{ title }}</div>
        <p v-if="intro" class="text-[14px] text-ink/55 leading-[1.7] mt-2 mb-0">{{ intro }}</p>
      </div>

      <!-- Back nav -->
      <button
        v-if="showBackNav"
        class="flex-shrink-0 flex items-center gap-2 w-full text-left px-6 py-[11px] border-0 border-b border-green/[18%] bg-transparent cursor-pointer transition-colors duration-150 hover:bg-green/[7%] font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-green"
        @click="goBack"
      >
        ← <span>{{ backLabel }}</span>
      </button>

      <!-- Loading -->
      <div v-if="view === 'loading'" class="flex flex-col items-center justify-center flex-1 gap-2.5">
        <div class="spinner" />
        <div class="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45">Loading progress</div>
      </div>

      <!-- Australia state list -->
      <div v-else-if="view === 'australia'" class="flex-1 overflow-y-auto flex flex-col">
        <button
          v-for="s in STATES"
          :key="s.id"
          class="w-full flex items-center justify-between px-6 py-3.5 border-0 border-b border-green/[12%] bg-transparent cursor-pointer transition-colors duration-150 hover:bg-green/[7%] text-left"
          @click="selectState(s.id)"
        >
          <div class="font-serif text-[20px] font-semibold text-ink tracking-[-0.01em]">{{ s.name }}</div>
          <div class="flex items-center gap-2">
            <span
              class="font-mono text-[8px] font-semibold tracking-[0.14em] uppercase px-2 py-0.5 flex-shrink-0"
              :class="s.active ? 'bg-green/[14%] text-green' : 'bg-ink/[7%] text-ink/40'"
            >{{ s.active ? 'Active' : 'Coming Soon' }}</span>
            <span class="text-base text-ink/30">›</span>
          </div>
        </button>
      </div>

      <!-- State crag list -->
      <div v-else-if="view === 'state'" class="flex-1 overflow-y-auto flex flex-col">
        <button
          v-for="crag in stateCrags"
          :key="crag.id"
          class="w-full block px-6 py-3.5 border-0 border-b border-green/[12%] bg-transparent cursor-pointer transition-colors duration-150 hover:bg-green/[7%] text-left"
          @click="openCragPopup(crag.id)"
        >
          <div class="flex items-start justify-between gap-2 mb-0.5">
            <div class="font-serif text-[18px] font-semibold text-ink tracking-[-0.01em] leading-[1.2]">{{ crag.name }}</div>
            <div
              class="font-mono text-[8px] font-semibold tracking-[0.12em] uppercase px-2 py-0.5 flex-shrink-0 mt-0.5"
              :class="{
                'bg-green/[14%] text-green': crag.status === 'recognised' || crag.status === 'completed',
                'bg-[rgba(200,144,10,0.14)] text-[#9A6D08]': crag.status === 'progress',
                'bg-ink/[7%] text-ink/45': crag.status === 'scoping',
              }"
            >{{ crag.statusLabel }}</div>
          </div>
          <div class="text-[14px] text-ink/50 mb-1.5">{{ crag.council }}</div>
          <div v-if="getDoneCount(crag.id) > 0" class="flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-green flex-shrink-0" />
            <span class="text-[12px] text-ink/50 font-mono tracking-[0.05em]">{{ getDoneCount(crag.id) }} milestone{{ getDoneCount(crag.id) > 1 ? 's' : '' }} complete</span>
          </div>
        </button>
      </div>

      <!-- Coming soon -->
      <div v-else-if="view === 'coming-soon'" class="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center gap-3">
        <div class="font-serif text-[24px] font-semibold text-ink tracking-[-0.02em]">{{ currentState?.name }}</div>
        <div class="text-[13px] text-ink/55 leading-[1.75] max-w-[260px]">ACC is currently focused on Southeast Queensland and plans to expand to {{ currentState?.name }} as the coalition grows.</div>
        <button class="mt-2 bg-transparent text-ink border border-green/40 font-mono text-[9px] tracking-[0.18em] uppercase px-5 py-2.5 cursor-pointer transition-colors duration-150 hover:bg-ink hover:text-cream" @click="goAustralia">← All States</button>
      </div>

      <!-- Crag detail -->
      <div v-else-if="view === 'crag' && currentCrag" class="flex flex-col flex-1 overflow-hidden">
        <div class="detail-content px-6 py-5 flex-1 overflow-y-auto">
          <div
            class="detail-pill inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 mb-2.5"
            :class="`status-${currentCrag.status}`"
          >
            <div class="status-dot" />{{ currentCrag.statusLabel }}
          </div>
          <div class="font-serif text-[28px] font-semibold text-ink mb-1 leading-[1.1] tracking-[-0.025em]">{{ currentCrag.name }}</div>
          <div class="text-[13px] text-ink/50 mb-3.5">{{ currentCrag.subtitle }}</div>

          <div class="grid grid-cols-2 gap-2 mb-4">
            <div class="bg-green/[7%] px-3.5 py-3 border border-green/[15%]">
              <div class="font-serif text-[26px] font-semibold text-green leading-none mb-1">{{ currentCrag.problems || '—' }}</div>
              <div class="font-mono text-[9px] tracking-[0.14em] uppercase text-ink/45">Problems</div>
            </div>
            <div class="bg-green/[7%] px-3.5 py-3 border border-green/[15%]">
              <div class="font-serif text-[26px] font-semibold text-green leading-none mb-1">{{ doneCragCount }}/{{ cragMilestones.length }}</div>
              <div class="font-mono text-[9px] tracking-[0.14em] uppercase text-ink/45">Milestones</div>
            </div>
          </div>

          <div class="mb-4.5">
            <div class="font-mono text-[9px] font-semibold tracking-[0.25em] uppercase text-ink/45 mb-2 pb-1.5 border-b border-green/[15%]">Progress — {{ cragProgress }}%</div>
            <div class="h-[3px] bg-ink/10 overflow-hidden mb-1">
              <div class="progress-bar-fill h-full transition-[width] duration-[400ms]" :class="`status-${currentCrag.status}`" :style="{ width: cragProgress + '%' }" />
            </div>
          </div>

          <div class="mb-4.5">
            <div class="font-mono text-[9px] font-semibold tracking-[0.25em] uppercase text-ink/45 mb-2 pb-1.5 border-b border-green/[15%]">Overview</div>
            <div class="text-[13px] leading-[1.75] text-ink/75">{{ currentCrag.description || 'No description added yet.' }}</div>
          </div>

          <div class="mb-4.5">
            <div class="font-mono text-[9px] font-semibold tracking-[0.25em] uppercase text-ink/45 mb-2 pb-1.5 border-b border-green/[15%]">Milestones</div>
            <ul class="list-none p-0 m-0">
              <li v-for="m in cragMilestones" :key="m.text" class="flex items-start gap-2.5 py-2 border-b border-green/10 last:border-b-0">
                <div class="mdot w-[7px] h-[7px] rounded-full flex-shrink-0 mt-1" :class="`mdot-${m.status}`" />
                <div
                  class="text-[13px] leading-[1.55]"
                  :class="{
                    'text-ink/45 line-through decoration-ink/20': m.status === 'done',
                    'text-ink': m.status === 'progress',
                    'text-ink/40': m.status === 'todo',
                  }"
                >{{ m.text }}</div>
              </li>
            </ul>
          </div>

          <div class="mt-1 border border-green/[15%] overflow-hidden">
            <div class="flex justify-between px-3 py-2 text-[13px] text-ink/70 border-b border-green/10">
              <span class="font-mono text-[10px] font-semibold tracking-[0.1em] uppercase text-ink/40">Council</span>
              <span>{{ currentCrag.council || '—' }}</span>
            </div>
            <div class="flex justify-between px-3 py-2 text-[13px] text-ink/70 border-b border-green/10">
              <span class="font-mono text-[10px] font-semibold tracking-[0.1em] uppercase text-ink/40">Rock</span>
              <span>{{ currentCrag.style || '—' }}</span>
            </div>
            <div class="flex justify-between px-3 py-2 text-[13px] text-ink/70 border-b border-green/10">
              <span class="font-mono text-[10px] font-semibold tracking-[0.1em] uppercase text-ink/40">Season</span>
              <span>{{ currentCrag.season || '—' }}</span>
            </div>
            <div class="flex justify-between px-3 py-2 text-[13px] text-ink/70">
              <span class="font-mono text-[10px] font-semibold tracking-[0.1em] uppercase text-ink/40">Region</span>
              <span>{{ currentCrag.region || '—' }}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- ── MAP ── -->
    <div class="relative h-full">
      <div id="progress-map" class="w-full h-full" />
      <div class="map-legend absolute bottom-7 right-3 z-[1000] bg-parchment border border-green/20 px-4 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
        <div class="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-ink/45 mb-2.5">Status</div>
        <div v-for="[color, label] in legend" :key="label" class="flex items-center gap-2 mb-1.5 last:mb-0">
          <div class="w-3 h-3 rounded-full border-2 border-white/60 shadow-[0_1px_3px_rgba(0,0,0,0.2)] flex-shrink-0" :style="{ background: color }" />
          <div class="text-[12px] text-ink/70">{{ label }}</div>
        </div>
      </div>
    </div>

    <!-- ── MOBILE TAB BAR ── -->
    <div class="mobile-tab-bar">
      <button class="mobile-tab" :class="{ active: mobileTab === 'map' }" @click="mobileTab = 'map'">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
        </svg>
        <span>Map</span>
      </button>
      <button class="mobile-tab" :class="{ active: mobileTab === 'crags' }" @click="mobileTab = 'crags'">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
        <span>Crags</span>
      </button>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import type { Map, LayerGroup, Layer } from 'leaflet'

useHead({ meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }] })

// ── TYPES ──
interface StateConfig { id: string; name: string; active: boolean; center: [number, number]; zoom: number }
interface Crag {
  id: string; name: string; subtitle: string; lat: number; lng: number
  status: 'completed' | 'recognised' | 'progress' | 'scoping'
  statusLabel: string; council: string; description: string
  problems: string; style: string; season: string; state: string; region: string
}
interface Milestone { crag_id: string; text: string; status: 'done' | 'progress' | 'todo' }

// ── CONFIG ──
const STATES: StateConfig[] = [
  { id: 'QLD', name: 'Queensland',        active: true,  center: [-22.0, 145.0], zoom: 6 },
  { id: 'NSW', name: 'New South Wales',   active: false, center: [-32.5, 147.0], zoom: 6 },
  { id: 'VIC', name: 'Victoria',          active: false, center: [-37.0, 144.5], zoom: 7 },
  { id: 'SA',  name: 'South Australia',   active: false, center: [-30.0, 135.5], zoom: 6 },
  { id: 'WA',  name: 'Western Australia', active: false, center: [-26.0, 121.0], zoom: 5 },
  { id: 'TAS', name: 'Tasmania',          active: false, center: [-42.0, 146.5], zoom: 7 },
  { id: 'NT',  name: 'Northern Territory',active: false, center: [-19.5, 133.0], zoom: 6 },
  { id: 'ACT', name: 'ACT',              active: false, center: [-35.5, 149.0], zoom: 9 },
]
const STATUS_COLORS: Record<string, string> = {
  completed: '#2E6B40',
  recognised: '#5AAA3A',
  progress: '#C8900A',
  scoping: '#888780',
}
const STATUS_SIZES: Record<string, number> = {
  completed: 28, recognised: 28, progress: 24, scoping: 20,
}
const STATE_NAME_MAP: Record<string, string> = {
  'Queensland': 'QLD', 'New South Wales': 'NSW', 'Victoria': 'VIC',
  'South Australia': 'SA', 'Western Australia': 'WA', 'Tasmania': 'TAS',
  'Northern Territory': 'NT', 'Australian Capital Territory': 'ACT',
}
const legend: [string, string][] = [
  ['#2E6B40', 'Completed'],
  ['#5AAA3A', 'Council Recognised'],
  ['#C8900A', 'In progress'],
  ['#888780', 'Scoping'],
]

// ── REACTIVE STATE ──
const view = ref<'loading' | 'australia' | 'state' | 'coming-soon' | 'crag'>('loading')
const currentState = ref<StateConfig | null>(null)
const currentCrag = ref<Crag | null>(null)
const mobileTab = ref<'map' | 'crags'>('map')
const allCrags = ref<Crag[]>([])
const allMilestones = ref<Milestone[]>([])

// ── LEAFLET INSTANCES (non-reactive) ──
let L: typeof import('leaflet') | null = null
let map: Map | null = null
let cragMarkerLayer: LayerGroup | null = null
let cragAreaLayer: Layer | null = null
let allAreas: any = null
const cragMarkers: Record<string, any> = {}
const statePolygons: Record<string, any> = {}

// ── COMPUTED ──
const stateCrags = computed(() => allCrags.value.filter(c => c.state === currentState.value?.id))
const cragMilestones = computed(() => allMilestones.value.filter(m => m.crag_id === currentCrag.value?.id))
const doneCragCount = computed(() => cragMilestones.value.filter(m => m.status === 'done').length)
const cragProgress = computed(() =>
  cragMilestones.value.length ? Math.round(doneCragCount.value / cragMilestones.value.length * 100) : 0
)
const eyebrow = computed(() => {
  if (view.value === 'australia') return 'Select a state'
  if (view.value === 'crag') return currentState.value?.name ?? ''
  return currentState.value?.name ?? ''
})
const title = computed(() => {
  if (view.value === 'loading') return ''
  if (view.value === 'australia') return 'Australian Climbing Access'
  if (view.value === 'coming-soon' || view.value === 'crag') return currentCrag.value?.name ?? currentState.value?.name ?? ''
  return `${stateCrags.value.length} Crag${stateCrags.value.length !== 1 ? 's' : ''} · ${currentState.value?.name ?? ''}`
})
const intro = computed(() => {
  if (view.value === 'australia') return "ACC is building access and guidebook infrastructure for Australian bouldering. Select a state to see what's active."
  if (view.value === 'state') return 'Select a crag to view access status, council progress, and guidebook milestones.'
  return ''
})
const showBackNav = computed(() => view.value !== 'australia' && view.value !== 'loading')
const backLabel = computed(() => view.value === 'crag' ? currentState.value?.name ?? 'Back' : 'All States')

// ── HELPERS ──
function getDoneCount(cragId: string) {
  return allMilestones.value.filter(m => m.crag_id === cragId && m.status === 'done').length
}
function goBack() { view.value === 'crag' ? goState() : goAustralia() }

// ── MAP HELPERS ──
function fitAustraliaView(animate: boolean) {
  if (!map) return
  const opts = { padding: [20, 20] as [number, number] }
  if (animate) map.flyToBounds([[-45, 111], [-9, 155]], { ...opts, duration: 1.0 })
  else map.fitBounds([[-45, 111], [-9, 155]], opts)
}
function clearCragArea() {
  if (cragAreaLayer && map) { map.removeLayer(cragAreaLayer); cragAreaLayer = null }
}
function showCragArea(crag: Crag) {
  clearCragArea()
  if (!allAreas || !L || !map) return
  const feature = allAreas.features.find((f: any) => f.properties.crag_id === crag.id)
  if (!feature) return
  const color = STATUS_COLORS[crag.status] ?? STATUS_COLORS.scoping
  cragAreaLayer = L.geoJSON(feature, {
    style: { color, weight: 2, opacity: 0.7, fillColor: color, fillOpacity: 0.12, dashArray: '6 4' },
  }).addTo(map)
}
function markerIcon(crag: Crag, active = false) {
  if (!L) return undefined as any
  const s = STATUS_SIZES[crag.status] ?? 20
  const pulse = crag.status !== 'scoping' ? '<div class="marker-pulse"></div>' : ''
  return L.divIcon({
    className: `status-${crag.status}`,
    html: `<div class="marker-dot${active ? ' active' : ''}" style="width:${s}px;height:${s}px;">${pulse}</div>`,
    iconSize: [s, s], iconAnchor: [s / 2, s / 2], popupAnchor: [0, -(s / 2) - 6],
  })
}

// ── NAVIGATION ──
function goAustralia() {
  currentState.value = null
  currentCrag.value = null
  clearCragArea()
  view.value = 'australia'
  if (!map || !cragMarkerLayer) return
  fitAustraliaView(true)
  if (map.hasLayer(cragMarkerLayer)) map.removeLayer(cragMarkerLayer)
  STATES.forEach(s => {
    const p = statePolygons[s.id]
    if (p) p.setStyle({ fillOpacity: s.active ? 0.10 : 0.28, weight: s.active ? 2.5 : 2.0, opacity: s.active ? 0.8 : 0.85 })
  })
}

function selectState(stateId: string) {
  const state = STATES.find(s => s.id === stateId)
  if (!state || !map || !cragMarkerLayer) return
  currentState.value = state
  currentCrag.value = null
  mobileTab.value = 'crags'
  map.closePopup()
  STATES.forEach(s => {
    const p = statePolygons[s.id]
    if (!p) return
    p.setStyle(s.id === stateId
      ? { fillOpacity: s.active ? 0.18 : 0.12, weight: 3.5, opacity: 1.0 }
      : { fillOpacity: s.active ? 0.04 : 0.14, weight: 1.0, opacity: 0.35 })
  })
  map.flyTo(state.center, state.zoom, { duration: 0.9 })
  if (state.active) {
    view.value = 'state'
    if (!map.hasLayer(cragMarkerLayer)) cragMarkerLayer.addTo(map)
  } else {
    view.value = 'coming-soon'
    if (map.hasLayer(cragMarkerLayer)) map.removeLayer(cragMarkerLayer)
  }
}

function goState() {
  currentCrag.value = null
  clearCragArea()
  Object.entries(cragMarkers).forEach(([k, m]) => {
    const c = allCrags.value.find(c => c.id === k)
    if (c) m.setIcon(markerIcon(c, false))
  })
  if (!currentState.value) { goAustralia(); return }
  selectState(currentState.value.id)
}

function openCragPopup(id: string) {
  if (!map) return
  if (window.innerWidth <= 700) { selectCrag(id); return }
  if (currentCrag.value?.id === id) return
  const marker = cragMarkers[id]
  if (!marker) return
  map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 13), { duration: 0.6 })
  marker.openPopup()
  const crag = allCrags.value.find(c => c.id === id)
  if (crag) showCragArea(crag)
}

function selectCrag(id: string) {
  const crag = allCrags.value.find(c => c.id === id)
  if (!crag || !map) return
  if (currentCrag.value?.id === id) { map.closePopup(); return }
  currentCrag.value = crag
  map.closePopup()
  mobileTab.value = 'crags'
  Object.entries(cragMarkers).forEach(([k, m]) => {
    const c = allCrags.value.find(c => c.id === k)
    if (c) m.setIcon(markerIcon(c, k === id))
  })
  map.flyTo([crag.lat, crag.lng], 13, { duration: 0.9 })
  showCragArea(crag)
  view.value = 'crag'
}

// ── INIT ──
async function initMap() {
  L = (await import('leaflet')).default as any
  await import('leaflet/dist/leaflet.css')

  map = L!.map('progress-map', {
    center: [-27.0, 134.0], zoom: 4, zoomSnap: 0.25, zoomControl: false, minZoom: 3,
  })
  L!.control.zoom({ position: 'bottomleft' }).addTo(map!)
  L!.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://stadiamaps.com/">Stadia Maps</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 20,
  }).addTo(map!)

  cragMarkerLayer = L!.layerGroup()

  map!.on('zoom', () => {
    const z = map!.getZoom()
    if (z >= 8 && !currentState.value) {
      Object.values(statePolygons).forEach((p: any) => p.setStyle({ opacity: 0, fillOpacity: 0 }))
    } else if (currentState.value) {
      STATES.forEach(s => {
        const p = statePolygons[s.id]; if (!p) return
        p.setStyle(s.id === currentState.value!.id
          ? { fillOpacity: s.active ? 0.18 : 0.12, weight: 3.5, opacity: 1.0 }
          : { fillOpacity: s.active ? 0.04 : 0.14, weight: 1.0, opacity: 0.35 })
      })
    } else {
      STATES.forEach(s => {
        const p = statePolygons[s.id]
        if (p) p.setStyle({ fillOpacity: s.active ? 0.10 : 0.28, weight: s.active ? 2.5 : 2.0, opacity: s.active ? 0.8 : 0.85 })
      })
    }
    if (z >= 7) { if (!map!.hasLayer(cragMarkerLayer!)) cragMarkerLayer!.addTo(map!) }
    else if (!currentState.value?.active && map!.hasLayer(cragMarkerLayer!)) map!.removeLayer(cragMarkerLayer!)
  })

  const [crags, milestones, areas] = await Promise.all([
    fetch('/data/crags.json').then(r => r.json()),
    fetch('/data/milestones.json').then(r => r.json()),
    fetch('/data/areas.geojson').then(r => r.json()).catch(() => null),
  ])
  allCrags.value = crags
  allMilestones.value = milestones
  allAreas = areas

  // State polygons — click directly selects, no popup
  try {
    const statesGeo = await fetch('/states.geojson').then(r => r.json())
    L!.geoJSON(statesGeo, {
      style: (feature: any) => {
        const id = STATE_NAME_MAP[feature.properties.STATE_NAME ?? feature.properties.name ?? feature.properties.NAME]
        const cfg = STATES.find(s => s.id === id)
        return cfg?.active
          ? { color: '#2D5016', weight: 2.5, opacity: 0.8, fillColor: '#2D5016', fillOpacity: 0.10 }
          : { color: '#444441', weight: 2.0, opacity: 0.85, fillColor: '#444441', fillOpacity: 0.28 }
      },
      onEachFeature: (feature: any, layer: any) => {
        const id = STATE_NAME_MAP[feature.properties.STATE_NAME ?? feature.properties.name ?? feature.properties.NAME]
        const cfg = STATES.find(s => s.id === id)
        if (!cfg) return
        statePolygons[cfg.id] = layer
        layer.on('mouseover', () => {
          if (currentState.value?.id === cfg.id) return
          layer.setStyle({ fillOpacity: cfg.active ? 0.22 : 0.38, weight: cfg.active ? 3 : 2 })
        })
        layer.on('mouseout', () => {
          if (currentState.value?.id === cfg.id) return
          layer.setStyle({ fillOpacity: cfg.active ? 0.10 : 0.28, weight: cfg.active ? 2.5 : 2.0 })
        })
        layer.on('click', () => { map!.closePopup(); selectState(cfg.id) })
      },
    }).addTo(map!)
  } catch (e) { console.warn('states.geojson not loaded', e) }

  // Crag markers
  allCrags.value.forEach(crag => {
    const marker = L!.marker([crag.lat, crag.lng], { icon: markerIcon(crag) })
    const ms = allMilestones.value.filter(m => m.crag_id === crag.id)
    const pct = ms.length ? Math.round(ms.filter(m => m.status === 'done').length / ms.length * 100) : 0
    marker.bindPopup(`
      <div class="acc-popup status-${crag.status}">
        <div class="acc-popup-pill"><div class="status-dot"></div>${crag.statusLabel}</div>
        <div class="acc-popup-name">${crag.name}</div>
        <div class="acc-popup-loc">${crag.subtitle}</div>
        <div class="acc-popup-bar-bg"><div class="acc-popup-bar-fill" style="width:${pct}%"></div></div>
        <span class="acc-popup-link" onclick="window.__progressSelectCrag('${crag.id}')">View details →</span>
      </div>`, { maxWidth: 260, autoPan: false })
    marker.on('mouseover', () => marker.setIcon(markerIcon(crag, true)))
    marker.on('mouseout',  () => marker.setIcon(markerIcon(crag, false)))
    marker.on('click', () => { if (currentCrag.value?.id === crag.id) marker.closePopup() })
    marker.on('popupclose', () => { if (!currentCrag.value) clearCragArea() })
    marker.addTo(cragMarkerLayer!)
    cragMarkers[crag.id] = marker
  })
  map!.removeLayer(cragMarkerLayer!)

  fitAustraliaView(false)
  view.value = 'australia'
}

onMounted(async () => {
  ;(window as any).__progressSelectState = selectState
  ;(window as any).__progressSelectCrag  = selectCrag
  await initMap()
  await nextTick()
  map?.invalidateSize()
})
onUnmounted(() => {
  delete (window as any).__progressSelectState
  delete (window as any).__progressSelectCrag
  map?.remove(); map = null
})
</script>

<style>
/* ── LAYOUT ── */
.progress-root {
  display: grid;
  grid-template-columns: 340px 1fr;
  background: #F9F7F2;
  color: #1C2A1E;
  overflow: hidden;
}
@media (min-width: 1200px) { .progress-root { grid-template-columns: 380px 1fr; } }

/* ── STATUS TOKENS ── */
.status-completed  { --s-bg: #2E6B40; --s-pill: rgba(46,107,64,0.14); --s-text: #2E6B40; }
.status-recognised { --s-bg: #5AAA3A; --s-pill: rgba(90,170,58,0.14); --s-text: #3A8020; }
.status-progress   { --s-bg: #C8900A; --s-pill: rgba(200,144,10,0.14); --s-text: #9A6D08; }
.status-scoping    { --s-bg: #888780; --s-pill: rgba(28,42,30,0.07); --s-text: rgba(28,42,30,0.45); }
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--s-text); flex-shrink: 0; }
.detail-pill { background: var(--s-pill); color: var(--s-text); }
.progress-bar-fill { background: var(--s-bg); }

/* ── LEAFLET POPUP OVERRIDES ── */
.leaflet-popup-content-wrapper { border-radius: 0 !important; box-shadow: 0 4px 24px rgba(0,0,0,0.12) !important; padding: 0 !important; font-family: 'Inter Tight', system-ui, sans-serif !important; border: 1px solid rgba(46,107,64,0.2) !important; }
.leaflet-popup-content { margin: 0 !important; min-width: 200px; }
.leaflet-popup-tip-container { display: none !important; }
.leaflet-popup-close-button { color: rgba(28,42,30,0.4) !important; font-size: 18px !important; top: 8px !important; right: 10px !important; }
.acc-popup { padding: 16px 18px 14px; background: #F9F7F2; }
.acc-popup-pill { display: inline-flex; align-items: center; gap: 6px; background: var(--s-pill); color: var(--s-text); font-family: 'JetBrains Mono', monospace; font-size: 8px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; padding: 3px 9px; margin-bottom: 9px; }
.acc-popup-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; font-weight: 600; color: #1C2A1E; margin-bottom: 2px; letter-spacing: -0.02em; }
.acc-popup-loc { font-size: 12px; color: rgba(28,42,30,0.5); margin-bottom: 10px; }
.acc-popup-bar-bg { height: 2px; background: rgba(28,42,30,0.1); overflow: hidden; margin-bottom: 12px; }
.acc-popup-bar-fill { height: 100%; background: var(--s-bg); }
.acc-popup-link { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #1C2A1E; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }

/* ── MARKER DOTS ── */
.marker-dot { position: relative; border-radius: 50%; border: 2.5px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.22); background: var(--s-bg); cursor: pointer; transition: transform 0.15s; }
.marker-dot.active { transform: scale(1.3); box-shadow: 0 2px 12px rgba(0,0,0,0.4); }
.marker-pulse { position: absolute; inset: -7px; border-radius: 50%; border: 2px solid var(--s-bg); opacity: 0; animation: pulse 2.5s ease-out infinite; }

/* ── MILESTONE DOTS ── */
.mdot-done { background: #2E6B40; }
.mdot-progress { background: #B8860D; animation: pulse 2s ease-in-out infinite; }
.mdot-todo { background: transparent; border: 1.5px solid rgba(28,42,30,0.25); }

/* ── SPINNER ── */
.spinner { width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(46,107,64,0.15); border-top-color: #2E6B40; animation: spin 0.8s linear infinite; }

/* ── MOBILE ── */
.sheet-handle { display: none; width: 36px; height: 4px; background: rgba(28,42,30,0.15); border-radius: 2px; margin: 10px auto 0; flex-shrink: 0; }
.mobile-tab-bar { display: none; }
@media (max-width: 700px) {
  .sheet-handle { display: block; }
  .progress-root { grid-template-columns: 1fr; grid-template-rows: 1fr; }
  #progress-map { height: 100vh; }
  .sidebar {
    position: fixed; bottom: calc(56px + env(safe-area-inset-bottom, 0px)); left: 0; right: 0;
    height: calc(100vh - 56px - env(safe-area-inset-bottom, 0px));
    border-right: none; border-radius: 14px 14px 0 0;
    box-shadow: 0 -4px 32px rgba(0,0,0,0.18);
    transform: translateY(100%); transition: transform 0.32s cubic-bezier(0.4,0,0.2,1); z-index: 2000;
  }
  .sidebar.sheet-open { transform: translateY(0); }
  .detail-content { padding-bottom: 48px; }
  .leaflet-bottom.leaflet-left { bottom: calc(68px + env(safe-area-inset-bottom, 0px)); }
  .map-legend { bottom: calc(68px + env(safe-area-inset-bottom, 0px)) !important; }
  .mobile-tab-bar {
    display: flex; position: fixed; bottom: 0; left: 0; right: 0;
    padding-bottom: env(safe-area-inset-bottom, 0px); min-height: 56px;
    background: #F9F7F2; border-top: 1px solid rgba(46,107,64,0.2);
    box-shadow: 0 -2px 12px rgba(0,0,0,0.06); z-index: 2001;
  }
  .mobile-tab {
    flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 3px; padding: 8px 0; background: none; border: none; cursor: pointer;
    color: rgba(28,42,30,0.4); font-family: 'Inter Tight', system-ui, sans-serif;
    font-size: 10px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase;
    transition: color 0.15s; -webkit-tap-highlight-color: transparent;
  }
  .mobile-tab.active { color: #1C2A1E; }
  .mobile-tab svg { width: 20px; height: 20px; }
}

/* ── ANIMATIONS ── */
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 0; transform: scale(1.5); } }
</style>
