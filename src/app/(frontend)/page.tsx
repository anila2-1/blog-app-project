// src/app/(frontend)/page.tsx

'use client'

import Link from 'next/link'
import FeaturedPost from './components/FeaturedPost'
import MostViewedPosts from './components/MostViewedPosts'
import PinnedPosts from './components/PinnedPosts'
import LatestPosts from './components/LatestPosts'
import CategoryCards from './components/CategoryCards'
// import CategoryFilterBar from './components/CategoryFilterBar'
import Sidebar from './components/Sidebar'
import { getLanguageConfig, LanguageCode } from '@/config/languages'
import { useState } from 'react'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

export default function HomePage() {
  // States for click animations
  const [pressedSections, setPressedSections] = useState({
    featured: false,
    popular: false,
    pinned: false,
    categories: false,
    latest: false,
    cta: false,
  })

  const handleMouseDown = (key: keyof typeof pressedSections) => () =>
    setPressedSections((prev) => ({ ...prev, [key]: true }))

  const handleMouseUp = (key: keyof typeof pressedSections) => () =>
    setPressedSections((prev) => ({ ...prev, [key]: false }))

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
          isPressed={pressedSections.featured}
          onMouseDown={handleMouseDown('featured')}
          onMouseUp={handleMouseUp('featured')}
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
          <FeaturedPost />
        </SectionCard>
      </div>

      {/* 📰 Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeUp">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* 🔥 Popular Articles */}
          <SectionCard
            label="Popular"
            isPressed={pressedSections.popular}
            onMouseDown={handleMouseDown('popular')}
            onMouseUp={handleMouseUp('popular')}
            padding="p-6"
            labelPosition="top-4 left-4"
          >
            <MostViewedPosts />
          </SectionCard>

          {/* Pinned Posts */}
          <SectionCard
            label="Pinned"
            isPressed={pressedSections.pinned}
            onMouseDown={handleMouseDown('pinned')}
            onMouseUp={handleMouseUp('pinned')}
            padding="p-3"
            labelPosition="top-4 left-4"
          >
            <PinnedPosts />
          </SectionCard>

          {/* 🏷️ Category Cards */}
          <SectionCard
            label="Categories"
            isPressed={pressedSections.categories}
            onMouseDown={handleMouseDown('categories')}
            onMouseUp={handleMouseUp('categories')}
            padding="p-6"
            labelPosition="top-4 left-4"
          >
            <CategoryCards />
          </SectionCard>
        </div>

        {/* 🧭 Sidebar */}
        <div className="space-y-6 animate-fadeInSlow">
          {/* 📰 Latest Posts */}
          <SectionCard
            label="Latest"
            isPressed={pressedSections.latest}
            onMouseDown={handleMouseDown('latest')}
            onMouseUp={handleMouseUp('latest')}
            padding="p-5"
            labelPosition="top-3 left-3"
          >
            <LatestPosts />
          </SectionCard>

          <Sidebar />
        </div>
      </div>

      {/* 💫 Call To Action Section */}
      <SectionCard
        label="Explore"
        isPressed={pressedSections.cta}
        onMouseDown={handleMouseDown('cta')}
        onMouseUp={handleMouseUp('cta')}
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
  isPressed,
  onMouseDown,
  onMouseUp,
  padding = 'p-6',
  labelPosition = 'top-4 left-4',
  customClasses = '',
}: {
  label: string
  children: React.ReactNode
  isPressed: boolean
  onMouseDown: () => void
  onMouseUp: () => void
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
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchEnd={onMouseUp}
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
