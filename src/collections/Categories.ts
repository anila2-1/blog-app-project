// =============================================================================
// CATEGORIES COLLECTION - Post categories/organization
// =============================================================================
// Each category has:
// - name: Display name (localized for multi-language)
// - slug: URL-friendly identifier
// - image: Optional category image
// =============================================================================

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
    // Category name - displayed in navigation and lists (localized)
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    // URL slug - used in category page URLs
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    // Optional category image - displayed in category cards
    {
      name: 'image',
      type: 'upload', // This allows uploading images
      relationTo: 'media', // Assuming you have a 'media' collection for uploads
      required: false, // Optional, but recommended to make it required if you want all categories to have images
    },
  ],
}

export default Categories
