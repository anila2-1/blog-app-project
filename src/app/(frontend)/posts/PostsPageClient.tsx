'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Post } from '@/payload-types'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    noPostsTitle: 'No posts found',
    noPostsMessage: 'No blog posts are available for the selected language.',
    previous: 'Previous',
    next: 'Next',
    readMore: 'Read More',
  },
  he: {
    noPostsTitle: 'לא נמצאו פוסטים',
    noPostsMessage: 'אין פוסטים זמינים לשפה שנבחרה.',
    previous: 'הקודם',
    next: 'הבא',
    readMore: 'קרא עוד',
  },
  hr: {
    noPostsTitle: 'Nema postova',
    noPostsMessage: 'Nema dostupnih blog postova za odabranu jeziku.',
    previous: 'Prethodni',
    next: 'Sljedeći',
    readMore: 'Pročitaj više',
  },
}

const t = translations[LANG_CODE as keyof typeof translations] || translations.en
const POSTS_PER_PAGE = 12

export default function PostsPageClient({ initialPage = 1 }: { initialPage?: number }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // ✅ Get current page from URL dynamically
  const currentPage = parseInt(searchParams.get('page') || String(initialPage), 10)

  const [posts, setPosts] = useState<Post[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  // ✅ Fetch posts when page changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?locale=${langConfig.locale}&limit=${POSTS_PER_PAGE}&page=${currentPage}&sort=-publishedAt&pagination=true&where[_status][equals]=published`,
          { cache: 'no-store' },
        )
        const data = await res.json()
        setPosts(data.docs || [])
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        console.error('Failed to fetch posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentPage, pathname, searchParams])

  // ✅ Navigation with router push
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    router.push(`${pathname}?page=${page}`)
  }

  // 🟨 Skeleton Loader
  if (loading) {
    return (
      <main
        className="max-w-7xl mx-auto py-12 px-4"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 shadow-[2px_2px_0px_#00000066]"
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

  // 🟡 No Posts
  if (posts.length === 0) {
    return (
      <main
        className="max-w-7xl mx-auto py-20 px-4 text-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-gray-200/50 shadow-[2px_2px_0px_#00000066]">
          <p className="text-gray-600">{t.noPostsMessage}</p>
        </div>
      </main>
    )
  }

  // ✅ Main Layout
  return (
    <main
      className="max-w-7xl mx-auto py-12 px-4"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const imageUrl =
            typeof post.image === 'string' ? post.image : post.image?.url || '/placeholder.jpg'

          return (
            <div
              key={post.id}
              className="group relative block bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border
              shadow-sm hover:shadow-xl active:translate-x-0.5 active:translate-y-0.5 transition-all duration-500 hover:-translate-y-2"
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
                    <span className="italic text-gray-400">No excerpt available.</span>
                  )}
                </p>

                {/* ✅ Read More Button */}
                <Link
                  href={`/${post.slug}`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  className="inline-block mt-3 text-sm font-bold bg-linear-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full 
                  border shadow-sm hover:bg-indigo-400 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  {t.readMore} →
                </Link>
              </div>

              <div className="absolute inset-0 rounded-2xl pointer-events-none bg-linear-to-br from-purple-300/20 to-pink-300/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
          )
        })}
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className={`px-4 py-2 rounded-full font-bold border shadow-sm bg-white hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5 transition-all ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            ← {t.previous}
          </button>

          <div className="flex flex-wrap justify-center gap-3">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold border 
                  shadow-sm active:translate-x-0.5 active:translate-y-0.5 transition-all ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full font-bold border shadow-sm bg-white hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5 transition-all ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {t.next} →
          </button>
        </div>
      )}
    </main>
  )
}
