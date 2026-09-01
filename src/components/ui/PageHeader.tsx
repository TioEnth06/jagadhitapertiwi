import SectionEyebrow from './SectionEyebrow'

interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header className="px-4 pt-4 pb-2">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h1 className="mobile-page-title mt-1 font-bold text-teks-utama">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-teks-caption">{subtitle}</p>}
    </header>
  )
}
