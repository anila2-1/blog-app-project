// src/app/(frontend)/components/LatestPosts.tsx
'use client'

import { useEffect, useState } from 'react'
import { Post } from '../../../payload-types'
import Image from 'next/image'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

// Get language code from .env (build-time constant)
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

export default function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Use full locale like 'he-IL' for API
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-publishedAt&limit=4&locale=${langConfig.locale}`,
        )
        const data = await res.json()
        setPosts(data.docs || [])
      } catch (err) {
        console.error('Error fetching latest posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, []) // Runs once — no dependency

  if (loading) {
    return (
      <div className="space-y-4" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex items-start p-4 bg-gray-50 rounded animate-pulse ${
              langConfig.direction === 'rtl' ? 'space-x-reverse space-x-4' : 'space-x-4'
            }`}
          >
            <div className="w-12 h-12 bg-gray-300 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <p
        className="text-gray-500"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </p>
    )
  }

  return (
    <div className="space-y-4" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
      {posts.map((post) => (
        <div
          key={post.id}
          className={`flex items-start p-4 bg-white rounded-lg shadow ${
            langConfig.direction === 'rtl' ? 'space-x-reverse space-x-4' : 'space-x-4'
          }`}
        >
          {post.image && typeof post.image === 'object' && (
            <div className="w-16 h-16 shrink-0 rounded overflow-hidden">
              <Image
                src={post.image.url || '/placeholder.jpg'}
                alt={post.title || 'Post'}
                width={64}
                height={64}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-2">{post.title}</h3>
            <p className="text-xs text-gray-500 mt-2">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString(langConfig.locale)
                : 'N/A'}
            </p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
