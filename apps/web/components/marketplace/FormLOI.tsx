"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

type FormData = {
  nama_perusahaan: string;
  wa_number: string;
  jenis_pemohon: string;
  produk: string;
  volume: string;
  target_waktu: string;
  keterangan: string;
};

const INITIAL: FormData = {
  nama_perusahaan: "",
  wa_number: "",
  jenis_pemohon: "Perusahaan / PT / CV",
  produk: "Beras / Gabah",
  volume: "",
  target_waktu: "",
  keterangan: "",
};

export default function FormLOI() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [sukses, setSukses] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update(key: keyof FormData, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
    setError(null);
  }

  async function submit() {
    if (!form.nama_perusahaan || !form.wa_number || !form.volume) {
      setError("Mohon isi nama, nomor WhatsApp, dan volume kebutuhan.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const nomorRef = `LOI-${Date.now().toString(36).toUpperCase()}`;

      const { error: dbError } = await supabase.from("loi_requests").insert({
        ...form,
        nomor_referensi: nomorRef,
        status: "menunggu",
      });

      if (dbError) throw dbError;

      setSukses(nomorRef);
      setForm(INITIAL);
    } catch {
      setError("Gagal mengirim permintaan. Coba lagi atau hubungi kami via WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  if (sukses) {
    return (
      <div className="kartu text-center py-8">
        <div className="text-4xl mb-4">✅</div>
        <p className="font-bold text-lg mb-2">Permintaan LOI Terkirim</p>
        <p className="text-sm text-abu-teks mb-4">
          Nomor referensi Anda:
        </p>
        <p className="font-mono text-xl font-bold text-merah mb-4">{sukses}</p>
        <p className="text-sm text-abu-teks">
          Tim JDP akan menghubungi Anda via WhatsApp dalam 1×24 jam.
        </p>
        <button
          onClick={() => setSukses(null)}
          className="btn btn-outline mt-6 text-sm"
        >
          Ajukan Permintaan Lain
        </button>
      </div>
    );
  }

  return (
    <div className="kartu">
      <div className="mb-5">
        <h3 className="font-display font-bold text-xl mb-1">Butuh pasokan besar?</h3>
        <p className="text-sm text-abu-teks">
          Isi form ini — tim JDP menghubungi dalam 1×24 jam. Tidak perlu akun.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold mb-1">Nama / Perusahaan</label>
          <input className="input" placeholder="PT Maju Bersama / Pak Ahmad" value={form.nama_perusahaan} onChange={(e) => update("nama_perusahaan", e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold mb-1">No. WhatsApp</label>
            <input className="input" type="tel" placeholder="0812-xxxx-xxxx" value={form.wa_number} onChange={(e) => update("wa_number", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Jenis pemohon</label>
            <select className="input" value={form.jenis_pemohon} onChange={(e) => update("jenis_pemohon", e.target.value)}>
              <option>Perusahaan / PT / CV</option>
              <option>Restoran / Catering</option>
              <option>BUMDes / Koperasi</option>
              <option>Perorangan</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">Produk yang dibutuhkan</label>
          <select className="input" value={form.produk} onChange={(e) => update("produk", e.target.value)}>
            <option>Beras / Gabah</option>
            <option>Sayuran & Hortikultura</option>
            <option>Buah-buahan</option>
            <option>Madu & Produk Olahan</option>
            <option>Rempah & Herbal</option>
            <option>Lainnya</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold mb-1">Volume kebutuhan</label>
            <input className="input" placeholder="Contoh: 2 ton/bulan" value={form.volume} onChange={(e) => update("volume", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Target waktu</label>
            <input className="input" placeholder="Feb 2025" value={form.target_waktu} onChange={(e) => update("target_waktu", e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">Keterangan tambahan</label>
          <textarea className="input resize-none h-24" placeholder="Spesifikasi khusus, lokasi pengiriman..." value={form.keterangan} onChange={(e) => update("keterangan", e.target.value)} />
        </div>

        {error && <p className="text-sm text-merah bg-merah-muda px-3 py-2 rounded-lg">{error}</p>}

        <button onClick={submit} disabled={loading} className="btn btn-merah w-full text-base mt-1">
          {loading ? "Mengirim..." : "Kirim Permintaan LOI"}
        </button>

        <p className="text-center text-xs text-abu-teks">
          Sudah punya akun?{" "}
          <a href="/login" className="text-merah font-semibold">Masuk untuk PO resmi</a>
        </p>
      </div>
    </div>
  );
}
