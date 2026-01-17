'use client'

import { Button } from '@mui/material'
import { keyframes } from '@mui/system'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: {
    heroTitle: 'About Our Blog',
    heroDesc:
      'Discover inspiring stories, insightful articles, and a community passionate about sharing knowledge and experiences.',
    explore: 'Explore Posts',
    contact: 'Contact Us',

    missionTitle: 'Our Mission',
    missionP1:
      'We believe in the power of words to inspire, educate, and connect people from all walks of life.',
    missionP2:
      "Whether you're here to learn something new, find inspiration, or simply enjoy a good read, we've got something for everyone.",

    quality: 'Quality Content',
    qualityDesc: 'Carefully curated articles that matter',
    community: 'Community Driven',
    communityDesc: 'Built by and for our readers',
    topics: 'Diverse Topics',
    topicsDesc: "From tech to lifestyle, we've got it all",

    joinTitle: 'Join Our Journey',
    joinDesc:
      'Be part of a growing community of writers and readers who share a passion for storytelling and learning.',

    ctaTitle: 'Ready to Start Your Journey?',
    ctaDesc: 'Join thousands of readers who discover new ideas every day.',
    ctaBtn: 'Get Started Today',
  },

  he: {
    heroTitle: 'על הבלוג שלנו',
    heroDesc: 'גלו סיפורים מעוררי השראה, מאמרים מעמיקים וקהילה שאוהבת לשתף ידע וחוויות.',
    explore: 'חקור פוסטים',
    contact: 'צור קשר',

    missionTitle: 'המשימה שלנו',
    missionP1: 'אנו מאמינים בכוחן של מילים להעניק השראה, לחנך ולחבר בין אנשים.',
    missionP2: 'בין אם באתם ללמוד משהו חדש או ליהנות מקריאה טובה – אתם במקום הנכון.',

    quality: 'תוכן איכותי',
    qualityDesc: 'מאמרים שנבחרו בקפידה',
    community: 'קהילה פעילה',
    communityDesc: 'נבנה על ידי הקוראים',
    topics: 'נושאים מגוונים',
    topicsDesc: 'מטכנולוגיה ועד לייף סטייל',

    joinTitle: 'הצטרפו למסע שלנו',
    joinDesc: 'קהילה צומחת של כותבים וקוראים עם תשוקה לידע וסיפורים.',

    ctaTitle: 'מוכנים להתחיל?',
    ctaDesc: 'הצטרפו לאלפי קוראים מדי יום.',
    ctaBtn: 'התחל עכשיו',
  },

  hr: {
    heroTitle: 'O Našem Blogu',
    heroDesc: 'Inspirativne priče, korisni članci i zajednica koja dijeli znanje.',
    explore: 'Istraži Objave',
    contact: 'Kontakt',

    missionTitle: 'Naša Misija',
    missionP1: 'Vjerujemo u moć riječi koje povezuju i educiraju ljude.',
    missionP2: 'Bilo da želite učiti ili se inspirirati, ovdje ste dobrodošli.',

    quality: 'Kvalitetan Sadržaj',
    qualityDesc: 'Pažljivo odabrani članci',
    community: 'Zajednica',
    communityDesc: 'Stvoreno za čitatelje',
    topics: 'Razne Teme',
    topicsDesc: 'Tehnologija, lifestyle i više',

    joinTitle: 'Pridružite Nam Se',
    joinDesc: 'Rastuća zajednica pisaca i čitatelja.',

    ctaTitle: 'Spremni za Početak?',
    ctaDesc: 'Pridružite se tisućama čitatelja.',
    ctaBtn: 'Započni Danas',
  },

  tr: {
    heroTitle: 'Blogumuz Hakkında',
    heroDesc:
      'İlham verici hikayeler, anlayışlı makaleler ve bilgi ve deneyimlerini paylaşma konusunda tutkulu bir topluluğu keşfedin.',
    explore: 'Gönderileri Keşfet',
    contact: 'Bize Ulaşın',

    missionTitle: 'Görevimiz',
    missionP1:
      'Kelimelerin her kesimden insanı ilham verme, eğitme ve birbirine bağlama gücüne inanıyoruz.',
    missionP2:
      'İster yeni bir şeyler öğrenmek, ister ilham bulmak, ister sadece iyi bir okumanın tadını çıkarmak için burada olun, herkes için bir şeylerimiz var.',

    quality: 'Kaliteli İçerik',
    qualityDesc: 'Önemli olan özenle seçilmiş makaleler',
    community: 'Topluluk Odaklı',
    communityDesc: 'Okurlarımız tarafından ve okurlarımız için oluşturuldu',
    topics: 'Çeşitli Konular',
    topicsDesc: 'Teknolojiden yaşam tarzına kadar her şeye sahibiz',

    joinTitle: 'Yolculuğumuza Katılın',
    joinDesc:
      'Hikaye anlatma ve öğrenme tutkusunu paylaşan, büyüyen bir yazar ve okur topluluğunun parçası olun.',

    ctaTitle: 'Yolculuğunuza Başlamaya Hazır mısınız?',
    ctaDesc: 'Her gün yeni fikirler keşfeden binlerce okura katılın.',
    ctaBtn: 'Bugün Başlayın',
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

export const dynamic = 'force-dynamic'

const page = () => {
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
              {t.heroDesc}
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
                {t.explore}
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
                {t.contact}{' '}
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div
          className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20"
          style={{ animation: `${bounceIn} 2s ease-out infinite ` }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20"
          style={{ animation: `${bounceIn} 2s ease-out infinite`, animationDelay: '1s' }}
        ></div>
      </section>
      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div style={{ animation: `${slideInLeft} 1s ease-out 0.5s both` }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {t.missionTitle}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.missionP1}</p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t.missionP2}</p>
              <div className="flex flex-wrap gap-4">
                <div
                  className="
  backdrop-blur-xl bg-amber-100
  border border-white/40
  rounded-xl p-5
  shadow-lg hover:shadow-2xl
  transition-all duration-300
  hover:-translate-y-2 hover:scale-105
"
                  style={{ animation: `${fadeIn} 1s ease-out 1s both` }}
                >
                  <h3 className="font-semibold text-purple-600 mb-2">{t.quality}</h3>
                  <p className="text-sm text-gray-600">{t.qualityDesc}</p>
                </div>
                <div
                  className="bg-blue-100 rounded-lg p-4 shadow-lg hover:shadow-2xl
  transition-all duration-300
  hover:-translate-y-2 hover:scale-105"
                  style={{ animation: `${fadeIn} 1s ease-out 1.2s both` }}
                >
                  <h3 className="font-semibold text-indigo-600 mb-2">{t.community}</h3>
                  <p className="text-sm text-gray-700">{t.communityDesc}</p>
                </div>
                <div
                  className="bg-purple-100 rounded-lg p-4 shadow-lg hover:shadow-2xl
  transition-all duration-300
  hover:-translate-y-2 hover:scale-105"
                  style={{ animation: `${fadeIn} 1s ease-out 1.4s both` }}
                >
                  <h3 className="font-semibold text-purple-600 mb-2">{t.topics}</h3>
                  <p className="text-sm text-gray-700">{t.topicsDesc}</p>
                </div>
              </div>
            </div>
            <div style={{ animation: `${slideInRight} 1s ease-out 1s both` }}>
              <div className="relative">
                <div className="bg-linear-to-br from-purple-400 to-indigo-500 rounded-2xl p-8 text-white shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4">{t.joinTitle}</h3>
                  <p className="mb-6 opacity-90">{t.joinDesc}</p>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">10K+</div>
                      <div className="text-sm opacity-75">Articles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">50K+</div>
                      <div className="text-sm opacity-75">Readers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">100+</div>
                      <div className="text-sm opacity-75">Contributors</div>
                    </div>
                  </div>
                </div>
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
