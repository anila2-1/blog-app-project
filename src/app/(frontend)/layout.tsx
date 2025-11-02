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
          {/* 🌿 Gradient Grid Background */}
          <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[#fff5cf] overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-[#fff5cf] via-[#ffe9a3] to-[#ffd166] opacity-60" />

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
      `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Soft glow highlight */}
            <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-[#ff9e6d]/20 blur-[120px]" />
          </div>

          <Navbar />
          <main className="p-4 relative z-10">{children}</main>
          <Footer />
        </body>
      </html>
    </>
  )
}
