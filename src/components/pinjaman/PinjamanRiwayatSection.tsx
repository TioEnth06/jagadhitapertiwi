import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePinjamanStore } from '../../stores/usePinjamanStore'
import { formatRupiah } from '../../utils/formatRupiah'
import JadwalCicilanList from './JadwalCicilanList'
import PremiumCard from '../ui/PremiumCard'
import StatusBadge from '../ui/StatusBadge'

export default function PinjamanRiwayatSection() {
  const pengajuan = usePinjamanStore((s) => s.pengajuan)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (pengajuan.length === 0) {
    return (
      <p className="mt-8 text-center text-base text-teks-caption">
        Belum ada pengajuan pinjaman.
      </p>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-teks-utama">Riwayat Pengajuan</h2>
      <div className="mt-4 space-y-3">
        {pengajuan.map((p) => {
          const expanded = expandedId === p.id
          return (
            <PremiumCard key={p.id} className="overflow-hidden p-0">
              <button
                type="button"
                onClick={() => setExpandedId(expanded ? null : p.id)}
                className="flex w-full items-start gap-2 p-4 text-left"
                aria-expanded={expanded}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono-angka font-bold text-merah-utama">
                      {formatRupiah(p.jumlah)}
                    </p>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-1 text-sm text-teks-caption">
                    {p.tenor} bulan · {p.tanggal}
                  </p>
                  <p className="font-mono-angka mt-1 text-[10px] text-teks-caption">
                    {p.noReferensi}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-abu-teks">{p.tujuan}</p>
                  <p className="mt-2 text-xs text-teks-caption">
                    Cicilan: {formatRupiah(p.ringkasan.cicilanPerBulan)}/bulan · Total{' '}
                    {formatRupiah(p.ringkasan.totalBayar)}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`mt-1 shrink-0 text-teks-caption transition-transform ${
                    expanded ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {expanded && (
                <div className="space-y-3 border-t border-abu-sedang px-4 pb-4">
                  <div className="grid grid-cols-2 gap-2 pt-3 text-sm">
                    <div>
                      <p className="text-teks-caption">Total bunga</p>
                      <p className="font-mono-angka font-semibold">
                        {formatRupiah(p.ringkasan.totalBunga)}
                      </p>
                    </div>
                    <div>
                      <p className="text-teks-caption">Suku bunga</p>
                      <p className="font-semibold">{p.ringkasan.bungaPerBulan}%/bulan flat</p>
                    </div>
                  </div>
                  {p.catatanPengurus && (
                    <p className="rounded-lg bg-abu-terang px-3 py-2 text-xs text-teks-caption">
                      Catatan pengurus: {p.catatanPengurus}
                    </p>
                  )}
                  <JadwalCicilanList jadwal={p.ringkasan.jadwalCicilan} />
                </div>
              )}
            </PremiumCard>
          )
        })}
      </div>
    </div>
  )
}
