// src/app/(frontend)/components/Sidebar.tsx
'use client'

import { LucideFacebook, LucideTwitter, LucideInstagram, LucideYoutube } from 'lucide-react'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

// Get language from .env (build-time constant)
const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'

// Use shared config for direction and font
const langConfig = getLanguageConfig(LANG_CODE)

// Translations for static UI text
const translations = {
  en: {
    advertisement: 'Advertisement',
    followUs: 'Follow Us',
  },
  he: {
    advertisement: 'פרסום',
    followUs: 'עקבו אחרינו',
  },
  hr: {
    advertisement: 'Oglašavanje',
    followUs: 'Pratite nas',
  },
}

const t = translations[LANG_CODE] || translations.en

export default function Sidebar() {
  return (
    <div className="space-y-6" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
      {/* Ads Placeholder */}
      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <div className="h-40 bg-gray-300 rounded mb-4"></div>
        <p className="text-sm text-gray-600">{t.advertisement}</p>
      </div>

      {/* Social Links */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-gray-800 mb-4">{t.followUs}</h3>
        <div
          className={`flex justify-center ${
            langConfig.direction === 'rtl' ? 'space-x-reverse' : ''
          } space-x-4`}
        >
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LucideFacebook size={24} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LucideTwitter size={24} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-pink-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LucideInstagram size={24} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-red-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LucideYoutube size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}
