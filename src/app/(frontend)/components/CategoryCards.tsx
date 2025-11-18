import Link from 'next/link'
import { LucideArrowRight, LucideArrowLeft } from 'lucide-react'
import { getLanguageConfig, LanguageCode, languages } from './../../../config/languages'

// Get language code from .env
const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

// Translations
const translations = {
  en: {
    exploreTopics: 'EXPLORE TOPICS',
    allCategories: 'All Categories',
    noCategories: 'No categories found.',
    loading: 'Loading...',
  },
  he: {
    exploreTopics: 'גלה נושאים',
    allCategories: 'כל הקטגוריות',
    noCategories: 'לא נמצאו קטגוריות.',
    loading: 'טוען...',
  },
  hr: {
    exploreTopics: 'ISTRAŽITE TEME',
    allCategories: 'Sve kategorije',
    noCategories: 'Nema pronađenih kategorija.',
    loading: 'Učitavanje...',
  },
  tr: {
    exploreTopics: 'KONULARI KEŞFEDİN',
    allCategories: 'Tüm Kategoriler',
    noCategories: 'Kategori bulunamadı.',
    loading: 'Yükleniyor...',
  },
}

const t = translations[LANG_CODE] || translations.en

interface Category {
  id: string
  name: string
  slug: string
  image?: {
    url: string
    filename: string
    mimeType: string
    width: number
    height: number
  }
}

interface CategoryCardsProps {
  categories: Category[]
  loading?: boolean
}

export default function CategoryCards({ categories, loading = false }: CategoryCardsProps) {
  // Filter out categories with invalid slugs
  const validCategories = categories.filter(
    (category) => typeof category.slug === 'string' && category.slug.trim() !== '',
  )

  if (loading) {
    return (
      <div className="space-y-8" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-black flex items-center"></h2>
          <div className="inline-flex items-center px-4 py-2 bg-indigo-600 border-2 rounded-full text-sm font-bold text-white hover:bg-indigo-500 transition-all active:translate-x-0.5 active:translate-y-0.5">
            {t.allCategories}
            {langConfig.direction === 'rtl' ? (
              <LucideArrowLeft size={16} className="mr-1" />
            ) : (
              <LucideArrowRight size={16} className="ml-1" />
            )}
          </div>
        </div>

        {/* Loading State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-white border border-black/10 rounded-2xl"
            >
              <div className="h-40 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-black flex items-center"></h2>
        <Link
          href="/categories"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border-2 rounded-full text-sm font-bold text-white hover:bg-indigo-500 transition-all active:translate-x-0.5 active:translate-y-0.5"
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
        {validCategories.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">{t.noCategories}</p>
          </div>
        ) : (
          validCategories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="block group">
              <div className="relative overflow-hidden bg-white border border-black/10 rounded-2xl transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-gray-50">
                <div className="h-40 overflow-hidden bg-gray-100">
                  {category.image ? (
                    <img
                      src={category.image.url} // ✅ This is the fix!
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-category.jpg'
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-center font-bold text-gray-900 uppercase tracking-wide">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
