import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  duration?: number
  onClose?: () => void
}

export default function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      top: 24,
      right: 24,
      zIndex: 2000,
      background: 'var(--volt)',
      color: 'var(--bg)',
      padding: '14px 20px',
      borderRadius: 8,
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: 15,
      boxShadow: '0 4px 16px rgba(212,255,58,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      animation: 'slideInToast 0.25s ease',
    }}>
      {message}
      <style>{`
        @keyframes slideInToast {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
