import { defineField, defineType } from 'sanity'

export const CRAG_STATUSES = [
  { title: 'Completed', value: 'completed', label: 'Access Secured' },
  { title: 'Council recognised', value: 'recognised', label: 'Council Recognised' },
  { title: 'In progress', value: 'progress', label: 'In Progress' },
  { title: 'Scoping', value: 'scoping', label: 'Scoping' },
]

export const crag = defineType({
  name: 'crag',
  title: 'Crag',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'access', title: 'Access & council' },
    { name: 'map', title: 'Map' },
    { name: 'pathway', title: 'Pathway' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', group: 'overview', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'ID',
      description: 'Short lowercase ID used in URLs and the map, e.g. "tooheys". Avoid changing once live.',
      type: 'slug',
      group: 'overview',
      options: { source: 'name', maxLength: 40 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      description: 'Shown under the name, e.g. "South Brisbane · Brisbane City Council"',
      type: 'string',
      group: 'overview',
    }),
    defineField({ name: 'description', type: 'text', rows: 5, group: 'overview' }),
    defineField({ name: 'problems', description: 'e.g. "445+"', type: 'string', group: 'overview' }),
    defineField({ name: 'style', description: 'Rock type, e.g. "Sandstone"', type: 'string', group: 'overview' }),
    defineField({ name: 'season', type: 'string', group: 'overview' }),
    defineField({
      name: 'kayaUrl',
      title: 'KAYA guidebook link',
      type: 'url',
      group: 'overview',
    }),
    defineField({
      name: 'status',
      title: 'Access status',
      type: 'string',
      group: 'access',
      options: { list: CRAG_STATUSES.map(({ title, value }) => ({ title, value })), layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'statusLabel',
      description: 'Public label for the status. Leave blank to use the default for the status above.',
      type: 'string',
      group: 'access',
    }),
    defineField({ name: 'council', title: 'Council / land manager', type: 'string', group: 'access', validation: (r) => r.required() }),
    defineField({ name: 'councilStatus', description: 'One line on where things stand', type: 'string', group: 'access' }),
    defineField({ name: 'state', type: 'string', initialValue: 'QLD', group: 'access' }),
    defineField({ name: 'region', type: 'string', initialValue: 'SEQLD', group: 'access' }),
    defineField({
      name: 'updatedAt',
      title: 'Last updated',
      type: 'date',
      group: 'access',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Map pin',
      description: 'Decimal degrees, WGS84',
      type: 'geopoint',
      group: 'map',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'areaGeoJson',
      title: 'Area boundary (GeoJSON geometry)',
      description: 'Paste a GeoJSON Polygon geometry, e.g. drawn at geojson.io. Optional.',
      type: 'text',
      rows: 6,
      group: 'map',
      validation: (r) =>
        r.custom((value?: string) => {
          if (!value) return true
          try {
            const g = JSON.parse(value)
            return ['Polygon', 'MultiPolygon'].includes(g.type) || 'Must be a Polygon or MultiPolygon geometry'
          } catch {
            return 'Not valid JSON'
          }
        }),
    }),
    defineField({
      name: 'milestones',
      title: 'Access pathway',
      description: 'Steps toward recognition, in order. Drag to reorder.',
      type: 'array',
      group: 'pathway',
      of: [{ type: 'milestone' }],
    }),
  ],
  orderings: [{ title: 'Name', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', council: 'council', status: 'status' },
    prepare: ({ title, council, status }) => ({
      title,
      subtitle: [CRAG_STATUSES.find((s) => s.value === status)?.title, council].filter(Boolean).join(' · '),
    }),
  },
})
