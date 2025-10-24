// src/app/(frontend)/categories/[slug]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Post } from './../../../../payload-types'
import { languages } from '@/config/languages'

export default function CategoryPostsPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [category, setCategory] = useState<{ name: string; id: string } | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [lang, setLang] = useState(process.env.NEXT_PUBLIC_DEFAULT_LANG || languages[0].code)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    async function fetchCategoryAndPosts() {
      try {
        // Step 1: Get category by slug
        const catRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?where[slug][equals]=${slug}&locale=${lang}`,
        )
        const catData = await catRes.json()

        if (!catData.docs || catData.docs.length === 0) {
          router.push('/categories')
          return
        }

        const cat = catData.docs[0]
        setCategory(cat)

        // Step 2: Get posts in this category
        const postsRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[category][equals]=${cat.id}&sort=-publishedAt&limit=20&locale=${lang}`,
        )
        const postsData = await postsRes.json()
        setPosts(postsData.docs || [])
      } catch (err) {
        console.error('Error fetching category or posts:', err)
        router.push('/categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryAndPosts()
  }, [slug, lang, router])

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-8 animate-pulse"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/categories"
          className="inline-flex items-center text-blue-600 hover:underline mb-4"
        >
          ← All Categories
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{category?.name || 'Category'}</h1>
        <p className="text-gray-600 mt-2">
          {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found in this category.</p>
          <Link href="/categories" className="text-blue-600 hover:underline mt-4 inline-block">
            Browse other topics
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="block p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
              <p className="text-sm text-gray-500">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(lang) : 'N/A'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
