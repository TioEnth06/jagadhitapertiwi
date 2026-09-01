import { QrCode } from 'lucide-react'
import { COOP_ABBR, COOP_NAME } from '../../constants/brand'
import type { Anggota } from '../../types'

interface KartuAnggotaDigitalProps {
  anggota: Anggota
}

export default function KartuAnggotaDigital({ anggota }: KartuAnggotaDigitalProps) {
  const nameParts = COOP_NAME.replace('Koperasi ', '').split(' ')

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-merah-gelap to-merah-utama p-5 text-white">
      <div className="hero-grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[10px] font-bold text-merah-utama">
            {COOP_ABBR}
          </div>
          <div>
            <p className="text-xs font-semibold text-on-merah-muted">Koperasi</p>
            <p className="text-xs font-semibold text-on-merah-muted">
              {nameParts.join(' ')}
            </p>
          </div>
        </div>
        <span className="text-lg" aria-label="Bendera Indonesia">
          🇮🇩
        </span>
      </div>

      <div className="relative mt-6">
        <p className="text-xl font-bold tracking-wide">{anggota.namaLengkap}</p>
        <p className="font-mono-angka mt-1 text-lg">{anggota.noAnggota}</p>
        <p className="mt-2 text-sm text-on-merah-muted">{anggota.bergabung}</p>
      </div>

      <div className="relative mt-4 flex items-end justify-between">
        <span className="rounded-full border border-white/60 px-3 py-1 text-xs font-semibold">
          {anggota.status} ✓
        </span>
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
          aria-label="QR Code verifikasi"
        >
          <QrCode size={32} className="opacity-80" />
        </div>
      </div>
    </div>
  )
}
