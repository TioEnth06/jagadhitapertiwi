"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Tag from "@/components/ui/Tag";
import SectionLabel from "@/components/shared/SectionLabel";
import { StatCard, StatGrid } from "@/components/shared/PageHero";
import { useAdminStore } from "@/lib/stores/useAdminStore";
import { usePinjamanStore } from "@/lib/stores/usePinjamanStore";
import { formatRupiah } from "@/lib/format";

export default function AdminDashboardPage() {
  const stats = useAdminStore((s) => s.stats);
  const pendingCount = useAdminStore((s) => s.pendingAnggota.length);
  const loiCount = useAdminStore((s) => s.loiInbox.filter((l) => l.status === "baru").length);
  const pinjamanPending = usePinjamanStore((s) => s.pengajuan.filter((p) => p.status === "menunggu").length);

  const menus = [
    {
      href: "/admin/anggota",
      label: "Approval Anggota",
      desc: "Setujui pendaftaran baru",
      badge: pendingCount,
      accent: "text-merah",
    },
    {
      href: "/admin/pinjaman",
      label: "Approval Pinjaman",
      desc: "Setujui pengajuan pinjaman anggota",
      badge: pinjamanPending,
      accent: "text-merah",
    },
    {
      href: "/admin/loi",
      label: "Inbox LOI",
      desc: "Permintaan pasokan korporat",
      badge: loiCount,
      accent: "text-biru",
    },
  ];

  return (
    <div className="pb-6">
      <div className="app-hero-hijau px-5 pb-6 pt-8 text-white">
        <p className="text-sm opacity-80">Panel Pengurus</p>
        <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-xs opacity-70">Koperasi Jaga Dhita Pertiwi</p>

        <div className="mt-4">
          <StatGrid>
            <StatCard label="Anggota Aktif" value={stats.anggotaAktif.toLocaleString("id-ID")} />
            <StatCard label="Total Simpanan" value={formatRupiah(stats.totalSimpanan)} />
            <StatCard label="Pending Approval" value={pendingCount} />
            <StatCard label="Transaksi/Bulan" value={stats.transaksiBulan} />
          </StatGrid>
        </div>
      </div>

      <div className="app-content space-y-4">
        <SectionLabel title="Menu Admin" className="mb-1" />
        {menus.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="app-card app-card-interactive flex items-center gap-4 p-4"
          >
            <div className="min-w-0 flex-1">
              <p className={`font-bold ${m.accent}`}>{m.label}</p>
              <p className="text-xs text-abu-teks">{m.desc}</p>
            </div>
            {m.badge > 0 && <Tag variant="merah">{m.badge}</Tag>}
            <ChevronRight size={18} className="shrink-0 text-abu-teks" />
          </Link>
        ))}

        <Link href="/" className="app-link-muted pt-2">
          ← Kembali ke landing
        </Link>
      </div>
    </div>
  );
}
