// src/app/(frontend)/components/FeaturedPost.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { Post } from '../../../payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { readMore: 'Continue Reading →', noPosts: 'No featured posts available.' },
  he: { readMore: 'המשך קריאה ←', noPosts: 'אין פוסטים בתג המומלצים.' },
  hr: { readMore: 'Nastavi čitanje →', noPosts: 'Nema istaknutih postova.' },
}

const t = translations[LANG_CODE] || translations.en

export default function FeaturedPost() {
  // ✅ ALL HOOKS AT THE TOP — NO EXCEPTIONS
  const [posts, setPosts] = useState<Post[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // ✅ This useEffect must be BEFORE any return
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 400)
    return () => clearTimeout(timer)
  }, [currentIndex])

  // ✅ Data fetching useEffect
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

  // ✅ Now it's safe to return early
  if (loading) {
    return (
      <div
        className="h-64 sm:h-80 w-full rounded-2xl bg-gray-50 animate-pulse flex items-center justify-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
      </div>
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

  const goToPrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1))
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1))
  }

  const translateX = -(currentIndex * 100)

  return (
    <div className="mb-10" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
      {/* Slider Track */}
      <div
        ref={containerRef}
        className="flex transition-transform duration-400 ease-out"
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {posts.map((post, index) => {
          const imageUrl =
            typeof post.image === 'string' ? post.image : post.image?.url || '/placeholder.jpg'

          return (
            <div key={index} className="w-full shrink-0">
              <div className="flex flex-col sm:flex-row gap-5 p-5 sm:p-6">
                {/* Image */}
                <div className="sm:w-1/2 shrink-0">
                  <div className="relative h-48 sm:h-60 rounded-xl overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.title || 'Featured Post'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="sm:w-1/2 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/posts/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-950 hover:text-purple-800 transition-colors"
                  >
                    {t.readMore}
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Arrows */}
      {posts.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            disabled={isAnimating}
            className={`absolute top-1/2 -translate-y-1/2 ${
              langConfig.direction === 'rtl' ? 'right-4' : 'left-4'
            } w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 ${
              isAnimating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Previous post"
          >
            {langConfig.direction === 'rtl' ? (
              <ChevronRight size={20} strokeWidth={2} />
            ) : (
              <ChevronLeft size={20} strokeWidth={2} />
            )}
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className={`absolute top-1/2 -translate-y-1/2 ${
              langConfig.direction === 'rtl' ? 'left-4' : 'right-4'
            } w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 ${
              isAnimating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Next post"
          >
            {langConfig.direction === 'rtl' ? (
              <ChevronLeft size={20} strokeWidth={2} />
            ) : (
              <ChevronRight size={20} strokeWidth={2} />
            )}
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <div
          className={`absolute bottom-4 ${
            langConfig.direction === 'rtl'
              ? 'right-1/2 translate-x-1/2'
              : 'left-1/2 -translate-x-1/2'
          } flex gap-1.5`}
          style={{ direction: 'ltr' }}
        >
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isAnimating) setCurrentIndex(i)
              }}
              disabled={isAnimating}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-sky-600 w-6 rounded-full' : 'bg-gray-300 hover:bg-gray-400'
              } ${isAnimating ? 'opacity-50' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
