import { NextResponse } from 'next/server'
import { getValidatedStats } from '@/lib/google-sheets'

// Cache the result for 30 seconds to avoid hammering the Sheets API on every render
export const revalidate = 30

export async function GET() {
  try {
    const stats = await getValidatedStats()
    return NextResponse.json(stats, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    })
  } catch (err) {
    console.error('[stats GET]', err)
    return NextResponse.json(
      { error: 'Could not fetch stats' },
      { status: 500 }
    )
  }
}

