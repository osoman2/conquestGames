import { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'amateur',
    nameEs: 'Categoría Amateur',
    nameEn: 'Amateur Category',
    descriptionEs: 'Equipos de 2 personas (mixto o mismo género). KB 8 kg. La clave está en la estrategia en equipo para terminar todo. En el RUN todos corren por igual.',
    descriptionEn: 'Teams of 2 (mixed or same gender). KB 8 kg. The key is team strategy to finish everything. All members run equally.',
    ageMin: 18,
    maxSpots: 25,
    rulesEs: [
      'Tiempo límite: 75 minutos para completar el circuito completo',
      'Equipos de 2 personas — mixto o mismo género',
      'Kettlebell: 8 kg',
      'En el RUN todos corren por igual',
      'La estrategia de equipo es clave para completar el circuito',
      'Si un integrante no completa sus 30 reps de Swing, el equipo no avanza a la final',
    ],
    rulesEn: [
      'Time limit: 75 minutes to complete the full circuit',
      'Teams of 2 — mixed or same gender',
      'Kettlebell: 8 kg',
      'All members run equally on all running sections',
      'Team strategy is key to completing the circuit',
      'If one member does not complete 30 Swings, the team cannot advance to the final',
    ],
  },
  {
    id: 'pro',
    nameEs: 'Categoría Pro',
    nameEn: 'Pro Category',
    descriptionEs: 'Competencia individual. KB: Mujeres 8 kg / Hombres 15 kg. Se divide en dos HIT de 25 personas cada uno, con una Final para los 6 mejores.',
    descriptionEn: 'Individual competition. KB: Women 8 kg / Men 15 kg. Split into two HITs of 25 athletes each, with a Final for the top 6.',
    ageMin: 18,
    maxSpots: 50,
    rulesEs: [
      'Tiempo límite: 55 minutos para completar el circuito',
      'Individual — sin compañero de equipo',
      'KB: Mujeres 8 kg / Hombres 15 kg',
      'Repetición mal hecha: el juez no la cuenta',
      'Sin sustituciones — todos los movimientos son obligatorios',
      'Estándares de movimiento revisados rep a rep por juez',
      'Los 6 mejores avanzan a la Gran Final',
    ],
    rulesEn: [
      'Time limit: 55 minutes to complete the circuit',
      'Individual — no teammate',
      'KB: Women 8 kg / Men 15 kg',
      'Poorly executed rep: judge does not count it',
      'No substitutions — all movements are mandatory',
      'Movement standards reviewed rep by rep by a judge',
      'Top 6 advance to the Grand Final',
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
      price: 'S/.300 por equipo',
      perks: ['Equipo de 2 personas (mixto o mismo género)', 'Dorsal numerado', 'Medalla de finalización', 'Acceso a resultados'],
    },
    en: {
      price: 'S/.300 per team',
      perks: ['Team of 2 (mixed or same gender)', 'Numbered bib', 'Finisher medal', 'Results access'],
    },
  },
  pro: {
    es: {
      price: 'S/.200 por persona',
      perks: ['Individual', 'KB: Mujeres 8 kg / Hombres 15 kg', 'Dorsal oro', 'Medalla premium', 'Acceso a resultados en vivo'],
    },
    en: {
      price: 'S/.200 per person',
      perks: ['Individual', 'KB: Women 8 kg / Men 15 kg', 'Gold bib', 'Premium medal', 'Live results access'],
    },
  },
}
