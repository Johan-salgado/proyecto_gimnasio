import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { useStore } from '../store/useStore'
import { datosGraficaRemoT } from '../data/historial'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

type EjercicioKey = 'remo-t'

interface DatoGrafica {
  semana: string
  volumen: number
  peso: number
  reps: number
}

export default function Progreso() {
  const { sesiones } = useStore()
  const [ejercicioSel] = useState<EjercicioKey>('remo-t')

  // Calcular del historial guardado en sesiones
  let datos: DatoGrafica[] = []

  const sesionesConEjercicio = sesiones.filter(s =>
    s.ejercicios.some(e => e.ejercicioId === ejercicioSel)
  )

  if (sesionesConEjercicio.length > 0) {
    const semanasMap: Record<number, { volumen: number; peso: number; reps: number }> = {}
    sesionesConEjercicio.forEach(s => {
      s.ejercicios
        .filter(e => e.ejercicioId === ejercicioSel)
        .forEach(e => {
          if (!semanasMap[s.semana]) {
            semanasMap[s.semana] = { volumen: 0, peso: 0, reps: 0 }
          }
          e.series.forEach(sr => {
            semanasMap[s.semana].volumen += sr.peso * sr.reps
            semanasMap[s.semana].peso = Math.max(semanasMap[s.semana].peso, sr.peso)
            semanasMap[s.semana].reps = Math.max(semanasMap[s.semana].reps, sr.reps)
          })
        })
    })

    datos = Object.entries(semanasMap)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([semana, d]) => ({
        semana: `S${semana}`,
        volumen: d.volumen,
        peso: d.peso,
        reps: d.reps,
      }))
  }

  // Fallback seguro a datos de ejemplo si no hay sesiones registradas
  if (datos.length === 0) {
    datos = datosGraficaRemoT
  }

  const primerDato = datos[0]
  const ultimoDato = datos[datos.length - 1]

  const tooltipStyle = {
    contentStyle: {
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 8,
      color: 'var(--text)',
      fontFamily: 'Inter',
      fontSize: 13,
    },
    labelStyle: { color: 'var(--muted)' },
    cursor: { fill: 'rgba(255,255,255,0.03)' },
  }

  const renderBar = (data: DatoGrafica[]) => (
    data.map((_, index) => (
      <Cell
        key={`cell-${index}`}
        fill={index === data.length - 1 ? 'var(--volt)' : 'var(--bar)'}
      />
    ))
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar variant="app" />
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span className="overline">Tu progreso</span>
          <span
            className="chip"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              color: 'var(--volt)',
              fontSize: 13,
              padding: '6px 14px',
              fontWeight: 600,
            }}
          >
            Ejemplo basado en el piloto
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 8px' }}>Remo en T</h1>
        <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', marginBottom: 40 }}>
          Semanas 1 a {datos.length} · Todo calculado del historial
        </p>

        {/* Métricas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }} className="grid-metrics">
          {[
            { label: 'Peso inicial', value: `${primerDato?.peso ?? 20} kg` },
            { label: 'Peso final', value: `${ultimoDato?.peso ?? 35} kg` },
            { label: 'Volumen inicial', value: `${primerDato?.volumen ?? 120} kg` },
            { label: 'Volumen final', value: `${ultimoDato?.volumen ?? 350} kg` },
          ].map(m => (
            <Card key={m.label}>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</p>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 36, color: 'var(--text)', lineHeight: 1 }}>
                {m.value}
              </div>
            </Card>
          ))}
        </div>

        {/* Gráfica grande: volumen */}
        <Card style={{ marginBottom: 24 }}>
          <span className="overline" style={{ marginBottom: 24, display: 'block' }}>Volumen total por semana</span>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={datos} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
              <XAxis dataKey="semana" tick={{ fill: 'var(--muted)', fontFamily: 'Inter', fontSize: 13 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--muted)', fontFamily: 'Inter', fontSize: 13 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v} kg`, 'Volumen']} />
              <Bar dataKey="volumen" radius={[4, 4, 0, 0]}>
                {renderBar(datos)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Dos gráficas pequeñas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="grid-charts">
          <Card>
            <span className="overline" style={{ marginBottom: 20, display: 'block' }}>Peso levantado (kg)</span>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={datos} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
                <XAxis dataKey="semana" tick={{ fill: 'var(--muted)', fontFamily: 'Inter', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--muted)', fontFamily: 'Inter', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v} kg`, 'Peso']} />
                <Bar dataKey="peso" radius={[4, 4, 0, 0]}>
                  {renderBar(datos)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <span className="overline" style={{ marginBottom: 20, display: 'block' }}>Repeticiones</span>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={datos} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
                <XAxis dataKey="semana" tick={{ fill: 'var(--muted)', fontFamily: 'Inter', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--muted)', fontFamily: 'Inter', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => [v, 'Reps']} />
                <Bar dataKey="reps" radius={[4, 4, 0, 0]}>
                  {renderBar(datos)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-metrics { grid-template-columns: 1fr 1fr !important; }
          .grid-charts { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .grid-metrics { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
