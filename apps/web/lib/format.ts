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

/** Alias untuk tanggal transaksi (format singkat). */
export function formatTanggalTransaksi(tanggal: string | Date = new Date()): string {
  return formatTanggalSingkat(tanggal);
}

export function formatRupiahSingkat(nominal: number): string {
  if (nominal >= 1_000_000_000) {
    return `Rp ${(nominal / 1_000_000_000).toFixed(1).replace(".0", "")} M`;
  }
  if (nominal >= 1_000_000) {
    return `Rp ${(nominal / 1_000_000).toFixed(1).replace(".0", "")} Jt`;
  }
  return formatRupiah(nominal);
}
