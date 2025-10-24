// src/collections/Posts.ts

import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', 'pinned', 'views', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      localized: true,
      admin: { position: 'sidebar' },
    },

    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },

    // // For "Most Viewed" — optional, but useful for analytics
    // {
    //   name: 'views',
    //   type: 'number',
    //   defaultValue: 0,
    //   admin: {
    //     position: 'sidebar',
    //   },
    // },

    // Categories"
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories', // ← you'll need to create this collection
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Posts
