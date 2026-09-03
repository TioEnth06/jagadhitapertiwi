export const SQL_PRODUK = `
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
  status       text not null default 'aktif',  -- aktif | nonaktif | habis
  rating       numeric(2,1),
  total_terjual int not null default 0,
  created_at   timestamptz not null default now()
);

-- Publik bisa baca produk aktif
alter table produk enable row level security;
create policy "Publik baca produk aktif"
  on produk for select
  using (status = 'aktif');

-- LOI requests (dari publik, tanpa akun)
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
    -- menunggu | diproses | selesai | batal
  assigned_to      uuid references anggota(id),
  created_at       timestamptz not null default now()
);

-- LOI bisa diinsert oleh siapa saja (publik)
alter table loi_requests enable row level security;
create policy "Publik bisa insert LOI"
  on loi_requests for insert
  with check (true);
`;
