import { defineArrayMember, defineField, defineType } from 'sanity'

// Building blocks for pages. Each page is a header plus a list of these, in any order.
// Headings: wrap a word in *asterisks* to make it italic. A wattle full stop is added automatically.

const headingField = (name = 'heading', title = 'Heading') =>
  defineField({
    name,
    title,
    type: 'string',
    description: 'Wrap a word in *asterisks* to italicise it, e.g. "The work is *all of us*"',
  })

const labelField = defineField({
  name: 'label',
  description: 'Small label shown above or beside the section, e.g. "Origin"',
  type: 'string',
})

export const textSection = defineType({
  name: 'textSection',
  title: 'Text',
  type: 'object',
  fields: [
    labelField,
    headingField(),
    defineField({ name: 'body', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
    defineField({ name: 'linkLabel', title: 'Button text', type: 'string' }),
    defineField({ name: 'linkHref', title: 'Button link', description: 'A page like /volunteer, or mailto:hello@acaciaclimbing.org', type: 'string' }),
  ],
  preview: { select: { title: 'heading', subtitle: 'label' }, prepare: ({ title, subtitle }) => ({ title: title || 'Text', subtitle: `Text · ${subtitle ?? ''}` }) },
})

export const card = defineType({
  name: 'card',
  type: 'object',
  fields: [
    defineField({ name: 'kicker', description: 'Small text above the title, e.g. "I" or "Volunteer"', type: 'string' }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', type: 'text', rows: 3 }),
    defineField({ name: 'linkLabel', title: 'Link text', type: 'string' }),
    defineField({ name: 'linkHref', title: 'Link', type: 'string' }),
  ],
  preview: { select: { title: 'title', subtitle: 'kicker' } },
})

export const cardsSection = defineType({
  name: 'cardsSection',
  title: 'Cards',
  type: 'object',
  fields: [
    labelField,
    headingField(),
    defineField({ name: 'intro', type: 'text', rows: 3 }),
    defineField({
      name: 'style',
      type: 'string',
      initialValue: 'grid',
      options: { list: [{ title: 'Grid of cards', value: 'grid' }, { title: 'Numbered list', value: 'list' }], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({ name: 'cards', type: 'array', of: [defineArrayMember({ type: 'card' })] }),
  ],
  preview: { select: { title: 'heading', subtitle: 'label' }, prepare: ({ title, subtitle }) => ({ title: title || 'Cards', subtitle: `Cards · ${subtitle ?? ''}` }) },
})

export const timelineSection = defineType({
  name: 'timelineSection',
  title: 'Timeline',
  type: 'object',
  fields: [
    labelField,
    headingField(),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'timelineItem',
          fields: [
            defineField({ name: 'date', type: 'string', description: 'e.g. "2025" or "March 2026"' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'detail', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', subtitle: 'date' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Timeline', subtitle: 'Timeline' }) },
})

export const peopleSection = defineType({
  name: 'peopleSection',
  title: 'People',
  type: 'object',
  fields: [
    labelField,
    headingField(),
    defineField({
      name: 'people',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'person',
          fields: [
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'role', type: 'string' }),
            defineField({ name: 'location', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'role' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'People', subtitle: 'People' }) },
})

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Call to action',
  type: 'object',
  fields: [
    headingField(),
    defineField({ name: 'buttonLabel', title: 'Button text', type: 'string' }),
    defineField({ name: 'buttonHref', title: 'Button link', type: 'string' }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Call to action', subtitle: 'Call to action' }) },
})

export const cragRegisterSection = defineType({
  name: 'cragRegisterSection',
  title: 'Crag register',
  type: 'object',
  description: 'The live list of crags and their status, pulled from the Crags section.',
  fields: [headingField('heading', 'Heading (optional)')],
  preview: { prepare: () => ({ title: 'Crag register', subtitle: 'Live list of crags' }) },
})

export const sectionTypes = [textSection, card, cardsSection, timelineSection, peopleSection, ctaSection, cragRegisterSection]
export const sectionMembers = ['textSection', 'cardsSection', 'timelineSection', 'peopleSection', 'ctaSection', 'cragRegisterSection'].map(
  (type) => defineArrayMember({ type }),
)
