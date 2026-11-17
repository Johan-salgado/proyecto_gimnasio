import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { Perfil } from '../types'
import Input from '../components/Input'
import Chip from '../components/Chip'

interface FormErrors {
  nombre?: string
  correo?: string
  edad?: string
  peso?: string
  estatura?: string
  cintura?: string
  pecho?: string
  objetivo?: string
  diasSemana?: string
}

export default function Registro() {
  const navigate = useNavigate()
  const { setPerfil, generarMetodologia } = useStore()

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    edad: '',
    peso: '',
    estatura: '',
    cintura: '',
    pecho: '',
    objetivo: '' as 'musculo' | 'fuerza' | 'salud' | '',
    diasSemana: '' as 3 | 4 | 5 | '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const setField = (field: string, value: string | number) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!form.nombre.trim()) errs.nombre = 'El nombre es requerido'
    if (!form.correo.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.correo = 'Correo inválido'
    const edad = Number(form.edad)
    if (!form.edad || edad < 14 || edad > 80) errs.edad = 'La edad debe estar entre 14 y 80 años'
    const peso = Number(form.peso)
    if (!form.peso || peso < 30 || peso > 200) errs.peso = 'El peso debe estar entre 30 y 200 kg'
    const estatura = Number(form.estatura)
    if (!form.estatura || estatura < 100 || estatura > 250) errs.estatura = 'La estatura debe estar entre 100 y 250 cm'
    if (form.cintura && (Number(form.cintura) < 40 || Number(form.cintura) > 200)) errs.cintura = 'La cintura debe estar entre 40 y 200 cm'
    if (form.pecho && (Number(form.pecho) < 40 || Number(form.pecho) > 200)) errs.pecho = 'El pecho debe estar entre 40 y 200 cm'
    if (!form.objetivo) errs.objetivo = 'Selecciona un objetivo'
    if (!form.diasSemana) errs.diasSemana = 'Selecciona los días por semana'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const perfil: Perfil = {
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      edad: Number(form.edad),
      peso: Number(form.peso),
      estatura: Number(form.estatura),
      cintura: form.cintura ? Number(form.cintura) : undefined,
      pecho: form.pecho ? Number(form.pecho) : undefined,
      nivel: 'principiante',
      objetivo: form.objetivo as 'musculo' | 'fuerza' | 'salud',
      diasSemana: form.diasSemana as 3 | 4 | 5,
    }
    setPerfil(perfil)
    generarMetodologia(perfil)
    navigate('/app')
  }

  const isFormValid = form.nombre && form.correo && form.edad && form.peso && form.estatura && form.objetivo && form.diasSemana

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left panel */}
      <div className="registro-left" style={{ width: 400, minWidth: 320, background: 'var(--dark)', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: 32, borderRight: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 32, color: 'var(--volt)', textTransform: 'uppercase', letterSpacing: '0.01em' }}>
          EVOTRAIN
        </div>
        <div>
          <h2 style={{ fontSize: 36, color: 'var(--text)', marginBottom: 16, lineHeight: 1.1 }}>
            Tu primera semana empieza con estos datos
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>
            Completar tu perfil nos permite generar una metodología adaptada a ti.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 'auto' }}>
          {[
            { num: '1', label: 'Tu perfil', active: true },
            { num: '2', label: 'Tu metodología', active: false },
            { num: '3', label: 'Tu primer entrenamiento', active: false },
          ].map(step => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: step.active ? 'var(--volt)' : 'transparent',
                border: `1.5px solid ${step.active ? 'var(--volt)' : 'var(--line)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter', fontWeight: 700, fontSize: 14,
                color: step.active ? 'var(--bg)' : 'var(--muted)',
                flexShrink: 0,
              }}>{step.num}</div>
              <span style={{ fontFamily: 'Inter', fontSize: 15, color: step.active ? 'var(--volt)' : 'var(--muted)', fontWeight: step.active ? 600 : 400 }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: form */}
      <div style={{ flex: 1, background: 'var(--bg)', padding: '48px 56px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: 28, color: 'var(--text)', marginBottom: 8 }}>Crea tu perfil</h3>
        <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)', marginBottom: 36 }}>
          Tus medidas iniciales serán el punto de partida de tus gráficas de progreso.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Input label="Nombre" value={form.nombre} onChange={e => setField('nombre', e.target.value)} placeholder="Tu nombre" required error={errors.nombre} />
            <Input label="Correo" type="email" value={form.correo} onChange={e => setField('correo', e.target.value)} placeholder="tu@correo.com" required error={errors.correo} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            <Input label="Edad" type="number" value={form.edad} onChange={e => setField('edad', e.target.value)} placeholder="25" min={14} max={80} required error={errors.edad} />
            <Input label="Peso (kg)" type="number" value={form.peso} onChange={e => setField('peso', e.target.value)} placeholder="70" min={30} max={200} required error={errors.peso} />
            <Input label="Estatura (cm)" type="number" value={form.estatura} onChange={e => setField('estatura', e.target.value)} placeholder="175" min={100} max={250} required error={errors.estatura} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Input label="Cintura (cm) — opcional" type="number" value={form.cintura} onChange={e => setField('cintura', e.target.value)} placeholder="80" min={40} max={200} error={errors.cintura} />
            <Input label="Pecho (cm) — opcional" type="number" value={form.pecho} onChange={e => setField('pecho', e.target.value)} placeholder="90" min={40} max={200} error={errors.pecho} />
          </div>

          {/* Nivel */}
          <div>
            <span className="overline" style={{ display: 'block', marginBottom: 12 }}>Nivel</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Chip selected={true}>Principiante</Chip>
              <Chip disabled>Intermedio · pronto</Chip>
              <Chip disabled>Avanzado · pronto</Chip>
            </div>
          </div>

          {/* Objetivo */}
          <div>
            <span className="overline" style={{ display: 'block', marginBottom: 12 }}>Objetivo</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { value: 'musculo', label: 'Ganar músculo' },
                { value: 'fuerza', label: 'Ganar fuerza' },
                { value: 'salud', label: 'Salud general' },
              ].map(opt => (
                <Chip
                  key={opt.value}
                  selected={form.objetivo === opt.value}
                  onClick={() => setField('objetivo', opt.value)}
                >
                  {opt.label}
                </Chip>
              ))}
            </div>
            {errors.objetivo && <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#FF6B6B', display: 'block', marginTop: 6 }}>{errors.objetivo}</span>}
          </div>

          {/* Días */}
          <div>
            <span className="overline" style={{ display: 'block', marginBottom: 12 }}>Días por semana</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {[3, 4, 5].map(d => (
                <Chip
                  key={d}
                  selected={form.diasSemana === d}
                  onClick={() => setField('diasSemana', d)}
                >
                  {d}
                </Chip>
              ))}
            </div>
            {errors.diasSemana && <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#FF6B6B', display: 'block', marginTop: 6 }}>{errors.diasSemana}</span>}
          </div>

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!isFormValid}
            style={{ alignSelf: 'flex-start', marginTop: 8 }}
          >
            Crear mi metodología →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .registro-left { width: 100% !important; min-width: unset !important; border-right: none !important; border-bottom: 1px solid var(--line) !important; padding: 24px 20px !important; }
          div[style*="minHeight: '100vh'"] { flex-direction: column !important; }
          div[style*="flex: 1"][style*="padding: '48px 56px'"] { padding: 24px 20px !important; }
        }
      `}</style>
    </div>
  )
}
