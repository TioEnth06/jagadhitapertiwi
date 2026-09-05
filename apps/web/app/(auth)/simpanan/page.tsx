"use client";

import { useState } from "react";
import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import DemoToast from "@/components/ui/DemoToast";
import SectionLabel from "@/components/shared/SectionLabel";
import EmptyState from "@/components/shared/EmptyState";
import { StatCard, StatGrid } from "@/components/shared/PageHero";
import SetorSimpananPanel from "@/components/simpanan/SetorSimpananPanel";
import { useSimpananStore, MIN_TARIK } from "@/lib/stores/useSimpananStore";
import { useDemoToast } from "@/lib/hooks/useDemoToast";
import { formatRupiah } from "@/lib/format";
import type { SimpananView } from "@/lib/types";

export default function SimpananPage() {
  const simpanan = useSimpananStore((s) => s.simpanan);
  const transaksi = useSimpananStore((s) => s.transaksi);
  const tarik = useSimpananStore((s) => s.tarik);
  const { message, showToast, dismiss } = useDemoToast();
  const [view, setView] = useState<SimpananView>("main");
  const [nominal, setNominal] = useState("");
  const [error, setError] = useState("");

  const resetSetor = () => {
    setView("main");
    setError("");
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
    return (
      <div className="pb-6">
        <TopBar title="Setor Simpanan" onBack={resetSetor} />
        <div className="app-content">
          <SetorSimpananPanel
            onSuccess={(msg) => {
              showToast(msg);
              resetSetor();
            }}
            onClose={resetSetor}
          />
        </div>
        <DemoToast message={message} onDismiss={dismiss} />
      </div>
    );
  }

  if (view === "tarik") {
    return (
      <div className="pb-6">
        <TopBar title="Tarik Simpanan" onBack={() => setView("main")} />
        <div className="app-content space-y-4">
          <p className="text-sm text-abu-teks">
            Tersedia sukarela: {formatRupiah(simpanan.sukarela)} · Min {formatRupiah(MIN_TARIK)}
          </p>
          <input
            type="number"
            className="input"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
            placeholder="Nominal tarik"
          />
          {error && (
            <p className="text-sm font-medium text-merah" role="alert">
              {error}
            </p>
          )}
          <Btn onClick={handleTarik}>Konfirmasi Tarik</Btn>
        </div>
        <DemoToast message={message} onDismiss={dismiss} />
      </div>
    );
  }

  return (
    <div className="pb-6">
      <div className="app-hero-merah px-5 pb-6 pt-8 text-white">
        <p className="text-sm opacity-80">Total Simpanan</p>
        <p className="font-mono text-3xl font-bold leading-none">{formatRupiah(simpanan.total)}</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <StatCard label="Pokok" value={formatRupiah(simpanan.pokok)} compact />
          <StatCard label="Wajib" value={formatRupiah(simpanan.wajib)} compact />
          <StatCard label="Sukarela" value={formatRupiah(simpanan.sukarela)} compact />
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5">
          <span className="text-sm">Wajib Jan — {formatRupiah(simpanan.wajibBulanIni)}</span>
          <Tag variant={simpanan.wajibBulanIniStatus === "LUNAS" ? "hijau" : "kuning"}>
            {simpanan.wajibBulanIniStatus === "LUNAS" ? "Lunas" : "Belum"}
          </Tag>
        </div>
      </div>

      <div className="app-content space-y-6">
        <div className="flex gap-3 [&>button]:flex-1">
          <Btn onClick={() => setView("setor")}>Setor</Btn>
          <Btn variant="outline" onClick={() => setView("tarik")}>
            Tarik
          </Btn>
        </div>

        <section>
          <SectionLabel title="Riwayat" className="mb-3" />
          {transaksi.length === 0 ? (
            <EmptyState title="Belum ada transaksi" description="Setor simpanan untuk memulai." />
          ) : (
            <div className="space-y-2">
              {transaksi.slice(0, 6).map((t) => (
                <div key={t.id} className="app-card flex items-center justify-between p-4">
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="text-sm font-semibold">{t.keterangan}</p>
                    <p className="text-xs text-abu-teks">{t.tanggal}</p>
                  </div>
                  <p
                    className={`shrink-0 font-mono text-sm font-bold ${
                      t.tipe === "masuk" ? "text-hijau" : "text-merah"
                    }`}
                  >
                    {t.tipe === "masuk" ? "+" : "-"}
                    {formatRupiah(t.nominal)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  );
}
