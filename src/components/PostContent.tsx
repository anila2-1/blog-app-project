/* eslint-disable @next/next/no-img-element */
// src/app/(frontend)/components/PostContent.tsx
'use client'

import { useEffect } from 'react'
import { Post } from '@/payload-types'
import Link from 'next/link'
import RichText from '@/components/RichText'
import RelatedPosts from './../app/(frontend)/components/RelatedPosts'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

interface PostContentProps {
  post: Post
  category?: any
}

export default function PostContent({ post, category }: PostContentProps) {
  // ✅ Increment view on EVERY page load
  useEffect(() => {
    const incrementView = async () => {
      try {
        await fetch('/api/increment-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: post.slug, locale: langConfig.locale }),
        })
      } catch (err) {
        console.warn('Failed to increment view count:', err)
      }
    }

    incrementView()
  }, [post.slug])

  return (
    <article className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      {/* Featured Image & Content */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-12 transition-all duration-300 shadow hover:shadow-xl hover:border-sky-200">
        {/* ✅ Category + Date on same line, responsive */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center gap-3 mb-4 text-sm font-medium ${langConfig.direction === 'rtl' ? 'sm:justify-end' : 'sm:justify-start'}`}
        >
          {category && typeof category.slug === 'string' && category.slug.trim() !== '' && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-flex items-center gap-2 px-2 py-1 text-blue-800 hover:text-blue-700 text-xs sm:text-sm"
            >
              <span>{category.name || category.title}</span>
            </Link>
          )}

          {post.publishedAt && (
            <span className="text-gray-600 text-xs sm:text-sm">
              —{' '}
              {new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">{post.title}</h1>

        {typeof post.image === 'object' && post.image?.url && (
          <div className="relative w-full max-w-3xl mx-auto mb-10 overflow-hidden rounded-4xl shadow-lg border border-sky-100 bg-white/10 backdrop-blur-sm group">
            <img
              src={post.image.url}
              alt={post.title}
              className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-sky-900/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute inset-0 rounded-4xl border border-transparent group-hover:border-sky-300/60 transition-all duration-500"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-400/30 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
          </div>
        )}

        <div className="prose max-w-none prose-violet prose-headings:font-extrabold prose-p:text-white leading-relaxed">
          <RichText className="max-w-3xl mx-auto" data={post.content} enableGutter={false} />
        </div>
      </div>

      <div className="my-12 border-t border-gray-200" />

      {typeof post.category === 'object' && post.category?.slug && (
        <section>
          <RelatedPosts categorySlug={post.category.slug} currentPostId={post.id} />
        </section>
      )}
    </article>
  )
}
