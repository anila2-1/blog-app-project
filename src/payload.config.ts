import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { defaultLexical } from './fields/defaultLexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig } from 'payload'
import { en } from '@payloadcms/translations/languages/en'

import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Posts from './collections/Posts/Posts'
import Categories from './collections/Categories'

import { Code } from './blocks/Code/config'
import { Content } from './blocks/Content/config'
import { MediaBlock } from './blocks/MediaBlock/config'
import { VideoBlock } from './blocks/VideoBlock/config'

import SiteSettings from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories], // Add Pages to collections
  globals: [SiteSettings],
  blocks: [Code, Content, MediaBlock, VideoBlock],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
        rtl: false,
      },
    ],
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LANG || 'en',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { en },
  },
  // payload.config.ts

  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder

    payloadCloudPlugin(),
    seoPlugin({
      collections: ['posts'],
      generateTitle: ({ doc }) => `Modern Web - ${doc?.title?.value || doc?.name?.value}`,
      generateDescription: ({ doc }) => doc?.excerpt?.value || doc?.metaDescription?.value,
      generateURL: ({ doc, collectionSlug }) => {
        if (collectionSlug === 'posts') {
          const defaultLocale = 'en'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const docLocale = (doc as any)?.locale || defaultLocale

          let slug = ''
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const slugValue = (doc as any)?.slug?.value
            if (!slugValue) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              slug = (doc as any)?.slug || ''
            } else if (typeof slugValue === 'string') {
              slug = slugValue
            } else if (typeof slugValue === 'object') {
              slug =
                slugValue[docLocale] ??
                slugValue[defaultLocale] ??
                Object.values(slugValue)[0] ??
                ''
            } else {
              slug = String(slugValue)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            slug = ''
          }

          if (docLocale && docLocale !== defaultLocale && slug) {
            return `/${docLocale}/${slug}`
          }
          return `/${slug}`
        }

        return '/'
      },
    }),
  ],
})
