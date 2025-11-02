'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '../../../payload-types'
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
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-publishedAt&locale=${langConfig.locale}&fallback-locale=none&depth=1`,
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

  // 🌀 Loading skeletons
  if (loading) {
    return (
      <div className="space-y-4" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative p-4 rounded-2xl bg-white border-2 border-black
                       shadow-[2px_2px_0px_#00000066] animate-pulse
                       transition-all duration-200 ease-out active:translate-x-0.5 active:translate-y-0.5"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-xl border-2 border-black shadow-[2px_2px_0px_#00000066]"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 🚫 No posts
  if (posts.length === 0) {
    return (
      <p
        className="text-gray-600 text-center py-6"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </p>
    )
  }

  // ✅ Latest Posts list
  return (
    <div
      className="space-y-4 mt-5"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {posts.map((post, idx) => (
        <Link
          key={post.id}
          href={`/posts/${post.slug}`}
          className="group relative block p-3 rounded-2xl bg-white
                     border-2 border-black shadow-[2px_2px_0px_#00000066]
                     transition-all duration-200 ease-out
                     hover:-translate-y-[3px] hover:shadow-[2px_2px_0px_#00000066]
                     active:translate-x-0.5 active:translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            {/* 🖼️ Post Image */}
            <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl border-2 border-black shadow-[2px_2px_0px_#00000066]">
              {typeof post.image !== 'string' && post.image?.url ? (
                <Image
                  src={post.image.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* 📝 Text Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 line-clamp-2 text-sm sm:text-base transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-gray-700 text-xs mt-1 line-clamp-2">{post.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
