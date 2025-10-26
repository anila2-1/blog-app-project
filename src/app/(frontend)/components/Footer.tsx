'use client'

import React, { useEffect, useState } from 'react'

import { ArrowUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-linear-to-r from-[#f4f1ff] to-[#f1effd] text-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Brand Info & Newsletter */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <h3 className="text-2xl font-bold p-3 text-gray-800">BlogSite</h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              A modern blog platform powered by <strong>Payload CMS</strong>, designed for content
              creators who love flexibility, simplicity, and elegant design.
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-pink-500">✦</span> Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Posts', href: '/posts' },
                { name: 'About', href: '/about' },
                // { name: 'Contact', href: '/contact' },
                // { name: 'Privacy Policy', href: '/privacy' },
                // { name: 'Terms & Conditions', href: '/terms' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-pink-600 font-medium transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Social & Scroll */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-6">Stay Connected</h4>
            <p className="text-sm text-gray-600 mb-5">
              Follow us for updates, design inspiration, and Payload CMS tips.
            </p>

            <div className="flex space-x-4 mb-8">
              {[
                {
                  icon: Facebook,
                  gradient: 'from-blue-500 to-blue-700',
                  hoverGradient: 'from-blue-600 to-blue-800',
                },
                {
                  icon: Twitter,
                  gradient: 'from-sky-400 to-sky-600',
                  hoverGradient: 'from-sky-500 to-sky-700',
                },
                {
                  icon: Instagram,
                  gradient: 'from-pink-500 via-purple-500 to-indigo-500',
                  hoverGradient: 'from-pink-600 via-purple-600 to-indigo-600',
                },
                {
                  icon: Linkedin,
                  gradient: 'from-blue-700 to-blue-900',
                  hoverGradient: 'from-blue-800 to-blue-950',
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`
        p-3 rounded-full 
        bg-linear-to-br ${social.gradient}
        hover:from-${social.hoverGradient.split(' ')[0].replace('from-', '')} 
        hover:to-${social.hoverGradient.split(' ')[1].replace('to-', '')}
        text-white 
        shadow-md hover:shadow-lg
        transform hover:scale-110 hover:-translate-y-1
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
      `}
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
            flex items-center gap-2
            bg-white shadow-lg border border-gray-200
            hover:bg-indigo-600 hover:text-white
            text-gray-700 font-medium 
            px-4 py-2 rounded-full
            transition-all duration-300
          "
              >
                <ArrowUp className="w-5 h-5" />
                Back to Top
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 text-center flex justify-center items-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-pink-600">BlogSite</span> • Built with love using{' '}
            <span className="font-semibold text-purple-600">Next.js & Payload CMS</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
