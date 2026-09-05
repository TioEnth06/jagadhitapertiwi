"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAdminStore } from "@/lib/stores/useAdminStore";

interface LoiFormProps {
  onSuccess: (message: string) => void;
}

export default function LoiForm({ onSuccess }: LoiFormProps) {
  const submitLoi = useAdminStore((s) => s.submitLoi);
  const [form, setForm] = useState({
    perusahaan: "",
    telepon: "",
    jenis: "Perusahaan / PT / CV",
    produk: "Beras / Gabah",
    volume: "",
    tanggalButuh: "",
    catatan: "",
    lokasi: "",
  });
  const [error, setError] = useState("");

  const update = (key: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.perusahaan.trim() || !form.telepon.trim()) {
      setError("Nama/perusahaan dan nomor WhatsApp wajib diisi.");
      return;
    }
    if (form.telepon.replace(/\D/g, "").length < 10) {
      setError("Nomor WhatsApp tidak valid.");
      return;
    }

    const loi = submitLoi({
      perusahaan: form.perusahaan.trim(),
      kontak: form.perusahaan.trim(),
      telepon: form.telepon.trim(),
      produk: form.produk,
      volume: form.volume.trim() || "Belum diisi",
      lokasi: form.lokasi.trim() || "Belum diisi",
      tanggalButuh: form.tanggalButuh.trim() || "Segera",
      catatan: [form.jenis, form.catatan.trim()].filter(Boolean).join(" · "),
      sumber: "landing",
    });

    onSuccess(`Permintaan LOI ${loi.ref} berhasil dikirim! Tim JDP akan menghubungi Anda dalam 1×24 jam.`);
    setForm({
      perusahaan: "",
      telepon: "",
      jenis: "Perusahaan / PT / CV",
      produk: "Beras / Gabah",
      volume: "",
      tanggalButuh: "",
      catatan: "",
      lokasi: "",
    });
  };

  const inputClass =
    "w-full rounded-lg border-[1.5px] border-[var(--landing-abu-border)] bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--landing-merah)]";

  return (
    <div className="sticky top-[90px] rounded-2xl border-[1.5px] border-[var(--landing-abu-border)] bg-[var(--landing-abu-bg)] p-8 lg:static lg:top-auto">
      <div className="mb-6">
        <h3 className="font-landing-display mb-1.5 text-[22px] font-bold leading-snug text-[var(--landing-hitam)]">
          Butuh pasokan skala besar?
        </h3>
        <p className="text-[13px] leading-relaxed text-[var(--landing-abu-teks)]">
          Isi form Letter of Intent (LOI) ini — tim JDP dan penjual akan menghubungi Anda dalam 1×24 jam.
        </p>
        <p className="mt-1 text-[11px] text-[var(--landing-abu-halus)]">
          Tidak perlu jadi anggota untuk mengajukan LOI.{" "}
          <Link href="/loi" className="font-semibold text-[var(--landing-merah)]">
            Form lengkap →
          </Link>
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
            value={form.perusahaan}
            onChange={(e) => update("perusahaan", e.target.value)}
            placeholder="PT Maju Bersama / Pak Ahmad"
            className={inputClass}
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
              value={form.telepon}
              onChange={(e) => update("telepon", e.target.value)}
              placeholder="0812-xxxx-xxxx"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="loi-jenis" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
              Jenis pemohon
            </label>
            <select
              id="loi-jenis"
              value={form.jenis}
              onChange={(e) => update("jenis", e.target.value)}
              className={inputClass}
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
            value={form.produk}
            onChange={(e) => update("produk", e.target.value)}
            className={inputClass}
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
              value={form.volume}
              onChange={(e) => update("volume", e.target.value)}
              placeholder="Contoh: 2 ton/bulan"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="loi-waktu" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
              Target waktu
            </label>
            <input
              id="loi-waktu"
              type="text"
              value={form.tanggalButuh}
              onChange={(e) => update("tanggalButuh", e.target.value)}
              placeholder="Contoh: Februari 2025"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mb-3.5">
          <label htmlFor="loi-lokasi" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
            Lokasi pengiriman
          </label>
          <input
            id="loi-lokasi"
            type="text"
            value={form.lokasi}
            onChange={(e) => update("lokasi", e.target.value)}
            placeholder="Contoh: Jakarta Selatan"
            className={inputClass}
          />
        </div>

        <div className="mb-3.5">
          <label htmlFor="loi-catatan" className="mb-1.5 block text-xs font-semibold text-[var(--landing-teks)]">
            Keterangan tambahan
          </label>
          <textarea
            id="loi-catatan"
            rows={3}
            value={form.catatan}
            onChange={(e) => update("catatan", e.target.value)}
            placeholder="Spesifikasi khusus atau informasi lain..."
            className={`min-h-[80px] resize-y ${inputClass}`}
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
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-[var(--landing-merah)] no-underline">
            Masuk untuk PO resmi
          </Link>
        </p>
      </form>
    </div>
  );
}
