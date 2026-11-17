import React from 'react'

interface CardProps {
  featured?: boolean
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Card({ featured = false, children, className = '', style }: CardProps) {
  return (
    <div className={`${featured ? 'card-featured' : 'card'} ${className}`} style={style}>
      {children}
    </div>
  )
}
