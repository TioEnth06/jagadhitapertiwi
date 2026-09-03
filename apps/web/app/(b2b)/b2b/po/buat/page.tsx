"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import FormGroup from "@/components/ui/FormGroup";
import Input from "@/components/ui/Input";
import DemoToast from "@/components/ui/DemoToast";
import { useB2BStore } from "@/lib/stores/useB2BStore";
import { produk } from "@/lib/data/mockData";
import { useDemoToast } from "@/lib/hooks/useDemoToast";
import { formatRupiah } from "@/lib/format";

export default function BuatPOPage() {
  const router = useRouter();
  const buatPO = useB2BStore((s) => s.buatPO);
  const { message, showToast, dismiss } = useDemoToast();

  const [form, setForm] = useState({
    produk: produk[0]?.nama ?? "",
    penjual: produk[0]?.penjual ?? "",
    volume: "100",
    satuan: "kg",
    hargaSatuan: String(produk[0]?.harga ?? 0),
    tanggal: new Date().toISOString().slice(0, 10),
    lokasi: "",
    catatan: "",
  });

  const total = useMemo(
    () => Number(form.volume) * Number(form.hargaSatuan),
    [form.volume, form.hargaSatuan],
  );
  const fee = useMemo(() => Math.round(total * 0.015), [total]);

  const update = (key: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const po = buatPO({
      produk: form.produk,
      penjual: form.penjual,
      volume: Number(form.volume),
      satuan: form.satuan,
      hargaSatuan: Number(form.hargaSatuan),
      tanggal: form.tanggal,
      lokasi: form.lokasi,
      catatan: form.catatan,
    });
    showToast(`PO ${po.ref} berhasil dibuat!`);
    setTimeout(() => router.push("/b2b"), 1500);
  };

  return (
    <div className="pb-6">
      <TopBar title="Buat Purchase Order" backHref="/b2b" />

      <form onSubmit={handleSubmit} className="space-y-1 px-5 py-4">
        <FormGroup label="Produk" htmlFor="produk">
          <select
            id="produk"
            className="input"
            value={form.produk}
            onChange={(e) => {
              const p = produk.find((x) => x.nama === e.target.value);
              update("produk", e.target.value);
              if (p) {
                update("penjual", p.penjual ?? "");
                update("hargaSatuan", String(p.harga));
                update("satuan", p.satuan);
              }
            }}
          >
            {produk.map((p) => (
              <option key={p.id} value={p.nama}>
                {p.nama}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup label="Penjual" htmlFor="penjual">
          <Input id="penjual" value={form.penjual} onChange={(e) => update("penjual", e.target.value)} required />
        </FormGroup>
        <div className="flex gap-3">
          <FormGroup label="Volume" htmlFor="volume" className="flex-1">
            <Input id="volume" type="number" min={1} value={form.volume} onChange={(e) => update("volume", e.target.value)} required />
          </FormGroup>
          <FormGroup label="Satuan" htmlFor="satuan" className="w-24">
            <Input id="satuan" value={form.satuan} onChange={(e) => update("satuan", e.target.value)} required />
          </FormGroup>
        </div>
        <FormGroup label="Harga Satuan (Rp)" htmlFor="harga">
          <Input id="harga" type="number" value={form.hargaSatuan} onChange={(e) => update("hargaSatuan", e.target.value)} required />
        </FormGroup>
        <FormGroup label="Tanggal Pengiriman" htmlFor="tanggal">
          <Input id="tanggal" type="date" value={form.tanggal} onChange={(e) => update("tanggal", e.target.value)} required />
        </FormGroup>
        <FormGroup label="Lokasi Pengiriman" htmlFor="lokasi">
          <Input id="lokasi" value={form.lokasi} onChange={(e) => update("lokasi", e.target.value)} required />
        </FormGroup>
        <FormGroup label="Catatan (opsional)" htmlFor="catatan">
          <textarea
            id="catatan"
            className="input min-h-[60px] resize-none"
            value={form.catatan}
            onChange={(e) => update("catatan", e.target.value)}
          />
        </FormGroup>

        <div className="kartu mt-2 space-y-2 bg-biru-muda">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-mono font-bold">{formatRupiah(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Fee koperasi (1.5%)</span>
            <span className="font-mono">{formatRupiah(fee)}</span>
          </div>
          <div className="flex justify-between border-t border-abu-border pt-2 text-sm font-bold">
            <span>Total</span>
            <span className="font-mono text-biru">{formatRupiah(total + fee)}</span>
          </div>
        </div>

        <div className="pt-4">
          <Btn type="submit">Submit PO</Btn>
        </div>
      </form>
      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  );
}
