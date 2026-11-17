import type { Ejercicio, DiaCalendario, Metodologia } from '../types'

export const catalogoEjercicios: Ejercicio[] = [
  // Lunes: Pecho y tríceps
  {
    id: 'press-banca',
    nombre: 'Press banca',
    grupoMuscular: 'Pecho',
    series: 3,
    rirObjetivo: 3,
    repsObjetivo: 8,
    porQue: 'Ejercicio compuesto principal de pecho. Activa pectoral mayor, deltoides anterior y tríceps.',
  },
  {
    id: 'press-inclinado',
    nombre: 'Press inclinado',
    grupoMuscular: 'Pecho',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 8,
    porQue: 'Énfasis en la parte superior del pectoral. Complementa el press banca plano.',
  },
  {
    id: 'extension-triceps',
    nombre: 'Extensión de tríceps',
    grupoMuscular: 'Tríceps',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 10,
    porQue: 'Aísla el tríceps para completar el volumen del día de empuje.',
  },
  {
    id: 'press-militar',
    nombre: 'Press militar',
    grupoMuscular: 'Hombro',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 8,
    porQue: 'Desarrolla el deltoides anterior y medial, mejorando la fuerza de empuje vertical.',
  },
  // Martes: Espalda y bíceps
  {
    id: 'jalon-pecho',
    nombre: 'Jalón al pecho',
    grupoMuscular: 'Espalda',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 8,
    porQue: 'Trabaja el dorsal ancho en tracción vertical. Fundamental para la anchura de espalda.',
  },
  {
    id: 'remo-t',
    nombre: 'Remo en T',
    grupoMuscular: 'Espalda',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 8,
    porQue: 'Tracción horizontal que trabaja el dorsal y los romboides. Equilibra el desarrollo de espalda.',
  },
  {
    id: 'curl-polea',
    nombre: 'Curl en polea',
    grupoMuscular: 'Bíceps',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 10,
    porQue: 'Permite tensión constante en el bíceps durante todo el recorrido.',
  },
  {
    id: 'curl-prono',
    nombre: 'Curl agarre prono',
    grupoMuscular: 'Bíceps',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 12,
    porQue: 'Trabaja el braquiorradial y la cabeza larga del bíceps para un desarrollo completo del brazo.',
  },
  // Miércoles: Pierna
  {
    id: 'aductor',
    nombre: 'Aductor',
    grupoMuscular: 'Pierna',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 12,
    porQue: 'Fortalece el aductor mayor para estabilidad y equilibrio en movimientos de pierna.',
  },
  {
    id: 'pendular',
    nombre: 'Pendular',
    grupoMuscular: 'Pierna',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 10,
    porQue: 'Trabaja cuádriceps y glúteos en cadena cerrada con baja carga articular.',
  },
  {
    id: 'bulgara',
    nombre: 'Búlgaras',
    grupoMuscular: 'Pierna',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 8,
    porQue: 'Sentadilla dividida que maximaliza la activación del glúteo y cuádriceps unilateralmente.',
  },
  {
    id: 'femoral-sentado',
    nombre: 'Femoral sentado',
    grupoMuscular: 'Pierna',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 10,
    porQue: 'Aísla el bíceps femoral en posición de mayor estiramiento para mayor hipertrofia.',
  },
  // Viernes: Pecho y espalda
  {
    id: 'aperturas-polea',
    nombre: 'Aperturas en polea',
    grupoMuscular: 'Pecho',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 12,
    porQue: 'Aísla el pectoral con tensión constante, complementando el press banca.',
  },
  {
    id: 'remo-horizontal',
    nombre: 'Remo horizontal',
    grupoMuscular: 'Espalda',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 10,
    porQue: 'Trabaja el dorsal medio y los romboides con un ángulo diferente al jalón.',
  },
  // Sábado: Pierna 2
  {
    id: 'pantorrilla',
    nombre: 'Pantorrilla',
    grupoMuscular: 'Pierna',
    series: 2,
    rirObjetivo: 3,
    repsObjetivo: 15,
    porQue: 'El gastrocnemio y el sóleo necesitan volumen directo para crecer por su alta resistencia a la fatiga.',
  },
]

function getEjercicioById(id: string): Ejercicio {
  const ej = catalogoEjercicios.find(e => e.id === id)
  if (!ej) throw new Error(`Ejercicio no encontrado: ${id}`)
  return ej
}

export const calendarioCompleto: DiaCalendario[] = [
  {
    diaSemana: 'Lunes',
    foco: 'Pecho y tríceps',
    ejercicios: [
      getEjercicioById('press-banca'),
      getEjercicioById('press-inclinado'),
      getEjercicioById('extension-triceps'),
      getEjercicioById('press-militar'),
    ],
  },
  {
    diaSemana: 'Martes',
    foco: 'Espalda y bíceps',
    ejercicios: [
      getEjercicioById('jalon-pecho'),
      getEjercicioById('remo-t'),
      getEjercicioById('curl-polea'),
      getEjercicioById('curl-prono'),
    ],
  },
  {
    diaSemana: 'Miércoles',
    foco: 'Pierna',
    ejercicios: [
      getEjercicioById('aductor'),
      getEjercicioById('pendular'),
      getEjercicioById('bulgara'),
      getEjercicioById('femoral-sentado'),
    ],
  },
  {
    diaSemana: 'Viernes',
    foco: 'Pecho y espalda',
    ejercicios: [
      getEjercicioById('press-banca'),
      getEjercicioById('aperturas-polea'),
      getEjercicioById('remo-horizontal'),
      getEjercicioById('jalon-pecho'),
    ],
  },
  {
    diaSemana: 'Sábado',
    foco: 'Pierna',
    ejercicios: [
      getEjercicioById('aductor'),
      getEjercicioById('bulgara'),
      getEjercicioById('pendular'),
      getEjercicioById('pantorrilla'),
    ],
  },
]

const semanasBloque = [
  { numero: 1, rir: 3 as number | 'AMRAP', descripcion: 'Dejas 3 repeticiones en reserva. Aprendes el movimiento.' },
  { numero: 2, rir: 2 as number | 'AMRAP', descripcion: 'Subes la exigencia: te quedan 2 repeticiones.' },
  { numero: 3, rir: 1 as number | 'AMRAP', descripcion: 'Casi al límite, con técnica controlada.' },
  { numero: 4, rir: 'AMRAP' as number | 'AMRAP', descripcion: 'Última serie: tantas repeticiones como puedas.' },
]

export function generarMetodologia(diasSemana: 3 | 4 | 5): Metodologia {
  let calendario: DiaCalendario[]

  if (diasSemana === 5) {
    calendario = calendarioCompleto
  } else if (diasSemana === 4) {
    calendario = [
      calendarioCompleto[0], // Lunes
      calendarioCompleto[1], // Martes
      calendarioCompleto[2], // Miércoles
      calendarioCompleto[3], // Viernes
    ]
  } else {
    // 3 días
    calendario = [
      { diaSemana: 'Lunes', foco: 'Pecho y tríceps', ejercicios: calendarioCompleto[0].ejercicios },
      { diaSemana: 'Miércoles', foco: 'Espalda y bíceps', ejercicios: calendarioCompleto[1].ejercicios },
      { diaSemana: 'Viernes', foco: 'Pierna', ejercicios: calendarioCompleto[2].ejercicios },
    ]
  }

  return {
    semanaActual: 1,
    totalSemanas: 4,
    bloque: 'Énfasis pecho y tríceps',
    semanas: semanasBloque,
    calendario,
  }
}
