// src/app/(frontend)/components/LatestPosts.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Post } from '../../../payload-types'
import Image from 'next/image'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

const DEFAULT_LANG = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'

export default function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [langCode, setLangCode] = useState<LanguageCode>(DEFAULT_LANG)
  const langConfig = getLanguageConfig(langCode)

  const translations = {
    en: { noPosts: 'No posts found.', label: 'New' },
    he: { noPosts: 'לא נמצאו פוסטים.', label: 'חדש' },
    hr: { noPosts: 'Nema pronađenih postova.', label: 'Novo' },
  }
  const t = translations[langCode] || translations.en

  useEffect(() => {
    const currentLang = (localStorage.getItem('lang') as LanguageCode) || DEFAULT_LANG
    setLangCode(currentLang)
  }, [])

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-publishedAt&locale=${langConfig.locale}&fallback-locale=none`,
          { cache: 'no-store' },
        )
        const data = await res.json()
        const validPosts = (data.docs || [])
          .filter((p: Post) => p?.title && p?.publishedAt && p?.excerpt)
          .slice(0, 4)
        setPosts(validPosts)
      } catch (err) {
        console.error('Error fetching latest posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [langCode])

  if (loading) {
    return (
      <div className="space-y-4" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`group relative p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 animate-pulse ${
              langConfig.direction === 'rtl' ? 'space-x-reverse' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gray-300 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <p
        className="text-gray-500 text-center py-6"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </p>
    )
  }

  return (
    <div
      className="space-y-4 mt-5"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.slug}`}
          className={`group relative block p-4 rounded-2xl
                   bg-white/70 backdrop-blur-sm
                   shadow-sm hover:shadow-lg 
                   transition-all duration-300 hover:-translate-y-0.5
                   ring-1 ring-purple-300/30
                   ${langConfig.direction === 'rtl' ? 'space-x-reverse' : ''}`}
        >
          {/* Corner Label */}
          <div
            className={`absolute -top-1.5 ${
              langConfig.direction === 'rtl' ? '-right-1.5' : '-left-1.5'
            } px-1.5 py-0.5 
             bg-linear-to-r from-purple-500 to-indigo-500 
             text-white text-[9px] font-bold 
             rounded ${langConfig.direction === 'rtl' ? 'rounded-l' : 'rounded-r'} 
             shadow-sm z-10`}
          >
            {t.label}
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 line-clamp-2 text-sm sm:text-base transition-colors">
                {post.title}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1.5">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : ''}
              </p>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">{post.excerpt}</p>
            </div>
          </div>

          {/* Optional: Enhanced hover glow (uncomment if needed) */}
          {/* <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br from-purple-300/30 to-indigo-300/30 pointer-events-none" /> */}
        </Link>
      ))}
    </div>
  )
}
