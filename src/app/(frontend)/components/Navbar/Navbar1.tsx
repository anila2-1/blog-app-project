'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Facebook,
  Twitter,
  Instagram,
  Home,
  X as CloseIcon,
} from 'lucide-react'
import { IconButton, Button, TextField, Modal, Fade, Box } from '@mui/material'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'
import CategoryFilterBar from '../CategoryFilterBar/CategoryFilterBar1'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    home: 'Home',
    search: 'Search...',
    siteName: 'BLOGSITE',
    searchModalTitle: 'Type to start your search',
    searchButton: 'Search',
    close: 'Close',
    pressEsc: 'Press ESC to close',
  },
  he: {
    home: 'בית',
    search: 'חפש...',
    siteName: 'בלוגאתר  ',
    searchModalTitle: 'הקלד כדי להתחיל חיפוש',
    searchButton: 'חיפוש',
    close: 'סגור',
    pressEsc: 'לחץ ESC לסגור',
  },
  hr: {
    home: 'Početna',
    search: 'Pretraži...',
    siteName: 'BLOGSTRANICA',
    searchModalTitle: 'Upišite da biste započeli pretragu',
    searchButton: 'Pretraži',
    close: 'Zatvori',
    pressEsc: 'Pritisnite ESC za zatvaranje',
  },
  tr: {
    home: 'Ana Sayfa',
    search: 'Ara...',
    siteName: 'BLOGSİTESİ',
    searchModalTitle: 'Aramaya başlamak için yazın',
    searchButton: 'Ara',
    close: 'Kapat',
    pressEsc: "Kapatmak için ESC'ye basın",
  },
}

const t = translations[LANG_CODE] || translations.en

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font || 'Inter, sans-serif' }}
      className="sticky top-0 z-50 bg-linear-to-r from-[#ffffff] via-[#fffffd] to-[#fffefc] border-b border-gray-100 shadow-sm"
    >
      {/* 🔹 MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        {/* 🪶 Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
        >
          <span className="navbar-logo text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-purple-700 transition-colors">
            {t.siteName}
          </span>
        </Link>

        {/* 🌐 Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <CategoryFilterBar />
        </div>

        {/* 💫 Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <IconButton className="text-[#1877F2]! hover:bg-[#1877F2]/10!" size="small">
                <Facebook size={18} />
              </IconButton>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <IconButton className="text-[#1DA1F2]! hover:bg-[#1DA1F2]/10!" size="small">
                <Twitter size={18} />
              </IconButton>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <IconButton className="text-[#E4405F]! hover:bg-[#E4405F]/10!" size="small">
                <Instagram size={18} />
              </IconButton>
            </a>
          </div>

          {/* Search Button */}
          <IconButton
            onClick={() => setSearchOpen(true)}
            className="text-gray-700! hover:bg-purple-100! transition"
          >
            <SearchIcon size={20} />
          </IconButton>
        </div>

        {/* 🍔 Mobile Menu */}
        <div className="flex md:hidden">
          <IconButton
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700! hover:bg-gray-100!"
          >
            {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </IconButton>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-50 border-t border-gray-200 animate-fadeIn">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-gray-800 hover:text-purple-700 transition"
            >
              <SearchIcon size={18} />
              <span>{t.search}</span>
            </button>

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-800 hover:text-purple-700 transition"
            >
              <Home size={18} />
              <span>{t.home}</span>
            </Link>

            <div className="pt-3 border-t border-gray-200">
              <CategoryFilterBar />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <IconButton className="text-[#1877F2]! hover:bg-[#1877F2]/10!">
                <Facebook size={18} />
              </IconButton>
              <IconButton className="text-[#1DA1F2]! hover:bg-[#1DA1F2]/10!">
                <Twitter size={18} />
              </IconButton>
              <IconButton className="text-[#E4405F]! hover:bg-[#E4405F]/10!">
                <Instagram size={18} />
              </IconButton>
            </div>
          </div>
        </div>
      )}

      {/* 🔍 Stylish & Modern Search Modal */}
      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} closeAfterTransition>
        <Fade in={searchOpen}>
          <Box
            className="flex items-center justify-center p-4"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent dark background
              backdropFilter: 'blur(12px)', // Glass effect
              height: '100vh',
            }}
          >
            {/* Main Modal Container */}
            <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/60 p-8 relative overflow-hidden">
              {/* Close Button */}
              <IconButton
                onClick={() => setSearchOpen(false)}
                className="absolute top-4 right-4 text-gray-600! hover:text-gray-900! bg-white/80! rounded-full! p-1.5! shadow-sm!"
              >
                <CloseIcon size={20} />
              </IconButton>

              {/* Title */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">
                  {t.searchModalTitle}
                </h2>
                <div className="w-16 h-0.5 bg-linear-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="space-y-5">
                <div className="relative">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <SearchIcon size={20} />
                        </div>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        backgroundColor: 'white',
                        pl: 3, // Extra padding for icon
                        '& fieldset': {
                          borderColor: '#e5e7eb', // light gray
                          borderWidth: '2px',
                          transition: 'all 0.3s ease',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d1d5db', // medium gray
                          boxShadow: '0 0 0 4px rgba(147, 51, 234, 0.1)', // purple glow
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8b5cf6', // purple
                          borderWidth: '2px',
                          boxShadow: '0 0 0 4px rgba(147, 51, 234, 0.2)', // purple focus ring
                        },
                      },
                      '& .MuiInputBase-input': {
                        py: 1.8, // Vertical padding
                        pl: 10, // Left padding to make space for icon
                        pr: 3, // Right padding
                        fontSize: '1rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                </div>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: 'linear-gradient(135deg, #8b5cf6, #ec4899)', // Purple to pink gradient
                    color: '#fff',
                    textTransform: 'none',
                    borderRadius: '16px',
                    py: 1.8,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'linear-gradient(135deg, #7c3aed, #db2777)', // Darker gradient
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 2px 10px rgba(139, 92, 246, 0.3)',
                    },
                  }}
                >
                  {t.searchButton}
                </Button>
              </form>

              {/* ESC Hint */}
              <p className="text-center text-sm text-gray-500 mt-6 font-medium">{t.pressEsc}</p>
            </div>
          </Box>
        </Fade>
      </Modal>
    </nav>
  )
}
