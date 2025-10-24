// src/app/(frontend)/components/MostViewedPosts.tsx
'use client'

import { useEffect, useState } from 'react'
import { Post } from '../../../payload-types'
import PostCard from './PostCard'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

// Get language from .env (build-time constant)
const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'

// Use shared config for direction, font, and full locale (e.g., 'he-IL')
const langConfig = getLanguageConfig(LANG_CODE)

// Translations for static UI text
const translations = {
  en: { noPosts: 'No posts found.' },
  he: { noPosts: 'לא נמצאו פוסטים.' },
  hr: { noPosts: 'Nema pronađenih postova.' },
}

const t = translations[LANG_CODE] || translations.en

export default function MostViewedPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-views&limit=3&locale=${langConfig.locale}`,
        )
        const data = await res.json()
        setPosts(data.docs || [])
      } catch (err) {
        console.error('Error fetching most viewed posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, []) // Runs once — no dependency

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
      className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          locale={langConfig.locale} // Pass full locale like 'he-IL'
        />
      ))}
    </div>
  )
}
