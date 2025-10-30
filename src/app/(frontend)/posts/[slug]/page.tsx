// src/app/(frontend)/posts/[slug]/page.tsx

import { Post } from '../../../../payload-types'
import { getLanguageConfig, LanguageCode } from '@/config/languages'
import PostContent from '@/components/PostContent'
import Link from 'next/link'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

// --- SEO in <head> ---
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[slug][equals]=${slug}&locale=${langConfig.locale}&depth=1`,
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

  // safe category object: only keep it if API returned the relationship as an object
  const category = (() => {
    const rawCat = (post as any)?.category ?? (post as any)?.categories?.[0]
    return typeof rawCat === 'object' && rawCat ? rawCat : undefined
  })()
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
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[slug][equals]=${slug}&locale=${langConfig.locale}&depth=1&fallback-locale=none`,
    { cache: 'no-store' },
  )
  const data = await res.json()
  const post: Post = data.docs?.[0]

  // safe category object: only keep it if the relationship returned an object
  const category = (() => {
    const rawCat = (post as any)?.category ?? (post as any)?.categories?.[0]
    return typeof rawCat === 'object' && rawCat ? rawCat : undefined
  })()

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
      className="max-w-4xl mx-auto p-6"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <article>
        {/* compute a safe category object only if the relationship returned an object */}
        {category && (
          <div className="flex justify-center mb-8">
            <Link
              href={`/categories/${category.slug}`}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 border border-indigo-200/50 hover:border-indigo-300/70 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color || '#4F46E5' }}
              ></span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-800 transition-colors">
                {category.title}
              </span>
              <svg
                className="w-4 h-4 text-gray-500 group-hover:text-indigo-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
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
