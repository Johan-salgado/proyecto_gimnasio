import { useState } from 'react'
import { useStore } from '../store/useStore'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

export default function Metodologia() {
  const { metodologia, semanaActual } = useStore()
  const [semanaVista, setSemanaVista] = useState(Math.min(semanaActual, 4))

  if (!metodologia) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <Navbar variant="app" />
        <div className="container">
          <p style={{ color: 'var(--muted)' }}>Carga los datos de ejemplo o completa tu registro.</p>
        </div>
      </div>
    )
  }

  const semanaData = metodologia.semanas.find(s => s.numero === semanaVista)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar variant="app" />
      <div className="container">
        <span className="overline">Tu metodología</span>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 8px' }}>
          Énfasis en pecho y tríceps
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', marginBottom: 48, maxWidth: 560 }}>
          Bloque de 4 semanas. Cada semana te acercas más a tu límite, de forma controlada.
        </p>

        {/* Progresión del bloque */}
        <span className="overline" style={{ display: 'block', marginBottom: 20 }}>Progresión del bloque</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }} className="grid-semanas">
          {metodologia.semanas.map(s => {
            const esSemanaActual = s.numero === semanaActual
            const seleccionada = s.numero === semanaVista
            return (
              <div
                key={s.numero}
                onClick={() => setSemanaVista(s.numero)}
                style={{
                  background: seleccionada ? 'var(--surface-2)' : 'var(--surface)',
                  border: `${seleccionada ? '1.5px' : '1px'} solid ${seleccionada || esSemanaActual ? 'var(--volt)' : 'var(--line)'}`,
                  borderRadius: 10,
                  padding: 20,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {esSemanaActual && <span className="overline" style={{ fontSize: 11, marginBottom: 8, display: 'block' }}>Semana actual</span>}
                <h4 style={{ fontSize: 20, color: 'var(--text)', marginBottom: 4 }}>
                  Semana {s.numero} · RIR {s.rir}
                </h4>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {s.descripcion}
                </p>
              </div>
            )
          })}
        </div>

        {/* Calendario de la semana seleccionada */}
        <span className="overline" style={{ display: 'block', marginBottom: 20 }}>
          Semana {semanaVista} · tu calendario
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 48 }}>
          {metodologia.calendario.map(dia => (
            <Card key={dia.diaSemana}>
              <span className="overline" style={{ marginBottom: 10, display: 'block' }}>{dia.diaSemana}</span>
              <h3 style={{ fontSize: 22, color: 'var(--text)', marginBottom: 16 }}>{dia.foco}</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {dia.ejercicios.map(ej => (
                  <li key={ej.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)' }}>{ej.nombre}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--volt)', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: 8 }}>
                      {ej.series}s · RIR {semanaData?.rir ?? 3}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Por qué esta progresión */}
        <Card featured>
          <span className="overline" style={{ marginBottom: 12, display: 'block' }}>¿Por qué esta progresión?</span>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 720 }}>
            En lugar de improvisar, subes la exigencia poco a poco. <strong style={{ color: 'var(--text)' }}>RIR</strong> significa «repeticiones en reserva»: cuántas te sobran al terminar la serie. Así la carga aumenta con sentido y puedes ver el avance en tus gráficas.
          </p>
        </Card>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-semanas { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .grid-semanas { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
