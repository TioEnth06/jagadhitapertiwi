import { CreditCard, Star } from 'lucide-react'
import { rekeningBank } from '../../data/mockData'
import PremiumCard from '../ui/PremiumCard'
import DemoToast from '../ui/DemoToast'
import { useDemoToast } from '../../hooks/useDemoToast'

const bankColors: Record<string, string> = {
  'Bank BRI': 'from-blue-600 to-blue-800',
  'Bank Mandiri': 'from-yellow-500 to-yellow-700',
}

export default function RekeningPanel() {
  const { message, showToast, dismiss } = useDemoToast()

  return (
    <>
      <p className="text-base text-abu-teks">
        Rekening bank terdaftar untuk pencairan pinjaman dan penarikan simpanan.
      </p>
      <div className="space-y-3">
        {rekeningBank.map((rek) => (
          <PremiumCard key={rek.nomor} className="overflow-hidden">
            <div
              className={`bg-gradient-to-r ${bankColors[rek.bank] ?? 'from-merah-gelap to-merah-utama'} px-4 py-3 text-white`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard size={20} aria-hidden="true" />
                  <p className="font-bold">{rek.bank}</p>
                </div>
                {rek.utama && (
                  <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
                    <Star size={10} className="fill-white" />
                    Utama
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-on-merah-muted">{rek.cabang}</p>
            </div>
            <div className="p-4">
              <p className="font-mono-angka text-lg font-bold text-teks-utama">{rek.nomor}</p>
              <p className="mt-1 text-sm text-abu-teks">a.n. {rek.atasNama}</p>
            </div>
          </PremiumCard>
        ))}
      </div>
      <button
        type="button"
        onClick={() => showToast('Hubungi pengurus untuk menambah rekening baru')}
        className="min-h-[52px] w-full rounded-full border-2 border-dashed border-abu-sedang text-base font-semibold text-abu-teks hover:border-merah-utama hover:text-merah-utama"
      >
        + Tambah Rekening Baru
      </button>
      <p className="text-sm text-abu-teks">
        Perubahan rekening harus diverifikasi pengurus di kantor koperasi.
      </p>
      <DemoToast message={message} onDismiss={dismiss} />
    </>
  )
}
