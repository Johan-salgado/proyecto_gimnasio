import React from 'react'

interface InputProps {
  label?: string
  error?: string
  type?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  min?: number | string
  max?: number | string
  required?: boolean
  id?: string
}

export default function Input({
  label,
  error,
  type = 'text',
  value,
  onChange,
  placeholder,
  min,
  max,
  required = false,
  id,
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
        >
          {label}{required && <span style={{ color: 'var(--volt)', marginLeft: 4 }}>*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        className="input-field"
      />
      {error && (
        <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#FF6B6B' }}>{error}</span>
      )}
    </div>
  )
}
