import { rekeningKoperasi } from '../../data/mockData'
import { formatRupiah } from '../../utils/formatRupiah'
import PremiumCard from '../ui/PremiumCard'

interface TransferInstruksiKoperasiProps {
  nominal: number
  referensi?: string
}

export default function TransferInstruksiKoperasi({
  nominal,
  referensi,
}: TransferInstruksiKoperasiProps) {
  return (
    <PremiumCard className="space-y-3 p-4">
      <p className="text-sm font-bold text-teks-utama">Instruksi Transfer</p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-2">
          <span className="text-teks-caption">Bank</span>
          <span className="text-right font-semibold">{rekeningKoperasi.bank}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-teks-caption">No. Rekening</span>
          <span className="font-mono-angka text-right font-semibold">{rekeningKoperasi.nomor}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-teks-caption">Atas Nama</span>
          <span className="max-w-[55%] text-right text-xs font-semibold leading-snug">
            {rekeningKoperasi.atasNama}
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-teks-caption">Kode Virtual</span>
          <span className="font-mono-angka text-right text-xs font-semibold">
            {rekeningKoperasi.kodeVirtual}
          </span>
        </div>
        <div className="flex justify-between gap-2 border-t border-abu-sedang pt-2">
          <span className="text-teks-caption">Nominal</span>
          <span className="font-mono-angka font-bold text-merah-utama">
            {formatRupiah(nominal)}
          </span>
        </div>
        {referensi && (
          <div className="flex justify-between gap-2">
            <span className="text-teks-caption">Referensi</span>
            <span className="font-mono-angka text-right text-xs font-semibold">{referensi}</span>
          </div>
        )}
      </div>
      <p className="text-xs leading-relaxed text-teks-caption">
        Cantumkan nomor referensi di berita transfer. Verifikasi pengurus 1×24 jam kerja.
      </p>
    </PremiumCard>
  )
}
