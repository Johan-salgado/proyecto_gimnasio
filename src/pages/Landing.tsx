import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Landing() {
  const navigate = useNavigate()

  const scrollToProblema = () => {
    document.getElementById('problema')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar variant="landing" />

      {/* HERO */}
      <section style={{ background: 'var(--bg)', flex: 1 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 64, minHeight: '80vh' }}>
          {/* Left */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <span className="overline">El saber de entrenar</span>
            <h1 style={{ fontSize: 'clamp(52px, 8vw, 88px)', color: 'var(--text)', margin: 0 }}>
              El saber de<br />entrenar
            </h1>
            <p style={{ fontFamily: 'Inter', fontSize: 18, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480 }}>
              Metodologías estructuradas y progresivas para principiantes: sabes qué hacer cada día y ves tu progreso real.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => navigate('/registro')}>
                Empieza gratis
              </button>
              <button className="btn-secondary" onClick={scrollToProblema}>
                Ver cómo funciona
              </button>
            </div>
          </div>

          {/* Right: disco decoration */}
          <div className="hero-deco" style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 460, height: 460, position: 'relative' }}>
            <div style={{
              width: 460, height: 460, borderRadius: '50%',
              border: '2px solid var(--volt)',
              position: 'absolute',
            }} />
            <div style={{
              width: 320, height: 320, borderRadius: '50%',
              border: '6px solid var(--line)',
              position: 'absolute',
            }} />
            <div style={{
              width: 180, height: 180, borderRadius: '50%',
              background: 'var(--surface-2)',
              border: '6px solid var(--volt)',
              position: 'absolute',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 28, color: 'var(--volt)', textTransform: 'uppercase' }}>EVO</span>
            </div>
          </div>
        </div>
      </section>

      {/* FRANJA */}
      <div style={{ background: 'var(--volt)', padding: '20px 0', overflow: 'hidden' }}>
        <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 26, color: 'var(--bg)', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          MÉTODO &nbsp;/&nbsp; PROGRESIÓN &nbsp;/&nbsp; CIENCIA &nbsp;/&nbsp; DATOS &nbsp;/&nbsp; RESULTADOS
        </p>
      </div>

      {/* CIFRAS */}
      <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="grid-responsive">
            {[
              { num: '4', label: 'Usuarios en la prueba inicial' },
              { num: '100%', label: 'Retención en el piloto' },
              { num: '8', label: 'Semanas de progreso medido' },
            ].map((item) => (
              <div key={item.label} className="card" style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 72, color: 'var(--volt)', lineHeight: 1 }}>
                  {item.num}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', marginTop: 12 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section id="problema" style={{ background: 'var(--surface)', padding: '80px 0' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--text)', maxWidth: 720, marginBottom: 48, textAlign: 'center', margin: '0 auto 48px' }}>
            Las personas no abandonan por falta de motivación, abandonan porque no ven resultados
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="grid-responsive">
            {[
              { title: 'Rutinas genéricas', desc: 'Listas de ejercicios sin estructura ni progresión' },
              { title: 'Entrenamiento improvisado', desc: 'Sin guía, cada día se decide al azar' },
              { title: 'Sin seguimiento', desc: 'Sin datos no hay resultados visibles' },
            ].map((item) => (
              <div key={item.title} className="card">
                <h3 style={{ fontSize: 24, color: 'var(--text)', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <span className="overline" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>Precios</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', textAlign: 'center', marginBottom: 16 }}>
            Elige tu plan
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--muted)', textAlign: 'center', marginBottom: 48, maxWidth: 560, margin: '0 auto 48px' }}>
            Un entrenador personal puede costar hasta $80.000 por sesión. EvoTrain cuesta menos que eso… por todo un mes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="grid-responsive">
            {[
              { nombre: 'Mensual', precio: '$19.900', desc: 'Acceso completo, cancela cuando quieras', destacado: false },
              { nombre: 'Trimestral', precio: '$49.900', desc: 'Ahorras 16% frente al mensual', destacado: false },
              { nombre: 'Anual', precio: '$159.900', desc: 'Ahorras 33%. El mejor valor', destacado: true },
            ].map((plan) => (
              <div key={plan.nombre} className={plan.destacado ? 'card-featured' : 'card'} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {plan.destacado && <span className="overline">Mejor valor</span>}
                <h3 style={{ fontSize: 28, color: 'var(--text)' }}>{plan.nombre}</h3>
                <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 56, color: 'var(--volt)', lineHeight: 1 }}>
                  {plan.precio}
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'var(--muted)', lineHeight: 1.5, flex: 1 }}>{plan.desc}</p>
                <Link to="/registro" className="btn-primary" style={{ display: 'flex', justifyContent: 'center' }}>
                  Empezar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .hero-deco { display: none !important; }
          .grid-responsive { grid-template-columns: 1fr !important; }
          section > .container > h2 { text-align: left !important; }
        }
        @media (max-width: 1024px) {
          .grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
