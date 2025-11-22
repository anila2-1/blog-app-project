/* eslint-disable @next/next/no-img-element */
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
  // Increment view count
  useEffect(() => {
    fetch('/api/increment-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: post.slug, locale: langConfig.locale }),
    }).catch(() => null)
  }, [post.slug])

  return (
    <article className="max-w-4xl mx-auto py-4 px-3 sm:px-4 lg:px-6">
      {/* Main Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-10 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/60">
        {/* Category + Date */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-sm 
          ${langConfig.direction === 'rtl' ? 'sm:justify-end text-right' : 'sm:justify-start'}`}
        >
          {category?.slug && (
            <Link
              href={`/categories/${category.slug}`}
              className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium hover:bg-blue-100 transition"
            >
              {category?.name || category?.title}
            </Link>
          )}

          {post.publishedAt && (
            <span className="text-gray-600 text-xs sm:text-sm">
              {new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-snug">
          {post.title}
        </h1>

        {/* Featured Image */}
        {typeof post.image === 'object' && post.image?.url && (
          <div className="w-full max-w-3xl mx-auto mb-8 rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-white group">
            <img
              src={post.image.url}
              alt={post.title}
              className="w-full h-[220px] sm:h-80 lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose max-w-none prose-blue prose-headings:font-bold prose-p:text-gray-700 leading-relaxed text-[15px] sm:text-base">
          <RichText className="max-w-3xl mx-auto" data={post.content} enableGutter={false} />
        </div>
      </div>

      {/* Separator */}
      <div className="my-10 border-t border-gray-300" />

      {/* Related Posts */}
      {typeof post.category === 'object' && post.category !== null && post.category.slug && (
        <section>
          <RelatedPosts categorySlug={post.category.slug} currentPostId={post.id} />
        </section>
      )}
    </article>
  )
}
