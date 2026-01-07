'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/payload-types'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'

const translations = {
  en: { relatedPosts: 'Related Posts', readMore: 'Read More', noImage: 'No Image' },
  hr: { relatedPosts: 'Povezani članci', readMore: 'Pročitaj više', noImage: 'Nema slike' },
  he: { relatedPosts: 'פוסטים קשורים', readMore: 'קרא עוד', noImage: 'אין תמונה' },
  tr: { relatedPosts: 'İlgili Gönderiler', readMore: 'Devamını Oku', noImage: 'Resim Yok' },
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

  // Fetch posts
  useEffect(() => {
    if (!categorySlug) return

    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/posts?where[category.slug][equals]=${categorySlug}&where[id][not_equals]=${currentPostId}&limit=3&depth=1`,
        )

        const data = await res.json()
        setRelatedPosts(data.docs || [])
      } catch (err) {
        console.error('❌ RelatedPosts Error:', err)
      }
    }

    fetchPosts()
  }, [categorySlug, currentPostId])

  if (relatedPosts.length === 0) return null

  return (
    <section dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
      {/* ⭐ Section Heading */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        {t.relatedPosts}
        <span className="h-0.5 bg-violet-500 w-12 rounded"></span>
      </h3>

      {/* ⭐ Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {' '}
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/${post.slug}`}
            className="
              group bg-white rounded-2xl border  border-gray-200 shadow-sm 
              hover:shadow-md transition-all flex flex-col  overflow-hidden 
            "
          >
            {/* ⭐ Responsive Image */}
            {typeof post.image !== 'string' && post.image?.url ? (
              <div className="w-full h-40 sm:h-44 md:h-48 overflow-hidden">
                <img
                  src={post.image.url}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
                {t.noImage}
              </div>
            )}

            {/* ⭐ Content */}
            <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
              <div>
                {/* Date */}
                <p className="text-xs text-gray-500 mb-1">
                  {new Date(post.publishedAt || '').toLocaleDateString(locale || LANG_CODE, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>

                {/* Title */}
                <h4
                  className="
                    font-semibold text-base sm:text-lg text-gray-800
                    group-hover:text-violet-600 transition-colors
                    line-clamp-2
                  "
                >
                  {post.title}
                </h4>

                {/* Excerpt */}
                <p
                  className="
                    text-gray-600 text-sm mt-1 leading-relaxed
                    line-clamp-3
                  "
                >
                  {post.excerpt}
                </p>
              </div>

              {/* ⭐ Read More */}
              <div
                className="
                  mt-4 flex items-center gap-1 text-violet-600 font-medium text-sm
                  opacity-100 md:opacity-0 md:group-hover:opacity-100
                  transition-opacity duration-300
                "
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {t.readMore}
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
