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
          {/* 🌈 Floating Gradient Background */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-r from-purple-400/40 to-pink-200/40 rounded-full filter blur-3xl animate-float-slow" />
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-linear-to-br from-blue-400/30 to-indigo-400/30 rounded-full filter blur-3xl animate-float-medium" />
          </div>
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-r from-purple-300/40 to-pink-200/40 rounded-full filter blur-3xl animate-float-slow" />
            <div className="absolute bottom-1/3 left-1/2 w-80 h-80 bg-linear-to-bl from-cyan-50 to-blue-200/20 rounded-full filter blur-3xl animate-float-fast" />
          </div>

          <Navbar />
          <main className="p-4 relative z-10">{children}</main>
          <Footer />
        </body>
      </html>
    </>
  )
}
