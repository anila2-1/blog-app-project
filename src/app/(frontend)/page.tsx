//src/app/(frontend)/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import FeaturedPost from './components/FeaturedPost'
import MostViewedPosts from './components/MostViewedPosts'
import PinnedPosts from './components/PinnedPosts'
import LatestPosts from './components/LatestPosts'
import CategoryCards from './components/CategoryCards'
import Sidebar from './components/Sidebar'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

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
  image?: { url: string }
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [pinnedPosts, setPinnedPosts] = useState<SimplifiedPost[]>([])
  const [latestPosts, setLatestPosts] = useState<SimplifiedPost[]>([])
  const [mostViewedPosts, setMostViewedPosts] = useState<SimplifiedPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<SimplifiedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

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
        ]

        const [cat, pin, lat, view, feat] = await Promise.all(
          endpoints.map((url) => fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${url}`)),
        )

        const [catData, pinData, latData, viewData, featData] = await Promise.all([
          cat.json(),
          pin.json(),
          lat.json(),
          view.json(),
          feat.json(),
        ])

        setCategories(catData.docs || [])
        setPinnedPosts(pinData.docs || [])
        setLatestPosts(latData.docs || [])
        setMostViewedPosts(viewData.docs || [])
        setFeaturedPosts(featData.docs || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <div className="mb-10 relative">
        {/* 🎯 Main Container for Featured + Arrows */}
        <div className="relative">
          <SectionCard
            label="Featured"
            padding="p-4"
            labelPosition="top-3 left-3"
            customClasses="relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-tr opacity-60 -z-10" />

            {/* Render FeaturedPost */}
            <FeaturedPost posts={featuredPosts} loading={loading} currentIndex={currentIndex} />
          </SectionCard>

          {/* 🚀 ARROWS — Positioned Outside SectionCard, Floating Over Layout */}
          {featuredPosts.length > 1 && !loading && (
            <>
              {/* Left Arrow */}
              <button
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length,
                  )
                }
                aria-label="Previous featured post"
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-300 rounded-full p-2 shadow-sm cursor-pointer z-30 hidden sm:block transition-all hover:scale-110 hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-700"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredPosts.length)}
                aria-label="Next featured post"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-300 rounded-full p-2 shadow-sm cursor-pointer z-30 hidden sm:block transition-all hover:scale-110 hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-700"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* ✅ INDICATOR DOTS — Positioned BELOW the card, outside its container */}
        {featuredPosts.length > 1 && !loading && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {featuredPosts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to featured post ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
                  i === currentIndex
                    ? 'w-6 bg-linear-to-r from-yellow-400 to-amber-500 scale-110 opacity-100'
                    : 'bg-gray-300 hover:bg-gray-400 opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeUp">
        <div className="lg:col-span-2 space-y-8">
          <SectionCard label="Popular" padding="p-6" labelPosition="top-4 left-4">
            <MostViewedPosts posts={mostViewedPosts} loading={loading} />
          </SectionCard>

          <SectionCard label="Pinned" padding="p-3" labelPosition="top-4 left-4">
            <PinnedPosts posts={pinnedPosts} loading={loading} />
          </SectionCard>

          <SectionCard label="Categories" padding="p-6" labelPosition="top-4 left-4">
            <CategoryCards categories={categories} loading={loading} />
          </SectionCard>
        </div>

        <div className="space-y-6 animate-fadeInSlow">
          <SectionCard label="Latest" padding="p-5" labelPosition="top-3 left-3">
            <LatestPosts posts={latestPosts} loading={loading} />
          </SectionCard>
          <Sidebar />
        </div>
      </div>

      <SectionCard
        label="Explore"
        padding="py-12 px-6"
        labelPosition="top-4 left-6"
        customClasses="mt-16 text-center rounded-3xl relative overflow-hidden group animate-fadeUp bg-[#fff9ec] border border-black/10"
      >
        <div className="absolute inset-0 bg-[#fff9ec]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Discover More Inspiring Posts
          </h2>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            Stay inspired and explore our full collection of articles.
          </p>
          <Link
            href="/posts"
            className="inline-block relative px-8 py-4 rounded-full text-lg font-semibold bg-[#ffdf80] border-2 border-black text-black shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 ease-out"
          >
            <span className="flex items-center gap-2">
              View All Articles
              <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      </SectionCard>
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
      className={`relative overflow-hidden rounded-2xl ${padding} bg-[#fff9ec] border border-black/10 shadow-[2px_2px_0px_#00000066] transition-all duration-200 ease-out hover:-translate-y-[3px] active:translate-x-0.5 active:translate-y-0.5 ${customClasses}`}
    >
      <div
        className={`absolute ${labelPosition} px-3 py-1 bg-[#ffdf80] text-black text-xs font-bold border border-black/10 shadow-[2px_2px_0px_#00000088] rounded-tl-md rounded-br-md active:translate-x-px active:translate-y-px transition-all duration-200 ease-out`}
      >
        {label}
      </div>
      <div className="pt-6">{children}</div>
    </section>
  )
}
