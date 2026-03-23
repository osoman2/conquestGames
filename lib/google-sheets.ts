import { google } from 'googleapis'
import { RegistrationFormData, RegistrationStats } from '@/types'

// Column indices (0-based) in the Google Sheet
// A=0  B=1  C=2  D=3  E=4  F=5  G=6  H=7  I=8  J=9  K=10  L=11  M=12
// Timestamp | Nombre | Apellido | DNI | Email | Teléfono | Edad |
// Categoría | Contacto Emergencia | Tel. Emergencia | Cód. Transferencia | Proveedor Seguro | Validado
const COL = {
  TIMESTAMP: 0,
  FIRST_NAME: 1,
  LAST_NAME: 2,
  DNI: 3,
  EMAIL: 4,
  PHONE: 5,
  AGE: 6,
  CATEGORY: 7,
  EMERGENCY_NAME: 8,
  EMERGENCY_PHONE: 9,
  TRANSFER_NUMBER: 10,
  INSURANCE_PROVIDER: 11,
  VALIDATED: 12,
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
    data.emergencyContactName,
    data.emergencyContactPhone,
    data.transferNumber,
    data.insuranceProvider,
    '', // Validado — left blank for organizers
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:M',
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
    range: 'Sheet1!A:M',
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

