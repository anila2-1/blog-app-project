// src/app/(frontend)/posts/page.tsx
import PostsPageClient from './PostsPageClient'
import { generateStaticMetadata } from './../../../utilities/generateStaticMetadata'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

// ✅ SEO Metadata — goes into <head>
export const metadata = generateStaticMetadata({
  title: 'Blog Posts | SkyNotes Journal',
  description:
    'Read the latest posts from SkyNotes Journal — where ideas take flight. Explore insights, stories, and articles from creative minds around the world.',
  url: '/posts',
})

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = parseInt(params?.page || '1', 10)

  return (
    <div className="relative min-h-screen overflow-hidden ">
      <PostsPageClient initialPage={currentPage} />
    </div>
  )
}
