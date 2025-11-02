import { Post } from '../../../payload-types'
import PostCard from './PostCard'
import { getLanguageConfig, LanguageCode } from './../../../config/languages'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || 'en'
const langConfig = getLanguageConfig(LANG_CODE)

const translations = {
  en: { noPosts: 'No pinned posts found.' },
  he: { noPosts: 'לא נמצאו פוסטים מוצמדים.' },
  hr: { noPosts: 'Nema prikvačenih postova.' },
}

const t = translations[LANG_CODE] || translations.en

interface PinnedPostsProps {
  posts: Post[]
}

export default function PinnedPosts({ posts }: PinnedPostsProps) {
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
