import React from 'react'

interface ChipProps {
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export default function Chip({ selected = false, onClick, children, disabled = false, className = '' }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`chip ${selected ? 'chip-selected' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
