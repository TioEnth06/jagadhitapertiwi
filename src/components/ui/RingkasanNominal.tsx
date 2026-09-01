import { formatRupiah } from '../../utils/formatRupiah'

interface RingkasanNominalProps {
  label: string
  nominal: number
  highlight?: boolean
}

export default function RingkasanNominal({
  label,
  nominal,
  highlight = false,
}: RingkasanNominalProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-abu-teks">{label}</span>
      <span
        className={`font-mono-angka font-semibold ${highlight ? 'text-lg text-merah-utama' : 'text-teks-utama'}`}
      >
        {formatRupiah(nominal)}
      </span>
    </div>
  )
}
