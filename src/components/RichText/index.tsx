/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/components/RichText.tsx
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'
import Image from 'next/image'
import Prism from 'prismjs'
// load common languages you'll need

// @ts-ignore - prism component side-effect imports do not ship types
import 'prismjs/components/prism-markup' // html
// @ts-ignore - prism component side-effect imports do not ship types
import 'prismjs/components/prism-css'
// @ts-ignore - prism component side-effect imports do not ship types
import 'prismjs/components/prism-javascript'
// @ts-ignore - prism component side-effect imports do not ship types
import 'prismjs/components/prism-jsx'
// @ts-ignore - prism component side-effect imports do not ship types
import 'prismjs/components/prism-typescript'
// @ts-ignore - prism component side-effect imports do not ship types
import 'prismjs/components/prism-python'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import MediaBlock from './../../blocks/MediaBlock/Component'

// Define missing types locally since blocks are not registered in payload config
type BannerBlockProps = {
  style: 'info' | 'warning' | 'error' | 'success'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any // RichText content
  id?: string
  blockName?: string
  blockType: 'banner'
}

type CTABlockProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  richText: any // RichText content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  links?: any[] // From linkGroup
  id?: string
  blockName?: string
  blockType: 'cta'
}

type MediaBlockProps = {
  resource: {
    url: string
    alt?: string
    filename?: string
  }
  className?: string
  imgClassName?: string
}

// Simple class name utility
const cn = (...args: (string | boolean | Record<string, boolean> | undefined)[]): string => {
  const classes: string[] = []
  for (const arg of args) {
    if (typeof arg === 'string') {
      classes.push(arg)
    } else if (typeof arg === 'object' && arg !== null) {
      for (const key in arg) {
        if (arg[key]) {
          classes.push(key)
        }
      }
    }
  }
  return classes.join(' ')
}

// Define SerializedImageNode type for image rendering
type SerializedImageNode = {
  type: string
  fields?: {
    image?: {
      url?: string
      src?: string
    }
    altText?: string
    caption?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

// small helper to escape HTML so it displays correctly inside <code>

const codeBlockInlineStyle: React.CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace',
  background: '#f0f9ff',
  color: '#0f172a',
  padding: '1rem',
  borderRadius: '0.75rem',
  border: '1px solid rgba(59,130,246,0.12)',
  overflowX: 'auto',
  whiteSpace: 'pre',
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,

  link: ({ node, nodesToJSX }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const linkNode = node as any
    const children = nodesToJSX({ nodes: node.children })

    let href = '#'

    // Handle internal document links
    if (linkNode.fields?.doc?.value) {
      const docValue = linkNode.fields.doc.value
      const slug = typeof docValue === 'object' ? docValue.slug : docValue
      const relationTo = linkNode.fields.doc.relationTo
      href = relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
    }
    // Handle external links
    else if (linkNode.fields?.url) {
      href = linkNode.fields.url
    }

    return (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-500 underline hover:underline-offset-4 font-medium transition-colors duration-200"
        target={linkNode.fields?.newTab ? '_blank' : undefined}
        rel={linkNode.fields?.newTab ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },

  // Render raw HTML nodes (if richtext contains an 'html' node)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  html: ({ node }: any) => {
    const raw = node?.value || node?.html || node?.text || ''
    let code = String(raw)

    // Strip out meta tags to prevent SEO issues (meta tags should only be in <head>)
    code = code.replace(/<meta[^>]*>/gi, '')

    // Try to highlight with Prism if available; if not, render plain escaped text (React escapes automatically)
    let highlighted: string | null = null
    try {
      if (Prism && Prism.languages && Prism.languages.markup) {
        highlighted = Prism.highlight(code, Prism.languages.markup, 'markup')
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      highlighted = null
    }

    return (
      <div className="my-6">
        <pre style={codeBlockInlineStyle}>
          {/* If Prism produced markup, use innerHTML to preserve token spans; otherwise render text child so React escapes it */}
          {highlighted ? (
            <code
              className="language-markup font-mono text-sm block"
              dangerouslySetInnerHTML={{ __html: highlighted }}
              aria-label="raw html block"
            />
          ) : (
            <code className="font-mono text-sm block" aria-label="raw html block">
              {code}
            </code>
          )}
        </pre>
      </div>
    )
  },

  // 🖼️ STYLISH IMAGE RENDERING - CENTERED
  image: ({ node }) => {
    const imgNode = node as SerializedImageNode
    let src = ''
    let alt = 'Image'
    let caption = ''

    const fields = imgNode.fields || {}

    // Get image URL from either `image.url` or `image.src`
    if (fields.image) {
      src = fields.image.url || fields.image.src || ''
    }

    alt = fields.altText || 'Image'
    caption = fields.caption || ''

    if (!src) return null

    // Default width & height
    const width = fields.width || 800
    const height = fields.height || 600

    // Alignment logic
    const align = fields.alignment || 'center'

    const containerClass = cn('flex justify-center my-8', {
      'justify-start': align === 'left',
      'justify-end': align === 'right',
      'justify-center': align === 'center',
    })

    return (
      <div className={containerClass}>
        <figure className="group max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02]">
            <Image
              src={src}
              alt={alt}
              unoptimized
              className="w-full h-auto object-cover max-h-[600px] transition-opacity duration-300 group-hover:opacity-95"
              style={{
                maxWidth: `${width}px`,
                maxHeight: `${height}px`,
              }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          {caption && (
            <figcaption className="mt-3 text-center text-sm text-white font-medium italic">
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    )
  },

  // 🎨 Override specific converters for better styling — NOW WITH PERFECT SIZES AND COLORS
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tag = (node as any).tag

    // Common styles for ALL headings — NO prose, explicit Tailwind classes
    const baseStyles = 'border-b border-indigo-200 pb-2 mb-4 font-black text-black'

    switch (tag) {
      case 'h1':
        return (
          <h1 className={`${baseStyles} text-2xl sm:text-3xl lg:text-4xl leading-tight`}>
            {children}
          </h1>
        )
      case 'h2':
        return <h2 className={`${baseStyles} text-xl sm:text-2xl lg:text-3xl`}>{children}</h2>
      case 'h3':
        return <h3 className={`${baseStyles} text-lg sm:text-xl lg:text-2xl`}>{children}</h3>
      case 'h4':
        return <h4 className={`${baseStyles} text-base sm:text-lg lg:text-xl`}>{children}</h4>
      case 'h5':
        return <h5 className={`${baseStyles} text-sm sm:text-base lg:text-lg`}>{children}</h5>
      case 'h6':
        return <h6 className={`${baseStyles} text-xs sm:text-sm lg:text-base`}>{children}</h6>
      default:
        return <h2 className={`${baseStyles} text-xl sm:text-2xl lg:text-3xl`}>{children}</h2>
    }
  },

  text: ({ node }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textNode = node as any
    const text = textNode.text || ''
    const format = textNode.format || 0

    // Build semantic tags for formatting so Tailwind's default styles apply correctly.
    let content: React.ReactNode = text

    // Strikethrough
    if (format & 8)
      content = (
        <u
          style={{
            textDecoration: 'underline',
            textDecorationThickness: '1px',
          }}
        >
          {content}
        </u>
      )
    // Underline
    if (format & 4)
      content = (
        <del
          style={{
            textDecoration: 'line-through',
            textDecorationThickness: '1px',
          }}
        >
          {content}
        </del>
      )
    // Italic — include inline style to force italic on all platforms
    if (format & 2)
      content = (
        <em className="italic" style={{ fontStyle: 'italic' }}>
          {content}
        </em>
      )

    // Bold — use stronger weight and inline style to ensure visibility on mobile
    if (format & 1)
      content = (
        <strong
          className="font-extrabold"
          style={{ fontWeight: 800, WebkitFontSmoothing: 'antialiased' }}
        >
          {content}
        </strong>
      )

    return <span className="text-gray-800">{content}</span>
  },

  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listNode = node as any

    const isOrderedList =
      listNode.listType === 'number' ||
      listNode.listType === 'ordered' ||
      listNode.tag === 'ol' ||
      listNode.type === 'numberedlist' ||
      listNode.ordered === true

    const className = isOrderedList
      ? 'list-decimal list-outside mb-6 space-y-3 text-gray-800 pl-8 marker:text-indigo-600'
      : 'list-disc list-outside mb-6 space-y-3 text-gray-800 pl-8 marker:text-indigo-600'

    return isOrderedList ? (
      <ol className={className}>{children}</ol>
    ) : (
      <ul className={className}>{children}</ul>
    )
  },

  listitem: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return <li className="text-gray-700 leading-relaxed">{children}</li>
  },

  quote: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return (
      <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 px-4 py-3 my-6 rounded-r-lg italic text-gray-700 leading-relaxed">
        {children}
      </blockquote>
    )
  },

  code: ({ node }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = (node as any).text || (node as any).children?.[0]?.text || ''

    // If no text, render nothing
    if (!text || text.trim() === '') return null

    // Render inline code with subtle styling
    return (
      <code
        className="bg-slate-100 text-sky-700 px-1.5 py-0.5 rounded-md border border-slate-200 font-mono text-sm font-medium"
        data-inline-code
      >
        {text}
      </code>
    )
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  codeblock: ({ node, nodesToJSX }) => {
    const codeText =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node as any).children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.map((child: any) => {
          if (typeof child?.text === 'string') return child.text
          if (child?.children && Array.isArray(child.children))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return child.children.map((c: any) => c.text || '').join('\n')
          return child?.value ?? child?.html ?? ''
        })
        .join('\n') ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node as any).text ||
      ''

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const languageRaw = (node as any).language || ''
    const lang = (languageRaw || 'markup').toLowerCase()
    const prismLang =
      lang === 'html' || lang === 'markup' ? 'markup' : lang === 'js' ? 'javascript' : lang

    // Strip out meta tags from code blocks as well to prevent SEO issues
    const sanitizedCode = String(codeText).replace(/<meta[^>]*>/gi, '')

    // Try Prism highlighting; fall back to plain text rendering
    let highlighted: string | null = null
    try {
      if (typeof Prism !== 'undefined' && Prism.languages) {
        if (Prism.languages[prismLang]) {
          highlighted = Prism.highlight(sanitizedCode, Prism.languages[prismLang], prismLang)
        } else if (Prism.languages.markup) {
          highlighted = Prism.highlight(sanitizedCode, Prism.languages.markup, 'markup')
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      highlighted = null
    }

    // Return a single wrapper element and ensure valid JSX + comma separation in object
    return (
      <div className="my-6">
        <pre style={codeBlockInlineStyle}>
          {highlighted ? (
            <code
              className={`language-${prismLang} font-mono text-sm block`}
              dangerouslySetInnerHTML={{ __html: highlighted }}
              aria-label={languageRaw ? `${languageRaw} code block` : 'code block'}
            />
          ) : (
            <code
              className={`font-mono text-sm block whitespace-pre`}
              aria-label={languageRaw ? `${languageRaw} code block` : 'code block'}
            >
              {sanitizedCode}
            </code>
          )}
        </pre>
      </div>
    )
  },

  // 🧩 Custom Blocks - CENTERED MEDIA BLOCK
  blocks: {
    banner: ({ node }: { node: SerializedBlockNode<BannerBlockProps> }) => (
      <BannerBlock className="col-start-2 mb-6" {...node.fields} />
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mediaBlock: ({ node }: { node: SerializedBlockNode<any> }) => {
      const media = node.fields?.media
      const caption = node.fields?.caption

      if (!media?.url) {
        console.warn('MediaBlock: Missing required media URL')
        return null
      }

      return (
        <div className="flex justify-center my-6">
          <MediaBlock
            content={{
              url: media.url,
              alt: media.alt || '',
              caption: caption || '',
            }}
            className="max-w-3xl w-full"
            enableGutter={false}
          />
        </div>
      )
    },
    code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
      <CodeBlock className="col-start-2 my-6" {...node.fields} />
    ),
    cta: ({ node }: { node: SerializedBlockNode<CTABlockProps> }) => (
      <CallToActionBlock {...node.fields} />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  // ✅ IMPORTANT: Disable `prose` to avoid CSS conflicts — we're using explicit Tailwind classes
  const { className, enableProse = false, enableGutter = true, data, ...rest } = props

  return (
    <ConvertRichText
      converters={jsxConverters}
      data={data}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
