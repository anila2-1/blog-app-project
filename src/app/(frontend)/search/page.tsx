// src/app/search/page.tsx

'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Post } from '@/payload-types'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

// 🌐 Detect default language or fallback to English
const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    resultsFor: 'Results for',
    searching: 'Searching...',
    noResults: 'No posts found matching your query.',
    error: 'Failed to load results',
  },
  hr: {
    resultsFor: 'Rezultati za',
    searching: 'Pretraživanje...',
    noResults: 'Nema objava koje odgovaraju vašem upitu.',
    error: 'Neuspjelo učitavanje rezultata',
  },
  he: {
    resultsFor: 'תוצאות עבור',
    searching: 'מחפש...',
    noResults: 'לא נמצאו פוסטים התואמים לשאילתה שלך.',
    error: 'נכשלה טעינת התוצאות',
  },
}

function SearchResultsPageContent({ locale = LANG_CODE }: { locale?: string }) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const t = translations[locale as keyof typeof translations] || translations[LANG_CODE]

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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[or][0][title][like]=${encodeURIComponent(
            query,
          )}&where[or][1][excerpt][like]=${encodeURIComponent(query)}&locale=${locale}&limit=20`,
          { cache: 'no-store' },
        )

        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setResults(data.docs || [])
      } catch (err) {
        console.error('Search error:', err)
        setError(t.error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchResults, 300)
    return () => clearTimeout(timer)
  }, [query, locale])

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-10"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <h1 className="text-2xl font-bold mb-6">
        {t.resultsFor}: <span className="text-indigo-600">&ldquo;{query}&rdquo;</span>
      </h1>

      {loading ? (
        <p className="text-gray-600">{t.searching}</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((post) => (
            <Link
              key={post.id}
              href={`/${post.slug}`}
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
        <p className="text-gray-600">{t.noResults}</p>
      )}
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsPageContent />
    </Suspense>
  )
}
