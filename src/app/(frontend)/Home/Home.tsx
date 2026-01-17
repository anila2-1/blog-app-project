'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import FeaturedPost from './../components/FeaturedPost/FeaturedPost1'
import MostViewedPosts from './../components/MostViewedPosts'
import PinnedPosts from './../components/PinnedPosts'
import LatestPosts from './../components/LatestPosts'
import CategoryCards from './../components/CategoryCards'
import Sidebar from './../components/Sidebar'
import { Button } from '@mui/material'
import { keyframes } from '@mui/system'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'
import Image from 'next/image'

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
  const [visibleCount] = useState(8)

  // Individual loading states for each section
  const [loadingStates, setLoadingStates] = useState({
    categories: true,
    pinned: true,
    latest: true,
    mostViewed: true,
    featured: true,
    allPosts: true,
  })

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
    let isMounted = true

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

        const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL

        // Fetch all in parallel
        const responses = await Promise.all(
          endpoints.map((url) =>
            fetch(`${baseUrl}${url}`)
              .then((r) => r.json())
              .catch((e) => {
                console.error(`Error fetching ${url}:`, e)
                return { docs: [] }
              }),
          ),
        )

        if (!isMounted) return

        const [catData, pinData, latData, viewData, featData, allData] = responses

        // Batch all state updates at once
        setCategories(catData.docs || [])
        setPinnedPosts(pinData.docs || [])
        setLatestPosts(latData.docs || [])
        setMostViewedPosts(viewData.docs || [])
        setFeaturedPosts(featData.docs || [])
        setAllPosts(allData.docs || [])

        setLoadingStates({
          categories: false,
          pinned: false,
          latest: false,
          mostViewed: false,
          featured: false,
          allPosts: false,
        })

        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (featuredPosts.length > 1 && !loading) {
      startAutoPlay()
    }

    return () => stopAutoPlay()
  }, [featuredPosts.length, loading])

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
      className="mx-auto px-0.5 sm:px-1 max-w-full lg:px-1.5 py-4"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* Featured Section */}
      <div className="mb-2 sm:mb-6 md:mb-4 mt-[-18] relative">
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-black/10 shadow-lg"
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
            <PinnedPosts posts={pinnedPosts} loading={loadingStates.pinned} />
          </SectionCard>

          {/* All Post */}
          <SectionCard
            label={t.allPosts}
            padding="p-4 sm:p-6"
            labelPosition="top-4 left-4"
            customClasses="mt-10 mb-2"
          >
            {loadingStates.allPosts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-white shadow-md rounded-xl overflow-hidden border border-gray-100"
                  >
                    <div className="w-full h-40 sm:h-48 bg-gray-200"></div>
                    <div className="p-3 sm:p-4 space-y-3">
                      <div className="w-3/4 h-4 sm:h-5 bg-gray-200 rounded"></div>
                      <div className="w-5/6 h-3 sm:h-4 bg-gray-200 rounded"></div>
                      <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : allPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                  {allPosts.slice(0, visibleCount).map((post) => (
                    <div
                      key={post.id}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102 hover:-translate-y-1 flex flex-col h-full border border-gray-50"
                    >
                      {/* Image - Full width at top */}
                      {post.image?.url && (
                        <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-linear-to-br from-purple-200 to-indigo-200">
                          <Image
                            src={post.image.url}
                            alt={post.title}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                            priority={true}
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between p-3 sm:p-4">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-purple-600 transition-all line-clamp-2 mb-1.5 sm:mb-2">
                            {post.title}
                          </h3>

                          {post?.publishedAt && (
                            <div className="flex items-center text-xs text-slate-500 mb-2 sm:mb-3 opacity-75 group-hover:opacity-100 transition-opacity">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3 h-3 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                />
                              </svg>
                              {new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                          )}
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2 sm:mb-3 opacity-90 group-hover:opacity-100 transition-opacity">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Read More Button */}
                        <Link href={`/${post.slug}`} className="w-full">
                          <Button
                            variant="contained"
                            sx={{
                              px: 1.5,
                              py: 0.4,
                              borderRadius: '30px',
                              fontSize: '0.8rem',
                              fontWeight: '400',
                              fontFamily: "'Poppins', sans-serif",
                              textTransform: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
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
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-12">No posts available</p>
            )}
          </SectionCard>
          {/* categories */}
          <SectionCard
            label={t.categories}
            padding="p-6"
            labelPosition="top-4 left-4"
            customClasses="bg-white shadow-sm backdrop-blur-sm "
          >
            <CategoryCards categories={categories} loading={loadingStates.categories} />
          </SectionCard>
        </div>
        {/* Latest */}
        <div className="space-y-6 mt-[-14] animate-fadeInSlow">
          <SectionCard
            label={t.latest}
            padding="p-5"
            labelPosition="top-3 left-3"
            customClasses="bg-white shadow-sm border border-black/10"
          >
            <LatestPosts posts={latestPosts} loading={loadingStates.latest} />
          </SectionCard>
          {/* popular */}
          {/* popular */}
          <SectionCard
            label={t.popular}
            padding="p-3"
            labelPosition="top-4 left-4"
            customClasses="bg-white shadow-sm border border-black/10"
          >
            <MostViewedPosts posts={mostViewedPosts} loading={loadingStates.mostViewed} />
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
  padding = 'p-4',
  labelPosition = 'top-3 left-3',
  customClasses = '',
}: {
  label: string
  children: React.ReactNode
  padding?: string
  labelPosition?: string
  customClasses?: string
}) {
  return (
    <section className={`relative rounded-2xl ${padding} mt-4 ${customClasses}`}>
      <div
        className={`absolute ${labelPosition} px-3 py-1 bg-linear-to-r from-purple-500 to-indigo-600 
        text-white text-xs font-bold rounded-full shadow-md`}
      >
        {label}
      </div>

      <div className="pt-7">{children}</div>
    </section>
  )
}
