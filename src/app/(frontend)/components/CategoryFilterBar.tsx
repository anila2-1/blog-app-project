// src/app/(frontend)/components/CategoryFilterBar.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

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

  // 🔄 Skeleton while loading
  if (loading) {
    return (
      <div
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
        className="flex justify-center flex-wrap gap-3 px-6 py-4 bg-white/70 backdrop-blur-sm rounded-xl animate-pulse"
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 bg-gray-200 rounded-full w-24"></div>
        ))}
      </div>
    )
  }

  // ✅ No post-loading animation — clean & static
  return (
    <div
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
      className="relative mx-auto max-w-7xl px-6 py-4"
    >
      <div className="flex justify-center flex-wrap gap-3">
        {/* 🏷 All Button */}
        <Link
          href="/"
          className="group relative px-5 py-2.5 text-sm font-semibold text-gray-700 
                     bg-white/90 backdrop-blur-sm rounded-full
                     hover:bg-linear-to-r hover:from-purple-50 hover:to-indigo-50
                     hover:text-purple-700
                     transition-all duration-300 ease-out
                     before:absolute before:inset-0 before:rounded-full before:bg-linear-to-r before:from-purple-500/10 before:to-indigo-500/10 before:opacity-0 before:transition-opacity before:duration-300
                     before:group-hover:opacity-100"
        >
          <span className="relative z-10">{t.all}</span>
        </Link>

        {/* 🌈 Category Buttons */}
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative px-5 py-2.5 text-sm font-medium rounded-full
                       bg-white  text-gray-700
                       hover:bg-linear-to-r hover:from-pink-50 hover:to-purple-50
                       hover:text-purple-700
                       transition-all duration-300 ease-out
                       
                       before:absolute before:inset-0 before:rounded-full before:bg-linear-to-r before:from-pink-500/10 before:to-purple-500/10 before:opacity-0 before:transition-opacity before:duration-300
                       before:group-hover:opacity-100"
          >
            <span className="relative z-10">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
