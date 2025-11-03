// src/app/(frontend)/components/Navbar.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Home, Search, Menu, X, Facebook, Twitter, Instagram, X as CloseIcon } from 'lucide-react'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'
import CategoryFilterBar from './CategoryFilterBar'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    home: 'HOME',
    search: 'Search...',
    siteName: 'BLOGSITE',
    searchModalTitle: 'Type to start your search',
    searchButton: 'SEARCH',
    close: 'Close',
    pressEsc: 'Press ESC to close',
  },
  he: {
    home: 'בית',
    search: 'חפש...',
    siteName: 'BLOGSITE',
    searchModalTitle: 'הקלד כדי להתחיל חיפוש',
    searchButton: 'חיפוש',
    close: 'סגור',
    pressEsc: 'לחץ ESC לסגור',
  },
  hr: {
    home: 'POČETNA',
    search: 'Pretraži...',
    siteName: 'BLOGSITE',
    searchModalTitle: 'Upišite da biste započeli pretragu',
    searchButton: 'PRETRAŽI',
    close: 'Zatvori',
    pressEsc: 'Pritisnite ESC za zatvaranje',
  },
}

const t = translations[LANG_CODE] || translations.en

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Handle Escape Key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav
      className="w-full mb-6 bg-yellow-50 sticky top-0 z-50"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-purple-800 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-black">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-extrabold text-purple-900 uppercase tracking-wider">
              {t.siteName}
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <CategoryFilterBar />
        </div>

        {/* Desktop Right Icons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social Icons - Animated */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-1 text-gray-800 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110 hover:-translate-y-0.5 active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-4 h-4 transition-transform duration-300" />
            </a>
            <a
              href="#"
              className="p-1 text-gray-800 hover:text-sky-500 transition-colors duration-300 transform hover:scale-110 hover:-translate-y-0.5 active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-4 h-4 transition-transform duration-300" />
            </a>
            <a
              href="#"
              className="p-1 text-gray-800 hover:text-pink-600 transition-colors duration-300 transform hover:scale-110 hover:-translate-y-0.5 active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-4 h-4 transition-transform duration-300" />
            </a>
          </div>

          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gray-800 hover:text-purple-700 transition-colors duration-300 transform hover:scale-110 hover:-translate-y-0.5 active:scale-95"
          >
            <Search className="w-5 h-5 transition-transform duration-300" />
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none hover:text-black transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Wavy Line Under Logo */}
      <div
        className="border-t-3 border-black w-full mx-auto my-2"
        style={{
          background:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, black 10px, black 20px)',
        }}
      ></div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-50 border-t border-black/20">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-800 hover:text-black transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <span className="text-gray-800">{t.search}</span>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span>{t.home}</span>
            </Link>

            <div className="pt-3 border-t border-black/20">
              <CategoryFilterBar />
            </div>

            {/* Mobile Social Icons - Animated */}
            <div className="flex items-center gap-4 pt-4 border-t border-black/20">
              <a
                href="#"
                className="p-2 text-gray-800 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-800 hover:text-sky-500 transition-colors duration-300 transform hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-800 hover:text-pink-600 transition-colors duration-300 transform hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 FULLSCREEN SEARCH MODAL — First Image Style */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-yellow-50 flex flex-col items-center justify-center p-4"
          style={{ fontFamily: langConfig.font }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors border-2 border-black"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          {/* ESC Hint */}
          <p className="text-gray-800 mb-6 text-lg font-bold">{t.pressEsc}</p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchModalTitle}
                className="w-full pl-4 pr-12 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors border-2 border-white"
              >
                {t.searchButton}
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  )
}
