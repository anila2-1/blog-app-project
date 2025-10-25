// src/components/RichText.tsx
'use client'

import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { JSX } from 'react'

type ParagraphRendererProps = {
  children: React.ReactNode
}

interface RichTextProps {
  data?: DefaultTypedEditorState
  className?: string
  enableProse?: boolean
  maxLength?: number
}

export default function RichText({
  data,
  className = '',
  enableProse = true,
  maxLength,
}: RichTextProps) {
  if (!data?.root?.children?.length) return null

  const renderers = {
    Paragraph: ({ children }: ParagraphRendererProps): JSX.Element => {
      if (maxLength && typeof children === 'string') {
        return <p>{children.slice(0, maxLength)}...</p>
      }
      return <p>{children}</p>
    },
  }

  return (
    <div className={`${enableProse ? 'prose prose-lg max-w-none' : ''} ${className}`.trim()}>
      <PayloadRichText data={data} />
    </div>
  )
}
