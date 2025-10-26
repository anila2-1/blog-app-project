// src/app/(frontend)/components/FeaturedPost.tsx
'use client'

import { useEffect, useState } from 'react'
import { Post } from '../../../payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { readMore: 'Read More →', noPosts: 'No featured posts available.' },
  he: { readMore: 'קרא עוד ←', noPosts: 'אין פוסטים בתג המומלצים.' },
  hr: { readMore: 'Pročitaj više →', noPosts: 'Nema istaknutih postova.' },
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

  if (loading) {
    return (
      <div
        className="h-96 w-full rounded-3xl bg-linear-to-r from-gray-100 to-gray-200 animate-pulse"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      />
    )
  }

  if (posts.length === 0) {
    return (
      <div
        className="bg-yellow-50 p-6 rounded-xl text-center text-yellow-700 font-medium"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </div>
    )
  }

  const currentPost = posts[currentIndex]

  // ✅ Fix: Handle both string and object image types safely
  const imageUrl =
    typeof currentPost.image === 'string'
      ? currentPost.image
      : currentPost.image?.url || '/placeholder.jpg'

  return (
    <div
      className="relative overflow-hidden rounded-3xl mt-5 shadow-2xl ring-1 ring-black/5 group"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* Gradient background glow */}
      <div className="absolute inset-0 bg-linear-to-tr from-pink-200 via-indigo-100 to-blue-200 opacity-40 blur-2xl -z-10"></div>

      {/* Image with fade animation */}
      <div className="relative h-[380px] sm:h-[450px] w-full overflow-hidden rounded-3xl">
        <div
          key={currentIndex}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        >
          <Image
            src={imageUrl}
            alt={currentPost.title || 'Featured Post'}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold drop-shadow-md mb-3 animate-fadeInUp">
          {currentPost.title}
        </h2>
        <p className="text-base sm:text-lg opacity-90 mb-6 max-w-2xl animate-fadeInUp delay-200">
          {currentPost.excerpt}
        </p>
        <Link
          href={`/posts/${currentPost.slug}`}
          className="inline-block bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:tracking-wider"
        >
          {t.readMore}
        </Link>
      </div>

      {/* Navigation Arrows */}
      {posts.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((p) => (p === 0 ? posts.length - 1 : p - 1))}
            className={`absolute top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full shadow-lg border border-white/10 transition-all duration-300 hover:shadow-pink-500/30 hover:shadow-xl ${
              langConfig.direction === 'rtl' ? 'right-5' : 'left-5'
            }`}
            aria-label="Previous post"
          >
            {langConfig.direction === 'rtl' ? (
              <ChevronRight size={22} />
            ) : (
              <ChevronLeft size={22} />
            )}
          </button>
          <button
            onClick={() => setCurrentIndex((p) => (p === posts.length - 1 ? 0 : p + 1))}
            className={`absolute top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full shadow-lg border border-white/10 transition-all duration-300 hover:shadow-pink-500/30 hover:shadow-xl ${
              langConfig.direction === 'rtl' ? 'left-5' : 'right-5'
            }`}
            aria-label="Next post"
          >
            {langConfig.direction === 'rtl' ? (
              <ChevronLeft size={22} />
            ) : (
              <ChevronRight size={22} />
            )}
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <div
          className={`absolute bottom-5 ${
            langConfig.direction === 'rtl'
              ? 'right-1/2 translate-x-1/2'
              : 'left-1/2 -translate-x-1/2'
          } flex gap-2`}
          style={{ direction: 'ltr' }} // Keep dots LTR for consistent spacing
        >
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-white w-6 rounded-full' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
