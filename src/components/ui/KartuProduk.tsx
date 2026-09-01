import { Star } from 'lucide-react'
import type { Produk } from '../../types'
import { formatRupiah } from '../../utils/formatRupiah'
import TombolUtama from './TombolUtama'
import ProdukVisual from '../visual/ProdukVisual'

interface KartuProdukProps {
  produk: Produk
  onRequestOrder?: (produk: Produk) => void
  compact?: boolean
}

export default function KartuProduk({ produk, onRequestOrder, compact = false }: KartuProdukProps) {
  return (
    <div className="premium-card overflow-hidden transition-shadow hover:shadow-md">
      <ProdukVisual produk={produk} compact={compact} />
      <div className={`${compact ? 'p-2.5' : 'p-3'}`}>
        {!compact && (
          <span className="inline-block rounded-full bg-merah-muda px-2 py-0.5 text-[10px] font-semibold text-merah-utama">
            Produk Anggota
          </span>
        )}
        <h3
          className={`font-bold text-teks-utama leading-snug ${compact ? 'mt-0 text-[13px] line-clamp-2' : 'mt-2 text-sm'}`}
        >
          {produk.nama}
        </h3>
        <p className={`font-mono-angka mt-1 font-semibold text-merah-utama ${compact ? 'text-xs' : 'text-sm'}`}>
          {formatRupiah(produk.harga)}/{produk.satuan}
        </p>
        {!compact && (
          <div className="mt-1 flex items-center gap-1 text-xs text-teks-caption">
            <Star size={12} className="fill-kuning-warning text-kuning-warning shrink-0" aria-hidden="true" />
            <span>{produk.rating}</span>
            {produk.penjual && (
              <span className="truncate">
                · {produk.penjual}
                {produk.desa ? `, ${produk.desa}` : ''}
              </span>
            )}
          </div>
        )}
        <TombolUtama
          variant="pill"
          className={`mt-2 w-full !min-h-[40px] !py-1.5 ${compact ? '!text-xs' : '!text-sm'}`}
          onClick={() => onRequestOrder?.(produk)}
          aria-label={`Request order ${produk.nama}`}
        >
          {compact ? 'Order' : 'Request Order'}
        </TombolUtama>
      </div>
    </div>
  )
}
