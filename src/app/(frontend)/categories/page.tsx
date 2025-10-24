// src/app/(frontend)/categories/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { languages } from '@/config/languages'

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
  const [lang, setLang] = useState(process.env.NEXT_PUBLIC_DEFAULT_LANG || languages[0].code)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=20&locale=${lang}`,
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
  }, [lang])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Topics</h1>
        <p className="text-gray-600">Browse articles by category</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded animate-pulse">
              <div className="h-48 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No categories available.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="block group">
              <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 bg-white text-center">
                  <h3 className="font-medium text-gray-900 line-clamp-2">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
