export function formatRupiah(nominal: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nominal)
}

export function formatRupiahSingkat(nominal: number): string {
  if (nominal >= 1_000_000_000) {
    return `Rp ${(nominal / 1_000_000_000).toFixed(1).replace('.0', '')} M`
  }
  if (nominal >= 1_000_000) {
    return `Rp ${(nominal / 1_000_000).toFixed(1).replace('.0', '')} Jt`
  }
  return formatRupiah(nominal)
}
