"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Tag from "@/components/ui/Tag";
import Btn from "@/components/ui/Btn";
import DemoToast from "@/components/ui/DemoToast";
import B2BPageHeader from "@/components/b2b/B2BPageHeader";
import { usePasarStore } from "@/lib/stores/usePasarStore";
import { useDemoToast } from "@/lib/hooks/useDemoToast";
import { kategoriProduk } from "@/lib/data/mockData";
import { formatRupiah } from "@/lib/format";
import type { Produk } from "@/lib/types";

type PasarTab = "produk" | "pesanan";
type MarketplaceVariant = "individu" | "b2b";

interface MarketplaceContentProps {
  variant?: MarketplaceVariant;
}

export default function MarketplaceContent({ variant = "individu" }: MarketplaceContentProps) {
  const isB2b = variant === "b2b";
  const accentBg = "bg-merah";
  const accentText = "text-merah";

  const produkList = usePasarStore((s) => s.produk);
  const orders = usePasarStore((s) => s.orders);
  const requestOrder = usePasarStore((s) => s.requestOrder);
  const { message, showToast, dismiss } = useDemoToast();
  const [tab, setTab] = useState<PasarTab>("produk");
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
    const fresh = produkList.find((p) => p.id === orderProduk.id) ?? orderProduk;
    const result = requestOrder({ produk: fresh, qty });
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast(`Pesanan ${fresh.nama} berhasil dikirim!`);
    setOrderProduk(null);
    setQty(1);
    setTab("pesanan");
  };

  const tabClass = (active: boolean) =>
    active
      ? isB2b
        ? "b2b-tab-active"
        : `${accentBg} text-white`
      : isB2b
        ? "b2b-tab-inactive"
        : "kartu";

  return (
    <div className={isB2b ? "pb-6" : "pb-4"}>
      {isB2b ? (
        <B2BPageHeader
          eyebrow="Marketplace Korporat"
          title="Pasar Produk Tani"
          subtitle="Beli hasil tani untuk kebutuhan perusahaan"
        />
      ) : (
        <div className="app-hero-merah px-5 pb-5 pt-8 text-white">
          <p className="text-sm opacity-80">Marketplace</p>
          <h1 className="font-display text-xl font-bold">Pasar Produk Tani</h1>
          <p className="mt-1 text-sm opacity-80">Beli-jual hasil tani antar anggota</p>
        </div>
      )}

      <div className={`${isB2b ? "b2b-content" : "app-content"} space-y-4 !pt-4`}>
        <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab("produk")}
          className={`flex-1 min-h-touch rounded-full text-sm font-semibold transition-colors ${tabClass(tab === "produk")}`}
        >
          Semua Produk
        </button>
        <button
          type="button"
          onClick={() => setTab("pesanan")}
          className={`flex-1 min-h-touch rounded-full text-sm font-semibold transition-colors ${tabClass(tab === "pesanan")}`}
        >
          Pesanan Saya ({orders.length})
        </button>
      </div>

      {tab === "produk" && (
        <>
          <Link
            href="/loi"
            className={`block p-4 ${
              isB2b
                ? "b2b-loi-banner"
                : "rounded-xl border-[1.5px] border-dashed border-merah-border bg-merah-muda text-merah"
            }`}
          >
            <p className="text-sm font-bold">Butuh pasokan besar?</p>
            <p className="text-xs">Kirim Letter of Intent (LOI) →</p>
          </Link>

          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${accentText}`}
              size={18}
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk tani..."
              className="input rounded-full pl-11"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {kategoriProduk.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKategori(k)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  kategori === k ? `${accentBg} text-white` : "bg-abu-bg text-abu-teks"
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filtered.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setOrderProduk(p);
                  setQty(1);
                }}
                className={
                  isB2b
                    ? "b2b-card b2b-card-interactive overflow-hidden p-0 text-left"
                    : "app-card app-card-interactive overflow-hidden p-0 text-left"
                }
              >
                {p.gambar && (
                  <img src={p.gambar} alt={p.nama} className="h-28 w-full object-cover" />
                )}
                <div className="p-3">
                  <p className={`text-xs font-bold leading-tight ${isB2b ? "font-display" : ""}`}>
                    {p.nama}
                  </p>
                  <p className={`mt-1 font-mono text-sm font-bold ${accentText}`}>
                    {formatRupiah(p.harga)}
                    <span className="text-[10px] font-normal text-abu-teks">/{p.satuan}</span>
                  </p>
                  <p className="mt-1 text-[10px] text-abu-teks">
                    Stok {p.stok} {p.stokSatuan}
                  </p>
                  {p.penjual && <p className="text-[10px] text-abu-teks">{p.penjual}</p>}
                  <Tag variant="hijau" className="mt-1">
                    ⭐ {p.rating}
                  </Tag>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {tab === "pesanan" && (
        <div className="space-y-3">
          {orders.length === 0 ? (
            <div className={isB2b ? "b2b-empty" : "app-empty"}>
              <p className="text-sm text-abu-teks">Belum ada pesanan.</p>
            </div>
          ) : (
            orders.map((o) => (
              <div key={o.id} className={isB2b ? "b2b-card p-4" : "app-card p-4"}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{o.items[0]?.nama}</p>
                    <p className="text-xs text-abu-teks">
                      {o.items[0]?.qty} {o.items[0]?.satuan} · {o.penjual}
                    </p>
                    <p className="text-xs text-abu-teks">{o.tanggal}</p>
                  </div>
                  <Tag variant="kuning">{o.status}</Tag>
                </div>
                <p className={`mt-2 font-mono font-bold ${accentText}`}>
                  {formatRupiah(o.total)}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      </div>

      {orderProduk && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40">
          <div className="mx-auto w-full max-w-[390px] rounded-t-2xl bg-white p-5">
            <h2 className="text-lg font-bold">{orderProduk.nama}</h2>
            <p className={`font-mono ${accentText}`}>
              {formatRupiah(produkList.find((p) => p.id === orderProduk.id)?.harga ?? orderProduk.harga)}/
              {orderProduk.satuan}
            </p>
            <p className="mt-1 text-sm text-abu-teks">
              Stok: {produkList.find((p) => p.id === orderProduk.id)?.stok ?? orderProduk.stok}{" "}
              {orderProduk.stokSatuan}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="qty" className="text-sm font-semibold">
                Jumlah
              </label>
              <input
                id="qty"
                type="number"
                min={1}
                max={produkList.find((p) => p.id === orderProduk.id)?.stok ?? orderProduk.stok}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="input w-24"
              />
            </div>
            <p className="mt-2 font-mono font-bold">
              Total:{" "}
              {formatRupiah(
                (produkList.find((p) => p.id === orderProduk.id)?.harga ?? orderProduk.harga) * qty,
              )}
            </p>
            <div className="mt-4 flex gap-2">
              <Btn variant="merah" onClick={handleOrder}>
                Pesan
              </Btn>
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
