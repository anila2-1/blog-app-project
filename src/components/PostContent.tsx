// src/app/(frontend)/components/PostContent.tsx

'use client'

import { useEffect } from 'react'
import { Post } from '@/payload-types'
import RichText from './RichText'
import RelatedPosts from './../app/(frontend)/components/RelatedPosts'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

// ✅ Prevent double count using cookies
const hasViewed = (slug: string): boolean => {
  if (typeof window === 'undefined') return false
  return document.cookie.split(';').some((c) => c.trim().startsWith(`viewed_post_${slug}=`))
}

const setViewed = (slug: string) => {
  if (typeof window === 'undefined') return
  const expiry = new Date()
  expiry.setTime(expiry.getTime() + 24 * 60 * 60 * 1000)
  document.cookie = `viewed_post_${slug}=true; path=/; expires=${expiry.toUTCString()}; SameSite=Strict`
}

interface PostContentProps {
  post: Post
}

export default function PostContent({ post }: PostContentProps) {
  useEffect(() => {
    if (hasViewed(post.slug)) return

    const incrementView = async () => {
      try {
        const res = await fetch('/api/increment-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: post.slug, locale: langConfig.locale }),
        })
        if (res.ok) setViewed(post.slug)
      } catch (err) {
        console.warn('Failed to increment view count:', err)
      }
    }

    incrementView()
  }, [post.slug])

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* ✅ Featured Image */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        {typeof post.image === 'object' && post.image?.url && (
          <div className="relative mb-10 overflow-hidden rounded-2xl shadow-md">
            <img
              src={post.image.url}
              alt={post.title}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* ✅ Content Card with Border & Background */}
        <div className="prose max-w-none prose-violet prose-headings:font-semibold prose-p:text-gray-700 leading-relaxed">
          <RichText content={post.content} />
        </div>
      </div>
      <div />
      {/* ✅ Divider */}
      <div className="my-12 border-t border-gray-200" />

      {/* ✅ Related Posts */}
      {typeof post.category === 'object' && post.category?.slug && (
        <section>
          <RelatedPosts categorySlug={post.category.slug} currentPostId={post.id} />
        </section>
      )}
    </article>
  )
}
