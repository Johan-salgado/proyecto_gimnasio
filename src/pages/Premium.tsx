import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import { useStore } from '../store/useStore'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

interface Plan {
  id: 'mensual' | 'trimestral' | 'anual'
  nombre: string
  precio: string
  periodo: string
  ahorro?: string
  destacado?: boolean
  beneficios: string[]
}

const planes: Plan[] = [
  {
    id: 'mensual',
    nombre: 'Mensual',
    precio: '$19.900',
    periodo: 'por mes',
    beneficios: [
      'Acceso a semana 7 en adelante',
      'Metodología adaptativa continua',
      'Historial avanzado y proyecciones',
      'Cancela cuando quieras',
    ],
  },
  {
    id: 'trimestral',
    nombre: 'Trimestral',
    precio: '$49.900',
    periodo: 'cada 3 meses ($16.633/mes)',
    ahorro: 'Ahorras 16%',
    beneficios: [
      'Todo lo del plan mensual',
      'Progresión completa de 3 bloques',
      'Reporte trimestral de evolución',
      'Ahorras 16% frente al mensual',
    ],
  },
  {
    id: 'anual',
    nombre: 'Anual',
    precio: '$159.900',
    periodo: 'al año ($13.325/mes)',
    ahorro: 'Ahorras 33%',
    destacado: true,
    beneficios: [
      'Acceso ilimitado por 12 meses',
      'Todas las metodologías y bloques futuros',
      'Análisis predictivo de cargas y fatiga',
      'Máximo ahorro: 33%',
    ],
  },
]

// Datos simulados para la gráfica bloqueada del historial avanzado
const datosAvanzados = [
  { semana: 'S7', volumen: 380 },
  { semana: 'S8', volumen: 420 },
  { semana: 'S9', volumen: 450 },
  { semana: 'S10', volumen: 470 },
  { semana: 'S11', volumen: 510 },
  { semana: 'S12', volumen: 540 },
]

export default function Premium() {
  const navigate = useNavigate()
  const { esPremium, activarPremium } = useStore()
  const [planSeleccionado, setPlanSeleccionado] = useState<Plan | null>(null)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [pagoCompletado, setPagoCompletado] = useState(false)

  const handleElegirPlan = (plan: Plan) => {
    setPlanSeleccionado(plan)
    setPagoCompletado(false)
    setModalAbierto(true)
  }

  const handleConfirmarPago = () => {
    activarPremium()
    setPagoCompletado(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <Navbar variant="app" />
      <div className="container">
        {/* Encabezado */}
        <div style={{ marginBottom: 40, maxWidth: 760 }}>
          <span className="overline">Módulo de conversión freemium</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '12px 0 16px' }}>
            {esPremium ? 'Semana 7 desbloqueada' : 'Semana 7 bloqueada'}
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 18, color: 'var(--muted)', lineHeight: 1.7 }}>
            {esPremium
              ? '¡Tu suscripción Premium está activa! Tienes acceso ilimitado a todas las semanas de entrenamiento y a tu historial avanzado.'
              : 'Has completado las primeras 6 semanas gratuitas. Para continuar con tu sobrecarga progresiva y acceder al historial avanzado, elige uno de nuestros planes.'}
          </p>
        </div>

        {/* Banner de estado premium si ya está activo */}
        {esPremium && (
          <div
            className="card-featured"
            style={{
              marginBottom: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <span className="overline">Estado de tu cuenta</span>
              <h3 style={{ fontSize: 24, color: 'var(--text)', marginTop: 6, marginBottom: 4 }}>
                ✓ Membresía Premium Activa
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--muted)' }}>
                Semana 7 y métricas avanzadas completamente desbloqueadas.
              </p>
            </div>
            <button className="btn-primary" onClick={() => navigate('/app')}>
              Ir a entrenar
            </button>
          </div>
        )}

        {/* Tarjeta Historial Avanzado Bloqueado / Desbloqueado */}
        <Card style={{ marginBottom: 56, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="overline" style={{ display: 'block', marginBottom: 4 }}>Proyección futura</span>
              <h3 style={{ fontSize: 26, color: 'var(--text)' }}>Historial avanzado (Semanas 7 – 12)</h3>
            </div>
            <span
              className="chip"
              style={{
                background: esPremium ? 'var(--volt)' : 'var(--surface-2)',
                color: esPremium ? 'var(--bg)' : 'var(--volt)',
                border: '1px solid var(--volt)',
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {esPremium ? '✓ Desbloqueado' : '🔒 Premium'}
            </span>
          </div>

          {/* Gráfica atenuada */}
          <div style={{ position: 'relative', width: '100%', height: 240 }}>
            <div style={{ opacity: esPremium ? 0.9 : 0.25, filter: esPremium ? 'none' : 'blur(2px)', transition: 'all 0.3s' }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={datosAvanzados} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
                  <XAxis dataKey="semana" tick={{ fill: 'var(--muted)', fontFamily: 'Inter', fontSize: 13 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--muted)', fontFamily: 'Inter', fontSize: 13 }} axisLine={false} tickLine={false} />
                  <Bar dataKey="volumen" fill="var(--volt)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Overlay si no es premium */}
            {!esPremium && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(14, 17, 19, 0.65)',
                  backdropFilter: 'blur(3px)',
                  borderRadius: 8,
                  padding: 20,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 28, color: 'var(--volt)', marginBottom: 8, textTransform: 'uppercase' }}>
                  Contenido exclusivo para suscriptores
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--text)', maxWidth: 460 }}>
                  El historial avanzado te permite proyectar tus cargas, medir fatiga acumulada y mantener el progreso después de la semana 6.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Sección de Planes */}
        <div style={{ marginBottom: 32 }}>
          <span className="overline" style={{ display: 'block', textAlign: 'center', marginBottom: 12 }}>
            Suscripción EvoTrain
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', textAlign: 'center', marginBottom: 12 }}>
            Elige tu plan
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
            Un entrenador personal cuesta hasta $80.000 por una sola sesión. EvoTrain te da estructura y ciencia todo el mes por una fracción de eso.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="grid-planes">
            {planes.map(plan => (
              <div
                key={plan.id}
                className={plan.destacado ? 'card-featured' : 'card'}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 24,
                  position: 'relative',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h3 style={{ fontSize: 28, color: 'var(--text)' }}>{plan.nombre}</h3>
                    {plan.ahorro && (
                      <span
                        className="chip"
                        style={{
                          background: plan.destacado ? 'var(--volt)' : 'var(--surface-2)',
                          color: plan.destacado ? 'var(--bg)' : 'var(--volt)',
                          border: `1px solid ${plan.destacado ? 'var(--volt)' : 'var(--line)'}`,
                          fontSize: 12,
                          padding: '4px 10px',
                          fontWeight: 700,
                        }}
                      >
                        {plan.ahorro}
                      </span>
                    )}
                  </div>

                  <div style={{ margin: '16px 0 8px' }}>
                    <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 56, color: 'var(--volt)', lineHeight: 1 }}>
                      {plan.precio}
                    </span>
                    <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)', marginLeft: 8 }}>
                      {plan.periodo}
                    </span>
                  </div>

                  <hr style={{ borderColor: 'var(--line)', borderWidth: '0 0 1px 0', margin: '20px 0' }} />

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {plan.beneficios.map((b, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)' }}>
                        <span style={{ color: 'var(--volt)', fontWeight: 700, fontSize: 15 }}>✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={plan.destacado ? 'btn-primary' : 'btn-secondary'}
                  onClick={() => handleElegirPlan(plan)}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {esPremium ? 'Cambiar a este plan' : `Elegir plan ${plan.nombre}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Pago Simulado */}
      {modalAbierto && planSeleccionado && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setModalAbierto(false)}
        >
          <div
            className="card"
            style={{
              maxWidth: 480,
              width: '100%',
              background: 'var(--surface)',
              border: '1.5px solid var(--volt)',
              borderRadius: 10,
              padding: 32,
              position: 'relative',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {!pagoCompletado ? (
              <>
                <span className="overline" style={{ display: 'block', marginBottom: 8 }}>
                  Demostración del Pitch
                </span>
                <h2 style={{ fontSize: 32, color: 'var(--text)', marginBottom: 8 }}>
                  Pago simulado
                </h2>
                <div
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--line)',
                    borderRadius: 6,
                    padding: '12px 16px',
                    marginBottom: 20,
                  }}
                >
                  <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--volt)', fontWeight: 600 }}>
                    ℹ Esto es una demostración; no se realiza ningún cobro
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>
                      Plan {planSeleccionado.nombre}
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)' }}>
                      Acceso completo desde semana 7
                    </div>
                  </div>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 36, color: 'var(--volt)' }}>
                    {planSeleccionado.precio}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                  <div>
                    <label style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                      Tarjeta simulada
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      disabled
                      value="•••• •••• •••• 4242 (Simulación demo)"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                        Vencimiento
                      </label>
                      <input type="text" className="input-field" disabled value="12/28" />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                        CVC
                      </label>
                      <input type="text" className="input-field" disabled value="789" />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    className="btn-primary"
                    onClick={handleConfirmarPago}
                    style={{ flex: 1 }}
                  >
                    Confirmar pago simulado
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => setModalAbierto(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
                <span className="overline" style={{ display: 'block', marginBottom: 8 }}>
                  Suscripción confirmada
                </span>
                <h2 style={{ fontSize: 32, color: 'var(--volt)', marginBottom: 12 }}>
                  ¡Semana 7 desbloqueada!
                </h2>
                <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 28 }}>
                  Has activado tu suscripción Premium simulada. Ahora tienes acceso a todo el historial avanzado y a las rutinas de la semana 7 en adelante.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setModalAbierto(false)
                      navigate('/app')
                    }}
                  >
                    Ir al panel principal
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => setModalAbierto(false)}
                  >
                    Quedarme aquí
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .grid-planes {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
