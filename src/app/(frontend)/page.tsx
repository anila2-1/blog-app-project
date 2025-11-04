// src/app/(frontend)/page.tsx

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

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const categoriesRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=6&locale=${langConfig.locale}&depth=1`,
        )
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData.docs || [])

        // Fetch pinned posts
        const pinnedRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[pinned][equals]=true&limit=3&locale=${langConfig.locale}&depth=1`,
        )
        const pinnedData = await pinnedRes.json()
        setPinnedPosts(pinnedData.docs || [])

        // Fetch latest posts
        const latestRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-publishedAt&limit=4&locale=${langConfig.locale}&depth=1`,
        )
        const latestData = await latestRes.json()
        setLatestPosts(latestData.docs || [])

        // Fetch most viewed posts
        const viewedRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-views&limit=4&locale=${langConfig.locale}&depth=1`,
        )
        const viewedData = await viewedRes.json()
        setMostViewedPosts(viewedData.docs || [])

        // Fetch featured posts
        const featuredRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[featured][equals]=true&sort=-publishedAt&limit=3&locale=${langConfig.locale}&depth=1`,
        )
        const featuredData = await featuredRes.json()
        setFeaturedPosts(featuredData.docs || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <div className="text-center py-20">
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* 🌟 Featured Post Section */}
      <div className="mb-10 relative">
        <SectionCard
          label="Featured"
          padding="p-4"
          labelPosition="top-3 left-3"
          customClasses="relative overflow-hidden"
        >
          {/* Soft gradient background */}
          <div className="absolute inset-0 bg-linear-to-tr from-purple-100 via-pink-50 to-blue-100 blur-3xl opacity-60 -z-10"></div>

          {/* Featured Content */}
          <FeaturedPost posts={featuredPosts} />
        </SectionCard>
      </div>

      {/* 📰 Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeUp">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* 🔥 Popular Articles */}
          <SectionCard label="Popular" padding="p-6" labelPosition="top-4 left-4">
            <MostViewedPosts posts={mostViewedPosts} />
          </SectionCard>

          {/* Pinned Posts */}
          <SectionCard label="Pinned" padding="p-3" labelPosition="top-4 left-4">
            <PinnedPosts posts={pinnedPosts} />
          </SectionCard>

          {/* 🏷️ Category Cards */}
          <SectionCard label="Categories" padding="p-6" labelPosition="top-4 left-4">
            <CategoryCards categories={categories} />
          </SectionCard>
        </div>

        {/* 🧭 Sidebar */}
        <div className="space-y-6 animate-fadeInSlow">
          {/* 📰 Latest Posts */}
          <SectionCard label="Latest" padding="p-5" labelPosition="top-3 left-3">
            <LatestPosts posts={latestPosts} />
          </SectionCard>

          <Sidebar />
        </div>
      </div>

      {/* 💫 Call To Action Section */}
      <SectionCard
        label="Explore"
        padding="py-12 px-6"
        labelPosition="top-4 left-6"
        customClasses="mt-16 text-center rounded-3xl relative overflow-hidden group animate-fadeUp bg-[#fff9ec] border border-black/10"
      >
        <div className="absolute inset-0 bg-[#fff9ec]"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Discover More Inspiring Posts
          </h2>

          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            Stay inspired and explore our full collection of articles.
          </p>

          <Link
            href="/posts"
            className="inline-block relative px-8 py-4 rounded-full text-lg font-semibold
      bg-[#ffdf80] border-2 border-black text-black
      shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5
      active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 ease-out"
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

// 🔧 Reusable SectionCard Component

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
      className={`
        relative overflow-hidden rounded-2xl ${padding}
        bg-[#fff9ec] border border-black/10
        shadow-[2px_2px_0px_#00000066]
        transition-all duration-200 ease-out
        hover:-translate-y-[3px]
        active:translate-x-0.5 active:translate-y-0.5
        ${customClasses}
      `}
    >
      {/* Minimal Label — Clean Retro Look */}
      <div
        className={`absolute ${labelPosition} px-3 py-1
        bg-[#ffdf80] text-black text-xs font-bold
        border-2 border-black
        shadow-[2px_2px_0px_#00000066]
        rounded-tl-md rounded-br-md
        active:translate-x-px active:translate-y-px
        transition-all duration-200 ease-out`}
      >
        {label}
      </div>

      {/* Content */}
      <div className="pt-6">{children}</div>
    </section>
  )
}
