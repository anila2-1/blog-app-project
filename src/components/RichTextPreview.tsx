// src/components/RichTextPreview.tsx
'use client'

interface RichTextNode {
  text?: string
  children?: RichTextNode[]
  type?: string
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

  // Render rich content with code handling
  const renderNode = (node: RichTextNode): React.ReactNode => {
    if (node.type === 'codeblock') {
      const codeText = node.children?.map((child: any) => child.text || '').join('\n') || ''
      return (
        <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono border border-gray-200 inline-block mx-1">
          {codeText.length > 50 ? codeText.substring(0, 50) + '...' : codeText}
        </code>
      )
    }
    if (node.type === 'code') {
      const text = node.text || node.children?.[0]?.text || ''
      return (
        <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono border border-gray-200 inline">
          {text}
        </code>
      )
    }
    if (node.text) return node.text
    if (node.children?.length) return node.children.map(renderNode)
    return ''
  }

  const renderedContent = content.root.children.map(renderNode).flat()

  // Extract plain text for length check
  const extractText = (node: RichTextNode): string => {
    if (node.type === 'codeblock' || node.type === 'code') {
      const text = node.children?.map((child: any) => child.text || '').join(' ') || node.text || ''
      return `[code: ${text.length > 50 ? text.substring(0, 50) + '...' : text}]`
    }
    if (node.text) return node.text
    if (node.children?.length) return node.children.map(extractText).join(' ')
    return ''
  }

  const fullText = content.root.children.map(extractText).join(' ').trim()

  if (!fullText) return null

  const shouldTruncate = maxLength && fullText.length > maxLength
  const displayText = shouldTruncate ? fullText.substring(0, maxLength) + '...' : fullText

  return (
    <span className="text-gray-700">
      {renderedContent}
      {shouldTruncate && <span>... </span>}
    </span>
  )
}
