import { useState } from 'react'
import { rekeningBank } from '../../data/mockData'
import { MIN_TARIK, useSimpananStore } from '../../stores/useSimpananStore'
import { formatRupiah } from '../../utils/formatRupiah'
import TombolUtama from '../ui/TombolUtama'
import TombolSecondary from '../ui/TombolSecondary'
import PremiumCard from '../ui/PremiumCard'
import RingkasanNominal from '../ui/RingkasanNominal'
import StepIndicator from '../ui/StepIndicator'

const STEPS = ['Info', 'Nominal', 'Konfirmasi']
const CHIP_TARIK = [500_000, 1_000_000, 2_000_000]

interface TarikSimpananPanelProps {
  onSuccess: (message: string) => void
  onClose: () => void
}

export default function TarikSimpananPanel({ onSuccess, onClose }: TarikSimpananPanelProps) {
  const simpanan = useSimpananStore((s) => s.simpanan)
  const tarik = useSimpananStore((s) => s.tarik)

  const [step, setStep] = useState(1)
  const [nominal, setNominal] = useState(Math.min(500_000, simpanan.sukarela))
  const [rekeningIdx, setRekeningIdx] = useState(0)
  const [error, setError] = useState('')
  const [referensi, setReferensi] = useState('')

  const rekening = rekeningBank[rekeningIdx]
  const saldoSetelah = simpanan.sukarela - nominal
  const biayaAdmin = 0

  const handleKonfirmasi = () => {
    const result = tarik({
      nominal,
      rekeningNomor: rekening.nomor,
      rekeningBank: rekening.bank,
    })
    if (!result.ok) {
      setError(result.error)
      return
    }
    setReferensi(result.referensi)
    setStep(4)
  }

  const handleSelesai = () => {
    onSuccess(
      `Penarikan ${referensi} diajukan. Dana diproses 1–3 hari kerja ke ${rekening.bank}.`,
    )
    onClose()
  }

  if (step === 4) {
    return (
      <div className="space-y-4">
        <PremiumCard accent className="space-y-3 p-4 text-center">
          <span className="text-3xl" aria-hidden="true">
            ⏳
          </span>
          <p className="font-bold text-teks-utama">Penarikan Diajukan</p>
          <p className="font-mono-angka text-xs text-teks-caption">{referensi}</p>
          <RingkasanNominal label="Nominal" nominal={nominal} highlight />
          <p className="text-xs text-teks-caption">
            Saldo sukarela sudah dikurangi. Transfer ke rekening tujuan dalam 1–3 hari kerja.
          </p>
        </PremiumCard>
        <PremiumCard className="space-y-2 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-teks-caption">Rekening tujuan</span>
            <span className="text-right font-semibold">
              {rekening.bank}
              <br />
              <span className="font-mono-angka text-xs">{rekening.nomor}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-teks-caption">Estimasi diterima</span>
            <span className="font-mono-angka font-bold text-merah-utama">
              {formatRupiah(nominal - biayaAdmin)}
            </span>
          </div>
        </PremiumCard>
        <TombolUtama fullWidth variant="pill" onClick={handleSelesai}>
          Selesai
        </TombolUtama>
      </div>
    )
  }

  if (simpanan.sukarela < MIN_TARIK) {
    return (
      <PremiumCard className="p-4">
        <p className="text-sm font-bold text-teks-utama">Penarikan belum tersedia</p>
        <p className="mt-2 text-sm text-teks-caption">
          Saldo sukarela Anda {formatRupiah(simpanan.sukarela)}. Minimal penarikan{' '}
          {formatRupiah(MIN_TARIK)}.
        </p>
      </PremiumCard>
    )
  }

  return (
    <div className="space-y-4">
      <StepIndicator steps={STEPS} current={step} />

      {step === 1 && (
        <>
          <PremiumCard large className="border-0 bg-gradient-to-br from-merah-gelap to-merah-utama p-4 text-white">
            <p className="text-sm text-on-merah-muted">Simpanan Sukarela Tersedia</p>
            <p className="balance-amount mt-1">{formatRupiah(simpanan.sukarela)}</p>
          </PremiumCard>
          <PremiumCard className="space-y-2 p-4 text-sm">
            <p className="font-bold text-teks-utama">Ketentuan penarikan</p>
            <ul className="list-inside list-disc space-y-1 text-teks-caption">
              <li>Hanya dari simpanan sukarela</li>
              <li>Minimal {formatRupiah(MIN_TARIK)} per transaksi</li>
              <li>Biaya admin: {formatRupiah(biayaAdmin)}</li>
              <li>Proses 1–3 hari kerja (Senin–Jumat)</li>
              <li>Simpanan pokok & wajib tidak dapat ditarik</li>
            </ul>
          </PremiumCard>
          <TombolUtama fullWidth variant="pill" onClick={() => setStep(2)}>
            Lanjut Penarikan →
          </TombolUtama>
        </>
      )}

      {step === 2 && (
        <>
          <PremiumCard className="p-4">
            <label htmlFor="nominalTarik" className="mb-2 block text-sm text-label">
              Nominal penarikan
            </label>
            <input
              id="nominalTarik"
              type="number"
              min={MIN_TARIK}
              max={simpanan.sukarela}
              step={10000}
              value={nominal}
              onChange={(e) => setNominal(Number(e.target.value))}
              className="input-premium font-mono-angka text-lg font-bold"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {CHIP_TARIK.filter((v) => v <= simpanan.sukarela).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setNominal(v)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    nominal === v
                      ? 'bg-merah-utama text-white'
                      : 'bg-abu-terang text-teks-utama'
                  }`}
                >
                  {formatRupiah(v)}
                </button>
              ))}
              {simpanan.sukarela >= MIN_TARIK && (
                <button
                  type="button"
                  onClick={() => setNominal(simpanan.sukarela)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    nominal === simpanan.sukarela
                      ? 'bg-merah-utama text-white'
                      : 'bg-abu-terang text-teks-utama'
                  }`}
                >
                  Tarik semua
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-teks-caption">
              Maks. {formatRupiah(simpanan.sukarela)} · Saldo setelah:{' '}
              <span className="font-mono-angka font-semibold">
                {nominal <= simpanan.sukarela
                  ? formatRupiah(saldoSetelah)
                  : '—'}
              </span>
            </p>
          </PremiumCard>

          <div>
            <p className="mb-2 text-sm text-label">Rekening tujuan</p>
            <div className="space-y-2">
              {rekeningBank.map((rek, i) => (
                <label
                  key={rek.nomor}
                  className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl px-4 ${
                    rekeningIdx === i
                      ? 'premium-card border-merah-utama bg-merah-muda ring-1 ring-merah-muda'
                      : 'premium-card'
                  }`}
                >
                  <input
                    type="radio"
                    name="rekening"
                    checked={rekeningIdx === i}
                    onChange={() => setRekeningIdx(i)}
                    className="h-5 w-5 accent-merah-utama"
                  />
                  <div>
                    <p className="font-semibold text-teks-utama">{rek.bank}</p>
                    <p className="font-mono-angka text-sm text-teks-caption">{rek.nomor}</p>
                    <p className="text-xs text-teks-caption">{rek.atasNama}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm font-medium text-merah-utama" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <TombolSecondary fullWidth pill onClick={() => setStep(1)}>
              ← Kembali
            </TombolSecondary>
            <TombolUtama
              fullWidth
              variant="pill"
              onClick={() => {
                setError('')
                if (nominal > simpanan.sukarela) {
                  setError('Nominal melebihi simpanan sukarela yang tersedia.')
                  return
                }
                if (nominal < MIN_TARIK) {
                  setError(`Minimal penarikan ${formatRupiah(MIN_TARIK)}.`)
                  return
                }
                setStep(3)
              }}
            >
              Lanjut →
            </TombolUtama>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <PremiumCard accent className="space-y-3 p-4">
            <RingkasanNominal label="Nominal penarikan" nominal={nominal} highlight />
            <div className="flex justify-between text-sm">
              <span className="text-abu-teks">Biaya admin</span>
              <span className="font-semibold">{formatRupiah(biayaAdmin)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-abu-teks">Diterima di rekening</span>
              <span className="font-mono-angka font-bold text-merah-utama">
                {formatRupiah(nominal - biayaAdmin)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-abu-teks">Rekening tujuan</span>
              <span className="text-right font-semibold">
                {rekening.bank}
                <br />
                <span className="font-mono-angka text-xs">{rekening.nomor}</span>
              </span>
            </div>
            <div className="border-t border-abu-sedang pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-abu-teks">Saldo sukarela setelah</span>
                <span className="font-mono-angka font-semibold">{formatRupiah(saldoSetelah)}</span>
              </div>
            </div>
            <p className="text-xs text-teks-caption">
              Penarikan diproses 1–3 hari kerja oleh pengurus koperasi.
            </p>
          </PremiumCard>

          {error && (
            <p className="text-sm font-medium text-merah-utama" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <TombolSecondary fullWidth pill onClick={() => setStep(2)}>
              ← Kembali
            </TombolSecondary>
            <TombolUtama fullWidth variant="pill" onClick={handleKonfirmasi}>
              Konfirmasi Penarikan
            </TombolUtama>
          </div>
        </>
      )}
    </div>
  )
}
