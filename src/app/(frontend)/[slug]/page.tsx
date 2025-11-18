// src/app/(frontend)/posts/[slug]/page.tsx

import { Post } from '../../../payload-types'
import { getLanguageConfig, LanguageCode, languages } from '@/config/languages'
import PostContent from '@/components/PostContent'
import MostViewedPosts from './../components/MostViewedPosts'
import LatestPosts from './../components/LatestPosts'
import { LucideFacebook, LucideTwitter, LucideInstagram, LucideYoutube } from 'lucide-react'

const LANG_CODE = (process.env.NEXT_PUBLIC_DEFAULT_LANG as LanguageCode) || languages[0].code
const langConfig = getLanguageConfig(LANG_CODE)

// --- SEO in <head> ---
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[slug][equals]=${slug}&locale=${langConfig.locale}&depth=1`,
    { cache: 'no-store' },
  )
  const data = await res.json()
  const post: Post = data.docs?.[0]

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist or was removed.',
    }
  }

  // safe category object: only keep it if API returned the relationship as an object
  const category = (() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawCat = (post as any)?.category ?? (post as any)?.categories?.[0]
    return typeof rawCat === 'object' && rawCat ? rawCat : undefined
  })()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (post as any).seo
  const title = seo?.metaTitle || post.title
  const description = seo?.metaDescription || post.excerpt
  const categorySuffix = category ? ` | Category: ${category.name || category.title}` : ''
  const fullDescription = `${description}${categorySuffix}`

  return {
    title,
    description: fullDescription,
    openGraph: {
      title,
      description: fullDescription,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${post.slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description: fullDescription,
    },
  }
}

// --- Page Body ---
export default async function SinglePostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[slug][equals]=${slug}&locale=${langConfig.locale}&depth=1&fallback-locale=none`,
    { cache: 'no-store' },
  )
  const data = await res.json()
  const post: Post = data.docs?.[0]

  // safe category object: only keep it if the relationship returned an object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let category: any = (() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawCat = (post as any)?.category ?? (post as any)?.categories?.[0]
    return typeof rawCat === 'object' && rawCat ? rawCat : undefined
  })()

  // If we don't have a populated category object but we do have an id, fetch it server-side.
  if (!category) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawCatId = (post as any)?.category ?? (post as any)?.categories?.[0]
      if (rawCatId && (typeof rawCatId === 'string' || typeof rawCatId === 'number')) {
        const catRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?where[id][equals]=${rawCatId}&locale=${langConfig.locale}&fallback-locale=none`,
          { cache: 'no-store' },
        )
        const catData = await catRes.json()
        category = catData.docs?.[0]
      }
    } catch (err) {
      // ignore — we'll just not render the category pill if this fails
      console.error('Failed to fetch category by id', err)
    }
  }

  // Fetch latest and most viewed posts for sidebar
  const [latestRes, mostViewedRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-publishedAt&limit=4&locale=${langConfig.locale}&depth=1&fallback-locale=none`,
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?sort=-views&limit=4&locale=${langConfig.locale}&depth=1&fallback-locale=none`,
    ),
  ])

  const [latestData, mostViewedData] = await Promise.all([latestRes.json(), mostViewedRes.json()])

  const latestPosts = latestData.docs || []
  const mostViewedPosts = mostViewedData.docs || []

  if (!post) {
    return (
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        dir={langConfig.direction}
        style={{ fontFamily: langConfig.font }}
      >
        <p className="text-gray-600">Post not found.</p>
      </main>
    )
  }

  return (
    <main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      dir={langConfig.direction}
      style={{ fontFamily: langConfig.font }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <article>
            {/* ✅ Pass category to client component */}
            <PostContent post={post} category={category} />
          </article>
        </div>

        {/* Right Column: Latest, Popular, Ads, Social Icons */}
        <div className="space-y-6">
          {/* Latest */}
          <SectionCard
            label="Latest"
            padding="p-5"
            labelPosition="top-3 left-3"
            customClasses="bg-white shadow-sm border border-black/10"
          >
            <LatestPosts posts={latestPosts} loading={false} />
          </SectionCard>

          {/* Popular */}
          <SectionCard
            label="Popular"
            padding="p-3"
            labelPosition="top-4 left-4"
            customClasses="bg-white shadow-sm border border-black/10"
          >
            <MostViewedPosts posts={mostViewedPosts} loading={false} />
          </SectionCard>

          {/* Advertisement Card */}
          <div
            className={`relative group rounded-2xl overflow-hidden bg-white p-6 
                        border border-black/10 shadow-[2px_2px_0px_#00000066] 
                        transition-all duration-200 ease-out 
                        hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5`}
          >
            {/* Subtle Glow on Hover */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#F16363]/10 via-[#ff8a8a]/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10"></div>

            <div
              className={`h-40 bg-linear-to-br from-[#fdf8f0] via-[#fff5cf] to-[#fdf8f0] 
                          rounded-xl mb-5 flex items-center justify-center relative overflow-hidden 
                          border border-black/10 shadow-[2px_2px_0px_#00000066]
                          transition-all duration-200 ease-out 
                          active:translate-x-0.5 active:translate-y-0.5`}
            >
              <span className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-30"></span>
              <span className="text-black text-sm font-bold tracking-widest uppercase">
                AD SPACE
              </span>
            </div>

            <p className="text-sm text-black font-semibold text-center tracking-wide">
              Advertisement
            </p>
          </div>

          {/* Follow Us Card */}
          <div
            className={`bg-linear-to-br from-[#ffffff] via-[#fdfdfb] to-[#ffffff] 
              border shadow-sm
                  transition-all duration-200 ease-out 
                  hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 
                  relative overflow-hidden rounded-2xl p-6`}
          >
            <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent"></div>

            {/* Title */}
            <h3 className="font-bold text-black text-lg mb-4 text-center relative z-10">
              <span className="relative z-10">Follow Us</span>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-1 bg-black rounded-full"></span>
            </h3>

            {/* Social Icons Row */}
            <div className="flex justify-center gap-4 py-2">
              <SocialIcon Icon={LucideFacebook} />
              <SocialIcon Icon={LucideTwitter} />
              <SocialIcon Icon={LucideInstagram} />
              <SocialIcon Icon={LucideYoutube} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function SectionCard({
  label,
  children,
  padding = 'p-6',
  labelPosition = 'top-4 left-4',
  customClasses = '',
}: {
  label: string
  children: React.ReactNode
  padding?: string
  labelPosition?: string
  customClasses?: string
}) {
  return (
    <section
      className={`relative rounded-2xl ${padding} mt-12 border-none shadow-none ${customClasses}`}
    >
      <div
        className={`absolute ${labelPosition} px-4 py-1.5 bg-linear-to-r from-purple-500 to-indigo-600 text-white text-sm font-bold rounded-full shadow-md`}
      >
        {label}
      </div>
      <div className="pt-8">{children}</div>
    </section>
  )
}

/* 🎨 Social Icon with Consistent Retro Press Feel */
function SocialIcon({ Icon }: { Icon: React.ElementType }) {
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-center w-12 h-12 rounded-full 
                  bg-white border shadow-sm
                  transition-all duration-200 ease-out 
                  hover:-translate-y-[3px] active:translate-x-0.5 active:translate-y-0.5`}
    >
      <Icon
        size={20} // ✅ smaller icon for better fit inside 48x48 circle
        strokeWidth={2.5}
        className="text-black group-hover:text-[#F16363] transition-all duration-200 ease-out group-hover:scale-110"
      />
    </a>
  )
}
