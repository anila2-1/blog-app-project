import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  serverExternalPackages: ['@payloadcms/db-mongodb', 'mongoose'],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
