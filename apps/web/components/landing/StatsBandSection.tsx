import { statistikKoperasi } from '@/lib/data/mockData'
import { formatRupiah, formatRupiahSingkat } from '@/lib/format'

export default function StatsBandSection() {
  const stats = [
    {
      num: statistikKoperasi.anggotaAktif.toLocaleString('id-ID'),
      label: 'Anggota aktif',
    },
    {
      num: formatRupiahSingkat(statistikKoperasi.totalSimpanan),
      label: 'Total simpanan',
    },
    {
      num: String(statistikKoperasi.mitraKorporat),
      label: 'Mitra korporat',
    },
    {
      num: `${statistikKoperasi.transaksiBulan}+`,
      label: 'Transaksi/bulan',
    },
  ]

  return (
    <div className="bg-[var(--landing-merah)] px-[clamp(1.25rem,6%,4rem)] py-[52px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 lg:grid-cols-4">
        {stats.map(({ num, label }, i) => (
          <div
            key={label}
            className={`px-5 py-6 text-center lg:py-0 ${
              i % 2 === 0 ? 'border-r border-white/20' : ''
            } ${i < 2 ? 'border-b border-white/20 lg:border-b-0' : ''} lg:border-r lg:border-white/20 lg:last:border-r-0`}
          >
            <span className="font-landing-mono block text-[28px] font-medium leading-none text-white lg:text-[38px]">
              {num}
            </span>
            <span className="mt-2 block text-[13px] font-normal text-white/70">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
