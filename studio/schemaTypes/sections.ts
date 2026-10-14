import { createElement } from 'react'
import { defineArrayMember, defineField, defineType } from 'sanity'

// Building blocks for pages. Each page is a header plus a list of these, in any order.
// Each block is drawn on the site by a component in components/section or components/home
// (see components/SanitySections.vue). Headings: wrap a word in *asterisks* to make it italic.

const headingField = (name = 'heading', title = 'Heading') =>
  defineField({
    name,
    title,
    type: 'string',
    description: 'Wrap a word in *asterisks* to italicise it, e.g. "The work is *all of us*"',
  })

const labelField = defineField({
  name: 'label',
  title: 'Lead-in line',
  description: 'Small friendly line shown above the heading',
  type: 'string',
})

const richText = (name = 'body', title = 'Text') =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] })] })

// Colour pickers, so choosing a look is a click rather than typing
const radio = (list: { title: string; value: string }[]) => ({ list, layout: 'radio' as const, direction: 'horizontal' as const })

const CARD_TONES = [
  { title: 'Paper', value: 'light' },
  { title: 'Wattle', value: 'wattle' },
  { title: 'Sandstone', value: 'sandstone' },
  { title: 'Lichen', value: 'lichen' },
  { title: 'Gum leaf', value: 'gum' },
  { title: 'Forest (dark)', value: 'forest' },
]
const CHIP_TONES = [
  { title: 'Lichen', value: 'lichen' },
  { title: 'Wattle', value: 'wattle' },
  { title: 'Sandstone', value: 'sandstone' },
  { title: 'Gum leaf', value: 'gum' },
  { title: 'Moss', value: 'moss' },
  { title: 'Paper', value: 'paper' },
  { title: 'Ironbark (warnings)', value: 'ironbark' },
]
const BUTTON_COLOURS = [
  { title: 'Wattle', value: 'wattle' },
  { title: 'Moss', value: 'moss' },
  { title: 'Paper', value: 'paper' },
  { title: 'Text link (quiet)', value: 'link' },
]

const linkFields = (labelName = 'linkLabel', hrefName = 'linkHref', title = 'Button') => [
  defineField({ name: labelName, title: `${title} text`, type: 'string' }),
  defineField({
    name: hrefName,
    title: `${title} link`,
    description: 'A page like /get-involved, or mailto:hello@acaciaclimbing.org',
    type: 'string',
  }),
]

// ---------- Homepage blocks ----------

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero (big poster headline)',
  type: 'object',
  fields: [
    labelField,
    defineField({ name: 'heading', type: 'text', rows: 2, description: 'Each new line in this box starts a new line on the page' }),
    defineField({ name: 'body', title: 'Intro', type: 'text', rows: 3 }),
    ...linkFields('primaryLabel', 'primaryHref', 'Green button'),
    ...linkFields('secondaryLabel', 'secondaryHref', 'Light button'),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Hero', subtitle: 'Hero' }) },
})

export const marqueeSection = defineType({
  name: 'marqueeSection',
  title: 'Scrolling band',
  type: 'object',
  fields: [
    defineField({ name: 'items', title: 'Phrases', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({
      name: 'colour',
      type: 'string',
      initialValue: 'moss',
      options: radio([
        { title: 'Moss with paper words', value: 'moss' },
        { title: 'Forest with wattle words', value: 'forest' },
        { title: 'Wattle with forest words', value: 'wattle' },
      ]),
    }),
  ],
  preview: { select: { items: 'items' }, prepare: ({ items }) => ({ title: (items ?? []).join(' ✸ ') || 'Scrolling band', subtitle: 'Scrolling band' }) },
})

export const tabsSection = defineType({
  name: 'tabsSection',
  title: 'Tabs panel',
  type: 'object',
  fields: [
    defineField({
      name: 'tabs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tab',
          fields: [
            defineField({ name: 'label', title: 'Tab button', type: 'string' }),
            defineField({ name: 'heading', type: 'string' }),
            richText('body', 'Text'),
            defineField({
              name: 'image',
              title: 'Photo (optional)',
              type: 'image',
              options: { hotspot: true },
              description: 'Shows in the square spot beside the words while this tab is open. Square photos work best.',
              fields: [defineField({ name: 'alt', title: 'Describe the photo', type: 'string' })],
            }),
            defineField({ name: 'linkLabel', title: 'Link text (optional)', type: 'string' }),
            defineField({ name: 'linkHref', title: 'Link', type: 'string', description: 'A page on the site like /about, or a full web address' }),
          ],
          preview: { select: { title: 'heading', subtitle: 'label' } },
        }),
      ],
    }),
  ],
  preview: { select: { tabs: 'tabs' }, prepare: ({ tabs }) => ({ title: (tabs ?? []).map((t: any) => t.label).join(' / ') || 'Tabs', subtitle: 'Tabs panel' }) },
})

// ---------- General blocks ----------

export const textSection = defineType({
  name: 'textSection',
  title: 'Text (with optional quote card)',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo above the heading (optional)',
      type: 'image',
      description: 'e.g. a partner logo. SVG or PNG with a see-through background.',
      fields: [defineField({ name: 'alt', title: 'Organisation name', type: 'string' })],
    }),
    defineField({
      name: 'logoAsHeading',
      title: 'Show the logo instead of the heading',
      type: 'boolean',
      description: 'The heading is still read out by screen readers and seen by Google',
      hidden: ({ parent }) => !parent?.logo,
    }),
    labelField,
    headingField(),
    richText(),
    ...linkFields(),
    defineField({ name: 'quote', title: 'Quote card: big line', type: 'string', description: 'Leave empty for no quote card' }),
    defineField({ name: 'quoteBody', title: 'Quote card: text', type: 'text', rows: 3 }),
    defineField({ name: 'quoteTone', title: 'Quote card colour', type: 'string', initialValue: 'sandstone', description: 'Wattle is best kept for buttons and small highlights, not big panels', options: radio(CARD_TONES) }),
  ],
  preview: { select: { title: 'heading', subtitle: 'label' }, prepare: ({ title, subtitle }) => ({ title: title || 'Text', subtitle: `Text · ${subtitle ?? ''}` }) },
})

export const card = defineType({
  name: 'card',
  type: 'object',
  groups: [
    { name: 'words', title: 'Words', default: true },
    { name: 'look', title: 'Look' },
  ],
  fields: [
    defineField({ name: 'kicker', title: 'Chip', description: 'Small label in a pill, e.g. "Volunteer" or "Done"', type: 'string', group: 'words' }),
    defineField({ name: 'title', type: 'string', group: 'words', validation: (r) => r.required() }),
    defineField({ name: 'body', type: 'text', rows: 3, group: 'words' }),
    defineField({
      name: 'logo',
      title: 'Logo (optional)',
      type: 'image',
      group: 'look',
      description: "A partner's logo, shown in place of the card title (the title is still read out by screen readers). Only use logos you have permission to use. PNG or SVG with a see-through background works best.",
      fields: [defineField({ name: 'alt', title: 'Organisation name', type: 'string', description: 'e.g. "Rock Climbing Queensland"' })],
    }),
    defineField({
      name: 'items',
      title: 'Small list',
      description: 'Optional titled list inside the card (e.g. partners)',
      type: 'array',
      group: 'words',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'cardItem',
          fields: [defineField({ name: 'title', type: 'string' }), defineField({ name: 'body', type: 'text', rows: 2 })],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
    }),
    ...linkFields().map((f) => ({ ...f, group: 'words' })),
    defineField({ name: 'tone', title: 'Card colour', type: 'string', group: 'look', initialValue: 'light', options: radio(CARD_TONES) }),
    defineField({ name: 'chipTone', title: 'Chip colour', type: 'string', group: 'look', initialValue: 'lichen', options: radio(CHIP_TONES) }),
    defineField({ name: 'chipDashed', title: 'Dashed chip (for "not started yet")', type: 'boolean', group: 'look' }),
    defineField({ name: 'buttonColour', type: 'string', group: 'look', initialValue: 'wattle', options: radio(BUTTON_COLOURS) }),
    defineField({ name: 'halftone', title: 'Dotty corner', type: 'boolean', group: 'look' }),
    defineField({ name: 'anchor', title: 'Link name', description: 'Lets other pages link straight here, e.g. "donate" for /get-involved#donate', type: 'string', group: 'look' }),
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
    defineField({ name: 'cards', type: 'array', of: [defineArrayMember({ type: 'card' })] }),
    defineField({
      name: 'columns',
      title: 'Cards across',
      type: 'number',
      initialValue: 2,
      options: { list: [{ title: '2', value: 2 }, { title: '3', value: 3 }, { title: '4', value: 4 }], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'titleStyle',
      title: 'Card title style',
      type: 'string',
      initialValue: 'display',
      options: radio([{ title: 'Big italic', value: 'display' }, { title: 'Bold sans', value: 'grotesk' }]),
    }),
    // Cards are straight now (Oct 2026); kept so old content still validates
    defineField({ name: 'tilted', type: 'boolean', hidden: true }),
    // Kept from the first version of this block; not used on the site
    defineField({ name: 'style', type: 'string', hidden: true }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'label', cards: 'cards' },
    prepare: ({ title, subtitle, cards }) => ({ title: title || (cards ?? []).map((c: any) => c.title).join(', ') || 'Cards', subtitle: `Cards · ${subtitle ?? ''}` }),
  },
})

export const stepsSection = defineType({
  name: 'stepsSection',
  title: 'Numbered steps',
  type: 'object',
  fields: [
    labelField,
    headingField(),
    defineField({ name: 'steps', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    ...linkFields('linkLabel', 'linkHref', 'Link'),
    defineField({ name: 'band', title: 'Band colour', type: 'string', initialValue: 'sandstone', options: radio([{ title: 'Sandstone', value: 'sandstone' }, { title: 'Lichen', value: 'lichen' }, { title: 'Gum leaf', value: 'gum' }, { title: 'Wattle', value: 'wattle' }]) }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Steps', subtitle: 'Numbered steps' }) },
})

export const statementSection = defineType({
  name: 'statementSection',
  title: 'Centred statement',
  type: 'object',
  fields: [headingField(), richText(), defineField({ name: 'sprig', title: 'Show the sprig on top', type: 'boolean', initialValue: true })],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Statement', subtitle: 'Centred statement' }) },
})

export const proseSection = defineType({
  name: 'proseSection',
  title: 'Long text (policies)',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Parts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'prosePart',
          fields: [defineField({ name: 'title', type: 'string' }), richText()],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({ name: 'footnote', type: 'string' }),
  ],
  preview: { select: { blocks: 'blocks' }, prepare: ({ blocks }) => ({ title: (blocks ?? []).map((b: any) => b.title).join(', ') || 'Long text', subtitle: 'Long text' }) },
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
  title: 'Call to action panel',
  type: 'object',
  fields: [
    labelField,
    headingField(),
    defineField({ name: 'body', title: 'Text', type: 'text', rows: 3 }),
    defineField({ name: 'buttonLabel', title: 'Button text', type: 'string' }),
    defineField({ name: 'buttonHref', title: 'Button link', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Square photo (optional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Shows in a square frame beside the words. A face or a single person works best.',
      fields: [defineField({ name: 'alt', title: 'Describe the photo', type: 'string' })],
    }),
    defineField({ name: 'tone', title: 'Panel colour', type: 'string', initialValue: 'sandstone', description: 'Paper makes the button stand out most. Wattle is best kept for buttons, not big panels', options: radio([{ title: 'Paper', value: 'light' }, { title: 'Sandstone', value: 'sandstone' }, { title: 'Lichen', value: 'lichen' }, { title: 'Gum leaf', value: 'gum' }, { title: 'Wattle', value: 'wattle' }]) }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Call to action', subtitle: 'Call to action' }) },
})

export const cragRegisterSection = defineType({
  name: 'cragRegisterSection',
  title: 'Crag cards ("Where it\'s at")',
  type: 'object',
  description: 'The furthest-along crags and their progress, pulled from the Crags section.',
  fields: [
    headingField('heading', 'Heading (optional)'),
    defineField({ name: 'linkLabel', title: 'Map link text', type: 'string', description: 'The link beside the heading. An arrow is added automatically.' }),
  ],
  preview: { prepare: () => ({ title: "Where it's at", subtitle: 'Live crag cards' }) },
})

// ---------- Newer blocks ----------

export const faqSection = defineType({
  name: 'faqSection',
  title: 'Questions (FAQ)',
  type: 'object',
  fields: [
    labelField,
    headingField(),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'answer', type: 'text', rows: 4, description: 'Leave a blank line to start a new paragraph' }),
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Questions', subtitle: 'Questions (FAQ)' }) },
})

export const factsSection = defineType({
  name: 'factsSection',
  title: 'Big numbers',
  type: 'object',
  description: 'Only use real numbers you could back up to a council officer.',
  fields: [
    labelField,
    headingField(),
    defineField({
      name: 'facts',
      title: 'Numbers',
      type: 'array',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'fact',
          fields: [
            defineField({ name: 'value', title: 'Number', description: 'e.g. "5" or "1st"', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'What it means', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'tone',
              title: 'Colour',
              type: 'string',
              options: radio([
                { title: 'Wattle', value: 'wattle' },
                { title: 'Lichen', value: 'lichen' },
                { title: 'Sandstone', value: 'sandstone' },
                { title: 'Gum leaf', value: 'gum' },
                { title: 'Paper', value: 'paper' },
              ]),
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
    defineField({ name: 'note', title: 'Small note underneath', type: 'string', description: 'e.g. "As of October 2026"' }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Big numbers', subtitle: 'Big numbers' }) },
})

export const updatesSection = defineType({
  name: 'updatesSection',
  title: 'Latest updates',
  type: 'object',
  description: 'Shows the newest posts from Updates automatically.',
  fields: [
    labelField,
    headingField('heading', 'Heading (optional)'),
    defineField({
      name: 'count',
      title: 'How many',
      type: 'number',
      initialValue: 3,
      options: { list: [{ title: '2', value: 2 }, { title: '3', value: 3 }, { title: '6', value: 6 }], layout: 'radio', direction: 'horizontal' },
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Latest updates', subtitle: 'Latest updates (automatic)' }) },
})

export const imageTextSection = defineType({
  name: 'imageTextSection',
  title: 'Photo and text',
  type: 'object',
  fields: [
    labelField,
    headingField(),
    richText(),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Describe the photo', description: 'For people using screen readers, e.g. "Volunteers carrying a step up the Tooheys track"', type: 'string' }),
        defineField({ name: 'caption', type: 'string' }),
      ],
    }),
    defineField({ name: 'imageSide', title: 'Photo on the', type: 'string', initialValue: 'left', options: radio([{ title: 'Left', value: 'left' }, { title: 'Right', value: 'right' }]) }),
    defineField({
      name: 'look',
      title: 'Photo style',
      type: 'string',
      initialValue: 'frame',
      description: 'Cut-out: upload a PNG with the background removed (on iPhone, press and hold the person in Photos and tap Copy or Share). It shows in black and white on a colour shape, with the caption as a sticker.',
      options: radio([{ title: 'Framed photo', value: 'frame' }, { title: 'Cut-out on a shape', value: 'cutout' }]),
    }),
    defineField({
      name: 'shape',
      title: 'Shape colour',
      type: 'string',
      initialValue: 'wattle',
      hidden: ({ parent }) => parent?.look !== 'cutout',
      options: radio([{ title: 'Wattle', value: 'wattle' }, { title: 'Lichen', value: 'lichen' }, { title: 'Sandstone', value: 'sandstone' }, { title: 'Gum leaf', value: 'gum' }, { title: 'Moss', value: 'moss' }]),
    }),
    ...linkFields(),
  ],
  preview: { select: { title: 'heading', media: 'image' }, prepare: ({ title, media }) => ({ title: title || 'Photo and text', subtitle: 'Photo and text', media }) },
})

export const phonesSection = defineType({
  name: 'phonesSection',
  title: 'Phone screens (how it works)',
  type: 'object',
  description: 'A few numbered steps, each with an optional phone screenshot shown in a phone frame.',
  fields: [
    labelField,
    headingField(),
    defineField({ name: 'intro', type: 'text', rows: 2 }),
    defineField({
      name: 'logo',
      title: 'Logo above the heading (optional)',
      type: 'image',
      description: 'e.g. a partner logo. SVG or PNG with a see-through background.',
      fields: [defineField({ name: 'alt', title: 'Organisation name', type: 'string' })],
    }),
    defineField({
      name: 'screens',
      title: 'Steps',
      type: 'array',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'phoneScreen',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'body', title: 'Text', type: 'text', rows: 2 }),
            defineField({
              name: 'image',
              title: 'Phone screenshot (optional)',
              type: 'image',
              description: 'A tall phone screenshot. Without one, the step shows as a numbered circle.',
              fields: [defineField({ name: 'alt', title: 'Describe the screen', type: 'string' })],
            }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        }),
      ],
    }),
    ...linkFields(),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Phone screens', subtitle: 'Phone screens' }) },
})

export const formSection = defineType({
  name: 'formSection',
  title: 'Form (sign-up or contact)',
  type: 'object',
  description: 'Sign-up: name, email, suburb, what they want to help with. Contact: name, email, organisation, one topic and a message.',
  groups: [
    { name: 'words', title: 'Words', default: true },
    { name: 'sending', title: 'Where it sends' },
  ],
  fields: [
    defineField({
      name: 'kind',
      title: 'Kind of form',
      type: 'string',
      initialValue: 'signup',
      group: 'words',
      description: 'Links can pick the box for people: ?help=track-work on a sign-up form, ?topic=feedback on a contact form.',
      options: radio([{ title: 'Sign-up (tick what they can help with)', value: 'signup' }, { title: 'Contact (pick one topic, message required)', value: 'contact' }]),
    }),
    { ...labelField, group: 'words' },
    { ...headingField(), group: 'words' },
    defineField({ name: 'intro', type: 'text', rows: 3, group: 'words' }),
    defineField({
      name: 'interests',
      title: 'Things they can tick (sign-up) or topics (contact)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      group: 'words',
      description: 'Sign-up e.g. "Clean-up days", "Track work". Contact e.g. "General question", "Feedback".',
    }),
    defineField({ name: 'buttonLabel', title: 'Button text', type: 'string', initialValue: 'Count me in', group: 'words' }),
    defineField({ name: 'successHeading', title: 'After sending: big line', type: 'string', initialValue: 'Thanks, legend.', group: 'words' }),
    defineField({ name: 'successText', title: 'After sending: text', type: 'text', rows: 2, group: 'words' }),
    defineField({
      name: 'privacyNote',
      title: 'Small privacy line',
      type: 'string',
      group: 'words',
      initialValue: "We'll only use your details to get in touch about helping out. No spam, and you can ask us to delete them any time.",
    }),
    defineField({ name: 'anchor', title: 'Link name', description: 'Lets other pages link straight here, e.g. "sign-up" for /get-involved#sign-up', type: 'string', group: 'words' }),
    defineField({
      name: 'endpoint',
      title: 'Form service link',
      type: 'url',
      group: 'sending',
      description: 'From Formspree (https://formspree.io/f/…) or Web3Forms (https://api.web3forms.com/submit). Leave empty and the form opens a pre-filled email instead.',
    }),
    defineField({ name: 'accessKey', title: 'Access key', type: 'string', group: 'sending', description: 'Only for Web3Forms. Leave empty for Formspree.' }),
    defineField({ name: 'fallbackEmail', title: 'Backup email', type: 'string', group: 'sending', initialValue: 'hello@acaciaclimbing.org' }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Sign-up form', subtitle: 'Sign-up form' }) },
})

export const videoSection = defineType({
  name: 'videoSection',
  title: 'Video',
  type: 'object',
  fields: [
    labelField,
    headingField('heading', 'Heading (optional)'),
    defineField({ name: 'url', title: 'YouTube or Vimeo link', type: 'url', validation: (r) => r.required() }),
    defineField({ name: 'caption', type: 'string' }),
  ],
  preview: { select: { title: 'heading', subtitle: 'url' }, prepare: ({ title, subtitle }) => ({ title: title || 'Video', subtitle }) },
})

// Each block's row in a page's Sections list shows a small picture of the block
// (the same pictures as the Add item menu, in studio/static/blocks). A block with its
// own photo, like Photo and text, shows that instead.
const thumb = (type: string) => () =>
  createElement('img', { src: `/static/blocks/${type}.jpg`, alt: '', style: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' } })

function withThumb<T extends { name: string; preview?: any }>(t: T): T {
  if (t.name === 'card') return t
  const prepare = t.preview?.prepare
  return {
    ...t,
    preview: {
      ...t.preview,
      prepare: (value: any) => {
        const out = prepare ? prepare(value) : value
        return { ...out, media: out?.media ?? value?.media ?? thumb(t.name) }
      },
    },
  }
}

const rawSectionTypes = [
  heroSection,
  marqueeSection,
  tabsSection,
  textSection,
  card,
  cardsSection,
  stepsSection,
  statementSection,
  proseSection,
  timelineSection,
  peopleSection,
  ctaSection,
  cragRegisterSection,
  faqSection,
  factsSection,
  updatesSection,
  imageTextSection,
  phonesSection,
  videoSection,
  formSection,
]
export const sectionTypes = rawSectionTypes.map(withThumb)
export const sectionMembers = [
  'heroSection',
  'marqueeSection',
  'tabsSection',
  'textSection',
  'cardsSection',
  'stepsSection',
  'statementSection',
  'proseSection',
  'timelineSection',
  'peopleSection',
  'ctaSection',
  'cragRegisterSection',
  'imageTextSection',
  'phonesSection',
  'factsSection',
  'faqSection',
  'updatesSection',
  'videoSection',
  'formSection',
].map((type) => defineArrayMember({ type }))
