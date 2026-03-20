import { NextResponse } from 'next/server'

const eventInfo = {
  name: 'Conquest Games',
  edition: '2025 Pilot',
  date: '2025-05-16',
  dateDisplay: '16 de mayo de 2025',
  location: {
    city: 'Lima',
    country: 'Perú',
    venue: 'Por confirmar',
  },
  format: 'Hybrid — Running + Functional',
  maxAthletes: 100,
  spotsRemaining: 27,
  categories: [
    {
      id: 'amateur',
      name: 'Amateur',
      type: 'Team (2 persons)',
      timeLimit: '1 hour',
      description: 'Team of 2 athletes sharing the effort across functional stations.',
    },
    {
      id: 'pro',
      name: 'Pro',
      type: 'Individual',
      timeLimit: '1 hour',
      description: 'Solo performance — competitive ranking and official podium.',
    },
  ],
  circuit: {
    totalDistance: '4.8 km running',
    totalStations: 7,
    stations: [
      { order: 1, type: 'running', name: 'Running 1', detail: '1.2 km' },
      { order: 2, type: 'functional', name: 'Kettlebell Swings', detail: '30 reps' },
      { order: 3, type: 'running', name: 'Running 2', detail: '1.2 km' },
      { order: 4, type: 'functional', name: 'Farmer Carry', detail: '3 straights' },
      { order: 5, type: 'running', name: 'Running 3', detail: '1.2 km' },
      { order: 6, type: 'functional', name: 'Burpee Broad Jumps', detail: '3 straights' },
      { order: 7, type: 'running', name: 'Final Run', detail: '1.2 km' },
    ],
  },
  contact: {
    email: 'info@conquestgames.pe',
    instagram: '@conquestgames',
  },
  status: 'registration_open',
}

export async function GET() {
  return NextResponse.json(eventInfo)
}
