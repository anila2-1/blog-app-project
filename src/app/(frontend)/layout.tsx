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
        <body className="bg-[#fff5cf] text-gray-800 relative min-h-screen">
          {/* 🌸 Warm Cream Background with Subtle Decorations */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            {/* Base Layer — Solid #fff5cf already set in body */}

            {/* Floating Orb 1 — Soft Peach Glow */}
            <div className="absolute top-1/4 -left-16 w-80 h-80 bg-linear-to-r from-[#ffd166]/20 via-[#ff9e6d]/10 to-transparent rounded-full blur-3xl animate-float-slow" />

            {/* Floating Orb 2 — Warm Pink */}
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-linear-to-br from-[#f16363]/10 via-[#ff8a8a]/5 to-transparent rounded-full blur-[100px] animate-float-medium animation-delay-1000" />

            {/* Floating Orb 3 — Cream Highlight */}
            <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-linear-to-tr from-[#fff5cf]/30 via-white/20 to-transparent rounded-full blur-[90px] animate-float-fast animation-delay-2000" />

            {/* Subtle Paper Texture Overlay (Optional) */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 10% 20%, rgba(0,0,0,0.03) 0%, transparent 20%),
                  radial-gradient(circle at 90% 80%, rgba(0,0,0,0.02) 0%, transparent 25%)
                `,
              }}
            />

            {/* Very Light Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-linear-to-b from-white/30 via-transparent to-[#fff5cf]/20 backdrop-blur-[1px]" />
          </div>

          <Navbar />
          <main className="p-4 relative z-10">{children}</main>
          <Footer />
        </body>
      </html>
    </>
  )
}
