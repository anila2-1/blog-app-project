// src/app/(frontend)/components/FeaturedPost.tsx
'use client'

import { useEffect, useState } from 'react'
import { Post } from '../../../payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

// Get language from .env (build-time)
const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

// Translations (you still need this — your config doesn’t include text)
const translations = {
  en: {
    readMore: 'Read More →',
    noPosts: 'No featured posts available.',
  },
  he: {
    readMore: 'קרא עוד ←',
    noPosts: 'אין פוסטים בתג המומלצים.',
  },
  hr: {
    readMore: 'Pročitaj više →',
    noPosts: 'Nema istaknutih postova.',
  },
}

const t = translations[LANG_CODE] || translations.en

export default function FeaturedPost() {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedPosts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[featured][equals]=true&sort=-publishedAt&limit=3&locale=${langConfig.locale}`,
        )
        const data = await res.json()
        const validPosts = (data.docs || []).filter(
          (p: any) => p?.title?.trim() && p?.excerpt?.trim() && p?.image && p?.slug,
        )
        setPosts(validPosts)
      } catch (err) {
        console.error('Error fetching featured posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedPosts()
  }, [])

  // ... rest of your logic (goToPrev, goToNext, etc.)

  if (loading) {
    return (
      <div
        className="bg-gray-50 p-8 rounded-xl animate-pulse h-96 flex flex-col justify-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {/* skeleton */}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div
        className="bg-yellow-50 border-l-4 p-6 rounded-xl"
        style={{
          borderLeftColor: langConfig.direction === 'rtl' ? undefined : '#fbbf24',
          borderRightColor: langConfig.direction === 'rtl' ? '#fbbf24' : undefined,
          fontFamily: langConfig.font,
        }}
        dir={langConfig.direction}
      >
        <p className="text-yellow-700 text-center">{t.noPosts}</p>
      </div>
    )
  }

  const currentPost = posts[currentIndex]

  return (
    <div
      className="relative bg-white rounded-xl shadow-md overflow-hidden group"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* Image */}
      {currentPost.image && typeof currentPost.image === 'object' && (
        <div className="relative h-64 sm:h-80">
          <Image
            src={currentPost.image.url || '/placeholder.jpg'}
            alt={currentPost.title || 'Featured Post'}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500"
          />
        </div>
      )}
      {/* Content */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 line-clamp-2">{currentPost.title}</h2>
        <p className="mb-4 line-clamp-2 opacity-90">{currentPost.excerpt}</p>
        <Link
          href={`/posts/${currentPost.slug}`}
          className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors w-fit"
        >
          {t.readMore}
        </Link>
      </div>

      {/* Arrows & dots — same as before, using langConfig.direction */}
      {posts.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((p) => (p === 0 ? posts.length - 1 : p - 1))}
            className={`absolute top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
              langConfig.direction === 'rtl' ? 'right-4' : 'left-4'
            }`}
            aria-label="Previous"
          >
            {langConfig.direction === 'rtl' ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
          <button
            onClick={() => setCurrentIndex((p) => (p === posts.length - 1 ? 0 : p + 1))}
            className={`absolute top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
              langConfig.direction === 'rtl' ? 'left-4' : 'right-4'
            }`}
            aria-label="Next"
          >
            {langConfig.direction === 'rtl' ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          <div
            className={`absolute bottom-4 ${
              langConfig.direction === 'rtl'
                ? 'right-1/2 translate-x-1/2'
                : 'left-1/2 -translate-x-1/2'
            } flex space-x-2`}
            style={{ direction: 'ltr' }}
          >
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
