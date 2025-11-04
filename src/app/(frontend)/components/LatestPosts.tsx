import Link from 'next/link'
import Image from 'next/image'
import { Post } from '../../../payload-types'
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

const DEFAULT_LANG = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code

interface LatestPostsProps {
  posts: Post[] | SimplifiedPost[]
  loading: boolean
}

export default function LatestPosts({ posts, loading }: LatestPostsProps) {
  const langConfig = getLanguageConfig(DEFAULT_LANG)

  const translations = {
    en: { noPosts: 'No posts found.', label: 'New' },
    he: { noPosts: 'לא נמצאו פוסטים.', label: 'חדש' },
    hr: { noPosts: 'Nema pronađenih postova.', label: 'Novo' },
  }
  const t = translations[DEFAULT_LANG] || translations.en

  if (loading) {
    return (
      <div className="space-y-4 mt-5 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="block p-3 rounded-2xl bg-white border border-black/10 shadow-[2px_2px_0px_#00000066]"
          >
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <p
        className="text-gray-600 text-center py-6"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </p>
    )
  }

  return (
    <div className="space-y-4 mt-5">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/${post.slug}`}
          className="group relative block p-3 rounded-2xl bg-white border border-black/10 shadow-[2px_2px_0px_#00000066] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[2px_2px_0px_#00000066] active:translate-x-0.5 active:translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl border border-black/10 shadow-[2px_2px_0px_#00000066]">
              {typeof post.image !== 'string' && post.image?.url ? (
                <Image
                  src={post.image.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gray-200"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 line-clamp-2 text-sm sm:text-base transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-gray-700 text-xs mt-1 line-clamp-2">{post.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
