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
    <article className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      {/* ✅ Featured Image */}
      <div
        className="bg-[#fff0da] rounded-3xl border border-gray-200 shadow-[7px_7px_0px_#000000] p-8 sm:p-12
                      transition-all duration-300 hover:shadow-2xl hover:border-sky-200"
      >
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <p className="text-black text-sm mb-10">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString(langConfig.locale)
            : 'N/A'}
        </p>

        {typeof post.image === 'object' && post.image?.url && (
          // constrain the image height responsively and let object-cover crop
          <div className="relative w-full max-w-3xl mx-auto mb-10 overflow-hidden rounded-4xl shadow-lg border border-sky-100 bg-white/10 backdrop-blur-sm group">
            {/* 🖼️ Blog Image */}
            <img
              src={post.image?.url}
              alt={post.title}
              className="w-full h-[450px] object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
            />

            {/* 🌈 Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-sky-900/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

            {/* ✨ Glow Border on Hover */}
            <div className="absolute inset-0 rounded-4xl border border-transparent group-hover:border-sky-300/60 transition-all duration-500"></div>

            {/* 💫 Floating Light Accent */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-400/30 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
          </div>
        )}

        {/* ✅ Content Card with Border & Background */}
        <div className="prose max-w-none prose-violet prose-headings:font-extrabold prose-p:text-white leading-relaxed">
          <RichText data={post.content as any} />
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
