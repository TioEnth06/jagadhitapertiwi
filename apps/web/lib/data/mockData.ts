import { getProdukImage, UNSPLASH } from '@/lib/constants/images'
import type { Anggota, Proposal, Produk, Simpanan, Transaksi, Pengumuman } from '@/lib/types'

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
  mitraKorporat: 38,
  transaksiBulan: 850,
}

export const testimoniLanding = [
  {
    id: '1',
    nama: 'Pak Sukirman',
    peran: 'Petani padi, Desa Sumber Jaya',
    kutipan:
      'Dulu harus ke kantor koperasi yang jaraknya 12 km hanya untuk cek saldo. Sekarang bisa dari rumah. Daftar pun lewat WhatsApp, mudah sekali.',
    inisial: 'SK',
    warna: '#1A7F3C',
    tipe: 'individu' as const,
  },
  {
    id: '2',
    nama: 'Ibu Pratiwi',
    peran: 'Direktur Pengadaan, PT Nusapangan',
    kutipan:
      'Kami butuh pasokan beras organik 5 ton per bulan. Lewat LOI di marketplace JDP, dalam 2 hari sudah dapat penawaran dari tiga penjual sekaligus.',
    inisial: 'PT',
    warna: '#2563EB',
    tipe: 'korporat' as const,
  },
  {
    id: '3',
    nama: 'Pak Hariyanto',
    peran: 'Peternak lebah, Desa Wonokerto',
    kutipan:
      'Madu hutan saya dulu susah dijual. Sekarang lewat marketplace JDP sudah laku ke restoran dan kafe di kota. Pendapatan naik hampir dua kali lipat.',
    inisial: 'HR',
    warna: '#B8860B',
    tipe: 'individu' as const,
  },
]

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

export const daftarPengumuman: Pengumuman[] = [
  {
    id: '1',
    kategori: 'pengumuman',
    judul: 'Rapat Anggota Tahunan 2025',
    isi: '15 Februari 2025, Balai Desa Sumber Jaya',
    gambar: UNSPLASH.pengumuman.rapat,
    detail:
      'Rapat Anggota Tahunan (RAT) 2025 akan dilaksanakan pada 15 Februari 2025 pukul 09.00 WIB di Balai Desa Sumber Jaya. Agenda: laporan pengurus, laporan pengawas, dan pembagian SHU.',
  },
  {
    id: '2',
    kategori: 'agenda',
    judul: 'Batas Akhir Simpanan Wajib Februari',
    isi: 'Setor sebelum 28 Februari 2025',
    gambar: UNSPLASH.pengumuman.simpanan,
    detail:
      'Anggota diharapkan menyelesaikan simpanan wajib bulan Februari sebelum tanggal 28. Setoran dapat dilakukan via aplikasi atau langsung ke kantor koperasi.',
  },
  {
    id: '3',
    kategori: 'peringatan',
    judul: 'Musyawarah Besar — Voting Dibuka',
    isi: 'Usulan suku bunga pinjaman semester 1',
    gambar: UNSPLASH.pengumuman.musyawarah,
    detail:
      'Voting musyawarah untuk usulan suku bunga pinjaman 1,25% per bulan (flat) sudah dibuka. Berikan suara Anda di menu Suara Anggota sebelum 15 Januari 2025.',
  },
  {
    id: '4',
    kategori: 'promo',
    judul: 'Diskon Pupuk Organik 10%',
    isi: 'Berlaku hingga 31 Maret 2025 di marketplace',
    gambar: UNSPLASH.pengumuman.promo,
    detail:
      'Dapatkan diskon 10% untuk pembelian pupuk organik dari penjual anggota terpilih. Promo berlaku untuk pesanan minimum 5 kg.',
  },
]

export const proposalsAktif: Proposal[] = [
  {
    id: '1',
    judul: 'Penetapan Suku Bunga Pinjaman Semester 1 2025',
    deskripsi:
      'Pengurus mengusulkan suku bunga 1,25% per bulan (flat rate) untuk semua jenis pinjaman, berlaku Januari–Juni 2025.',
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

export const pinjamanAktif = {
  id: 'pin-aktif-1',
  noReferensi: 'PIN-20240815-C3D4',
  jumlah: 5_000_000,
  tenor: 12,
  cicilanKe: 5,
  totalCicilan: 12,
  cicilanPerBulan: 468_750,
  sisaPokok: 2_916_667,
  progressPersen: 42,
  cicilanBerikutnya: '468.750',
  jatuhTempoBerikutnya: '15 Feb 2025',
}

export const korporatProfile = {
  nama: 'PT Nusapangan Sejahtera',
  noAnggota: 'JDP-K001',
  tier: 'Gold Partner',
  poAktif: 3,
  nilaiPo: 125_000_000,
  limitPinjaman: 50_000_000,
  loiPending: 2,
}

export const pendingAnggota = [
  {
    id: 'pa-1',
    nama: 'Hendra Wijaya',
    inisial: 'HW',
    warna: '#1A7F3C',
    tipe: 'individu' as const,
    nik: '3301****4521',
    noHp: '0812-9876-5432',
    alamat: 'Desa Sumber Jaya, Kec. Sumber Jaya',
    tanggalDaftar: '28 Jan 2025',
    dokumen: ['KTP', 'KK', 'Foto Diri'],
  },
  {
    id: 'pa-2',
    nama: 'PT Agro Makmur',
    inisial: 'AM',
    warna: '#2563EB',
    tipe: 'korporat' as const,
    noHp: '021-5555-1234',
    alamat: 'Jl. Industri No. 45, Bandung',
    tanggalDaftar: '27 Jan 2025',
    dokumen: ['NPWP', 'Akta Pendirian', 'NIB'],
  },
  {
    id: 'pa-3',
    nama: 'Siti Aminah',
    inisial: 'SA',
    warna: '#CC0000',
    tipe: 'individu' as const,
    nik: '3302****7890',
    noHp: '0856-1234-5678',
    alamat: 'Desa Jatimulyo, Kec. Jatimulyo',
    tanggalDaftar: '26 Jan 2025',
    dokumen: ['KTP', 'KK'],
  },
]

export const loiInboxSeed = [
  {
    id: 'loi-1',
    ref: 'LOI-M4X2P1',
    perusahaan: 'PT Nusapangan Sejahtera',
    kontak: 'Ibu Pratiwi',
    telepon: '0812-3456-7890',
    produk: 'Beras Organik Premium',
    volume: '5 ton/bulan',
    lokasi: 'Jakarta Selatan',
    tanggalButuh: '1 Mar 2025',
    catatan: 'Butuh sertifikasi organik',
    status: 'baru' as const,
    tanggal: '29 Jan 2025',
    sumber: 'landing' as const,
  },
  {
    id: 'loi-2',
    ref: 'LOI-K7N9R3',
    perusahaan: 'CV Sumber Pangan',
    kontak: 'Pak Budi',
    telepon: '0813-2222-3333',
    produk: 'Jagung Manis',
    volume: '2 ton',
    lokasi: 'Surabaya',
    tanggalButuh: '15 Feb 2025',
    status: 'dihubungi' as const,
    tanggal: '25 Jan 2025',
    sumber: 'form' as const,
  },
]

export const purchaseOrdersSeed = [
  {
    id: 'po-1',
    ref: 'PO-20250128-A1',
    produk: 'Beras Organik Premium',
    penjual: 'Pak Marno',
    volume: 500,
    satuan: 'kg',
    hargaSatuan: 85_000,
    total: 42_500_000,
    feePersen: 1.5,
    tanggal: '28 Jan 2025',
    lokasi: 'Gudang PT Nusapangan, Jakarta',
    status: 'pending' as const,
  },
  {
    id: 'po-2',
    ref: 'PO-20250115-B2',
    produk: 'Madu Hutan Murni',
    penjual: 'Pak Hadi',
    volume: 100,
    satuan: 'btl',
    hargaSatuan: 95_000,
    total: 9_500_000,
    feePersen: 1.5,
    tanggal: '15 Jan 2025',
    lokasi: 'Kantor PT Nusapangan',
    status: 'approved' as const,
  },
  {
    id: 'po-3',
    ref: 'PO-20241220-C3',
    produk: 'Cabai Merah Keriting',
    penjual: 'Bu Sari',
    volume: 200,
    satuan: 'kg',
    hargaSatuan: 35_000,
    total: 7_000_000,
    feePersen: 1.5,
    tanggal: '20 Des 2024',
    lokasi: 'Pabrik Pengolahan, Bandung',
    status: 'selesai' as const,
  },
]
