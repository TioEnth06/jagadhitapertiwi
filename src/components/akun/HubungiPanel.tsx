import { Phone, MapPin, Clock } from 'lucide-react'
import { kontakPengurus } from '../../data/mockData'
import { UNSPLASH } from '../../constants/images'
import PremiumCard from '../ui/PremiumCard'
import UnsplashImage from '../ui/UnsplashImage'

export default function HubungiPanel() {
  return (
    <>
      <p className="text-base text-abu-teks">
        Hubungi pengurus koperasi untuk bantuan, pertanyaan, atau verifikasi dokumen.
      </p>

      <div className="relative h-40 overflow-hidden rounded-2xl">
        <UnsplashImage
          src={UNSPLASH.kantor}
          alt="Pemandangan desa pertanian di sekitar kantor koperasi"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-merah-gelap/70 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full bg-merah-utama px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
          📍 Kantor Koperasi
        </div>
      </div>

      <PremiumCard className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-merah-gelap to-merah-utama text-lg font-bold text-white shadow-md">
            PH
          </div>
          <div>
            <p className="font-bold text-teks-utama">{kontakPengurus.nama}</p>
            <p className="text-sm text-abu-teks">{kontakPengurus.jabatan}</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <a
            href={`tel:${kontakPengurus.telepon.replace(/-/g, '')}`}
            className="flex items-center gap-3 rounded-xl bg-merah-muda p-4 transition-colors hover:bg-merah-utama/10"
          >
            <Phone className="shrink-0 text-merah-utama" size={22} />
            <div>
              <p className="text-sm text-abu-teks">Telepon / WhatsApp</p>
              <p className="font-semibold text-teks-utama">{kontakPengurus.telepon}</p>
            </div>
          </a>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 shrink-0 text-merah-utama" size={22} />
            <div>
              <p className="text-sm font-semibold text-teks-utama">Jam Operasional</p>
              <p className="text-base text-abu-teks">{kontakPengurus.jamOperasional}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 shrink-0 text-merah-utama" size={22} />
            <div>
              <p className="text-sm font-semibold text-teks-utama">Alamat Kantor</p>
              <p className="text-base text-abu-teks leading-relaxed">{kontakPengurus.alamat}</p>
            </div>
          </div>
        </div>
      </PremiumCard>
    </>
  )
}
