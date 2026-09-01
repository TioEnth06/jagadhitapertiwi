import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { COOP_NAME, MEMBER_PREFIX } from '../constants/brand'
import { statistikKoperasi } from '../data/mockData'
import Logo from '../components/Logo'
import TombolUtama from '../components/ui/TombolUtama'
import StatDisplay from '../components/ui/StatDisplay'
import PremiumCard from '../components/ui/PremiumCard'
import HeroIllustration from '../components/visual/HeroIllustration'
import AppPhoneMockup from '../components/visual/AppPhoneMockup'
import KemenkopBadge from '../components/visual/KemenkopBadge'
import { useAuthStore } from '../stores/useAuthStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [noAnggota, setNoAnggota] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!noAnggota.trim()) {
      setError('Nomor anggota wajib diisi.')
      return
    }
    if (!pin.trim()) {
      setError('PIN wajib diisi.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      login(noAnggota.trim())
      setLoading(false)
      navigate('/beranda')
    }, 300)
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Brand panel */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-merah-gelap to-merah-utama px-6 py-10 text-white md:w-[45%] md:px-12 md:py-16">
        <div className="hero-grid-bg absolute inset-0" aria-hidden="true" />
        <HeroIllustration />
        <div className="relative">
          <Logo size="lg" light />
          <h1 className="mt-8 font-heading text-2xl font-bold leading-tight md:text-3xl">
            Selamat datang di {COOP_NAME}
          </h1>
          <p className="mt-3 text-base text-on-merah-muted">
            Masuk ke akun anggota Anda untuk mengelola simpanan, pinjaman, dan transaksi.
          </p>
        </div>
        <div className="relative mt-8 hidden lg:block">
          <AppPhoneMockup />
        </div>
        <div className="relative mt-8 grid grid-cols-2 gap-6 md:grid lg:hidden">
          <StatDisplay
            value={statistikKoperasi.anggotaAktif.toLocaleString('id-ID')}
            label="Anggota Aktif"
            light
            compact
          />
          <StatDisplay value="95%" label="Kepuasan Anggota" light compact />
        </div>
        <div className="relative mt-6 inline-flex items-center gap-2 md:mt-0">
          <KemenkopBadge size="sm" />
          <p className="text-xs text-on-merah-muted">Terdaftar Kementerian Koperasi RI</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col bg-abu-terang md:bg-white md:justify-center">
        <div className="mx-auto w-full max-w-md flex-1 px-6 py-8 md:flex-none md:py-12">
          <PremiumCard large className="-mt-10 p-6 shadow-lg md:mt-0 md:shadow-none md:border-0 md:bg-transparent">
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-[22px] font-heading font-bold text-teks-utama">Masuk ke Akun</h2>
              <p className="mt-1 text-base text-abu-teks">Gunakan nomor anggota dan PIN Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="noAnggota" className="mb-2 block text-sm text-label">
                  Nomor Anggota
                </label>
                <input
                  id="noAnggota"
                  type="text"
                  value={noAnggota}
                  onChange={(e) => setNoAnggota(e.target.value)}
                  placeholder={`Contoh: ${MEMBER_PREFIX}-0001`}
                  className="input-premium"
                  autoComplete="username"
                />
              </div>

              <div>
                <label htmlFor="pin" className="mb-2 block text-sm text-label">
                  PIN / Kata Sandi
                </label>
                <div className="relative">
                  <input
                    id="pin"
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Masukkan PIN Anda"
                    className="input-premium pr-12"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-abu-teks"
                    aria-label={showPin ? 'Sembunyikan PIN' : 'Tampilkan PIN'}
                  >
                    {showPin ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm font-medium text-merah-utama" role="alert">
                  {error}
                </p>
              )}

              <TombolUtama type="submit" fullWidth variant="pill" disabled={loading}>
                {loading ? 'Memproses...' : 'Masuk'}
              </TombolUtama>
            </form>

            <p className="mt-4 text-center text-sm text-abu-teks">
              Lupa PIN? Hubungi pengurus koperasi
            </p>
          </PremiumCard>

          <footer className="mt-6 text-center text-xs text-abu-teks md:hidden">
            <p className="font-medium">{COOP_NAME} © 2025</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
