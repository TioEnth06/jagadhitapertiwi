"use client";
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type EntryVariant = 'individu' | 'korporat'

interface EntryCardProps {
  variant: EntryVariant
  tag: string
  title: string
  description: string
  features: string[]
  cta: string
  href: string
  external?: boolean
}

export default function EntryCard({
  variant,
  tag,
  title,
  description,
  features,
  cta,
  href,
  external = false,
}: EntryCardProps) {
  const isKorporat = variant === 'korporat'
  const tagClass = isKorporat
    ? 'bg-[var(--landing-b2b-bg)] text-[var(--landing-b2b)]'
    : 'bg-[var(--landing-merah-muda)] text-[var(--landing-merah)]'
  const dotClass = isKorporat ? 'bg-[var(--landing-b2b)]' : 'bg-[var(--landing-merah)]'
  const ctaClass = isKorporat ? 'text-[var(--landing-b2b)]' : 'text-[var(--landing-merah)]'

  const className =
    'block rounded-2xl border-[1.5px] border-[var(--landing-abu-border)] bg-white p-7 transition-all hover:border-[var(--landing-merah)] hover:shadow-[0_4px_24px_rgba(204,0,0,0.08)]'

  const content = (
    <>
      <span
        className={`mb-3.5 inline-block rounded px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${tagClass}`}
      >
        {tag}
      </span>
      <h3 className="font-landing-display mb-2.5 text-xl font-bold leading-snug text-[var(--landing-hitam)]">
        {title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-[var(--landing-abu-teks)]">{description}</p>
      <div className="mb-5 flex flex-col gap-1.5">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-[13px] text-[var(--landing-teks)]">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
            {f}
          </div>
        ))}
      </div>
      <div className={`flex items-center gap-1.5 text-[13px] font-bold ${ctaClass}`}>
        {cta}
        <ArrowRight size={14} aria-hidden="true" />
      </div>
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
}
