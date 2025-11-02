'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Post } from '@/payload-types'
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

        // Fetch posts filtered by category
        const postsRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[category][in]=${cat.id}&sort=-publishedAt&locale=${langConfig.locale}`,
        )
        const postsData = await postsRes.json()

        setPosts(postsData.docs || [])
      } catch (err) {
        console.error('Error:', err)
        router.push('/categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryAndPosts()
  }, [slug, router])

  if (loading) {
    return (
      <main
        className="max-w-4xl mx-auto px-4 py-16 text-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-900 rounded-2xl p-6 shadow-[2px_2px_0px_#00000066] animate-pulse h-40"
            ></div>
          ))}
        </div>
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
          className="inline-flex items-center px-5 py-2.5 bg-yellow-300 border-2 border-black rounded-full font-bold text-black shadow-[2px_2px_0px_#00000066] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
        >
          {t.allCategories}
        </Link>

        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 drop-shadow-[2px_2px_0px_#00000066]">
          {category?.name || 'Category'}
        </h1>
        <p className="text-lg text-gray-600">{t.articleCount(posts.length)}</p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-6">{t.noPosts}</p>
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-yellow-300 border-2 border-black rounded-xl font-bold text-black shadow-[2px_2px_0px_#00000066] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
          >
            {t.browseOther}
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
              <article className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[2px_2px_0px_#00000066] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200">
                {/* ✅ Optional post image on top */}
                {post.image && typeof post.image === 'object' && post.image.url && (
                  <div className="relative w-full h-56 overflow-hidden border-b-2 border-black">
                    <img
                      src={post.image.url}
                      alt={post.title}
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
                    <span className="font-semibold text-blue-700">Read more →</span>
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
