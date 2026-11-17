import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

export default function Hoy() {
  const navigate = useNavigate()
  const { metodologia, semanaActual } = useStore()

  const diaHoy = metodologia?.calendario[0]
  const semanaInfo = metodologia?.semanas.find(s => s.numero === Math.min(semanaActual, 4))

  if (!metodologia || !diaHoy) {
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
      <div className="container">
        <span className="overline">Semana {semanaActual} · Día 1</span>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 8px' }}>
          Hoy: {diaHoy.foco}
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', marginBottom: 40 }}>
          {diaHoy.ejercicios.length} ejercicios · RIR {semanaInfo?.rir ?? 3}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {diaHoy.ejercicios.map((ej) => (
            <Card key={ej.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 'clamp(18px, 3vw, 26px)', color: 'var(--text)', marginBottom: 8 }}>
                    {ej.nombre}
                  </h3>
                  <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--volt)', fontWeight: 600, marginBottom: 8 }}>
                    {ej.series} series · RIR {semanaInfo?.rir ?? 3}
                  </p>
                  <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--muted)', fontWeight: 600 }}>Por qué: </strong>{ej.porQue}
                  </p>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => navigate('/app/sesion')}
                  style={{ flexShrink: 0 }}
                >
                  Registrar
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
