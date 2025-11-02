'use client'

import React, { useEffect, useState } from 'react'
import { ArrowUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-linear-to-br from-yellow-50 to-amber-50 text-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-black flex items-center justify-center shadow-lg">
                <span className="text-white font-extrabold text-lg">B</span>
              </div>
              <h3 className="text-2xl font-black ml-3 text-gray-900 tracking-tight">BlogSite</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              A modern blog platform powered by{' '}
              <strong className="text-gray-900 font-semibold">Payload CMS</strong>, designed for
              content creators who love flexibility, simplicity, and elegant design.
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h4 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Posts', href: '/posts' },
                { name: 'About', href: '/about' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center text-gray-700 hover:text-amber-700 font-medium transition-all duration-300"
                  >
                    {/* Paper Plane Icon (Animated) */}
                    <span className="mr-2 inline-block transform transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-4 h-4 text-amber-600 group-hover:text-amber-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10l18-7-8 18-2-8-8-3z"
                        />
                      </svg>
                    </span>
                    {link.name}
                    <span className="ml-2 w-0 group-hover:w-4 h-0.5 bg-amber-500 rounded-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Social & Scroll */}
          <div>
            <h4 className="text-xl font-black text-gray-900 mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Follow us for updates, design inspiration, and Payload CMS tips.
            </p>

            <div className="flex space-x-3 mb-8">
              {[
                { icon: Facebook, bg: 'bg-blue-600 hover:bg-blue-700' },
                { icon: Twitter, bg: 'bg-sky-500 hover:bg-sky-600' },
                {
                  icon: Instagram,
                  bg: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600',
                },
                { icon: Linkedin, bg: 'bg-blue-800 hover:bg-blue-900' },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`${social.bg} p-3 rounded-full text-white shadow-md hover:shadow-xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
                  aria-label={`Follow us on ${social.icon.name}`}
                >
                  <social.icon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                </a>
              ))}
            </div>

            {isVisible && (
              <button
                onClick={handleScrollTop}
                className="
                  fixed bottom-8 right-8 z-50 
                  flex items-center justify-center
                  w-14 h-14
                  bg-white/90 backdrop-blur-sm
                  border-2 border-amber-900
                  text-amber-700 font-bold 
                  rounded-full
                  shadow-lg hover:shadow-xl
                  hover:bg-linear-to-r from-amber-500 to-orange-500
                  hover:text-white
                  transition-all duration-500 ease-out
                  hover:scale-110 active:scale-95
                  animate-bounce
                  ring-2 ring-amber-900 hover:ring-amber-900
                "
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-200 pt-6 text-center text-xs md:text-sm text-gray-600 font-medium">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="font-black text-amber-700">BlogSite</span> • Built with love using{' '}
            <span className="font-black text-purple-700">Next.js & Payload CMS</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
