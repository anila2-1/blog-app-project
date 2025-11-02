'use client'

import { useEffect, useState, useRef } from 'react'
import { Post } from '../../../payload-types'
import Link from 'next/link'
import Image from 'next/image'
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
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[featured][equals]=true&sort=-publishedAt&limit=3&locale=${langConfig.locale}&depth=1`,
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
        className="h-64 sm:h-80 w-full rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 animate-pulse flex items-center justify-center shadow-[2px_2px_0px_#00000066]"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="w-3/4 h-6 bg-gray-200 rounded-lg shadow-[2px_2px_0px_#00000066]"></div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div
        className="bg-linear-to-br from-[#F16363]/20 to-[#F16363]/30 p-6 rounded-2xl text-center text-black font-medium shadow-[2px_2px_0px_#00000066] border-2 border-black"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </div>
    )
  }

  const translateX = -(currentIndex * 100)

  return (
    <div
      className="mb-10 relative overflow-hidden rounded-2xl"
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
                {/* 🖼️ Image */}
                <div className="sm:w-1/2 shrink-0">
                  <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden border-2 border-black shadow-[2px_2px_0px_#00000066]">
                    <Image
                      src={imageUrl}
                      alt={post.title || 'Featured Post'}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority
                    />
                    {/* Subtle dark overlay for contrast */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>

                {/* ✍️ Content */}
                <div className="sm:w-1/2 flex flex-col justify-between text-black">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-3 line-clamp-2 group-hover:text-yellow-200 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-900 text-sm sm:text-base leading-relaxed line-clamp-3 opacity-90">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* 🔗 Read More Button */}
                  <Link
                    href={`/posts/${post.slug}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-yellow-200 rounded-full border-2 border-black shadow-[2px_2px_0px_#00000066] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 ease-out hover:bg-yellow-300"
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

      {/* Dots Indicator — Retro Style */}
      {posts.length > 1 && (
        <div
          className={`absolute bottom-2 ${
            langConfig.direction === 'rtl'
              ? 'right-1/2 translate-x-1/2'
              : 'left-1/2 -translate-x-1/2'
          } flex gap-2`}
          style={{ direction: 'ltr' }}
        >
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => !isAnimating && setCurrentIndex(i)}
              disabled={isAnimating}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full border-2 border-black transition-all duration-300 shadow-[2px_2px_0px_#00000066] 
                ${i === currentIndex ? 'bg-yellow-300 w-6' : 'bg-white hover:bg-yellow-200'} 
                ${isAnimating ? 'opacity-50' : ''}
              `}
            />
          ))}
        </div>
      )}
    </div>
  )
}
