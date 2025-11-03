import React from 'react'

export interface MediaProps {
  resource: {
    url: string
    alt: string
  }
  className?: string
  imgClassName?: string
}

export const Media: React.FC<MediaProps> = ({ resource, imgClassName }) => {
  return <img src={resource.url} alt={resource.alt} className={imgClassName} />
}

export default Media
