import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { simpanan as simpananSeed, transaksi as transaksiSeed } from '../data/mockData'
import type { PenarikanInput, SetoranInput, Simpanan, Transaksi } from '../types'
import { formatTanggalTransaksi, generateId, generateReferensi } from '../utils/formatTanggal'

export const MIN_SETOR_SUKARELA = 10_000
export const MIN_TARIK = 50_000
export const ESTIMASI_SHU_SUKARELA = 0.06

interface SetorResult {
  ok: true
  referensi: string
  status: 'selesai' | 'menunggu'
}

interface TarikResult {
  ok: true
  referensi: string
}

interface SimpananState {
  simpanan: Simpanan
  transaksi: Transaksi[]
  setor: (input: SetoranInput) => SetorResult | { ok: false; error: string }
  tarik: (input: PenarikanInput) => TarikResult | { ok: false; error: string }
}

function createTransaksi(
  keterangan: string,
  nominal: number,
  tipe: 'masuk' | 'keluar',
  extra?: Partial<Transaksi>,
): Transaksi {
  return {
    id: generateId('trx'),
    tanggal: formatTanggalTransaksi(),
    keterangan,
    nominal,
    tipe,
    ...extra,
  }
}

export const useSimpananStore = create<SimpananState>()(
  persist(
    (set, get) => ({
      simpanan: { ...simpananSeed },
      transaksi: [...transaksiSeed],

      setor: (input) => {
        const { simpanan, transaksi } = get()
        const referensi = generateReferensi('STR')
        const status = input.metode === 'transfer' ? 'menunggu' : 'selesai'
        const metodeLabel = input.metode === 'transfer' ? 'Transfer' : 'Tunai'

        if (input.jenis === 'wajib') {
          if (simpanan.wajibBulanIniStatus === 'LUNAS') {
            return {
              ok: false,
              error: 'Simpanan wajib bulan ini sudah lunas. Pilih setor sukarela.',
            }
          }
          if (input.nominal !== simpanan.wajibBulanIni) {
            return {
              ok: false,
              error: `Nominal wajib harus ${simpanan.wajibBulanIni.toLocaleString('id-ID')}.`,
            }
          }

          const updated: Simpanan =
            status === 'selesai'
              ? {
                  ...simpanan,
                  total: simpanan.total + input.nominal,
                  wajib: simpanan.wajib + input.nominal,
                  wajibBulanIniStatus: 'LUNAS',
                }
              : simpanan

          set({
            simpanan: updated,
            transaksi: [
              createTransaksi(
                `Setor Simpanan Wajib — ${metodeLabel}`,
                input.nominal,
                'masuk',
                {
                  status,
                  referensi,
                  jenisSimpanan: 'wajib',
                  metode: input.metode,
                },
              ),
              ...transaksi,
            ],
          })
          return { ok: true, referensi, status }
        }

        if (input.nominal < MIN_SETOR_SUKARELA || !Number.isFinite(input.nominal)) {
          return {
            ok: false,
            error: `Minimal setor sukarela Rp ${MIN_SETOR_SUKARELA.toLocaleString('id-ID')}.`,
          }
        }

        const updated: Simpanan =
          status === 'selesai'
            ? {
                ...simpanan,
                total: simpanan.total + input.nominal,
                sukarela: simpanan.sukarela + input.nominal,
              }
            : simpanan

        set({
          simpanan: updated,
          transaksi: [
            createTransaksi(
              `Setor Simpanan Sukarela — ${metodeLabel}`,
              input.nominal,
              'masuk',
              {
                status,
                referensi,
                jenisSimpanan: 'sukarela',
                metode: input.metode,
              },
            ),
            ...transaksi,
          ],
        })
        return { ok: true, referensi, status }
      },

      tarik: (input) => {
        const { simpanan, transaksi } = get()
        const referensi = generateReferensi('TAR')

        if (input.nominal < MIN_TARIK || !Number.isFinite(input.nominal)) {
          return {
            ok: false,
            error: `Minimal penarikan Rp ${MIN_TARIK.toLocaleString('id-ID')}.`,
          }
        }

        if (input.nominal > simpanan.sukarela) {
          return {
            ok: false,
            error: 'Nominal melebihi simpanan sukarela yang tersedia.',
          }
        }

        const updated: Simpanan = {
          ...simpanan,
          total: simpanan.total - input.nominal,
          sukarela: simpanan.sukarela - input.nominal,
        }

        set({
          simpanan: updated,
          transaksi: [
            createTransaksi(
              `Penarikan Sukarela → ${input.rekeningBank} ${input.rekeningNomor}`,
              input.nominal,
              'keluar',
              {
                status: 'diproses',
                referensi,
              },
            ),
            ...transaksi,
          ],
        })
        return { ok: true, referensi }
      },
    }),
    {
      name: 'jdp-simpanan',
      merge: (persisted, current) => {
        const saved = persisted as Partial<SimpananState> | undefined
        if (!saved?.simpanan) {
          return current
        }
        return {
          ...current,
          ...saved,
          simpanan: saved.simpanan ?? current.simpanan,
          transaksi: saved.transaksi?.length ? saved.transaksi : current.transaksi,
        }
      },
    },
  ),
)

export function proyeksiSaldoSetelah(
  simpanan: Simpanan,
  jenis: 'wajib' | 'sukarela',
  nominal: number,
) {
  if (jenis === 'wajib') {
    return {
      total: simpanan.total + nominal,
      wajib: simpanan.wajib + nominal,
      sukarela: simpanan.sukarela,
    }
  }
  return {
    total: simpanan.total + nominal,
    wajib: simpanan.wajib,
    sukarela: simpanan.sukarela + nominal,
  }
}

export function estimasiShuTahunan(sukarela: number): number {
  return Math.round(sukarela * ESTIMASI_SHU_SUKARELA)
}
