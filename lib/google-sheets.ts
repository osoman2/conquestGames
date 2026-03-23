import { google } from 'googleapis'
import { RegistrationFormData, RegistrationStats } from '@/types'

// Column indices (0-based) in the Google Sheet
// A=0  B=1  C=2  D=3  E=4  F=5  G=6  H=7  I=8  J=9  K=10  L=11  M=12  N=13  O=14  P=15  Q=16  R=17  S=18
// Timestamp | Nombre | Apellido | DNI | Email | Teléfono | Edad | Categoría |
// Nombre P2 | Apellido P2 | DNI P2 | Edad P2 |
// Contacto Emergencia | Tel. Emergencia | Cód. Transferencia | Proveedor Seguro |
// Waiver P1 Firmado | Waiver P2 Firmado | Validado
const COL = {
  TIMESTAMP: 0,
  FIRST_NAME: 1,
  LAST_NAME: 2,
  DNI: 3,
  EMAIL: 4,
  PHONE: 5,
  AGE: 6,
  CATEGORY: 7,
  TEAMMATE_FIRST_NAME: 8,
  TEAMMATE_LAST_NAME: 9,
  TEAMMATE_DNI: 10,
  TEAMMATE_AGE: 11,
  EMERGENCY_NAME: 12,
  EMERGENCY_PHONE: 13,
  TRANSFER_NUMBER: 14,
  INSURANCE_PROVIDER: 15,
  WAIVER_P1_SIGNED: 16,
  WAIVER_P2_SIGNED: 17,
  VALIDATED: 18,
}

function getAuth() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!keyJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set')

  const credentials = JSON.parse(keyJson)

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

function getSheetId() {
  const id = process.env.GOOGLE_SHEETS_ID
  if (!id) throw new Error('GOOGLE_SHEETS_ID env var is not set')
  return id
}

/**
 * Appends a new registration row to the Google Sheet.
 * The "Validado" column is left empty — organizers fill it manually.
 */
export async function appendRegistration(data: RegistrationFormData): Promise<void> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = getSheetId()

  const row = [
    new Date().toISOString(),
    data.firstName,
    data.lastName,
    data.dni,
    data.email,
    data.phone,
    data.age,
    data.category,
    data.teammate?.firstName ?? '',
    data.teammate?.lastName ?? '',
    data.teammate?.dni ?? '',
    data.teammate?.age ?? '',
    data.emergencyContactName,
    data.emergencyContactPhone,
    data.transferNumber,
    data.insuranceProvider,
    data.agreeToWaiver ? 'SI' : '',   // Waiver P1 Firmado — siempre 'SI' al llegar aquí
    data.agreeToWaiverP2 ? 'SI' : '', // Waiver P2 Firmado — 'SI' para Amateur, vacío para Pro
    '', // Validado — left blank for organizers
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:S',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })
}

/**
 * Reads the sheet and returns the count of VALIDATED registrations per category.
 * A row is considered validated when column M (Validado) contains a truthy value:
 * TRUE, SI, SÍ, YES, 1, or a checked checkbox (Google Sheets sends TRUE for checkboxes).
 */
export async function getValidatedStats(): Promise<RegistrationStats> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = getSheetId()

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A:S',
  })

  const rows = res.data.values ?? []

  // Skip header row (row index 0) if it exists
  const dataRows = rows.length > 0 && isNaN(Number(rows[0][COL.AGE])) ? rows.slice(1) : rows

  const TRUTHY = new Set(['true', 'si', 'sí', 'yes', '1', 'válido', 'valido'])

  let pro = 0
  let amateur = 0
  let masters = 0

  for (const row of dataRows) {
    const validatedRaw = (row[COL.VALIDATED] ?? '').toString().toLowerCase().trim()
    const isValidated = TRUTHY.has(validatedRaw)
    if (!isValidated) continue

    const category = (row[COL.CATEGORY] ?? '').toString().toLowerCase().trim()
    if (category === 'pro') pro++
    else if (category === 'amateur') amateur++
    else if (category === 'masters') masters++
  }

  return { pro, amateur, masters, total: pro + amateur + masters }
}

