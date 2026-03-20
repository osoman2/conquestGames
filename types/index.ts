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
}

export type Regulation = {
  id: string
  titleEs: string
  titleEn: string
  contentEs: string
  contentEn: string
  category: 'rules' | 'safety' | 'penalties' | 'logistics'
}

export type RegistrationFormData = {
  firstName: string
  lastName: string
  dni: string
  email: string
  phone: string
  age: number
  category: string
  emergencyContactName: string
  emergencyContactPhone: string
  agreeToWaiver: boolean
  agreeToTerms: boolean
}

export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'
