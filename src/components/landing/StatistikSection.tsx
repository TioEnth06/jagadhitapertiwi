import { statistikKoperasi } from '../../data/mockData'
import { formatRupiahSingkat } from '../../utils/formatRupiah'
import { UNSPLASH } from '../../constants/images'
import SectionEyebrow from '../ui/SectionEyebrow'
import DisplayHeading from '../ui/DisplayHeading'
import StatDisplay from '../ui/StatDisplay'
import UnsplashImage from '../ui/UnsplashImage'

export default function StatistikSection() {
  const stats = [
    {
      label: 'Anggota Aktif',
      nilai: statistikKoperasi.anggotaAktif.toLocaleString('id-ID'),
    },
    {
      label: 'Total Simpanan',
      nilai: formatRupiahSingkat(statistikKoperasi.totalSimpanan),
    },
    {
      label: 'Produk di Pasar',
      nilai: statistikKoperasi.produkPasar.toString(),
    },
    {
      label: 'Kepuasan Anggota',
      nilai: '95%',
    },
  ]

  return (
    <section id="statistik" className="relative overflow-hidden px-4 py-16 text-white sm:px-6">
      <UnsplashImage
        src={UNSPLASH.statistik}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-merah-gelap/92" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow light>Statistik</SectionEyebrow>
          <DisplayHeading light className="mt-3">
            Cerdas. Aman. Terpercaya.
          </DisplayHeading>
          <p className="mt-4 text-base text-on-merah-muted">
            Angka nyata dari koperasi yang terus berkembang bersama anggota.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map(({ label, nilai }) => (
            <StatDisplay key={label} value={nilai} label={label} light />
          ))}
        </div>
      </div>
    </section>
  )
}
