/**
 * Tabel: anggota
 * Buat di Supabase SQL editor
 */
export const SQL_ANGGOTA = `
create table if not exists anggota (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete cascade,
  nomor_anggota    text unique not null,          -- JDP-0001
  nama             text not null,
  nik              text,
  wa_number        text,
  alamat           text,
  jenis            text not null default 'individu', -- individu | korporat
  status           text not null default 'menunggu',  -- menunggu | aktif | nonaktif
  bergabung_sejak  date not null default current_date,
  total_simpanan   bigint not null default 0,
  simpanan_pokok   bigint not null default 0,
  simpanan_wajib   bigint not null default 0,
  simpanan_sukarela bigint not null default 0,
  foto_ktp_url     text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Index untuk cari by WA number (dipakai bot)
create index if not exists idx_anggota_wa on anggota(wa_number);

-- RLS: anggota hanya bisa baca data sendiri
alter table anggota enable row level security;

create policy "Anggota baca data sendiri"
  on anggota for select
  using (auth.uid() = user_id);

create policy "Admin bisa baca semua"
  on anggota for all
  using (auth.jwt() ->> 'role' = 'admin');
`;
