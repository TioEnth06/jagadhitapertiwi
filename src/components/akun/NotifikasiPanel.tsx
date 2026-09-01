import { useState } from 'react'
import { notifikasiDefault } from '../../data/mockData'
import PremiumCard from '../ui/PremiumCard'
import TombolUtama from '../ui/TombolUtama'

const notifLabels: Record<keyof typeof notifikasiDefault, { label: string; desc: string }> = {
  pengumuman: {
    label: 'Pengumuman Koperasi',
    desc: 'Rapat anggota, kebijakan baru, dan info penting',
  },
  transaksi: {
    label: 'Transaksi Simpanan',
    desc: 'Setoran, penarikan, dan mutasi saldo',
  },
  pinjaman: {
    label: 'Status Pinjaman',
    desc: 'Pengajuan, persetujuan, dan jadwal cicilan',
  },
  voting: {
    label: 'Suara Anggota',
    desc: 'Proposal baru dan deadline voting',
  },
  pasar: {
    label: 'Pasar Produk',
    desc: 'Pesanan baru dan promo produk tani',
  },
}

export default function NotifikasiPanel() {
  const [settings, setSettings] = useState(notifikasiDefault)
  const [saved, setSaved] = useState(false)

  const toggle = (key: keyof typeof notifikasiDefault) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <p className="text-base text-abu-teks">
        Pilih jenis notifikasi yang ingin Anda terima di aplikasi.
      </p>
      <PremiumCard className="divide-y divide-abu-sedang">
        {(Object.keys(notifLabels) as (keyof typeof notifikasiDefault)[]).map((key) => (
          <label
            key={key}
            className="flex min-h-[72px] cursor-pointer items-center justify-between gap-4 px-4 py-3"
          >
            <div>
              <p className="font-semibold text-teks-utama">{notifLabels[key].label}</p>
              <p className="text-sm text-teks-caption">{notifLabels[key].desc}</p>
            </div>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={() => toggle(key)}
              className="h-6 w-6 shrink-0 accent-merah-utama"
              aria-label={`Notifikasi ${notifLabels[key].label}`}
            />
          </label>
        ))}
      </PremiumCard>
      <TombolUtama fullWidth variant="pill" onClick={handleSave}>
        {saved ? 'Tersimpan ✓' : 'Simpan Pengaturan'}
      </TombolUtama>
    </>
  )
}
