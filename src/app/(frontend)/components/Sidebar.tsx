'use client'

import { LucideFacebook, LucideTwitter, LucideInstagram, LucideYoutube } from 'lucide-react'
import { getLanguageConfig, LanguageCode, languages } from './../../../config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { advertisement: 'Advertisement', followUs: 'Follow Us' },
  he: { advertisement: 'פרסום', followUs: 'עקבו אחרינו' },
  hr: { advertisement: 'Oglašavanje', followUs: 'Pratite nas' },
  tr: { advertisement: 'Reklam', followUs: 'Bizi Takip Edin' },
}

const t = translations[LANG_CODE] || translations.en

export default function Sidebar() {
  return (
    <div className="space-y-8" dir={langConfig.direction} style={{ fontFamily: langConfig.font }}>
      {/* 🖼️ Advertisement Card */}
      <div
        className={`relative group rounded-2xl overflow-hidden bg-white p-6 
                    border border-black/10 shadow-[2px_2px_0px_#00000066] 
                    transition-all duration-200 ease-out 
                    hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5`}
      >
        {/* Subtle Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#F16363]/10 via-[#ff8a8a]/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10"></div>

        <div
          className={`h-40 bg-linear-to-br from-[#fdf8f0] via-[#fff5cf] to-[#fdf8f0] 
                      rounded-xl mb-5 flex items-center justify-center relative overflow-hidden 
                      border border-black/10 shadow-[2px_2px_0px_#00000066]
                      transition-all duration-200 ease-out 
                      active:translate-x-0.5 active:translate-y-0.5`}
        >
          <span className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-30"></span>
          <span className="text-black text-sm font-bold tracking-widest uppercase">AD SPACE</span>
        </div>

        <p className="text-sm text-black font-semibold text-center tracking-wide">
          {t.advertisement}
        </p>
      </div>

      {/* 🌐 Follow Us Card */}
      <div
        className={`bg-linear-to-br from-[#fdf8f0] via-[#fff5cf] to-[#fdf8f0]
              border border-black/10 shadow-[2px_2px_0px_#00000066] 
              transition-all duration-200 ease-out 
              hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 
              relative overflow-hidden rounded-2xl p-6`}
      >
        <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent"></div>

        {/* Title */}
        <h3 className="font-bold text-black text-lg mb-4 text-center relative z-10">
          <span className="relative z-10">{t.followUs}</span>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-1 bg-black rounded-full"></span>
        </h3>

        {/* Social Icons Row */}
        <div className="flex justify-center gap-4 py-2">
          <SocialIcon Icon={LucideFacebook} />
          <SocialIcon Icon={LucideTwitter} />
          <SocialIcon Icon={LucideInstagram} />
          <SocialIcon Icon={LucideYoutube} />
        </div>
      </div>
    </div>
  )
}

/* 🎨 Social Icon with Consistent Retro Press Feel */
function SocialIcon({ Icon }: { Icon: React.ElementType }) {
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-center w-12 h-12 rounded-full 
                  bg-white border border-black shadow-[2px_2px_0px_#000000]
                  transition-all duration-200 ease-out 
                  hover:-translate-y-[3px] active:translate-x-0.5 active:translate-y-0.5`}
    >
      <Icon
        size={20} // ✅ smaller icon for better fit inside 48x48 circle
        strokeWidth={2.5}
        className="text-black group-hover:text-[#F16363] transition-all duration-200 ease-out group-hover:scale-110"
      />
    </a>
  )
}
