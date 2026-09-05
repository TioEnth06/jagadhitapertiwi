import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { produk as produkSeed } from '../data/mockData'
import type { OrderItem, OrderRequest, Produk } from '../types'
import { formatTanggalTransaksi, generateId } from '../formatTanggal'

interface RequestOrderInput {
  produk: Produk
  qty: number
  catatan?: string
}

interface PasarState {
  produk: Produk[]
  orders: OrderRequest[]
  requestOrder: (input: RequestOrderInput) => { ok: true; order: OrderRequest } | { ok: false; error: string }
}

export const usePasarStore = create<PasarState>()(
  persist(
    (set, get) => ({
      produk: produkSeed.map((p) => ({ ...p })),
      orders: [],

      requestOrder: (input) => {
        const { produk, qty, catatan } = input

        if (qty < 1) {
          return { ok: false, error: 'Jumlah minimal 1.' }
        }

        const itemProduk = get().produk.find((p) => p.id === produk.id) ?? produk

        if (qty > itemProduk.stok) {
          return { ok: false, error: `Stok tersedia hanya ${itemProduk.stok} ${itemProduk.stokSatuan}.` }
        }

        const item: OrderItem = {
          produkId: itemProduk.id,
          nama: itemProduk.nama,
          harga: itemProduk.harga,
          satuan: itemProduk.satuan,
          qty,
          subtotal: itemProduk.harga * qty,
        }

        const order: OrderRequest = {
          id: generateId('ord'),
          items: [item],
          total: item.subtotal,
          catatan,
          status: 'menunggu',
          tanggal: formatTanggalTransaksi(),
          penjual: itemProduk.penjual,
        }

        set({
          produk: get().produk.map((p) =>
            p.id === itemProduk.id ? { ...p, stok: Math.max(0, p.stok - qty) } : p,
          ),
          orders: [order, ...get().orders],
        })
        return { ok: true, order }
      },
    }),
    {
      name: 'jdp-pasar',
      merge: (persisted, current) => {
        const saved = persisted as Partial<PasarState> | undefined
        if (!saved) return current
        return {
          ...current,
          produk: saved.produk?.length ? saved.produk : current.produk,
          orders: saved.orders ?? current.orders,
        }
      },
    },
  ),
)
