import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '../Logo'
import TombolUtama from '../ui/TombolUtama'

const navLinks = [
  { label: 'Solusi', href: '#solusi' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Testimoni', href: '#testimoni' },
]

export default function LandingNav() {
  const [open, setOpen] = useState(false)

  const handleNav = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-abu-sedang/50 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo size="sm" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigasi landing">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              type="button"
              onClick={() => handleNav(href)}
              className="text-sm font-semibold text-teks-caption transition-colors hover:text-merah-utama"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:block">
            <TombolUtama variant="pill" className="!min-h-[44px] !px-5 !py-2 !text-sm">
              Masuk
            </TombolUtama>
          </Link>
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-teks-utama md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-abu-sedang bg-white px-4 py-4 md:hidden"
          aria-label="Menu mobile"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                type="button"
                onClick={() => handleNav(href)}
                className="min-h-[52px] rounded-lg px-4 text-left text-base font-semibold text-teks-utama hover:bg-merah-muda"
              >
                {label}
              </button>
            ))}
            <Link to="/login" className="mt-2" onClick={() => setOpen(false)}>
              <TombolUtama fullWidth variant="pill">
                Masuk ke Akun
              </TombolUtama>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
