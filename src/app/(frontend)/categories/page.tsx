'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    pageTitle: 'Explore Topics',
    pageSubtitle: 'Browse articles by category',
    noCategories: 'No categories available.',
    backToHome: '← Back to Home',
  },
  he: {
    pageTitle: 'גלה נושאים',
    pageSubtitle: 'עיין במאמרים לפי קטגוריה',
    noCategories: 'אין קטגוריות זמינות.',
    backToHome: '← חזרה לבית',
  },
  hr: {
    pageTitle: 'Istražite teme',
    pageSubtitle: 'Pregledajte članke po kategorijama',
    noCategories: 'Nema dostupnih kategorija.',
    backToHome: '← Natrag na početnu',
  },
}

const t = translations[LANG_CODE] || translations.en

interface Category {
  id: string
  name: string
  slug: string
  image?: {
    url: string
  }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=20&locale=${langConfig.locale}`,
        )
        const data = await res.json()
        setCategories(data.docs || [])
      } catch (err) {
        console.error('Error fetching categories:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* 🧭 Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          {t.pageTitle}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.pageSubtitle}</p>
      </div>

      {/* 🌀 Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border-2 border-black shadow-[2px_2px_0px_#00000066] overflow-hidden animate-pulse"
            >
              <div className="h-40 bg-gray-200"></div>
              <div className="p-5">
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        // Empty State
        <div className="text-center py-20">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-6 shadow-[2px_2px_0px_#00000066]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg mb-6">{t.noCategories}</p>
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2.5 bg-yellow-100 border-2 border-black text-gray-800 font-bold rounded-full shadow-[2px_2px_0px_#00000066] hover:bg-yellow-200 transition-all hover:translate-x-0.5 hover:translate-y-0.5"
          >
            {t.backToHome}
          </Link>
        </div>
      ) : (
        // 🗂️ Category Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories
            .filter((category) => typeof category.slug === 'string' && category.slug.trim() !== '')
            .map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} className="group block">
                <div className="bg-white border-2 border-black rounded-2xl shadow-[2px_2px_0px_#00000066] overflow-hidden transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-gray-50">
                  {/* 🖼️ Optional Image */}
                  {category.image?.url && (
                    <img
                      src={category.image.url}
                      alt={category.name}
                      className="w-full h-40 object-cover border-b-2 border-black"
                    />
                  )}

                  {/* 🏷️ Name */}
                  <div className="p-5 flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {category.name}
                    </h3>
                    <div className="mt-3 w-10 h-1 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </main>
  )
}
