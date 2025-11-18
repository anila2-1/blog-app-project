// src/app/(frontend)/components/CategoryFilterBar/CategoryFilterBar1.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { all: 'ALL', categories: 'CATEGORIES' },
  he: { all: 'הכול', categories: 'קטגוריות' },
  hr: { all: 'SVE', categories: 'KATEGORIJE' },
  tr: { all: 'HEPSİ', categories: 'KATEGORİLER' },
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
  const [isExpanded, setIsExpanded] = useState(false) // For mobile toggle

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=50&locale=${langConfig.locale}`,
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
        className="md:flex md:items-center md:overflow-x-auto gap-2 px-4 py-3 md:px-2 md:py-2"
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 bg-gray-100 rounded-full w-full md:w-24 animate-pulse"></div>
        ))}
      </div>
    )
  }

  // 📦 Filter valid categories
  const validCategories = categories.filter(
    (category) => typeof category.slug === 'string' && category.slug.trim() !== '',
  )

  // On mobile, show only first 2 + "See More" button
  const visibleOnMobile = validCategories.slice(0, 2)
  const remainingCategories = validCategories.slice(2)

  return (
    <div
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
      className="md:flex md:items-center md:overflow-x-auto gap-2 px-4 py-3 md:px-2 md:py-2"
    >
      {/* 💡 MOBILE: Show first 2 + Expand Button */}
      <div className="md:hidden flex flex-col gap-2">
        {visibleOnMobile.map((category, i) => {
          const bgColors = ['bg-blue-50', 'bg-pink-50']
          const borderColors = ['border-blue-100', 'border-pink-100']
          const bgColor = bgColors[i % bgColors.length]
          const borderColor = borderColors[i % borderColors.length]
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={`px-4 py-2 text-sm font-semibold text-gray-800 ${bgColor} ${borderColor} border rounded-full hover:${bgColor.replace('-50', '-100')} transition-all duration-300 w-full text-center`}
            >
              {typeof category.name === 'string' ? category.name.toUpperCase() : ''}
            </Link>
          )
        })}

        {/* 🔽 Expand Button */}
        {remainingCategories.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-300"
          >
            <span>{isExpanded ? 'Hide Categories' : 'See More Categories'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}

        {/* 📜 Expanded Categories List */}
        {isExpanded && (
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
            {remainingCategories.map((category, i) => {
              const bgColors = ['bg-cyan-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50']
              const borderColors = [
                'border-cyan-100',
                'border-green-100',
                'border-yellow-100',
                'border-orange-100',
              ]
              const bgColor = bgColors[i % bgColors.length]
              const borderColor = borderColors[i % borderColors.length]
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className={`px-4 py-2 text-sm font-semibold text-gray-800 ${bgColor} ${borderColor} border rounded-full hover:${bgColor.replace('-50', '-100')} transition-all duration-300 w-full text-center`}
                >
                  {typeof category.name === 'string' ? category.name.toUpperCase() : ''}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* 💻 DESKTOP: Show Only First 5 Categories Horizontally + ALL Button */}
      <div className="hidden md:flex flex-row gap-2 items-center">
        {validCategories.slice(0, 5).map((category, i) => {
          const bgColors = [
            'bg-pink-50',
            'bg-cyan-50',
            'bg-green-50',
            'bg-yellow-50',
            'bg-orange-50',
            'bg-purple-50',
            'bg-red-50',
          ]
          const borderColors = [
            'border-pink-100',
            'border-cyan-100',
            'border-green-100',
            'border-yellow-100',
            'border-orange-100',
            'border-purple-100',
            'border-red-100',
          ]
          const bgColor = bgColors[i % bgColors.length]
          const borderColor = borderColors[i % borderColors.length]

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={`px-4 py-2 text-sm font-semibold text-gray-800 ${bgColor} ${borderColor} border rounded-full hover:${bgColor.replace('-50', '-100')} transition-all duration-300 min-w-20 whitespace-nowrap text-center`}
            >
              {typeof category.name === 'string' ? category.name.toUpperCase() : ''}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
