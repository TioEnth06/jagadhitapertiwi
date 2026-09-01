import { useState } from 'react'
import {
  estimasiShuTahunan,
  MIN_TARIK,
  useSimpananStore,
} from '../stores/useSimpananStore'
import type { SimpananView } from '../types'
import { formatRupiah } from '../utils/formatRupiah'
import SetorSimpananPanel from '../components/simpanan/SetorSimpananPanel'
import TarikSimpananPanel from '../components/simpanan/TarikSimpananPanel'
import TombolUtama from '../components/ui/TombolUtama'
import TombolSecondary from '../components/ui/TombolSecondary'
import KartuTransaksi from '../components/ui/KartuTransaksi'
import PageHeader from '../components/ui/PageHeader'
import PremiumCard from '../components/ui/PremiumCard'
import BottomSheet from '../components/ui/BottomSheet'
import DemoToast from '../components/ui/DemoToast'
import { useDemoToast } from '../hooks/useDemoToast'

export default function SimpananPage() {
  const simpanan = useSimpananStore((s) => s.simpanan)
  const transaksi = useSimpananStore((s) => s.transaksi)
  const { message, showToast, dismiss } = useDemoToast()
  const [view, setView] = useState<SimpananView>('main')

  const closeSheet = () => setView('main')

  return (
    <div className="space-y-5 pb-4">
      <PageHeader
        eyebrow="Keuangan"
        title="Simpanan Saya"
        subtitle="Kelola dan pantau simpanan Anda"
      />

      <div className="px-4">
        <PremiumCard large className="bg-gradient-to-br from-merah-gelap to-merah-utama p-4 text-white border-0">
          <p className="text-sm font-semibold text-on-merah-muted">Total Simpanan</p>
          <p className="balance-amount mt-1">
            {formatRupiah(simpanan.total)}
          </p>
          <div className="mt-4 space-y-2 border-t border-white/20 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-on-merah-muted">Simpanan Pokok</span>
              <span className="font-mono-angka font-semibold">{formatRupiah(simpanan.pokok)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-merah-muted">Simpanan Wajib</span>
              <span className="font-mono-angka font-semibold">{formatRupiah(simpanan.wajib)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-merah-muted">Simpanan Sukarela</span>
              <span className="font-mono-angka font-semibold">{formatRupiah(simpanan.sukarela)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-on-merah-muted">Wajib Bulan Ini</span>
              <div className="flex items-center gap-2">
                <span className="font-mono-angka font-semibold">
                  {formatRupiah(simpanan.wajibBulanIni)}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold text-white ${
                    simpanan.wajibBulanIniStatus === 'LUNAS'
                      ? 'bg-hijau-sukses'
                      : 'bg-kuning-warning'
                  }`}
                >
                  {simpanan.wajibBulanIniStatus}
                </span>
              </div>
            </div>
          </div>
        </PremiumCard>

        {simpanan.wajibBulanIniStatus === 'BELUM' && (
          <PremiumCard className="mt-4 border-l-4 border-l-kuning-warning p-4">
            <p className="text-sm font-bold text-teks-utama">Tagihan Wajib Bulan Ini</p>
            <p className="mt-1 text-sm text-teks-caption">
              Segera setor {formatRupiah(simpanan.wajibBulanIni)} agar status keanggotaan tetap aktif.
            </p>
            <button
              type="button"
              onClick={() => setView('setor')}
              className="mt-3 text-sm font-semibold text-merah-utama"
            >
              Bayar sekarang →
            </button>
          </PremiumCard>
        )}

        <PremiumCard className="mt-4 space-y-3 p-4">
          <p className="text-sm font-bold text-teks-utama">Komposisi Simpanan</p>
          {[
            { label: 'Pokok', nilai: simpanan.pokok, warna: 'bg-merah-gelap' },
            { label: 'Wajib', nilai: simpanan.wajib, warna: 'bg-merah-utama' },
            { label: 'Sukarela', nilai: simpanan.sukarela, warna: 'bg-merah-muda' },
          ].map(({ label, nilai, warna }) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-teks-caption">{label}</span>
                <span className="font-mono-angka font-semibold">{formatRupiah(nilai)}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-abu-terang">
                <div
                  className={`h-full rounded-full ${warna}`}
                  style={{
                    width: `${simpanan.total > 0 ? (nilai / simpanan.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
          <p className="text-xs text-teks-caption">
            Estimasi bagian SHU dari sukarela: ~{formatRupiah(estimasiShuTahunan(simpanan.sukarela))}/tahun (simulasi 6%).
          </p>
        </PremiumCard>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <TombolUtama variant="pill" onClick={() => setView('setor')}>
            Setor Simpanan
          </TombolUtama>
          <TombolSecondary pill disabled={simpanan.sukarela < MIN_TARIK} onClick={() => setView('tarik')}>
            Tarik Simpanan
          </TombolSecondary>
        </div>

        <h2 className="mt-8 text-lg font-bold text-teks-utama">Riwayat Transaksi</h2>
        <div className="mt-4 space-y-3">
          {transaksi.map((t) => (
            <KartuTransaksi key={t.id} tipe={t.tipe} data={t} />
          ))}
        </div>
      </div>

      <BottomSheet open={view === 'setor'} title="Setor Simpanan" onClose={closeSheet}>
        <SetorSimpananPanel onSuccess={showToast} onClose={closeSheet} />
      </BottomSheet>

      <BottomSheet open={view === 'tarik'} title="Tarik Simpanan" onClose={closeSheet}>
        <TarikSimpananPanel onSuccess={showToast} onClose={closeSheet} />
      </BottomSheet>

      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  )
}
