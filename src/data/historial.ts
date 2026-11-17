import type { Sesion } from '../types'

// Historial semilla: Remo en T, semanas 1-8
const pesos = [20, 22, 23, 25, 24, 28, 30, 35]
const repsData = [6, 7, 7, 8, 7, 9, 9, 10]

function generarFecha(semana: number): string {
  const base = new Date('2024-09-02')
  base.setDate(base.getDate() + (semana - 1) * 7 + 1) // Martes
  return base.toISOString().split('T')[0]
}

export const historialSemilla: Sesion[] = pesos.map((peso, i) => ({
  id: `semilla-semana-${i + 1}`,
  semana: i + 1,
  dia: 2,
  fecha: generarFecha(i + 1),
  ejercicios: [
    {
      ejercicioId: 'remo-t',
      series: [
        { peso, reps: repsData[i], rir: Math.max(0, 3 - Math.floor(i / 2)) },
        { peso, reps: repsData[i], rir: Math.max(0, 3 - Math.floor(i / 2)) },
      ],
    },
    {
      ejercicioId: 'jalon-pecho',
      series: [
        { peso: peso + 10, reps: repsData[i], rir: 2 },
        { peso: peso + 10, reps: repsData[i], rir: 2 },
      ],
    },
    {
      ejercicioId: 'curl-polea',
      series: [
        { peso: peso - 5, reps: repsData[i] + 2, rir: 2 },
        { peso: peso - 5, reps: repsData[i] + 2, rir: 2 },
      ],
    },
  ],
}))

// Datos para gráficas: volumen de Remo en T por semana
export interface DatoGrafica {
  semana: string
  volumen: number
  peso: number
  reps: number
}

export const datosGraficaRemoT: DatoGrafica[] = pesos.map((peso, i) => ({
  semana: `S${i + 1}`,
  volumen: peso * repsData[i] * 2, // 2 series
  peso,
  reps: repsData[i],
}))
