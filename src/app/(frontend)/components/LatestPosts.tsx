import React, { memo } from 'react'
import Link from 'next/link'
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

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { noPosts: 'No posts found.', views: 'views' },
  he: { noPosts: 'לא נמצאו פוסטים.', views: 'צפיות' },
  hr: { noPosts: 'Nema pronađenih postova.', views: 'pregleda' },
  tr: { noPosts: 'Gönderi bulunamadı.', views: 'görüntülenme' },
}

const t = translations[LANG_CODE] || translations.en

interface LatestPostsProps {
  posts?: Post[] | SimplifiedPost[]
  loading: boolean
}

const LatestPosts: React.FC<LatestPostsProps> = memo(({ posts, loading }) => {
  if (loading) {
    return (
      <div className="mt-5 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-xl bg-white border border-gray-100 animate-pulse"
          >
            <div className="w-14 h-12 bg-gray-200 rounded-lg shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
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
        className="text-gray-500 text-center py-6 text-sm"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </p>
    )
  }

  return (
    <div
      className="flex flex-col gap-3 mt-2"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {safePosts.map((post, i) => {
        const id = (post as any)?.id ?? i
        const slug = (post as any)?.slug ?? ''
        const title = (post as any)?.title ?? 'Untitled'
        const excerpt = (post as any)?.excerpt ?? ''
        const views = (post as any)?.views
        const publishedAt = (post as any)?.publishedAt
        const rawImage = (post as any)?.image
        const imageUrl = typeof rawImage === 'string' ? rawImage : rawImage?.url

        const content = (
          <div
            className="flex gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 opacity-0 animate-fadeIn"
            style={{
              animationDelay: `${i * 100}ms`,
              animationFillMode: 'forwards',
            }}
          >
            {/* Thumbnail Image (MATCHES SCREENSHOT) */}
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="
                  w-16 h-12 mt-6
                  sm:w-18 sm:h-14
                  rounded-lg 
                  object-cover 
                  border border-gray-200 
                  shadow-sm
                  shrink-0
                "
              />
            ) : (
              <div
                className="
                  w-16 h-12
                  sm:w-18 sm:h-14 
                  rounded-lg 
                  bg-gray-200 
                  shrink-0
                "
              ></div>
            )}

            {/* Text Section */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-indigo-600 transition text-sm sm:text-base">
                {title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                {views !== undefined && (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {views} {t.views}
                  </div>
                )}

                {publishedAt && (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    {new Date(publishedAt).toLocaleDateString(langConfig.locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                )}
              </div>

              <p className="text-gray-700 text-xs sm:text-sm mt-1 line-clamp-2">{excerpt}</p>
            </div>
          </div>
        )

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
})

LatestPosts.displayName = 'LatestPosts'
export default LatestPosts
