// src/app/(frontend)/components/PinnedPosts.tsx

'use client'

import { useEffect, useState } from 'react'
import { Post } from '../../../payload-types'
import PostCard from './PostCard'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { noPosts: 'No pinned posts found.' },
  he: { noPosts: 'לא נמצאו פוסטים מוצמדים.' },
  hr: { noPosts: 'Nema prikvačenih postova.' },
}

const t = translations[LANG_CODE] || translations.en

export default function PinnedPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // ✅ Fetch ALL pinned posts (no limit)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[pinned][equals]=true&locale=${langConfig.locale}&fallback-locale=none&depth=1`,
        )
        const data = await res.json()

        // ✅ Filter: Only posts with required fields in current locale
        const validPosts = (data.docs || []).filter(
          (p: Post) => p?.title && p?.publishedAt && p?.excerpt,
        )

        // Optional: Limit to max 3 (but only valid ones)
        setPosts(validPosts.slice(0, 3))
      } catch (err) {
        console.error('Error fetching pinned posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    // ✅ Show dynamic skeleton count (max 3, but not fixed layout)
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {/* Show up to 3 skeletons, but they'll collapse if fewer posts exist */}
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

  if (posts.length === 0) {
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

  return (
    <div
      className={`grid gap-5 mt-5 ${
        posts.length === 1
          ? 'grid-cols-1'
          : posts.length === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-3'
      }`}
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} locale={langConfig.locale} />
      ))}
    </div>
  )
}
