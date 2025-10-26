// src/app/(frontend)/components/Navbar.tsx

'use client'

import React, { useState } from 'react'
import { Home, Search, Menu, X, Facebook, Twitter, Instagram, X as CloseIcon } from 'lucide-react'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    home: 'Home',
    search: 'Search...',
    siteName: 'BlogSite',
    searchModalTitle: 'Type to start your search',
    searchButton: 'Search',
    close: 'Close',
    pressEsc: 'Press ESC to close',
  },
  he: {
    home: 'דף הבית',
    search: 'חפש...',
    siteName: 'BlogSite',
    searchModalTitle: 'הקלד כדי להתחיל חיפוש',
    searchButton: 'חיפוש',
    close: 'סגור',
    pressEsc: 'לחץ ESC לסגור',
  },
  hr: {
    home: 'Početna',
    search: 'Pretraži...',
    siteName: 'BlogSite',
    searchModalTitle: 'Upišite da biste započeli pretragu',
    searchButton: 'Pretraži',
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
          {/* Search Icon - Opens Modal */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-800 transition-all duration-300 group"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          </button>

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
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-800 transition-all duration-300 group"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
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
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 w-full p-2 text-indigo-700 hover:text-indigo-900 transition-all duration-300 group"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">{t.search}</span>
            </button>

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

      {/* 🔥 FULLSCREEN SEARCH MODAL — Exactly like TheCozyGamer.com */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-linear-to-br from-yellow-50 via-orange-50 to-red-50 flex flex-col items-center justify-center p-4"
          style={{ fontFamily: langConfig.font }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          {/* ESC Hint */}
          <p className="text-gray-700 mb-6 text-xl font-semibold">{t.pressEsc}</p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchModalTitle}
                className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all"
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
