"use client";

import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { useB2BStore } from "@/lib/stores/useB2BStore";
import { formatRupiah } from "@/lib/format";

const statusTag: Record<string, "kuning" | "hijau" | "biru" | "abu"> = {
  pending: "kuning",
  approved: "biru",
  selesai: "hijau",
  draft: "abu",
};

export default function B2BDashboardPage() {
  const profile = useB2BStore((s) => s.profile);
  const purchaseOrders = useB2BStore((s) => s.purchaseOrders);

  return (
    <div className="pb-4">
      <div className="bg-biru px-5 pb-6 pt-8 text-white">
        <p className="text-sm opacity-80">Dashboard Korporat</p>
        <h1 className="text-lg font-bold">{profile.nama}</h1>
        <p className="font-mono text-xs opacity-70">{profile.noAnggota}</p>
        <Tag variant="kuning" className="mt-2 !bg-white/20 !text-white">
          {profile.tier}
        </Tag>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/15 p-3">
            <p className="text-[10px] opacity-70">PO Aktif</p>
            <p className="font-mono text-xl font-bold">{profile.poAktif}</p>
          </div>
          <div className="rounded-xl bg-white/15 p-3">
            <p className="text-[10px] opacity-70">Nilai PO</p>
            <p className="font-mono text-sm font-bold">{formatRupiah(profile.nilaiPo)}</p>
          </div>
          <div className="rounded-xl bg-white/15 p-3">
            <p className="text-[10px] opacity-70">Limit Pinjaman</p>
            <p className="font-mono text-sm font-bold">{formatRupiah(profile.limitPinjaman)}</p>
          </div>
          <div className="rounded-xl bg-white/15 p-3">
            <p className="text-[10px] opacity-70">LOI Pending</p>
            <p className="font-mono text-xl font-bold">{profile.loiPending}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-abu-teks">PO Terbaru</h2>
        <Link href="/b2b/po/buat" className="text-sm font-semibold text-biru">
          + Buat PO
        </Link>
      </div>

      <div className="space-y-3 px-5">
        {purchaseOrders.map((po) => (
          <div key={po.id} className="kartu p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-xs text-abu-teks">{po.ref}</p>
                <p className="text-sm font-bold">{po.produk}</p>
                <p className="text-xs text-abu-teks">
                  {po.volume} {po.satuan} · {po.penjual}
                </p>
              </div>
              <Tag variant={statusTag[po.status] ?? "abu"}>{po.status}</Tag>
            </div>
            <p className="mt-2 font-mono text-sm font-bold text-biru">{formatRupiah(po.total)}</p>
            <p className="text-xs text-abu-teks">{po.tanggal} · {po.lokasi}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
