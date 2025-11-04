'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/payload-types'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

// 🌐 Detect default language from environment or fallback to English
const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'

const translations = {
  en: {
    relatedPosts: 'Related Posts',
    readMore: 'Read More',
    noImage: 'No Image',
  },
  hr: {
    relatedPosts: 'Povezani članci',
    readMore: 'Pročitaj više',
    noImage: 'Nema slike',
  },
  he: {
    relatedPosts: 'פוסטים קשורים',
    readMore: 'קרא עוד',
    noImage: 'אין תמונה',
  },
}

interface RelatedPostsProps {
  categorySlug?: string
  currentPostId: string
  locale?: string
}

export default function RelatedPosts({ categorySlug, currentPostId, locale }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])

  const langConfig = getLanguageConfig((locale as LanguageCode) || LANG_CODE)
  const t = translations[locale as keyof typeof translations] || translations[LANG_CODE]

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!categorySlug) return

      try {
        const res = await fetch(
          `/api/posts?where[category.slug][equals]=${categorySlug}&where[id][not_equals]=${currentPostId}&limit=3&depth=1`,
        )

        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setRelatedPosts(data.docs || [])
      } catch (err) {
        console.error('❌ Failed to fetch related posts:', err)
      }
    }

    fetchRelatedPosts()
  }, [categorySlug, currentPostId])

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-12" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
      {/* Section Heading */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        {t.relatedPosts}
        <span className="h-0.5 bg-violet-500 w-12 inline-block rounded"></span>
      </h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/${post.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 
                       bg-[#fff9ec] shadow-[3px_3px_0px_#000000] hover:-translate-y-1 
                       active:translate-x-0.5 active:translate-y-0.5
                       transition-all duration-300"
          >
            {/* 🖼️ Image */}
            {typeof post.image === 'object' && post.image?.url ? (
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={post.image.url}
                  alt={post.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-[#fff0da] flex items-center justify-center text-gray-400">
                <p className="text-sm font-medium">{t.noImage}</p>
              </div>
            )}

            {/* 🧠 Content */}
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(post.publishedAt || '').toLocaleDateString(locale || LANG_CODE, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 group-hover:text-violet-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-4 flex items-center text-violet-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                {t.readMore} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
