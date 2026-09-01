import type { ReactNode } from 'react'
import NavBawah from '../NavBawah'
import type { TabNav } from '../../types'

interface AppLayoutProps {
  children: ReactNode
  activeTab?: TabNav
}

export default function AppLayout({ children, activeTab }: AppLayoutProps) {
  return (
    <div className="app-shell min-h-screen bg-abu-terang">
      {children}
      <NavBawah activeTab={activeTab} />
    </div>
  )
}
