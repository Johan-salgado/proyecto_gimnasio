export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark)',
      borderTop: '1px solid var(--line)',
      padding: '32px 80px',
      textAlign: 'center',
    }}>
      <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontStyle: 'italic', fontSize: 20, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.01em' }}>
        EvoTrain · El saber de entrenar
      </p>
    </footer>
  )
}
