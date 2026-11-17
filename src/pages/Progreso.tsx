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
  const { sesiones, datosEjemplo } = useStore()
  const [ejercicioSel] = useState<EjercicioKey>('remo-t')

  // Decide data source
  let datos: DatoGrafica[] = []

  if (datosEjemplo || sesiones.length === 0) {
    datos = datosGraficaRemoT
  } else {
    // Build from real sessions
    const semanas: Record<number, { volumen: number; peso: number; reps: number; count: number }> = {}
    sesiones.forEach(s => {
      s.ejercicios
        .filter(e => e.ejercicioId === ejercicioSel)
        .forEach(e => {
          if (!semanas[s.semana]) semanas[s.semana] = { volumen: 0, peso: 0, reps: 0, count: 0 }
          e.series.forEach(sr => {
            semanas[s.semana].volumen += sr.peso * sr.reps
            semanas[s.semana].peso = Math.max(semanas[s.semana].peso, sr.peso)
            semanas[s.semana].reps = Math.max(semanas[s.semana].reps, sr.reps)
            semanas[s.semana].count++
          })
        })
    })
    datos = Object.entries(semanas)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([semana, d]) => ({
        semana: `S${semana}`,
        volumen: d.volumen,
        peso: d.peso,
        reps: d.reps,
      }))
  }

  if (datos.length === 0) datos = datosGraficaRemoT

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

  const renderBar = (data: DatoGrafica[], field: keyof DatoGrafica) => (
    data.map((entry, index) => (
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
        <span className="overline">Tu progreso</span>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 8px' }}>Remo en T</h1>
        <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', marginBottom: 40 }}>
          Semanas 1 a {datos.length}
        </p>

        {/* Métricas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }} className="grid-metrics">
          {[
            { label: 'Peso inicial', value: `${primerDato?.peso ?? '—'} kg` },
            { label: 'Peso final', value: `${ultimoDato?.peso ?? '—'} kg` },
            { label: 'Volumen inicial', value: primerDato ? `${primerDato.volumen} kg` : '—' },
            { label: 'Volumen final', value: ultimoDato ? `${ultimoDato.volumen} kg` : '—' },
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
                {renderBar(datos, 'volumen')}
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
                  {renderBar(datos, 'peso')}
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
                  {renderBar(datos, 'reps')}
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
