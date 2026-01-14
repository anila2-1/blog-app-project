'use client'

import { Button } from '@mui/material'
import { keyframes } from '@mui/system'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code

const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    heroTitle: 'Privacy Policy',
    heroDesc:
      'Your privacy is important to us. Learn how we collect, use, and protect your personal information.',
    learnMore: 'Learn More',
    contact: 'Contact Us',

    infoTitle: 'Information We Collect',
    infoDesc:
      'We collect information you provide directly to us, such as when you create an account or contact support.',
    infoList: [
      'Personal information (name, email, phone number)',
      'Account credentials',
      'Communication preferences',
      'Usage data and analytics',
    ],

    secure: 'Secure Storage',
    secureDesc: 'Your data is encrypted and stored securely',
    minimal: 'Minimal Collection',
    minimalDesc: "We only collect what's necessary",

    usageTitle: 'How We Use Your Information',
    usageDesc:
      'Your information helps us provide better services, improve our platform, and communicate with you effectively.',
    usageList: [
      'Provide and maintain our services',
      'Send you updates and newsletters',
      'Respond to your inquiries',
      'Analyze usage patterns',
    ],
    shareTitle: 'Data Sharing',
    shareDesc:
      'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.',
    shareDesc2:
      'We may share information with trusted service providers who assist us in operating our website and conducting our business.',
    rightsTitle: 'Your Rights',
    rightsDesc1:
      'You have the right to access, update, or delete your personal information. Contact us to exercise these rights.',
    rightsDesc2:
      '  You can opt out of marketing communications at any time by following the unsubscribe link in our emails.',
    ctaTitle: 'Questions About Your Privacy?',
    ctaDesc: 'If you have any questions about this Privacy Policy, please contact us.',
    ctaBtn: 'Contact Us',
  },

  he: {
    heroTitle: 'מדיניות פרטיות',
    heroDesc: 'הפרטיות שלך חשובה לנו.',
    learnMore: 'למידע נוסף',
    contact: 'צור קשר',

    infoTitle: 'מידע שאנו אוספים',
    infoDesc: 'אנו אוספים מידע שתספק לנו ישירות.',
    infoList: [
      'מידע אישי (שם, אימייל, טלפון)',
      'פרטי חשבון',
      'העדפות תקשורת',
      'נתוני שימוש וסטטיסטיקה',
    ],

    usageList: [
      'אספקת ותחזוקת השירותים',
      'שליחת עדכונים וניוזלטרים',
      'מענה לפניות',
      'ניתוח דפוסי שימוש',
    ],
    secure: 'אחסון מאובטח',
    secureDesc: 'המידע שלך מוצפן',
    minimal: 'איסוף מינימלי',
    minimalDesc: 'רק מה שנחוץ',

    usageTitle: 'כיצד אנו משתמשים במידע',
    usageDesc: 'המידע שלך עוזר לנו לשפר את השירותים שלנו.',

    shareTitle: 'שיתוף מידע',
    shareDesc: 'איננו מוכרים או מעבירים את המידע האישי שלך לצדדים שלישיים.',
    shareDesc2: 'אנו עשויים לשתף מידע עם ספקי שירות מהימנים המסייעים לנו.',
    rightsTitle: 'הזכויות שלך',
    rightsDesc1: 'יש לך את הזכות לגשת, לעדכן או למחוק את המידע האישי שלך.',
    rightsDesc2: 'תוכל לבטל את הרישום לתקשורת שיווקית בכל עת.',

    ctaTitle: 'שאלות על פרטיות?',
    ctaDesc: 'צרו קשר לכל שאלה.',
    ctaBtn: 'צור קשר',
  },

  hr: {
    heroTitle: 'Pravila Privatnosti',
    heroDesc: 'Vaša privatnost nam je važna.',
    learnMore: 'Saznaj Više',
    contact: 'Kontakt',

    infoTitle: 'Podaci koje prikupljamo',
    infoDesc: 'Prikupljamo podatke koje nam vi date.',
    infoList: [
      'Osobni podaci (ime, email, telefon)',
      'Podaci o računu',
      'Postavke komunikacije',
      'Podaci o korištenju i analitika',
    ],

    usageList: [
      'Pružanje i održavanje usluga',
      'Slanje novosti i obavijesti',
      'Odgovaranje na upite',
      'Analiza korištenja',
    ],
    secure: 'Sigurna Pohrana',
    secureDesc: 'Podaci su šifrirani',
    minimal: 'Minimalno Prikupljanje',
    minimalDesc: 'Samo nužno',

    usageTitle: 'Kako koristimo podatke',
    usageDesc: 'Vaši podaci pomažu nam da poboljšamo naše usluge.',

    shareTitle: 'Dijeljenje Podataka',
    shareDesc: 'Ne prodajemo niti prenosimo vaše osobne podatke trećim stranama.',
    shareDesc2: 'Možemo dijeliti informacije s pouzdanim pružateljima usluga.',
    rightsTitle: 'Vaša Prava',
    rightsDesc1: 'Imate pravo pristupa, ažuriranja ili brisanja svojih osobnih podataka.',
    rightsDesc2: 'Možete se odjaviti s marketinških komunikacija u bilo kojem trenutku.',

    ctaTitle: 'Imate pitanja?',
    ctaDesc: 'Slobodno nas kontaktirajte.',
    ctaBtn: 'Kontakt',
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
  return (
    <main
      className="min-h-screen bg-linear-to-br from-purple-50 via-white to-indigo-50"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {' '}
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
                {t.learnMore}
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
                {t.contact}
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
      {/* Privacy Policy Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div style={{ animation: `${slideInLeft} 1s ease-out 0.5s both` }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{t.infoTitle} </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.infoDesc}</p>
              <ul className="text-lg text-gray-600 mb-8 leading-relaxed list-disc list-inside">
                {t.infoList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <div
                  className="backdrop-blur-xl bg-amber-100
  border border-white/40
  rounded-xl p-5
  shadow-lg hover:shadow-2xl
  transition-all duration-300
  hover:-translate-y-2 hover:scale-105"
                  style={{ animation: `${fadeIn} 1s ease-out 1s both` }}
                >
                  <h3 className="font-semibold text-purple-600 mb-2">{t.secure}</h3>
                  <p className="text-sm text-gray-600">{t.secureDesc} </p>
                </div>
                <div
                  className="bg-blue-100 rounded-xl p-5
  shadow-lg hover:shadow-2xl
  transition-all duration-300
  hover:-translate-y-2 hover:scale-105"
                  style={{ animation: `${fadeIn} 1s ease-out 1.2s both` }}
                >
                  <h3 className="font-semibold text-indigo-600 mb-2">{t.minimal}</h3>
                  <p className="text-sm text-gray-700">{t.minimalDesc}</p>
                </div>
              </div>
            </div>
            <div style={{ animation: `${slideInRight} 1s ease-out 1s both` }}>
              <div className="relative">
                <div className="bg-linear-to-br from-purple-400 to-indigo-500 rounded-2xl p-8 text-white shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4">{t.usageTitle}</h3>
                  <p className="mb-6 opacity-90">{t.usageDesc}</p>
                  <ul className="space-y-2 opacity-90">
                    {t.usageList.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"
                  style={{ animation: `${bounceIn} 2s ease-out infinite`, animationDelay: '2s' }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div style={{ animation: `${fadeInUp} 1s ease-out 0.5s both` }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.shareTitle}</h3>
              <p className="text-gray-600 mb-4">{t.shareDesc}</p>
              <p className="text-gray-600">{t.shareDesc2}</p>
            </div>
            <div style={{ animation: `${fadeInUp} 1s ease-out 1s both` }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.rightsTitle}</h3>
              <p className="text-gray-600 mb-4">{t.rightsDesc1}</p>
              <p className="text-gray-600">{t.rightsDesc2}</p>
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
