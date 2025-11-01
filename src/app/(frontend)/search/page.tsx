// src/app/search/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Post } from '@/payload-types' // adjust if your path is different

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        // 🔍 Search in title AND excerpt (adjust fields as needed)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[or][0][title][like]=${encodeURIComponent(query)}&where[or][1][excerpt][like]=${encodeURIComponent(query)}&locale=en&limit=20`,
          { cache: 'no-store' },
        )

        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setResults(data.docs || [])
      } catch (err) {
        console.error('Search error:', err)
        setError('Failed to load results')
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchResults, 300) // debounce
    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Results for: <span className="text-indigo-600">&ldquo;{query}&ldquo;</span>
      </h1>

      {loading ? (
        <p className="text-gray-600">Searching...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="group block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-indigo-200"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No posts found matching your query.</p>
      )}
    </div>
  )
}
