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
    <footer className="relative bg-yellow-50 text-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-black flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <h3 className="text-2xl font-bold ml-3 text-gray-900">BlogSite</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              A modern blog platform powered by{' '}
              <strong className="text-gray-800">Payload CMS</strong>, designed for content creators
              who love flexibility, simplicity, and elegant design.
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-amber-500">✦</span> Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Posts', href: '/posts' },
                { name: 'About', href: '/about' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-amber-600 font-medium transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Social & Scroll */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-6">Stay Connected</h4>
            <p className="text-sm text-gray-600 mb-5">
              Follow us for updates, design inspiration, and Payload CMS tips.
            </p>

            <div className="flex space-x-4 mb-8">
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
                  className={`${social.bg} p-3 rounded-full text-white shadow-md hover:shadow-lg transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
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
                  bg-white/90 backdrop-blur-sm
                  border border-amber-200
                  text-amber-700 font-medium 
                  px-5 py-2.5 rounded-full
                  shadow-lg hover:shadow-xl
                  hover:bg-linear-to-r hover:from-amber-500 hover:to-orange-500
                  hover:text-white
                  transition-all duration-500 ease-out
                  hover:scale-110 active:scale-95
                  animate-pulse
                "
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-100 pt-6 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-amber-700">BlogSite</span> • Built with love using{' '}
            <span className="font-semibold text-purple-700">Next.js & Payload CMS</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
