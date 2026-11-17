import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { FeedbackData } from '../types'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Chip from '../components/Chip'

export default function Feedback() {
  const navigate = useNavigate()
  const { feedback, guardarFeedback } = useStore()

  const [claridadGuia, setClaridadGuia] = useState<number>(feedback?.claridadGuia ?? 5)
  const [dejoImprovisar, setDejoImprovisar] = useState<'si' | 'medias' | 'no'>(
    feedback?.dejoImprovisar ?? 'si'
  )
  const [graficasMotivaron, setGraficasMotivaron] = useState<'si' | 'poco' | 'no'>(
    feedback?.graficasMotivaron ?? 'si'
  )
  const [comentarios, setComentarios] = useState<string>(feedback?.comentarios ?? '')
  const [enviado, setEnviado] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const datos: FeedbackData = {
      claridadGuia,
      dejoImprovisar,
      graficasMotivaron,
      comentarios: comentarios.trim(),
    }
    guardarFeedback(datos)
    setEnviado(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar variant="app" />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 20px' }}>
        <div style={{ width: '100%', maxWidth: 640 }}>
          <Card>
            {!enviado ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div>
                  <span className="overline" style={{ display: 'block', marginBottom: 8 }}>
                    Tu opinión cuenta
                  </span>
                  <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--text)', marginBottom: 8 }}>
                    Feedback del piloto
                  </h1>
                  <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--muted)', lineHeight: 1.6 }}>
                    EvoTrain nació para erradicar la improvisación en el entrenamiento. Cuéntanos cómo fue tu experiencia.
                  </p>
                </div>

                {/* Pregunta 1: Claridad de la guía */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
                    Claridad de la guía <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 13 }}>(1 = confusa, 5 = muy clara)</span>
                  </label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4, 5].map(num => (
                      <Chip
                        key={num}
                        selected={claridadGuia === num}
                        onClick={() => setClaridadGuia(num)}
                      >
                        {num}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* Pregunta 2: ¿Dejaste de improvisar tu entrenamiento? */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
                    ¿Dejaste de improvisar tu entrenamiento?
                  </label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[
                      { val: 'si', label: 'Sí' },
                      { val: 'medias', label: 'A medias' },
                      { val: 'no', label: 'No' },
                    ].map(opt => (
                      <Chip
                        key={opt.val}
                        selected={dejoImprovisar === opt.val}
                        onClick={() => setDejoImprovisar(opt.val as 'si' | 'medias' | 'no')}
                      >
                        {opt.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* Pregunta 3: ¿Ver tus gráficas te motivó a seguir? */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
                    ¿Ver tus gráficas te motivó a seguir?
                  </label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[
                      { val: 'si', label: 'Sí' },
                      { val: 'poco', label: 'Un poco' },
                      { val: 'no', label: 'No' },
                    ].map(opt => (
                      <Chip
                        key={opt.val}
                        selected={graficasMotivaron === opt.val}
                        onClick={() => setGraficasMotivaron(opt.val as 'si' | 'poco' | 'no')}
                      >
                        {opt.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* Pregunta 4: Comentarios */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>
                    Comentarios u observaciones
                  </label>
                  <textarea
                    rows={4}
                    value={comentarios}
                    onChange={e => setComentarios(e.target.value)}
                    placeholder="¿Qué ejercicios te gustaron más? ¿Qué podemos mejorar en la metodología?"
                    className="input-field"
                    style={{ resize: 'vertical', minHeight: 90 }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Enviar feedback
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 8px' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--surface-2)', border: '2px solid var(--volt)', color: 'var(--volt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px', fontWeight: 800 }}>
                  ✓
                </div>
                <span className="overline" style={{ display: 'block', marginBottom: 8 }}>
                  Respuestas guardadas
                </span>
                <h2 style={{ fontSize: 36, color: 'var(--text)', marginBottom: 16 }}>
                  ¡Gracias por tu feedback!
                </h2>
                <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 460, margin: '0 auto 32px' }}>
                  Tus respuestas se han guardado en localStorage. Nos ayudan a comprobar que la progresión estructurada genera resultados reales y elimina la deserción en el gimnasio.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={() => navigate('/app')}>
                    Volver al inicio
                  </button>
                  <button className="btn-secondary" onClick={() => setEnviado(false)}>
                    Editar feedback
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
