export interface Anggota {
  nama: string
  namaLengkap: string
  noAnggota: string
  bergabung: string
  status: string
  lamaBergabung: string
  totalTransaksi: number
  skorKredit: string
  skorBintang: number
}

export interface Simpanan {
  total: number
  pokok: number
  wajib: number
  sukarela: number
  wajibBulanIni: number
  wajibBulanIniStatus: 'LUNAS' | 'BELUM'
}

export interface Transaksi {
  id: string
  tanggal: string
  keterangan: string
  nominal: number
  tipe: 'masuk' | 'keluar'
  status?: StatusTransaksi
  referensi?: string
  jenisSimpanan?: JenisSimpanan
  metode?: MetodeBayar
}

export type StatusTransaksi = 'selesai' | 'menunggu' | 'diproses'

export interface Produk {
  id: string
  nama: string
  harga: number
  satuan: string
  rating: number
  stok: number
  stokSatuan: string
  penjual?: string
  desa?: string
  kategori: string
  gambar?: string
}

export interface Proposal {
  id: string
  judul: string
  deskripsi: string
  status: 'berlangsung' | 'akan_datang' | 'selesai'
  deadline?: string
  mulai?: string
  setuju?: number
  tidakSetuju?: number
  abstain?: number
  totalAnggota?: number
  hasil?: string
  bulan?: string
}

export type TabNav = 'beranda' | 'simpanan' | 'pinjaman' | 'pasar' | 'akun'

export interface DokumenAnggota {
  id: string
  nama: string
  jenis: string
  tanggalTerbit: string
  status: 'Terverifikasi' | 'Menunggu'
}

export interface RekeningBank {
  bank: string
  nomor: string
  atasNama: string
  cabang: string
  utama: boolean
}

export interface KontakPengurus {
  nama: string
  jabatan: string
  telepon: string
  jamOperasional: string
  alamat: string
}

export interface FaqItem {
  id: string
  pertanyaan: string
  jawaban: string
}

export type AkunMenuView =
  | 'menu'
  | 'dokumen'
  | 'rekening'
  | 'notifikasi'
  | 'ganti-pin'
  | 'hubungi'
  | 'bantuan'

export type JenisSimpanan = 'wajib' | 'sukarela'
export type MetodeBayar = 'transfer' | 'tunai'

export type MetodeTransferId = 'bri' | 'mandiri' | 'va' | 'qris'

export interface MetodeTransferOption {
  id: MetodeTransferId
  label: string
  deskripsi: string
  bank: string
  nomor: string
  atasNama: string
  kodeVirtual?: string
}

export interface LokasiKoperasi {
  id: string
  nama: string
  alamat: string
  jam: string
  petugas: string
}

export interface SetoranInput {
  jenis: JenisSimpanan
  nominal: number
  metode: MetodeBayar
  metodeTransfer?: MetodeTransferId
  lokasiId?: string
  catatan?: string
}

export interface PenarikanInput {
  nominal: number
  rekeningNomor: string
  rekeningBank: string
  catatan?: string
}

export type StatusPinjaman = 'menunggu' | 'disetujui' | 'ditolak' | 'cair' | 'lunas'

export interface CicilanPinjaman {
  bulan: number
  jatuhTempo: string
  pokok: number
  bunga: number
  cicilan: number
  sisaPokok: number
}

export interface RingkasanPinjamanData {
  pokok: number
  tenor: number
  bungaPerBulan: number
  totalBunga: number
  totalBayar: number
  cicilanPerBulan: number
  biayaAdmin: number
  jadwalCicilan: CicilanPinjaman[]
}

export interface PengajuanPinjaman {
  id: string
  noReferensi: string
  jumlah: number
  tenor: number
  tujuan: string
  ringkasan: RingkasanPinjamanData
  status: StatusPinjaman
  tanggal: string
  catatanPengurus?: string
}

export type StatusOrder = 'menunggu' | 'diproses' | 'selesai' | 'dibatalkan'

export interface OrderItem {
  produkId: string
  nama: string
  harga: number
  satuan: string
  qty: number
  subtotal: number
}

export interface OrderRequest {
  id: string
  items: OrderItem[]
  total: number
  catatan?: string
  status: StatusOrder
  tanggal: string
  penjual?: string
}

export type SimpananView = 'main' | 'setor' | 'tarik'

export type KategoriPengumuman = 'pengumuman' | 'agenda' | 'peringatan' | 'promo'

export interface Pengumuman {
  id: string
  kategori: KategoriPengumuman
  judul: string
  isi: string
  detail: string
  gambar: string
}

export interface PinjamanAktif {
  id: string
  noReferensi: string
  jumlah: number
  tenor: number
  cicilanKe: number
  totalCicilan: number
  cicilanPerBulan: number
  sisaPokok: number
  progressPersen: number
  cicilanBerikutnya: string
  jatuhTempoBerikutnya: string
}

export interface PendingAnggota {
  id: string
  nama: string
  inisial: string
  warna: string
  tipe: 'individu' | 'korporat'
  nik?: string
  noHp: string
  alamat: string
  tanggalDaftar: string
  dokumen: string[]
}

export interface LoiRequest {
  id: string
  ref: string
  perusahaan: string
  kontak: string
  telepon: string
  produk: string
  volume: string
  lokasi: string
  tanggalButuh: string
  catatan?: string
  status: 'baru' | 'dihubungi' | 'assigned' | 'selesai'
  tanggal: string
  sumber: 'landing' | 'form'
}

export interface PurchaseOrder {
  id: string
  ref: string
  produk: string
  penjual: string
  volume: number
  satuan: string
  hargaSatuan: number
  total: number
  feePersen: number
  tanggal: string
  lokasi: string
  catatan?: string
  status: 'draft' | 'pending' | 'approved' | 'selesai'
}

export interface KorporatProfile {
  nama: string
  noAnggota: string
  tier: string
  poAktif: number
  nilaiPo: number
  limitPinjaman: number
  loiPending: number
}

export type VoteChoice = 'setuju' | 'tidak' | 'abstain'
