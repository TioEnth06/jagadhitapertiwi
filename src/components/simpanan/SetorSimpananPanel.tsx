import { useState } from 'react'
import {
  estimasiShuTahunan,
  MIN_SETOR_SUKARELA,
  proyeksiSaldoSetelah,
  useSimpananStore,
} from '../../stores/useSimpananStore'
import type { JenisSimpanan, MetodeBayar } from '../../types'
import { formatRupiah } from '../../utils/formatRupiah'
import TransferInstruksiKoperasi from './TransferInstruksiKoperasi'
import TombolUtama from '../ui/TombolUtama'
import TombolSecondary from '../ui/TombolSecondary'
import PremiumCard from '../ui/PremiumCard'
import RingkasanNominal from '../ui/RingkasanNominal'
import StepIndicator from '../ui/StepIndicator'

const CHIP_SUKARELA = [100_000, 200_000, 500_000, 1_000_000]
const STEPS = ['Jenis', 'Nominal', 'Konfirmasi']

interface SetorSimpananPanelProps {
  onSuccess: (message: string) => void
  onClose: () => void
}

interface HasilSetor {
  referensi: string
  status: 'selesai' | 'menunggu'
}

export default function SetorSimpananPanel({ onSuccess, onClose }: SetorSimpananPanelProps) {
  const simpanan = useSimpananStore((s) => s.simpanan)
  const setor = useSimpananStore((s) => s.setor)

  const [step, setStep] = useState(1)
  const [jenis, setJenis] = useState<JenisSimpanan | null>(null)
  const [nominal, setNominal] = useState(MIN_SETOR_SUKARELA)
  const [metode, setMetode] = useState<MetodeBayar>('transfer')
  const [error, setError] = useState('')
  const [hasil, setHasil] = useState<HasilSetor | null>(null)

  const wajibTersedia = simpanan.wajibBulanIniStatus === 'BELUM'
  const proyeksi = jenis ? proyeksiSaldoSetelah(simpanan, jenis, nominal) : null

  const handlePilihJenis = (j: JenisSimpanan) => {
    setJenis(j)
    setError('')
    setNominal(j === 'wajib' ? simpanan.wajibBulanIni : 200_000)
    setStep(2)
  }

  const handleKonfirmasi = () => {
    if (!jenis) return
    const result = setor({ jenis, nominal, metode })
    if (!result.ok) {
      setError(result.error)
      return
    }
    setHasil({ referensi: result.referensi, status: result.status })
    setStep(4)
  }

  const handleSelesai = () => {
    if (!jenis || !hasil) return
    if (hasil.status === 'menunggu') {
      onSuccess(`Setoran tercatat (${hasil.referensi}). Menunggu verifikasi transfer.`)
    } else {
      onSuccess(
        jenis === 'wajib'
          ? 'Setoran simpanan wajib berhasil dicatat!'
          : 'Setoran simpanan sukarela berhasil dicatat!',
      )
    }
    onClose()
  }

  const handleLanjutKeKonfirmasi = () => {
    setError('')
    if (
      jenis === 'sukarela' &&
      (nominal < MIN_SETOR_SUKARELA || !Number.isFinite(nominal))
    ) {
      setError(`Minimal setor sukarela ${formatRupiah(MIN_SETOR_SUKARELA)}.`)
      return
    }
    setStep(3)
  }

  if (step === 4 && hasil && jenis) {
    return (
      <div className="space-y-4">
        <PremiumCard accent className="space-y-3 p-4 text-center">
          <span className="text-3xl" aria-hidden="true">
            {hasil.status === 'selesai' ? '✓' : '⏳'}
          </span>
          <p className="font-bold text-teks-utama">
            {hasil.status === 'selesai' ? 'Setoran Berhasil' : 'Menunggu Verifikasi'}
          </p>
          <p className="font-mono-angka text-xs text-teks-caption">{hasil.referensi}</p>
          <RingkasanNominal label="Nominal" nominal={nominal} highlight />
          <p className="text-xs text-teks-caption">
            {hasil.status === 'selesai'
              ? 'Saldo simpanan Anda sudah diperbarui.'
              : 'Saldo akan bertambah setelah transfer dikonfirmasi pengurus (1×24 jam).'}
          </p>
        </PremiumCard>

        {metode === 'transfer' && hasil.status === 'menunggu' && (
          <TransferInstruksiKoperasi nominal={nominal} referensi={hasil.referensi} />
        )}

        <TombolUtama fullWidth variant="pill" onClick={handleSelesai}>
          Selesai
        </TombolUtama>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <StepIndicator steps={STEPS} current={step} />

      {step === 1 && (
        <>
          <p className="text-sm text-abu-teks">Pilih jenis simpanan yang ingin Anda setor.</p>
          <button
            type="button"
            disabled={!wajibTersedia}
            onClick={() => handlePilihJenis('wajib')}
            className={`premium-card w-full p-4 text-left transition-shadow ${
              wajibTersedia ? 'hover:shadow-md' : 'opacity-50'
            }`}
          >
            <p className="font-bold text-teks-utama">Simpanan Wajib Bulan Ini</p>
            <p className="mt-1 text-sm text-teks-caption">
              {formatRupiah(simpanan.wajibBulanIni)} —{' '}
              {wajibTersedia ? 'Belum lunas' : 'Sudah lunas ✓'}
            </p>
            <p className="mt-2 text-xs text-teks-caption">
              Wajib dibayar setiap bulan. Nominal tetap sesuai keputusan rapat anggota.
            </p>
          </button>
          <button
            type="button"
            onClick={() => handlePilihJenis('sukarela')}
            className="premium-card w-full p-4 text-left transition-shadow hover:shadow-md"
          >
            <p className="font-bold text-teks-utama">Simpanan Sukarela</p>
            <p className="mt-1 text-sm text-teks-caption">
              Minimal {formatRupiah(MIN_SETOR_SUKARELA)} · Bebas nominal
            </p>
            <p className="mt-2 text-xs text-teks-caption">
              Estimasi bagian SHU tahun ini ~{formatRupiah(estimasiShuTahunan(simpanan.sukarela + 200_000))}{' '}
              (6% dari saldo sukarela, simulasi).
            </p>
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <PremiumCard className="p-4 text-center">
            <p className="text-sm text-teks-caption">
              {jenis === 'wajib' ? 'Simpanan Wajib' : 'Simpanan Sukarela'}
            </p>
            {jenis === 'sukarela' ? (
              <>
                <input
                  type="number"
                  min={MIN_SETOR_SUKARELA}
                  step={10000}
                  value={nominal}
                  onChange={(e) => setNominal(Number(e.target.value))}
                  className="input-premium mt-2 text-center font-mono-angka text-lg font-bold"
                  aria-label="Nominal setor"
                />
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {CHIP_SUKARELA.map((v) => (
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
                </div>
              </>
            ) : (
              <p className="balance-amount mt-1 text-teks-utama">{formatRupiah(nominal)}</p>
            )}
          </PremiumCard>

          <div>
            <p className="mb-2 text-sm text-label">Metode pembayaran</p>
            <div className="grid grid-cols-2 gap-2">
              {(['transfer', 'tunai'] as MetodeBayar[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetode(m)}
                  className={`min-h-[48px] rounded-xl text-sm font-semibold ${
                    metode === m
                      ? 'bg-merah-utama text-white'
                      : 'premium-card text-teks-utama'
                  }`}
                >
                  {m === 'transfer' ? 'Transfer Bank' : 'Tunai di Kantor'}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-teks-caption">
              {metode === 'transfer'
                ? 'Saldo bertambah setelah transfer diverifikasi pengurus.'
                : 'Saldo langsung bertambah setelah konfirmasi petugas.'}
            </p>
          </div>

          {metode === 'transfer' && (
            <TransferInstruksiKoperasi nominal={nominal} />
          )}

          {error && (
            <p className="text-sm font-medium text-merah-utama" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <TombolSecondary fullWidth pill onClick={() => setStep(1)}>
              ← Kembali
            </TombolSecondary>
            <TombolUtama fullWidth variant="pill" onClick={handleLanjutKeKonfirmasi}>
              Lanjut →
            </TombolUtama>
          </div>
        </>
      )}

      {step === 3 && jenis && proyeksi && (
        <>
          <PremiumCard accent className="space-y-3 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-abu-teks">Jenis</span>
              <span className="font-semibold text-teks-utama">
                {jenis === 'wajib' ? 'Simpanan Wajib' : 'Simpanan Sukarela'}
              </span>
            </div>
            <RingkasanNominal label="Nominal setor" nominal={nominal} highlight />
            <div className="flex justify-between text-sm">
              <span className="text-abu-teks">Metode</span>
              <span className="font-semibold capitalize">
                {metode === 'transfer' ? 'Transfer Bank' : 'Tunai di Kantor'}
              </span>
            </div>
            <div className="border-t border-abu-sedang pt-3 text-sm">
              <p className="mb-2 font-semibold text-teks-utama">Proyeksi saldo setelah setor</p>
              <div className="flex justify-between">
                <span className="text-abu-teks">Total simpanan</span>
                <span className="font-mono-angka font-semibold">
                  {formatRupiah(
                    metode === 'tunai' ? proyeksi.total : simpanan.total,
                  )}
                  {metode === 'transfer' && (
                    <span className="ml-1 text-xs font-normal text-teks-caption">(setelah verifikasi)</span>
                  )}
                </span>
              </div>
              {jenis === 'wajib' && metode === 'tunai' && (
                <p className="mt-1 text-xs text-hijau-sukses">Status wajib bulan ini → LUNAS</p>
              )}
            </div>
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
              Konfirmasi Setor
            </TombolUtama>
          </div>
        </>
      )}
    </div>
  )
}
