// src/collections/Categories.ts

import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'image',
      type: 'upload', // This allows uploading images
      relationTo: 'media', // Assuming you have a 'media' collection for uploads
      required: false, // Optional, but recommended to make it required if you want all categories to have images
    },
  ],
}

export default Categories
