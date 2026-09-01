import type { ReactNode } from 'react'

interface DisplayHeadingProps {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  light?: boolean
}

export default function DisplayHeading({
  children,
  className = '',
  as: Tag = 'h2',
  light = false,
}: DisplayHeadingProps) {
  return (
    <Tag
      className={`display-heading ${light ? '!text-on-merah' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
