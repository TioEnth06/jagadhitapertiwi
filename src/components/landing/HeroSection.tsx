import { Link } from 'react-router-dom'
import SectionEyebrow from '../ui/SectionEyebrow'
import DisplayHeading from '../ui/DisplayHeading'
import TombolUtama from '../ui/TombolUtama'
import TombolSecondary from '../ui/TombolSecondary'
import HeroIllustration from '../visual/HeroIllustration'
import AppPhoneMockup from '../visual/AppPhoneMockup'
import KemenkopBadge from '../visual/KemenkopBadge'
import FeatureIllustration from '../visual/FeatureIllustration'

export default function HeroSection() {
  const scrollToFitur = () => {
    document.getElementById('fitur')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-merah-gelap to-merah-utama px-4 py-16 text-white sm:px-6">
      <div className="hero-grid-bg absolute inset-0" aria-hidden="true" />
      <HeroIllustration />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <SectionEyebrow light className="mb-4">
              Koperasi Digital
            </SectionEyebrow>
            <DisplayHeading as="h1" light className="sm:text-[3.5rem]">
              Masa depan
              <br />
              <span className="text-white">Koperasi </span>
              <span className="text-merah-muda">Petani.</span>
            </DisplayHeading>
            <p className="mx-auto mt-6 max-w-xl text-base text-on-merah-muted sm:text-lg lg:mx-0">
              Kelola simpanan, pinjaman, dan jual beli hasil tani — semua dalam satu
              aplikasi yang mudah digunakan.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:justify-start sm:justify-center">
              <Link to="/login" className="w-full sm:w-auto">
                <TombolUtama
                  variant="pill"
                  className="!bg-white !text-merah-utama hover:!bg-merah-muda w-full sm:w-auto"
                >
                  Masuk ke Akun
                </TombolUtama>
              </Link>
              <TombolSecondary
                pill
                variant="outline-merah"
                className="!border-white !text-white hover:!bg-white/10 w-full sm:w-auto"
                onClick={scrollToFitur}
              >
                Pelajari Lebih Lanjut
              </TombolSecondary>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
              <KemenkopBadge size="sm" />
              <span className="text-sm font-medium">Terdaftar Kementerian Koperasi RI</span>
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <AppPhoneMockup />
          </div>
        </div>

        <div className="mt-10 flex justify-center scale-90 sm:scale-100 lg:hidden">
          <AppPhoneMockup />
        </div>
      </div>
    </section>
  )
}

export function FiturSection() {
  const fitur = [
    {
      type: 'simpanan' as const,
      judul: 'Simpanan & Pinjaman',
      deskripsi: 'Setor, tarik, dan ajukan pinjaman dengan mudah',
    },
    {
      type: 'pasar' as const,
      judul: 'Pasar Produk Tani',
      deskripsi: 'Beli-jual langsung antar anggota koperasi',
    },
    {
      type: 'suara' as const,
      judul: 'Suara Anggota',
      deskripsi: 'Ikut musyawarah dan tentukan kebijakan koperasi',
    },
    {
      type: 'kartu' as const,
      judul: 'Kartu Anggota Digital',
      deskripsi: 'Keanggotaan resmi dalam genggaman',
    },
  ]

  return (
    <section id="fitur" className="bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Fitur</SectionEyebrow>
          <DisplayHeading className="mt-3">
            Masa depan koperasi ada di sini
          </DisplayHeading>
          <p className="mt-4 text-base text-abu-teks">
            Alat digital yang dirancang sederhana untuk anggota dan pengurus koperasi.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fitur.map(({ type, judul, deskripsi }) => (
            <div
              key={judul}
              className="premium-card overflow-hidden transition-shadow hover:shadow-md"
            >
              <FeatureIllustration type={type} size="sm" />
              <div className="p-6">
                <h3 className="text-lg font-bold text-teks-utama">{judul}</h3>
                <p className="mt-2 text-base text-abu-teks leading-relaxed">{deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
