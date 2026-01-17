'use client'

import { useEffect } from 'react'

interface HeadInjectorProps {
  html: string
}

export default function HeadInjector({ html }: HeadInjectorProps) {
  useEffect(() => {
    if (html && typeof window !== 'undefined') {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html
      const head = document.head

      Array.from(tempDiv.children).forEach((child) => {
        head.appendChild(child)
      })

      return () => {
        Array.from(tempDiv.children).forEach((child) => {
          if (head.contains(child)) {
            head.removeChild(child)
          }
        })
      }
    }
  }, [html])

  return null
}
