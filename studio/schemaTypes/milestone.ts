import { defineField, defineType } from 'sanity'

// One step in a crag's access pathway. Stored inside each crag so the order is editable by drag and drop.
export const milestone = defineType({
  name: 'milestone',
  title: 'Milestone',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Step', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'status',
      type: 'string',
      initialValue: 'todo',
      options: {
        list: [
          { title: 'Done', value: 'done' },
          { title: 'In progress', value: 'progress' },
          { title: 'To do', value: 'todo' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'text', status: 'status' },
    prepare: ({ title, status }) => ({
      title,
      subtitle: status === 'done' ? '✓ Done' : status === 'progress' ? '◐ In progress' : '○ To do',
    }),
  },
})
