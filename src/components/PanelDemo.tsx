import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export default function PanelDemo() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { perfil, datosEjemplo, cargarDatosEjemplo, setSemana, reiniciarDemo } = useStore()

  const asegurarDatos = () => {
    if (!perfil && !datosEjemplo) {
      cargarDatosEjemplo()
    }
  }

  const acciones = [
    {
      label: 'Cargar datos de ejemplo',
      action: () => {
        cargarDatosEjemplo()
        navigate('/app')
        setOpen(false)
      },
    },
    {
      label: 'Ir a semana 7 (mostrar Premium)',
      action: () => {
        asegurarDatos()
        setSemana(7)
        navigate('/app/premium')
        setOpen(false)
      },
    },
    {
      label: 'Volver a semana 3',
      action: () => {
        asegurarDatos()
        setSemana(3)
        navigate('/app')
        setOpen(false)
      },
    },
    {
      label: 'Reiniciar demo',
      action: () => {
        reiniciarDemo()
        navigate('/')
        setOpen(false)
      },
    },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
      }}
    >
      {open && (
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 10,
            padding: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            minWidth: 250,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--volt)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Panel de demo (Pitch)
            </span>
          </div>
          {acciones.map(a => (
            <button
              key={a.label}
              onClick={a.action}
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                borderRadius: 6,
                color: 'var(--text)',
                fontFamily: 'Inter',
                fontSize: 14,
                padding: '10px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--volt)'
                e.currentTarget.style.backgroundColor = '#252B30'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--line)'
                e.currentTarget.style.backgroundColor = 'var(--surface-2)'
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'var(--volt)',
          color: 'var(--bg)',
          border: 'none',
          borderRadius: '50%',
          width: 52,
          height: 52,
          fontSize: 22,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(212,255,58,0.3)',
          fontWeight: 700,
          transition: 'transform 0.15s ease',
        }}
        title="Panel de demo"
      >
        {open ? '×' : '▶'}
      </button>
    </div>
  )
}
