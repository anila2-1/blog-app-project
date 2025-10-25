// src/app/(frontend)/posts/[slug]/page.tsx

import { Post } from '../../../../payload-types'
import { getLanguageConfig, LanguageCode } from '@/config/languages'
import PostContent from '@/components/PostContent'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

// --- SEO in <head> ---
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[slug][equals]=${slug}&locale=${langConfig.locale}`,
    { cache: 'no-store' },
  )
  const data = await res.json()
  const post: Post = data.docs?.[0]

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist or was removed.',
    }
  }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

// --- Page Body ---
export default async function SinglePostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[slug][equals]=${slug}&locale=${langConfig.locale}`,
    { cache: 'no-store' },
  )
  const data = await res.json()
  const post: Post = data.docs?.[0]

  if (!post) {
    return (
      <main
        className="max-w-3xl mx-auto p-6 text-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <p className="text-gray-600">Post not found.</p>
      </main>
    )
  }

  return (
    <main
      className="max-w-3xl mx-auto p-6"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <article>
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-6">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString(langConfig.locale)
            : 'N/A'}
        </p>

        {/* ✅ Client Component for RichText + View Tracking */}
        <PostContent post={post} />
      </article>
    </main>
  )
}
