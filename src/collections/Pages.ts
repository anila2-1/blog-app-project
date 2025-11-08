// src/collections/Pages.ts
import { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  // BlocksFeature,
  lexicalEditor,
  EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical'
const Pages: CollectionConfig = {
  slug: 'pages',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    group: 'Page',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      required: true,
      admin: {
        description: 'Page title is very important for SEO',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          EXPERIMENTAL_TableFeature(),
          // BlocksFeature(),
        ],
      }),
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL Unique Identifier (e.g. "about", "contact")',
        position: 'sidebar',
      },
    },

    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Google search results in Title (60 characters tak)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Meta Description (160 characters tak)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image (1200x630)',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.slug && data.title) {
          // Auto-generate slug from title
          const slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
          return { ...data, slug }
        }
        return data
      },
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  timestamps: true,
}

export default Pages
