import { formatRupiah } from '../../utils/formatRupiah'
import { UNSPLASH } from '../../constants/images'
import UnsplashImage from '../ui/UnsplashImage'

const previewProducts = [
  { src: UNSPLASH.produkById['1'], alt: 'Beras organik' },
  { src: UNSPLASH.produkById['2'], alt: 'Jagung manis' },
  { src: UNSPLASH.produkById['3'], alt: 'Madu hutan' },
]

export default function AppPhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[280px]" aria-hidden="true">
      <div className="absolute -inset-4 rounded-[3rem] bg-merah-utama/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-teks-utama bg-teks-utama shadow-2xl">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-teks-utama" />

        <div className="bg-abu-terang pt-7">
          <div className="bg-gradient-to-r from-merah-gelap to-merah-utama px-4 pb-8 pt-3 text-white">
            <p className="text-[10px] font-semibold text-on-merah-muted opacity-95">Selamat pagi, Pak Sukirman</p>
            <p className="mt-2 text-[9px] font-semibold text-on-merah-muted">Total Simpanan Anda</p>
            <p className="font-mono-angka text-lg font-bold">{formatRupiah(4750000)}</p>
          </div>

          <div className="space-y-2 px-3 -mt-4 pb-4">
            <div className="rounded-xl bg-white p-3 shadow-md">
              <div className="grid grid-cols-4 gap-1">
                {['💰', '🏦', '🛒', '📊'].map((icon, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-lg bg-merah-muda p-1.5"
                  >
                    <span className="text-sm">{icon}</span>
                    <span className="mt-0.5 text-[7px] font-semibold text-merah-utama">
                      {['Simpan', 'Pinjam', 'Pasar', 'SHU'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border-l-4 border-l-merah-utama bg-white p-3 shadow-sm">
              <p className="text-[8px] font-bold text-merah-utama">📢 Pengumuman</p>
              <p className="mt-0.5 text-[9px] font-semibold text-teks-utama">
                Rapat Anggota Tahunan 2025
              </p>
            </div>

            <div className="flex gap-2 overflow-hidden">
              {previewProducts.map(({ src, alt }) => (
                <div key={alt} className="h-14 w-14 shrink-0 overflow-hidden rounded-lg shadow-sm">
                  <UnsplashImage src={src} alt={alt} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="mx-3 mb-3 flex justify-around rounded-full bg-white py-2 shadow-lg">
            {['🏠', '💳', '💵', '🛒', '👤'].map((icon, i) => (
              <span
                key={i}
                className={`text-sm ${i === 0 ? 'rounded-full bg-merah-muda px-2' : ''}`}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
