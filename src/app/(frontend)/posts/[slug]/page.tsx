// src/app/(frontend)/posts/[slug]/page.tsx

import { Post } from '../../../../payload-types'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

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
      <main className="max-w-3xl mx-auto p-6 text-center">
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

        {typeof post.image === 'object' && post.image?.url && (
          <img
            src={post.image.url}
            alt={post.title}
            className="rounded-xl mb-6 w-full object-cover"
          />
        )}

        <div className="space-y-4">
          {post.content?.root?.children?.map((block: any, i: number) => {
            if (!block.children?.length) return null

            const firstChild = block.children[0]
            const firstChildText = firstChild?.text || ''

            if (firstChildText.endsWith(':') || /^Section \d+/.test(firstChildText)) {
              const headingText = firstChildText.replace(/:$/, '')
              return (
                <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                  {headingText}
                </h2>
              )
            }

            return (
              <p key={i} className="mb-4 leading-relaxed text-gray-800">
                {block.children.map((child: any, j: number) => {
                  if (!child?.text) return null
                  if (child.bold && child.italic)
                    return (
                      <strong key={j}>
                        <em>{child.text}</em>
                      </strong>
                    )
                  if (child.bold) return <strong key={j}>{child.text}</strong>
                  if (child.italic) return <em key={j}>{child.text}</em>
                  return <span key={j}>{child.text}</span>
                })}
              </p>
            )
          })}
        </div>
      </article>
    </main>
  )
}
