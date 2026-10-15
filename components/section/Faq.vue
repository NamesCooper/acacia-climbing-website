<template>
  <!-- Questions that open and close. Uses <details>, so it works without JavaScript and with keyboards. -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <!-- One centred column: heading centred, questions left-aligned inside their boxes -->
    <UiSectionTitle v-if="title" :title="title" :lead="lead" class="text-center" />
    <div class="max-w-[860px] mx-auto flex flex-col gap-4" :class="title ? 'mt-8' : ''">
      <details
        v-for="(item, i) in items"
        :key="item.question"
        class="group bg-paper-light border-[3px] border-outline rounded-[22px] shadow-[5px_5px_0_var(--color-outline)]"
        :open="i === 0"
      >
        <summary @click="toggle($event)" class="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center justify-between gap-4 px-5 py-4 sm:px-6 font-grotesk font-extrabold text-lg leading-snug">
          {{ item.question }}
          <span aria-hidden="true" class="flex-shrink-0 size-9 rounded-full bg-wattle border-[3px] border-outline flex items-center justify-center text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <div class="faq-body overflow-hidden px-5 pb-5 sm:px-6 text-[17px] leading-relaxed">
          <!-- Web addresses in an answer (e.g. kayaclimb.com/forgyms) become links -->
          <p v-for="p in paragraphs(item.answer)" :key="p" class="m-0 [&+p]:mt-3">
            <template v-for="(part, j) in linkify(p)" :key="j">
              <a v-if="part.href" :href="part.href" :target="part.external ? '_blank' : undefined" :rel="part.external ? 'noopener' : undefined" class="font-bold text-forest underline decoration-2 underline-offset-4 hover:decoration-wattle-deep">{{ part.text }}<span v-if="part.external" class="sr-only"> (opens in a new tab)</span></a>
              <template v-else>{{ part.text }}</template>
            </template>
          </p>
        </div>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title?: string; lead?: string; items: { question: string; answer?: string }[] }>()
// Smooth open and close. <details> snaps open on its own, so we take over the click: when
// opening, set it open and grow the answer from 0 to its height; when closing, shrink it first
// and only then close. The browser's own behaviour (keyboard, find-in-page) still works, and
// people who ask for less motion get the plain instant toggle.
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const running = new WeakMap<HTMLElement, Animation>()

function toggle(e: MouseEvent) {
  const details = (e.currentTarget as HTMLElement).parentElement as HTMLDetailsElement
  const body = details.querySelector<HTMLElement>('.faq-body')
  if (!body || reduceMotion() || !body.animate) return
  e.preventDefault()
  running.get(body)?.cancel()

  const opening = !details.open
  if (opening) details.open = true
  const full = body.scrollHeight
  const from = opening ? 0 : body.offsetHeight
  const to = opening ? full : 0
  const anim = body.animate(
    [
      { height: `${from}px`, opacity: opening ? 0 : 1 },
      { height: `${to}px`, opacity: opening ? 1 : 0 },
    ],
    { duration: 280, easing: 'cubic-bezier(.2,.7,.3,1)' },
  )
  running.set(body, anim)
  anim.onfinish = () => {
    if (!opening) details.open = false
    running.delete(body)
  }
}

// A blank line in the answer starts a new paragraph
const paragraphs = (text = '') => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

// Splits text into plain parts and links: full web addresses, bare domains like
// kayaclimb.com/forgyms, and email addresses
const LINK = /(https?:\/\/[^\s,]+[^\s.,)]|[\w.+-]+@[\w-]+\.[\w.]+[a-z]|\b[\w-]+\.(?:com|org|au|net)(?:\.au)?(?:\/[^\s,]*[^\s.,)])?)/gi
function linkify(text: string) {
  const out: { text: string; href?: string; external?: boolean }[] = []
  let last = 0
  for (const m of text.matchAll(LINK)) {
    if (m.index! > last) out.push({ text: text.slice(last, m.index) })
    const t = m[0]
    const href = t.includes('@') && !t.startsWith('http') ? `mailto:${t}` : t.startsWith('http') ? t : `https://${t}`
    const external = !href.startsWith('mailto:') && !/acaciaclimbing\.org/.test(href)
    out.push({ text: t, href, external })
    last = m.index! + t.length
  }
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
}
</script>
