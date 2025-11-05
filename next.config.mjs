import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Payload-related packages that use modern JS/TS
  transpilePackages: [
    '@payloadcms/richtext-lexical',
    '@payloadcms/ui',
    '@payloadcms/next', // sometimes needed
  ],

  // Webpack config fixes for TypeScript + ESM/CJS interop
  webpack: (config) => {
    // Only apply aliasing if needed—often unnecessary in Next.js 13+
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
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
