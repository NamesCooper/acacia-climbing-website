import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Acacia Climbing Coalition · SEQ' }),
    defineField({
      name: 'description',
      title: 'Search description',
      description: 'What Google shows under the site name. Keep under 160 characters.',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(160),
    }),
    defineField({ name: 'contactEmail', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'kaya', title: 'KAYA profile URL', type: 'url' }),
    defineField({ name: 'abn', title: 'ABN', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
