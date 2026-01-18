'use client'

interface HeadInjectorProps {
  html: string
}

export default function HeadInjector({ html }: HeadInjectorProps) {
  return <>{html && <span dangerouslySetInnerHTML={{ __html: html }} />}</>
}
