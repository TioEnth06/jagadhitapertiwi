import type { ReactNode } from 'react'

interface SectionEyebrowLandingProps {
  children: ReactNode
}

export default function SectionEyebrowLanding({ children }: SectionEyebrowLandingProps) {
  return <div className="landing-eyebrow">{children}</div>
}
