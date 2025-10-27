'use client'

import React from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

interface RichTextProps {
  content?: any
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content?.root?.children?.length) return null

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PayloadRichText data={content} />
    </div>
  )
}
