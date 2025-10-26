// src/app/(frontend)/posts/page.tsx

'use client'

import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Post } from '../../../payload-types'
import { getLanguageConfig, LanguageCode } from '@/config/languages'
import RichTextPreview from '@/components/RichTextPreview'
import Image from 'next/image'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    pageTitle: 'Posts',
    noPostsTitle: 'No posts found',
    noPostsMessage: 'No blog posts are available for the selected language.',
    previous: 'Previous',
    next: 'Next',
  },
  he: {
    pageTitle: 'פוסטים',
    noPostsTitle: 'לא נמצאו פוסטים',
    noPostsMessage: 'אין פוסטים זמינים לשפה שנבחרה.',
    previous: 'הקודם',
    next: 'הבא',
  },
  hr: {
    pageTitle: 'Postovi',
    noPostsTitle: 'Nema postova',
    noPostsMessage: 'Nema dostupnih blog postova za odabranu jeziku.',
    previous: 'Prethodni',
    next: 'Sljedeći',
  },
}

const t = translations[LANG_CODE] || translations.en
const POSTS_PER_PAGE = 6

export default function PostsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const currentPage = Number(searchParams.get('page')) || 1

  const [posts, setPosts] = useState<Post[]>([])
  const [totalDocs, setTotalDocs] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const skip = (currentPage - 1) * POSTS_PER_PAGE
        // 🔑 Add pagination=true to get totalDocs
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?locale=${langConfig.locale}&limit=${POSTS_PER_PAGE}&skip=${skip}&sort=-publishedAt&pagination=true`,
          { cache: 'no-store' },
        )
        const data = await res.json()
        setPosts(data.docs || [])
        setTotalDocs(data.totalDocs || 0) // ✅ Now this will work!
      } catch (err) {
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentPage])

  const totalPages = Math.ceil(totalDocs / POSTS_PER_PAGE)

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (pageNumber === 1) {
      params.delete('page')
    } else {
      params.set('page', String(pageNumber))
    }
    return `${pathname}?${params.toString()}`
  }

  if (loading) {
    return (
      <main
        className="max-w-7xl mx-auto py-12 px-4"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-1/4 mb-10 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (posts.length === 0 && totalDocs === 0) {
    return (
      <main
        className="max-w-7xl mx-auto py-20 px-4 text-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-gray-200/50 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{t.noPostsTitle}</h1>
          <p className="text-gray-600">{t.noPostsMessage}</p>
        </div>
      </main>
    )
  }

  return (
    <main
      className="max-w-7xl mx-auto py-12 px-4"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => {
          const hasContent =
            post.excerpt?.trim() ||
            (post.content?.root?.children &&
              post.content.root.children.some((child: any) =>
                child.children?.some((c: any) => c.text?.trim()),
              ))

          if (!hasContent) return null

          const imageUrl =
            typeof post.image === 'string' ? post.image : post.image?.url || '/placeholder.jpg'

          return (
            <Link
              href={`/posts/${post.slug}`}
              key={post.id}
              className="group block bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.title || 'Post image'}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-500">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : ''}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                  {post.excerpt ? (
                    post.excerpt
                  ) : (
                    <RichTextPreview content={post.content} maxLength={120} />
                  )}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl pointer-events-none bg-linear-to-br from-purple-300/20 to-pink-300/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            </Link>
          )
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Previous Button */}
          <Link
            href={createPageURL(currentPage - 1)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-disabled={currentPage === 1}
          >
            ← {t.previous}
          </Link>

          {/* Page Numbers */}
          <div className="flex flex-wrap justify-center gap-2">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1
              return (
                <Link
                  key={page}
                  href={createPageURL(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </Link>
              )
            })}
          </div>

          {/* Next Button */}
          <Link
            href={createPageURL(currentPage + 1)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-disabled={currentPage === totalPages}
          >
            {t.next} →
          </Link>
        </div>
      )}
    </main>
  )
}
