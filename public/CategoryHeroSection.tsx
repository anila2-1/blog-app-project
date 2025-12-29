'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), {
  ssr: false,
})

const TypingText = ({ text }: { text: string }) => {
  return (
    <span>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.02, duration: 0.1 }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

interface CategoryHeroSectionProps {
  category: {
    title: string
    description?: string
    color?: string
    featuredImage?: {
      url: string
      filename: string
    }
  }
}

export default function CategoryHeroSection({ category }: CategoryHeroSectionProps) {
  return (
    <div
      className="relative w-full h-[500px] overflow-hidden bg-cover bg-no-repeat animate-cloudMove"
      style={{
        backgroundImage: "url('/image/cloud.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
      }}
    >
      {/* TOP LIGHT GRADIENT ONLY */}
      <div className="absolute inset-0 bg-linear-to-b from-white/70 to-transparent"></div>

      {/* FLOATING SHAPES */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute top-10 left-10 w-12 h-12 rounded-full bg-pink-300 opacity-25"
          style={{ animation: 'float 8s ease-in-out infinite' }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-purple-300 opacity-20"
          style={{ animation: 'float 10s ease-in-out infinite' }}
        ></div>
      </div>

      {/* HERO-LIKE CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] p-8 md:p-12 lg:p-16 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl w-full"
        >
          {/* Category Featured Image */}
          {category.featuredImage && (
            <div className="relative mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${category.featuredImage.url}`}
                alt={category.title}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, staggerChildren: 0.03 }}
          >
            {/* Multi-Color Typing Headline */}
            <motion.span
              className="inline-block bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-purple-500 to-indigo-600 mx-1"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              <TypingText text={category.title} />
            </motion.span>
          </motion.h2>

          {/* Subheading */}
          {category.description && (
            <motion.span
              className="block mt-4 text-lg text-gray-600 font-normal max-w-2xl mx-auto"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.4 }}
            >
              {category.description}
            </motion.span>
          )}
        </MotionDiv>
      </div>
    </div>
  )
}
