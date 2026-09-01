import { useMemo, useState } from 'react'
import { MAX_PINJAMAN, MIN_PINJAMAN } from '../data/mockData'
import { usePinjamanStore } from '../stores/usePinjamanStore'
import { useSimpananStore } from '../stores/useSimpananStore'
import { formatRupiah } from '../utils/formatRupiah'
import {
  clampJumlahPinjaman,
  hitungKelayakanPinjaman,
  hitungPinjaman,
  hitungPlafonPinjaman,
  persenPlafon,
} from '../utils/hitungPinjaman'
import JadwalCicilanList from '../components/pinjaman/JadwalCicilanList'
import PinjamanRiwayatSection from '../components/pinjaman/PinjamanRiwayatSection'
import TombolUtama from '../components/ui/TombolUtama'
import TombolSecondary from '../components/ui/TombolSecondary'
import PageHeader from '../components/ui/PageHeader'
import PremiumCard from '../components/ui/PremiumCard'
import DemoToast from '../components/ui/DemoToast'
import StepIndicator from '../components/ui/StepIndicator'
import { useDemoToast } from '../hooks/useDemoToast'

const CHIP_PRESET = [1_000_000, 2_000_000, 5_000_000, 10_000_000]
const TENOR_OPTIONS = [3, 6, 12]
const STEPS = ['Simulasi', 'Tujuan', 'Konfirmasi']

export default function PinjamanPage() {
  const ajukan = usePinjamanStore((s) => s.ajukan)
  const simpananWajib = useSimpananStore((s) => s.simpanan.wajib)
  const plafon = useMemo(() => hitungPlafonPinjaman(simpananWajib), [simpananWajib])
  const plafonCukup = plafon >= MIN_PINJAMAN

  const [step, setStep] = useState(1)
  const [jumlah, setJumlah] = useState(() => clampJumlahPinjaman(3_000_000, plafon))
  const [tenor, setTenor] = useState(6)
  const [tujuan, setTujuan] = useState('')
  const [tujuanError, setTujuanError] = useState('')
  const [hasilAjuan, setHasilAjuan] = useState<{ noReferensi: string } | null>(null)
  const { message, showToast, dismiss } = useDemoToast()

  const jumlahEfektif = useMemo(
    () => clampJumlahPinjaman(jumlah, plafon),
    [jumlah, plafon],
  )
  const ringkasan = useMemo(() => hitungPinjaman(jumlahEfektif, tenor), [jumlahEfektif, tenor])
  const kelayakan = useMemo(
    () => hitungKelayakanPinjaman(jumlahEfektif, plafon),
    [jumlahEfektif, plafon],
  )
  const penggunaanPlafon = persenPlafon(jumlahEfektif, plafon)

  const handleLanjutStep2 = () => {
    if (!kelayakan.layak) {
      return
    }
    setStep(2)
  }

  const handleLanjutStep3 = () => {
    if (tujuan.trim().length < 10) {
      setTujuanError('Tujuan pinjaman minimal 10 karakter.')
      return
    }
    setTujuanError('')
    setStep(3)
  }

  const handleSubmit = () => {
    const baru = ajukan({
      jumlah: jumlahEfektif,
      tenor,
      tujuan: tujuan.trim(),
      ringkasan,
    })
    setHasilAjuan({ noReferensi: baru.noReferensi })
    showToast(`Pengajuan ${baru.noReferensi} berhasil dikirim!`)
    setStep(4)
  }

  const resetForm = () => {
    setStep(1)
    setJumlah(clampJumlahPinjaman(3_000_000, plafon))
    setTenor(6)
    setTujuan('')
    setHasilAjuan(null)
  }

  return (
    <div className="space-y-5 pb-4">
      <PageHeader
        eyebrow="Pinjaman"
        title="Ajukan Pinjaman"
        subtitle="Simulasi cicilan sebelum mengajukan"
      />

      <div className="px-4">
        <PremiumCard className="mb-4 space-y-2 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-teks-caption">Plafon pinjaman Anda</span>
            <span className="font-mono-angka font-bold text-merah-utama">
              {formatRupiah(plafon)}
            </span>
          </div>
          <p className="text-xs text-teks-caption">
            Plafon = 10× simpanan wajib ({formatRupiah(simpananWajib)}), maks.{' '}
            {formatRupiah(MAX_PINJAMAN)}.
          </p>
          {plafonCukup && (
            <>
              <div className="h-2 overflow-hidden rounded-full bg-abu-terang">
                <div
                  className="h-full rounded-full bg-merah-utama transition-all"
                  style={{ width: `${penggunaanPlafon}%` }}
                />
              </div>
              <p className="text-xs text-teks-caption">
                Penggunaan plafon: {penggunaanPlafon}%
              </p>
            </>
          )}
          {!plafonCukup && (
            <p className="text-xs font-medium text-merah-utama">
              Plafon belum mencukupi untuk mengajukan pinjaman. Tingkatkan simpanan wajib terlebih
              dahulu.
            </p>
          )}
        </PremiumCard>

        {step <= 3 && plafonCukup && <StepIndicator steps={STEPS} current={step} />}

        {step === 1 && plafonCukup && (
          <div className="mt-6 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-teks-utama">Simulasi pinjaman</h2>
              <p className="mt-1 text-sm text-abu-teks">
                Geser jumlah dan pilih tenor untuk melihat estimasi cicilan.
              </p>
            </div>

            <PremiumCard large accent className="p-4 text-center">
              <p className="balance-amount text-teks-utama">{formatRupiah(jumlahEfektif)}</p>
            </PremiumCard>

            <input
              type="range"
              min={MIN_PINJAMAN}
              max={plafon}
              step={100_000}
              value={jumlahEfektif}
              onChange={(e) =>
                setJumlah(clampJumlahPinjaman(Number(e.target.value), plafon))
              }
              className="w-full accent-merah-utama"
              aria-label="Jumlah pinjaman"
            />
            <div className="flex justify-between text-xs text-abu-teks">
              <span>{formatRupiah(MIN_PINJAMAN)}</span>
              <span>{formatRupiah(plafon)}</span>
            </div>

            {!kelayakan.layak && kelayakan.pesan && (
              <p className="rounded-lg bg-merah-muda px-3 py-2 text-sm font-medium text-merah-utama" role="alert">
                {kelayakan.pesan}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {CHIP_PRESET.filter((v) => v <= plafon).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setJumlah(v)}
                  className={`min-h-[44px] rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                    jumlahEfektif === v
                      ? 'bg-merah-utama text-white shadow-sm'
                      : 'premium-card text-teks-utama'
                  }`}
                >
                  {v >= 1_000_000 ? `Rp ${v / 1_000_000} Jt` : formatRupiah(v)}
                </button>
              ))}
            </div>

            <div>
              <p className="mb-3 text-sm text-label">Pilih tenor</p>
              <div className="space-y-2">
                {TENOR_OPTIONS.map((t) => {
                  const sim = hitungPinjaman(jumlahEfektif, t)
                  return (
                    <label
                      key={t}
                      className={`flex min-h-[52px] cursor-pointer items-center justify-between gap-3 rounded-xl px-4 ${
                        tenor === t
                          ? 'premium-card border-merah-utama bg-merah-muda ring-1 ring-merah-muda'
                          : 'premium-card'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="tenor"
                          value={t}
                          checked={tenor === t}
                          onChange={() => setTenor(t)}
                          className="h-5 w-5 accent-merah-utama"
                        />
                        <span className="text-sm font-semibold">{t} bulan</span>
                      </div>
                      <span className="font-mono-angka text-sm font-bold text-merah-utama">
                        {formatRupiah(sim.cicilanPerBulan)}/bln
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            <PremiumCard accent className="space-y-3 p-4">
              <h3 className="font-bold text-teks-utama">Ringkasan simulasi</h3>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Pokok pinjaman</span>
                <span className="font-mono-angka font-semibold">{formatRupiah(ringkasan.pokok)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Bunga flat</span>
                <span className="font-semibold">
                  {ringkasan.bungaPerBulan}% × {ringkasan.tenor} bln ={' '}
                  {formatRupiah(ringkasan.totalBunga)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Biaya admin</span>
                <span className="font-semibold">{formatRupiah(ringkasan.biayaAdmin)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Cicilan per bulan</span>
                <span className="font-mono-angka text-base font-bold text-merah-utama">
                  {formatRupiah(ringkasan.cicilanPerBulan)}
                </span>
              </div>
              <div className="flex justify-between border-t border-abu-sedang pt-3 text-sm">
                <span className="font-semibold text-teks-utama">Total bayar</span>
                <span className="font-mono-angka font-bold">{formatRupiah(ringkasan.totalBayar)}</span>
              </div>
            </PremiumCard>

            <JadwalCicilanList jadwal={ringkasan.jadwalCicilan} compact />

            <TombolUtama
              fullWidth
              variant="pill"
              disabled={!kelayakan.layak}
              onClick={handleLanjutStep2}
            >
              Lanjut ke Tujuan →
            </TombolUtama>

            <p className="text-center text-xs text-abu-teks">
              Pengajuan diproses 1–3 hari kerja. Suku bunga mengikuti keputusan rapat anggota.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-5">
            <h2 className="text-lg font-bold text-teks-utama">Tujuan Pinjaman</h2>
            <PremiumCard accent className="space-y-2 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-abu-teks">Jumlah</span>
                <span className="font-mono-angka font-bold">{formatRupiah(jumlahEfektif)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-abu-teks">Cicilan/bulan</span>
                <span className="font-mono-angka font-bold text-merah-utama">
                  {formatRupiah(ringkasan.cicilanPerBulan)}
                </span>
              </div>
            </PremiumCard>
            <PremiumCard className="p-4">
              <label htmlFor="tujuan" className="mb-2 block text-sm text-label">
                Jelaskan tujuan pinjaman (min. 10 karakter)
              </label>
              <textarea
                id="tujuan"
                rows={4}
                value={tujuan}
                onChange={(e) => {
                  setTujuan(e.target.value)
                  setTujuanError('')
                }}
                placeholder="Contoh: Modal pembelian bibit dan pupuk musim tanam"
                className="input-premium resize-none"
              />
              <p className="mt-1 text-xs text-teks-caption">{tujuan.trim().length}/10 karakter</p>
              {tujuanError && (
                <p className="mt-2 text-sm font-medium text-merah-utama" role="alert">
                  {tujuanError}
                </p>
              )}
            </PremiumCard>
            <div className="flex gap-3">
              <TombolSecondary fullWidth pill onClick={() => setStep(1)}>
                ← Kembali
              </TombolSecondary>
              <TombolUtama fullWidth variant="pill" onClick={handleLanjutStep3}>
                Lanjut →
              </TombolUtama>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-5">
            <h2 className="text-lg font-bold text-teks-utama">Konfirmasi Pengajuan</h2>
            <PremiumCard accent className="space-y-3 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Jumlah pinjaman</span>
                <span className="font-mono-angka font-bold">{formatRupiah(jumlahEfektif)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Tenor</span>
                <span className="font-semibold">{tenor} bulan</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Total bunga</span>
                <span className="font-mono-angka font-semibold">
                  {formatRupiah(ringkasan.totalBunga)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Cicilan per bulan</span>
                <span className="font-mono-angka font-bold text-merah-utama">
                  {formatRupiah(ringkasan.cicilanPerBulan)}
                </span>
              </div>
              <div className="border-t border-abu-sedang pt-3">
                <p className="text-sm text-abu-teks">Tujuan</p>
                <p className="mt-1 text-sm font-medium text-teks-utama">{tujuan}</p>
              </div>
            </PremiumCard>
            <JadwalCicilanList jadwal={ringkasan.jadwalCicilan} />
            <div className="flex gap-3">
              <TombolSecondary fullWidth pill onClick={() => setStep(2)}>
                ← Kembali
              </TombolSecondary>
              <TombolUtama fullWidth variant="pill" onClick={handleSubmit}>
                Kirim Pengajuan
              </TombolUtama>
            </div>
          </div>
        )}

        {step === 4 && hasilAjuan && (
          <div className="mt-6 space-y-5">
            <PremiumCard accent className="space-y-3 p-4 text-center">
              <span className="text-3xl" aria-hidden="true">
                ✓
              </span>
              <p className="font-bold text-teks-utama">Pengajuan Terkirim</p>
              <p className="font-mono-angka text-xs text-teks-caption">{hasilAjuan.noReferensi}</p>
              <p className="text-sm text-teks-caption">
                Pengurus akan menghubungi Anda dalam 1–3 hari kerja untuk verifikasi dan
                persetujuan pinjaman.
              </p>
            </PremiumCard>
            <TombolUtama fullWidth variant="pill" onClick={resetForm}>
              Ajukan Pinjaman Lain
            </TombolUtama>
          </div>
        )}

        <PinjamanRiwayatSection />
      </div>

      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  )
}
