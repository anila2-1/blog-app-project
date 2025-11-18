'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import FeaturedPost from './components/FeaturedPost/FeaturedPost1'
import MostViewedPosts from './components/MostViewedPosts'
import PinnedPosts from './components/PinnedPosts'
import LatestPosts from './components/LatestPosts'
import CategoryCards from './components/CategoryCards'
import Sidebar from './components/Sidebar'
import { Button } from '@mui/material'
import { keyframes } from '@mui/system'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    featured: 'Featured',
    popular: 'Popular',
    pinned: 'Pinned',
    categories: 'Categories',
    latest: 'Latest',
    explore: 'Explore',
    exploreHeading: 'Discover More Inspiring Posts',
    exploreDescription: 'Stay inspired and explore our full collection of articles.',
    exploreButton: 'View All Articles',
    allPosts: 'All Posts',
    loadMore: 'Load More',
  },
  hr: {
    featured: 'Istaknuto',
    popular: 'Popularno',
    pinned: 'Prikvačeno',
    categories: 'Kategorije',
    latest: 'Najnovije',
    explore: 'Istraži',
    exploreHeading: 'Otkrijte još inspirativnih članaka',
    exploreDescription: 'Ostanite inspirirani i istražite našu potpunu kolekciju članaka.',
    exploreButton: 'Pogledaj sve članke',
    allPosts: 'Svi članci',
    loadMore: 'Učitaj više',
  },
  he: {
    featured: 'מומלץ',
    popular: 'פופולרי',
    pinned: 'מוצב',
    categories: 'קטגוריות',
    latest: 'אחרונים',
    explore: 'גלה',
    exploreHeading: 'גלו עוד פוסטים מעוררי השראה',
    exploreDescription: 'שמרו על ההשראה וגלו את האוסף המלא של המאמרים.',
    exploreButton: 'ראו את כל המאמרים',
    allPosts: 'כל המאמרים',
    loadMore: 'טען עוד',
  },
  tr: {
    featured: 'Öne Çıkan',
    popular: 'Popüler',
    pinned: 'Sabitlenmiş',
    categories: 'Kategoriler',
    latest: 'En Son',
    explore: 'Keşfet',
    exploreHeading: 'Daha Fazla İlham Verici Yazı Keşfedin',
    exploreDescription: 'İlhamlı kalmaya devam edin ve tüm makale koleksiyonumuzu keşfedin.',
    exploreButton: 'Tüm Yazıları Görüntüle',
    allPosts: 'Tüm Yazılar',
    loadMore: 'Daha Fazla Yükle',
  },
}

const t = translations[LANG_CODE] || translations.en

interface SimplifiedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image?: { url: string }
  publishedAt?: string
  featured?: boolean
  pinned?: boolean
  views?: number
  category?: { name: string; slug: string }
}

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

// Define a wavy animation
const wave = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`
export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [pinnedPosts, setPinnedPosts] = useState<SimplifiedPost[]>([])
  const [latestPosts, setLatestPosts] = useState<SimplifiedPost[]>([])
  const [mostViewedPosts, setMostViewedPosts] = useState<SimplifiedPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<SimplifiedPost[]>([])
  const [allPosts, setAllPosts] = useState<SimplifiedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length)
    }, 4000)
  }

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const locale = langConfig.locale

        const endpoints = [
          `/api/categories?limit=6&locale=${locale}&depth=1`,
          `/api/posts?where[pinned][equals]=true&limit=3&locale=${locale}&depth=1`,
          `/api/posts?sort=-publishedAt&limit=4&locale=${locale}&depth=1`,
          `/api/posts?sort=-views&limit=4&locale=${locale}&depth=1`,
          `/api/posts?where[featured][equals]=true&sort=-publishedAt&limit=3&locale=${locale}&depth=1`,
          `/api/posts?sort=-publishedAt&limit=6&locale=${locale}&depth=1`,
        ]

        const [cat, pin, lat, view, feat, all] = await Promise.all(
          endpoints.map((url) => fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${url}`)),
        )

        const [catData, pinData, latData, viewData, featData, allData] = await Promise.all([
          cat.json(),
          pin.json(),
          lat.json(),
          view.json(),
          feat.json(),
          all.json(),
        ])

        setCategories(catData.docs || [])
        setPinnedPosts(pinData.docs || [])
        setLatestPosts(latData.docs || [])
        setMostViewedPosts(viewData.docs || [])
        setFeaturedPosts(featData.docs || [])
        setAllPosts(allData.docs || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (featuredPosts.length > 1 && !loading) {
      startAutoPlay()
    }
    return () => stopAutoPlay()
  }, [featuredPosts.length, loading])

  const handleMouseEnter = () => stopAutoPlay()
  const handleMouseLeave = () => {
    if (featuredPosts.length > 1 && !loading) startAutoPlay()
  }

  return (
    <main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* Featured Section */}
      <div className="mb-8 sm:mb-10 md:mb-12 relative">
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-black/10 shadow-sm"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute inset-0 bg-linear-to-br from-transparent via-purple-50/20 to-indigo-50/20"></div>
          <div className="relative z-10 p-4 sm:p-6">
            <FeaturedPost posts={featuredPosts} loading={loading} currentIndex={currentIndex} />

            {featuredPosts.length > 1 && !loading && (
              <>
                {/* Previous */}
                <button
                  onClick={() => {
                    setCurrentIndex(
                      (prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length,
                    )
                    stopAutoPlay()
                    setTimeout(() => {
                      startAutoPlay()
                    }, 6000)
                  }}
                  aria-label="Previous featured post"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-purple-200/70 rounded-full p-2 sm:p-3 shadow-lg cursor-pointer z-30 transition-all duration-300 hover:scale-110 hover:shadow-xl text-purple-600 backdrop-blur-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 sm:w-5 h-4 sm:h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next */}
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev + 1) % featuredPosts.length)
                    stopAutoPlay()
                    setTimeout(() => {
                      startAutoPlay()
                    }, 6000)
                  }}
                  aria-label="Next featured post"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-purple-200/70 rounded-full p-2 sm:p-3 shadow-lg cursor-pointer z-30 transition-all duration-300 hover:scale-110 hover:shadow-xl text-purple-600 backdrop-blur-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 sm:w-5 h-4 sm:h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Pagination dots */}
        {featuredPosts.length > 1 && !loading && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-30">
            {featuredPosts.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i)
                  stopAutoPlay()
                  setTimeout(() => startAutoPlay(), 7000)
                }}
                aria-label={`Go to featured post ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                  i === currentIndex
                    ? 'w-6 bg-linear-to-r from-purple-500 to-indigo-600 scale-125 shadow-md shadow-purple-500/30'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeUp">
        <div className="lg:col-span-2 space-y-8">
          <SectionCard
            label={t.pinned}
            padding="p-3"
            labelPosition="top-4 left-4"
            customClasses="bg-white shadow-sm backdrop-blur-sm"
          >
            <PinnedPosts posts={pinnedPosts} loading={loading} />
          </SectionCard>

          {/* All Post */}
          <SectionCard
            label={t.allPosts}
            padding="p-6"
            labelPosition="top-4 left-4"
            customClasses="mt-12 bg-white shadow-sm backdrop-blur-sm "
          >
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-gray-100"
                  >
                    <div className="w-full sm:w-40 h-40 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1 space-y-4">
                      <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
                      <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                      <div className="w-4/6 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : allPosts.length > 0 ? (
              <div className="space-y-6">
                {allPosts.slice(0, visibleCount).map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col sm:flex-row group gap-6 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    {/* Image - positioned at the top */}
                    {post.image?.url && (
                      <div className="shrink-0 w-full sm:w-40 h-40 rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                        <img
                          src={post.image.url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight group-hover:text-purple-600 transition-all">
                          {post.title}
                        </h3>

                        {post?.publishedAt && (
                          <div className="flex items-center text-xs text-slate-500 mb-2 sm:mb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                              />
                            </svg>
                            {new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        )}
                        <p className="text-gray-600 text-base sm:text-sm mt-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Read More Button - Unique Hover Animation */}
                      <Link href={`/${post.slug}`} className="mt-4 w-full sm:w-auto">
                        <Button
                          variant="contained"
                          sx={{
                            px: 3,
                            py: 1,
                            borderRadius: '30px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'linear-gradient(90deg, #7b5cf5, #a74bfa)',
                            boxShadow: '0 4px 12px rgba(113,92,235,0.4)',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',

                            '&:hover': {
                              animation: `${wave} 0.6s ease-in-out`,
                              boxShadow: '0 6px 18px rgba(123,92,245,0.6)',
                              background: 'linear-gradient(90deg, #a78bfa, #7b5cf5)',
                            },

                            // Arrow animation
                            '& .arrow': {
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover .arrow': {
                              transform: 'translateX(6px)',
                            },
                          }}
                        >
                          <span>Read More</span>
                          <span className="arrow">→</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
                {/* Load More Button */}
                {visibleCount < allPosts.length && (
                  <div className="flex justify-center mt-6">
                    <Link
                      href="/posts"
                      className="px-6 py-2 text-sm font-semibold rounded-full border border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white transition-all duration-300"
                    >
                      Load More
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No posts available</p>
            )}
          </SectionCard>
          {/* categories */}
          <SectionCard
            label={t.categories}
            padding="p-6"
            labelPosition="top-4 left-4"
            customClasses="bg-white shadow-sm backdrop-blur-sm"
          >
            <CategoryCards categories={categories} loading={loading} />
          </SectionCard>
        </div>
        {/* Latest */}
        <div className="space-y-6 animate-fadeInSlow">
          <SectionCard
            label={t.latest}
            padding="p-5"
            labelPosition="top-3 left-3"
            customClasses="bg-white shadow-sm border border-black/10"
          >
            <LatestPosts posts={latestPosts} loading={loading} />
          </SectionCard>
          {/* popular */}
          <SectionCard
            label={t.popular}
            padding="p-3"
            labelPosition="top-4 left-4"
            customClasses="bg-white shadow-sm border border-black/10"
          >
            <MostViewedPosts posts={mostViewedPosts} loading={loading} />
          </SectionCard>

          <Sidebar />
        </div>
      </div>
    </main>
  )
}

function SectionCard({
  label,
  children,
  padding = 'p-6',
  labelPosition = 'top-4 left-4',
  customClasses = '',
}: {
  label: string
  children: React.ReactNode
  padding?: string
  labelPosition?: string
  customClasses?: string
}) {
  return (
    <section
      className={`relative rounded-2xl ${padding} mt-12 border-none shadow-none ${customClasses}`}
    >
      <div
        className={`absolute ${labelPosition} px-4 py-1.5 bg-linear-to-r from-purple-500 to-indigo-600 text-white text-sm font-bold rounded-full shadow-md`}
      >
        {label}
      </div>
      <div className="pt-8">{children}</div>
    </section>
  )
}
