// src/utilities/generateStaticMetadata.ts
import type { Metadata } from 'next'

type GenerateStaticMetadataOptions = {
  title: string
  description?: string
  url?: string
}

export function generateStaticMetadata({
  title,
  description,
  url,
}: GenerateStaticMetadataOptions): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
  }
}
