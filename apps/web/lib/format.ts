/**
 * Format angka ke format Rupiah Indonesia
 * Contoh: 4750000 → "Rp 4.750.000"
 */
export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
}

/**
 * Format tanggal ke format Indonesia
 * Contoh: 2025-01-15 → "15 Januari 2025"
 */
export function formatTanggal(tanggal: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(tanggal));
}

/**
 * Format tanggal singkat
 * Contoh: 2025-01-15 → "15 Jan 2025"
 */
export function formatTanggalSingkat(tanggal: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(tanggal));
}

/**
 * Hitung cicilan flat
 * @param pokok - jumlah pinjaman
 * @param bungaPerBulan - persen per bulan (contoh: 1 untuk 1%)
 * @param tenor - jumlah bulan
 */
export function hitungCicilan(
  pokok: number,
  bungaPerBulan: number,
  tenor: number
): {
  cicilanPerBulan: number;
  totalBunga: number;
  totalBayar: number;
} {
  const bunga = (pokok * bungaPerBulan) / 100;
  const cicilanPerBulan = pokok / tenor + bunga;
  const totalBunga = bunga * tenor;
  const totalBayar = pokok + totalBunga;

  return {
    cicilanPerBulan: Math.round(cicilanPerBulan),
    totalBunga: Math.round(totalBunga),
    totalBayar: Math.round(totalBayar),
  };
}
