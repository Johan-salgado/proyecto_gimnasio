import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface NavbarProps {
  variant?: 'landing' | 'app'
}

export default function Navbar({ variant = 'landing' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

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

  return (
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
        {links.map(link => (
          <Link
            key={link.label}
            to={link.href}
            style={{ color: 'var(--muted)', fontFamily: 'Inter', fontSize: 15, fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {link.label}
          </Link>
        ))}
        {variant === 'landing' ? (
          <button className="btn-primary" onClick={() => navigate('/registro')}>
            Empieza gratis
          </button>
        ) : (
          <button className="btn-secondary" onClick={() => navigate('/app/feedback')}>
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
            <button className="btn-secondary" onClick={() => { setMenuOpen(false); navigate('/app/feedback') }}>
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
  )
}
