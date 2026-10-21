import { defineField, defineType } from 'sanity';

export const heroBanner = defineType({
  name: 'heroBanner',
  title: 'Home Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(240),
    }),
    defineField({
      name: 'desktopImage',
      title: 'Desktop Banner Image',
      type: 'image',
      description: 'Wide image shown on desktop screens.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Banner Image',
      type: 'image',
      description: 'Optional portrait or mobile-specific crop. Desktop image is used if this is empty.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mobileImagePosition',
      title: 'Mobile Image Position',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Description (Accessibility)',
      type: 'string',
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: 'publishStatus',
      title: 'Publish Status',
      type: 'string',
      initialValue: 'published',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft', value: 'draft' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first: 1, 2, 3…',
      initialValue: 1,
      validation: (Rule) => Rule.required().integer().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'publishStatus',
      order: 'displayOrder',
      media: 'desktopImage',
    },
    prepare({ title, status, order, media }) {
      return {
        title: title || 'Untitled home banner',
        subtitle: `${status || 'draft'} · Order #${order || 1}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order (Low to High)',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
});
