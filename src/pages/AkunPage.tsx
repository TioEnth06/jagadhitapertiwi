import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText,
  CreditCard,
  Bell,
  Lock,
  Phone,
  HelpCircle,
  Star,
  ChevronRight,
} from 'lucide-react'
import { useAuthStore } from '../stores/useAuthStore'
import KartuAnggotaDigital from '../components/ui/KartuAnggotaDigital'
import TombolSecondary from '../components/ui/TombolSecondary'
import PageHeader from '../components/ui/PageHeader'
import PremiumCard from '../components/ui/PremiumCard'
import StatDisplay from '../components/ui/StatDisplay'
import AkunSubPanel from '../components/akun/AkunSubPanel'
import DokumenPanel from '../components/akun/DokumenPanel'
import RekeningPanel from '../components/akun/RekeningPanel'
import NotifikasiPanel from '../components/akun/NotifikasiPanel'
import GantiPinPanel from '../components/akun/GantiPinPanel'
import HubungiPanel from '../components/akun/HubungiPanel'
import BantuanPanel from '../components/akun/BantuanPanel'
import type { AkunMenuView } from '../types'

const menuItems: {
  id: AkunMenuView
  icon: typeof FileText
  label: string
  emoji: string
  desc?: string
}[] = [
  { id: 'dokumen', icon: FileText, label: 'Dokumen Saya', emoji: '📄', desc: 'KTP, Sertifikat Anggota' },
  { id: 'rekening', icon: CreditCard, label: 'Rekening Bank Terdaftar', emoji: '💳' },
  { id: 'notifikasi', icon: Bell, label: 'Pengaturan Notifikasi', emoji: '🔔' },
  { id: 'ganti-pin', icon: Lock, label: 'Ganti PIN', emoji: '🔒' },
  { id: 'hubungi', icon: Phone, label: 'Hubungi Pengurus', emoji: '📞' },
  { id: 'bantuan', icon: HelpCircle, label: 'Bantuan & FAQ', emoji: '❓' },
]

const panelTitles: Record<Exclude<AkunMenuView, 'menu'>, string> = {
  dokumen: 'Dokumen Saya',
  rekening: 'Rekening Bank',
  notifikasi: 'Pengaturan Notifikasi',
  'ganti-pin': 'Ganti PIN',
  hubungi: 'Hubungi Pengurus',
  bantuan: 'Bantuan & FAQ',
}

export default function AkunPage() {
  const navigate = useNavigate()
  const { anggota, logout } = useAuthStore()
  const [view, setView] = useState<AkunMenuView>('menu')

  if (!anggota) return null

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (view !== 'menu') {
    const title = panelTitles[view]
    return (
      <AkunSubPanel title={title} onBack={() => setView('menu')}>
        {view === 'dokumen' && <DokumenPanel />}
        {view === 'rekening' && <RekeningPanel />}
        {view === 'notifikasi' && <NotifikasiPanel />}
        {view === 'ganti-pin' && <GantiPinPanel />}
        {view === 'hubungi' && <HubungiPanel />}
        {view === 'bantuan' && <BantuanPanel />}
      </AkunSubPanel>
    )
  }

  return (
    <div className="space-y-5 pb-4">
      <PageHeader eyebrow="Profil" title="Akun Saya" />

      <div className="space-y-4 px-4">
        <div className="overflow-hidden rounded-3xl shadow-xl">
          <KartuAnggotaDigital anggota={anggota} />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <PremiumCard className="p-3">
            <StatDisplay value={anggota.lamaBergabung.split(' ')[0]} label="Tahun" compact />
          </PremiumCard>
          <PremiumCard className="p-3">
            <StatDisplay value={`${anggota.totalTransaksi}`} label="Transaksi" compact />
          </PremiumCard>
          <PremiumCard className="p-3 text-center">
            <p className="font-mono-angka text-2xl font-bold text-teks-utama">{anggota.skorKredit}</p>
            <p className="mt-1 text-sm font-semibold text-abu-teks">Skor Kredit</p>
            <div className="mt-1 flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={
                    i < anggota.skorBintang
                      ? 'fill-kuning-warning text-kuning-warning'
                      : 'text-abu-sedang'
                  }
                  aria-hidden="true"
                />
              ))}
            </div>
          </PremiumCard>
        </div>

        <div className="space-y-2">
          {menuItems.map(({ id, label, emoji, desc }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className="premium-card flex min-h-[52px] w-full items-center gap-4 px-4 py-3 text-left transition-shadow hover:shadow-md"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-merah-muda text-lg"
                aria-hidden="true"
              >
                {emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-teks-utama">{label}</p>
                {desc && <p className="text-sm text-abu-teks">{desc}</p>}
              </div>
              <ChevronRight size={20} className="shrink-0 text-abu-teks" aria-hidden="true" />
            </button>
          ))}
        </div>

        <TombolSecondary
          fullWidth
          pill
          className="!border-merah-utama !text-merah-utama"
          onClick={handleLogout}
        >
          Keluar dari Akun
        </TombolSecondary>
      </div>
    </div>
  )
}
