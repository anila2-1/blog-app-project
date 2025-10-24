// src/app/(frontend)/posts/page.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Post } from '../../../payload-types'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

// Get language from .env (build-time constant)
const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

// Translations
const translations = {
  en: {
    pageTitle: 'Posts',
    noPostsTitle: 'No posts found',
    noPostsMessage: 'No blog posts are available for the selected language.',
  },
  he: {
    pageTitle: 'פוסטים',
    noPostsTitle: 'לא נמצאו פוסטים',
    noPostsMessage: 'אין פוסטים זמינים לשפה שנבחרה.',
  },
  hr: {
    pageTitle: 'Postovi',
    noPostsTitle: 'Nema postova',
    noPostsMessage: 'Nema dostupnih blog postova za odabranu jeziku.',
  },
}

const t = translations[LANG_CODE] || translations.en

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?locale=${langConfig.locale}`,
        )
        const data = await res.json()

        const validPosts = (data.docs || []).filter(
          (p: any) =>
            p?.title?.trim() !== '' &&
            (p.excerpt?.trim() !== '' || (p.content && p.content.length > 0)),
        )

        setPosts(validPosts)
      } catch (err) {
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, []) // Runs once — no dependency

  if (loading) {
    return (
      <main
        className="max-w-5xl mx-auto py-10"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-5">
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (posts.length === 0) {
    return (
      <main
        className="max-w-5xl mx-auto py-10 text-center text-gray-600"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <h1 className="text-2xl font-semibold mb-2">{t.noPostsTitle}</h1>
        <p>{t.noPostsMessage}</p>
      </main>
    )
  }

  return (
    <main
      className="max-w-5xl mx-auto py-10"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <h1 className="text-3xl font-semibold mb-6">
        {t.pageTitle} ({langConfig.code.toUpperCase()})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            href={`/posts/${post.slug}`}
            key={post.id}
            className="border rounded-lg p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString(langConfig.locale)
                : ''}
            </p>
            <p className="text-gray-700 line-clamp-3">
              {post.excerpt ||
                (post.content?.[0] as { children?: Array<{ text?: string }> })?.children?.[0]
                  ?.text ||
                ''}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
