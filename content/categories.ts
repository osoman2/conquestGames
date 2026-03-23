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
    maxSpots: 60,
    rulesEs: [
      'Tiempo límite: 75 minutos para completar el circuito completo',
      'Cargas reducidas al 60% del peso corporal en levantamientos',
      'Se permiten sustituciones de movimiento por limitación física (previa aprobación)',
      'Guía de recorrido disponible durante el evento',
      'Penalización de 30 seg. por repetición no válida dictaminada por el juez',
    ],
    rulesEn: [
      'Time limit: 75 minutes to complete the full circuit',
      'Loads reduced to 60% of body weight on lifting stations',
      'Movement substitutions allowed for physical limitations (prior approval required)',
      'Course guide available throughout the event',
      '30-sec penalty per invalid rep as ruled by the judge',
    ],
  },
  {
    id: 'pro',
    nameEs: 'Categoría Pro',
    nameEn: 'Pro Category',
    descriptionEs: 'Para atletas de élite con experiencia en competencias de alto nivel.',
    descriptionEn: 'For elite athletes with high-level competition experience.',
    ageMin: 18,
    ageMax: 50,
    maxSpots: 40,
    rulesEs: [
      'Tiempo límite: 60 minutos para completar el circuito completo',
      'Cargas estándar según la tabla oficial de Conquest Games',
      'Sin sustituciones — todos los movimientos son obligatorios',
      'Estándares de movimiento revisados rep a rep por juez certificado',
      'Elegible para clasificación al Ranking Latinoamericano Conquest',
    ],
    rulesEn: [
      'Time limit: 60 minutes to complete the full circuit',
      'Standard loads per the official Conquest Games weight table',
      'No substitutions — all movements are mandatory',
      'Movement standards reviewed rep by rep by a certified judge',
      'Eligible for the Conquest Latin American Ranking',
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
