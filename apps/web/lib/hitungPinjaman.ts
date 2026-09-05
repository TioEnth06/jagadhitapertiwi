import { MAX_PINJAMAN, MIN_PINJAMAN } from '@/lib/data/mockData'
import type { CicilanPinjaman, RingkasanPinjamanData } from '@/lib/types'
import { formatTanggalTransaksi } from '@/lib/formatTanggal'
import { formatRupiah } from '@/lib/format'

export const BUNGA_FLAT_PERSEN = 1.25
export const BUNGA_FLAT_PER_BULAN = BUNGA_FLAT_PERSEN / 100
export const BIAYA_ADMIN_PINJAMAN = 0

function buatJadwalCicilan(
  pokok: number,
  tenorBulan: number,
  totalBunga: number,
  mulaiDari = new Date(),
): CicilanPinjaman[] {
  const bungaPerBulan = Math.round(totalBunga / tenorBulan)
  const pokokPerBulan = Math.floor(pokok / tenorBulan)
  let sisaPokok = pokok

  return Array.from({ length: tenorBulan }, (_, i) => {
    const bulan = i + 1
    const jatuhTempo = new Date(mulaiDari)
    jatuhTempo.setMonth(jatuhTempo.getMonth() + bulan)

    const pokokAngsuran = i === tenorBulan - 1 ? sisaPokok : pokokPerBulan
    sisaPokok -= pokokAngsuran

    return {
      bulan,
      jatuhTempo: formatTanggalTransaksi(jatuhTempo),
      pokok: pokokAngsuran,
      bunga: bungaPerBulan,
      cicilan: pokokAngsuran + bungaPerBulan,
      sisaPokok: Math.max(0, sisaPokok),
    }
  })
}

export function hitungPinjaman(
  pokok: number,
  tenorBulan: number,
  mulaiDari = new Date(),
): RingkasanPinjamanData {
  const totalBunga = pokok * BUNGA_FLAT_PER_BULAN * tenorBulan
  const totalBayar = pokok + totalBunga + BIAYA_ADMIN_PINJAMAN
  const cicilanPerBulan = Math.ceil(totalBayar / tenorBulan)

  return {
    pokok,
    tenor: tenorBulan,
    bungaPerBulan: BUNGA_FLAT_PERSEN,
    totalBunga,
    totalBayar,
    cicilanPerBulan,
    biayaAdmin: BIAYA_ADMIN_PINJAMAN,
    jadwalCicilan: buatJadwalCicilan(pokok, tenorBulan, totalBunga, mulaiDari),
  }
}

export function hitungPlafonPinjaman(simpananWajib: number): number {
  return Math.min(MAX_PINJAMAN, Math.max(0, simpananWajib * 10))
}

export function clampJumlahPinjaman(
  jumlah: number,
  plafon: number,
  min = MIN_PINJAMAN,
): number {
  if (plafon < min) return min
  if (!Number.isFinite(jumlah)) return min
  return Math.min(Math.max(jumlah, min), plafon)
}

export function hitungKelayakanPinjaman(
  jumlah: number,
  plafon: number,
): { layak: boolean; pesan?: string } {
  if (plafon < MIN_PINJAMAN) {
    return {
      layak: false,
      pesan: `Plafon pinjaman belum mencukupi. Minimal plafon ${formatRupiah(MIN_PINJAMAN)}.`,
    }
  }
  if (jumlah < MIN_PINJAMAN) {
    return { layak: false, pesan: `Minimal pinjaman ${formatRupiah(MIN_PINJAMAN)}.` }
  }
  if (jumlah > plafon) {
    return {
      layak: false,
      pesan: `Melebihi plafon Anda (${formatRupiah(plafon)}). Kurangi jumlah atau tingkatkan simpanan wajib.`,
    }
  }
  return { layak: true }
}

export function persenPlafon(jumlah: number, plafon: number): number {
  if (plafon <= 0) return 0
  return Math.min(100, Math.round((jumlah / plafon) * 100))
}
