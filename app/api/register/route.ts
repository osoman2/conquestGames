import { NextRequest, NextResponse } from 'next/server'
import { appendRegistration } from '@/lib/google-sheets'
import { RegistrationFormData } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegistrationFormData

    // Basic validation
    if (!body.firstName || !body.lastName || !body.email || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (!body.transferNumber || !body.insuranceProvider) {
      return NextResponse.json(
        { error: 'Transfer number and insurance provider are required' },
        { status: 400 }
      )
    }

    // Write to Google Sheets
    await appendRegistration(body)

    return NextResponse.json(
      { success: true, message: 'Registration successful' },
      { status: 201 }
    )
  } catch (err) {
    console.error('[register POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
