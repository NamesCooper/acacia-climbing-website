<template>
  <!-- Small rounded label. Pass `status` (from a crag) to get the standard status look,
       or pick a `tone` yourself. -->
  <span
    class="inline-block border-2 rounded-full px-3 py-1 text-[13px] font-bold leading-snug"
    :class="status ? statusChip(status) : [TONES[tone], dashed ? 'border-dashed' : '', 'border-forest']"
  ><slot>{{ status ? statusLabel(status) : '' }}</slot></span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'wattle' | 'lichen' | 'sandstone' | 'gum' | 'moss' | 'forest' | 'paper' | 'ironbark'
    status?: string
    dashed?: boolean
  }>(),
  { tone: 'lichen' },
)

const TONES = {
  wattle: 'bg-wattle text-forest',
  lichen: 'bg-lichen text-forest',
  sandstone: 'bg-sandstone text-forest',
  gum: 'bg-gum text-outline',
  ironbark: 'bg-ironbark text-paper',
  moss: 'bg-moss text-paper',
  forest: 'bg-forest text-paper',
  paper: 'bg-paper text-forest',
}
</script>
