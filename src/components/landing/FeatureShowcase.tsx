import { Link } from 'react-router-dom'
import SectionEyebrow from '../ui/SectionEyebrow'
import DisplayHeading from '../ui/DisplayHeading'
import TombolUtama from '../ui/TombolUtama'
import FeatureIllustration from '../visual/FeatureIllustration'

const showcases = [
  {
    num: '01',
    type: 'simpanan' as const,
    judul: 'Kelola simpanan dengan mudah',
    deskripsi:
      'Cek saldo, setor simpanan wajib, dan lihat riwayat transaksi langsung dari HP — tanpa antre di kantor koperasi.',
  },
  {
    num: '02',
    type: 'pasar' as const,
    judul: 'Pasar produk antar anggota',
    deskripsi:
      'Jual beli hasil tani langsung ke sesama anggota. Beras organik, sayuran segar, madu hutan — semua dalam satu pasar digital.',
  },
  {
    num: '03',
    type: 'suara' as const,
    judul: 'Suara anggota untuk kebijakan',
    deskripsi:
      'Ikut musyawarah digital tentang suku bunga, alokasi SHU, dan kebijakan koperasi. Satu anggota, satu suara.',
  },
]

export default function FeatureShowcase() {
  return (
    <section className="bg-abu-terang px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <SectionEyebrow>Tentang Solusi</SectionEyebrow>
          <DisplayHeading className="mt-3">Fitur Utama</DisplayHeading>
          <p className="mt-4 text-base text-abu-teks">
            Jelajahi kemampuan inti yang mendorong inovasi koperasi tani.
          </p>
        </div>

        <div className="space-y-8">
          {showcases.map(({ num, type, judul, deskripsi }, i) => (
            <div
              key={num}
              className={`grid items-center gap-8 lg:grid-cols-2 ${
                i % 2 === 1 ? 'lg:[direction:rtl]' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <span className="font-accent text-5xl font-bold text-merah-utama/25">
                  {num}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-teks-utama">{judul}</h3>
                <p className="mt-3 text-base text-abu-teks leading-relaxed">{deskripsi}</p>
                <Link to="/login" className="mt-6 inline-block">
                  <TombolUtama variant="pill" className="!min-h-[44px] !text-sm">
                    Coba Sekarang
                  </TombolUtama>
                </Link>
              </div>
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <FeatureIllustration type={type} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
