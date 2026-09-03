"use client";

import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { useAdminStore } from "@/lib/stores/useAdminStore";
import { formatRupiah } from "@/lib/format";

export default function AdminDashboardPage() {
  const stats = useAdminStore((s) => s.stats);
  const pendingCount = useAdminStore((s) => s.pendingAnggota.length);
  const loiCount = useAdminStore((s) => s.loiInbox.filter((l) => l.status === "baru").length);

  const menus = [
    {
      href: "/admin/anggota",
      label: "Approval Anggota",
      desc: "Setujui pendaftaran baru",
      badge: pendingCount,
      color: "text-merah",
    },
    {
      href: "/admin/loi",
      label: "Inbox LOI",
      desc: "Permintaan pasokan korporat",
      badge: loiCount,
      color: "text-biru",
    },
  ];

  return (
    <div className="pb-4">
      <div className="bg-hijau px-5 pb-6 pt-8 text-white">
        <p className="text-sm opacity-80">Panel Pengurus</p>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-xs opacity-70">Koperasi Jaga Dhita Pertiwi</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/15 p-3">
            <p className="text-[10px] opacity-70">Anggota Aktif</p>
            <p className="font-mono text-lg font-bold">{stats.anggotaAktif.toLocaleString("id-ID")}</p>
          </div>
          <div className="rounded-xl bg-white/15 p-3">
            <p className="text-[10px] opacity-70">Total Simpanan</p>
            <p className="font-mono text-sm font-bold">{formatRupiah(stats.totalSimpanan)}</p>
          </div>
          <div className="rounded-xl bg-white/15 p-3">
            <p className="text-[10px] opacity-70">Pending Approval</p>
            <p className="font-mono text-lg font-bold">{pendingCount}</p>
          </div>
          <div className="rounded-xl bg-white/15 p-3">
            <p className="text-[10px] opacity-70">Transaksi/Bulan</p>
            <p className="font-mono text-lg font-bold">{stats.transaksiBulan}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-5 py-4">
        {menus.map((m) => (
          <Link key={m.href} href={m.href} className="kartu flex items-center gap-4 p-4">
            <div className="flex-1">
              <p className={`font-bold ${m.color}`}>{m.label}</p>
              <p className="text-xs text-abu-teks">{m.desc}</p>
            </div>
            {m.badge > 0 && <Tag variant="merah">{m.badge}</Tag>}
            <span className="text-abu-teks">→</span>
          </Link>
        ))}
      </div>

      <Link href="/" className="block px-5 text-center text-sm text-abu-teks">
        ← Kembali ke landing
      </Link>
    </div>
  );
}
