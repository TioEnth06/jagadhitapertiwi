import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { korporatProfile, purchaseOrdersSeed } from '../data/mockData'
import type { KorporatProfile, PurchaseOrder } from '../types'
import { formatTanggalTransaksi, generateId, generateReferensi } from '../formatTanggal'

interface BuatPOInput {
  produk: string
  penjual: string
  volume: number
  satuan: string
  hargaSatuan: number
  tanggal: string
  lokasi: string
  catatan?: string
}

interface B2BState {
  profile: KorporatProfile
  purchaseOrders: PurchaseOrder[]
  buatPO: (input: BuatPOInput) => PurchaseOrder
}

export const useB2BStore = create<B2BState>()(
  persist(
    (set, get) => ({
      profile: { ...korporatProfile },
      purchaseOrders: [...purchaseOrdersSeed],

      buatPO: (input) => {
        const total = input.volume * input.hargaSatuan
        const po: PurchaseOrder = {
          id: generateId('po'),
          ref: generateReferensi('PO'),
          produk: input.produk,
          penjual: input.penjual,
          volume: input.volume,
          satuan: input.satuan,
          hargaSatuan: input.hargaSatuan,
          total,
          feePersen: 1.5,
          tanggal: formatTanggalTransaksi(),
          lokasi: input.lokasi,
          catatan: input.catatan,
          status: 'pending',
        }
        set({ purchaseOrders: [po, ...get().purchaseOrders] })
        return po
      },
    }),
    {
      name: 'jdp-b2b',
      merge: (persisted, current) => {
        const saved = persisted as Partial<B2BState> | undefined
        if (!saved) return current
        return {
          ...current,
          ...saved,
          profile: saved.profile ?? current.profile,
          purchaseOrders: saved.purchaseOrders?.length
            ? saved.purchaseOrders
            : current.purchaseOrders,
        }
      },
    },
  ),
)
