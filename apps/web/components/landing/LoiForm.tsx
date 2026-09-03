"use client";
import { useState, type FormEvent } from 'react'
import Link from 'next/link'

interface LoiFormProps {
  onSuccess: (message: string) => void
}

export default function LoiForm({ onSuccess }: LoiFormProps) {
  const [nama, setNama] = useState('')
  const [wa, setWa] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!nama.trim() || !wa.trim()) {
      setError('Nama/perusahaan dan nomor WhatsApp wajib diisi.')
      return
    }
    if (wa.replace(/\D/g, '').length < 10) {
      setError('Nomor WhatsApp tidak valid.')
      return
    }
    onSuccess('Permintaan LOI berhasil dikirim! Tim JDP akan menghubungi Anda dalam 1×24 jam.')
    setNama('')
    setWa('')
  }

  return (
    <div className="sticky top-[90px] rounded-2xl border-[1.5px] border-[var(--landing-abu-border)] bg-[var(--landing-abu-bg)] p-8 lg:static lg:top-auto">
      <div className="mb-6">
        <h3 className="font-landing-display mb-1.5 text-[22px] font-bold leading-snug text-[var(--landing-hitam)]">
          Butuh pasokan skala besar?
        </h3>
        <p className="text-[13px] leading-relaxed text-[var(--landing-abu-teks)]">
          Isi form Letter of Intent (LOI) ini — tim JDP dan penjual akan menghubungi Anda dalam
          1×24 jam.
        </p>
        <p className="mt-1 text-[11px] text-[var(--landing-abu-halus)]">
          Tidak perlu jadi anggota untuk mengajukan LOI.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3.5">
          <label htmlFor="loi-nama" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
            Nama / Perusahaan <span aria-hidden="true">*</span>
          </label>
          <input
            id="loi-nama"
            type="text"
            required
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="PT Maju Bersama / Pak Ahmad"
            className="w-full rounded-lg border-[1.5px] border-[var(--landing-abu-border)] bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--landing-merah)]"
          />
        </div>

        <div className="mb-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div>
            <label htmlFor="loi-wa" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
              No. WhatsApp <span aria-hidden="true">*</span>
            </label>
            <input
              id="loi-wa"
              type="tel"
              required
              value={wa}
              onChange={(e) => setWa(e.target.value)}
              placeholder="0812-xxxx-xxxx"
              className="w-full rounded-lg border-[1.5px] border-[var(--landing-abu-border)] bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--landing-merah)]"
            />
          </div>
          <div>
            <label htmlFor="loi-jenis" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
              Jenis pemohon
            </label>
            <select
              id="loi-jenis"
              className="w-full rounded-lg border-[1.5px] border-[var(--landing-abu-border)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--landing-merah)]"
            >
              <option>Perusahaan / PT / CV</option>
              <option>Restoran / Catering</option>
              <option>BUMDes / Koperasi</option>
              <option>Perorangan</option>
            </select>
          </div>
        </div>

        <div className="mb-3.5">
          <label htmlFor="loi-produk" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
            Produk yang dibutuhkan
          </label>
          <select
            id="loi-produk"
            className="w-full rounded-lg border-[1.5px] border-[var(--landing-abu-border)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--landing-merah)]"
          >
            <option>Beras / Gabah</option>
            <option>Sayuran & Hortikultura</option>
            <option>Buah-buahan</option>
            <option>Madu & Produk Olahan</option>
            <option>Rempah & Herbal</option>
            <option>Lainnya</option>
          </select>
        </div>

        <div className="mb-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div>
            <label htmlFor="loi-volume" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
              Volume kebutuhan
            </label>
            <input
              id="loi-volume"
              type="text"
              placeholder="Contoh: 2 ton/bulan"
              className="w-full rounded-lg border-[1.5px] border-[var(--landing-abu-border)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--landing-merah)]"
            />
          </div>
          <div>
            <label htmlFor="loi-waktu" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
              Target waktu
            </label>
            <input
              id="loi-waktu"
              type="text"
              placeholder="Contoh: Februari 2025"
              className="w-full rounded-lg border-[1.5px] border-[var(--landing-abu-border)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--landing-merah)]"
            />
          </div>
        </div>

        <div className="mb-3.5">
          <label htmlFor="loi-catatan" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
            Keterangan tambahan
          </label>
          <textarea
            id="loi-catatan"
            rows={3}
            placeholder="Spesifikasi khusus, lokasi pengiriman, atau informasi lain..."
            className="min-h-[80px] w-full resize-y rounded-lg border-[1.5px] border-[var(--landing-abu-border)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--landing-merah)]"
          />
        </div>

        {error && (
          <p className="mb-3 text-sm font-medium text-[var(--landing-merah)]" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-2 w-full rounded-[10px] bg-[var(--landing-merah)] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[var(--landing-merah-gelap)]"
        >
          Kirim Permintaan LOI
        </button>

        <p className="mt-3.5 text-center text-xs text-[var(--landing-abu-teks)]">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-semibold text-[var(--landing-merah)] no-underline">
            Masuk untuk PO resmi
          </Link>
        </p>
      </form>
    </div>
  )
}
