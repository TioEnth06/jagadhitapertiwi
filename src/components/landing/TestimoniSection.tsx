import SectionEyebrow from '../ui/SectionEyebrow'
import DisplayHeading from '../ui/DisplayHeading'
import PremiumCard from '../ui/PremiumCard'
import UnsplashImage from '../ui/UnsplashImage'
import { UNSPLASH } from '../../constants/images'

const testimoni = [
  {
    nama: 'Pak Sukirman',
    jabatan: 'Anggota sejak 2018',
    kutipan:
      'Sekarang saya bisa cek simpanan dan beli beras langsung dari HP, tanpa ke kantor koperasi.',
    foto: UNSPLASH.testimoni[0],
  },
  {
    nama: 'Bu Sari',
    jabatan: 'Penjual Jagung Manis',
    kutipan:
      'Pasar digital koperasi membantu saya menjual hasil panen ke anggota lain dengan mudah.',
    foto: UNSPLASH.testimoni[1],
  },
  {
    nama: 'Pak Hadi',
    jabatan: 'Pengurus Koperasi',
    kutipan:
      'Proses simpan pinjam jadi lebih transparan. Anggota puas, pengurus terbantu.',
    foto: UNSPLASH.testimoni[2],
  },
]

export default function TestimoniSection() {
  return (
    <section id="testimoni" className="bg-abu-terang px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Testimoni</SectionEyebrow>
          <DisplayHeading className="mt-3">Apa kata anggota kami</DisplayHeading>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimoni.map(({ nama, jabatan, kutipan, foto }) => (
            <PremiumCard key={nama} className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <UnsplashImage
                  src={foto}
                  alt={nama}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-merah-muda"
                />
                <div>
                  <p className="font-bold text-teks-utama">{nama}</p>
                  <p className="text-sm text-abu-teks">{jabatan}</p>
                </div>
              </div>
              <p className="text-base leading-relaxed text-teks-utama">
                &ldquo;{kutipan}&rdquo;
              </p>
            </PremiumCard>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-abu-teks">
          Foto dari{' '}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-merah-utama"
          >
            Unsplash
          </a>
        </p>
      </div>
    </section>
  )
}
