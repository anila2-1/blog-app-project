'use client'

import { useEffect, useState } from 'react'
import { Post } from '../../../payload-types'
import PostCard from './PostCard'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { noPosts: 'No popular posts yet.', loading: 'Loading popular posts...' },
  he: { noPosts: 'אין פוסטים פופולריים עדיין.', loading: 'טוען פוסטים פופולריים...' },
  hr: { noPosts: 'Još nema popularnih postova.', loading: 'Učitavanje popularnih postova...' },
}

const t = translations[LANG_CODE] || translations.en

export default function MostViewedPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // ✅ Fetch all posts sorted by views
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-views&locale=${langConfig.locale}&fallback-locale=none`,
          { cache: 'no-store' },
        )
        const data = await res.json()

        // ✅ Only valid posts with required fields
        const validPosts = (data.docs || []).filter(
          (p: Post) => p?.title && p?.slug && typeof p.image !== 'string' && p.image?.url,
        )

        setPosts(validPosts.slice(0, 3)) // top 3 most viewed
      } catch (err) {
        console.error('Error fetching most viewed posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // ✅ Loading skeleton (like pinned posts)
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-50 p-4 rounded animate-pulse">
            <div className="h-32 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!posts.length) {
    return (
      <p
        className="text-gray-500 text-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </p>
    )
  }

  // ✅ Adaptive grid
  const gridClass =
    posts.length === 1
      ? 'grid-cols-1'
      : posts.length === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-3'

  return (
    <div
      className={`grid gap-6 mt-5 ${gridClass}`}
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {posts.map((post, i) => (
        <div
          key={post.id}
          className="opacity-0 animate-fadeIn"
          style={{
            animationDelay: `${i * 150}ms`,
            animationFillMode: 'forwards',
          }}
        >
          <PostCard post={post} locale={langConfig.locale} />
        </div>
      ))}
    </div>
  )
}
