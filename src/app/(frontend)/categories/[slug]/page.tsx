//src/app/(frontend)/categories/[slug]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Post } from '@/payload-types'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    allCategories: '← All Categories',
    noPosts: 'No posts found in this category.',
    browseOther: 'Browse other topics',
    readmore: 'Read more',
    previous: 'Previous',
    next: 'Next',
    articleCount: (count: number) => `${count} article${count !== 1 ? 's' : ''} in this category`,
  },
  he: {
    allCategories: '← כל הקטגוריות',
    noPosts: 'לא נמצאו פוסטים בקטגוריה זו.',
    browseOther: 'עיין בנושאים אחרים',
    readmore: 'קרא עוד',
    previous: 'הקודם',
    next: 'הבא',
    articleCount: (count: number) => `${count} מאמרים בקטגוריה זו`,
  },
  hr: {
    allCategories: '← Sve kategorije',
    noPosts: 'Nema pronađenih postova u ovoj kategoriji.',
    browseOther: 'Pregledajte druge teme',
    readmore: 'Čitaj više',
    previous: 'Prethodni',
    next: 'Sljedeći',
    articleCount: (count: number) => `${count} članaka u ovoj kategoriji`,
  },
  tr: {
    allCategories: '← Tüm Kategoriler',
    noPosts: 'Bu kategoride gönderi bulunamadı.',
    browseOther: 'Diğer konuları göz atın',
    readmore: 'Devamını Oku',
    previous: 'Önceki',
    next: 'Sonraki',
    articleCount: (count: number) => `${count} makale bu kategoride`,
  },
  el: {
    allCategories: '← Όλες οι κατηγορίες',
    noPosts: 'Δεν βρέθηκαν δημοσιεύσεις σε αυτήν την κατηγορία.',
    browseOther: 'Δείτε άλλα θέματα',
    readmore: 'Διαβάστε περισσότερα',
    previous: 'Προηγούμενο',
    next: 'Επόμενο',
    articleCount: (count: number) => {
      // Simple pluralization: use the same suffix for all counts
      return `${count} άρθρα σε αυτήν την κατηγορία`
    },
  },
}

const t = translations[LANG_CODE] || translations.en
const POSTS_PER_PAGE = 9

export default function CategoryPostsPage() {
  const { slug } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const [category, setCategory] = useState<{ name: string; id: string } | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    router.push(`${pathname}?page=${page}`)
  }

  useEffect(() => {
    if (!slug) return

    async function fetchCategoryAndPosts() {
      setLoading(true)
      try {
        const catRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?where[slug][equals]=${slug}&locale=${langConfig.locale}`,
        )
        const catData = await catRes.json()

        if (!catData.docs || catData.docs.length === 0) {
          router.push('/categories')
          return
        }

        const cat = catData.docs[0]
        setCategory(cat)

        // Fetch posts filtered by category with pagination
        const postsRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[category][in]=${cat.id}&sort=-publishedAt&locale=${langConfig.locale}&limit=${POSTS_PER_PAGE}&page=${currentPage}&pagination=true&where[_status][equals]=published`,
        )
        const postsData = await postsRes.json()

        setPosts(postsData.docs || [])
        setTotalPosts(postsData.totalDocs || 0)
        setTotalPages(postsData.totalPages || 1)
      } catch (err) {
        console.error('Error:', err)
        router.push('/categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryAndPosts()
  }, [slug, router, currentPage, pathname, searchParams])

  if (loading) {
    return (
      <main
        className={`max-w-4xl mx-auto px-4 py-16 text-center ${
          langConfig.direction === 'rtl' ? 'text-right' : 'text-left'
        }`}
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-900 rounded-2xl p-6 animate-pulse h-40"
            ></div>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main
      className={`max-w-4xl mx-auto px-4 py-16 ${
        langConfig.direction === 'rtl' ? 'text-right' : 'text-left'
      }`}
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <header className={`mb-12 ${langConfig.direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <Link
          href="/categories"
          className={`inline-flex items-center px-5 py-2.5 bg-yellow-300 border border-black/10 rounded-full font-bold text-black hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 ${
            langConfig.direction === 'rtl' ? 'ml-auto' : ''
          }`}
        >
          {t.allCategories}
        </Link>

        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          {category?.name || 'Category'}
        </h1>
        <p className="text-lg text-gray-600">{t.articleCount(totalPosts)}</p>
      </header>

      {posts.length === 0 ? (
        <div
          className={`text-center py-20 ${langConfig.direction === 'rtl' ? 'text-right' : 'text-left'}`}
        >
          <p className="text-gray-500 text-lg mb-6">{t.noPosts}</p>
          <Link
            href="/categories"
            className={`inline-flex items-center px-6 py-3 bg-yellow-300 border border-black/10 rounded-xl font-bold text-black hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 ${
              langConfig.direction === 'rtl' ? 'ml-auto' : ''
            }`}
          >
            {t.browseOther}
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/${post.slug}`} className="block group">
              <article className="bg-white border border-black/10 rounded-2xl overflow-hidden transition-all duration-200">
                {/* ✅ Optional post image on top */}
                {post.image && typeof post.image === 'object' && post.image.url && (
                  <div className="relative w-full h-56 overflow-hidden border-b">
                    <img
                      src={post.image.url}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-700 line-clamp-3 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : ''}
                    </span>
                    <span className="font-semibold text-blue-700">{t.readmore} →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

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
