import React, { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '../../../payload-types'
import { getLanguageConfig, LanguageCode, languages } from './../../../config/languages'

interface SimplifiedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image?: { url: string } | string | null
  publishedAt?: string
  featured?: boolean
  pinned?: boolean
  views?: number
  category?: { name: string; slug: string }
}

const DEFAULT_LANG = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code

interface LatestPostsProps {
  posts?: Post[] | SimplifiedPost[] // allow undefined while loading/fetching
  loading: boolean
}

const LatestPosts: React.FC<LatestPostsProps> = ({ posts, loading }) => {
  const langConfig = getLanguageConfig(DEFAULT_LANG)

  const translations = {
    en: { noPosts: 'No posts found.', label: 'New', views: 'views' },
    he: { noPosts: 'לא נמצאו פוסטים.', label: 'חדש', views: 'צפיות' },
    hr: { noPosts: 'Nema pronađenih postova.', label: 'Novo', views: 'pregleda' },
    tr: { noPosts: 'Gönderi bulunamadı.', label: 'Yeni', views: 'görüntülenme' },
  }
  const t = translations[DEFAULT_LANG] || translations.en

  if (loading) {
    return (
      <div className="space-y-4 mt-5 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="block p-3 rounded-2xl bg-white border border-black/10 shadow-[2px_2px_0px_#00000066]"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-xl shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const safePosts = Array.isArray(posts) ? posts : []

  if (safePosts.length === 0) {
    return (
      <p
        className="text-gray-600 text-center py-6 text-sm sm:text-base"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {safePosts.map((post, idx) => {
        // safe fallbacks to avoid runtime errors
        const id = (post as any)?.id ?? (post as any)?.slug ?? idx
        const slug = (post as any)?.slug ?? ''
        const title = (post as any)?.title ?? t.label
        const excerpt = (post as any)?.excerpt ?? ''
        const rawImage = (post as any)?.image
        const imageUrl =
          typeof rawImage === 'string' ? rawImage : (rawImage?.url ?? '/placeholder.png') // placeholder should exist in public/

        const content = (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 opacity-0 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-xl border border-black/10 shadow-[2px_2px_0px_#00000022]">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 80px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 line-clamp-2 text-sm sm:text-base transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm mt-1 line-clamp-2">{excerpt}</p>
              </div>
            </div>
          </div>
        )

        // if no slug, render non-link wrapper to avoid broken navigation
        return slug ? (
          <Link key={id} href={`/${slug}`}>
            {content}
          </Link>
        ) : (
          <div key={id}>{content}</div>
        )
      })}
    </div>
  )
}

export default memo(LatestPosts)
