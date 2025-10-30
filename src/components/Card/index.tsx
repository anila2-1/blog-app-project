'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'category' | 'title'> & {
  meta?: {
    description?: string
    image?: any
  }
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, category, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = category && Array.isArray(category) && category.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      ref={card.ref}
      className={cn(
        'group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200',
        className,
      )}
    >
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden bg-gray-50">
        {!metaImage && (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size="33vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3">
        {showCategories && hasCategories && (
          <div className="flex flex-wrap gap-2">
            {category?.map((category, index) => {
              if (typeof category === 'object') {
                const { name: titleFromCategories } = category
                const categoryTitle = titleFromCategories || 'Untitled Category'
                return (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-100"
                  >
                    {categoryTitle}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Title */}
        {titleToUse && (
          <h3 className="text-xl font-bold text-gray-800 leading-snug hover:text-indigo-600 transition-colors">
            <Link href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  )
}
