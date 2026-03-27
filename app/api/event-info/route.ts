import { NextResponse } from 'next/server'

const eventInfo = {
  name: 'Conquest Games',
  edition: '2025 Pilot',
  date: '2025-05-16',
  dateDisplay: '16 de mayo de 2025',
  location: {
    city: 'Lima',
    country: 'Perú',
    venue: 'Country Club Villa (CCV)',
  },
  format: 'Hybrid — Running + Functional',
  maxRegistrations: 75, // 25 amateur teams + 50 pro individuals
  maxAthletes: 100,
  categories: [
    {
      id: 'amateur',
      name: 'Amateur',
      type: 'Team (2 persons)',
      maxSpots: 25,
      timeLimit: '75 minutes',
      kettlebellWeight: '8 kg (all)',
      price: 'S/.300 per team',
      description: 'Team of 2 (mixed or same gender). KB 8 kg. Time limit 75 min. Price: S/.300 per team.',
    },
    {
      id: 'pro',
      name: 'Pro',
      type: 'Individual',
      maxSpots: 50,
      timeLimit: '55 minutes',
      kettlebellWeight: { women: '8 kg', men: '15 kg' },
      price: 'S/.200 per person',
      description: 'Individual. KB Women 8 kg / Men 15 kg. Time limit 55 min. Top 6 to Final. Price: S/.200.',
    },
  ],
  circuit: {
    totalRunningDistance: '3.325 km (3x950m + 475m)',
    totalStations: 7,
    stations: [
      { order: 1, type: 'running', name: 'Running 1', detail: '2 vueltas' },
      { order: 2, type: 'functional', name: 'Kettlebell Swings', detail: '30 reps (2-hand swing)' },
      { order: 3, type: 'running', name: 'Running 2', detail: '2 vueltas' },
      { order: 4, type: 'functional', name: 'Farmer Carry', detail: '2 straights' },
      { order: 5, type: 'running', name: 'Running 3', detail: '2 vueltas' },
      { order: 6, type: 'functional', name: 'Burpees', detail: '2 straights' },
      { order: 7, type: 'running', name: 'Trote Final', detail: '1 vuelta' },
    ],
  },
  contact: {
    email: 'Info@theconquestgames.com',
    instagram: '@con.questgames',
    whatsapp1: '+51 990 809 868',
    whatsapp2: '+51 940 165 020',
  },
  status: 'registration_open',
}

export async function GET() {
  return NextResponse.json(eventInfo)
}
