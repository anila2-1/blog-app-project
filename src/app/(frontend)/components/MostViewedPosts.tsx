import { Post } from '../../../payload-types'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'

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
  en: { noPosts: 'No popular posts yet.', views: 'views' },
  he: { noPosts: 'אין פוסטים פופולריים עדיין.', views: 'צפיות' },
  hr: { noPosts: 'Još nema popularnih postova.', views: 'pregleda' },
  tr: { noPosts: 'Henüz popüler gönderi yok.', views: 'görüntülenme' },
}

const t = translations[LANG_CODE] || translations.en

interface MostViewedPostsProps {
  posts: Post[] | SimplifiedPost[]
  loading: boolean
}

export default function MostViewedPosts({ posts, loading }: MostViewedPostsProps) {
  if (loading) {
    return (
      <div className="mt-5 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white border border-gray-100 animate-pulse"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/6"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!posts.length) {
    return (
      <p
        className="text-gray-500 text-center py-6 text-sm sm:text-base"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        {t.noPosts}
      </p>
    )
  }

  return (
    <div
      className="flex flex-col gap-3 sm:gap-4 mt-4"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {posts.map((post, i) => (
        <a
          href={`/${post.slug}`}
          key={post.id}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 opacity-0 animate-fadeIn"
          style={{
            animationDelay: `${i * 120}ms`,
            animationFillMode: 'forwards',
          }}
        >
          {/* Image */}
          {typeof post.image !== 'string' && post.image?.url ? (
            <img
              src={post.image.url}
              alt={post.title}
              className="w-full sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-lg border border-gray-200 shadow-md shrink-0"
            />
          ) : (
            <div className="w-full sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-lg shrink-0"></div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 hover:text-indigo-600 transition-colors duration-200 text-sm sm:text-base">
              {post.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
              {post?.views !== undefined && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {post.views} {t.views}
                </div>
              )}
              {post?.publishedAt && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  {new Date(post.publishedAt).toLocaleDateString(langConfig.locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
