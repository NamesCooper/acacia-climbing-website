<template>
  <!-- Draws a Studio page's sections in order, picking the matching Section* brick for each type.
       Add a new section type: schema in studio/schemaTypes/sections.ts, then a v-else-if here. -->
  <template v-for="s in sections" :key="s._key">
    <SectionSplit
      v-if="s._type === 'textSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      :paragraphs="blocksToParagraphs(s.body)"
      :cta="cta(s.linkLabel, s.linkHref)"
    />

    <SectionCards
      v-else-if="s._type === 'cardsSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      :intro="s.intro"
      :columns="(s.cards?.length ?? 0) % 3 === 0 ? 3 : 2"
      title-style="grotesk"
      :cards="(s.cards ?? []).map((c: any) => ({ chip: c.kicker, title: c.title, body: c.body, cta: cta(c.linkLabel, c.linkHref) }))"
    />

    <SectionCards
      v-else-if="s._type === 'timelineSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      title-style="grotesk"
      :cards="(s.items ?? []).map((i: any) => ({ chip: i.date, chipTone: 'sandstone', title: i.title, body: i.detail }))"
    />

    <SectionCards
      v-else-if="s._type === 'peopleSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      :columns="3"
      title-style="grotesk"
      :cards="(s.people ?? []).map((p: any) => ({ chip: p.location, title: p.name, body: p.role }))"
    />

    <SectionCallout
      v-else-if="s._type === 'ctaSection'"
      :title="plain(s.heading)"
      :cta="cta(s.buttonLabel, s.buttonHref)"
    />

    <HomeCragCards v-else-if="s._type === 'cragRegisterSection'" />
  </template>
</template>

<script setup lang="ts">
import type { Cta } from '~/types/content'
import { blocksToParagraphs } from '~/composables/usePage'

defineProps<{ sections: Array<{ _key: string; _type: string; [field: string]: any }> }>()

const plain = (text?: string) => (text ?? '').replaceAll('*', '')

// Links starting with "/" stay inside the site, everything else (mailto:, https:) is a plain link
function cta(label?: string, link?: string): Cta | undefined {
  if (!label || !link) return undefined
  return link.startsWith('/') ? { label, to: link } : { label, href: link }
}
</script>
