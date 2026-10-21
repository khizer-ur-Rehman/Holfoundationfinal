import { defineField, defineType } from 'sanity';

export const instagramReel = defineType({
  name: 'instagramReel',
  title: 'Instagram Reel',
  type: 'document',
  icon: () => '🎬',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Headline or caption for the Reel card (e.g., "Learning in Lyari")',
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: 'reelUrl',
      title: 'Reel URL',
      type: 'url',
      description: 'Direct Instagram Reel URL (e.g., https://www.instagram.com/reel/DSUWtSODFv8/)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      description: 'Poster / cover image thumbnail for the Reel',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishStatus',
      title: 'Publish Status',
      type: 'string',
      description: 'Only items marked "Published" will appear on the live website',
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
      description: 'Controls this Reel’s position in the News page (1, 2, 3...)',
      initialValue: 1,
      validation: (Rule) => Rule.required().integer().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'reelUrl',
      status: 'publishStatus',
      order: 'displayOrder',
      media: 'thumbnail',
    },
    prepare({ title, url, status, order, media }) {
      const statusLabel = status ? `[${status.toUpperCase()}]` : '';
      const orderLabel = order ? `Order #${order}` : '';
      return {
        title: title || 'Untitled Reel',
        subtitle: [statusLabel, orderLabel, url].filter(Boolean).join(' • '),
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
    {
      title: 'Display Order (High to Low)',
      name: 'displayOrderDesc',
      by: [{ field: 'displayOrder', direction: 'desc' }],
    },
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
});
