import type { CicilanPinjaman } from '../../types'
import { formatRupiah } from '../../utils/formatRupiah'
import PremiumCard from '../ui/PremiumCard'

interface JadwalCicilanListProps {
  jadwal: CicilanPinjaman[]
  compact?: boolean
}

export default function JadwalCicilanList({ jadwal, compact = false }: JadwalCicilanListProps) {
  const visible = compact ? jadwal.slice(0, 3) : jadwal

  return (
    <PremiumCard className="overflow-hidden p-0">
      <div className="border-b border-abu-sedang px-4 py-3">
        <p className="text-sm font-bold text-teks-utama">Simulasi Jadwal Cicilan</p>
        {!compact && (
          <p className="mt-0.5 text-xs text-teks-caption">
            Estimasi jatuh tempo dimulai bulan depan
          </p>
        )}
      </div>
      <div className="divide-y divide-abu-sedang">
        {visible.map((c) => (
          <div key={c.bulan} className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm">
            <div className="min-w-0">
              <p className="font-semibold text-teks-utama">Bulan ke-{c.bulan}</p>
              <p className="text-xs text-teks-caption">{c.jatuhTempo}</p>
            </div>
            <div className="text-right">
              <p className="font-mono-angka font-bold text-merah-utama">
                {formatRupiah(c.cicilan)}
              </p>
              {!compact && (
                <p className="text-[10px] text-teks-caption">
                  P: {formatRupiah(c.pokok)} · B: {formatRupiah(c.bunga)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {compact && jadwal.length > 3 && (
        <p className="px-4 py-2 text-center text-xs text-teks-caption">
          +{jadwal.length - 3} cicilan berikutnya
        </p>
      )}
    </PremiumCard>
  )
}
