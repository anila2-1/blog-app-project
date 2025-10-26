'use client'

import { LucideFacebook, LucideTwitter, LucideInstagram, LucideYoutube } from 'lucide-react'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

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
    <div className="space-y-8" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
      {/* 🖼️ Advertisement Card */}
      <div className="relative group rounded-2xl overflow-hidden bg-linear-to-tr from-gray-100 via-gray-50 to-white p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-700 -z-10"></div>

        <div className="h-40 bg-linear-to-br from-gray-200 via-gray-300 to-gray-200 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden">
          <span className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-20"></span>
          <span className="text-gray-500 text-sm font-semibold tracking-widest animate-pulse">
            AD SPACE
          </span>
        </div>

        <p className="text-sm text-gray-700 font-medium text-center tracking-wide">
          {t.advertisement}
        </p>
      </div>

      {/* 🌐 Follow Us Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500">
        <h3 className="font-bold text-gray-900 text-lg mb-5 text-center relative">
          <span className="relative z-10">{t.followUs}</span>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-1 bg-linear-to-r from-pink-500 to-purple-500 rounded-full"></span>
        </h3>

        {/* Animated Social Icons */}
        <div
          className={`flex justify-center ${
            langConfig.direction === 'rtl' ? 'space-x-reverse' : ''
          } space-x-5`}
        >
          <SocialIcon Icon={LucideFacebook} color="hover:text-blue-600" bg="hover:bg-blue-50" />
          <SocialIcon Icon={LucideTwitter} color="hover:text-sky-500" bg="hover:bg-sky-50" />
          <SocialIcon Icon={LucideInstagram} color="hover:text-pink-600" bg="hover:bg-pink-50" />
          <SocialIcon Icon={LucideYoutube} color="hover:text-red-600" bg="hover:bg-red-50" />
        </div>
      </div>
    </div>
  )
}

/* 🎨 Small reusable icon component with animation */
function SocialIcon({ Icon, color, bg }: { Icon: React.ElementType; color: string; bg: string }) {
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className={`transition-all duration-500 transform hover:scale-110 ${bg} rounded-full p-3 shadow-sm hover:shadow-md`}
    >
      <Icon size={22} className={`text-gray-600 transition-colors duration-500 ${color}`} />
    </a>
  )
}
