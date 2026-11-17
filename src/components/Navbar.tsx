import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'

interface NavbarProps {
  variant?: 'landing' | 'app'
}

export default function Navbar({ variant = 'landing' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { perfil, datosEjemplo, esPremium } = useStore()

  const landingLinks = [
    { label: 'Metodología', href: '/app/metodologia' },
    { label: 'Precios', href: '/#precios' },
    { label: 'Progreso', href: '/app/progreso' },
  ]

  const appLinks = [
    { label: 'Inicio', href: '/app' },
    { label: 'Hoy', href: '/app/hoy' },
    { label: 'Progreso', href: '/app/progreso' },
    { label: 'Metodología', href: '/app/metodologia' },
  ]

  const links = variant === 'landing' ? landingLinks : appLinks

  const nombreUsuario = perfil?.nombre || (datosEjemplo ? 'Juan' : 'Atleta')
  const correoUsuario = perfil?.correo || (datosEjemplo ? 'juan@evotrain.com' : 'usuario@evotrain.com')
  const objetivoMap = {
    musculo: 'Ganar músculo',
    fuerza: 'Ganar fuerza',
    salud: 'Salud general',
  }

  return (
    <>
      <nav style={{
        background: 'var(--dark)',
        padding: '20px 80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--line)',
      }}>
        <Link to="/" style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 32, color: 'var(--volt)', letterSpacing: '0.01em', textTransform: 'uppercase' }}>
          EVOTRAIN
        </Link>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {links.map(link => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.label}
                to={link.href}
                style={{
                  color: isActive ? 'var(--volt)' : 'var(--muted)',
                  fontFamily: 'Inter',
                  fontSize: 15,
                  fontWeight: 500,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = isActive ? 'var(--volt)' : 'var(--muted)')}
              >
                {link.label}
              </Link>
            )
          })}
          {variant === 'landing' ? (
            <button className="btn-primary" onClick={() => navigate('/registro')}>
              Empieza gratis
            </button>
          ) : (
            <button className="btn-secondary" onClick={() => setProfileOpen(true)}>
              Mi perfil
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ width: 24, height: 2, background: 'var(--text)', display: 'block', transition: 'all 0.2s' }} />
          <span style={{ width: 24, height: 2, background: 'var(--text)', display: 'block', transition: 'all 0.2s' }} />
          <span style={{ width: 24, height: 2, background: 'var(--text)', display: 'block', transition: 'all 0.2s' }} />
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: 'fixed',
            top: '65px',
            left: 0,
            right: 0,
            background: 'var(--dark)',
            padding: '24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            borderBottom: '1px solid var(--line)',
            zIndex: 99,
          }}>
            {links.map(link => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ color: 'var(--text)', fontFamily: 'Inter', fontSize: 16, fontWeight: 500, padding: '8px 0' }}
              >
                {link.label}
              </Link>
            ))}
            {variant === 'landing' ? (
              <button className="btn-primary" onClick={() => { setMenuOpen(false); navigate('/registro') }}>
                Empieza gratis
              </button>
            ) : (
              <button className="btn-secondary" onClick={() => { setMenuOpen(false); setProfileOpen(true) }}>
                Mi perfil
              </button>
            )}
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-hamburger { display: flex !important; }
            nav { padding: 16px 20px !important; }
          }
        `}</style>
      </nav>

      {/* Modal Mi Perfil */}
      {profileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setProfileOpen(false)}
        >
          <div
            className="card"
            style={{
              maxWidth: 460,
              width: '100%',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 10,
              padding: 32,
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <span className="overline" style={{ display: 'block', marginBottom: 4 }}>Perfil del Atleta</span>
                <h3 style={{ fontSize: 28, color: 'var(--text)' }}>{nombreUsuario}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--muted)' }}>{correoUsuario}</p>
              </div>
              <span
                className="chip"
                style={{
                  background: esPremium ? 'var(--volt)' : 'var(--surface-2)',
                  color: esPremium ? 'var(--bg)' : 'var(--volt)',
                  border: '1px solid var(--volt)',
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '4px 10px',
                }}
              >
                {esPremium ? 'Premium' : 'Gratis (Sem 1-6)'}
              </span>
            </div>

            <hr style={{ borderColor: 'var(--line)', borderWidth: '0 0 1px 0', margin: '16px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>Nivel</span>
                <span style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>Principiante</span>
              </div>
              <div>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>Objetivo</span>
                <span style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>
                  {perfil?.objetivo ? objetivoMap[perfil.objetivo] : 'Ganar músculo'}
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>Días / Semana</span>
                <span style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>
                  {perfil?.diasSemana ?? 5} días
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>Peso inicial</span>
                <span style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>
                  {perfil?.peso ?? 70} kg
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>Estatura</span>
                <span style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>
                  {perfil?.estatura ?? 175} cm
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>Edad</span>
                <span style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>
                  {perfil?.edad ?? 25} años
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
              <button
                className="btn-primary"
                onClick={() => {
                  setProfileOpen(false)
                  navigate('/app/feedback')
                }}
                style={{ width: '100%' }}
              >
                Dar feedback del piloto
              </button>
              <button
                className="btn-secondary"
                onClick={() => setProfileOpen(false)}
                style={{ width: '100%' }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
