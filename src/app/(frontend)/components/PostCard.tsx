// src/app/(frontend)/components/PostCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Post } from '../../../payload-types'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

interface SimplifiedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image?: { url: string }
  publishedAt?: string
  featured?: boolean
  pinned?: boolean
  views?: number
  category?: { name: string; slug: string }
}

interface PostCardProps {
  post: Post | SimplifiedPost
  locale?: string
}

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    readMore: 'Read More',
    noDate: 'N/A',
  },
  he: {
    readMore: 'קרא עוד',
    noDate: 'לא זמין',
  },
  hr: {
    readMore: 'Pročitaj više',
    noDate: 'Nema datuma',
  },
  tr: {
    readMore: 'Devamını Oku',
    noDate: 'Tarih Yok',
  },
}

const t = translations[LANG_CODE] || translations.en

export default function PostCard({ post, locale }: PostCardProps) {
  const imageUrl = typeof post.image === 'string' ? post.image : post.image?.url || ''
  const userLocale = locale || LANG_CODE

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(userLocale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : t.noDate

  return (
    <Link
      href={`/${post.slug}`}
      className={`group block rounded-xl overflow-hidden border border-black/10
                   bg-white
                  backdrop-blur-xl transition-all duration-100 ease-out 
                  hover:shadow-md hover:scale-1.05 hover:-translate-y-1
                  active:scale-98`}
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* 🖼️ Image Section */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-linear-to-br from-purple-200 to-indigo-200">
        <Image
          src={imageUrl}
          alt={post.title || 'Post image'}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 📝 Content Section */}
      <div className="relative z-10 p-4 pt-3">
        {/* Title */}
        <h3
          className={`text-lg font-bold text-gray-900 mb-2 line-clamp-2 
                      group-hover:text-transparent group-hover:bg-clip-text 
                      group-hover:bg-linear-to-r group-hover:from-purple-600 group-hover:to-indigo-600 
                      transition-all duration-300 ease-out`}
        >
          {post.title}
        </h3>

        {/* Date */}
        {post.publishedAt && (
          <div className="flex items-center text-xs text-slate-500 mb-2 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3.5 h-3.5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            {formattedDate}
          </div>
        )}

        {/* Excerpt */}
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <span
          className="inline-flex items-center gap-1.5 text-sm  text-purple-600 group-hover:text-indigo-600 
                     transition-all duration-300 group-hover:translate-x-0.5"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {t.readMore}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </div>
    </Link>
  )
}
