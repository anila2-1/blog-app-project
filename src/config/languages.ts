// src/lib/languages.ts

export type LanguageCode = 'en' | 'he' | 'hr' | 'tr'

export interface LanguageConfig {
  css?: string
  name: string
  code: LanguageCode
  direction: 'ltr' | 'rtl'
  font: string
  locale: string
}

export const languages: LanguageConfig[] = [
  {
    name: 'English',
    code: 'en',
    direction: 'ltr',
    font: 'Outfit, sans-serif', // ← added fallback for safety
    locale: 'en-US',
    css: '/lang/en.css',
  },
  {
    name: 'Croatian',
    code: 'hr',
    direction: 'ltr',
    font: 'Outfit, sans-serif', // ← unless you have a real "CroatianFont", use a real one
    locale: 'hr-HR',
    css: '/lang/hr.css',
  },
  {
    name: 'Hebrew',
    code: 'he',
    direction: 'rtl',
    font: 'DavidLibre-Bold, Rubik, sans-serif', // ← matches the font-face definition
    locale: 'he-IL',
    css: '/lang/he.css',
  },
  {
    name: 'Turkish',
    code: 'tr',
    direction: 'ltr',
    font: 'Outfit, sans-serif', // Use a suitable font, e.g., Outfit or a Turkish-specific one if available
    locale: 'tr-TR',
    css: '/lang/tr.css', // Assuming you add this CSS file
  },
]

// Helper: get config by code
export const getLanguageConfig = (code: LanguageCode) => {
  return languages.find((lang) => lang.code === code) || languages[0]
}
