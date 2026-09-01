import { Link } from 'react-router-dom'
import { COOP_NAME, COOP_SHORT } from '../../constants/brand'
import Logo from '../Logo'
import TombolUtama from '../ui/TombolUtama'
import DisplayHeading from '../ui/DisplayHeading'

const footerLinks = [
  { label: 'Solusi', href: '#solusi' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Testimoni', href: '#testimoni' },
]

export function CtaAkhirSection() {
  return (
    <section className="bg-merah-muda px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <DisplayHeading as="h2" className="text-2xl sm:text-3xl">
          Bergabung dengan koperasi digital hari ini
        </DisplayHeading>
        <p className="mt-4 text-base text-abu-teks">
          Mulai kelola keuangan koperasi Anda dengan platform yang mudah dan terpercaya.
        </p>
        <Link to="/login" className="mt-8 inline-block w-full sm:w-auto">
          <TombolUtama fullWidth variant="pill" className="sm:!w-auto sm:!px-10">
            Masuk ke Akun Anggota
          </TombolUtama>
        </Link>
        <p className="mt-4 text-sm text-abu-teks">
          Belum punya akun? Hubungi pengurus koperasi terdekat.
        </p>
      </div>
    </section>
  )
}

export default function LandingFooter() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-abu-sedang bg-abu-terang px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <Logo size="sm" />
          <p className="mt-4 text-sm text-abu-teks leading-relaxed">
            {COOP_NAME} — platform digital untuk koperasi pertanian Indonesia.
          </p>
        </div>
        <div>
          <p className="font-bold text-teks-utama">Menu</p>
          <ul className="mt-4 space-y-2">
            {footerLinks.map(({ label, href }) => (
              <li key={href}>
                <button
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="text-sm text-abu-teks hover:text-merah-utama"
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <Link to="/login" className="text-sm text-abu-teks hover:text-merah-utama">
                Masuk
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-teks-utama">Kontak</p>
          <ul className="mt-4 space-y-2 text-sm text-abu-teks">
            <li>{COOP_SHORT}</li>
            <li>info@jagadhita-pertiwi.co.id</li>
            <li>Terdaftar Kementerian Koperasi RI</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-abu-sedang pt-6 text-center text-sm text-abu-teks">
        {COOP_NAME} © 2025 · Foto oleh{' '}
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-merah-utama"
        >
          Unsplash
        </a>
      </p>
    </footer>
  )
}
