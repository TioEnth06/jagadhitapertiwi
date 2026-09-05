import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PengajuanPinjaman, RingkasanPinjamanData } from '../types'
import { formatTanggalTransaksi, generateId, generateReferensi } from '../formatTanggal'
import { hitungPinjaman } from '../hitungPinjaman'

interface AjukanInput {
  jumlah: number
  tenor: number
  tujuan: string
  ringkasan: RingkasanPinjamanData
}

interface PinjamanState {
  pengajuan: PengajuanPinjaman[]
  ajukan: (input: AjukanInput) => PengajuanPinjaman
  updateStatus: (id: string, status: PengajuanPinjaman['status'], catatanPengurus?: string) => void
}

const ringkasanSeed1 = hitungPinjaman(2_000_000, 6, new Date('2025-01-10'))
const ringkasanSeed2 = hitungPinjaman(5_000_000, 12, new Date('2024-08-15'))
const ringkasanSeed3 = hitungPinjaman(1_500_000, 3, new Date('2024-11-20'))

const seedPengajuan: PengajuanPinjaman[] = [
  {
    id: 'pin-seed-1',
    noReferensi: 'PIN-20250110-A1B2',
    jumlah: 2_000_000,
    tenor: 6,
    tujuan: 'Modal pembelian bibit padi musim tanam',
    ringkasan: ringkasanSeed1,
    status: 'menunggu',
    tanggal: '10 Jan 2025',
  },
  {
    id: 'pin-seed-2',
    noReferensi: 'PIN-20240815-C3D4',
    jumlah: 5_000_000,
    tenor: 12,
    tujuan: 'Renovasi gudang penyimpanan hasil panen jagung',
    ringkasan: ringkasanSeed2,
    status: 'cair',
    tanggal: '15 Agu 2024',
    catatanPengurus: 'Pencairan ke rekening BRI an. Sukirman.',
  },
  {
    id: 'pin-seed-3',
    noReferensi: 'PIN-20241120-E5F6',
    jumlah: 1_500_000,
    tenor: 3,
    tujuan: 'Pembelian alat pertanian ringan (cangkul, sprayer)',
    ringkasan: ringkasanSeed3,
    status: 'lunas',
    tanggal: '20 Nov 2024',
  },
]

export const usePinjamanStore = create<PinjamanState>()(
  persist(
    (set, get) => ({
      pengajuan: [...seedPengajuan],

      ajukan: (input) => {
        const baru: PengajuanPinjaman = {
          id: generateId('pin'),
          noReferensi: generateReferensi('PIN'),
          jumlah: input.jumlah,
          tenor: input.tenor,
          tujuan: input.tujuan,
          ringkasan: input.ringkasan,
          status: 'menunggu',
          tanggal: formatTanggalTransaksi(),
        }

        set({ pengajuan: [baru, ...get().pengajuan] })
        return baru
      },

      updateStatus: (id, status, catatanPengurus) =>
        set((s) => ({
          pengajuan: s.pengajuan.map((p) =>
            p.id === id ? { ...p, status, catatanPengurus: catatanPengurus ?? p.catatanPengurus } : p,
          ),
        })),
    }),
    {
      name: 'jdp-pinjaman',
      merge: (persisted, current) => {
        const saved = persisted as Partial<PinjamanState> | undefined
        if (!saved?.pengajuan?.length) {
          return current
        }
        const pengajuan = saved.pengajuan.map((p) => ({
          ...p,
          noReferensi: p.noReferensi ?? `PIN-LEGACY-${p.id.slice(-6)}`,
          ringkasan: p.ringkasan?.jadwalCicilan?.length
            ? {
                ...p.ringkasan,
                biayaAdmin: p.ringkasan.biayaAdmin ?? 0,
              }
            : hitungPinjaman(p.jumlah, p.tenor),
        }))
        return { ...current, ...saved, pengajuan }
      },
    },
  ),
)
