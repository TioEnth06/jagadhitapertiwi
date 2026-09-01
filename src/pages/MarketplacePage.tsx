import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { kategoriProduk } from '../data/mockData'
import { usePasarStore } from '../stores/usePasarStore'
import type { Produk } from '../types'
import { formatRupiah } from '../utils/formatRupiah'
import OrderRequestSheet from '../components/pasar/OrderRequestSheet'
import KartuProduk from '../components/ui/KartuProduk'
import PageHeader from '../components/ui/PageHeader'
import PremiumCard from '../components/ui/PremiumCard'
import StatusBadge from '../components/ui/StatusBadge'
import DemoToast from '../components/ui/DemoToast'
import { useDemoToast } from '../hooks/useDemoToast'

type PasarTab = 'produk' | 'pesanan'

export default function MarketplacePage() {
  const produkList = usePasarStore((s) => s.produk)
  const orders = usePasarStore((s) => s.orders)
  const [tab, setTab] = useState<PasarTab>('produk')
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const [orderProduk, setOrderProduk] = useState<Produk | null>(null)
  const { message, showToast, dismiss } = useDemoToast()

  const filtered = useMemo(() => {
    return produkList.filter((p) => {
      const matchKategori = kategori === 'Semua' || p.kategori === kategori
      const matchSearch =
        search === '' ||
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.penjual?.toLowerCase().includes(search.toLowerCase())
      return matchKategori && matchSearch
    })
  }, [produkList, search, kategori])

  return (
    <div className="relative space-y-5 pb-4">
      <PageHeader
        eyebrow="Marketplace"
        title="Pasar Produk Tani"
        subtitle="Beli-jual hasil tani antar anggota"
      />

      <div className="px-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab('produk')}
            className={`flex-1 min-h-[44px] rounded-full text-sm font-semibold ${
              tab === 'produk' ? 'bg-merah-utama text-white' : 'premium-card text-teks-utama'
            }`}
          >
            Semua Produk
          </button>
          <button
            type="button"
            onClick={() => setTab('pesanan')}
            className={`flex-1 min-h-[44px] rounded-full text-sm font-semibold ${
              tab === 'pesanan' ? 'bg-merah-utama text-white' : 'premium-card text-teks-utama'
            }`}
          >
            Pesanan Saya ({orders.length})
          </button>
        </div>

        {tab === 'produk' && (
          <>
            <div className="relative mt-4">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-merah-utama"
                size={20}
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari produk tani..."
                className="input-premium rounded-full pl-12 shadow-sm"
                aria-label="Cari produk tani"
              />
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {kategoriProduk.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKategori(k)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                    kategori === k
                      ? 'bg-merah-utama text-white shadow-sm'
                      : 'premium-card text-teks-utama'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {filtered.map((p) => (
                <KartuProduk key={p.id} produk={p} compact onRequestOrder={setOrderProduk} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="mt-8 text-center text-base text-abu-teks">Produk tidak ditemukan.</p>
            )}
          </>
        )}

        {tab === 'pesanan' && (
          <div className="mt-4 space-y-3">
            {orders.length === 0 ? (
              <p className="py-8 text-center text-base text-teks-caption">
                Belum ada permintaan order. Pilih produk dan ketuk Request Order.
              </p>
            ) : (
              orders.map((order) => (
                <PremiumCard key={order.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-teks-utama">
                        {order.items.map((i) => i.nama).join(', ')}
                      </p>
                      <p className="mt-1 text-sm text-teks-caption">
                        {order.tanggal}
                        {order.penjual ? ` · ${order.penjual}` : ''}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="mt-3 space-y-1 text-sm">
                    {order.items.map((item) => (
                      <div key={item.produkId} className="flex justify-between text-abu-teks">
                        <span>
                          {item.qty} {item.satuan} × {formatRupiah(item.harga)}
                        </span>
                        <span className="font-mono-angka font-semibold">
                          {formatRupiah(item.subtotal)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between border-t border-abu-sedang pt-2">
                    <span className="font-semibold text-teks-utama">Total</span>
                    <span className="font-mono-angka font-bold text-merah-utama">
                      {formatRupiah(order.total)}
                    </span>
                  </div>
                  {order.catatan && (
                    <p className="mt-2 text-xs text-teks-caption">Catatan: {order.catatan}</p>
                  )}
                </PremiumCard>
              ))
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() =>
          showToast('Form jual produk akan dibuka setelah verifikasi pengurus (demo)')
        }
        className="floating-above-nav fixed left-1/2 z-40 flex min-h-[48px] -translate-x-1/2 items-center gap-2 rounded-full bg-merah-utama px-4 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-merah-gelap"
        style={{ maxWidth: 'calc(var(--app-max-width) - 1.5rem)' }}
        aria-label="Jual produk saya"
      >
        <Plus size={18} />
        Jual Produk +
      </button>

      <OrderRequestSheet
        produk={orderProduk}
        open={orderProduk !== null}
        onClose={() => setOrderProduk(null)}
        onSuccess={showToast}
      />

      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  )
}
