// src/app/(frontend)/page.tsx

'use client'

import Link from 'next/link'
import FeaturedPost from './components/FeaturedPost'
import MostViewedPosts from './components/MostViewedPosts'
import PinnedPosts from './components/PinnedPosts'
import LatestPosts from './components/LatestPosts'
import CategoryCards from './components/CategoryCards'
// import TagsCloud from './components/TagsCloud'
import Sidebar from './components/Sidebar'
import { languages } from '@/config/languages'
import { useState } from 'react'

export default function HomePage() {
  const [lang] = useState(process.env.NEXT_PUBLIC_DEFAULT_LANG || languages[0].code)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Featured Post */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">✨ Featured Post</h2>
            <FeaturedPost />
          </section>

          {/* Most Viewed */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔥 Most Viewed</h2>
            <MostViewedPosts />
          </section>

          {/* Pinned Posts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📌 Pinned Posts</h2>
            <PinnedPosts />
          </section>

          {/* Explore Topics */}
          <section>
            <CategoryCards />
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Latest Posts */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">📰 Latest Posts</h2>
            <LatestPosts />
          </section>

          {/* Tags Cloud
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">🏷️ Tags Cloud</h2>
            <TagsCloud />
          </section> */}

          {/* Sidebar Widgets */}
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

      {/* Footer Note */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        Built with Next.js 14 + Payload CMS • © {new Date().getFullYear()}
      </footer>
    </main>
  )
}
