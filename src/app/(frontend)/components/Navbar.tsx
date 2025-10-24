'use client'

import React, { useState } from 'react'
import { Home, Search, Menu, X, Facebook, Twitter, Instagram } from 'lucide-react'

// Mock language configuration
const LANG_CODE = 'en' // Default language

const langConfig = {
  direction: 'ltr',
  font: 'Inter, system-ui, sans-serif',
}

// Translations
const translations = {
  en: {
    home: 'Home',
    search: 'Search...',
    siteName: 'BlogSite',
  },
  he: {
    home: 'דף הבית',
    search: 'חפש...',
    siteName: 'BlogSite',
  },
  hr: {
    home: 'Početna',
    search: 'Pretraži...',
    siteName: 'BlogSite',
  },
}

const t = translations[LANG_CODE] || translations.en

export default function App() {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (search.trim()) {
      alert(`Searching for: ${search}`)
    }
  }

  return (
    <nav
      className="w-full bg-linear-to-r from-indigo-50 to-purple-50 border-b border-indigo-100 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-90"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          {t.siteName}
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-indigo-400 w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search}
              className="border border-indigo-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </form>

          {/* Home Link */}
          <a
            href="/"
            className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 transition-all duration-300 group"
          >
            <Home className="text-lg group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium">{t.home}</span>
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-800 transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 hover:text-sky-800 transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 hover:text-pink-800 transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-3 md:hidden">
          <Search className="text-indigo-600 w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-300" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-indigo-700 focus:outline-none hover:text-indigo-900 transition-colors duration-300"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className={`md:hidden bg-linear-to-r from-indigo-50 to-purple-50 border-t border-indigo-100 animate-fadeIn ${
            langConfig.direction === 'rtl' ? 'text-right' : 'text-left'
          }`}
        >
          <div className="flex flex-col items-start px-6 py-6 space-y-5">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="text-indigo-400 w-4 h-4" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.search}
                className="w-full border border-indigo-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </form>

            {/* Home Link */}
            <a
              href="/"
              className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 transition-all duration-300 group"
              onClick={() => setMenuOpen(false)}
            >
              <Home className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">{t.home}</span>
            </a>

            {/* Social Icons - Mobile */}
            <div className="flex items-center gap-4 pt-4 border-t border-indigo-100 w-full">
              <a
                href="#"
                className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-800 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 hover:text-sky-800 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 hover:text-pink-800 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
