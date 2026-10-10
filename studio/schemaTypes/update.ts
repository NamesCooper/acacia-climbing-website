import { defineArrayMember, defineField, defineType } from 'sanity'

// Short dated progress notes ("stairs installed at Tooheys", "met Ipswich City Council").
// These keep the site feeling alive and give councils a visible record of momentum.
export const update = defineType({
  name: 'update',
  title: 'Update',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({
      name: 'date',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'crags',
      title: 'Related crags',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'crag' }] })],
    }),
    defineField({ name: 'summary', description: 'One or two sentences for lists and social previews', type: 'text', rows: 3, validation: (r) => r.required().max(280) }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() })],
        }),
      ],
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'date' } },
})
