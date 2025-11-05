import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Payload + Next.js compatibility in monorepos
  experimental: {
    serverComponentsExternalPackages: ['@payloadcms/db-mongodb', '@payloadcms/plugin-nested-docs'],
  },

  // Transpile Payload-related packages that use modern JS/TS
  transpilePackages: [
    '@payloadcms/richtext-lexical',
    '@payloadcms/ui',
    '@payloadcms/next', // sometimes needed
  ],

  // Webpack config fixes for TypeScript + ESM/CJS interop
  webpack: (config, { dev, isServer }) => {
    // Only apply aliasing if needed—often unnecessary in Next.js 13+
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
    }

    // Important: Do not bundle MongoDB driver in serverless environments
    if (!dev && isServer) {
      config.externals = [...(config.externals || []), 'mongodb']
    }

    return config
  },

  // Pass through necessary env vars (only public ones via NEXT_PUBLIC_*)
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  },
}

export default withPayload(nextConfig, {
  // Recommended for production builds; set to true only in dev if needed
  devBundleServerPackages: false,
})
