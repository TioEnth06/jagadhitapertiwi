import { getProdukImage } from '../constants/images'
import type { Anggota, Proposal, Produk, Simpanan, Transaksi } from '../types'

export const anggota: Anggota = {
  nama: 'Sukirman',
  namaLengkap: 'SUKIRMAN',
  noAnggota: 'JDP-0247',
  bergabung: 'Sejak Maret 2018',
  status: 'ANGGOTA AKTIF',
  lamaBergabung: '6 Tahun 10 Bulan',
  totalTransaksi: 89,
  skorKredit: 'BAIK',
  skorBintang: 4,
}

export const simpanan: Simpanan = {
  total: 4_750_000,
  pokok: 500_000,
  wajib: 1_200_000,
  sukarela: 3_550_000,
  wajibBulanIni: 200_000,
  wajibBulanIniStatus: 'BELUM',
}

export const statistikKoperasi = {
  anggotaAktif: 1247,
  totalSimpanan: 2_400_000_000,
  produkPasar: 89,
}

export const transaksi: Transaksi[] = [
  {
    id: '1',
    tanggal: '28 Jan 2025',
    keterangan: 'Setor Simpanan Wajib — Jan 2025',
    nominal: 200_000,
    tipe: 'masuk',
  },
  {
    id: '2',
    tanggal: '15 Jan 2025',
    keterangan: 'Beli Beras Organik — Pasar Koperasi',
    nominal: 170_000,
    tipe: 'keluar',
  },
  {
    id: '3',
    tanggal: '5 Jan 2025',
    keterangan: 'Setor Simpanan Sukarela',
    nominal: 500_000,
    tipe: 'masuk',
  },
  {
    id: '4',
    tanggal: '20 Des 2024',
    keterangan: 'Pencairan Pinjaman Modal Tani',
    nominal: 2_000_000,
    tipe: 'masuk',
  },
  {
    id: '5',
    tanggal: '1 Des 2024',
    keterangan: 'Setor Simpanan Wajib — Des 2024',
    nominal: 200_000,
    tipe: 'masuk',
  },
]

export const produk: Produk[] = [
  {
    id: '1',
    nama: 'Beras Organik Premium',
    harga: 85_000,
    satuan: 'kg',
    rating: 4.8,
    stok: 120,
    stokSatuan: 'kg',
    penjual: 'Pak Marno',
    desa: 'Desa Sumber Jaya',
    kategori: 'Padi & Beras',
    gambar: getProdukImage('1', 'Padi & Beras'),
  },
  {
    id: '2',
    nama: 'Jagung Manis',
    harga: 45_000,
    satuan: 'kg',
    rating: 4.9,
    stok: 80,
    stokSatuan: 'kg',
    penjual: 'Bu Sari',
    desa: 'Desa Jatimulyo',
    kategori: 'Padi & Beras',
    gambar: getProdukImage('2', 'Padi & Beras'),
  },
  {
    id: '3',
    nama: 'Madu Hutan Murni',
    harga: 95_000,
    satuan: '250ml',
    rating: 4.7,
    stok: 30,
    stokSatuan: 'btl',
    penjual: 'Pak Hadi',
    desa: 'Desa Wonokerto',
    kategori: 'Madu & Olahan',
    gambar: getProdukImage('3', 'Madu & Olahan'),
  },
  {
    id: '4',
    nama: 'Cabai Merah Keriting',
    harga: 35_000,
    satuan: 'kg',
    rating: 4.6,
    stok: 50,
    stokSatuan: 'kg',
    kategori: 'Sayuran',
    gambar: getProdukImage('4', 'Sayuran'),
  },
  {
    id: '5',
    nama: 'Tomat Segar',
    harga: 20_000,
    satuan: 'kg',
    rating: 4.8,
    stok: 200,
    stokSatuan: 'kg',
    kategori: 'Sayuran',
    gambar: getProdukImage('5', 'Sayuran'),
  },
  {
    id: '6',
    nama: 'Pupuk Organik Kompos',
    harga: 25_000,
    satuan: 'kg',
    rating: 4.5,
    stok: 500,
    stokSatuan: 'kg',
    kategori: 'Pupuk',
    gambar: getProdukImage('6', 'Pupuk'),
  },
]

export const produkUnggulan = produk.slice(0, 3)

export const pengumuman = {
  judul: 'Rapat Anggota Tahunan 2025',
  isi: '15 Februari 2025, Balai Desa Sumber Jaya',
}

export const proposalsAktif: Proposal[] = [
  {
    id: '1',
    judul: 'Penetapan Suku Bunga Pinjaman Semester 1 2025',
    deskripsi:
      'Pengurus mengusulkan suku bunga 1% per bulan (flat rate) untuk semua jenis pinjaman, berlaku Januari–Juni 2025.',
    status: 'berlangsung',
    deadline: 'Berakhir dalam 3 hari (15 Jan 2025)',
    setuju: 847,
    tidakSetuju: 312,
    abstain: 88,
    totalAnggota: 1247,
  },
  {
    id: '2',
    judul: 'Penggunaan Dana SHU 2024 untuk Pengembangan Irigasi',
    deskripsi:
      'Pengurus mengusulkan alokasi dana SHU 2024 untuk perbaikan sistem irigasi di 3 desa anggota.',
    status: 'akan_datang',
    mulai: 'Voting dibuka 20 Jan 2025',
  },
]

export const proposalsSelesai: Proposal[] = [
  {
    id: '3',
    judul: 'Penetapan Harga Gabah Minimum',
    deskripsi: 'Harga gabah minimum Rp 6.500/kg untuk musim panen 2024.',
    status: 'selesai',
    hasil: 'DISETUJUI',
    bulan: 'Sep 2024',
  },
  {
    id: '4',
    judul: 'Penambahan Kuota Pinjaman Modal Usaha',
    deskripsi: 'Kenaikan plafon pinjaman modal usaha dari Rp 5 juta menjadi Rp 10 juta.',
    status: 'selesai',
    hasil: 'DISETUJUI',
    bulan: 'Jun 2024',
  },
  {
    id: '5',
    judul: 'Perubahan Iuran Simpanan Wajib Bulanan',
    deskripsi: 'Usulan kenaikan simpanan wajib dari Rp 150.000 menjadi Rp 200.000.',
    status: 'selesai',
    hasil: 'DISETUJUI',
    bulan: 'Mar 2024',
  },
]

export const kategoriProduk = [
  'Semua',
  'Padi & Beras',
  'Sayuran',
  'Buah-buahan',
  'Madu & Olahan',
  'Pupuk',
]

export const MAX_PINJAMAN = 10_000_000
export const MIN_PINJAMAN = 500_000

export const dokumenAnggota = [
  {
    id: '1',
    nama: 'Kartu Tanda Penduduk (KTP)',
    jenis: 'Identitas',
    tanggalTerbit: '12 Jan 2020',
    status: 'Terverifikasi' as const,
  },
  {
    id: '2',
    nama: 'Sertifikat Keanggotaan Koperasi',
    jenis: 'Keanggotaan',
    tanggalTerbit: '15 Mar 2018',
    status: 'Terverifikasi' as const,
  },
  {
    id: '3',
    nama: 'Surat Keterangan Anggota Aktif',
    jenis: 'Keanggotaan',
    tanggalTerbit: '1 Jan 2025',
    status: 'Terverifikasi' as const,
  },
]

export const rekeningKoperasi = {
  bank: 'Bank BRI',
  nomor: '0456 0100 1234 567',
  atasNama: 'KOPERASI JAGA DHITA PERTIWI',
  kodeVirtual: '9881234567890123',
}

export const rekeningBank = [
  {
    bank: 'Bank BRI',
    nomor: '1234 5678 9012',
    atasNama: 'SUKIRMAN',
    cabang: 'KC Sumber Jaya',
    utama: true,
  },
  {
    bank: 'Bank Mandiri',
    nomor: '9876 5432 1001',
    atasNama: 'SUKIRMAN',
    cabang: 'KC Jatimulyo',
    utama: false,
  },
]

export const kontakPengurus = {
  nama: 'Pak Hartono',
  jabatan: 'Ketua Koperasi',
  telepon: '0812-3456-7890',
  jamOperasional: 'Senin–Jumat, 08.00–16.00 WIB',
  alamat: 'Jl. Raya Sumber Jaya No. 12, Kec. Sumber Jaya, Kab. Lampung Timur',
}

export const faqItems = [
  {
    id: '1',
    pertanyaan: 'Bagaimana cara setor simpanan wajib?',
    jawaban:
      'Buka menu Simpanan, ketuk "Setor Simpanan", pilih jenis simpanan, masukkan nominal, lalu konfirmasi. Pembayaran dapat dilakukan via transfer ke rekening koperasi atau langsung di kantor.',
  },
  {
    id: '2',
    pertanyaan: 'Berapa lama proses pengajuan pinjaman?',
    jawaban:
      'Pengajuan pinjaman diproses 1–3 hari kerja setelah formulir lengkap disubmit. Pengurus akan menghubungi Anda via telepon untuk verifikasi.',
  },
  {
    id: '3',
    pertanyaan: 'Bagaimana cara ikut voting suara anggota?',
    jawaban:
      'Buka menu Beranda → "Lihat SHU" atau halaman Suara Anggota. Pilih proposal aktif, baca detail, lalu pilih Setuju, Tidak Setuju, atau Abstain.',
  },
  {
    id: '4',
    pertanyaan: 'Lupa PIN, apa yang harus dilakukan?',
    jawaban:
      'Hubungi pengurus koperasi di kantor atau via telepon dengan membawa KTP asli. PIN baru akan diberikan setelah identitas diverifikasi.',
  },
  {
    id: '5',
    pertanyaan: 'Apakah bisa jual produk di pasar koperasi?',
    jawaban:
      'Ya, anggota aktif dapat mendaftarkan produk hasil tani melalui tombol "Jual Produk Saya" di halaman Pasar. Produk akan direview pengurus sebelum ditampilkan.',
  },
]

export const notifikasiDefault = {
  pengumuman: true,
  transaksi: true,
  pinjaman: true,
  voting: true,
  pasar: false,
}
