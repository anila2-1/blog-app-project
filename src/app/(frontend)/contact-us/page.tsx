'use client'

import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { keyframes } from '@mui/system'

import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code

const langConfig = getLanguageConfig(LANG_CODE)
const translations = {
  en: {
    heroTitle: 'Contact Us',
    heroDesc:
      "We'd love to hear from you! Reach out with questions, feedback, or just to say hello.",
    primaryBtn: 'Get In Touch',
    secondaryBtn: 'View Blog',

    sectionTitle: 'Get In Touch',
    sectionDesc1:
      "Have a question, suggestion, or just want to chat? Fill out the form below and we'll get back to you.",
    sectionDesc2:
      'We value your feedback and are always looking for ways to improve our blog and community.',

    feature1: 'Quick Response',
    feature1Desc: 'We reply within 24 hours',
    feature2: 'Personal Support',
    feature2Desc: 'Dedicated to helping you',
    feature3: 'Global Reach',
    feature3Desc: 'Connecting worldwide',

    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Send Message',

    ctaTitle: 'Ready to Connect?',
    ctaDesc: 'Join our community and start sharing your ideas with the world.',
    ctaBtn: 'Join Now',
  },

  he: {
    heroTitle: 'צור קשר',
    heroDesc: 'נשמח לשמוע מכם! שאלות, משוב או סתם שלום.',
    primaryBtn: 'צור קשר',
    secondaryBtn: 'בלוג',

    sectionTitle: 'דברו איתנו',
    sectionDesc1: 'מלאו את הטופס ונחזור אליכם בהקדם.',
    sectionDesc2: 'המשוב שלכם חשוב לנו מאוד.',

    feature1: 'תגובה מהירה',
    feature1Desc: 'מענה תוך 24 שעות',
    feature2: 'תמיכה אישית',
    feature2Desc: 'אנחנו כאן בשבילכם',
    feature3: 'קהילה גלובלית',
    feature3Desc: 'חיבור עולמי',

    name: 'שם',
    email: 'אימייל',
    message: 'הודעה',
    submit: 'שלח',

    ctaTitle: 'מוכנים להתחבר?',
    ctaDesc: 'הצטרפו לקהילה שלנו ושתפו רעיונות.',
    ctaBtn: 'הצטרף עכשיו',
  },

  hr: {
    heroTitle: 'Kontaktirajte Nas',
    heroDesc: 'Imate pitanje ili ideju? Javite nam se.',
    primaryBtn: 'Javite Se',
    secondaryBtn: 'Blog',

    sectionTitle: 'Kontakt',
    sectionDesc1: 'Ispunite obrazac i javit ćemo vam se.',
    sectionDesc2: 'Vaše mišljenje nam je važno.',

    feature1: 'Brz Odgovor',
    feature1Desc: 'Odgovaramo unutar 24h',
    feature2: 'Osobna Podrška',
    feature2Desc: 'Uvijek smo tu',
    feature3: 'Globalna Mreža',
    feature3Desc: 'Povezujemo svijet',

    name: 'Ime',
    email: 'Email',
    message: 'Poruka',
    submit: 'Pošalji',

    ctaTitle: 'Spremni za povezivanje?',
    ctaDesc: 'Pridružite se našoj zajednici.',
    ctaBtn: 'Pridruži se',
  },
}

const t = translations[LANG_CODE as keyof typeof translations] || translations.en

// Define animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <main
      className="min-h-screen bg-linear-to-br from-purple-50 via-white to-indigo-50"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div style={{ animation: `${fadeInUp} 1s ease-out` }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="bg-linear-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                {t.heroTitle}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.heroDesc}{' '}
            </p>
            <div className="flex justify-center space-x-4 gap-6">
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: '999px',
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #7b5cf5, #a74bfa)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(120deg, transparent, rgba(255,255,255,.3), transparent)',
                    transform: 'translateX(-100%)',
                  },
                  '&:hover::after': {
                    transform: 'translateX(100%)',
                    transition: 'transform .8s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: '0 20px 40px rgba(123,92,245,.45)',
                  },
                }}
              >
                {t.primaryBtn}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderColor: '#7b5cf5',
                  color: '#7b5cf5',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#a78bfa',
                    color: '#a78bfa',
                    backgroundColor: 'rgba(123, 92, 245, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t.secondaryBtn}
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div
          className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20"
          style={{ animation: `${bounceIn} 2s ease-out infinite` }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20"
          style={{ animation: `${bounceIn} 2s ease-out infinite`, animationDelay: '1s' }}
        ></div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div style={{ animation: `${slideInLeft} 1s ease-out 0.5s both` }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {t.sectionTitle}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.sectionDesc1} </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t.sectionDesc2} </p>
              <div className="flex flex-wrap gap-4">
                <div
                  className=" backdrop-blur-xl bg-amber-100
  border border-white/40
  rounded-xl p-5
  shadow-lg hover:shadow-2xl
  transition-all duration-300
  hover:-translate-y-2 hover:scale-105"
                  style={{ animation: `${fadeIn} 1s ease-out 1s both` }}
                >
                  <h3 className="font-semibold text-purple-600 mb-2">{t.feature1}</h3>
                  <p className="text-sm text-gray-600">{t.feature1Desc}</p>
                </div>
                <div
                  className="bg-blue-100 rounded-xl p-5
  shadow-lg hover:shadow-2xl
  transition-all duration-300
  hover:-translate-y-2 hover:scale-105"
                  style={{ animation: `${fadeIn} 1s ease-out 1.2s both` }}
                >
                  <h3 className="font-semibold text-indigo-600 mb-2">{t.feature2}</h3>
                  <p className="text-sm text-gray-700">{t.feature2Desc}</p>
                </div>
                <div
                  className="bg-purple-100 rounded-xl p-5
  shadow-lg hover:shadow-2xl
  transition-all duration-300
  hover:-translate-y-2 hover:scale-105"
                  style={{ animation: `${fadeIn} 1s ease-out 1.4s both` }}
                >
                  <h3 className="font-semibold text-purple-600 mb-2">{t.feature3}</h3>
                  <p className="text-sm text-gray-700">{t.feature3Desc}</p>
                </div>
              </div>
            </div>
            <div style={{ animation: `${slideInRight} 1s ease-out 1s both` }}>
              <div className="relative">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="mb-6">
                    <TextField
                      fullWidth
                      label={t.name}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                      }}
                    />
                  </div>
                  <div className="mb-6">
                    <TextField
                      fullWidth
                      label={t.email}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                      }}
                    />
                  </div>
                  <div className="mb-6">
                    <TextField
                      fullWidth
                      label={t.message}
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 2,
                      borderRadius: '50px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      background: 'linear-gradient(90deg, #7b5cf5, #a74bfa)',
                      boxShadow: '0 4px 15px rgba(123, 92, 245, 0.4)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #a78bfa, #7b5cf5)',
                        boxShadow: '0 6px 20px rgba(123, 92, 245, 0.6)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {t.submit}
                  </Button>
                </form>
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"
                  style={{ animation: `${bounceIn} 2s ease-out infinite`, animationDelay: '2s' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-600 to-pink-600 animate-gradient-x"></div>

        {/* Floating Glow Orbs */}
        <div
          className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"
          style={{ animation: `${bounceIn} 4s ease-in-out infinite` }}
        />
        <div
          className="absolute bottom-10 right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl"
          style={{ animation: `${bounceIn} 5s ease-in-out infinite`, animationDelay: '1.5s' }}
        />

        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <div style={{ animation: `${fadeInUp} 1s ease-out 0.3s both` }}>
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              <span className="bg-linear-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-pulse">
                {t.ctaTitle}
              </span>
            </h2>

            {/* Description */}
            <p
              className="text-lg sm:text-xl mb-10 opacity-90 max-w-2xl mx-auto"
              style={{ animation: `${fadeIn} 1s ease-out 0.6s both` }}
            >
              {t.ctaDesc}
            </p>

            {/* Button */}
            <div style={{ animation: `${fadeInUp} 1s ease-out 0.9s both` }}>
              <Button
                variant="contained"
                sx={{
                  px: 5,
                  py: 2.2,
                  borderRadius: '999px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#7b5cf5',
                  backgroundColor: '#fff',
                  boxShadow: '0 15px 40px rgba(0,0,0,.25)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all .35s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(120deg, transparent, rgba(255,255,255,.6), transparent)',
                    transform: 'translateX(-120%)',
                  },
                  '&:hover::after': {
                    transform: 'translateX(120%)',
                    transition: 'transform .9s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.06)',
                    boxShadow: '0 25px 60px rgba(0,0,0,.4)',
                  },
                }}
              >
                {t.ctaBtn}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page
