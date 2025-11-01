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
      {/* 🖼️ Advertisement Card — Updated with #F16363 */}
      <div className="relative group rounded-2xl overflow-hidden bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#f0e6d2]">
        {/* Subtle #F16363 glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#F16363]/10 via-[#ff8a8a]/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10"></div>

        <div className="h-40 bg-linear-to-br from-[#fdf8f0] via-[#fff5cf] to-[#fdf8f0] rounded-xl mb-5 flex items-center justify-center relative overflow-hidden border border-[#f0e6d2]">
          <span className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-30"></span>
          <span className="text-black text-sm font-bold tracking-widest uppercase">AD SPACE</span>
        </div>

        <p className="text-sm text-black font-semibold text-center tracking-wide">
          {t.advertisement}
        </p>
      </div>

      {/* 🌐 Follow Us Card — Enhanced #F16363 Theme */}
      <div className="bg-linear-to-br from-[#F16363] to-[#ff7a7a] rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-[#F16363]/30 transition-all duration-500 relative overflow-hidden">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent"></div>

        <h3 className="font-bold text-white text-lg mb-5 text-center relative z-10">
          <span className="relative z-10">{t.followUs}</span>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-1 bg-white/60 rounded-full"></span>
        </h3>

        {/* ✨ Social Icons — Optional: make all glows match #F16363 for unity */}
        <div
          className={`flex justify-center ${
            langConfig.direction === 'rtl' ? 'space-x-reverse' : ''
          } space-x-6`}
        >
          <SocialIcon
            Icon={LucideFacebook}
            hoverColor="from-[#F16363] to-[#ff8a8a]"
            glow="shadow-[#F16363]/40"
          />
          <SocialIcon
            Icon={LucideTwitter}
            hoverColor="from-[#F16363] to-[#ff8a8a]"
            glow="shadow-[#F16363]/40"
          />
          <SocialIcon
            Icon={LucideInstagram}
            hoverColor="from-[#F16363] to-[#ff8a8a]"
            glow="shadow-[#F16363]/40"
          />
          <SocialIcon
            Icon={LucideYoutube}
            hoverColor="from-[#F16363] to-[#ff8a8a]"
            glow="shadow-[#F16363]/40"
          />
        </div>
      </div>
    </div>
  )
}

/* 🎨 Modern Social Icon Component — Unified with #F16363 */
function SocialIcon({
  Icon,
  hoverColor,
  glow,
}: {
  Icon: React.ElementType
  hoverColor: string
  glow: string
}) {
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative transition-all duration-500 transform hover:scale-110 active:scale-95"
    >
      {/* Glowing Background Circle */}
      <div
        className={`absolute inset-0 rounded-full bg-linear-to-tr ${hoverColor} opacity-0 group-hover:opacity-100 blur-md shadow-lg ${glow} transition-all duration-500`}
      ></div>

      {/* Icon Button */}
      <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-md group-hover:shadow-lg transition-all duration-500 border border-white/30">
        <Icon
          size={22}
          strokeWidth={2.5} // ✅ Thicker = Bolder appearance
          className="text-black group-hover:text-[#1d1c1c] transition-all duration-500 group-hover:scale-110"
        />
      </div>
    </a>
  )
}
