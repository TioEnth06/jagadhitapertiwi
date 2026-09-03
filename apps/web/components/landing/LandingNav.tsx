"use client";
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { COOP_SHORT } from '@/lib/constants/brand'
import {
  LANDING_NAV_LINKS,
  WHATSAPP_URL_DAFTAR,
} from '@/lib/constants/landing'
import WhatsAppIcon from './WhatsAppIcon'

function ShieldLogo() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M10 1.5L2.5 5.5v5c0 4 3 7.5 7.5 8.5 4.5-1 7.5-4.5 7.5-8.5v-5L10 1.5z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M7 10l2 2 4-4"
        stroke="#CC0000"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function LandingNav() {
  const [open, setOpen] = useState(false)

  const scrollTo = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-[200] flex h-[66px] items-center gap-8 border-b border-[var(--landing-abu-border)] bg-white/95 px-[clamp(1.25rem,6%,4rem)] backdrop-blur-md">
      <Link href="/" className="flex shrink-0 items-center gap-2.5 no-underline" onClick={() => setOpen(false)}>
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[var(--landing-merah)]">
          <ShieldLogo />
        </div>
        <div className="leading-tight">
          <strong className="block text-sm font-bold tracking-tight text-[var(--landing-hitam)]">
            {COOP_SHORT}
          </strong>
          <span className="text-[11px] text-[var(--landing-abu-teks)]">Koperasi Digital Petani</span>
        </div>
      </Link>

      <ul className="ml-auto hidden list-none items-center gap-7 lg:flex">
        {LANDING_NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <button
              type="button"
              onClick={() => scrollTo(href)}
              className="border-none bg-transparent text-sm font-medium text-[var(--landing-abu-teks)] transition-colors hover:text-[var(--landing-merah)]"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
        <a
          href={WHATSAPP_URL_DAFTAR}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-[#1ebe5d]"
        >
          <WhatsAppIcon size={16} />
          Daftar via WhatsApp
        </a>
        <Link
          href="/login"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-[var(--landing-teks)] no-underline transition-colors hover:bg-[var(--landing-abu-bg)]"
        >
          Masuk
        </Link>
        <Link
          href="/login"
          className="rounded-lg bg-[var(--landing-merah)] px-5 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-[var(--landing-merah-gelap)]"
        >
          Daftar Anggota
        </Link>
      </div>

      <button
        type="button"
        className="ml-auto rounded-lg p-1.5 lg:ml-0 lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <nav
          className="absolute left-0 right-0 top-[66px] border-b border-[var(--landing-abu-border)] bg-white px-5 py-4 lg:hidden"
          aria-label="Menu mobile"
        >
          <ul className="flex list-none flex-col gap-1">
            {LANDING_NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="min-h-[44px] w-full rounded-lg px-3 text-left text-sm font-semibold text-[var(--landing-teks)] hover:bg-[var(--landing-abu-bg)]"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={WHATSAPP_URL_DAFTAR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#25D366] text-sm font-semibold text-white no-underline"
            >
              <WhatsAppIcon size={16} />
              Daftar via WhatsApp
            </a>
            <Link
              href="/login"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--landing-abu-border)] text-sm font-semibold text-[var(--landing-teks)] no-underline"
              onClick={() => setOpen(false)}
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[var(--landing-merah)] text-sm font-semibold text-white no-underline"
              onClick={() => setOpen(false)}
            >
              Daftar Anggota
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
