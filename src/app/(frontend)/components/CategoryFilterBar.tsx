// src/app/(frontend)/components/CategoryFilterBar.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

// ✅ Add translation for "All"
const translations = {
  en: { all: 'All' },
  he: { all: 'הכול' },
  hr: { all: 'Sve' },
}

const t = translations[LANG_CODE] || translations.en

interface Category {
  id: string
  name: string
  slug: string
}

export default function CategoryFilterBar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=10&locale=${langConfig.locale}`,
        )
        const data = await res.json()
        setCategories(data.docs || [])
      } catch (err) {
        console.error('Error fetching categories for filter bar:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div
        className={`flex ${
          langConfig.direction === 'rtl' ? 'space-x-reverse' : ''
        } space-x-4 px-6 py-3 bg-gray-50 animate-pulse`}
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 bg-gray-300 rounded-full w-20"></div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <div
        className={`flex flex-wrap ${langConfig.direction === 'rtl' ? 'gap-x-reverse' : ''} gap-4`}
      >
        {/* All Categories - ✅ Translated */}
        <Link
          href="/posts"
          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          {t.all}
        </Link>

        {/* Dynamic Categories (from CMS, already localized) */}
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
