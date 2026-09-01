import type { ReactNode } from 'react'

interface PremiumCardProps {
  children: ReactNode
  className?: string
  large?: boolean
  accent?: boolean
}

export default function PremiumCard({
  children,
  className = '',
  large = false,
  accent = false,
}: PremiumCardProps) {
  const base = large ? 'premium-card-lg' : 'premium-card'
  const accentClass = accent ? 'border-merah-utama/30 ring-1 ring-merah-muda' : ''

  return <div className={`${base} ${accentClass} ${className}`}>{children}</div>
}
