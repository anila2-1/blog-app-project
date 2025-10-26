// src/app/(frontend)/components/PostCard.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Post } from '../../../payload-types'

interface PostCardProps {
  post: Post
  locale: string // required — no default
}

export default function PostCard({ post, locale }: PostCardProps) {
  const imageUrl = typeof post.image === 'string' ? post.image : post.image?.url || ''

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A'

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block rounded-3xl overflow-hidden shadow-none transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
    >
      {/* Glassmorphic Card Base */}
      <div className="relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-white/30 dark:border-gray-800/50 rounded-3xl overflow-hidden transition-all duration-500">
        {/* Gradient Border Glow (on hover) */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                        bg-linear-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-xl z-0"
        />

        {/* Image */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title || 'Post image'}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-700 group-hover:scale-110"
            placeholder="blur"
            blurDataURL="/placeholder-blur.jpg"
          />
          {/* Dark vignette overlay for text contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 pt-4">
          {/* Date Badge */}
          <div className="inline-block mb-3 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full backdrop-blur-sm border border-indigo-100 dark:border-indigo-800/50">
            {formattedDate}
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  )
}
