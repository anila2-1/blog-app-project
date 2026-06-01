// =============================================================================
// POSTS COLLECTION - Blog Posts Content Model
// =============================================================================
// This defines the schema for blog posts in the CMS.
// Each post has:
// - title, slug, excerpt, content (localized for multi-language support)
// - image (featured image from Media collection)
// - publishedAt (publication date)
// - featured, pinned (flags for display priority)
// - views (view counter)
// - category (relationship to Categories collection)
// =============================================================================

import { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical'

import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { VideoBlock } from '@/blocks/VideoBlock/config'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', 'pinned', 'views', 'publishedAt', 'author'],
  },
  access: {
    read: () => true,
    update: () => true,
  },
  versions: {
    drafts: true, // <-- Enable drafts
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    // URL-friendly identifier - unique across all posts
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    // Short summary for SEO and previews
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
    },
    // Main content - Rich Text Editor (Lexical) with blocks support
    // Supports: Headings, Code blocks, Media, Video, Tables
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          BlocksFeature({ blocks: [Banner, Code, MediaBlock, VideoBlock] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
          EXPERIMENTAL_TableFeature(),
        ],
      }),
      required: true,
    },
    // Featured image - uploaded to Media collection
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    // Publication date
    {
      name: 'publishedAt',
      type: 'date',
      localized: true,
      admin: { position: 'sidebar' },
    },
    // Featured flag - shows post in featured section
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    // Pinned flag - keeps post at top of lists
    {
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    // View counter - tracks popularity
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    // Category - organizes posts
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Posts
