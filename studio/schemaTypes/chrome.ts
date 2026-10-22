import { defineArrayMember, defineField, defineType } from 'sanity'

// The bits that show on every page: top navigation, footer and the "Got an hour?" band.
// Each is a single document (there's only ever one of each), opened from the sidebar.

const LINK_HELP = 'A page like /about, a spot on a page like /get-involved#donate, or mailto:hello@acaciaclimbing.org'

export const navLink = defineType({
  name: 'navLink',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'link', type: 'string', description: LINK_HELP, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'label', subtitle: 'link' } },
})

export const navItem = defineType({
  name: 'navItem',
  title: 'Menu item',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'link', type: 'string', description: `Optional if it has child links. ${LINK_HELP}` }),
    defineField({
      name: 'children',
      title: 'Child links',
      description: 'These drop down when someone hovers or taps the item',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
    }),
  ],
  preview: {
    select: { title: 'label', children: 'children', link: 'link' },
    prepare: ({ title, children, link }) => ({ title, subtitle: children?.length ? children.map((c: any) => c.label).join(' · ') : link }),
  },
})

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'menu',
      title: 'Menu',
      description: 'Top items, each with its own link or a set of child links that drop down',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
      validation: (r) => r.max(5),
    }),
    // The first, flat version of the nav. Still used if Menu is empty.
    defineField({ name: 'links', title: 'Top links (old)', type: 'array', of: [defineArrayMember({ type: 'navLink' })], hidden: ({ document }) => Boolean((document as any)?.menu?.length) }),
    defineField({ name: 'buttonLabel', title: 'Yellow button text', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Yellow button link', type: 'string', description: LINK_HELP }),
    // A thin yellow strip above the nav, for a short-term ask like a feedback form
    defineField({ name: 'bannerOn', title: 'Show the banner strip', type: 'boolean', initialValue: false, group: 'banner' }),
    defineField({ name: 'bannerText', title: 'Banner text', type: 'string', description: 'Keep it to one short line', group: 'banner', validation: (r) => r.max(90) }),
    defineField({ name: 'bannerLinkLabel', title: 'Banner link text', type: 'string', description: 'e.g. "Have your say"', group: 'banner' }),
    defineField({ name: 'bannerLink', title: 'Banner link', type: 'string', description: LINK_HELP + ', or a full web address like a Google Form', group: 'banner' }),
    defineField({
      name: 'bannerWhere',
      title: 'Show it on',
      type: 'string',
      initialValue: 'home',
      group: 'banner',
      options: { list: [{ title: 'Homepage only', value: 'home' }, { title: 'Every page', value: 'all' }], layout: 'radio', direction: 'horizontal' },
    }),
  ],
  groups: [{ name: 'banner', title: 'Banner strip' }],
  preview: { prepare: () => ({ title: 'Navigation' }) },
})

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({ name: 'tagline', description: 'The friendly line under the logo', type: 'string' }),
    defineField({
      name: 'columns',
      title: 'Link columns',
      type: 'array',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({ name: 'heading', type: 'string' }),
            defineField({ name: 'links', type: 'array', of: [defineArrayMember({ type: 'navLink' })] }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
    }),
    defineField({ name: 'smallPrint', title: 'Small print (left)', description: 'The © and year are added automatically', type: 'string' }),
    defineField({ name: 'smallPrintRight', title: 'Small print (right)', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Footer' }) },
})

export const helpBand = defineType({
  name: 'helpBand',
  title: '"Got an hour?" band',
  type: 'document',
  fields: [
    defineField({ name: 'heading', description: 'Big uppercase words', type: 'string' }),
    defineField({ name: 'accent', title: 'Italic bit', description: 'The yellow italic words after the heading', type: 'string' }),
    defineField({ name: 'intro', type: 'string' }),
    defineField({
      name: 'pills',
      title: 'Pills',
      type: 'array',
      validation: (r) => r.max(6),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pill',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'link', type: 'string', description: LINK_HELP }),
            defineField({
              name: 'colour',
              type: 'string',
              initialValue: 'wattle',
              options: {
                list: [
                  { title: 'Wattle', value: 'wattle' },
                  { title: 'Lichen', value: 'lichen' },
                  { title: 'Sandstone', value: 'sandstone' },
                  { title: 'Paper', value: 'paper' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'colour' } },
        }),
      ],
    }),
    defineField({ name: 'linkLabel', title: 'Link under the pills', type: 'string' }),
    defineField({ name: 'linkHref', title: 'Link under the pills: where to', type: 'string', description: LINK_HELP }),
  ],
  preview: { prepare: () => ({ title: '"Got an hour?" band' }) },
})

export const chromeTypes = [navLink, navItem, navigation, footer, helpBand]
export const SINGLETONS = ['siteSettings', 'navigation', 'footer', 'helpBand']
