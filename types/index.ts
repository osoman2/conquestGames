export type Stage = {
  id: string
  nameEs: string
  nameEn: string
  descriptionEs: string
  descriptionEn: string
  distance?: string
  reps?: number
  difficulty: 'easy' | 'medium' | 'hard'
  tactics: {
    es: string
    en: string
  }
  penalties?: {
    es: string[]
    en: string[]
  }
  videoUrl?: string
}

export type Category = {
  id: string
  nameEs: string
  nameEn: string
  descriptionEs: string
  descriptionEn: string
  ageMin: number
  ageMax?: number
  maxSpots?: number
  rulesEs?: string[]
  rulesEn?: string[]
}

export type Regulation = {
  id: string
  titleEs: string
  titleEn: string
  contentEs: string
  contentEn: string
  category: 'rules' | 'safety' | 'penalties' | 'logistics'
}

export type TeammateData = {
  firstName: string
  lastName: string
  dni: string
  age: number
}

export type RegistrationFormData = {
  firstName: string
  lastName: string
  dni: string
  email: string
  phone: string
  age: number
  category: string
  teammate?: TeammateData
  emergencyContactName: string
  emergencyContactPhone: string
  transferNumber: string
  insuranceProvider: string
  agreeToWaiver: boolean
  agreeToTerms: boolean
  agreeToWaiverP2?: boolean
}

export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

export type RegistrationStats = {
  pro: number
  amateur: number
  masters: number
  total: number
}
