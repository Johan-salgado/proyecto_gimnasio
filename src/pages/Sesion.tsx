import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { Serie } from '../types'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Chip from '../components/Chip'
import Toast from '../components/Toast'

export default function Sesion() {
  const navigate = useNavigate()
  const location = useLocation()
  const { metodologia, semanaActual, sesiones, agregarSesion } = useStore()

  const diaHoy = metodologia?.calendario[0]
  const semanaInfo = metodologia?.semanas.find(s => s.numero === Math.min(semanaActual, 4))

  const stateEjercicioId = (location.state as { ejercicioId?: string } | undefined)?.ejercicioId
  const initialIdx = diaHoy?.ejercicios.findIndex(e => e.id === stateEjercicioId)
  const [ejercicioIdx, setEjercicioIdx] = useState(
    initialIdx !== undefined && initialIdx >= 0 ? initialIdx : 0
  )
  const ejercicio = diaHoy?.ejercicios[ejercicioIdx]

  const [series, setSeries] = useState<Serie[]>([
    { peso: 20, reps: 8, rir: semanaInfo?.rir === 'AMRAP' ? 0 : (semanaInfo?.rir ?? 3) },
    { peso: 20, reps: 8, rir: semanaInfo?.rir === 'AMRAP' ? 0 : (semanaInfo?.rir ?? 3) },
  ])

  const [showToast, setShowToast] = useState(false)
  const [sugerencia, setSugerencia] = useState(false)

  useEffect(() => {
    if (!ejercicio) return
    setSeries(Array.from({ length: ejercicio.series }, () => ({
      peso: 20,
      reps: ejercicio.repsObjetivo,
      rir: semanaInfo?.rir === 'AMRAP' ? 0 : (semanaInfo?.rir ?? 3),
    })))
  }, [ejercicioIdx, ejercicio, semanaInfo])

  const updateSerie = (idx: number, field: keyof Serie, value: number) => {
    setSeries(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s))
  }

  const agregarSerie = () => {
    setSeries(prev => [...prev, {
      peso: prev[prev.length - 1]?.peso ?? 20,
      reps: ejercicio?.repsObjetivo ?? 8,
      rir: semanaInfo?.rir === 'AMRAP' ? 0 : (semanaInfo?.rir ?? 3),
    }])
  }

  // Última sesión para este ejercicio
  const ultimaSesion = sesiones
    .filter(s => s.ejercicios.some(e => e.ejercicioId === ejercicio?.id))
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0]
  const ultimaEjercicioData = ultimaSesion?.ejercicios.find(e => e.ejercicioId === ejercicio?.id)
  const ultimaSerie = ultimaEjercicioData?.series[0]

  const guardarSesion = () => {
    if (!ejercicio) return

    // Verificar sugerencia
    const rirObjetivo = semanaInfo?.rir === 'AMRAP' ? 0 : (semanaInfo?.rir ?? 3)
    const cumpleObjetivo = series.every(s => s.reps >= (ejercicio.repsObjetivo) && s.rir >= rirObjetivo)
    setSugerencia(cumpleObjetivo)

    const sesion = {
      id: `sesion-${Date.now()}`,
      semana: semanaActual,
      dia: 1,
      fecha: new Date().toISOString().split('T')[0],
      ejercicios: [{
        ejercicioId: ejercicio.id,
        series,
      }],
    }

    agregarSesion(sesion)
    setShowToast(true)

    setTimeout(() => {
      navigate('/app')
    }, 2500)
  }

  if (!metodologia || !diaHoy || !ejercicio) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <Navbar variant="app" />
        <div className="container">
          <p style={{ color: 'var(--muted)' }}>Carga los datos de ejemplo o completa tu registro.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar variant="app" />
      {showToast && <Toast message="Sesión guardada ✓" onClose={() => setShowToast(false)} />}

      <div className="container">
        <span className="overline">Semana {semanaActual} · Día 1</span>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', margin: '12px 0 32px' }}>Registrar sesión</h1>

        {/* Chips ejercicios */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {diaHoy.ejercicios.map((ej, i) => (
            <Chip key={ej.id} selected={i === ejercicioIdx} onClick={() => setEjercicioIdx(i)}>
              {ej.nombre}
            </Chip>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24, alignItems: 'start' }} className="sesion-layout">
          {/* Main: tabla */}
          <Card>
            <h2 style={{ fontSize: 32, color: 'var(--text)', marginBottom: 8 }}>{ejercicio.nombre}</h2>
            <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--volt)', marginBottom: 24 }}>
              Meta de hoy: {ejercicio.series} series · RIR {semanaInfo?.rir ?? 3}
            </p>

            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Serie', 'Peso (kg)', 'Reps', 'RIR'].map(col => (
                      <th key={col} style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: 'var(--muted)', textAlign: 'left', padding: '8px 12px', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--line)' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {series.map((s, i) => (
                    <tr key={i}>
                      <td style={{ padding: '10px 12px', fontFamily: 'Inter', fontSize: 15, color: 'var(--muted)', fontWeight: 600 }}>{i + 1}</td>
                      {(['peso', 'reps', 'rir'] as const).map(field => (
                        <td key={field} style={{ padding: '8px 12px' }}>
                          <input
                            type="number"
                            value={s[field]}
                            onChange={e => updateSerie(i, field, Number(e.target.value))}
                            min={field === 'rir' ? 0 : 1}
                            className="input-field"
                            style={{ width: 80 }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="btn-secondary"
              onClick={agregarSerie}
              style={{ marginTop: 16, fontSize: 14 }}
            >
              + Agregar serie
            </button>

            {sugerencia && (
              <div style={{ marginTop: 16, padding: 14, background: 'var(--surface-2)', borderRadius: 8, border: '1px solid var(--volt)' }}>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--volt)', fontWeight: 600 }}>
                  💡 Sugerencia: sube 2.5 kg la próxima sesión
                </p>
              </div>
            )}
          </Card>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card>
              <span className="overline" style={{ marginBottom: 12, display: 'block' }}>Última sesión</span>
              {ultimaSerie ? (
                <>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 36, color: 'var(--volt)', marginBottom: 8 }}>
                    {ultimaSerie.peso} kg × {ultimaSerie.reps}
                  </div>
                  <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                    Si te sobran repeticiones, la app te sugerirá subir la carga en la próxima sesión.
                  </p>
                </>
              ) : (
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)' }}>Sin historial previo</p>
              )}
            </Card>

            <Card>
              <span className="overline" style={{ marginBottom: 12, display: 'block' }}>Por qué registrar</span>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
                Tus datos alimentan las gráficas de progreso y ajustan tu metodología.
              </p>
            </Card>

            <button className="btn-primary" onClick={guardarSesion} style={{ width: '100%' }}>
              Guardar sesión
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sesion-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
