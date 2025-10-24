// src/app/(frontend)/posts/[slug]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Post } from '../../../../payload-types'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

// Get language from .env (build-time constant)
const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

export default function SinglePostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    async function fetchPost() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[slug][equals]=${slug}&locale=${langConfig.locale}`,
        )
        const data = await res.json()
        if (data.docs?.[0]) {
          setPost(data.docs[0])
        }
      } catch (err) {
        console.error('Error fetching post:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug]) // Only re-fetch if slug changes

  if (loading) {
    return (
      <main
        className="max-w-3xl mx-auto p-6"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </main>
    )
  }

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

  // Helper to format text with styling
  const formatText = (text: string, node: any) => {
    if (node.bold && node.italic) {
      return (
        <strong>
          <em>{text}</em>
        </strong>
      )
    }
    if (node.bold) {
      return <strong>{text}</strong>
    }
    if (node.italic) {
      return <em>{text}</em>
    }
    return text
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

        <div className="space-y-4">
          {post.content?.root?.children?.map((block: any, i: number) => {
            if (!block.children?.length) return null

            const firstChild = block.children[0]
            const firstChildText = firstChild?.text || ''

            // Handle headings (e.g., "Introduction:" or "Section 1:")
            if (firstChildText.endsWith(':') || /^Section \d+/.test(firstChildText)) {
              const headingText = firstChildText.replace(/:$/, '')
              return (
                <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                  {headingText}
                </h2>
              )
            }

            // Handle regular paragraphs
            return (
              <p key={i} className="mb-4 leading-relaxed text-gray-800">
                {block.children.map((child: any, j: number) => {
                  if (!child?.text) return null
                  return <span key={j}>{formatText(child.text, child)}</span>
                })}
              </p>
            )
          })}
        </div>
      </article>
    </main>
  )
}
