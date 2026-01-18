// src/app/news-sitemap.xml/route.ts

export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getPayload } from '@/lib/payload'

export async function GET(request: NextRequest) {
  const payload = await getPayload()

  // Calculate date 48 hours ago
  const fortyEightHoursAgo = new Date()
  fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48)

  const posts = await payload.find({
    collection: 'posts',
    limit: 10000,
    where: {
      publishedAt: {
        greater_than_equal: fortyEightHoursAgo.toISOString(),
      },
      _status: {
        equals: 'published',
      },
    },
  })

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://saznajhr.com'

  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${posts.docs
    .map(
      (post: any) => `
  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
    <news:news>
      <news:publication>
        <news:name>${baseUrl}</news:name>
        <news:language>hr</news:language>
      </news:publication>
      <news:title>${post.title}</news:title>
      <news:publication_date>${new Date(post.publishedAt).toISOString()}</news:publication_date>
      <news:genres>Blog</news:genres>
    </news:news>
  </url>`,
    )
    .join('')}
</urlset>`

  return new Response(newsSitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
