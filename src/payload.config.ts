import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Posts from './collections/Posts'
import Categories from './collections/Categories'
import { Archive } from './blocks/ArchiveBlock/config'
import { Banner } from './blocks/Banner/config'
import { CallToAction } from './blocks/CallToAction/config'
import { Code } from './blocks/Code/config'
import { Content } from './blocks/Content/config'
import { FormBlock } from './blocks/Form/config'
import { MediaBlock } from './blocks/MediaBlock/config'

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
  blocks: [Archive, Banner, CallToAction, Code, Content, MediaBlock],
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
    // storage-adapter-placeholder
  ],
})
