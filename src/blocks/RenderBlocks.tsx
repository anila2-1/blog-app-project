import React, { Fragment } from 'react'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'

// Define the types for the blocks based on their blockType
type LayoutBlock =
  | ({ blockType: 'content' } & Record<string, unknown>) // ContentBlock props
  | ({ blockType: 'cta' } & Record<string, unknown>) // CallToActionBlock props
  | ({ blockType: 'mediaBlock' } & Record<string, unknown>) // MediaBlock props

// Define a Page type that has a layout property which is an array of LayoutBlock
interface Page {
  layout: LayoutBlock[]
}
import MediaBlock from '@/blocks/MediaBlock/Component'

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...(block as any)} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
