import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loiInboxSeed, pendingAnggota, statistikKoperasi } from '../data/mockData'
import type { LoiRequest, PendingAnggota } from '../types'
import { formatTanggalTransaksi, generateId, generateReferensi } from '../formatTanggal'

interface LoiInput {
  perusahaan: string
  kontak: string
  telepon: string
  produk: string
  volume: string
  lokasi: string
  tanggalButuh: string
  catatan?: string
  sumber?: 'landing' | 'form'
}

interface AdminState {
  stats: typeof statistikKoperasi
  pendingAnggota: PendingAnggota[]
  loiInbox: LoiRequest[]
  setujuiAnggota: (id: string) => void
  tolakAnggota: (id: string) => void
  submitLoi: (input: LoiInput) => LoiRequest
  updateLoiStatus: (id: string, status: LoiRequest['status']) => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      stats: { ...statistikKoperasi },
      pendingAnggota: [...pendingAnggota],
      loiInbox: [...loiInboxSeed],

      setujuiAnggota: (id) =>
        set((s) => ({
          pendingAnggota: s.pendingAnggota.filter((a) => a.id !== id),
        })),

      tolakAnggota: (id) =>
        set((s) => ({
          pendingAnggota: s.pendingAnggota.filter((a) => a.id !== id),
        })),

      submitLoi: (input) => {
        const loi: LoiRequest = {
          id: generateId('loi'),
          ref: generateReferensi('LOI'),
          perusahaan: input.perusahaan,
          kontak: input.kontak,
          telepon: input.telepon,
          produk: input.produk,
          volume: input.volume,
          lokasi: input.lokasi,
          tanggalButuh: input.tanggalButuh,
          catatan: input.catatan,
          status: 'baru',
          tanggal: formatTanggalTransaksi(),
          sumber: input.sumber ?? 'form',
        }
        set({ loiInbox: [loi, ...get().loiInbox] })
        return loi
      },

      updateLoiStatus: (id, status) =>
        set((s) => ({
          loiInbox: s.loiInbox.map((l) => (l.id === id ? { ...l, status } : l)),
        })),
    }),
    {
      name: 'jdp-admin',
      merge: (persisted, current) => {
        const saved = persisted as Partial<AdminState> | undefined
        if (!saved) return current
        return {
          ...current,
          ...saved,
          pendingAnggota: saved.pendingAnggota?.length
            ? saved.pendingAnggota
            : current.pendingAnggota,
          loiInbox: saved.loiInbox?.length ? saved.loiInbox : current.loiInbox,
        }
      },
    },
  ),
)
