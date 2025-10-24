// src/app/api/categories/route.ts

import { getPayload } from './../../../lib/payload'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload()

    const categories = await payload.find({
      collection: 'categories', // <-- Yeh aapke Payload collection ka naam hai
      limit: 9, // Optional: agar zyada categories hain to limit lagayein
      sort: 'title', // Optional: alphabetical order
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
