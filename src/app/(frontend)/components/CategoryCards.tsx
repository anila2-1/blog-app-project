// src/app/(frontend)/components/CategoryCards.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LucideArrowRight, LucideArrowLeft } from 'lucide-react'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

// Get language code from .env (build-time constant)
const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'

// Use shared config for direction, font, locale
const langConfig = getLanguageConfig(LANG_CODE)

// Translations (UI text only — not in shared config, which is correct)
const translations = {
  en: {
    exploreTopics: 'EXPLORE TOPICS',
    allCategories: 'All Categories',
    noCategories: 'No categories found.',
  },
  he: {
    exploreTopics: 'גלה נושאים',
    allCategories: 'כל הקטגוריות',
    noCategories: 'לא נמצאו קטגוריות.',
  },
  hr: {
    exploreTopics: 'ISTRAŽITE TEME',
    allCategories: 'Sve kategorije',
    noCategories: 'Nema pronađenih kategorija.',
  },
}

const t = translations[LANG_CODE] || translations.en

// ===== COMPONENT =====
interface Category {
  id: string
  name: string
  slug: string
  image?: {
    url: string
  }
}

export default function CategoryCards() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Use langConfig.locale for API (e.g., 'he-IL', not just 'he')
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=6&locale=${langConfig.locale}`,
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

  if (loading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-50 p-4 rounded animate-pulse">
            <div className="h-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <p
        className="text-gray-500 text-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noCategories}
      </p>
    )
  }

  return (
    <div className="space-y-8" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          {t.exploreTopics}
        </h2>
        <Link
          href="/categories"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {t.allCategories}
          {langConfig.direction === 'rtl' ? (
            <LucideArrowLeft size={16} className="mr-1" />
          ) : (
            <LucideArrowRight size={16} className="ml-1" />
          )}
        </Link>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="block group">
            <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 bg-white">
                <h3 className="text-center font-medium text-gray-900 line-clamp-2">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
        z
      </div>
    </div>
  )
}
