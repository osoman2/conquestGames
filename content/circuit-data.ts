import { Stage } from '@/types'

export const circuitStages: Stage[] = [
  {
    id: 'running1',
    nameEs: 'Running 1',
    nameEn: 'Running 1',
    descriptionEs: 'Primera recta de 475 m. Arranca fuerte pero conserva energía para las estaciones.',
    descriptionEn: 'First 475 m run. Start strong but conserve energy for the stations.',
    distance: '475 m',
    difficulty: 'easy',
    tactics: {
      es: 'Mantén un ritmo constante. No te vacíes en la primera recta.',
      en: 'Keep a steady pace. Don\'t empty your tank on the first straight.',
    },
    penalties: {
      es: ['Amateur: todos los integrantes del equipo deben correr juntos en todo momento.'],
      en: ['Amateur: all team members must run together at all times.'],
    },
  },
  {
    id: 'kettlebell-swings',
    nameEs: 'Kettlebell Swings',
    nameEn: 'Kettlebell Swings',
    descriptionEs: '30 swing a dos manos. KB: Amateur 8 kg | Pro Mujeres 8 kg / Hombres 15 kg. KB mínimo a altura de pecho.',
    descriptionEn: '30 two-hand swings. KB: Amateur 8 kg | Pro Women 8 kg / Men 15 kg. KB must reach at least chest height.',
    reps: 30,
    difficulty: 'hard',
    tactics: {
      es: 'KB mínimo a altura de pecho. En PROS el juez no cuenta las reps mal ejecutadas.',
      en: 'KB must reach at least chest height. For PROS, judges do not count poorly executed reps.',
    },
    penalties: {
      es: [
        'KB mínimo a altura de pecho. Rep mal ejecutada = no cuenta (PROS).',
        'Amateur: si un integrante no completa sus 30 reps, el equipo no avanza a la final.',
      ],
      en: [
        'Minimum chest height. Poorly executed rep = doesn\'t count (PROS).',
        'Amateur: if one member does not complete 30 reps, the team cannot advance to the final.',
      ],
    },
  },
  {
    id: 'running2',
    nameEs: 'Running 2',
    nameEn: 'Running 2',
    descriptionEs: 'Segunda recta de 475 m. Recupera el aliento tras los Swings antes de la siguiente estación.',
    descriptionEn: 'Second 475 m run. Recover your breath after the Swings before the next station.',
    distance: '475 m',
    difficulty: 'medium',
    tactics: {
      es: 'Controla la respiración. Usa estos metros para recuperarte.',
      en: 'Control your breathing. Use these meters to recover.',
    },
    penalties: {
      es: ['Amateur: todos los integrantes del equipo deben correr juntos en todo momento.'],
      en: ['Amateur: all team members must run together at all times.'],
    },
  },
  {
    id: 'farmer-carry',
    nameEs: 'Caminata Granjero',
    nameEn: 'Farmer Carry',
    descriptionEs: 'Caminata granjero x2 rectas. Mantén la postura correcta en todo momento.',
    descriptionEn: 'Farmer carry x2 straights. Maintain correct posture throughout.',
    distance: '2 rectas',
    difficulty: 'hard',
    tactics: {
      es: 'Mantén los hombros relajados. La velocidad es secundaria a la seguridad.',
      en: 'Keep shoulders relaxed. Speed is secondary to safety.',
    },
    penalties: {
      es: ['Si el KB toca el piso antes de completar una recta, deberás hacer una recta adicional de Caminata Granjero.'],
      en: ['If the KB touches the ground before completing a straight, you must complete one additional Farmer Carry straight.'],
    },
  },
  {
    id: 'running3',
    nameEs: 'Running 3',
    nameEn: 'Running 3',
    descriptionEs: 'Tercera recta de 475 m. Ya llevás más de la mitad del circuito — no aflojes.',
    descriptionEn: 'Third 475 m run. You\'re past halfway — don\'t ease up.',
    distance: '475 m',
    difficulty: 'medium',
    tactics: {
      es: 'No te quedes sin energía ahora. La última estación es la más dura.',
      en: 'Don\'t burn out now. The last station is the hardest.',
    },
    penalties: {
      es: ['Amateur: todos los integrantes del equipo deben correr juntos en todo momento.'],
      en: ['Amateur: all team members must run together at all times.'],
    },
  },
  {
    id: 'burpees',
    nameEs: 'Burpees Avanzando',
    nameEn: 'Burpees Forward',
    descriptionEs: 'Completa 2 rectas realizando burpees avanzando. El desafío más explosivo del circuito.',
    descriptionEn: 'Complete 2 straights performing forward burpees. The most explosive challenge of the circuit.',
    distance: '2 rectas',
    difficulty: 'hard',
    tactics: {
      es: 'Ritmo constante es mejor que arranques rápidos. Cada burpee cuenta.',
      en: 'Consistent pace beats fast starts. Every burpee counts.',
    },
  },
  {
    id: 'running-final',
    nameEs: 'Trote Final',
    nameEn: 'Final Jog',
    descriptionEs: 'Trota 475 m para cruzar la meta. Todo lo que entrenaste llega a este momento.',
    descriptionEn: 'Jog 475 m to cross the finish line. Everything you trained for comes down to this.',
    distance: '475 m',
    difficulty: 'hard',
    tactics: {
      es: 'Todo está en la mente. Termina fuerte.',
      en: 'It\'s all mental. Finish strong.',
    },
    penalties: {
      es: ['Amateur: todos los integrantes del equipo deben cruzar la meta juntos.'],
      en: ['Amateur: all team members must cross the finish line together.'],
    },
  },
]

export const stageFlow = [
  'running1',
  'kettlebell-swings',
  'running2',
  'farmer-carry',
  'running3',
  'burpees',
  'running-final',
]
