import { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'amateur',
    nameEs: 'Categoría Amateur',
    nameEn: 'Amateur Category',
    descriptionEs: 'Para atletas con experiencia en funcional, buscando su primer desafío competitivo serio.',
    descriptionEn: 'For functional fitness athletes seeking their first serious competitive challenge.',
    ageMin: 18,
    ageMax: 35,
  },
  {
    id: 'pro',
    nameEs: 'Categoría Pro',
    nameEn: 'Pro Category',
    descriptionEs: 'Para atletas de élite con experiencia en competencias de alto nivel.',
    descriptionEn: 'For elite athletes with high-level competition experience.',
    ageMin: 18,
    ageMax: 50,
  },
  {
    id: 'masters',
    nameEs: 'Categoría Masters',
    nameEn: 'Masters Category',
    descriptionEs: 'Para atletas 50+ que mantienen el nivel de competencia.',
    descriptionEn: 'For 50+ athletes maintaining competition standards.',
    ageMin: 50,
  },
]

export const categoryComparison = {
  amateur: {
    es: {
      price: '$120',
      perks: ['Dorsal numerado', 'Medalla de finalización', 'Acceso a resultados'],
    },
    en: {
      price: '$120',
      perks: ['Numbered bib', 'Finisher medal', 'Results access'],
    },
  },
  pro: {
    es: {
      price: '$180',
      perks: ['Dorsal oro', 'Medalla premium', 'Acceso a resultados en vivo', 'Camiseta exclusiva'],
    },
    en: {
      price: '$180',
      perks: ['Gold bib', 'Premium medal', 'Live results access', 'Exclusive t-shirt'],
    },
  },
}
