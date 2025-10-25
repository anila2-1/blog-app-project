// src/components/RichTextPreview.tsx
'use client'

interface RichTextNode {
  text?: string
  children?: RichTextNode[]
  [key: string]: any
}

interface RichTextPreviewProps {
  content?: {
    root?: {
      children?: RichTextNode[]
    }
  }
  maxLength?: number
}

export default function RichTextPreview({ content, maxLength = 200 }: RichTextPreviewProps) {
  if (!content?.root?.children?.length) return null

  // Extract plain text from rich content
  const extractText = (node: RichTextNode): string => {
    if (node.text) return node.text
    if (node.children?.length) return node.children.map(extractText).join(' ')
    return ''
  }

  const fullText = content.root.children.map(extractText).join(' ').trim()

  if (!fullText) return null

  const displayText =
    maxLength && fullText.length > maxLength ? fullText.substring(0, maxLength) + '...' : fullText

  return <span className="text-gray-700">{displayText}</span>
}
