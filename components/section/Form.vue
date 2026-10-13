<template>
  <!-- Sign-up form. Sends to a form service (e.g. Formspree or Web3Forms) set in the Studio,
       so it works on a static site with no server of our own. Until a service is set,
       "Send" opens a pre-filled email instead, so it's never a dead end. Links can pre-fill it
       (see prefill below). -->
  <section :id="anchor || undefined" class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <UiCard tone="light" size="lg">
      <div class="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <UiSectionTitle :title="title" :lead="lead" small />
          <p v-if="intro" class="mt-4 mb-0 text-lg leading-relaxed">{{ intro }}</p>
          <p v-if="privacyNote" class="mt-4 mb-0 text-sm opacity-80">{{ privacyNote }}</p>
        </div>

        <form v-if="status !== 'sent'" class="grid gap-5" novalidate @submit.prevent="submit">
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="grid gap-1.5">
              <span class="font-grotesk font-bold">Your name</span>
              <input v-model.trim="form.name" name="name" autocomplete="name" required :class="INPUT" />
            </label>
            <label class="grid gap-1.5">
              <span class="font-grotesk font-bold">Email</span>
              <input v-model.trim="form.email" name="email" type="email" autocomplete="email" required :class="INPUT" />
            </label>
          </div>

          <label class="grid gap-1.5">
            <span class="font-grotesk font-bold">Suburb or nearest crag <span class="font-normal opacity-70">(optional)</span></span>
            <input v-model.trim="form.suburb" name="suburb" autocomplete="address-level2" :class="INPUT" />
          </label>

          <fieldset v-if="interests.length" class="m-0 p-0 border-0 grid gap-2.5">
            <legend class="mb-2.5 font-grotesk font-bold">I'd like to help with</legend>
            <div class="flex flex-wrap gap-2.5">
              <label
                v-for="(item, i) in interests"
                :key="item"
                class="cursor-pointer select-none inline-flex items-center gap-2 border-2 border-outline rounded-full px-3.5 py-1.5 font-bold text-[15px] shadow-[2px_2px_0_var(--color-outline)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-moss has-[:focus-visible]:ring-offset-2"
                :class="form.interests.includes(item) ? CHIP_ON[i % CHIP_ON.length] : 'bg-paper-light'"
              >
                <input v-model="form.interests" type="checkbox" :value="item" class="sr-only" />
                <svg v-if="form.interests.includes(item)" aria-hidden="true" viewBox="0 0 12 12" class="size-3"><path d="M2 6.5 4.8 9 10 3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                {{ item }}
              </label>
            </div>
          </fieldset>

          <label class="grid gap-1.5">
            <span class="font-grotesk font-bold">Anything else? <span class="font-normal opacity-70">(optional)</span></span>
            <textarea v-model.trim="form.message" name="message" rows="3" :class="INPUT" />
          </label>

          <!-- Spam trap: hidden from people, bots fill it in -->
          <input v-model="form.botcheck" type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden" />

          <div class="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              :disabled="status === 'sending'"
              class="nudge cursor-pointer border-[3px] border-outline rounded-full px-7 py-3.5 font-grotesk font-extrabold text-lg bg-moss text-paper shadow-[5px_5px_0_var(--color-outline)] disabled:opacity-60 disabled:cursor-wait"
            >{{ status === 'sending' ? 'Sending…' : buttonLabel || 'Count me in' }}</button>
            <p class="m-0 text-[15px] font-bold" :class="status === 'error' ? 'bg-wattle border-2 border-outline rounded-full px-3 py-1' : ''" role="status" aria-live="polite">{{ note }}</p>
          </div>
        </form>

        <div v-else class="self-center" role="status" aria-live="polite">
          <p class="m-0 font-display text-[clamp(34px,4.5vw,52px)] leading-[0.95]">{{ successHeading || 'Thanks, legend.' }}</p>
          <p class="mt-4 mb-0 text-lg leading-relaxed">{{ successText || "We've got your details and we'll be in touch soon." }}</p>
        </div>
      </div>
    </UiCard>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  lead?: string
  intro?: string
  interests: string[]
  buttonLabel?: string
  successHeading?: string
  successText?: string
  privacyNote?: string
  endpoint?: string
  accessKey?: string
  fallbackEmail?: string
  anchor?: string
}>()

const INPUT =
  'w-full bg-paper border-[3px] border-outline rounded-2xl px-4 py-3 text-base text-outline shadow-[3px_3px_0_var(--color-outline)] focus:outline-none focus:ring-2 focus:ring-moss focus:ring-offset-2 focus:ring-offset-paper-light'
const CHIP_ON = ['bg-wattle', 'bg-lichen', 'bg-sandstone']

// `reactive` makes a whole object reactive, so v-model can write straight into its fields
const form = reactive({ name: '', email: '', suburb: '', interests: [] as string[], message: '', botcheck: '' })
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const note = ref('')

// Links can pre-fill the form, e.g. /get-involved?help=clean-up-days,track-work&crag=Tooheys#sign-up
// `help` ticks matching interests (case and punctuation don't matter), `crag` fills the
// "Suburb or nearest crag" box. Read after the page loads (onMounted), because the static HTML
// is built without a query string and Vue expects the first render to match it. The watch
// catches clicks that change the query while you're already on this page.
const route = useRoute()
const slugify = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
function prefill() {
  const help = ([] as unknown[]).concat(route.query.help ?? []).join(',').split(',').map((v) => slugify(String(v))).filter(Boolean)
  if (help.length) {
    const picked = props.interests.filter((item) => help.includes(slugify(item)))
    if (picked.length) form.interests = Array.from(new Set([...form.interests, ...picked]))
  }
  const crag = typeof route.query.crag === 'string' ? route.query.crag.trim() : ''
  if (crag && !form.suburb) form.suburb = crag.slice(0, 80)
}
onMounted(() => {
  prefill()
  watch(() => route.query, prefill)
})

const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

async function submit() {
  if (form.botcheck) return
  if (!form.name || !looksLikeEmail(form.email)) {
    status.value = 'error'
    note.value = 'Pop in your name and a working email so we can reply.'
    return
  }

  const details = {
    name: form.name,
    email: form.email,
    suburb: form.suburb,
    interests: form.interests.join(', '),
    message: form.message,
  }

  // No form service yet: open a ready-to-send email instead
  if (!props.endpoint) {
    const to = props.fallbackEmail || 'hello@acaciaclimbing.org'
    const body = Object.entries(details).filter(([, v]) => v).map(([k, v]) => `${k[0].toUpperCase() + k.slice(1)}: ${v}`).join('\n')
    window.location.href = `mailto:${to}?subject=${encodeURIComponent("I'd like to help")}&body=${encodeURIComponent(body)}`
    note.value = 'Opening your email app…'
    return
  }

  status.value = 'sending'
  note.value = ''
  try {
    const res = await fetch(props.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...details,
        ...(props.accessKey ? { access_key: props.accessKey } : {}),
        subject: 'Get involved: new helper sign-up',
        from_name: 'Acacia website',
        _replyto: form.email,
      }),
    })
    if (!res.ok) throw new Error(String(res.status))
    status.value = 'sent'
  } catch {
    status.value = 'error'
    note.value = `That didn't go through. Try again, or email ${props.fallbackEmail || 'hello@acaciaclimbing.org'}.`
  }
}
</script>
