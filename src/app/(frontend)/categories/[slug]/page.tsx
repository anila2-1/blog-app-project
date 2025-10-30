// src/app/(frontend)/categories/[slug]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Post } from './../../../../payload-types'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    allCategories: '← All Categories',
    noPosts: 'No posts found in this category.',
    browseOther: 'Browse other topics',
    articleCount: (count: number) => `${count} article${count !== 1 ? 's' : ''} in this category`,
  },
  he: {
    allCategories: '← כל הקטגוריות',
    noPosts: 'לא נמצאו פוסטים בקטגוריה זו.',
    browseOther: 'עיין בנושאים אחרים',
    articleCount: (count: number) => `${count} מאמרים בקטגוריה זו`,
  },
  hr: {
    allCategories: '← Sve kategorije',
    noPosts: 'Nema pronađenih postova u ovoj kategoriji.',
    browseOther: 'Pregledajte druge teme',
    articleCount: (count: number) => `${count} članaka u ovoj kategoriji`,
  },
}

const t = translations[LANG_CODE] || translations.en

export default function CategoryPostsPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [category, setCategory] = useState<{ name: string; id: string } | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    async function fetchCategoryAndPosts() {
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

        // Fetch ALL posts
        const postsRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-publishedAt&locale=${langConfig.locale}`,
        )
        const postsData = await postsRes.json()

        // ✅ FIXED FILTER: Handle both object and string category ID
        const filteredPosts = (postsData.docs || []).filter((post: Post) => {
          const categories = post.category
          if (!Array.isArray(categories)) return false
          const categoryIds = categories.map((cat) => (typeof cat === 'object' ? cat.id : cat))
          return categoryIds.includes(cat.id)
        })

        setPosts(filteredPosts)
      } catch (err) {
        console.error('Error:', err)
        router.push('/categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryAndPosts()
  }, [slug, router])

  // ✅ Remove loading UI — just show nothing until data arrives
  if (loading) {
    return (
      <main
        className="max-w-4xl mx-auto px-4 py-16 text-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading posts...</p>
      </main>
    )
  }

  return (
    <main
      className="max-w-4xl mx-auto px-4 py-16"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <header className="mb-12 text-center sm:text-left">
        <Link
          href="/categories"
          className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors mb-4 group"
        >
          {t.allCategories}
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          {category?.name || 'Category'}
        </h1>
        <p className="text-lg text-gray-600">{t.articleCount(posts.length)}</p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-6">{t.noPosts}</p>
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {t.browseOther}
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
              <article className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div className="grow">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h2>

                    {post.excerpt ? (
                      <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : null}
                      </span>
                      <span className="text-indigo-600 font-medium">Read more →</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
