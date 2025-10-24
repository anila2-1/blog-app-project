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
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
    >
      {post.image && typeof post.image === 'object' && (
        <div className="relative h-48">
          <Image
            src={post.image.url || '/placeholder.jpg'}
            alt={post.title || 'Post image'}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-xs text-gray-500">
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale) : 'N/A'}
        </p>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  )
}
