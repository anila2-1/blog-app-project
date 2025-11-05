// next.config.js
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only transpile packages that use modern syntax (like Lexical)
  transpilePackages: ['@payloadcms/richtext-lexical'],

  // Optional: pass public env vars (but prefer NEXT_PUBLIC_* in .env)
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  },

  // Critical: Prevent bundling of native/server-only modules
  experimental: {
    serverComponentsExternalPackages: ['@payloadcms/db-mongodb'],
  },

  // Keep webpack minimal unless you have a specific need
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-only: ensure MongoDB is not imported
    }
    return config
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false, // correct for production
})
