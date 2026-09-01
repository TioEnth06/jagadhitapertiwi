import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { usePasarStore } from '../../stores/usePasarStore'
import type { Produk } from '../../types'
import { formatRupiah } from '../../utils/formatRupiah'
import TombolUtama from '../ui/TombolUtama'
import PremiumCard from '../ui/PremiumCard'
import ProdukVisual from '../visual/ProdukVisual'

interface OrderRequestSheetProps {
  produk: Produk | null
  open: boolean
  onClose: () => void
  onSuccess: (message: string) => void
}

export default function OrderRequestSheet({
  produk,
  open,
  onClose,
  onSuccess,
}: OrderRequestSheetProps) {
  const requestOrder = usePasarStore((s) => s.requestOrder)
  const [qty, setQty] = useState(1)
  const [catatan, setCatatan] = useState('')
  const [error, setError] = useState('')

  if (!open || !produk) return null

  const subtotal = produk.harga * qty

  const handleSubmit = () => {
    const result = requestOrder({ produk, qty, catatan: catatan.trim() || undefined })
    if (!result.ok) {
      setError(result.error)
      return
    }
    onSuccess(`Permintaan order ${produk.nama} berhasil dikirim!`)
    setQty(1)
    setCatatan('')
    setError('')
    onClose()
  }

  const handleClose = () => {
    setQty(1)
    setCatatan('')
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
        aria-label="Tutup"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="sheet-panel relative z-10 w-full max-w-[var(--app-max-width)] rounded-t-3xl bg-white shadow-2xl"
      >
        <div className="shrink-0 overflow-hidden rounded-t-3xl">
          <ProdukVisual produk={produk} sheet />
        </div>
        <div className="sheet-panel-body space-y-4 p-4">
          <div>
            <h2 className="text-base font-heading font-bold leading-snug text-teks-utama">{produk.nama}</h2>
            <p className="font-mono-angka mt-1 text-sm font-semibold text-merah-utama">
              {formatRupiah(produk.harga)}/{produk.satuan}
            </p>
            {produk.penjual && (
              <p className="mt-1 text-xs text-teks-caption">
                Penjual: {produk.penjual}
                {produk.desa ? `, ${produk.desa}` : ''}
              </p>
            )}
          </div>

          <PremiumCard className="p-3">
            <p className="mb-2 text-sm text-label">Jumlah pesanan</p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-abu-terang text-teks-utama"
                aria-label="Kurangi jumlah"
              >
                <Minus size={18} />
              </button>
              <span className="font-mono-angka min-w-[2.5rem] text-center text-xl font-bold">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(produk.stok, q + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-merah-muda text-merah-utama"
                aria-label="Tambah jumlah"
              >
                <Plus size={18} />
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-teks-caption">
              Stok: {produk.stok} {produk.stokSatuan}
            </p>
          </PremiumCard>

          <div>
            <label htmlFor="catatanOrder" className="mb-2 block text-sm text-label">
              Catatan (opsional)
            </label>
            <textarea
              id="catatanOrder"
              rows={2}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: ambil Sabtu pagi di kantor koperasi"
              className="input-premium resize-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-abu-sedang pt-3">
            <span className="text-sm font-semibold text-teks-utama">Subtotal</span>
            <span className="balance-amount text-merah-utama">
              {formatRupiah(subtotal)}
            </span>
          </div>

          {error && (
            <p className="text-sm font-medium text-merah-utama" role="alert">
              {error}
            </p>
          )}

          <TombolUtama fullWidth variant="pill" onClick={handleSubmit}>
            Kirim Permintaan Order
          </TombolUtama>
        </div>
      </div>
    </div>
  )
}
