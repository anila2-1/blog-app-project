import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { slug, locale } = await req.json()

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    // 1️⃣ Get the post
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?where[slug][equals]=${slug}&locale=${locale}`,
      { cache: 'no-store' },
    )
    const data = await res.json()
    const post = data?.docs?.[0]

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const updatedViews = (post.views || 0) + 1

    // 2️⃣ Include required fields in PATCH (category etc.)
    await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`,
      },
      body: JSON.stringify({
        views: updatedViews,
        category: post.category, // 👈 ensure it's preserved
      }),
    })

    return NextResponse.json({ success: true, views: updatedViews })
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 })
  }
}
