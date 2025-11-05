'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

interface SimplifiedPost {
  id?: string
  title?: string
  slug?: string
  excerpt?: string
  image?: { url?: string } | string
  publishedAt?: string
  featured?: boolean
  pinned?: boolean
  views?: number
  category?: { name?: string; slug?: string }
}

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { readMore: 'Continue Reading', noPosts: 'No featured posts available.' },
  he: { readMore: 'המשך קריאה', noPosts: 'אין פוסטים בתג המומלצים.' },
  hr: { readMore: 'Nastavi čitanje', noPosts: 'Nema istaknutih postova.' },
  tr: { readMore: 'Devamını Oku', noPosts: 'Öne çıkan gönderi yok.' },
}

const t = translations[LANG_CODE] || translations.en

interface FeaturedPostProps {
  posts?: SimplifiedPost[]
  loading: boolean
  currentIndex?: number
}

export default function FeaturedPost({ posts = [], loading, currentIndex = 0 }: FeaturedPostProps) {
  if (loading) {
    return (
      <div className="mb-10 animate-pulse">
        <div className="flex flex-col sm:flex-row gap-6 p-5 sm:p-6">
          <div className="sm:w-1/2 h-48 sm:h-60 bg-gray-200 rounded-2xl"></div>
          <div className="sm:w-1/2 flex flex-col justify-between">
            <div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="mt-4 h-10 w-40 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
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

  // Ensure index is within bounds
  const safeIndex = Math.max(0, Math.min(currentIndex, posts.length - 1))
  const post = posts[safeIndex] || posts[0]

  // Normalize image shape and fallback
  const imageUrl =
    typeof post?.image === 'string' ? post.image : (post?.image?.url ?? '/placeholder.jpg')

  return (
    <div className="mb-10 relative overflow-hidden rounded-2xl transition-all duration-300 ease-in-out">
      <div className="flex flex-col sm:flex-row gap-6 p-5 sm:p-6">
        <div className="sm:w-1/2 shrink-0">
          <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden border border-black/10 shadow-[2px_2px_0px_#00000066]">
            <Image
              src={imageUrl}
              alt={post?.title ?? 'Featured Post'}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
        <div className="sm:w-1/2 flex flex-col justify-between text-black">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-3 line-clamp-2">
              {post?.title ?? ''}
            </h2>
            <p className="text-gray-900 text-sm sm:text-base leading-relaxed line-clamp-3 opacity-90">
              {post?.excerpt ?? ''}
            </p>
          </div>
          <Link
            href={`/${post?.slug ?? ''}`}
            className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-yellow-200 rounded-full border-2 border-black shadow-[2px_2px_0px_#00000066] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 ease-out hover:bg-yellow-300 group"
          >
            {t.readMore}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
