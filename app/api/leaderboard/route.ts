import { NextResponse } from 'next/server'

const mockLeaderboard = [
  { pos: 1, name: 'Carlos Medina', time: '38:42', timeSeconds: 2322, category: 'Pro' },
  { pos: 2, name: 'Nicolás Torres', time: '39:15', timeSeconds: 2355, category: 'Pro' },
  { pos: 3, name: 'Rafael & Diego', time: '41:08', timeSeconds: 2468, category: 'Amateur' },
  { pos: 4, name: 'Sebastián Ríos', time: '42:33', timeSeconds: 2553, category: 'Pro' },
  { pos: 5, name: 'Martina & Paula', time: '44:17', timeSeconds: 2657, category: 'Amateur' },
  { pos: 6, name: 'Gonzalo Pereyra', time: '45:02', timeSeconds: 2702, category: 'Pro' },
  { pos: 7, name: 'Luis & Marco', time: '46:38', timeSeconds: 2798, category: 'Amateur' },
  { pos: 8, name: 'Andrés Vega', time: '47:55', timeSeconds: 2875, category: 'Pro' },
  { pos: 9, name: 'Sandra & Carla', time: '49:21', timeSeconds: 2961, category: 'Amateur' },
  { pos: 10, name: 'Diego Fuentes', time: '50:44', timeSeconds: 3044, category: 'Pro' },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') || '10', 10)

  let results = mockLeaderboard
  if (category && category !== 'all') {
    results = results.filter((r) => r.category.toLowerCase() === category.toLowerCase())
  }

  return NextResponse.json({
    results: results.slice(0, limit),
    total: results.length,
    lastUpdated: new Date().toISOString(),
    eventEdition: 'Pilot 2025',
  })
}
