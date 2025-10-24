// src/app/(frontend)/layout.tsx
import React from 'react'
import './styles.css'
import { languages } from '@/config/languages'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Payload Blog Website',
  description: 'A Next.js + Payload CMS blog site.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Get default language from .env
  const langCode = process.env.NEXT_PUBLIC_DEFAULT_LANG || languages[0].code

  // Find the language config
  const activeLang = languages.find((l) => l.code === langCode) || languages[0]

  return (
    <>
      <html lang={activeLang.locale} dir={activeLang.direction}>
        <head>
          {/* ✅ Dynamically load CSS for this language */}
          <link rel="stylesheet" href={activeLang.css} />
        </head>
        <body>
          <Navbar />
          <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
            <strong>Language:</strong> {activeLang.name} ({activeLang.direction})
          </header>
          <main className="p-4">{children}</main>
        </body>
      </html>
    </>
  )
}
