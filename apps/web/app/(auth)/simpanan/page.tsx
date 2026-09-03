"use client";

import { useState } from "react";
import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import DemoToast from "@/components/ui/DemoToast";
import { useSimpananStore, MIN_TARIK, MIN_SETOR_SUKARELA } from "@/lib/stores/useSimpananStore";
import { useDemoToast } from "@/lib/hooks/useDemoToast";
import { formatRupiah } from "@/lib/format";
import type { SimpananView } from "@/lib/types";

export default function SimpananPage() {
  const simpanan = useSimpananStore((s) => s.simpanan);
  const transaksi = useSimpananStore((s) => s.transaksi);
  const setor = useSimpananStore((s) => s.setor);
  const tarik = useSimpananStore((s) => s.tarik);
  const { message, showToast, dismiss } = useDemoToast();
  const [view, setView] = useState<SimpananView>("main");
  const [nominal, setNominal] = useState("");
  const [metode, setMetode] = useState<"transfer" | "tunai">("transfer");
  const [error, setError] = useState("");

  const handleSetor = () => {
    setError("");
    const jenis = simpanan.wajibBulanIniStatus === "BELUM" ? "wajib" : "sukarela";
    const amount =
      jenis === "wajib" ? simpanan.wajibBulanIni : Number(nominal.replace(/\D/g, ""));
    const result = setor({ jenis, nominal: amount, metode });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    showToast(`Setor berhasil — Ref: ${result.referensi}`);
    setView("main");
    setNominal("");
  };

  const handleTarik = () => {
    setError("");
    const amount = Number(nominal.replace(/\D/g, ""));
    const result = tarik({
      nominal: amount,
      rekeningBank: "Bank BRI",
      rekeningNomor: "1234 5678 9012",
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    showToast(`Penarikan diproses — Ref: ${result.referensi}`);
    setView("main");
    setNominal("");
  };

  if (view === "setor") {
    const isWajib = simpanan.wajibBulanIniStatus === "BELUM";
    return (
      <div className="px-5 py-6">
        <button type="button" onClick={() => setView("main")} className="text-sm font-semibold text-merah">
          ← Kembali
        </button>
        <h1 className="mt-2 text-xl font-bold">Setor Simpanan</h1>
        <p className="mt-1 text-sm text-abu-teks">
          {isWajib
            ? `Tagihan wajib: ${formatRupiah(simpanan.wajibBulanIni)}`
            : `Minimal sukarela ${formatRupiah(MIN_SETOR_SUKARELA)}`}
        </p>
        {!isWajib && (
          <input
            type="number"
            className="input mt-4"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
            placeholder="Nominal setor"
          />
        )}
        <div className="mt-4 flex gap-2">
          {(["transfer", "tunai"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetode(m)}
              className={`flex-1 min-h-touch rounded-btn text-sm font-semibold capitalize ${
                metode === m ? "bg-merah text-white" : "kartu"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        {error && <p className="mt-3 text-sm text-merah">{error}</p>}
        <div className="mt-6">
          <Btn onClick={handleSetor}>Konfirmasi Setor</Btn>
        </div>
        <DemoToast message={message} onDismiss={dismiss} />
      </div>
    );
  }

  if (view === "tarik") {
    return (
      <div className="px-5 py-6">
        <button type="button" onClick={() => setView("main")} className="text-sm font-semibold text-merah">
          ← Kembali
        </button>
        <h1 className="mt-2 text-xl font-bold">Tarik Simpanan</h1>
        <p className="mt-1 text-sm text-abu-teks">
          Tersedia sukarela: {formatRupiah(simpanan.sukarela)} · Min {formatRupiah(MIN_TARIK)}
        </p>
        <input
          type="number"
          className="input mt-4"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
          placeholder="Nominal tarik"
        />
        {error && <p className="mt-3 text-sm text-merah">{error}</p>}
        <div className="mt-6">
          <Btn onClick={handleTarik}>Konfirmasi Tarik</Btn>
        </div>
        <DemoToast message={message} onDismiss={dismiss} />
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="bg-merah px-5 pb-6 pt-8 text-white">
        <p className="text-sm opacity-80">Total Simpanan</p>
        <p className="font-mono text-3xl font-bold">{formatRupiah(simpanan.total)}</p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-white/15 p-2">
            <p className="text-[10px] opacity-70">Pokok</p>
            <p className="font-mono text-sm font-bold">{formatRupiah(simpanan.pokok)}</p>
          </div>
          <div className="rounded-xl bg-white/15 p-2">
            <p className="text-[10px] opacity-70">Wajib</p>
            <p className="font-mono text-sm font-bold">{formatRupiah(simpanan.wajib)}</p>
          </div>
          <div className="rounded-xl bg-white/15 p-2">
            <p className="text-[10px] opacity-70">Sukarela</p>
            <p className="font-mono text-sm font-bold">{formatRupiah(simpanan.sukarela)}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">
          <span className="text-sm">Wajib Jan — {formatRupiah(simpanan.wajibBulanIni)}</span>
          <Tag variant={simpanan.wajibBulanIniStatus === "LUNAS" ? "hijau" : "kuning"}>
            {simpanan.wajibBulanIniStatus === "LUNAS" ? "Lunas" : "Belum"}
          </Tag>
        </div>
      </div>

      <div className="flex gap-3 px-5 py-4">
        <Btn onClick={() => setView("setor")}>Setor</Btn>
        <Btn variant="outline" onClick={() => setView("tarik")}>
          Tarik
        </Btn>
      </div>

      <div className="px-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-abu-teks">Riwayat</h2>
        <div className="space-y-2">
          {transaksi.slice(0, 6).map((t) => (
            <div key={t.id} className="kartu flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-semibold">{t.keterangan}</p>
                <p className="text-xs text-abu-teks">{t.tanggal}</p>
              </div>
              <p
                className={`font-mono text-sm font-bold ${
                  t.tipe === "masuk" ? "text-hijau" : "text-merah"
                }`}
              >
                {t.tipe === "masuk" ? "+" : "-"}
                {formatRupiah(t.nominal)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  );
}
