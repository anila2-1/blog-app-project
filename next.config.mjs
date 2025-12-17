import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload does NOT support Turbopack in production
  turbopack: false,

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  transpilePackages: ['@payloadcms/richtext-lexical'],
  serverExternalPackages: ['@payloadcms/db-mongodb'],

  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
