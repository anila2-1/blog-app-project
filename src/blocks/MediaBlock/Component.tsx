import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export interface MediaBlockProps {
  content: {
    url: string
    alt?: string
    caption?: any
  }
  className?: string
  enableGutter?: boolean
  imgClassName?: string
}

export const MediaBlock = React.forwardRef<HTMLDivElement, MediaBlockProps>(
  ({ content, className = '', enableGutter = true, imgClassName = '' }, ref) => {
    if (!content?.url) return null

    const isRichText =
      typeof content.caption === 'object' && content.caption !== null && 'root' in content.caption

    return (
      <div
        ref={ref}
        className={`relative w-full  ${enableGutter ? 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8' : ''} ${className}`}
      >
        <figure className="group w-full">
          <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-w-16 aspect-h-9">
              <Media
                resource={{
                  url: content.url,
                  alt: content.alt || '',
                }}
                className="w-full h-full"
                imgClassName={`w-3xl h-full object-contain object-center ${imgClassName}`}
              />
            </div>
          </div>
          {content.caption && (
            <figcaption className="mt-4 text-center text-sm text-gray-600 font-medium italic px-4">
              {isRichText ? (
                <RichText data={content.caption} enableGutter={false} enableProse={false} />
              ) : (
                content.caption
              )}
            </figcaption>
          )}
        </figure>
      </div>
    )
  },
)

MediaBlock.displayName = 'MediaBlock'

export default MediaBlock
