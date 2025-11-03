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

interface Category {
  id: string
  name: string
  slug: string
  image?: {
    url: string
  }
}

interface CategoryCardsProps {
  categories: Category[]
}

export default function CategoryCards({ categories }: CategoryCardsProps) {
  // Filter out categories with invalid slugs
  const validCategories = categories.filter(
    (category) => typeof category.slug === 'string' && category.slug.trim() !== '',
  )

  // 🪶 No Categories Found
  if (validCategories.length === 0) {
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
        <h2 className="text-lg font-bold text-black flex items-center">{t.exploreTopics}</h2>
        <Link
          href="/categories"
          className="inline-flex items-center px-4 py-2 bg-yellow-100 border-2 border-black rounded-full text-sm font-bold text-gray-800 hover:bg-yellow-200 transition-all shadow-[2px_2px_0px_#00000066] active:translate-x-0.5 active:translate-y-0.5"
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
        {validCategories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="block group">
            <div className="relative overflow-hidden bg-white border-2 border-black rounded-2xl shadow-[2px_2px_0px_#00000066] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-gray-50">
              {/* Optional Image */}
              {category.image?.url && (
                <img
                  src={category.image.url}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              )}
              <div className="p-4">
                <h3 className="text-center font-bold text-gray-900 uppercase tracking-wide">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
