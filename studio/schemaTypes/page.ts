import { defineField, defineType } from 'sanity'
import { sectionMembers } from './sections'

export const COPY_STATUSES = [
  { title: '🟡 Mockup copy (replace me)', value: 'mockup' },
  { title: '🔵 Draft (real words, still polishing)', value: 'draft' },
  { title: '🟢 Ready', value: 'ready' },
]

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'sections', title: 'Sections' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({ name: 'title', description: 'Used in the browser tab and Google', type: 'string', group: 'settings', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Web address',
      description: '"home" is the homepage. Anything else becomes acaciaclimbing.org/<this>. For a child page, put the parent first, e.g. "partners/kaya"',
      type: 'slug',
      group: 'settings',
      options: { source: 'title', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'copyStatus',
      title: 'Copy status',
      description: 'Just for you: track which pages still have mockup words',
      type: 'string',
      group: 'settings',
      initialValue: 'draft',
      options: { list: COPY_STATUSES, layout: 'radio' },
    }),
    defineField({
      name: 'showHelpBand',
      title: 'Show the "Got an hour?" band',
      description: 'The dark band above the footer. Turn off on pages that are already about helping.',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
    defineField({ name: 'seoDescription', title: 'Google description', type: 'text', rows: 2, group: 'settings', validation: (r) => r.max(160) }),
    defineField({ name: 'eyebrow', description: 'Small label above the heading', type: 'string', group: 'header' }),
    defineField({
      name: 'heading',
      type: 'string',
      group: 'header',
      description: 'Wrap the last word(s) in *asterisks* to make them green, e.g. "Every bit *helps*". The homepage skips this header and uses its Hero block instead.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'lede', title: 'Intro line', type: 'text', rows: 3, group: 'header' }),
    defineField({
      name: 'sections',
      type: 'array',
      group: 'sections',
      of: sectionMembers,
      // "Add item" opens a grid of pictures of each block (images live in studio/static/blocks)
      options: {
        insertMenu: {
          filter: 'auto',
          views: [
            { name: 'grid', previewImageUrl: (type: string) => `/static/blocks/${type}.jpg` },
            { name: 'list' },
          ],
        },
      },
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', status: 'copyStatus' },
    prepare: ({ title, slug, status }) => ({
      title: `${status === 'mockup' ? '🟡' : status === 'ready' ? '🟢' : '🔵'} ${title}`,
      subtitle: slug === 'home' ? 'Homepage' : `/${slug ?? ''}`,
    }),
  },
})
