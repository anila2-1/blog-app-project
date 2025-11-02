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
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            // Auto-generate slug from name if not provided
            return (
              data?.name
                ?.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '') || ''
            )
          },
        ],
      },
    },
  ],
}

export default Categories
