import { Link } from 'react-router-dom'
import SectionEyebrow from '../ui/SectionEyebrow'
import DisplayHeading from '../ui/DisplayHeading'
import TombolUtama from '../ui/TombolUtama'
import AppPhoneMockup from '../visual/AppPhoneMockup'
import UnsplashImage from '../ui/UnsplashImage'
import { TrustLogoStrip } from '../visual/KemenkopBadge'
import { UNSPLASH } from '../../constants/images'

export default function SolusiSection() {
  return (
    <section id="solusi" className="bg-abu-terang px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionEyebrow>Solusi</SectionEyebrow>
          <DisplayHeading className="mt-3">
            Revolusi alur keuangan koperasi Anda
          </DisplayHeading>
          <p className="mt-4 text-base text-abu-teks leading-relaxed">
            Platform kami menyederhanakan simpan pinjam, transaksi antar anggota,
            dan musyawarah digital — mengurangi kesalahan manual dan meningkatkan
            transparansi untuk seluruh anggota.
          </p>

          <div className="relative mt-6 h-48 overflow-hidden rounded-2xl lg:hidden">
            <UnsplashImage
              src={UNSPLASH.solusi}
              alt="Petani menggunakan teknologi di ladang"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login">
              <TombolUtama variant="pill">Mulai Sekarang</TombolUtama>
            </Link>
            <button
              type="button"
              onClick={() => document.getElementById('fitur')?.scrollIntoView({ behavior: 'smooth' })}
              className="min-h-[52px] rounded-full px-6 text-base font-semibold text-merah-utama hover:bg-merah-muda"
            >
              Lihat Fitur
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-4 -top-4 hidden h-48 w-48 overflow-hidden rounded-2xl shadow-lg lg:block">
            <UnsplashImage
              src={UNSPLASH.solusi}
              alt="Petani di ladang"
              className="h-full w-full object-cover"
            />
          </div>
          <AppPhoneMockup />
        </div>
      </div>
    </section>
  )
}

export function TrustSection() {
  return (
    <section className="border-y border-abu-sedang bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <SectionEyebrow>Kepercayaan</SectionEyebrow>
        <p className="mt-2 text-base font-semibold text-teks-utama">
          Dipercaya anggota koperasi pertanian di seluruh Nusantara
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-abu-sedang bg-abu-terang px-5 py-2.5 text-sm font-semibold text-abu-teks">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-merah-utama text-[10px] font-bold text-white">
              RI
            </span>
            Kementerian Koperasi RI
          </span>
          <span className="rounded-full border border-abu-sedang bg-abu-terang px-5 py-2.5 text-sm font-semibold text-abu-teks">
            1.247+ Anggota Aktif
          </span>
          <span className="rounded-full border border-abu-sedang bg-abu-terang px-5 py-2.5 text-sm font-semibold text-abu-teks">
            89+ Produk di Pasar
          </span>
        </div>
        <TrustLogoStrip />
      </div>
    </section>
  )
}
