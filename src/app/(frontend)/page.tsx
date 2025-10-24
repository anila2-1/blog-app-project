// src/app/(frontend)/page.tsx

'use client'

import Link from 'next/link'
import FeaturedPost from './components/FeaturedPost'
import MostViewedPosts from './components/MostViewedPosts'
import PinnedPosts from './components/PinnedPosts'
import LatestPosts from './components/LatestPosts'
import CategoryCards from './components/CategoryCards'
import CategoryFilterBar from './components/CategoryFilterBar' // 👈 Re-add this
import Sidebar from './components/Sidebar'
import { languages } from '@/config/languages'
import { useState } from 'react'

export default function HomePage() {
  const [lang] = useState(process.env.NEXT_PUBLIC_DEFAULT_LANG || languages[0].code)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ✅ ONLY ON HOME PAGE */}
      <CategoryFilterBar />

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">✨ Featured Post</h2>
            <FeaturedPost />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔥 Most Viewed</h2>
            <MostViewedPosts />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📌 Pinned Posts</h2>
            <PinnedPosts />
          </section>

          <section>
            <CategoryCards />
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">📰 Latest Posts</h2>
            <LatestPosts />
          </section>
          <Sidebar />
        </div>
      </div>

      {/* Call to Action */}
      <section className="mt-16 text-center py-12 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore All Posts</h2>
        <Link
          href="/posts"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          View All Articles
        </Link>
      </section>
    </main>
  )
}
