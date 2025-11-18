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
      <div className="mb-6 animate-pulse">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-linear-to-br from-slate-50 to-slate-100/80 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-slate-200/60 shadow-xl">
          <div className="sm:w-1/2 h-40 sm:h-48 md:h-60 bg-slate-200/50 rounded-xl sm:rounded-2xl"></div>
          <div className="sm:w-1/2 flex flex-col justify-between">
            <div>
              <div className="h-5 sm:h-6 bg-slate-200/50 rounded w-3/4 mb-2 sm:mb-3"></div>
              <div className="h-3 sm:h-4 bg-slate-200/50 rounded w-full mb-1 sm:mb-2"></div>
              <div className="h-3 sm:h-4 bg-slate-200/50 rounded w-5/6"></div>
            </div>
            <div className="mt-3 sm:mt-4 h-8 sm:h-10 w-32 sm:w-40 bg-slate-200/50 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div
        className="bg-linear-to-br from-slate-50/80 to-slate-100/80 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center text-slate-800 font-medium shadow-xl backdrop-blur-sm border border-slate-200/60"
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
    <div className="mb-6 relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300 ease-in-out">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="sm:w-full sm:max-w-[50%] shrink-0">
          <div className="relative h-40 sm:h-48 md:h-60 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/60 shadow-lg group">
            <Image
              src={imageUrl}
              alt={post?.title ?? 'Featured Post'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"></div>
          </div>
        </div>
        <div className="sm:w-full sm:max-w-[50%] flex flex-col justify-between text-slate-800">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-2 sm:mb-3 line-clamp-2 text-slate-900">
              {post?.title ?? ''}
            </h2>
            {post?.category?.name && (
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 bg-linear-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-md">
                {post.category.name}
              </div>
            )}
            {post?.publishedAt && (
              <div className="flex items-center text-xs text-slate-500 mb-3 sm:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                {new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                  year: 'numeric',
                  month: 'short', // Changed to 'short' for mobile
                  day: 'numeric',
                })}
              </div>
            )}
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-3 sm:mb-4">
              {post?.excerpt ?? ''}
            </p>
          </div>
          <Link
            href={`/${post?.slug ?? ''}`}
            className="mt-2 inline-flex items-center justify-start gap-1.5 sm:gap-2 px-3 py-2 sm:py-3 text-sm font-semibold text-blue-700 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            {t.readMore}
            <span className="inline-block transition-transform group-hover:translate-x-1 text-base sm:text-lg">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
