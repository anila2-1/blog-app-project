import { Post } from '../../../payload-types'
import PostCard from './PostCard'
import { getLanguageConfig, LanguageCode, languages } from './../../../config/languages'

interface SimplifiedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image?: { url: string }
  publishedAt?: string
  featured?: boolean
  pinned?: boolean
  views?: number
  category?: { name: string; slug: string }
}

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { noPosts: 'No pinned posts found.' },
  he: { noPosts: 'לא נמצאו פוסטים מוצמדים.' },
  hr: { noPosts: 'Nema prikvačenih postova.' },
  tr: { noPosts: 'Sabitlenmiş gönderi bulunamadı.' },
}

const t = translations[LANG_CODE] || translations.en

interface PinnedPostsProps {
  posts: Post[] | SimplifiedPost[]
  loading: boolean
}

export default function PinnedPosts({ posts, loading }: PinnedPostsProps) {
  if (loading) {
    const count: number = 3
    return (
      <div
        className={`grid gap-5 mt-5 animate-pulse ${
          count === 1
            ? 'grid-cols-1'
            : count === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-3'
        }`}
      >
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="block rounded-xl overflow-hidden border border-black/10 shadow-[2px_2px_0px_#00000066] bg-white"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 pt-2">
              <div className="h-4 bg-gray-200 rounded w-16 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-4/5 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <p
        className="text-gray-500 text-center"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </p>
    )
  }

  return (
    <div
      className={`grid gap-5 mt-5 ${
        posts.length === 1
          ? 'grid-cols-1'
          : posts.length === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-3'
      }`}
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} locale={langConfig.locale} />
      ))}
    </div>
  )
}
