// src/app/(frontend)/components/Footer.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    siteName: 'BLOGSITE',
    about:
      'A modern blog platform powered by Payload CMS, designed for content creators who love flexibility, simplicity, and elegant design.',
    quickLinks: 'Quick Links',
    home: 'Home',
    posts: 'Posts',
    aboutPage: 'About Us',
    contactPage: 'Contact Us',
    privacyPage: 'Privacy Policy',
    stayConnected: 'Stay Connected',
    followText: 'Follow us for updates, design inspiration, and Payload CMS tips.',
    builtWith: 'Built with love using Next.js & Payload CMS.',
  },
  he: {
    siteName: 'בלוגאתר  ',
    about:
      'פלטפורמת בלוגים מודרנית המופעלת על ידי Payload CMS, שנועדה ליוצרים שאוהבים גמישות, פשטות ועיצוב אלגנטי.',
    quickLinks: 'קישורים מהירים',
    home: 'בית',
    posts: 'פוסטים',
    aboutPage: 'אודות',
    contactPage: 'צור קשר',
    privacyPage: 'מדיניות פרטיות',
    stayConnected: 'הישארו מחוברים',
    followText: 'עקבו אחרינו לעדכונים, השראה בעיצוב וטיפים ל-Payload CMS.',
    builtWith: 'נבנה באהבה באמצעות Next.js ו-Payload CMS.',
  },
  hr: {
    siteName: 'SaznajHR',
    about:
      'Najnovije vijesti iz Hrvatske, cijene na tržištu, tečajevi i dramske serije koje svi gledaju. Ažurira se svaki dan na SaznajHR.com.',
    quickLinks: 'Brze Poveznice',
    home: 'Početna',
    posts: 'Objave',
    aboutPage: 'O Nama',
    contactPage: 'Kontakt',
    privacyPage: 'Privatnost',
    stayConnected: 'Ostanite Povezani',
    followText: 'Hrvatske vijesti, cijene, tečajevi i serije – svaki dan ažurirano',
    builtWith: 'Izrađeno s ljubavlju za informiranje Hrvatske',
  },
  tr: {
    siteName: 'BLOGSİTESİ',
    about:
      'Payload CMS ile güçlendirilen modern bir blog platformu, esnekliği, basitliği ve zarif tasarımı seven içerik yaratıcıları için tasarlandı.',
    quickLinks: 'Hızlı Bağlantılar',
    home: 'Ana Sayfa',
    posts: 'Gönderiler',
    aboutPage: 'Hakkında',
    contactPage: 'İletişim',
    privacyPage: 'Gizlilik Politikası',
    stayConnected: 'Bağlantıda Kalın',
    followText: 'Güncellemeler, tasarım ilhamı ve Payload CMS ipuçları için bizi takip edin.',
    builtWith: 'Next.js ve Payload CMS kullanarak sevgiyle yapıldı.',
  },
}

const t = translations[LANG_CODE] || translations.en

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="relative bg-white text-gray-800 pt-16 pb-8 border-t border-gray-200"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Left - Brand Info */}
          <div className="space-y-6">
            <Link
              href="/"
              className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
            >
              <span className="navbar-logo text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-purple-700 transition-colors">
                {t.siteName}
              </span>
            </Link>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{t.about}</p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-6">{t.quickLinks}</h4>

            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {[
                { name: t.home, href: '/' },
                { name: t.aboutPage, href: '/about-us' },
                { name: t.posts, href: '/posts' },

                { name: t.contactPage, href: '/contact-us' },
                { name: t.privacyPage, href: '/privacy-policy' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center text-gray-700 hover:text-purple-700 font-medium transition-all duration-300"
                  >
                    <span className="mr-2 inline-block transform transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-4 h-4 text-purple-500 group-hover:text-purple-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10l18-7-8 18-2-8-8-3z"
                        />
                      </svg>
                    </span>

                    {link.name}

                    <span className="ml-2 w-0 group-hover:w-4 h-0.5 bg-purple-400 rounded-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Social & Scroll */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">{t.stayConnected}</h4>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">{t.followText}</p>

            <div className="flex space-x-3 mb-8">
              {[
                { Icon: Facebook, color: 'text-blue-600', hover: 'hover:bg-blue-50' },
                { Icon: Twitter, color: 'text-sky-500', hover: 'hover:bg-sky-50' },
                { Icon: Instagram, color: 'text-pink-500', hover: 'hover:bg-pink-50' },
                { Icon: Linkedin, color: 'text-blue-700', hover: 'hover:bg-blue-50' },
              ].map(({ Icon, color, hover }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-3 rounded-full border border-gray-200 ${color} ${hover} bg-white shadow-sm hover:shadow-md transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-offset-2`}
                  aria-label={`Follow us on ${Icon.name}`}
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                </a>
              ))}
            </div>

            {isVisible && (
              <button
                onClick={handleScrollTop}
                className="
                  fixed bottom-8 right-8 z-50 
                  flex items-center justify-center
                  w-12 h-12
                  bg-white backdrop-blur-sm
                  border border-gray-300
                  text-gray-700 font-bold 
                  rounded-full
                  shadow-md hover:shadow-lg
                  hover:bg-linear-to-r from-purple-500 to-indigo-600
                  hover:text-white
                  transition-all duration-200 ease-out
                  hover:scale-125 active:scale-95
                  animate-bounce
                "
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 text-center text-xs md:text-sm text-gray-500 font-medium">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="font-bold text-purple-700">{t.siteName}</span> • {t.builtWith}
          </p>
        </div>
      </div>
    </footer>
  )
}
