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
import { languages } from '@/config/languages'
import { useState } from 'react'

export default function HomePage() {
  const [lang] = useState(process.env.NEXT_PUBLIC_DEFAULT_LANG || languages[0].code)

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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 🌟 Featured Post Section */}
      <div className="mb-10">
        <SectionCard
          label="Featured"
          isPressed={pressedSections.featured}
          onMouseDown={handleMouseDown('featured')}
          onMouseUp={handleMouseUp('featured')}
          padding="p-4"
          labelPosition="top-3 left-3"
          customClasses="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-purple-100 via-pink-50 to-blue-100 blur-3xl opacity-60 -z-10"></div>
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
        customClasses="mt-16 text-center rounded-3xl relative overflow-hidden group animate-fadeUp bg-gradient-to-br from-[#1a1a1a] via-[#2a1a1f] to-[#3a1f25] border-2 border-[#F16363]/30"
      >
        {/* Decorative Floating Orbs — Updated to #F16363 tone */}
        <div className="absolute top-10 -left-6 w-24 h-24 bg-[#F16363]/10 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute bottom-10 -right-6 w-32 h-32 bg-[#F16363]/15 rounded-full blur-xl animate-float-slow animation-delay-2000"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Heading — Gradient from dark red to #F16363 */}
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-[#F16363] to-[#ff8a8a] bg-clip-text text-white mb-4 tracking-tight">
            Discover More Inspiring Posts
          </h2>

          {/* Description — Light text for dark bg */}
          <p className="text-gray-200 mb-10 text-lg leading-relaxed">
            Stay inspired and explore our full collection of articles.
          </p>

          {/* Button — #F16363 based gradient */}
          <Link
            href="/posts"
            className="inline-block group relative px-8 py-4 rounded-full text-lg font-semibold text-black
        bg-linear-to-r from-[#ffe3e3] to-[#ffe3e3]
        shadow-lg shadow-[#F16363]/30 backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-xl hover:shadow-[#F16363]/40
        hover:from-[#ffdada] hover:to-[#ffdada]
        before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:blur-md before:opacity-0 before:transition-opacity before:duration-300
        before:group-hover:opacity-40
        after:absolute after:-inset-0.5 after:rounded-full after:bg-linear-to-r after:from-[#F16363]/30 after:to-[#ff8a8a]/30 after:opacity-0 after:transition-opacity after:duration-500
        after:group-hover:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
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

// 🔧 Reusable SectionCard Component — Updated with #F16363 Theme

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
        relative overflow-hidden
        bg-linear-to-br from-[#F16363] via-[#F16363] to-[#F16363]
        border-2 border-[#F16363]/30
        rounded-2xl ${padding}
        transition-all duration-300 ease-out
        ${
          isPressed
            ? 'scale-[0.98] ring-2 ring-[#F16363]/50 shadow-inner'
            : 'hover:shadow-lg hover:border-[#F16363]/50'
        }
        ${customClasses}
      `}
      style={{
        boxShadow: '7px 7px 0px #000000',
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchEnd={onMouseUp}
    >
      {/* Floating glow in #F16363 tone */}
      <div className="absolute inset-0 bg-linear-to-tr from-[#F16363]/10 via-transparent to-[#F16363]/5 blur-3xl opacity-70 -z-10"></div>

      {/* Corner Label — Now in #F16363 */}
      <div
        className={`absolute ${labelPosition} px-3 py-1 bg-[#ffffff] text-black text-xs font-semibold rounded-tl-md rounded-br-md shadow-sm z-10`}
      >
        {label}
      </div>

      {/* Content */}
      <div className="pt-8 text-white">{children}</div>
    </section>
  )
}
