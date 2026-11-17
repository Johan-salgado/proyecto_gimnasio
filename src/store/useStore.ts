import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, Perfil, Sesion, FeedbackData } from '../types'
import { generarMetodologia } from '../data/metodologia'
import { historialSemilla } from '../data/historial'

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      perfil: null,
      metodologia: null,
      sesiones: [],
      semanaActual: 1,
      esPremium: false,
      feedback: null,
      datosEjemplo: false,

      setPerfil: (perfil: Perfil) => set({ perfil }),

      generarMetodologia: (perfil: Perfil) => {
        const metodologia = generarMetodologia(perfil.diasSemana)
        set({ metodologia, semanaActual: 1 })
      },

      agregarSesion: (sesion: Sesion) =>
        set((state) => ({ sesiones: [...state.sesiones, sesion] })),

      setSemana: (semana: number) => set({ semanaActual: semana }),

      activarPremium: () => set({ esPremium: true }),

      guardarFeedback: (feedback: FeedbackData) => set({ feedback }),

      cargarDatosEjemplo: () => {
        const perfilEjemplo: Perfil = {
          nombre: 'Juan',
          correo: 'juan@evotrain.com',
          edad: 25,
          peso: 70,
          estatura: 175,
          nivel: 'principiante',
          objetivo: 'musculo',
          diasSemana: 5,
        }
        const metodologia = generarMetodologia(5)
        set({
          perfil: perfilEjemplo,
          metodologia,
          sesiones: historialSemilla,
          semanaActual: 3,
          datosEjemplo: true,
          esPremium: false,
          feedback: null,
        })
      },

      reiniciarDemo: () =>
        set({
          perfil: null,
          metodologia: null,
          sesiones: [],
          semanaActual: 1,
          esPremium: false,
          feedback: null,
          datosEjemplo: false,
        }),
    }),
    {
      name: 'evotrain-store',
    }
  )
)
