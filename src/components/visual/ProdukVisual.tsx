import type { Produk } from '../../types'
import { getProdukImage } from '../../constants/images'
import UnsplashImage from '../ui/UnsplashImage'

interface ProdukVisualProps {
  produk: Produk
  compact?: boolean
  sheet?: boolean
}

export default function ProdukVisual({ produk, compact = false, sheet = false }: ProdukVisualProps) {
  const height = sheet ? 'h-36' : compact ? 'h-24' : 'h-28'
  const src = produk.gambar ?? getProdukImage(produk.id, produk.kategori)

  return (
    <div className={`relative ${height} overflow-hidden bg-merah-muda`}>
      <UnsplashImage
        src={src}
        alt={produk.nama}
        className="h-full w-full object-cover"
        fallbackClassName={`h-full w-full bg-gradient-to-br from-green-100 to-emerald-50 ${height}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      {!compact && (
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-teks-utama backdrop-blur-sm">
          {produk.kategori}
        </span>
      )}
      <div className="absolute bottom-2 right-2 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-teks-caption shadow-sm">
        {produk.stok} {produk.stokSatuan}
      </div>
    </div>
  )
}
