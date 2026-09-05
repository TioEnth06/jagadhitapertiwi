"use client";
import Link from 'next/link'
import { COOP_SHORT } from '@/lib/constants/brand'
import { WHATSAPP_URL_DAFTAR } from '@/lib/constants/landing'

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

const platformLinks = [
  { label: 'Simpanan', href: '/login' },
  { label: 'Pinjaman', href: '/login' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Musyawarah', href: '/login' },
  { label: 'Laporan SHU', href: '/login' },
]

const korporatLinks = [
  { label: 'Dashboard B2B', href: '/b2b' },
  { label: 'Purchase Order', href: '/b2b/po/buat' },
  { label: 'Form LOI', href: '/loi' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Hubungi Partnership', href: WHATSAPP_URL_DAFTAR, external: true },
]

const bantuanLinks = [
  { label: 'Cara Daftar', href: '#cara-kerja' },
  { label: 'FAQ', href: '/login' },
  { label: 'WhatsApp Kami', href: WHATSAPP_URL_DAFTAR, external: true },
  { label: 'Syarat & Ketentuan', href: '/login' },
  { label: 'Kebijakan Privasi', href: '/login' },
]

export default function LandingFooter() {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderLink = (
    label: string,
    href: string,
    external?: boolean,
  ) => {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-white/50 no-underline transition-colors hover:text-white"
        >
          {label}
        </a>
      )
    }
    if (href.startsWith('#')) {
      return (
        <button
          type="button"
          onClick={() => scrollTo(href)}
          className="border-none bg-transparent p-0 text-left text-[13px] text-white/50 transition-colors hover:text-white"
        >
          {label}
        </button>
      )
    }
    return (
      <Link href={href} className="text-[13px] text-white/50 no-underline transition-colors hover:text-white">
        {label}
      </Link>
    )
  }

  return (
    <footer className="bg-[var(--landing-hitam)] px-[clamp(1.25rem,6%,4rem)] pb-8 pt-14">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr] lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[var(--landing-merah)]">
              <ShieldLogo />
            </div>
            <div className="leading-tight">
              <strong className="block text-sm font-bold text-white">{COOP_SHORT}</strong>
              <span className="text-[11px] text-white/45">Koperasi Digital Petani</span>
            </div>
          </div>
          <p className="mt-3.5 max-w-[280px] text-sm leading-relaxed text-white/50">
            Platform digital yang menghubungkan petani, anggota koperasi, dan mitra korporat dalam
            satu ekosistem ekonomi yang tumbuh bersama.
          </p>
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-[7px] border border-white/10 bg-white/[0.07] px-3 py-2 text-xs text-white/50">
            Terdaftar Kementerian Koperasi RI
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-[13px] font-bold tracking-wide text-white">Platform</h5>
          <ul className="flex list-none flex-col gap-2.5">
            {platformLinks.map(({ label, href }) => (
              <li key={label}>{renderLink(label, href)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-[13px] font-bold tracking-wide text-white">Untuk Perusahaan</h5>
          <ul className="flex list-none flex-col gap-2.5">
            {korporatLinks.map(({ label, href, external }) => (
              <li key={label}>{renderLink(label, href, external)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-[13px] font-bold tracking-wide text-white">Bantuan</h5>
          <ul className="flex list-none flex-col gap-2.5">
            {bantuanLinks.map(({ label, href, external }) => (
              <li key={label}>{renderLink(label, href, external)}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-7">
        <p className="text-xs text-white/35">© 2025 Koperasi Jaga Dhita Pertiwi. Hak cipta dilindungi.</p>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-xs text-white/25 hover:text-white/50">
            Admin
          </Link>
          <p className="text-xs text-white/35">Dibuat dengan bangga di Indonesia</p>
        </div>
      </div>
    </footer>
  )
}
