// src/app/(frontend)/page.tsx

import Link from 'next/link'
import FeaturedPost from './components/FeaturedPost'
import MostViewedPosts from './components/MostViewedPosts'
import PinnedPosts from './components/PinnedPosts'
import LatestPosts from './components/LatestPosts'
import CategoryCards from './components/CategoryCards'
import Sidebar from './components/Sidebar'
import { getLanguageConfig, LanguageCode } from '@/config/languages'
import { getPayload } from '@/lib/payload'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

export default async function HomePage() {
  // Fetch data server-side
  const payload = await getPayload()

  // Fetch categories
  const categories = await payload.find({
    collection: 'categories',
    limit: 6,
    locale: langConfig.locale,
    depth: 1,
  })

  // Fetch pinned posts
  const pinnedPosts = await payload.find({
    collection: 'posts',
    where: { pinned: { equals: true } },
    limit: 3,
    locale: langConfig.locale,
    depth: 1,
  })

  // Fetch latest posts
  const latestPosts = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 4,
    locale: langConfig.locale,
    depth: 1,
  })

  // Fetch most viewed posts
  const mostViewedPosts = await payload.find({
    collection: 'posts',
    sort: '-views',
    limit: 4,
    locale: langConfig.locale,
    depth: 1,
  })

  // Fetch featured posts
  const featuredPosts = await payload.find({
    collection: 'posts',
    where: { featured: { equals: true } },
    sort: '-publishedAt',
    limit: 3,
    locale: langConfig.locale,
    depth: 1,
  })

  return (
    <main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* 🌟 Featured Post Section — with Navigation Arrows */}
      <div className="mb-10 relative">
        <SectionCard
          label="Featured"
          padding="p-4"
          labelPosition="top-3 left-3"
          customClasses="relative overflow-hidden"
        >
          {/* Soft gradient background */}
          <div className="absolute inset-0 bg-linear-to-tr from-purple-100 via-pink-50 to-blue-100 blur-3xl opacity-60 -z-10"></div>

          {/* 🧭 Navigation Arrows */}
          <button
            aria-label="Previous Featured Post"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-yellow-200 border-2 border-black
                 rounded-full w-10 h-10 flex items-center justify-center font-bold text-black
                 shadow-[3px_3px_0px_#000000] hover:bg-yellow-300
                 active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150"
            onClick={() => document.dispatchEvent(new CustomEvent('featured-prev'))}
          >
            ←
          </button>

          <button
            aria-label="Next Featured Post"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-yellow-200 border-2 border-black
                 rounded-full w-10 h-10 flex items-center justify-center font-bold text-black
                 shadow-[3px_3px_0px_#000000] hover:bg-yellow-300
                 active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150"
            onClick={() => document.dispatchEvent(new CustomEvent('featured-next'))}
          >
            →
          </button>

          {/* Featured Content */}
          <FeaturedPost posts={featuredPosts.docs} />
        </SectionCard>
      </div>

      {/* 📰 Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeUp">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* 🔥 Popular Articles */}
          <SectionCard label="Popular" padding="p-6" labelPosition="top-4 left-4">
            <MostViewedPosts posts={mostViewedPosts.docs} />
          </SectionCard>

          {/* Pinned Posts */}
          <SectionCard label="Pinned" padding="p-3" labelPosition="top-4 left-4">
            <PinnedPosts posts={pinnedPosts.docs} />
          </SectionCard>

          {/* 🏷️ Category Cards */}
          <SectionCard label="Categories" padding="p-6" labelPosition="top-4 left-4">
            <CategoryCards categories={categories.docs} />
          </SectionCard>
        </div>

        {/* 🧭 Sidebar */}
        <div className="space-y-6 animate-fadeInSlow">
          {/* 📰 Latest Posts */}
          <SectionCard label="Latest" padding="p-5" labelPosition="top-3 left-3">
            <LatestPosts posts={latestPosts.docs} />
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
        bg-[#fff9ec] border-2 border-black
        shadow-[2px_2px_0px_#00000066]
        transition-all duration-200 ease-out
        hover:-translate-y-[3px]
        active:translate-x-0.5 active:translate-y-0.5
        ${customClasses}
      `}
    >
      {/* 🏷️ Minimal Label — Clean Retro Look */}
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
