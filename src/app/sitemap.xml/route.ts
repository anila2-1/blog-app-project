export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getPayload } from '@/lib/payload'

export async function GET(request: NextRequest) {
  const payload = await getPayload()

  const posts = await payload.find({
    collection: 'posts',
    limit: 10000,
    where: {
      publishedAt: {
        less_than: new Date().toISOString(),
      },
    },
  })

  const categories = await payload.find({
    collection: 'categories',
    limit: 10000,
  })

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts.docs
    .map(
      (post: any) => `
  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join('')}
  ${categories.docs
    .map(
      (category: any) => `
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${new Date(category.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
