// src/app/(frontend)/layout.tsx

import React from 'react'
import './styles.css'
import { languages } from '@/config/languages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Payload Blog Website',
  description: 'A Next.js + Payload CMS blog site.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const langCode = process.env.NEXT_PUBLIC_DEFAULT_LANG || languages[0].code
  const activeLang = languages.find((l) => l.code === langCode) || languages[0]

  return (
    <>
      <html lang={activeLang.locale} dir={activeLang.direction}>
        <head>
          <link rel="stylesheet" href={activeLang.css} />
        </head>
        <body className="bg-transparent text-gray-800 relative min-h-screen">
          {/* 🌈 Modern Floating Gradient Background */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            {/* Layer 1 - Main Soft Glow */}
            <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-linear-to-r from-purple-400/40 via-pink-300/40 to-orange-200/40 rounded-full blur-3xl animate-float-slow" />

            {/* Layer 2 - Cool Blue Tone */}
            <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-linear-to-br from-sky-300/40 via-indigo-400/30 to-violet-500/30 rounded-full blur-[100px] animate-float-medium" />

            {/* Layer 3 - Mint Accent */}
            <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-linear-to-tr from-emerald-200/40 via-teal-200/40 to-cyan-100/30 rounded-full blur-[80px] animate-float-fast" />

            {/* Layer 4 - Subtle White Mist */}
            <div className="absolute bottom-1/3 left-1/4 w-md h-112 bg-linear-to-bl from-white/10 to-gray-200/5 rounded-full blur-[120px] animate-float-slow" />

            {/* Optional Glass Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-white/10 via-transparent to-white/5 backdrop-blur-[2px]" />
          </div>

          <Navbar />
          <main className="p-4 relative z-10">{children}</main>
          <Footer />
        </body>
      </html>
    </>
  )
}
