// src/app/(frontend)/layout.tsx

import React from 'react'
import './styles.css'
import { languages } from '@/config/languages'
import Navbar from './components/Navbar/Navbar1'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground' // New client component

export const metadata = {
  title: 'Payload Blog Website',
  description: 'A Next.js + Payload CMS blog site.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const langCode = process.env.NEXT_PUBLIC_DEFAULT_LANG || languages[0].code
  const activeLang = languages.find((l) => l.code === langCode) || languages[0]

  return (
    <html lang={activeLang.locale} dir={activeLang.direction}>
      <head>
        <link rel="stylesheet" href={activeLang.css} />
      </head>
      <body className="bg-linear-to-br from-[#fff9fa] via-purple-100 to-fuchsia-100 text-gray-800 relative min-h-screen">
        <AnimatedBackground />
        <Navbar />
        <main className="p-4 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
