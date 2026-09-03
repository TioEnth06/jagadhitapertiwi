# Koperasi Jaga Dhita Pertiwi — Monorepo

Platform digital koperasi petani (Next.js + Supabase).

## Stack

| App | Path | Port |
|-----|------|------|
| Web (landing + dashboard) | `apps/web` | 3000 |
| WhatsApp bot | `apps/bot` | 4000 |

Branch **`legacy-vite`** menyimpan app Vite SPA sebelum migrasi.

## Setup cepat

```bash
pnpm install
cp .env.example apps/web/.env.local
# Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Jalankan SQL di Supabase SQL Editor:

```bash
# File lengkap: packages/db/migrate.sql
```

```bash
pnpm dev:web   # http://localhost:3000
```

## Environment

Lihat [`.env.example`](.env.example). Web app memakai:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Tanpa Supabase yang valid, dashboard menampilkan **data demo** otomatis.

## Fitur yang sudah di-port dari Vite

- Landing page lengkap (dual entry Individu/Korporat, LOI, WhatsApp)
- Dashboard dengan PengumumanBanner
- Pinjaman dengan bunga flat **1.25%**
- Login + dashboard demo

## Scripts

```bash
pnpm dev:web      # Next.js web
pnpm dev:bot      # WhatsApp bot (butuh FONNTE_TOKEN)
pnpm build        # Build web production
```
