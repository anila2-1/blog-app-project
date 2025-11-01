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
  en: { readMore: 'Continue Reading', noPosts: 'No featured posts available.' },
  he: { readMore: 'המשך קריאה', noPosts: 'אין פוסטים בתג המומלצים.' },
  hr: { readMore: 'Nastavi čitanje', noPosts: 'Nema istaknutih postova.' },
}

const t = translations[LANG_CODE] || translations.en

export default function FeaturedPost() {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating && posts.length > 1) {
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1))
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [isAnimating, posts.length])

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500)
    return () => clearTimeout(timer)
  }, [currentIndex])

  // Fetch posts
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
        className="h-64 sm:h-80 w-full rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 animate-pulse flex items-center justify-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="w-3/4 h-6 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div
        className="bg-linear-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl text-center text-indigo-700 font-medium shadow-sm"
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
    <div
      className="mb-10 relative overflow-hidden rounded-2xl bg-[#F16363]"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* Slider Track */}
      <div
        ref={containerRef}
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {posts.map((post, index) => {
          const imageUrl =
            typeof post.image === 'string' ? post.image : post.image?.url || '/placeholder.jpg'

          return (
            <div key={index} className="w-full shrink-0 px-4">
              <div className="flex flex-col sm:flex-row gap-6 p-5 sm:p-6">
                {/* Image */}
                <div className="sm:w-1/2 shrink-0">
                  <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={imageUrl}
                      alt={post.title || 'Featured Post'}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority
                    />
                    {/* Subtle dark overlay for text contrast */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="sm:w-1/2 flex flex-col justify-between text-white">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-3 line-clamp-2 group-hover:text-purple-200 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed line-clamp-3 opacity-90">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/posts/${post.slug}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-white rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 group"
                  >
                    {t.readMore}
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Arrows — Modern Style */}
      {posts.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            disabled={isAnimating}
            className={`absolute top-1/2 -translate-y-1/2 ${
              langConfig.direction === 'rtl' ? 'right-4' : 'left-4'
            } w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/10 ${
              isAnimating ? 'opacity-40 cursor-not-allowed' : ''
            }`}
            aria-label="Previous post"
          >
            {langConfig.direction === 'rtl' ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className={`absolute top-1/2 -translate-y-1/2 ${
              langConfig.direction === 'rtl' ? 'left-4' : 'right-4'
            } w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/10 ${
              isAnimating ? 'opacity-40 cursor-not-allowed' : ''
            }`}
            aria-label="Next post"
          >
            {langConfig.direction === 'rtl' ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </>
      )}

      {/* Dots Indicator — Elegant */}
      {posts.length > 1 && (
        <div
          className={`absolute bottom-1 ${
            langConfig.direction === 'rtl'
              ? 'right-1/2 translate-x-1/2'
              : 'left-1/2 -translate-x-1/2'
          } flex gap-2`}
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-black w-6 rounded-full' : 'bg-black/50 hover:bg-black/80'
              } ${isAnimating ? 'opacity-40' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
