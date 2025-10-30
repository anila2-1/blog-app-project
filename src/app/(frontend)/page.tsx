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
      {/* 🌈 Animated Category Bar */}

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
          {/* Optional Glow Background */}
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
            padding="p-6"
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
        customClasses="mt-16 text-center rounded-3xl relative overflow-hidden group animate-fadeUp bg-linear-to-br from-violet-50/70 to-purple-50/50 border-2 border-purple-200 backdrop-blur-sm"
      >
        {/* Decorative Floating Orbs (Optional) */}
        <div className="absolute top-10 -left-6 w-24 h-24 bg-purple-300/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute bottom-10 -right-6 w-32 h-32 bg-violet-300/20 rounded-full blur-xl animate-float-slow animation-delay-2000"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent mb-4 tracking-tight">
            Discover More Inspiring Posts
          </h2>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            Stay inspired and explore our full collection of articles.
          </p>

          <Link
            href="/posts"
            className="inline-block group relative px-8 py-4 rounded-full text-lg font-semibold text-white
    bg-linear-to-r from-sky-700 via-sky-600 to-sky-700
    shadow-lg shadow-sky-500/40 backdrop-blur-sm
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50
    hover:from-sky-500 hover:via-blue-500 hover:to-indigo-500
    before:absolute before:inset-0 before:rounded-full before:bg-white/30 before:blur-md before:opacity-0 before:transition-opacity before:duration-300
    before:group-hover:opacity-50
    after:absolute after:-inset-0.5 after:rounded-full after:bg-linear-to-r after:from-sky-300 after:to-blue-500 after:opacity-0 after:transition-opacity after:duration-500
    after:group-hover:opacity-30"
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
        bg-linear-to-br from-sky-50 via-blue-50 to-cyan-50
        border-2 border-sky-200
        rounded-2xl ${padding}
        backdrop-blur-sm
        transition-all duration-300 ease-out shadow-sm

        ${
          isPressed
            ? 'scale-[0.98] ring-2 ring-sky-300 shadow-inner'
            : 'hover:shadow-md hover:border-sky-300'
        }
        ${customClasses}
      `}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchEnd={onMouseUp}
    >
      {/* Floating gradient glow */}
      <div className="absolute inset-0 bg-linear-to-tr from-sky-100/40 to-cyan-100/30 blur-3xl opacity-50 -z-10"></div>

      {/* Corner Label */}
      <div
        className={`absolute ${labelPosition} px-3 py-1 bg-sky-800 text-white text-xs font-semibold rounded-tl-md rounded-br-md shadow-sm z-10`}
      >
        {label}
      </div>

      {/* Content */}
      <div className="pt-8">{children}</div>
    </section>
  )
}
