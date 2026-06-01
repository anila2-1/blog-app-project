// =============================================================================
// INTERNATIONALIZATION (i18n) CONFIGURATION
// =============================================================================
// This file defines all supported languages for the frontend application.
// Each language has:
// - name: Display name
// - code: ISO 639-1 code (used in URLs and environment variables)
// - direction: 'ltr' (left-to-right) or 'rtl' (right-to-left)
// - font: Font family for this language
// - locale: Full locale string for browser/API
// - css: Path to language-specific CSS file
//
// TO CHANGE LANGUAGE: Edit NEXT_PUBLIC_DEFAULT_LANG in your .env file
// Supported values: 'en', 'he', 'hr', 'tr'
// =============================================================================

// Type definition for language codes
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
  // English - Default language, Left-to-Right
  {
    name: 'English',
    code: 'en',
    direction: 'ltr',
    font: 'Outfit, sans-serif',
    locale: 'en-US',
    css: '/lang/en.css',
  },
  // Croatian - European language, Left-to-Right
  {
    name: 'Croatian',
    code: 'hr',
    direction: 'ltr',
    font: 'Roboto, sans-serif',
    locale: 'hr-HR',
    css: '/lang/hr.css',
  },
  // Hebrew - Middle Eastern language, Right-to-Left (RTL)
  {
    name: 'Hebrew',
    code: 'he',
    direction: 'rtl',
    font: 'DavidLibre-Bold, Rubik, sans-serif',
    locale: 'he-IL',
    css: '/lang/he.css',
  },
  // Turkish - European language, Left-to-Right
  {
    name: 'Turkish',
    code: 'tr',
    direction: 'ltr',
    font: 'Outfit, sans-serif',
    locale: 'tr-TR',
    css: '/lang/tr.css',
  },
]

// Helper function: Get language configuration by code
export const getLanguageConfig = (code: LanguageCode) => {
  return languages.find((lang) => lang.code === code) || languages[0]
}
