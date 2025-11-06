import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig } from 'payload'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Posts from './collections/Posts'
import Categories from './collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories],
  blocks: [
    // Add your blocks here
  ],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
        rtl: false,
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { en },
  },
  // payload.config.ts

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ['posts'],
      generateTitle: ({ doc }) => `Modern Web - ${doc?.title?.value || doc?.name?.value}`,
      generateDescription: ({ doc }) => doc?.excerpt?.value || doc?.metaDescription?.value,
      generateURL: ({ doc, collectionSlug }) => {
        if (collectionSlug === 'posts') {
          const defaultLocale = 'en'
          const docLocale = (doc as any)?.locale || defaultLocale

          let slug = ''
          try {
            const slugValue = (doc as any)?.slug?.value
            if (!slugValue) {
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
    vercelBlobStorage({
      cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
