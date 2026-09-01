import type { ReactNode } from 'react'
import LandingNav from '../landing/LandingNav'

interface LandingLayoutProps {
  children: ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />
      <main>{children}</main>
    </div>
  )
}
