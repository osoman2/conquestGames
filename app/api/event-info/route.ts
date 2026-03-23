import { NextResponse } from 'next/server'

const eventInfo = {
  name: 'Conquest Games',
  edition: '2025 Pilot',
  date: '2025-05-16',
  dateDisplay: '16 de mayo de 2025',
  location: {
    city: 'Lima',
    country: 'Perú',
    venue: 'Parque Zonal Lomas de Lúcumo, Lima',
  },
  format: 'Hybrid — Running + Functional',
  maxAthletes: 100,
  categories: [
    {
      id: 'amateur',
      name: 'Amateur',
      type: 'Team (2 persons)',
      timeLimit: '75 minutes',
      description: 'Team of 2 athletes. Both members must run together at all times. Course guide available.',
    },
    {
      id: 'pro',
      name: 'Pro',
      type: 'Individual',
      timeLimit: '60 minutes',
      description: 'Solo performance — no substitutions, eligible for the Conquest Ranking.',
    },
  ],
  circuit: {
    totalDistance: '4.8 km running',
    totalStations: 7,
    stations: [
      { order: 1, type: 'running', name: 'Running 1', detail: '1.2 km' },
      { order: 2, type: 'functional', name: 'Farmer Carry', detail: '2 straights' },
      { order: 3, type: 'running', name: 'Running 2', detail: '1.2 km' },
      { order: 4, type: 'functional', name: 'Kettlebell Swings', detail: '30 reps' },
      { order: 5, type: 'running', name: 'Running 3', detail: '1.2 km' },
      { order: 6, type: 'functional', name: 'Burpees Forward', detail: '2 straights' },
      { order: 7, type: 'running', name: 'Final Running', detail: '1.2 km' },
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
