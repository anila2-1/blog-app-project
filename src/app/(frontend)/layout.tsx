// src/app/(frontend)/layout.tsx

import React from 'react'
import './styles.css'
import { languages } from '@/config/languages'
import Navbar from './components/Navbar/Navbar1'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground' // New client component

export const metadata = {
  title: 'Budite u toku s najnovijim trendovima i novostima iz Hrvatske.',
  description:
    'Najnovije vijesti iz Hrvatske, cijene na tržištu, tečajevi i dramske serije koje svi gledaju. Ažurira se svaki dan na SaznajHR.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const langCode = process.env.NEXT_PUBLIC_DEFAULT_LANG || 'en'
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
