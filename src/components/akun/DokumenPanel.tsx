import { Download } from 'lucide-react'
import { dokumenAnggota } from '../../data/mockData'
import PremiumCard from '../ui/PremiumCard'
import DokumenThumbnail from '../visual/DokumenThumbnail'
import DemoToast from '../ui/DemoToast'
import { useDemoToast } from '../../hooks/useDemoToast'

export default function DokumenPanel() {
  const { message, showToast, dismiss } = useDemoToast()

  return (
    <>
      <p className="text-base text-abu-teks">
        Dokumen resmi keanggotaan Anda yang tersimpan di koperasi.
      </p>
      <div className="space-y-3">
        {dokumenAnggota.map((doc) => (
          <PremiumCard key={doc.id} className="p-4">
            <div className="flex items-start gap-4">
              <DokumenThumbnail jenis={doc.jenis} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-teks-utama">{doc.nama}</p>
                <p className="mt-0.5 text-sm text-abu-teks">
                  {doc.jenis} · Terbit {doc.tanggalTerbit}
                </p>
                <span className="mt-2 inline-block rounded-full bg-hijau-sukses/10 px-2 py-0.5 text-xs font-semibold text-hijau-sukses">
                  {doc.status} ✓
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast(`${doc.nama} sedang diunduh (demo)`)}
              className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border-2 border-merah-utama text-sm font-semibold text-merah-utama hover:bg-merah-muda"
            >
              <Download size={18} />
              Unduh Dokumen
            </button>
          </PremiumCard>
        ))}
      </div>
      <DemoToast message={message} onDismiss={dismiss} />
    </>
  )
}
