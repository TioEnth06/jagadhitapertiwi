import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { proposalsAktif, proposalsSelesai } from '../data/mockData'
import ProgressVoting from '../components/ui/ProgressVoting'
import TombolUtama from '../components/ui/TombolUtama'
import TombolSecondary from '../components/ui/TombolSecondary'
import PageHeader from '../components/ui/PageHeader'
import PremiumCard from '../components/ui/PremiumCard'

type VoteChoice = 'setuju' | 'tidak' | 'abstain' | null

export default function SuaraAnggotaPage() {
  const [vote, setVote] = useState<VoteChoice>(null)
  const [riwayatOpen, setRiwayatOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  const aktif = proposalsAktif[0]
  const akanDatang = proposalsAktif[1]

  const voteLabel = {
    setuju: 'Setuju',
    tidak: 'Tidak Setuju',
    abstain: 'Abstain',
  }

  return (
    <div className="space-y-5 pb-4">
      <PageHeader
        eyebrow="Tata Kelola"
        title="Suara Anggota"
        subtitle="Ikut menentukan arah koperasi kita bersama"
      />

      <div className="space-y-4 px-4">
        <PremiumCard className="p-5">
          <span className="inline-block rounded-full bg-kuning-warning/20 px-3 py-1 text-xs font-bold text-kuning-warning">
            Sedang Berlangsung
          </span>
          <h2 className="mt-3 text-lg font-bold text-teks-utama">{aktif.judul}</h2>
          <p className="mt-2 text-base text-abu-teks leading-relaxed">{aktif.deskripsi}</p>
          <p className="mt-3 text-sm font-semibold text-teks-utama">{aktif.deadline}</p>

          {aktif.setuju !== undefined &&
            aktif.tidakSetuju !== undefined &&
            aktif.abstain !== undefined &&
            aktif.totalAnggota !== undefined && (
              <div className="mt-4">
                <ProgressVoting
                  setuju={aktif.setuju}
                  tidakSetuju={aktif.tidakSetuju}
                  abstain={aktif.abstain}
                  total={aktif.totalAnggota}
                />
              </div>
            )}

          {vote ? (
            <p className="mt-4 rounded-xl bg-merah-muda px-4 py-3 text-sm font-semibold text-merah-utama">
              Anda sudah memilih: {voteLabel[vote]} ✓
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <TombolUtama
                variant="pill"
                className="!min-h-[44px] !px-2 !text-xs"
                onClick={() => setVote('setuju')}
              >
                Setuju
              </TombolUtama>
              <TombolSecondary
                pill
                className="!min-h-[44px] !px-2 !text-xs"
                onClick={() => setVote('tidak')}
              >
                Tidak Setuju
              </TombolSecondary>
              <TombolSecondary
                pill
                variant="outline-abu"
                className="!min-h-[44px] !px-2 !text-xs"
                onClick={() => setVote('abstain')}
              >
                Abstain
              </TombolSecondary>
            </div>
          )}
        </PremiumCard>

        <PremiumCard className="p-5">
          <span className="inline-block rounded-full bg-abu-terang px-3 py-1 text-xs font-bold text-teks-caption">
            Akan Datang
          </span>
          <h2 className="mt-3 text-lg font-bold text-teks-utama">{akanDatang.judul}</h2>
          <p className="mt-2 text-base text-abu-teks">{akanDatang.deskripsi}</p>
          <p className="mt-3 text-sm font-semibold text-teks-utama">{akanDatang.mulai}</p>
          <TombolSecondary pill className="mt-4" onClick={() => setDetailOpen(!detailOpen)}>
            {detailOpen ? 'Sembunyikan Detail' : 'Lihat Detail'}
          </TombolSecondary>
          {detailOpen && (
            <div className="mt-4 rounded-xl bg-abu-terang p-4 text-sm text-teks-utama leading-relaxed">
              Proposal ini akan dibuka untuk voting setelah rapat pengurus. Anggota akan
              menerima notifikasi saat voting dimulai.
            </div>
          )}
        </PremiumCard>

        <div>
          <button
            type="button"
            onClick={() => setRiwayatOpen(!riwayatOpen)}
            className="premium-card flex w-full min-h-[52px] items-center justify-between px-5 py-3 text-left font-semibold text-teks-utama"
            aria-expanded={riwayatOpen}
          >
            3 Proposal Selesai
            {riwayatOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {riwayatOpen && (
            <div className="mt-2 space-y-2">
              {proposalsSelesai.map((p) => (
                <PremiumCard key={p.id} className="px-5 py-4">
                  <p className="font-semibold text-teks-utama">
                    {p.judul} — {p.hasil} ✓ ({p.bulan})
                  </p>
                </PremiumCard>
              ))}
            </div>
          )}
        </div>

        <p className="premium-card p-4 text-base text-abu-teks leading-relaxed">
          Setiap anggota aktif berhak 1 suara. Keputusan sah bila dihadiri 50%+1 anggota.
        </p>
      </div>
    </div>
  )
}
