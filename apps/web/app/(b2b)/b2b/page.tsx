"use client";

import { FileText, BarChart3, Send } from "lucide-react";
import B2BPageHeader, { B2BStatCard, B2BStatGrid } from "@/components/b2b/B2BPageHeader";
import B2BSection from "@/components/b2b/B2BSection";
import B2BPOCard from "@/components/b2b/B2BPOCard";
import B2BQuickActions from "@/components/b2b/B2BQuickActions";
import { useB2BStore } from "@/lib/stores/useB2BStore";
import { useAdminStore } from "@/lib/stores/useAdminStore";
import { formatRupiah } from "@/lib/format";

const quickActions = [
  { label: "Buat PO", href: "/b2b/po/buat", Icon: FileText },
  { label: "Laporan", href: "/b2b/laporan", Icon: BarChart3 },
  { label: "Kirim LOI", href: "/loi", Icon: Send },
];

export default function B2BDashboardPage() {
  const profile = useB2BStore((s) => s.profile);
  const purchaseOrders = useB2BStore((s) => s.purchaseOrders);
  const loiPending = useAdminStore(
    (s) => s.loiInbox.filter((l) => l.status === "baru" || l.status === "dihubungi").length,
  );

  return (
    <div className="pb-6">
      <B2BPageHeader
        eyebrow="Anggota Korporat"
        title={profile.nama}
        meta={profile.noAnggota}
        badge={profile.tier}
      >
        <B2BStatGrid>
          <B2BStatCard label="PO Aktif" value={profile.poAktif} large />
          <B2BStatCard label="LOI Pending" value={loiPending} large />
          <B2BStatCard label="Nilai PO" value={formatRupiah(profile.nilaiPo)} />
          <B2BStatCard label="Limit Pinjaman" value={formatRupiah(profile.limitPinjaman)} />
        </B2BStatGrid>
      </B2BPageHeader>

      <div className="b2b-content space-y-6">
        <B2BSection title="Aksi cepat">
          <B2BQuickActions actions={quickActions} />
        </B2BSection>

        <B2BSection title="PO Terbaru" href="/b2b/po/buat" linkLabel="+ Buat PO">
          {purchaseOrders.length === 0 ? (
            <div className="b2b-empty">
              <p className="text-sm font-semibold text-[var(--landing-hitam)]">Belum ada PO</p>
              <p className="mt-1 text-sm text-[var(--landing-abu-teks)]">
                Buat purchase order pertama untuk mulai bertransaksi.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {purchaseOrders.map((po) => (
                <B2BPOCard key={po.id} po={po} />
              ))}
            </div>
          )}
        </B2BSection>
      </div>
    </div>
  );
}
