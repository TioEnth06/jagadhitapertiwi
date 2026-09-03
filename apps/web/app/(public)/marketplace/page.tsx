"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Tag from "@/components/ui/Tag";
import Btn from "@/components/ui/Btn";
import DemoToast from "@/components/ui/DemoToast";
import { usePasarStore } from "@/lib/stores/usePasarStore";
import { useDemoToast } from "@/lib/hooks/useDemoToast";
import { kategoriProduk } from "@/lib/data/mockData";
import { formatRupiah } from "@/lib/format";
import type { Produk } from "@/lib/types";

export default function MarketplacePage() {
  const produkList = usePasarStore((s) => s.produk);
  const requestOrder = usePasarStore((s) => s.requestOrder);
  const { message, showToast, dismiss } = useDemoToast();
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [orderProduk, setOrderProduk] = useState<Produk | null>(null);
  const [qty, setQty] = useState(1);

  const filtered = useMemo(() => {
    return produkList.filter((p) => {
      const matchKategori = kategori === "Semua" || p.kategori === kategori;
      const matchSearch =
        search === "" ||
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.penjual?.toLowerCase().includes(search.toLowerCase());
      return matchKategori && matchSearch;
    });
  }, [produkList, search, kategori]);

  const handleOrder = () => {
    if (!orderProduk) return;
    const result = requestOrder({ produk: orderProduk, qty });
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast(`Pesanan ${orderProduk.nama} berhasil dikirim!`);
    setOrderProduk(null);
    setQty(1);
  };

  return (
    <div className="pb-4">
      <div className="px-5 pt-8">
        <p className="text-xs font-bold uppercase tracking-wider text-abu-teks">Marketplace</p>
        <h1 className="text-xl font-bold">Pasar Produk Tani</h1>
        <p className="mt-1 text-sm text-abu-teks">Beli-jual hasil tani antar anggota</p>
      </div>

      <Link
        href="/loi"
        className="mx-5 mt-4 block rounded-xl bg-biru-muda p-4 text-biru"
      >
        <p className="text-sm font-bold">Butuh pasokan besar?</p>
        <p className="text-xs">Kirim Letter of Intent (LOI) →</p>
      </Link>

      <div className="relative mx-5 mt-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-merah" size={18} />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk tani..."
          className="input rounded-full pl-11"
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto px-5 pb-2">
        {kategoriProduk.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKategori(k)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
              kategori === k ? "bg-merah text-white" : "bg-abu-bg text-abu-teks"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pt-2">
        {filtered.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOrderProduk(p)}
            className="kartu overflow-hidden p-0 text-left"
          >
            {p.gambar && (
              <img src={p.gambar} alt={p.nama} className="h-28 w-full object-cover" />
            )}
            <div className="p-3">
              <p className="text-xs font-bold leading-tight">{p.nama}</p>
              <p className="mt-1 font-mono text-sm font-bold text-merah">
                {formatRupiah(p.harga)}
                <span className="text-[10px] font-normal text-abu-teks">/{p.satuan}</span>
              </p>
              {p.penjual && (
                <p className="mt-1 text-[10px] text-abu-teks">{p.penjual}</p>
              )}
              <Tag variant="hijau" className="mt-1">
                ⭐ {p.rating}
              </Tag>
            </div>
          </button>
        ))}
      </div>

      {orderProduk && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40">
          <div className="w-full max-w-[390px] mx-auto rounded-t-2xl bg-white p-5">
            <h2 className="text-lg font-bold">{orderProduk.nama}</h2>
            <p className="font-mono text-merah">{formatRupiah(orderProduk.harga)}/{orderProduk.satuan}</p>
            <p className="mt-1 text-sm text-abu-teks">Stok: {orderProduk.stok} {orderProduk.stokSatuan}</p>
            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="qty" className="text-sm font-semibold">Jumlah</label>
              <input
                id="qty"
                type="number"
                min={1}
                max={orderProduk.stok}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="input w-24"
              />
            </div>
            <p className="mt-2 font-mono font-bold">
              Total: {formatRupiah(orderProduk.harga * qty)}
            </p>
            <div className="mt-4 flex gap-2">
              <Btn onClick={handleOrder}>Pesan</Btn>
              <Btn variant="outline" onClick={() => setOrderProduk(null)}>
                Batal
              </Btn>
            </div>
          </div>
        </div>
      )}

      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  );
}
