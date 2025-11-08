// src/app/(frontend)/posts/[slug]/page.tsx

import { Post } from '../../../payload-types'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'
import PostContent from '@/components/PostContent'
import Link from 'next/link'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawCat = (post as any)?.category ?? (post as any)?.categories?.[0]
    return typeof rawCat === 'object' && rawCat ? rawCat : undefined
  })()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (post as any).seo
  const title = seo?.metaTitle || post.title
  const description = seo?.metaDescription || post.excerpt
  const categorySuffix = category ? ` | Category: ${category.name || category.title}` : ''
  const fullDescription = `${description}${categorySuffix}`

  return {
    title,
    description: fullDescription,
    openGraph: {
      title,
      description: fullDescription,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${post.slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description: fullDescription,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let category: any = (() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawCat = (post as any)?.category ?? (post as any)?.categories?.[0]
    return typeof rawCat === 'object' && rawCat ? rawCat : undefined
  })()

  // If we don't have a populated category object but we do have an id, fetch it server-side.
  if (!category) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawCatId = (post as any)?.category ?? (post as any)?.categories?.[0]
      if (rawCatId && (typeof rawCatId === 'string' || typeof rawCatId === 'number')) {
        const catRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?where[id][equals]=${rawCatId}&locale=${langConfig.locale}&fallback-locale=none`,
          { cache: 'no-store' },
        )
        const catData = await catRes.json()
        category = catData.docs?.[0]
      }
    } catch (err) {
      // ignore — we'll just not render the category pill if this fails
      console.error('Failed to fetch category by id', err)
    }
  }

  if (!post) {
    return (
      <main
        className="max-w-4xl mx-auto p-6 text-center"
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
        {category && typeof category.slug === 'string' && category.slug.trim() !== '' && (
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
                {category.name || category.title}
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

        {/* ✅ Client Component for RichText + View Tracking */}

        <PostContent post={post} />
      </article>
    </main>
  )
}
