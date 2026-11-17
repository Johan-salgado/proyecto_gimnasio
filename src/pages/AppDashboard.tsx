import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

export default function AppDashboard() {
  const navigate = useNavigate()
  const { perfil, metodologia, sesiones, semanaActual, datosEjemplo } = useStore()

  const nombre = perfil?.nombre || (datosEjemplo ? 'Juan' : 'Usuario')
  const semanaInfo = metodologia?.semanas.find(s => s.numero === Math.min(semanaActual, 4))
  const diaHoy = metodologia?.calendario[0] // default primer día

  // Calculate racha (streak)
  const sesionesOrdenadas = [...sesiones].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  const racha = sesionesOrdenadas.length

  // Sesiones esta semana
  const sesionesEstaSemana = sesiones.filter(s => s.semana === semanaActual).length
  const totalDiasSemana = metodologia?.calendario.length || 3

  // Volumen última vs penúltima semana
  const calcVolumenSemana = (semana: number) =>
    sesiones.filter(s => s.semana === semana).reduce((acc, s) =>
      acc + s.ejercicios.reduce((a, e) => a + e.series.reduce((b, sr) => b + sr.peso * sr.reps, 0), 0), 0)

  const volActual = calcVolumenSemana(semanaActual)
  const volAnterior = calcVolumenSemana(semanaActual - 1)
  const varPct = volAnterior > 0 ? Math.round(((volActual - volAnterior) / volAnterior) * 100) : null

  // Ultima carga press banca
  const ultimaSesionPressBanca = sesiones
    .flatMap(s => s.ejercicios.filter(e => e.ejercicioId === 'press-banca').map(e => ({ semana: s.semana, e })))
    .sort((a, b) => b.semana - a.semana)[0]
  const ultimaCargaBanca = ultimaSesionPressBanca?.e.series[0]?.peso

  const bloqueado = semanaActual >= 7

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar variant="app" />
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="overline">
              Semana {semanaActual} de 4 · {metodologia?.bloque || 'Énfasis pecho y tríceps'}
            </span>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 60px)', color: 'var(--text)', marginTop: 8 }}>
              Hola, {nombre}
            </h1>
          </div>
          {racha > 0 && (
            <div className="chip chip-selected" style={{ height: 'fit-content', marginTop: 24 }}>
              🔥 Racha: {racha} sesiones
            </div>
          )}
        </div>

        {/* Bloqueo premium */}
        {bloqueado && (
          <Card featured style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <span className="overline">Premium</span>
              <h3 style={{ fontSize: 24, color: 'var(--text)', marginTop: 8, marginBottom: 8 }}>Semana 7 bloqueada</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--muted)' }}>Ya completaste 6 semanas. Pasa a Premium para seguir progresando.</p>
            </div>
            <button className="btn-primary" onClick={() => navigate('/app/premium')}>Ver planes</button>
          </Card>
        )}

        {/* Tarjeta destacada: Entrenamiento de hoy */}
        {diaHoy && (
          <Card featured style={{ marginBottom: 24 }}>
            <span className="overline">{diaHoy.diaSemana}</span>
            <h2 style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--text)', margin: '12px 0 8px' }}>
              {diaHoy.foco}
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', marginBottom: 24 }}>
              {diaHoy.ejercicios.length} ejercicios · {diaHoy.ejercicios.reduce((a, e) => a + e.series, 0)} series · RIR {semanaInfo?.rir ?? 3}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => navigate('/app/sesion')}>
                Empezar entrenamiento
              </button>
              <button className="btn-secondary" onClick={() => navigate('/app/hoy')}>
                Ver rutina completa
              </button>
            </div>
          </Card>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 24 }} className="grid-cols-3">
          <Card>
            <span className="overline">Constancia</span>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 48, color: 'var(--volt)', margin: '8px 0 4px' }}>
              {sesionesEstaSemana}/{totalDiasSemana}
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)' }}>sesiones esta semana</p>
          </Card>
          <Card>
            <span className="overline">Volumen semanal</span>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 48, color: varPct !== null && varPct >= 0 ? 'var(--volt)' : '#FF6B6B', margin: '8px 0 4px' }}>
              {varPct !== null ? `${varPct > 0 ? '+' : ''}${varPct}%` : '—'}
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)' }}>vs semana anterior</p>
          </Card>
          <Card>
            <span className="overline">Carga en press banca</span>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 48, color: 'var(--volt)', margin: '8px 0 4px' }}>
              {ultimaCargaBanca ? `${ultimaCargaBanca} kg` : '—'}
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)' }}>última sesión</p>
          </Card>
        </div>

        {/* Progreso bloque + consejo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="grid-cols-2">
          <Card>
            <span className="overline" style={{ marginBottom: 16, display: 'block' }}>Progreso del bloque</span>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {[1, 2, 3, 4].map(s => (
                <div key={s} style={{
                  flex: 1, height: 8, borderRadius: 4,
                  background: s <= Math.min(semanaActual, 4) ? 'var(--volt)' : 'var(--bar)',
                }} />
              ))}
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)' }}>
              Semana {Math.min(semanaActual, 4)} de 4 · {semanaInfo ? (semanaInfo.rir === 'AMRAP' ? 'AMRAP' : `RIR ${semanaInfo.rir}`) : ''}
            </p>
            {semanaInfo && <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>{semanaInfo.descripcion}</p>}
          </Card>
          <Card>
            <span className="overline" style={{ marginBottom: 12, display: 'block' }}>Consejo del día</span>
            <h4 style={{ fontSize: 20, color: 'var(--text)', marginBottom: 12 }}>Registra cada serie</h4>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
              Anotar tu carga después de cada serie permite ajustar tu rutina según tus resultados. Eso es progresar con método, no improvisar.
            </p>
          </Card>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-cols-3 { grid-template-columns: 1fr !important; }
          .grid-cols-2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) {
          .grid-cols-3 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
