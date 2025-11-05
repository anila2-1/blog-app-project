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
                  shadow-[2px_2px_0px_#00000066] bg-white/90 dark:bg-gray-900/60 
                  backdrop-blur-xl transition-all duration-200 ease-out 
                  hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5`}
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* 🖼️ Image Section */}
      <div className="relative h-52 sm:h-48 overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={post.title || 'Post image'}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* 📝 Content Section */}
      <div className="relative z-10 p-4 pt-2">
        {/* Date Badge */}
        <div
          className={`inline-block mb-3 px-3 py-1 border border-black/10
                      bg-white text-black text-xs font-bold rounded-full 
                      shadow-[2px_2px_0px_#00000066] transition-all duration-200 ease-out 
                      active:translate-x-0.5 active:translate-y-0.5`}
        >
          {formattedDate}
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 
                      group-hover:text-transparent group-hover:bg-clip-text 
                      group-hover:bg-linear-to-r group-hover:from-indigo-600 group-hover:to-purple-600 
                      transition-all duration-200 ease-out`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-3">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <span
          className="inline-block text-sm font-semibold text-indigo-700 hover:text-purple-700 
                     transition-colors duration-300"
        >
          {t.readMore} →
        </span>
      </div>
    </Link>
  )
}
