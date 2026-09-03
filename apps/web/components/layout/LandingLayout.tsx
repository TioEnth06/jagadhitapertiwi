"use client";

import type { ReactNode } from 'react'
import LandingNav from '@/components/landing/LandingNav'
import WhatsAppStickyButton from '@/components/landing/WhatsAppStickyButton'
import "@/styles/landing.css";

interface LandingLayoutProps {
  children: ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="landing-root min-h-screen overflow-x-hidden bg-white">
      <LandingNav />
      <main>{children}</main>
      <WhatsAppStickyButton />
    </div>
  )
}
