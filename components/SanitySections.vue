<template>
  <!-- Draws a Studio page's sections in order, picking the matching component for each block type.
       Adding a block type: schema in studio/schemaTypes/sections.ts, then a v-else-if here. -->
  <template v-for="s in sections" :key="s._key">
    <!-- Homepage blocks -->
    <HomeHero
      v-if="s._type === 'heroSection'"
      :label="s.label"
      :heading="s.heading ?? ''"
      :body="s.body"
      :primary="cta(s.primaryLabel, s.primaryHref)"
      :secondary="cta(s.secondaryLabel, s.secondaryHref)"
    />

    <HomeMarquee v-else-if="s._type === 'marqueeSection'" :items="s.items ?? []" :colour="clean(s.colour) ?? 'moss'" />

    <HomeAboutTabs v-else-if="s._type === 'tabsSection'" :tabs="s.tabs ?? []" />

    <HomeCragCards v-else-if="s._type === 'cragRegisterSection'" :heading="s.heading" :link-label="s.linkLabel" />

    <!-- General blocks -->
    <SectionSplit
      v-else-if="s._type === 'textSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      :paragraphs="blocksToParagraphs(s.body)"
      :cta="cta(s.linkLabel, s.linkHref)"
      :highlight="s.quote ? { quote: s.quote, body: s.quoteBody, tone: clean(s.quoteTone) } : undefined"
    />

    <SectionCards
      v-else-if="s._type === 'cardsSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      :intro="s.intro"
      :columns="s.columns ?? 2"
      :title-style="clean(s.titleStyle) ?? 'display'"
      :tilted="s.tilted"
      :cards="(s.cards ?? []).map(toCard)"
    />

    <SectionSteps
      v-else-if="s._type === 'stepsSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      :steps="s.steps ?? []"
      :link="link(s.linkLabel, s.linkHref)"
      :band="clean(s.band) ?? 'sandstone'"
    />

    <SectionStatement
      v-else-if="s._type === 'statementSection'"
      :title="plain(s.heading)"
      :paragraphs="blocksToParagraphs(s.body)"
      :sprig="s.sprig !== false"
    />

    <SectionProse
      v-else-if="s._type === 'proseSection'"
      :blocks="(s.blocks ?? []).map((b: any) => ({ title: b.title, paragraphs: blocksToParagraphs(b.body) }))"
      :footnote="s.footnote"
    />

    <SectionCallout
      v-else-if="s._type === 'ctaSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      :body="s.body"
      :tone="clean(s.tone) ?? 'sandstone'"
      :cta="cta(s.buttonLabel, s.buttonHref)"
      :image="s.image?.asset ? { src: sanityImageUrl(s.image, 600), alt: s.image.alt } : undefined"
    />

    <SectionImageText
      v-else-if="s._type === 'imageTextSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      :paragraphs="blocksToParagraphs(s.body)"
      :image="s.image ? { src: sanityImageUrl(s.image), alt: s.image.alt, caption: s.image.caption } : undefined"
      :image-side="clean(s.imageSide) ?? 'left'"
      :look="clean(s.look) ?? 'frame'"
      :shape="clean(s.shape) ?? 'wattle'"
      :cta="cta(s.linkLabel, s.linkHref)"
    />

    <SectionFacts
      v-else-if="s._type === 'factsSection'"
      :lead="s.label"
      :title="plain(s.heading)"
      :note="s.note"
      :facts="(s.facts ?? []).map((f: any) => ({ value: f.value, label: f.label, tone: clean(f.tone) }))"
    />

    <SectionFaq v-else-if="s._type === 'faqSection'" :lead="s.label" :title="plain(s.heading)" :items="s.items ?? []" />

    <SectionLatestUpdates v-else-if="s._type === 'updatesSection'" :lead="s.label" :title="plain(s.heading)" :count="s.count ?? 3" />

    <SectionVideo v-else-if="s._type === 'videoSection'" :lead="s.label" :title="plain(s.heading)" :url="clean(s.url)" :caption="s.caption" />

    <SectionForm
      v-else-if="s._type === 'formSection'"
      :lead="s.label"
      :title="plain(s.heading) || 'Lend a hand'"
      :intro="s.intro"
      :interests="s.interests ?? []"
      :button-label="s.buttonLabel"
      :success-heading="s.successHeading"
      :success-text="s.successText"
      :privacy-note="s.privacyNote"
      :endpoint="clean(s.endpoint)"
      :access-key="clean(s.accessKey)"
      :fallback-email="clean(s.fallbackEmail)"
      :anchor="clean(s.anchor)"
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
  </template>
</template>

<script setup lang="ts">
import { stegaClean } from '@sanity/client/stega'
import type { CardItem, Cta } from '~/types/content'
import { blocksToParagraphs } from '~/composables/usePage'
import { sanityImageUrl } from '~/composables/sanityImage'

defineProps<{ sections: Array<{ _key: string; _type: string; [field: string]: any }> }>()

const plain = (text?: string) => (text ?? '').replaceAll('*', '')

// In the preview, every word carries invisible click-to-edit markers. Settings like
// colours and links must be cleaned of those before the site uses them.
const clean = <T,>(value: T) => (value == null ? undefined : (stegaClean(value) as T))

// Links starting with "/" stay inside the site, everything else (mailto:, https:) is a plain link
function cta(label?: string, href?: string, variant?: string): Cta | undefined {
  if (!label || !href) return undefined
  const link = stegaClean(href)
  const v = clean(variant) as Cta['variant']
  return link.startsWith('/') ? { label, to: link, variant: v } : { label, href: link, variant: v }
}

function link(label?: string, href?: string) {
  if (!label || !href) return undefined
  return { label, to: stegaClean(href) }
}

function toCard(c: any): CardItem {
  return {
    id: clean(c.anchor),
    chip: c.kicker,
    chipTone: clean(c.chipTone),
    chipDashed: c.chipDashed,
    title: c.title,
    body: c.body,
    items: c.items,
    cta: cta(c.linkLabel, c.linkHref, c.buttonColour),
    tone: clean(c.tone),
    halftone: c.halftone,
  }
}
</script>
