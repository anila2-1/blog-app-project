'use client'

import { useEffect } from 'react'
import { Post } from '@/payload-types'
import RichText from './RichText'
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
    <>
      {typeof post.image === 'object' && post.image?.url && (
        <img
          src={post.image.url}
          alt={post.title}
          className="rounded-xl mb-6 w-full object-cover"
        />
      )}
      <RichText content={post.content} />
    </>
  )
}
