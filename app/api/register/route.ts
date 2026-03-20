import { NextRequest, NextResponse } from 'next/server'

export interface RegistrationPayload {
  name: string
  email: string
  category: string
  teamName?: string
  experience: string
  phone?: string
}

// Mock in-memory storage — replace with real DB in production
const registrations: RegistrationPayload[] = []

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegistrationPayload

    // Basic validation
    if (!body.name || !body.email || !body.category || !body.experience) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, category, experience' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check spots
    if (registrations.length >= 100) {
      return NextResponse.json({ error: 'No spots available' }, { status: 409 })
    }

    // Check duplicate email
    if (registrations.some((r) => r.email === body.email)) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    registrations.push(body)

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        totalRegistrations: registrations.length,
        spotsRemaining: 100 - registrations.length,
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    totalRegistrations: registrations.length,
    spotsRemaining: 100 - registrations.length,
    maxAthletes: 100,
  })
}
