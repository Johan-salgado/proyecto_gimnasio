export interface Perfil {
  nombre: string
  correo: string
  edad: number
  peso: number
  estatura: number
  cintura?: number
  pecho?: number
  nivel: 'principiante'
  objetivo: 'musculo' | 'fuerza' | 'salud'
  diasSemana: 3 | 4 | 5
}

export interface Serie {
  peso: number
  reps: number
  rir: number
}

export interface SesionEjercicio {
  ejercicioId: string
  series: Serie[]
}

export interface Sesion {
  id: string
  semana: number
  dia: number
  fecha: string
  ejercicios: SesionEjercicio[]
}

export interface Ejercicio {
  id: string
  nombre: string
  grupoMuscular: string
  series: number
  rirObjetivo: number
  repsObjetivo: number
  porQue: string
}

export interface DiaCalendario {
  diaSemana: string
  foco: string
  ejercicios: Ejercicio[]
}

export interface Metodologia {
  semanaActual: number
  totalSemanas: number
  bloque: string
  semanas: {
    numero: number
    rir: number | 'AMRAP'
    descripcion: string
  }[]
  calendario: DiaCalendario[]
}

export interface FeedbackData {
  claridadGuia: number
  dejoImprovisar: 'si' | 'medias' | 'no'
  graficasMotivaron: 'si' | 'poco' | 'no'
  comentarios: string
}

export interface AppState {
  perfil: Perfil | null
  metodologia: Metodologia | null
  sesiones: Sesion[]
  semanaActual: number
  esPremium: boolean
  feedback: FeedbackData | null
  datosEjemplo: boolean

  // Actions
  setPerfil: (perfil: Perfil) => void
  generarMetodologia: (perfil: Perfil) => void
  agregarSesion: (sesion: Sesion) => void
  setSemana: (semana: number) => void
  activarPremium: () => void
  guardarFeedback: (feedback: FeedbackData) => void
  cargarDatosEjemplo: () => void
  reiniciarDemo: () => void
}
