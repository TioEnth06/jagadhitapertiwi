/** Gambar dari Unsplash — https://unsplash.com/ (semua URL diverifikasi) */
const BASE = 'https://images.unsplash.com'

export function unsplash(
  photoId: string,
  width = 800,
  height?: number,
): string {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(width),
    q: '80',
  })
  if (height) params.set('h', String(height))
  return `${BASE}/${photoId}?${params}`
}

/** ID foto Unsplash yang sudah diverifikasi (HTTP 200) */
const PHOTOS = {
  riceField: 'photo-1625246333195-78d9c38ad449',
  grain: 'photo-1574323347407-f5e1ad6d020b',
  vegMarket: 'photo-1542838132-92c53300491e',
  farmMarket: 'photo-1488459716781-31db52582fe9',
  vegetables: 'photo-1540420773420-3366772f4999',
  honey: 'photo-1587049352846-4a222e784d38',
  payment: 'photo-1556742049-0cfed4f6a45d',
  meeting: 'photo-1517245386807-bb43f82c33c4',
  finance: 'photo-1554224155-6726b3ff858f',
  farmField: 'photo-1500595046743-cd271d694d30',
  greenhouse: 'photo-1501004318641-b39e6451bec6',
  portrait1: 'photo-1507003211169-0a1dd7228f2d',
  portrait2: 'photo-1573496359142-b8d87734a5a2',
  portrait3: 'photo-1472099645785-5658abf4ff4e',
} as const

export const UNSPLASH = {
  hero: unsplash(PHOTOS.riceField, 1600, 900),
  solusi: unsplash(PHOTOS.farmField, 900, 700),
  statistik: unsplash(PHOTOS.riceField, 1200, 600),
  kantor: unsplash(PHOTOS.farmMarket, 800, 400),

  fitur: {
    simpanan: unsplash(PHOTOS.payment, 600, 400),
    pasar: unsplash(PHOTOS.vegMarket, 600, 400),
    suara: unsplash(PHOTOS.meeting, 600, 400),
    kartu: unsplash(PHOTOS.farmField, 600, 400),
  },

  layanan: {
    simpanan: unsplash(PHOTOS.finance, 600, 400),
    pinjaman: unsplash(PHOTOS.grain, 600, 400),
    pasar: unsplash(PHOTOS.farmMarket, 600, 400),
    tataKelola: unsplash(PHOTOS.meeting, 600, 400),
  },

  produk: {
    'Padi & Beras': unsplash(PHOTOS.grain, 600, 400),
    Sayuran: unsplash(PHOTOS.vegetables, 600, 400),
    'Buah-buahan': unsplash(PHOTOS.farmMarket, 600, 400),
    'Madu & Olahan': unsplash(PHOTOS.honey, 600, 400),
    Pupuk: unsplash(PHOTOS.greenhouse, 600, 400),
    default: unsplash(PHOTOS.vegMarket, 600, 400),
  },

  produkById: {
    '1': unsplash(PHOTOS.grain, 600, 400),
    '2': unsplash(PHOTOS.grain, 600, 400),
    '3': unsplash(PHOTOS.honey, 600, 400),
    '4': unsplash(PHOTOS.vegetables, 600, 400),
    '5': unsplash(PHOTOS.vegetables, 600, 400),
    '6': unsplash(PHOTOS.greenhouse, 600, 400),
  } as Record<string, string>,

  testimoni: [
    unsplash(PHOTOS.portrait1, 200, 200),
    unsplash(PHOTOS.portrait2, 200, 200),
    unsplash(PHOTOS.portrait3, 200, 200),
  ],

  pengumuman: {
    rapat: unsplash(PHOTOS.meeting, 640, 360),
    simpanan: unsplash(PHOTOS.payment, 640, 360),
    musyawarah: unsplash(PHOTOS.farmMarket, 640, 360),
    promo: unsplash(PHOTOS.greenhouse, 640, 360),
  },
} as const

export function getProdukImage(produkId: string, kategori: string): string {
  return (
    UNSPLASH.produkById[produkId] ??
    UNSPLASH.produk[kategori as keyof typeof UNSPLASH.produk] ??
    UNSPLASH.produk.default
  )
}
