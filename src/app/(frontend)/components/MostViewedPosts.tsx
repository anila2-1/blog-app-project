import { Post } from '../../../payload-types'
import { getLanguageConfig, LanguageCode } from '@/config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { noPosts: 'No popular posts yet.' },
  he: { noPosts: 'אין פוסטים פופולריים עדיין.' },
  hr: { noPosts: 'Još nema popularnih postova.' },
}

const t = translations[LANG_CODE] || translations.en

interface MostViewedPostsProps {
  posts: Post[]
}

export default function MostViewedPosts({ posts }: MostViewedPostsProps) {
  // 🚫 No posts
  if (!posts.length) {
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

  // ✅ Final layout
  return (
    <div
      className="flex flex-col gap-5 mt-5"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      {posts.map((post, i) => (
        <a
          href={`/posts/${post.slug}`}
          key={post.id}
          className="flex gap-4 items-center p-3 bg-white border-2 border-black rounded-2xl
                     shadow-[2px_2px_0px_#00000066] hover:bg-gray-50 transition-all duration-200 ease-out
                     hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5
                     opacity-0 animate-fadeIn"
          style={{
            animationDelay: `${i * 120}ms`,
            animationFillMode: 'forwards',
          }}
        >
          {/* Thumbnail */}
          {typeof post.image !== 'string' && post.image?.url && (
            <img
              src={post.image.url}
              alt={post.title}
              className="w-28 h-20 object-cover rounded-xl border-2 border-black shadow-[2px_2px_0px_#00000066]"
            />
          )}

          {/* Title + Excerpt + Views */}
          <div className="flex-1">
            <p className="text-xs text-gray-500 mt-1"> {post.views || 0} views</p>

            <h3 className="text-[20px] font-bold text-gray-900 leading-snug line-clamp-2 hover:text-indigo-600 transition-colors duration-200">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-[15px] text-gray-700 mt-1 line-clamp-2">{post.excerpt}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}
