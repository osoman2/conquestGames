import { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'amateur',
    nameEs: 'Categoría Amateur',
    nameEn: 'Amateur Category',
    descriptionEs: 'Para atletas con experiencia en funcional. Pueden usar estrategias de equipo para terminar el circuito.',
    descriptionEn: 'For athletes with functional fitness experience. Team strategies are allowed to complete the circuit.',
    ageMin: 18,
    maxSpots: 60,
    rulesEs: [
      'Tiempo límite: 75 minutos para completar el circuito completo',
      'Guía de recorrido disponible durante el evento',
    ],
    rulesEn: [
      'Time limit: 75 minutes to complete the full circuit',
      'Course guide available throughout the event',
    ],
  },
  {
    id: 'pro',
    nameEs: 'Categoría Pro',
    nameEn: 'Pro Category',
    descriptionEs: 'Para atletas de élite con experiencia en competencias de alto nivel.',
    descriptionEn: 'For elite athletes with high-level competition experience.',
    ageMin: 18,
    maxSpots: 40,
    rulesEs: [
      'Tiempo límite: 60 minutos para completar el circuito completo',
      'Sin sustituciones — todos los movimientos son obligatorios',
      'Estándares de movimiento revisados rep a rep por juez',
      'Clasificación al Ranking Conquest',
    ],
    rulesEn: [
      'Time limit: 60 minutes to complete the full circuit',
      'No substitutions — all movements are mandatory',
      'Movement standards reviewed rep by rep by a judge',
      'Eligible for the Conquest Ranking',
    ],
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
