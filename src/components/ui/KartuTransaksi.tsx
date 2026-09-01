import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import type { Transaksi } from '../../types'
import { formatRupiah } from '../../utils/formatRupiah'
import StatusBadge from './StatusBadge'

interface KartuTransaksiProps {
  tipe: 'masuk' | 'keluar'
  data: Transaksi
}

export default function KartuTransaksi({ tipe, data }: KartuTransaksiProps) {
  const isMasuk = tipe === 'masuk'

  return (
    <div className="premium-card p-4">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
            isMasuk ? 'bg-hijau-sukses/10' : 'bg-merah-muda'
          }`}
        >
          {isMasuk ? (
            <ArrowDownLeft className="text-hijau-sukses" size={20} aria-hidden="true" />
          ) : (
            <ArrowUpRight className="text-merah-utama" size={20} aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-teks-caption">{data.tanggal}</p>
            {data.status && <StatusBadge status={data.status} />}
          </div>
          <p className="mt-0.5 text-sm font-medium leading-snug text-teks-utama">
            {data.keterangan}
          </p>
          {data.referensi && (
            <p className="mt-1 font-mono-angka text-[10px] text-teks-caption">
              {data.referensi}
            </p>
          )}
        </div>
        <p
          className={`font-mono-angka shrink-0 text-sm font-bold ${
            isMasuk ? 'text-hijau-sukses' : 'text-merah-utama'
          }`}
        >
          {isMasuk ? '+' : '-'}
          {formatRupiah(data.nominal)}
        </p>
      </div>
    </div>
  )
}
