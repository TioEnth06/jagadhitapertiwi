import SectionEyebrow from '../ui/SectionEyebrow'
import DisplayHeading from '../ui/DisplayHeading'
import UnsplashImage from '../ui/UnsplashImage'
import { UNSPLASH } from '../../constants/images'

const layanan = [
  {
    image: UNSPLASH.layanan.simpanan,
    judul: 'Simpanan Anggota',
    deskripsi:
      'Kelola simpanan pokok, wajib, dan sukarela dengan pencatatan yang jelas dan transparan.',
  },
  {
    image: UNSPLASH.layanan.pinjaman,
    judul: 'Pinjaman Modal',
    deskripsi:
      'Ajukan pinjaman untuk modal tani dengan proses sederhana dan suku bunga sesuai rapat anggota.',
  },
  {
    image: UNSPLASH.layanan.pasar,
    judul: 'Pasar Produk Tani',
    deskripsi:
      'Platform jual beli hasil pertanian antar anggota koperasi di berbagai desa.',
  },
  {
    image: UNSPLASH.layanan.tataKelola,
    judul: 'Tata Kelola Digital',
    deskripsi:
      'Musyawarah dan voting online untuk keputusan kebijakan koperasi secara partisipatif.',
  },
]

export default function LayananSection() {
  return (
    <section id="layanan" className="bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Layanan</SectionEyebrow>
          <DisplayHeading className="mt-3">
            Dirancang untuk setiap kebutuhan koperasi
          </DisplayHeading>
          <p className="mt-4 text-base text-abu-teks">
            Solusi lengkap untuk anggota petani, pengurus, dan pengelola koperasi.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {layanan.map(({ image, judul, deskripsi }) => (
            <div
              key={judul}
              className="premium-card overflow-hidden transition-shadow hover:shadow-md"
            >
              <div className="relative h-44 overflow-hidden">
                <UnsplashImage
                  src={image}
                  alt={judul}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{judul}</h3>
              </div>
              <p className="p-6 text-base text-abu-teks leading-relaxed">{deskripsi}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
