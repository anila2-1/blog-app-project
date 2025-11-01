// src/app/(frontend)/components/CategoryFilterBar.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { all: 'ALL' },
  he: { all: 'הכול' },
  hr: { all: 'SVE' },
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

  // 🔄 Skeleton while loading
  if (loading) {
    return (
      <div
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
        className="flex items-center overflow-x-auto gap-3 px-2 py-2 hide-scrollbar"
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 bg-gray-200 rounded-full w-20 shrink-0"></div>
        ))}
      </div>
    )
  }

  return (
    <div
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
      className="flex items-center overflow-x-auto gap-3 px-2 py-2 hide-scrollbar"
    >
      {/* 🏷 All Button */}
      <Link
        href="/categories"
        className="px-4 py-2 text-sm font-bold text-gray-800 bg-white border-2 border-black rounded-full hover:bg-gray-100 transition-all shadow-[3px_3px_0px_#000000] shrink-0"
      >
        {t.all}
      </Link>

      {/* 🌈 Category Buttons */}
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="px-4 py-2 text-sm font-bold text-gray-800 bg-white border-2 border-black rounded-full hover:bg-gray-100 transition-all shadow-[3px_3px_0px_#000000] shrink-0"
        >
          {category.name.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
