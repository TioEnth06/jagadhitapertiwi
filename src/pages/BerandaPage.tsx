import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Wallet, Banknote, ShoppingCart, BarChart3 } from 'lucide-react'
import { pengumuman } from '../data/mockData'
import { useAuthStore } from '../stores/useAuthStore'
import { usePasarStore } from '../stores/usePasarStore'
import { useSimpananStore } from '../stores/useSimpananStore'
import { formatRupiah } from '../utils/formatRupiah'
import { getGreeting } from '../utils/greeting'
import KartuProduk from '../components/ui/KartuProduk'
import PremiumCard from '../components/ui/PremiumCard'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import OrderRequestSheet from '../components/pasar/OrderRequestSheet'
import DemoToast from '../components/ui/DemoToast'
import { useDemoToast } from '../hooks/useDemoToast'
import type { Produk } from '../types'

export default function BerandaPage() {
  const anggota = useAuthStore((s) => s.anggota)
  const nama = anggota?.nama ?? 'Sukirman'
  const simpanan = useSimpananStore((s) => s.simpanan)
  const produkList = usePasarStore((s) => s.produk)
  const { message, showToast, dismiss } = useDemoToast()
  const [orderProduk, setOrderProduk] = useState<Produk | null>(null)

  const produkUnggulan = useMemo(() => produkList.slice(0, 3), [produkList])

  const aksiCepat = [
    { label: 'Setor Simpanan', icon: Wallet, path: '/simpanan' },
    { label: 'Ajukan Pinjaman', icon: Banknote, path: '/pinjaman' },
    { label: 'Belanja Produk', icon: ShoppingCart, path: '/pasar' },
    { label: 'Lihat SHU', icon: BarChart3, path: '/suara-anggota' },
  ]

  return (
    <div>
      <header className="relative bg-gradient-to-br from-merah-gelap to-merah-utama px-5 pb-16 pt-6 text-white">
        <div className="hero-grid-bg absolute inset-x-0 top-0 h-48 opacity-30" aria-hidden="true" />
        <div className="relative flex items-start justify-between">
          <div>
            <SectionEyebrow light>Beranda</SectionEyebrow>
            <h1 className="mt-1 text-lg font-bold">
              {getGreeting()}, Pak {nama} 👋
            </h1>
            <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              Anggota Aktif ✓
            </span>
          </div>
          <button
            type="button"
            className="relative rounded-full bg-white/15 p-2.5 backdrop-blur-sm"
            aria-label="Notifikasi, 3 pesan baru"
          >
            <Bell size={22} />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-merah-utama">
              3
            </span>
          </button>
        </div>
      </header>

      <div className="relative space-y-5 px-4 -mt-10">
        <PremiumCard large className="bg-gradient-to-br from-merah-gelap to-merah-utama p-4 text-white shadow-xl border-0">
          <p className="text-sm font-semibold text-on-merah-muted">Total Simpanan Anda</p>
          <p className="balance-amount mt-1">
            {formatRupiah(simpanan.total)}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/20 pt-4 text-sm">
            <div>
              <p className="text-on-merah-muted">Simpanan Wajib</p>
              <p className="font-mono-angka font-semibold">{formatRupiah(simpanan.wajib)}</p>
            </div>
            <div>
              <p className="text-on-merah-muted">Simpanan Sukarela</p>
              <p className="font-mono-angka font-semibold">{formatRupiah(simpanan.sukarela)}</p>
            </div>
          </div>
          <Link
            to="/simpanan"
            className="mt-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/30"
          >
            Lihat Rincian →
          </Link>
        </PremiumCard>

        <div>
          <SectionEyebrow>Aksi Cepat</SectionEyebrow>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {aksiCepat.map(({ label, icon: Icon, path }) => (
              <Link
                key={label}
                to={path}
                className="premium-card flex flex-col items-center p-3 transition-shadow hover:shadow-md"
              >
                <div className="mb-1.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-merah-muda">
                  <Icon className="text-merah-utama" size={22} aria-hidden="true" />
                </div>
                <span className="text-center text-xs font-semibold leading-snug text-teks-utama">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <PremiumCard className="border-l-4 border-l-merah-utama p-5">
          <span className="inline-block rounded-full bg-merah-muda px-2 py-0.5 text-xs font-semibold text-merah-utama">
            Pengumuman
          </span>
          <p className="mt-2 font-semibold text-teks-utama">{pengumuman.judul}</p>
          <p className="mt-1 text-base text-abu-teks">{pengumuman.isi}</p>
          <button type="button" className="mt-3 text-sm font-semibold text-merah-utama">
            Selengkapnya
          </button>
        </PremiumCard>

        <div>
          <h2 className="text-lg font-bold text-teks-utama">Produk Unggulan</h2>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {produkUnggulan.map((p) => (
              <div key={p.id} className="w-[148px] shrink-0">
                <KartuProduk produk={p} compact onRequestOrder={setOrderProduk} />
              </div>
            ))}
          </div>
        </div>
      </div>

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
