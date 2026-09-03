"use client";
import Link from 'next/link'
import { produk } from '@/lib/data/mockData'
import { formatRupiah } from '@/lib/formatRupiah'
import SectionEyebrowLanding from './SectionEyebrowLanding'
import LoiForm from './LoiForm'
import DemoToast from '@/components/ui/DemoToast'
import { useDemoToast } from '@/lib/hooks/useDemoToast'

const thumbEmoji: Record<string, string> = {
  '1': '🌾',
  '3': '🍯',
  '4': '🌶️',
  '2': '🥬',
}

const thumbBg: Record<string, string> = {
  '1': '#E8F5E9',
  '3': '#FFF8E1',
  '4': '#FCE4EC',
  '2': '#E8F5E9',
}

export default function MarketplacePreviewSection() {
  const preview = produk.slice(0, 4)
  const { message, showToast, dismiss } = useDemoToast()

  return (
    <section id="marketplace" className="py-24">
      <div className="landing-section-wrap">
        <SectionEyebrowLanding>Pasar digital JDP</SectionEyebrowLanding>
        <h2 className="landing-section-title">
          Produk tani langsung
          <br />
          dari sumbernya
        </h2>
        <p className="landing-section-sub">
          Siapapun bisa melihat dan memesan produk — tanpa perlu jadi anggota terlebih dahulu.
          Untuk order besar, gunakan form LOI di sebelah kanan.
        </p>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-3">
            {preview.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3.5 rounded-xl border border-[var(--landing-abu-border)] p-4 transition-colors hover:border-[var(--landing-merah)]"
              >
                <div
                  className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[10px] text-2xl"
                  style={{ background: thumbBg[p.id] ?? '#F5F5F5' }}
                  aria-hidden="true"
                >
                  {thumbEmoji[p.id] ?? '🌱'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-[var(--landing-hitam)]">{p.nama}</div>
                  <div className="text-xs text-[var(--landing-abu-teks)]">
                    {p.penjual ?? 'Anggota JDP'}
                    {p.desa ? ` · ${p.desa}` : ''}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <span className="font-landing-mono text-sm font-medium text-[var(--landing-merah)]">
                      {formatRupiah(p.harga)}/{p.satuan}
                    </span>
                    <span className="text-[11px] text-[var(--landing-abu-halus)]">
                      Stok: {p.stok} {p.stokSatuan}
                    </span>
                  </div>
                </div>
                <Link
                  href="/login"
                  className="shrink-0 rounded-[7px] bg-[var(--landing-merah)] px-3.5 py-1.5 text-xs font-bold text-white no-underline transition-colors hover:bg-[var(--landing-merah-gelap)]"
                  title="Login untuk memesan"
                >
                  Beli
                </Link>
              </div>
            ))}
            <Link
              href="/login"
              className="block rounded-xl border-[1.5px] border-dashed border-[var(--landing-merah-border)] py-3.5 text-center text-sm font-semibold text-[var(--landing-merah)] no-underline transition-colors hover:bg-[var(--landing-merah-muda)]"
            >
              Lihat semua produk di marketplace →
            </Link>
          </div>

          <LoiForm onSuccess={showToast} />
        </div>
      </div>

      <DemoToast message={message} onDismiss={dismiss} variant="landing" />
    </section>
  )
}
