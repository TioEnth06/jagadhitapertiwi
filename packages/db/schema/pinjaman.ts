export const SQL_PINJAMAN = `
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
    -- menunggu | disetujui | ditolak | berjalan | lunas
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
`;
