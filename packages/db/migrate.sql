-- Koperasi JDP — jalankan berurutan di Supabase SQL Editor
-- 1. anggota → 2. pinjaman → 3. produk + loi_requests → 4. seed (opsional)

-- ========== 1. ANGGOTA ==========
create table if not exists anggota (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete cascade,
  nomor_anggota    text unique not null,
  nama             text not null,
  nik              text,
  wa_number        text,
  alamat           text,
  jenis            text not null default 'individu',
  status           text not null default 'menunggu',
  bergabung_sejak  date not null default current_date,
  total_simpanan   bigint not null default 0,
  simpanan_pokok   bigint not null default 0,
  simpanan_wajib   bigint not null default 0,
  simpanan_sukarela bigint not null default 0,
  foto_ktp_url     text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists idx_anggota_wa on anggota(wa_number);

alter table anggota enable row level security;

create policy "Anggota baca data sendiri"
  on anggota for select
  using (auth.uid() = user_id);

create policy "Admin bisa baca semua"
  on anggota for all
  using (auth.jwt() ->> 'role' = 'admin');

-- ========== 2. PINJAMAN (bunga flat 1.25%) ==========
create table if not exists pinjaman (
  id               uuid primary key default gen_random_uuid(),
  anggota_id       uuid references anggota(id) on delete cascade,
  jumlah           bigint not null,
  tenor_bulan      int not null,
  bunga_per_bulan  numeric(4,2) not null default 1.25,
  cicilan_per_bulan bigint not null,
  total_bayar      bigint not null,
  tujuan           text,
  status           text not null default 'menunggu',
  tanggal_ajukan   date not null default current_date,
  tanggal_cair     date,
  catatan_pengurus text,
  created_at       timestamptz not null default now()
);

alter table pinjaman enable row level security;

create policy "Anggota lihat pinjaman sendiri"
  on pinjaman for select
  using (
    anggota_id in (
      select id from anggota where user_id = auth.uid()
    )
  );

-- ========== 3. PRODUK + LOI ==========
create table if not exists produk (
  id           uuid primary key default gen_random_uuid(),
  penjual_id   uuid references anggota(id) on delete cascade,
  nama         text not null,
  deskripsi    text,
  kategori     text not null,
  harga        bigint not null,
  satuan       text not null default 'kg',
  stok         numeric(10,2) not null default 0,
  foto_url     text,
  status       text not null default 'aktif',
  rating       numeric(2,1),
  total_terjual int not null default 0,
  created_at   timestamptz not null default now()
);

alter table produk enable row level security;

create policy "Publik baca produk aktif"
  on produk for select
  using (status = 'aktif');

create table if not exists loi_requests (
  id               uuid primary key default gen_random_uuid(),
  nomor_referensi  text unique not null,
  nama_perusahaan  text not null,
  wa_number        text not null,
  jenis_pemohon    text,
  produk           text not null,
  volume           text not null,
  target_waktu     text,
  keterangan       text,
  status           text not null default 'menunggu',
  assigned_to      uuid references anggota(id),
  created_at       timestamptz not null default now()
);

alter table loi_requests enable row level security;

create policy "Publik bisa insert LOI"
  on loi_requests for insert
  with check (true);

-- ========== 4. SEED DEMO (opsional) ==========
-- Buat user di Supabase Auth dulu, lalu ganti USER_UUID di bawah:
-- insert into anggota (
--   user_id, nomor_anggota, nama, jenis, status,
--   total_simpanan, simpanan_pokok, simpanan_wajib, simpanan_sukarela
-- ) values (
--   'USER_UUID'::uuid, 'JDP-0247', 'Sukirman', 'individu', 'aktif',
--   4750000, 500000, 1200000, 3550000
-- );
