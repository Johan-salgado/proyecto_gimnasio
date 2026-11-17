import type { Sesion } from '../types'

// Historial semilla: Remo en T, semanas 1-8
export const pesos = [20, 22, 23, 25, 24, 28, 30, 35]
export const repsData = [6, 7, 7, 8, 7, 9, 9, 10]
export const cargasBanca = [50, 52, 55, 60, 58, 62, 65, 70]

function generarFecha(semana: number, diaOffset = 1): string {
  const base = new Date('2024-09-02') // Lunes base
  base.setDate(base.getDate() + (semana - 1) * 7 + diaOffset)
  return base.toISOString().split('T')[0]
}

// Generar sesiones completas para semanas 1 a 8
export const historialSemilla: Sesion[] = pesos.flatMap((peso, i) => {
  const semana = i + 1
  const rir = Math.max(0, 3 - Math.floor(i / 2))
  const bancaPeso = cargasBanca[i]

  // Lunes: Pecho y tríceps
  const sesionLunes: Sesion = {
    id: `semilla-s${semana}-d1`,
    semana,
    dia: 1,
    fecha: generarFecha(semana, 0), // Lunes
    ejercicios: [
      {
        ejercicioId: 'press-banca',
        series: [
          { peso: bancaPeso, reps: 8, rir },
          { peso: bancaPeso, reps: 8, rir },
          { peso: bancaPeso, reps: 7, rir },
        ],
      },
      {
        ejercicioId: 'press-inclinado',
        series: [
          { peso: Math.round(bancaPeso * 0.7), reps: 8, rir },
          { peso: Math.round(bancaPeso * 0.7), reps: 8, rir },
        ],
      },
      {
        ejercicioId: 'extension-triceps',
        series: [
          { peso: 20 + i * 2, reps: 10, rir },
          { peso: 20 + i * 2, reps: 10, rir },
        ],
      },
      {
        ejercicioId: 'press-militar',
        series: [
          { peso: 25 + i * 2, reps: 8, rir },
          { peso: 25 + i * 2, reps: 8, rir },
        ],
      },
    ],
  }

  // Martes: Espalda y bíceps (con Remo en T para progreso)
  // volumen = peso × repeticiones (120 en semana 1: 20x6, y 350 en semana 8: 35x10)
  const sesionMartes: Sesion = {
    id: `semilla-s${semana}-d2`,
    semana,
    dia: 2,
    fecha: generarFecha(semana, 1), // Martes
    ejercicios: [
      {
        ejercicioId: 'remo-t',
        series: [
          { peso, reps: repsData[i], rir },
        ],
      },
      {
        ejercicioId: 'jalon-pecho',
        series: [
          { peso: peso + 15, reps: repsData[i], rir },
          { peso: peso + 15, reps: repsData[i], rir },
        ],
      },
      {
        ejercicioId: 'curl-polea',
        series: [
          { peso: peso - 5, reps: repsData[i] + 2, rir },
          { peso: peso - 5, reps: repsData[i] + 2, rir },
        ],
      },
      {
        ejercicioId: 'curl-prono',
        series: [
          { peso: peso - 8, reps: repsData[i] + 2, rir },
          { peso: peso - 8, reps: repsData[i] + 2, rir },
        ],
      },
    ],
  }

  // Miércoles: Pierna
  const sesionMiercoles: Sesion = {
    id: `semilla-s${semana}-d3`,
    semana,
    dia: 3,
    fecha: generarFecha(semana, 2), // Miércoles
    ejercicios: [
      {
        ejercicioId: 'aductor',
        series: [
          { peso: 35 + i * 3, reps: 12, rir },
          { peso: 35 + i * 3, reps: 12, rir },
        ],
      },
      {
        ejercicioId: 'pendular',
        series: [
          { peso: 40 + i * 4, reps: 10, rir },
          { peso: 40 + i * 4, reps: 10, rir },
        ],
      },
      {
        ejercicioId: 'bulgara',
        series: [
          { peso: 14 + i * 2, reps: 8, rir },
          { peso: 14 + i * 2, reps: 8, rir },
        ],
      },
      {
        ejercicioId: 'femoral-sentado',
        series: [
          { peso: 30 + i * 2, reps: 10, rir },
          { peso: 30 + i * 2, reps: 10, rir },
        ],
      },
    ],
  }

  return [sesionLunes, sesionMartes, sesionMiercoles]
})

// Datos para gráficas: volumen de Remo en T por semana (120 en S1, 350 en S8)
export interface DatoGrafica {
  semana: string
  volumen: number
  peso: number
  reps: number
}

export const datosGraficaRemoT: DatoGrafica[] = pesos.map((peso, i) => ({
  semana: `S${i + 1}`,
  volumen: peso * repsData[i], // Exactamente peso x reps: 120 en semana 1, 350 en semana 8
  peso,
  reps: repsData[i],
}))
