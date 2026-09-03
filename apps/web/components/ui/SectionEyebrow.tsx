import type { ReactNode } from 'react'

interface SectionEyebrowProps {
  children: ReactNode
  className?: string
  light?: boolean
}

export default function SectionEyebrow({
  children,
  className = '',
  light = false,
}: SectionEyebrowProps) {
  return (
    <p
      className={`section-eyebrow ${light ? '!text-on-merah-muted' : ''} ${className}`}
    >
      {children}
    </p>
  )
}
