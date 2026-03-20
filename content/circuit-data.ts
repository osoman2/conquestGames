import { Stage } from '@/types'

export const circuitStages: Stage[] = [
  {
    id: 'running1',
    nameEs: 'Running 1',
    nameEn: 'Running 1',
    descriptionEs: 'Primera recta de carrera. Arranca fuerte pero conserva energía para las estaciones.',
    descriptionEn: 'First running straight. Start strong but conserve energy for the stations.',
    distance: '1.2 km',
    difficulty: 'easy',
    tactics: {
      es: 'Mantén un ritmo constante. No te vacíes en la primera recta.',
      en: 'Keep a steady pace. Don\'t empty your tank on the first straight.',
    },
  },
  {
    id: 'farmer-carry',
    nameEs: 'Farmer Carry',
    nameEn: 'Farmer Carry',
    descriptionEs: 'Carga dos kettlebells pesadas y completa 2 rectas manteniendo la postura correcta.',
    descriptionEn: 'Carry two heavy kettlebells for 3 straights maintaining correct posture.',
    distance: '2 rectas',
    difficulty: 'hard',
    tactics: {
      es: 'Mantén los hombros relajados. La velocidad es secundaria a la seguridad.',
      en: 'Keep shoulders relaxed. Speed is secondary to safety.',
    },
  },
  {
    id: 'running2',
    nameEs: 'Running 2',
    nameEn: 'Running 2',
    descriptionEs: 'Segunda recta de carrera. Recupera el aliento tras el Farmer Carry antes de la próxima estación.',
    descriptionEn: 'Second running straight. Recover your breath after the Farmer Carry before the next station.',
    distance: '1.2 km',
    difficulty: 'medium',
    tactics: {
      es: 'Controla la respiración. Usa estos metros para recuperarte.',
      en: 'Control your breathing. Use these meters to recover.',
    },
  },
  {
    id: 'kettlebell-swings',
    nameEs: 'Kettlebell Swings',
    nameEn: 'Kettlebell Swings',
    descriptionEs: 'Realiza 30 repeticiones de kettlebell swings con potencia y técnica impecable.',
    descriptionEn: 'Perform 30 kettlebell swings with power and flawless technique.',
    reps: 30,
    difficulty: 'hard',
    tactics: {
      es: 'Activa los glúteos en cada swing. Los jueces contarán solo las reps perfectas.',
      en: 'Activate glutes on every swing. Judges will only count perfect reps.',
    },
  },
  {
    id: 'running3',
    nameEs: 'Running 3',
    nameEn: 'Running 3',
    descriptionEs: 'Tercera recta de carrera. Ya llevás más de la mitad del circuito — no aflojes.',
    descriptionEn: 'Third running straight. You\'re past halfway — don\'t ease up.',
    distance: '1.2 km',
    difficulty: 'medium',
    tactics: {
      es: 'No te quedes sin energía ahora. La última estación es la más dura.',
      en: 'Don\'t burn out now. The last station is the hardest.',
    },
  },
  {
    id: 'burpees',
    nameEs: 'Burpees Avanzando',
    nameEn: 'Burpees Forward',
    descriptionEs: 'Completa 2 rectas realizando burpees avanzando. El desafío más explosivo del circuito.',
    descriptionEn: 'Complete 3 straights performing forward burpees. The most explosive challenge of the circuit.',
    distance: '2 rectas',
    difficulty: 'hard',
    tactics: {
      es: 'Ritmo constante es mejor que arranques rápidos. Cada burpee cuenta.',
      en: 'Consistent pace beats fast starts. Every burpee counts.',
    },
  },
  {
    id: 'running-final',
    nameEs: 'Running Final',
    nameEn: 'Final Running',
    descriptionEs: 'La recta final. Todo lo que entrenaste llega a este momento. Cruzá la línea.',
    descriptionEn: 'The final straight. Everything you trained for comes down to this. Cross the line.',
    distance: '1.2 km',
    difficulty: 'hard',
    tactics: {
      es: 'Todo está en la mente. Termina fuerte.',
      en: 'It\'s all mental. Finish strong.',
    },
  },
]

export const stageFlow = [
  'running1',
  'farmer-carry',
  'running2',
  'kettlebell-swings',
  'running3',
  'burpees',
  'running-final',
]
